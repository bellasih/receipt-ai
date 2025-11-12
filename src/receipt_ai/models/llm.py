from receipt_ai.config.config import settings
from receipt_ai.tools.tool import ReceiptTools
from receipt_ai.prompts.prompt import VisionReceiptExtractionPrompt, UserReceiptQueryInsightPrompt

from google import genai
from google.genai import types
from string import Template


class GeminiLLM():
    def __init__(self, tools: ReceiptTools):
        self.tools = tools
        self.llm_client = self.init_client()

    def generate_output(self, user_input: str, prompts: str | Template, history_chat: list, is_parallel:bool=False, is_stateless:bool=False, *args, **kwargs):

        if type(prompts).__name__ != 'str':
            prompt_text = prompts.template.substitue(kwargs)
        else:
            prompt_text = '\n\n'.join([prompts, user_input])

        contents = [
            types.Content(
                role="user", parts=[types.Part(text=prompt_text)]
            )
        ]
        contents = history_chat + contents if not is_stateless else contents

        if self.tools:
            defined_tools = types.Tool(function_declarations=self.tools.get_all_existing_func_tools())

            if not is_parallel:
                # Function calls when the function dependent on each other
                config = types.GenerateContentConfig(tools=[defined_tools])
            else:
                # Paralell function calls when the functions are not dependent on each other 
                config = types.GenerateContentConfig(
                    tools=defined_tools,
                    automatic_function_calling=types.AutomaticFunctionCallingConfig(
                        disable=True
                    ),
                    # Force the model to call 'any' function, instead of chatting.
                    tool_config=types.ToolConfig(
                        function_calling_config=types.FunctionCallingConfig(mode='ANY')
                    ),
                )

            tool_response = self.get_response(contents, config)
            tool_call = tool_response.candidates[0].content.parts[0].function_call

            if tool_call != None:
                related_tool_func = getattr(self.tools, tool_call.name)
                result = related_tool_func(**tool_call.args)

                function_response_part = types.Part.from_function_response(
                    name=tool_call.name,
                    response={"result": result},
                )

                contents.append(tool_response.candidates[0].content) 
                contents.append(types.Content(role="user", parts=[function_response_part]))

        response = self.get_response(contents, 
                                     types.GenerateContentConfig(temperature=0.1))

        if not is_stateless:
            contents.append(types.Content(role="model", parts=[types.Part(text=response.text)]))
            return response.text, contents
        else:
            return response.text, None
            

    def get_response(self, contents, config):
        return self.llm_client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=contents,
            config=config,
        )

    def init_client(self):
        try:
           return genai.Client(api_key=settings.GEMINI_API_KEY)
        except Exception as e:
            print(f"Can't initiate the LLM client due to: {e}")
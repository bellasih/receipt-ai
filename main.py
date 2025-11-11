from receipt_ai.config.config import settings
from receipt_ai.utils.validate_request import RequestState
from receipt_ai.rags.rag import ReceiptRAG
from receipt_ai.models.llm import GeminiLLM
from receipt_ai.databases.vectordb import ChromaVectorDB
from receipt_ai.tools.tool import ReceiptTools

from fastapi import FastAPI

app = FastAPI(title="Receipt Chatbot")
vectordb = ChromaVectorDB(collection_name=settings.CHROMA_COLLECTION_NAME)
tools = ReceiptTools().get_tools()
llm = GeminiLLM(tools)

defined_metadata = ['sql']

@app.post("/chat")
def chat_endpoint(request: RequestState):

  query = request.messages
  system_prompt = request.system_prompt
  history_data = request.history_data

  receipt_rag = ReceiptRAG(vectordb, llm, 5, defined_metadata)
  response, history_data = receipt_rag.invoke_and_save(query, history_data, system_prompt)

  return response, history_data


# if __name__ == "__main__":
#   import uvicorn
#   uvicorn.run(app, host="127.0.0.1", port=9999)
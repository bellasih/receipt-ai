from receipt_ai.models.llm import GeminiLLM
from receipt_ai.databases.vectordb import ChromaDB
from receipt_ai.prompts.prompt import ReceiptPrompt


class ReceiptRAG():
    def __init__(self, vectordb: ChromaDB, llm: GeminiLLM, n_relevant_docs_result: int, defined_metadata_info: list):
        self.vectordb = vectordb
        self.llm = llm
        self.n_result = n_relevant_docs_result
        self.defined_info = defined_metadata_info

    def invoke_and_save(self, user_input: str, history_data: list, prompts:str | ReceiptPrompt):
        retrieval_data = self.vector_db.select(
            query_texts=[user_input], 
            n_results=self.n_result
        )

        metadata_info = {}
        for info in self.defined_info:
            selected_infos = [selected_info[info] for selected_info in retrieval_data["metadatas"]]
            metadata_info.update({info: selected_infos})

        response, history_data = self.llm.generate_output(user_input, history_data, metadata_info, prompts)

        return response, history_data
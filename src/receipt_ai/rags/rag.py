from receipt_ai.models.llm import GeminiLLM
from receipt_ai.databases.vectordb import ChromaVectorDB
from receipt_ai.prompts.prompt import UserReceiptQueryInsightPrompt
from receipt_ai.models.embeddings import DefaultEmbeddingModel


class ReceiptRAG():
    def __init__(self, vectordb: ChromaVectorDB, llm: GeminiLLM, n_relevant_docs_result: int, defined_metadata_info: list):
        self.vectordb = vectordb
        self.llm = llm
        self.n_result = n_relevant_docs_result
        self.defined_info = defined_metadata_info

    def invoke_and_save(self, user_input: str, history_data: list, prompts:str | UserReceiptQueryInsightPrompt, prompts_dict:dict={},image_path:str=None):
        
        emb_func = DefaultEmbeddingModel()

        retrieval_data = self.vectordb.select(
            user_input, 
            emb_func([user_input])[0],
            self.n_result
        )

        if len(retrieval_data) > 0:
            metadata_info = {}
            for info in self.defined_info:
                selected_infos = [selected_info[info] for selected_info in retrieval_data["metadatas"][0]]
                metadata_info.update({info: selected_infos})
            prompts_dict.update({'reference_sql_query': metadata_info,
                                 'receipt_image_path': image_path})
        else:
            prompts_dict.update({'reference_sql_query': None,
                                 'receipt_image_path': image_path})


        response, history_data = self.llm.generate_output(user_input, prompts, history_data, prompts_dict)

        return response, history_data
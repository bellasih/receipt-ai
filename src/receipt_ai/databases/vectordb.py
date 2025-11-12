from receipt_ai.config.config import settings
from receipt_ai.databases.base import Dao
from receipt_ai.models.embeddings import GeminiEmbeddingModel, DefaultEmbeddingModel

import chromadb
import numpy as np
import uuid

from sklearn.metrics.pairwise import cosine_similarity


class ChromaVectorDB(Dao):
    def __init__(self, collection_name:str):
        self.collection_name = collection_name
        self.collection = self.init_conn()

    def init_conn(self):
        try:
            chroma_client = chromadb.PersistentClient(path=settings.CHROMADB_PATH)
            collection = chroma_client.get_or_create_collection(name=self.collection_name,
                                                                metadata={"hnsw:space": "cosine"})
            return collection
        except Exception as e:
            print(f'failed due to this errors occured: {e}')

    def insert(self, data, metadata, embedding_model_str:str="gemini"):
        embedding_model = GeminiEmbeddingModel() if embedding_model_str== "gemini" else DefaultEmbeddingModel()
        embeddings_matrix = embedding_model([data])

        id_data = str(uuid.uuid4())

        try:
            self.collection.upsert(
                documents=[data],
                embeddings = [embeddings_matrix],
                ids=[id_data],
                metadatas=[metadata]
            )
        except Exception as e:
            self.collection.upsert(
                documents=[data],
                embeddings = embeddings_matrix,
                ids=[id_data],
                metadatas=[metadata]
            )

    def select(self, query_text, query_embedding=None, n_results:int=2):
        if query_embedding.any():
            results = self.collection.query(
                query_embeddings=[query_embedding], 
                n_results=n_results
            )
        else:
            results = self.collection.query(
                query_texts=[query_text], 
                n_results=n_results
            )
        return results

from receipt_ai.config.config import settings

from google import genai
from google.genai import types

import numpy as np
import onnxruntime as ort
from typing import List
from tokenizers import Tokenizer

def normalize(v):
    norm = np.linalg.norm(v, axis=1)
    norm[norm == 0] = 1e-12
    return v / norm[:, np.newaxis]

class DefaultEmbeddingModel():
    def __init__(self):
        # max_seq_length = 256, for some reason sentence-transformers uses 256 even though the HF config has a max length of 128
        # https://github.com/UKPLab/sentence-transformers/blob/3e1929fddef16df94f8bc6e3b10598a98f46e62d/docs/_static/html/models_en_sentence_embeddings.html#LL480
        self.tokenizer = Tokenizer.from_file(settings.TRANSFORMERS_TOKENIZER_JSON_PATH)
        self.tokenizer.enable_truncation(max_length=256)
        self.tokenizer.enable_padding(pad_id=0, pad_token="[PAD]", length=256)
        self.model = ort.InferenceSession(settings.TRANSFORMERS_ONNX_PATH)
        

    def __call__(self, documents: List[str], batch_size: int = 32):
        all_embeddings = []
        for i in range(0, len(documents), batch_size):
            batch = documents[i:i + batch_size]
            encoded = [self.tokenizer.encode(d) for d in batch]
            input_ids = np.array([e.ids for e in encoded])
            attention_mask = np.array([e.attention_mask for e in encoded])
            onnx_input = {
                "input_ids": np.array(input_ids, dtype=np.int64),
                "attention_mask": np.array(attention_mask, dtype=np.int64),
                "token_type_ids": np.array([np.zeros(len(e), dtype=np.int64) for e in input_ids], dtype=np.int64),
            }
            model_output = self.model.run(None, onnx_input)
            last_hidden_state = model_output[0]
            # Perform mean pooling with attention weighting
            input_mask_expanded = np.broadcast_to(np.expand_dims(attention_mask, -1), last_hidden_state.shape)
            embeddings = np.sum(last_hidden_state * input_mask_expanded, 1) / np.clip(input_mask_expanded.sum(1), a_min=1e-9, a_max=None)
            embeddings = normalize(embeddings).astype(np.float32)
            all_embeddings.append(embeddings)
        return np.concatenate(all_embeddings)


class GeminiEmbeddingModel():
    def __init__(self):
        self.client = self.init_client()

    def __call__(self, documents: List[str]):
        result = [
            np.array(e.values) for e in self.client.models.embed_content(
                model=settings.GEMINI_EMBEDDING_MODEL,
                contents=documents,
                config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")).embeddings
        ]
        embeddings_matrix = np.array(result)
        return embeddings_matrix

    def init_client(self):
        try:
           return genai.Client(api_key=settings.GEMINI_API_KEY)
        except Exception as e:
            print(f"Can't initiate the LLM client due to: {e}")
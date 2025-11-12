from pydantic import  BaseModel
from typing import List

class RequestState(BaseModel):
  system_prompt: str
  messages: List[str]
  history_data: List[dict]
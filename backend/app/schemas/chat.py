from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    conversation_id: int | None = None
    message: str = Field(min_length=1, max_length=5000)


class ChatResponse(BaseModel):
    conversation_id: int
    reply: str

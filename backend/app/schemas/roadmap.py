from pydantic import BaseModel


class RoadmapItemResponse(BaseModel):
    id: int
    title: str
    description: str
    order_no: int
    completed: bool

    model_config = {"from_attributes": True}


class RoadmapResponse(BaseModel):
    id: int
    title: str
    career_id: int
    duration_weeks: int
    items: list[RoadmapItemResponse]

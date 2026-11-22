from pydantic import BaseModel


class CareerResponse(BaseModel):
    id: int
    name: str
    description: str
    required_skills: list
    average_salary: str | None
    demand_score: float

    model_config = {"from_attributes": True}

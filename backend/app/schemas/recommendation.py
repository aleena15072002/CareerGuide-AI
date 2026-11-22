from pydantic import BaseModel


class RecommendationResponse(BaseModel):
    career_id: int
    career_name: str
    recommendation_score: float
    matched_skills: list[str]
    missing_skills: list[str]

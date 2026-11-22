from pydantic import BaseModel, Field


class ProfileRequest(BaseModel):
    education: str | None = None
    specialization: str | None = None
    experience_years: int = Field(default=0, ge=0)
    skills: list[str] = []
    interests: list[str] = []
    target_role: str | None = None
    bio: str | None = None


class ProfileResponse(ProfileRequest):
    id: int
    user_id: int

    model_config = {"from_attributes": True}

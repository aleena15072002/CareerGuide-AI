from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.career import Career
from app.models.profile import StudentProfile
from app.models.user import User
from app.schemas.recommendation import RecommendationResponse

router = APIRouter()


def calculate_score(student_skills: list[str], required_skills: list[str]):
    student = {skill.strip().lower() for skill in student_skills}
    required = {skill.strip().lower() for skill in required_skills}

    if not required:
        return 0.0, [], []

    matched = sorted(student.intersection(required))
    missing = sorted(required.difference(student))
    score = round((len(matched) / len(required)) * 100, 2)

    return score, matched, missing


@router.get("", response_model=list[RecommendationResponse])
def get_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.scalar(
        select(StudentProfile).where(StudentProfile.user_id == current_user.id)
    )

    student_skills = profile.skills if profile and profile.skills else []
    careers = db.scalars(select(Career)).all()

    results = []

    for career in careers:
        score, matched, missing = calculate_score(
            student_skills,
            career.required_skills or [],
        )

        results.append(
            RecommendationResponse(
                career_id=career.id,
                career_name=career.name,
                recommendation_score=score,
                matched_skills=matched,
                missing_skills=missing,
            )
        )

    return sorted(
        results,
        key=lambda item: item.recommendation_score,
        reverse=True,
    )

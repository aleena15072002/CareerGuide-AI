from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.profile import StudentProfile
from app.models.user import User
from app.schemas.profile import ProfileRequest, ProfileResponse

router = APIRouter()


@router.get("", response_model=ProfileResponse | None)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.scalar(
        select(StudentProfile).where(StudentProfile.user_id == current_user.id)
    )


@router.put("", response_model=ProfileResponse)
def update_profile(
    payload: ProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.scalar(
        select(StudentProfile).where(StudentProfile.user_id == current_user.id)
    )

    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)

    for key, value in payload.model_dump().items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.career import Career
from app.schemas.career import CareerResponse

router = APIRouter()


@router.get("", response_model=list[CareerResponse])
def list_careers(
    db: Session = Depends(get_db),
    _current_user=Depends(get_current_user),
):
    return db.scalars(select(Career).order_by(Career.id)).all()


@router.get("/{career_id}", response_model=CareerResponse)
def get_career(
    career_id: int,
    db: Session = Depends(get_db),
    _current_user=Depends(get_current_user),
):
    career = db.get(Career, career_id)

    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    return career

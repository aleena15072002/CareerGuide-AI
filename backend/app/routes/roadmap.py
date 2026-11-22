from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.roadmap import Roadmap, RoadmapItem
from app.models.user import User
from app.schemas.roadmap import RoadmapResponse

router = APIRouter()


@router.get("/{career_id}", response_model=RoadmapResponse)
def get_roadmap(
    career_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = db.scalar(
        select(Roadmap).where(
            Roadmap.user_id == current_user.id,
            Roadmap.career_id == career_id,
        )
    )

    if not roadmap:
        roadmap = Roadmap(
            user_id=current_user.id,
            career_id=career_id,
            title="Personalized Career Roadmap",
            duration_weeks=12,
        )
        db.add(roadmap)
        db.flush()

        items = [
            ("Learn core fundamentals", "Strengthen the fundamentals required for this career.", 1),
            ("Build practical projects", "Build 2-3 portfolio-ready projects.", 2),
            ("Improve advanced skills", "Practice advanced tools and real-world development.", 3),
            ("Prepare for interviews", "Practice technical and behavioral interview questions.", 4),
            ("Apply for jobs", "Start targeted applications and networking.", 5),
        ]

        for title, description, order_no in items:
            db.add(
                RoadmapItem(
                    roadmap_id=roadmap.id,
                    title=title,
                    description=description,
                    order_no=order_no,
                )
            )

        db.commit()
        db.refresh(roadmap)

    items = db.scalars(
        select(RoadmapItem)
        .where(RoadmapItem.roadmap_id == roadmap.id)
        .order_by(RoadmapItem.order_no)
    ).all()

    return RoadmapResponse(
        id=roadmap.id,
        title=roadmap.title,
        career_id=roadmap.career_id,
        duration_weeks=roadmap.duration_weeks,
        items=items,
    )


@router.patch("/items/{item_id}/complete")
def complete_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = db.get(RoadmapItem, item_id)

    if not item:
        raise HTTPException(status_code=404, detail="Roadmap item not found")

    roadmap = db.get(Roadmap, item.roadmap_id)

    if not roadmap or roadmap.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    item.completed = not item.completed
    db.commit()

    return {"message": "Roadmap item updated", "completed": item.completed}

from datetime import datetime, timezone
from sqlalchemy import ForeignKey, Float, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class CareerRecommendation(Base):
    __tablename__ = "career_recommendations"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    career_id: Mapped[int] = mapped_column(ForeignKey("careers.id", ondelete="CASCADE"))
    recommendation_score: Mapped[float] = mapped_column(Float)
    matched_skills: Mapped[list] = mapped_column(JSON, default=list)
    missing_skills: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

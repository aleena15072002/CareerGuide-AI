from sqlalchemy import String, Text, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Career(Base):
    __tablename__ = "careers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), unique=True, index=True)
    description: Mapped[str] = mapped_column(Text)
    required_skills: Mapped[list] = mapped_column(JSON, default=list)
    average_salary: Mapped[str | None] = mapped_column(String(100), nullable=True)
    demand_score: Mapped[float] = mapped_column(Float, default=0)

from app.database import Base, engine, SessionLocal
from app.models.career import Career


CAREERS = [
    {
        "name": "Full Stack Developer",
        "description": "Build complete web applications across frontend and backend.",
        "required_skills": ["JavaScript", "React", "Node.js", "Express.js", "SQL", "Git"],
        "average_salary": "₹4 LPA - ₹12 LPA",
        "demand_score": 92,
    },
    {
        "name": "Backend Developer",
        "description": "Design APIs, business logic, databases and backend services.",
        "required_skills": ["Python", "FastAPI", "SQL", "PostgreSQL", "REST API", "Git"],
        "average_salary": "₹4 LPA - ₹14 LPA",
        "demand_score": 90,
    },
    {
        "name": "Frontend Developer",
        "description": "Create responsive and interactive web applications.",
        "required_skills": ["HTML", "CSS", "JavaScript", "React", "Git"],
        "average_salary": "₹3 LPA - ₹10 LPA",
        "demand_score": 88,
    },
    {
        "name": "Data Analyst",
        "description": "Analyze business data and communicate actionable insights.",
        "required_skills": ["Python", "Pandas", "SQL", "Excel", "Data Visualization"],
        "average_salary": "₹3 LPA - ₹9 LPA",
        "demand_score": 84,
    },
    {
        "name": "AI/ML Engineer",
        "description": "Build and deploy machine learning and AI solutions.",
        "required_skills": ["Python", "Machine Learning", "Pandas", "NumPy", "TensorFlow", "SQL"],
        "average_salary": "₹6 LPA - ₹20 LPA",
        "demand_score": 95,
    },
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        if db.query(Career).count():
            print("Careers already seeded.")
            return

        for item in CAREERS:
            db.add(Career(**item))

        db.commit()
        print("Career data seeded successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed()

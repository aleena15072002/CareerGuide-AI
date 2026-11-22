from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database import Base, engine
from app.routes import auth, profile, careers, recommendations, roadmap, chat, notifications
from app.routes.pdf_analyzer import router as pdf_analyzer_router
from app.routes.placement import router as placement_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareerGuide AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/accounts", tags=["Accounts"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(careers.router, prefix="/api/careers", tags=["Careers"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["Roadmap"])
app.include_router(chat.router, prefix="/api/chat", tags=["AI Chat"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(pdf_analyzer_router)
app.include_router(placement_router)


@app.get("/")
def root():
    return {"message": "CareerGuide AI API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}

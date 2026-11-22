from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.dependencies import get_current_user
from app.models.user import User
from app.services.gemini_service import gemini_service


router = APIRouter(
    prefix="/api/placement",
    tags=["Placement Preparation"]
)


class AnswerRequest(BaseModel):
    question: str
    answer: str


@router.get("/questions")
def get_questions(
    current_user: User = Depends(get_current_user),
):
    return {
        "questions": [
            {
                "id": 1,
                "category": "Technical",
                "question": "What is REST API?"
            },
            {
                "id": 2,
                "category": "Technical",
                "question": "What is JWT authentication?"
            },
            {
                "id": 3,
                "category": "Technical",
                "question": "What is the difference between SQL and NoSQL?"
            },
            {
                "id": 4,
                "category": "HR",
                "question": "Tell me about yourself."
            },
            {
                "id": 5,
                "category": "HR",
                "question": "Why should we hire you?"
            }
        ]
    }


@router.post("/evaluate")
def evaluate_answer(
    data: AnswerRequest,
    current_user: User = Depends(get_current_user),
):

    prompt = f"""
You are an experienced technical interviewer.

Evaluate this candidate's interview answer.

Question:
{data.question}

Candidate Answer:
{data.answer}

Return ONLY valid JSON:

{{
    "score": 0,
    "strengths": [],
    "weaknesses": [],
    "feedback": "",
    "improved_answer": ""
}}

Score must be between 0 and 100.
Give practical feedback.
"""

    try:
        response = gemini_service.client.models.generate_content(
            model=__import__("app.core.config", fromlist=["settings"]).settings.GEMINI_MODEL,
            contents=prompt,
        )

        return {
            "question": data.question,
            "evaluation": response.text or "{}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Answer evaluation failed: {str(e)}"
        )
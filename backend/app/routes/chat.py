from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.chat import ChatConversation, ChatMessage
from app.models.profile import StudentProfile
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.gemini_service import gemini_service

router = APIRouter()


@router.post("", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if payload.conversation_id:
        conversation = db.get(ChatConversation, payload.conversation_id)

        if not conversation or conversation.user_id != current_user.id:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = ChatConversation(
            user_id=current_user.id,
            title="Career Chat",
        )
        db.add(conversation)
        db.flush()

    previous_messages = db.scalars(
        select(ChatMessage)
        .where(ChatMessage.conversation_id == conversation.id)
        .order_by(ChatMessage.created_at)
    ).all()

    history = [
        {"role": item.role, "content": item.content}
        for item in previous_messages
    ]

    profile = db.scalar(
        select(StudentProfile).where(StudentProfile.user_id == current_user.id)
    )

    profile_context = "No profile information available."

    if profile:
        profile_context = f"""
Education: {profile.education}
Specialization: {profile.specialization}
Experience: {profile.experience_years} years
Skills: {profile.skills}
Interests: {profile.interests}
Target role: {profile.target_role}
"""

    reply = gemini_service.generate_career_reply(
        payload.message,
        profile_context,
        history,
    )

    db.add(ChatMessage(
        conversation_id=conversation.id,
        role="user",
        content=payload.message,
    ))

    db.add(ChatMessage(
        conversation_id=conversation.id,
        role="assistant",
        content=reply,
    ))

    db.commit()

    return ChatResponse(
        conversation_id=conversation.id,
        reply=reply,
    )

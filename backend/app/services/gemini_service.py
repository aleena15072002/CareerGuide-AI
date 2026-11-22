from google import genai
from google.genai import types

from app.core.config import settings


class GeminiService:

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    # -------------------------
    # Career Chat
    # -------------------------
    def generate_career_reply(
        self,
        message: str,
        profile_context: str,
        history: list[dict],
    ) -> str:

        history_text = "\n".join(
            f"{item['role']}: {item['content']}"
            for item in history[-10:]
        )

        prompt = f"""
You are CareerGuide AI, a professional career guidance assistant.

Student profile:
{profile_context}

Recent conversation:
{history_text}

Student's new message:
{message}

Give a practical, concise and personalized answer.

Focus on:
- Career guidance
- Skills
- Learning roadmap
- Interview preparation
- Projects
- Resume
- Job search
- Professional development

Do not invent personal information about the student.
"""

        response = self.client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.5,
            ),
        )

        return response.text or "I could not generate a response right now."

    # -------------------------
    # Resume / PDF Analysis
    # -------------------------
    def analyze_resume(self, resume_text: str) -> str:

        prompt = f"""
You are CareerGuide AI, a professional resume analyzer.

Analyze the following student's resume.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "summary": "Short professional summary",
    "skills": [],
    "education": [],
    "experience": [],
    "suggested_careers": [],
    "skill_gaps": [],
    "recommendations": []
}}

Rules:
- Extract information only from the resume.
- Do not invent personal information.
- Keep the summary concise.
- List technical and professional skills separately when possible.
- Suggest careers based on the actual skills and experience.
- Identify realistic skill gaps.
- Give practical recommendations.

Resume:
{resume_text[:12000]}
"""

        response = self.client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
            ),
        )

        return response.text or "{}"


gemini_service = GeminiService()
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from pypdf import PdfReader
import io

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.services.gemini_service import gemini_service


router = APIRouter(
    prefix="/api/pdf",
    tags=["PDF Analyzer"]
)


@router.post("/analyze")
async def analyze_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="PDF file is required"
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    try:
        contents = await file.read()

        reader = PdfReader(
            io.BytesIO(contents)
        )

        extracted_text = ""

        for page in reader.pages:
            extracted_text += (
                page.extract_text() or ""
            ) + "\n"

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF"
            )

        ai_response = gemini_service.analyze_resume(
            extracted_text
        )

        return {
            "filename": file.filename,
            "analysis": ai_response
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"PDF analysis failed: {str(e)}"
        )
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from app.services.parser import (
    extract_text_from_pdf
)

from app.services.ats import (
    calculate_ats_score
)

from app.services.extractor import (
    extract_keywords
)

from app.services.skills import (
    match_skills
)

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # Extract resume text
    resume_text = extract_text_from_pdf(
        file.file
    )

    # ATS score
    ats_result = calculate_ats_score(
        resume_text,
        job_description
    )

    # Keyword extraction
    resume_keywords = extract_keywords(
        resume_text
    )

    jd_keywords = extract_keywords(
        job_description
    )

    # Skill matching
    skills_result = match_skills(
        resume_keywords,
        jd_keywords
    )

    return {

        "score": ats_result["score"],

        "similarity": ats_result[
            "similarity"
        ],

        "matched_skills": skills_result[
            "matched_skills"
        ],

        "missing_skills": skills_result[
            "missing_skills"
        ]
    }
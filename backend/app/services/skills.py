from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def match_skills(
    resume_keywords,
    jd_keywords
):

    matched = []

    missing = []

    for jd_skill in jd_keywords:

        jd_embedding = model.encode(
            [jd_skill]
        )

        best_score = 0

        for resume_skill in resume_keywords:

            resume_embedding = model.encode(
                [resume_skill]
            )

            similarity = cosine_similarity(
                jd_embedding,
                resume_embedding
            )[0][0]

            if similarity > best_score:
                best_score = similarity

        if best_score > 0.55:
            matched.append(jd_skill)
        else:
            missing.append(jd_skill)

    return {
        "matched_skills": matched,
        "missing_skills": missing
    }
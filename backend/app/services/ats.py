from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load pretrained embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def calculate_ats_score(
    resume_text,
    jd_text
):

    # Convert text → embeddings
    resume_embedding = model.encode(
        [resume_text]
    )

    jd_embedding = model.encode(
        [jd_text]
    )

    # Compute similarity
    similarity = cosine_similarity(
        resume_embedding,
        jd_embedding
    )[0][0]

    # Convert to percentage
    score = int(similarity * 100)

    return {
        "score": score,
        "similarity": float(similarity)
    }
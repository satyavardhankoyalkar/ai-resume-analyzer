import re
import spacy

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.services.ontology import (
    SKILLS_ONTOLOGY
)

nlp = spacy.load("en_core_web_sm")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def clean_text(text):

    text = text.lower()

    text = re.sub(r"\n", " ", text)

    text = re.sub(
        r"[^a-zA-Z0-9+#.\s]",
        " ",
        text
    )

    text = re.sub(r"\s+", " ", text)

    return text

def extract_keywords(text):

    cleaned = clean_text(text)

    doc = nlp(cleaned)

    # Candidate phrases
    candidates = []

    for chunk in doc.noun_chunks:

        phrase = chunk.text.strip()

        if len(phrase) > 2:
            candidates.append(phrase)

    extracted = []

    for candidate in candidates:

        candidate_embedding = model.encode(
            [candidate]
        )

        best_similarity = 0

        for skill in SKILLS_ONTOLOGY:

            skill_embedding = model.encode(
                [skill]
            )

            similarity = cosine_similarity(
                candidate_embedding,
                skill_embedding
            )[0][0]

            if similarity > best_similarity:
                best_similarity = similarity

        # Semantic threshold
        if best_similarity > 0.55:
            extracted.append(candidate)

    return list(set(extracted))
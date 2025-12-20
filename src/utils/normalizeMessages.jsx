export function normalizeMessage(m) {
    return {
        type: m.role === "user" ? "user" : "ai",
        text: m.role === "user" ? m.input_text : m.summary || "",
        flashcards: Array.isArray(m.flashcards) ? m.flashcards : [],
        quiz: Array.isArray(m.quiz) ? m.quiz : [],
        avatar: "..."
    };
}

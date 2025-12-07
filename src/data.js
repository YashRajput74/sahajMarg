const data = [
    {
        id: "chat_1",
        title: "Photosynthesis notes",
        messages: [
            {
                id: "msg_1",
                type: "user",
                text: "Explain photosynthesis.",
                timestamp: 1715000000000
            },
            {
                id: "msg_2",
                type: "summary",
                text: "Photosynthesis is the process...",
                timestamp: 1715000005000
            },
            {
                id: "msg_3",
                type: "flashcards",
                cards: [
                    { id: "card_1", question: "...", answer: "..." },
                    { id: "card_2", question: "...", answer: "..." }
                ],
                timestamp: 1715000010000
            },
            {
                id: "msg_4",
                type: "quiz",
                questions: [
                    { id: "q1", question: "...", options: [], answer: "..." }
                ],
                timestamp: 1715000015000
            }
        ]
    }
]


const savedFlashcards = [
    {
        id: "set_1",
        title: "Photosynthesis Flashcards",
        topic: "Biology",
        sourceChatId: "chat_1",
        createdAt: 1715000010000,
        description: "Generated from my study notes.",
        cards: [
            { id: "card_1", question: "...", answer: "..." },
            { id: "card_2", question: "...", answer: "..." }
        ]
    }
]

const quizResults = [
    {
        id: "attempt_1",
        quizSetId: "quiz_set_1",
        timestamp: 1715001000000,
        timeTaken: 42,
        score: 8,
        total: 10,

        answers: [
            {
                questionId: "q1",
                selected: "Option A",
                correct: "Option A",
                isCorrect: true
            },
            {
                questionId: "q2",
                selected: "Option C",
                correct: "Option B",
                isCorrect: false
            }
        ]
    }
]
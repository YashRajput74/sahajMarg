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

export const webVitalsTopic = {
    "pages": [
        {
            "id": 1,
            "conceptPanel": {
                "badgeIcon": "auto_awesome",
                "badgeText": "The Concept",
                "title": "Web Vitals",
                "points": [
                    {
                        "icon": "trending_up",
                        "text": "Measures how fast and smooth a website feels for users."
                    },
                    {
                        "icon": "speed",
                        "text": "Helps make websites faster and easier to use."
                    }
                ],
                "quote": "Good Web Vitals = Happy Users!"
            },
            "exampleCard": {
                "icon": "info",
                "title": "Why it matters",
                "subtitle": "User Experience",
                "text": "If your site loads slowly or moves around, users get frustrated. Web Vitals help track this.",
                "highlight": {
                    "icon": "emoji_events",
                    "text": "Simple numbers to measure website health."
                }
            }
        },
        {
            "id": 2,
            "conceptPanel": {
                "badgeIcon": "timer",
                "badgeText": "The Concept",
                "title": "Largest Contentful Paint (LCP)",
                "points": [
                    {
                        "icon": "bolt",
                        "text": "Shows how fast the main content loads."
                    },
                    {
                        "icon": "watch_later",
                        "text": "Fast LCP means users see content quickly."
                    }
                ],
                "quote": "Faster content = happier users!"
            },
            "exampleCard": {
                "icon": "web",
                "title": "Example",
                "subtitle": "Page Loading",
                "text": "If the big hero image or main heading appears quickly, LCP is good.",
                "highlight": {
                    "icon": "flash_on",
                    "text": "Optimizing images makes LCP faster."
                }
            }
        },
        {
            "id": 3,
            "conceptPanel": {
                "badgeIcon": "view_in_ar",
                "badgeText": "The Concept",
                "title": "Cumulative Layout Shift (CLS)",
                "points": [
                    {
                        "icon": "dashboard",
                        "text": "Shows how stable the page looks while loading."
                    },
                    {
                        "icon": "flip",
                        "text": "Avoid elements jumping around."
                    }
                ],
                "quote": "Stable pages reduce frustration."
            },
            "exampleCard": {
                "icon": "drag_handle",
                "title": "Example",
                "subtitle": "Buttons Jumping",
                "text": "If text or buttons move while loading, CLS is high.",
                "highlight": {
                    "icon": "check_circle",
                    "text": "Reserve space for images and ads to keep things stable."
                }
            }
        },
        {
            "id": 4,
            "conceptPanel": {
                "badgeIcon": "touch_app",
                "badgeText": "The Concept",
                "title": "First Input Delay (FID)",
                "points": [
                    {
                        "icon": "fingerprint",
                        "text": "Shows how fast the page reacts to user actions."
                    },
                    {
                        "icon": "speed",
                        "text": "Low FID means users can interact quickly."
                    }
                ],
                "quote": "Responsive pages feel snappy."
            },
            "exampleCard": {
                "icon": "mouse",
                "title": "Example",
                "subtitle": "Click a Button",
                "text": "If you can click a button immediately after page load, FID is good.",
                "highlight": {
                    "icon": "flash_on",
                    "text": "Minimize heavy scripts to reduce delays."
                }
            }
        }
    ]
}

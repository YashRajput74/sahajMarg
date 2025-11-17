import { useState } from "react";
import "../styles/HomePage.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";

const HomePage = () => {
    const [messages, setMessages] = useState([]);

    const handleSend = async (userText) => {
        // 1. Add user message
        const newUserMessage = {
            type: "user",
            text: userText,
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQbRcneAwdczjkpNqGNx_m8eK1BKxj2s2XS9odEdZljKeVjfqGZVaVbwwvI-43OuaCFtxJ8elsUabNM3H5f2EXdyRi1Q93lcwu09-Fko06U6iDlx5CzNRVL2uwtUeodkDokfeaGVyeh8SOLopSd5WCc9tb_W_inh4f6Ao5dz632VBMo_5XzJArBCxoSatxYdUPd11D92GvruTHUxv7bU1KD2qHOpMWVO4W7Gwd15i7Z9dvfkHS9YNB6qVqaPPdfqIviQkx4h5nMiJ",
        };

        setMessages((prev) => [...prev, newUserMessage]);

        // 2. Detect intent
        const text = userText.toLowerCase();
        let intent = "chat";

        if (text.includes("flashcard") || text.includes("cards"))
            intent = "flashcards";
        else if (text.includes("quiz") || text.includes("questions"))
            intent = "quiz";
        else if (text.includes("summarize") || text.includes("summary"))
            intent = "summary";

        // 3. Send AI placeholder response
        setMessages((prev) => [
            ...prev,
            {
                type: "ai",
                text: "Generating your result...",
                avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
        },
        ]);

        // 4. Insert correct block
        setTimeout(() => {
            if (intent === "flashcards") {
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "flashcards",
                        cards: [
                            { front: "Rome was founded in?", back: "753 BC" },
                            { front: "First emperor?", back: "Augustus" },
                        ],
                    },
                ]);
            } else if (intent === "quiz") {
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "quiz",
                        questions: [
                            {
                                question: "Who was the first emperor of Rome?",
                                options: ["Julius Caesar", "Augustus", "Nero"],
                                answer: "Augustus",
                            },
                        ],
                    },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "ai",
                        text: "Here is a short summary:\nThe Roman Empire was one of the largest empires in history...",
                        avatar:
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
                    },
                ]);
            }
        }, 800);
    };

    return (
        <div className="home-container">
            <Sidebar />
            <main className="main-content">
                {messages.length === 0 ? (
                    <HomeCenterContent />
                ) : (
                    <ChatWindow messages={messages} />
                )}

                <InputBar onSend={handleSend} />
            </main>
        </div>
    );
};

export default HomePage;

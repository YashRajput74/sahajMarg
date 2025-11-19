import { useState } from "react";
import "../styles/HomePage.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";

const HomePage = () => {
    const [messages, setMessages] = useState([]);

    const handleSend = async (userText) => {
        const newUserMessage = {
            type: "user",
            text: userText,
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQbRcneAwdczjkpNqGNx_m8eK1BKxj2s2XS9odEdZljKeVjfqGZVaVbwwvI-43OuaCFtxJ8elsUabNM3H5f2EXdyRi1Q93lcwu09-Fko06U6iDlx5CzNRVL2uwtUeodkDokfeaGVyeh8SOLopSd5WCc9tb_W_inh4f6Ao5dz632VBMo_5XzJArBCxoSatxYdUPd11D92GvruTHUxv7bU1KD2qHOpMWVO4W7Gwd15i7Z9dvfkHS9YNB6qVqaPPdfqIviQkx4h5nMiJ",
        };

        setMessages((prev) => [...prev, newUserMessage]);

        // AI placeholder
        setMessages((prev) => [
            ...prev,
            {
                type: "ai",
                text: "Generating summary, flashcards and quiz...",
                avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
            },
        ]);

        // Now always add summary → flashcards → quiz
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,

                // 1️⃣ Summary block
                {
                    type: "ai",
                    text: `Here is a short summary:\n${userText}... (summary generated here)`,
                    avatar:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
                },

                // 2️⃣ Flashcards Block
                {
                    type: "flashcards",
                    cards: [
                        { front: "Card 1", back: "Answer 1" },
                        { front: "Card 2", back: "Answer 2" },
                    ],
                },

                // 3️⃣ Quiz Block
                {
                    type: "quiz",
                    questions: [
                        {
                            question: "Sample question?",
                            options: ["A", "B", "C"],
                            answer: "A",
                        },
                    ],
                },
            ]);
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

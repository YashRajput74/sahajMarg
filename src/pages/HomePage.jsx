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

        setMessages((prev) => [
            ...prev,
            {
                type: "ai",
                text: "Generating summary, flashcards and quiz...",
                avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
            },
        ]);
        
        try {
            const summaryRes = await fetch("http://localhost:5000/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const summaryData = await summaryRes.json();

            setMessages((prev) => [
                ...prev,
                {
                    type: "ai",
                    text: summaryData.summary,
                    avatar:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
                },
            ]);

            const flashRes = await fetch("http://localhost:5000/generate-flashcards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const flashData = await flashRes.json();

            setMessages((prev) => [
                ...prev,
                { type: "flashcards", cards: flashData.flashcards }
            ]);

            // --- Quiz ---
            const quizRes = await fetch("http://localhost:5000/generate-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const quizData = await quizRes.json();

            setMessages((prev) => [
                ...prev,
                { type: "quiz", questions: quizData.quizzes }
            ]);

        } catch (err) {
            console.error("❌ FRONTEND ERROR:", err);
            setMessages((prev) => [
                ...prev,
                {
                    type: "ai",
                    text: "Something went wrong generating study material.",
                    avatar:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
                },
            ]);
        }
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

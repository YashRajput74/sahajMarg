import { useState } from "react";
import "../styles/HomePage.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const HomePage = () => {
    const [chats, setChats] = useState([
        { id: "1", title: "New Chat", messages: [] }
    ]);

    const [activeChatId, setActiveChatId] = useState("1");

    const activeChat = chats.find((c) => c.id === activeChatId);
    const generateChatTitle = (text) => {
        const words = text.split(" ");
        const short = words.slice(0, 7).join(" ");

        return short.length > 35 ? short.slice(0, 35) + "..." : short;
    };

    const handleNewChat = () => {
        const id = Date.now().toString();
        const newChat = { id, title: "New Chat", messages: [] };

        setChats((prev) => [...prev, newChat]);
        setActiveChatId(id);
    };

    const handleSelectChat = (id) => {
        setActiveChatId(id);
    };

    const handleSend = async (userText) => {
        const userMessage = {
            type: "user",
            text: userText,
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQbRcneAwdczjkpNqGNx_m8eK1BKxj2s2XS9odEdZljKeVjfqGZVaVbwwvI-43OuaCFtxJ8elsUabNM3H5f2EXdyRi1Q93lcwu09-Fko06U6iDlx5CzNRVL2uwtUeodkDokfeaGVyeh8SOLopSd5WCc9tb_W_inh4f6Ao5dz632VBMo_5XzJArBCxoSatxYdUPd11D92GvruTHUxv7bU1KD2qHOpMWVO4W7Gwd15i7Z9dvfkHS9YNB6qVqaPPdfqIviQkx4h5nMiJ",
        };

        // 🟢 Add user message + update title if first message
        setChats((prev) =>
            prev.map((chat) => {
                if (chat.id === activeChatId) {
                    const isFirstMessage = chat.messages.length === 0;

                    return {
                        ...chat,
                        title: isFirstMessage ? generateChatTitle(userText) : chat.title,
                        messages: [...chat.messages, userMessage],
                    };
                }
                return chat;
            })
        );

        // 🟡 Add loading message (typing effect)
        const loadingMessage = {
            type: "ai",
            text: "Generating summary, flashcards and quiz...",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === activeChatId
                    ? { ...chat, messages: [...chat.messages, loadingMessage] }
                    : chat
            )
        );

        try {
            // SUMMARY
            const summaryRes = await fetch(`${BACKEND_URL}/summarize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const summaryData = await summaryRes.json();

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                {
                                    type: "ai",
                                    text: summaryData.summary,
                                    avatar: loadingMessage.avatar,
                                },
                            ],
                        }
                        : chat
                )
            );

            // FLASHCARDS
            const flashRes = await fetch(`${BACKEND_URL}/generate-flashcards`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const flashData = await flashRes.json();

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                { type: "flashcards", cards: flashData.flashcards },
                            ],
                        }
                        : chat
                )
            );

            // QUIZ
            const quizRes = await fetch(`${BACKEND_URL}/generate-quiz`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const quizData = await quizRes.json();

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                { type: "quiz", questions: quizData.quizzes },
                            ],
                        }
                        : chat
                )
            );
        } catch (err) {
            console.error("❌ FRONTEND ERROR:", err);

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                {
                                    type: "ai",
                                    text: "Something went wrong generating study material.",
                                    avatar: loadingMessage.avatar,
                                },
                            ],
                        }
                        : chat
                )
            );
        }
    };

    return (
        <div className="home-container">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
            />

            <main className="main-content">
                {activeChat.messages.length === 0 ? (
                    <HomeCenterContent />
                ) : (
                    <ChatWindow messages={activeChat.messages} />
                )}

                <InputBar onSend={handleSend} />
            </main>
        </div>
    );
};

export default HomePage;

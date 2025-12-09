import { useEffect, useState } from "react";
import "../styles/HomePage.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";
import SavedNotesPage from "../components/SavedNotesPage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const HomePage = () => {
    const [chats, setChats] = useState([
        { id: "1", title: "New Chat", messages: [] }
    ]);

    const [activeChatId, setActiveChatId] = useState("1");
    const [savedFlashcards, setSavedFlashcards] = useState([]);
    const [showSavedNotes, setShowSavedNotes] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const handleSaveFlashcards = (data) => {
        setSavedFlashcards(prev => [...prev, data]);
    };

    const handleOpenSavedNotes = () => {
        setShowSavedNotes(true);
    };

    // ✅ Load from localStorage ONCE
    useEffect(() => {
        const storedChats = localStorage.getItem("studyhub_chats");
        const storedActiveChat = localStorage.getItem("studyhub_activeChatId");

        if (storedChats) setChats(JSON.parse(storedChats));
        if (storedActiveChat) setActiveChatId(storedActiveChat);

        setHydrated(true);
    }, []);

    // ✅ Save chats whenever they change (AFTER hydration)
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("studyhub_chats", JSON.stringify(chats));
        }
    }, [chats, hydrated]);

    // ✅ Save activeChatId whenever it changes
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("studyhub_activeChatId", activeChatId);
        }
    }, [activeChatId, hydrated]);


    const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

    const generateChatTitle = (text) => {
        const words = text.split(" ");
        const short = words.slice(0, 7).join(" ");
        return short.length > 35 ? short.slice(0, 35) + "..." : short;
    };

    const handleNewChat = () => {
        setShowSavedNotes(false);
        const existingEmptyChat = chats.find(chat => chat.messages.length === 0);

        if (existingEmptyChat) {
            setActiveChatId(existingEmptyChat.id);
            return;
        }

        const id = Date.now().toString();
        const newChat = { id, title: "New Chat", messages: [] };

        setChats(prev => [...prev, newChat]);
        setActiveChatId(id);
    };

    const handleSelectChat = (id) => {
        setShowSavedNotes(false);
        setActiveChatId(id);
    };


    const handleSend = async (userText) => {
        const userMessage = {
            type: "user",
            text: userText,
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQbRcneAwdczjkpNqGNx_m8eK1BKxj2s2XS9odEdZljKeVjfqGZVaVbwwvI-43OuaCFtxJ8elsUabNM3H5f2EXdyRi1Q93lcwu09-Fko06U6iDlx5CzNRVL2uwtUeodkDokfeaGVyeh8SOLopSd5WCc9tb_W_inh4f6Ao5dz632VBMo_5XzJArBCxoSatxYdUPd11D92GvruTHUxv7bU1KD2qHOpMWVO4W7Gwd15i7Z9dvfkHS9YNB6qVqaPPdfqIviQkx4h5nMiJ",
        };

        // Add user message
        setChats(prev =>
            prev.map(chat =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        title: chat.messages.length === 0 ? generateChatTitle(userText) : chat.title,
                        messages: [...chat.messages, userMessage]
                    }
                    : chat
            )
        );

        const loadingMessage = {
            type: "ai",
            text: "Generating summary, flashcards and quiz...",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO",
        };

        setChats(prev =>
            prev.map(chat =>
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

            setChats(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, {
                                type: "ai",
                                text: summaryData.summary,
                                avatar: loadingMessage.avatar
                            }]
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

            setChats(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, {
                                type: "flashcards",
                                cards: flashData.flashcards
                            }]
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

            setChats(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, {
                                type: "quiz",
                                questions: quizData.quizzes
                            }]
                        }
                        : chat
                )
            );

        } catch (err) {
            console.error("❌ FRONTEND ERROR:", err);
        }
    };

    return (
        <div className="home-container">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onOpenSavedNotes={handleOpenSavedNotes}
            />

            <main className="main-content">
                {showSavedNotes ? (
                    <SavedNotesPage savedFlashcards={savedFlashcards} />
                ) : (
                    <>
                        {activeChat.messages.length === 0 ? (
                            <HomeCenterContent />
                        ) : (
                            <ChatWindow
                                messages={activeChat.messages}
                                onSaveFlashcards={handleSaveFlashcards}
                            />
                        )}

                        <InputBar onSend={handleSend} />
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;

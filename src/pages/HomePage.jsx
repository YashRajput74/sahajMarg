import { useEffect, useState, useRef } from "react";
import "../styles/HomePage.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";
import SavedNotesPage from "../components/SavedNotesPage";
import { supabase } from "../lib/supabaseClient";

const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL !== ""
        ? import.meta.env.VITE_BACKEND_URL
        : "https://sahajmarg-backend.onrender.com";

const HomePage = () => {
    const [chats, setChats] = useState([
        {
            id: "temp-landing",
            title: "New Chat",
            messages: [],
            isTemp: true,
        },
    ]);
    const [activeChatId, setActiveChatId] = useState("temp-landing");

    const [savedFlashcards, setSavedFlashcards] = useState([]);
    const [showSavedNotes, setShowSavedNotes] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const abortRef = useRef(null);

    const setMessagesForChat = (chatId, newMessages) => {
        setChats((prev) =>
            prev.map((c) =>
                c.id === chatId ? { ...c, messages: newMessages } : c
            )
        );
    };

    useEffect(() => {
        const loadChats = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setHydrated(true);
                return;
            }

            const res = await fetch(`${BACKEND_URL}/chats/${user.id}`);
            const loadedChats = await res.json();

            const normalized = loadedChats.map((c) => ({
                id: c.id,
                title: c.title,
                messages: [],
                isTemp: false,
            }));

            setChats((prev) => [...normalized, ...prev.filter((c) => c.isTemp)]);

            if (normalized.length > 0) {
                setActiveChatId(normalized[0].id);
            }

            setHydrated(true);
        };

        loadChats();
    }, []);

    const handleDeleteChat = async (chatId) => {
        if (!confirm("Delete this chat permanently?")) return;

        try {
            await fetch(`${BACKEND_URL}/chat/${chatId}`, { method: "DELETE" });

            setChats(prev => prev.filter(c => c.id !== chatId));

            if (activeChatId === chatId) {
                setActiveChatId("temp-landing");
            }

        } catch (err) {
            console.error("Delete chat error:", err);
        }
    };

    const handleSelectChat = async (id) => {
        setShowSavedNotes(false);
        setActiveChatId(id);

        if (id.startsWith("temp")) return;  // prevent crash for temp chats

        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        try {
            const res = await fetch(`${BACKEND_URL}/messages/${id}`, {
                signal: abortRef.current.signal,
            });
            const msgs = await res.json();

            const formatted = msgs.map(m => {
                if (m.role === "user") {
                    return {
                        type: "user",
                        text: m.input_text,
                        avatar: "...",
                    };
                } else {
                    return {
                        type: "ai",
                        text: m.summary,
                        flashcards: m.flashcards,
                        quiz: m.quiz,
                        avatar: "...",
                    };
                }
            });

            setMessagesForChat(id, formatted);

        } catch (err) {
            if (err.name !== "AbortError") console.error(err);
        }
    };

    const handleNewChat = () => {
        setShowSavedNotes(false);

        const tempId = "temp-" + Date.now();

        setChats((prev) => [
            {
                id: tempId,
                title: "New Chat",
                messages: [],
                isTemp: true,
            },
            ...prev,
        ]);

        setActiveChatId(tempId);
    };

    const handleSend = async (userText) => {
        const chatId = activeChatId;

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return alert("You must be logged in");

        setChats((prev) =>
            prev.map((c) =>
                c.id === chatId
                    ? {
                        ...c,
                        messages: [
                            ...c.messages,
                            {
                                type: "user",
                                text: userText,
                                avatar: "...",
                            },
                            {
                                type: "ai",
                                text: "Generating summary, flashcards and quiz...",
                                avatar: "...",
                                loading: true,
                            },
                        ],
                    }
                    : c
            )
        );

        try {
            const res = await fetch(`${BACKEND_URL}/message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    chatId: chatId.startsWith("temp") ? null : chatId,
                    text: userText,
                }),
            });

            const data = await res.json();
            const newChatId = data.chatId;

            setChats((prev) =>
                prev.map((c) => {
                    if (chatId.startsWith("temp") && c.id === chatId) {
                        return {
                            ...c,
                            id: newChatId,
                            isTemp: false,
                            messages: c.messages.map((msg) =>
                                msg.loading
                                    ? {
                                        type: "ai",
                                        text: data.assistant.summary,
                                        flashcards: data.assistant.flashcards,
                                        quiz: data.assistant.quiz,
                                        avatar: "...",
                                        loading: false,
                                    }
                                    : msg
                            ),
                        };
                    }

                    if (c.id === (chatId.startsWith("temp") ? newChatId : chatId)) {
                        return {
                            ...c,
                            messages: c.messages.map((msg) =>
                                msg.loading
                                    ? {
                                        type: "ai",
                                        text: data.assistant.summary,
                                        flashcards: data.assistant.flashcards,
                                        quiz: data.assistant.quiz,
                                        avatar: "...",
                                        loading: false,
                                    }
                                    : msg
                            ),
                        };
                    }

                    return c;
                })
            );

            if (chatId.startsWith("temp")) {
                setActiveChatId(newChatId);
            }
        } catch (err) {
            console.error("❌ FRONTEND SEND ERROR:", err);
        }
    };

    const handleSaveFlashcards = (fc) => {
        setSavedFlashcards((prev) => [...prev, fc]);
    };

    if (!hydrated) return <div className="loading-screen">Loading...</div>;

    const activeChat = chats.find((c) => c.id === activeChatId);

    return (
        <div className="home-container">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onOpenSavedNotes={() => setShowSavedNotes(true)}
                onDeleteChat={handleDeleteChat}
            />

            <main className="main-content">
                {showSavedNotes ? (
                    <SavedNotesPage savedFlashcards={savedFlashcards} />
                ) : activeChat && activeChat.messages.length > 0 ? (
                    <>
                        <ChatWindow
                            messages={activeChat.messages}
                            onSaveFlashcards={handleSaveFlashcards}
                        />
                        <InputBar onSend={handleSend} />
                    </>
                ) : (
                    <>
                        <HomeCenterContent />
                        <InputBar onSend={handleSend} />
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;

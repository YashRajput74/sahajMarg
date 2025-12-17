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
    const [showSavedNotes, setShowSavedNotes] = useState(false);
    const [savedFlashcards, setSavedFlashcards] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    const abortRef = useRef(null);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_IN" && session?.user) {
                    const guestChats = chats
                        .filter(c => c.isTemp)
                        .map(c => ({
                            title: c.title,
                            messages: c.messages.map(m => ({
                                role: m.type === "user" ? "user" : "assistant",
                                text: m.type === "user" ? m.text : null,
                                summary: m.type === "ai" ? m.text : null,
                                flashcards: m.flashcards ?? null,
                                quiz: m.quiz ?? null,
                            })),
                        }));

                    if (guestChats.length > 0) {
                        await fetch(`${BACKEND_URL}/claim-guest-chats`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                userId: session.user.id,
                                guestChats,
                            }),
                        });
                    }

                    const res = await fetch(`${BACKEND_URL}/chats/${session.user.id}`);
                    const data = await res.json();

                    const normalized = data.map(c => ({
                        id: c.id,
                        title: c.title,
                        messages: [],
                        isTemp: false,
                    }));

                    setChats(normalized);
                    if (normalized.length > 0) {
                        setActiveChatId(normalized[0].id);
                    }
                }
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, [chats]);

    useEffect(() => {
        const loadUserChats = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const res = await fetch(`${BACKEND_URL}/chats/${user.id}`);
                const data = await res.json();

                setChats(data.map(c => ({
                    id: c.id,
                    title: c.title,
                    messages: [],
                    isTemp: false,
                })));

                if (data.length > 0) setActiveChatId(data[0].id);
            }

            setHydrated(true);
        };

        loadUserChats();
    }, []);

    const setMessagesForChat = (chatId, messages) => {
        setChats(prev =>
            prev.map(c => (c.id === chatId ? { ...c, messages } : c))
        );
    };

    const handleSelectChat = async (chatId) => {
        setShowSavedNotes(false);
        setActiveChatId(chatId);

        if (chatId.startsWith("temp")) return;

        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        try {
            const res = await fetch(`${BACKEND_URL}/messages/${chatId}`, {
                signal: abortRef.current.signal,
            });

            const msgs = await res.json();

            const formatted = msgs.map(m =>
                m.role === "user"
                    ? { type: "user", text: m.input_text, avatar: "..." }
                    : {
                        type: "ai",
                        text: m.summary,
                        flashcards: m.flashcards,
                        quiz: m.quiz,
                        avatar: "...",
                    }
            );

            setMessagesForChat(chatId, formatted);
        } catch (err) {
            if (err.name !== "AbortError") console.error(err);
        }
    };

    const handleNewChat = () => {
        const tempId = `temp-${Date.now()}`;

        setChats(prev => [
            {
                id: tempId,
                title: "New Chat",
                messages: [],
                isTemp: true,
            },
            ...prev,
        ]);

        setActiveChatId(tempId);
        setShowSavedNotes(false);
    };

    const handleSend = async (text) => {
        const chatId = activeChatId;
        const { data: { user } } = await supabase.auth.getUser();

        // Optimistic UI
        setChats(prev =>
            prev.map(c =>
                c.id === chatId
                    ? {
                        ...c,
                        messages: [
                            ...c.messages,
                            { type: "user", text, avatar: "..." },
                            { type: "ai", text: "Thinking...", loading: true, avatar: "..." },
                        ],
                    }
                    : c
            )
        );

        const endpoint = user
            ? `${BACKEND_URL}/message`
            : `${BACKEND_URL}/message/guest`;

        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                user
                    ? {
                        userId: user.id,
                        chatId: chatId.startsWith("temp") ? null : chatId,
                        text,
                    }
                    : { text }
            ),
        });

        const data = await res.json();

        if (!user) {
            setChats(prev =>
                prev.map(c =>
                    c.id === chatId
                        ? {
                            ...c,
                            messages: c.messages.map(m =>
                                m.loading
                                    ? {
                                        type: "ai",
                                        text: data.summary,
                                        flashcards: data.flashcards,
                                        quiz: data.quiz,
                                        avatar: "...",
                                        loading: false,
                                    }
                                    : m
                            ),
                        }
                        : c
                )
            );
            return;
        }

        const newChatId = data.chatId;

        setChats(prev =>
            prev.map(c => {
                if (chatId.startsWith("temp") && c.id === chatId) {
                    return {
                        ...c,
                        id: newChatId,
                        isTemp: false,
                        messages: c.messages.map(m =>
                            m.loading
                                ? {
                                    type: "ai",
                                    text: data.assistant.summary,
                                    flashcards: data.assistant.flashcards,
                                    quiz: data.assistant.quiz,
                                    avatar: "...",
                                    loading: false,
                                }
                                : m
                        ),
                    };
                }

                if (c.id === newChatId) {
                    return {
                        ...c,
                        messages: c.messages.map(m =>
                            m.loading
                                ? {
                                    type: "ai",
                                    text: data.assistant.summary,
                                    flashcards: data.assistant.flashcards,
                                    quiz: data.assistant.quiz,
                                    avatar: "...",
                                    loading: false,
                                }
                                : m
                        ),
                    };
                }

                return c;
            })
        );

        if (chatId.startsWith("temp")) {
            setActiveChatId(newChatId);
        }
    };

    const handleDeleteChat = async (chatId) => {
        if (!confirm("Delete this chat permanently?")) return;

        await fetch(`${BACKEND_URL}/chat/${chatId}`, { method: "DELETE" });

        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) setActiveChatId("temp-landing");
    };

    const handleSaveFlashcards = (fc) => {
        setSavedFlashcards(prev => [...prev, fc]);
    };

    if (!hydrated) return <div className="loading-screen">Loading...</div>;

    const activeChat = chats.find(c => c.id === activeChatId);

    return (
        <div className="home-container">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleDeleteChat}
                onOpenSavedNotes={() => setShowSavedNotes(true)}
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

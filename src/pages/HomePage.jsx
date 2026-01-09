import { useEffect, useState, useRef } from "react";
import "../styles/HomePage.css";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";
import SavedNotesPage from "../components/SavedNotesPage";
import { supabase } from "../lib/supabaseClient";
import { normalizeMessage } from "../utils/normalizeMessages";
import Modal from "../components/Modal";

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
    const chatsRef = useRef([]);
    const hasClaimedRef = useRef(false);
    const abortRef = useRef(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        chatsRef.current = chats;
    }, [chats]);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (
                    event === "SIGNED_IN" &&
                    session?.user &&
                    !hasClaimedRef.current
                ) {
                    hasClaimedRef.current = true;

                    const guestChats = chatsRef.current
                        .filter(c => c.isTemp && c.messages.length > 0)
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

                    const res = await fetch(
                        `${BACKEND_URL}/chats/${session.user.id}`
                    );
                    const data = await res.json();

                    setChats(
                        data.map(c => ({
                            id: c.id,
                            title: c.title,
                            messages: [],
                            isTemp: false,
                        }))
                    );

                    if (data.length > 0) {
                        setActiveChatId(data[0].id);
                    }
                }
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, []);

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

            const formatted = msgs.map(normalizeMessage);

            setMessagesForChat(chatId, formatted);
        } catch (err) {
            if (err.name !== "AbortError") console.error(err);
        }
    };

    const saveFlashcard = async ({ cardId, messageId, chatId }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { status: "unauthenticated" };

        const res = await fetch(`${BACKEND_URL}/flashcards/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                cardId,
                messageId,
                chatId
            })
        });

        if (!res.ok && res.status !== 409) {
            return { status: "error" };
        }

        await fetchSavedFlashcards();

        return { status: "success" };
    };

    const deleteSavedFlashcard = async ({ cardId, messageId }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await fetch(`${BACKEND_URL}/flashcards/saved`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                cardId,
                messageId
            })
        });

        setSavedFlashcards(prev =>
            prev.filter(c => c.id !== cardId)
        );
    };

    const deleteSavedFlashcardSet = async (chatId) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await fetch(`${BACKEND_URL}/flashcards/saved/chat/${chatId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id })
        });

        setSavedFlashcards(prev =>
            prev.filter(c => c.chatId !== chatId)
        );
    };

    const fetchSavedFlashcards = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const res = await fetch(
            `${BACKEND_URL}/flashcards/saved/${user.id}`
        );
        const cards = await res.json();

        setSavedFlashcards(cards);
    };

    const handleNewChat = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        const existingEmptyTemp = chats.find(
            c => c.isTemp && c.messages.length === 0
        );

        if (existingEmptyTemp) {
            setActiveChatId(existingEmptyTemp.id);
            setShowSavedNotes(false);
            return;
        }

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

    const handleSend = async ({ text, file }) => {
        const { data: { user } } = await supabase.auth.getUser();

        if (file && !user) {
            setShowAuthModal(true);
            return;
        }

        const chatId = activeChatId;

        setChats(prev =>
            prev.map(c =>
                c.id === chatId
                    ? {
                        ...c,
                        messages: [
                            ...c.messages,
                            {
                                type: "user",
                                text: file ? `📎 Uploaded file: ${file.name}` : text,
                                avatar: "..."
                            },
                            { type: "ai", text: "Thinking...", loading: true, avatar: "..." },
                        ],
                    }
                    : c
            )
        );

        const endpoint = user
            ? `${BACKEND_URL}/message`
            : `${BACKEND_URL}/message/guest`;
        let body;
        let headers = {};

        if (user) {
            body = new FormData();

            if (file) {
                body.append("file", file);
            } else {
                body.append("text", text.trim());
            }

            body.append("userId", user.id);

            if (!chatId.startsWith("temp")) {
                body.append("chatId", chatId);
            }
        }
        else {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify({ text });
        }

        const res = await fetch(endpoint, {
            method: "POST",
            headers,
            body,
        });

        const data = await res.json();

        if (!user) {
            setChats(prev =>
                prev.map(c => {
                    if (c.id !== chatId) return c;

                    return {
                        ...c,
                        title: c.title === "New Chat" && data.title ? data.title : c.title,
                        messages: c.messages.map(m =>
                            m.loading
                                ? {
                                    type: "ai",
                                    text: data.assistant.summary,
                                    flashcards: data.assistant.flashcards,
                                    quiz: data.assistant.quiz,
                                    avatar: "...",
                                    loading: false,
                                    animated: true
                                }
                                : m
                        ),
                    };
                })
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
                        title: data.title || c.title,
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
                                    animated: true
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
                                    animated: true
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
                onOpenSavedNotes={() => {
                    setShowSavedNotes(true);
                    fetchSavedFlashcards();
                }}
            />

            <main className="main-content">
                {showSavedNotes ? (
                    <SavedNotesPage
                        savedFlashcards={savedFlashcards}
                        onDeleteCard={deleteSavedFlashcard}
                        onDeleteSet={deleteSavedFlashcardSet}
                    />
                ) : activeChat && activeChat.messages.length > 0 ? (
                    <>
                        <ChatWindow
                            messages={activeChat.messages}
                            chatId={activeChat.id}
                            onSaveFlashcards={saveFlashcard}
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

            <Modal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    );
};

export default HomePage;

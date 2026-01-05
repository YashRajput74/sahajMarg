import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import FlashcardBlock from "./FlashcardBlock";
import QuizBlock from "./QuizBlock";
import Modal from "./Modal";
import "../styles/HomePage.css";
import { supabase } from "../lib/supabaseClient";

const ChatWindow = ({ messages, chatId, onSaveFlashcards }) => {
    const messagesEndRef = useRef(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);
    return (
        <div className="chat-window">
            {!isAuthenticated && (
                <div className="login-cta">
                    <button onClick={() => setShowAuthModal(true)}>
                        Log in / Sign up
                    </button>
                </div>
            )}
            <div className="chat-container">


                {messages.map((msg, index) => {
                    if (msg.type === "user" || msg.type === "ai") {
                        return (
                            <div key={index}>
                                <Message
                                    type={msg.type}
                                    name={msg.type === "user" ? "You" : "AI Assistant"}
                                    text={msg.text}
                                    avatar={msg.avatar}
                                    animated={msg.animated}
                                />

                                {Array.isArray(msg.flashcards) && msg.flashcards.length > 0 && (
                                    <FlashcardBlock
                                        cards={msg.flashcards}
                                        topic="Flashcards"
                                        chatId={chatId}
                                        messageId={msg.id}
                                        onSaveFlashcards={onSaveFlashcards}
                                    />
                                )}

                                {msg.quiz?.length > 0 && (
                                    <QuizBlock
                                        questions={msg.quiz}
                                        topic="Quiz"
                                    />
                                )}
                            </div>
                        );
                    }
                    return null;
                })}

                <div ref={messagesEndRef} />

                <Modal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
            </div>
        </div>
    );
};

export default ChatWindow;

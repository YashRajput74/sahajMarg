import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import FlashcardBlock from "./FlashcardBlock";
import QuizBlock from "./QuizBlock";
import Modal from "./Modal";
import "../styles/HomePage.css";

const ChatWindow = ({ messages, onSaveFlashcards }) => {
    const messagesEndRef = useRef(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="login-cta">
                <button onClick={() => setShowAuthModal(true)}>
                    Log in / Sign up
                </button>
            </div>
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
                                />

                                {msg.flashcards?.length > 0 && (
                                    <FlashcardBlock
                                        cards={msg.flashcards}
                                        topic="Flashcards"
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

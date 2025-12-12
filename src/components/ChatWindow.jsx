import { useEffect, useRef } from "react";
import Message from "./Message";
import FlashcardBlock from "./FlashcardBlock";
import QuizBlock from "./QuizBlock";
import "../styles/HomePage.css";

const ChatWindow = ({ messages, onSaveFlashcards }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-window">
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

                                {msg.flashcards && msg.flashcards.length > 0 && (
                                    <FlashcardBlock
                                        cards={msg.flashcards}
                                        topic="Flashcards"
                                        onSaveFlashcards={onSaveFlashcards}
                                    />
                                )}

                                {msg.quiz && msg.quiz.length > 0 && (
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

                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
};

export default ChatWindow;

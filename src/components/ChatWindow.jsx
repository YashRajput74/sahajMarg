import { useEffect, useRef } from "react";
import Message from "./Message";
import FlashcardBlock from "./FlashcardBlock";
import QuizBlock from "./QuizBlock";
import "../styles/HomePage.css";

const ChatWindow = ({ messages }) => {
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
                            <Message
                                key={index}
                                type={msg.type}
                                name={msg.type === "user" ? "You" : "AI Assistant"}
                                text={msg.text}
                                avatar={msg.avatar}
                            />
                        );
                    }

                    if (msg.type === "flashcards") {
                        return (
                            <FlashcardBlock
                                key={index}
                                cards={msg.cards}
                                topic={msg.topic}
                            />
                        );
                    }

                    if (msg.type === "quiz") {
                        return (
                            <QuizBlock
                                key={index}
                                questions={msg.questions}
                                topic={msg.topic}
                            />
                        );
                    }

                    return null;
                })}

                {/* AUTO-SCROLL ANCHOR */}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    );
};

export default ChatWindow;

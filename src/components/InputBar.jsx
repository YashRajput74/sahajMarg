import { useState } from "react";
import "../styles/HomePage.css";

const InputBar = ({ onSend }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="input-bar">
            <div className="input-container">
                <button className="icon-btn left">
                    <span className="material-symbols-outlined">attach_file</span>
                </button>

                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask anything or upload your study material…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <button className="icon-btn right send-btn" onClick={handleSend}>
                    <span className="material-symbols-outlined">arrow_upward</span>
                </button>
            </div>
        </div>
    );
};

export default InputBar;

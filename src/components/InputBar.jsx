import { useRef, useState } from "react";
import "../styles/HomePage.css";

const InputBar = ({ onSend }) => {
    const [input, setInput] = useState("");
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSend = () => {
        if (!input.trim() && !file) return;

        onSend({
            text: input.trim(),
            file
        });

        setInput("");
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const MAX_SIZE_MB = 5;
        if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
            alert("File size should be under 10MB");
            return;
        }

        setFile(selectedFile);
    };

    return (
        <div className="input-bar">
            <div className="input-container">
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={handleFileChange}
                />

                <button
                    className="icon-btn left"
                    onClick={() => fileInputRef.current.click()}
                >
                    <span className="material-symbols-outlined">
                        attach_file
                    </span>
                </button>

                <input
                    type="text"
                    className="chat-input"
                    placeholder={
                        file
                            ? `Selected: ${file.name}`
                            : "Ask anything or upload your study material…"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <button
                    className="icon-btn right send-btn"
                    onClick={handleSend}
                >
                    <span className="material-symbols-outlined">
                        arrow_upward
                    </span>
                </button>
            </div>
        </div>
    );
};

export default InputBar;

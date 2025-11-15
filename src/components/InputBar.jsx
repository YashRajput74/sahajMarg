import "../styles/HomePage.css";

const InputBar = () => {
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
                />
                <button className="icon-btn right send-btn">
                    <span className="material-symbols-outlined">arrow_upward</span>
                </button>
            </div>
        </div>
    );
};

export default InputBar;

import "../styles/HomePage.css";

const Message = ({ type, name, text, avatar }) => {
    const isUser = type === "user";
    return (
        <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
            {!isUser && <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>}

            <div className="message-content">
                <p className="message-name">{name}</p>
                <p className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>{text}</p>
            </div>

            {isUser && <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>}
        </div>
    );
};

export default Message;

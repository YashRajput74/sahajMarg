import "../styles/HomePage.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import useTypewriter from "../hooks/useTypewriter";

const Message = ({ type, name, text, avatar }) => {
    const isUser = type === "user";

    const defaultAvatar = isUser
        ? "/avatars/user.png"
        : "/avatars/ai.png";

    // 🔥 Animate AI messages only
    const animatedText = !isUser
        ? useTypewriter(text)
        : text;

    return (
        <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
            {!isUser && (
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${avatar || defaultAvatar})`,
                    }}
                />
            )}

            <div className="message-content">
                <p className="message-name">{name}</p>

                <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                    {isUser ? (
                        text
                    ) : (
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {animatedText}
                        </ReactMarkdown>
                    )}
                </div>
            </div>

            {isUser && (
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${avatar || defaultAvatar})`,
                    }}
                />
            )}
        </div>
    );
};

export default Message;

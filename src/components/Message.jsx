import "../styles/HomePage.css";
import TypewriterText from "./TypewriterText";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Message = ({ type, name, text, avatar }) => {
    const isUser = type === "user";

    const defaultAvatar = isUser
        ? "/avatars/user.png"
        : "/avatars/ai.png";

    const renderers = {
        p({ children }) {
            if (typeof children[0] === "string") {
                return (
                    <p>
                        <TypewriterText text={children[0]} />
                    </p>
                );
            }

            return <p>{children}</p>;
        },
        code({ className, children }) {
            return (
                <pre className={className || ""}>
                    <code>{children}</code>
                </pre>
            );
        },
    };

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
                        <ReactMarkdown
                            rehypePlugins={[rehypeHighlight]}
                            components={renderers}
                        >
                            {text}
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

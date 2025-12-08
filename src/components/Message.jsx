import "../styles/HomePage.css";
import TypewriterText from "./TypewriterText";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Message = ({ type, name, text, avatar }) => {
    const isUser = type === "user";

    const renderers = {
        code({ node, inline, className, children, ...props }) {
            return (
                <pre className={className} style={{ whiteSpace: "pre-wrap" }}>
                    <code {...props}>{children}</code>
                </pre>
            );
        },
        p({ node, children }) {
            const arr = Array.isArray(children) ? children : [children];
            const content = arr.map((child, idx) =>
                typeof child === "string" ? <TypewriterText key={idx} text={child} /> : child
            );
            return <p>{content}</p>;
        },
    };

    return (
        <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
            {!isUser && (
                <div
                    className="avatar"
                    style={{ backgroundImage: `url(${avatar})` }}
                />
            )}

            <div className="message-content">
                <p className="message-name">{name}</p>

                <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                    {isUser ? (
                        text
                    ) : (
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={renderers}>
                            {text}
                        </ReactMarkdown>
                    )}
                </div>
            </div>

            {isUser && (
                <div
                    className="avatar"
                    style={{ backgroundImage: `url(${avatar})` }}
                />
            )}
        </div>
    );
};

export default Message;

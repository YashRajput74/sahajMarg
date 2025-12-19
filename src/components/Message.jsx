import "../styles/HomePage.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import useTypewriter from "../hooks/useTypewriter";
import Avatar from "./Avatar";

const Message = ({ type, name, text }) => {
    const isUser = type === "user";

    const avatarSrc = isUser
        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCzQbRcneAwdczjkpNqGNx_m8eK1BKxj2s2XS9odEdZljKeVjfqGZVaVbwwvI-43OuaCFtxJ8elsUabNM3H5f2EXdyRi1Q93lcwu09-Fko06U6iDlx5CzNRVL2uwtUeodkDokfeaGVyeh8SOLopSd5WCc9tb_W_inh4f6Ao5dz632VBMo_5XzJArBCxoSatxYdUPd11D92GvruTHUxv7bU1KD2qHOpMWVO4W7Gwd15i7Z9dvfkHS9YNB6qVqaPPdfqIviQkx4h5nMiJ"
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuCzxX4sNsEhQ8eNXiqCIZQhqIX84xR39xZBP9NxUbNGzf8oMSIxWqNlR0V_CU9Lzhm7ylwl4kh2d_A7D1qaf7zzLLw-rp9QKNr_CxNMeVviX5P70CPQc0M740BrDnfZ7XTpMcT6wjpw0WFfqVyoFT127KBuL4BEhO3oY4kIHrYC5HYC-9yXeF9PZzN4eIpElscY6g6QSApYyWeksXqPCIbOZmU-Zp7TfHIsmSNbRpV5RsNuyC8HSV3nk12dLukHBV_Repr0SqrFsGnO";

    const hasText =
        typeof text === "string" && text.trim().length > 0;

    // Animate AI text only if text exists
    const animatedText =
        !isUser && hasText ? useTypewriter(text) : text;

    return (
        <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
            {/* AI avatar on the LEFT */}
            {!isUser && <Avatar src={avatarSrc} alt="AI assistant" />}

            <div className="message-content">
                <p className="message-name">{name}</p>

                {/* Render bubble ONLY if text exists */}
                {hasText && (
                    <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                        {isUser ? (
                            text
                        ) : (
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {animatedText}
                            </ReactMarkdown>
                        )}
                    </div>
                )}
            </div>

            {/* User avatar on the RIGHT */}
            {isUser && <Avatar src={avatarSrc} alt="User avatar" />}
        </div>
    );
};

export default Message;

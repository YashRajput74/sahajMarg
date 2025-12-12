import "../styles/HomePage.css";

const Sidebar = ({
    chats = [],
    activeChatId,
    hydrated = true,
    onNewChat,
    onSelectChat,
    onOpenSavedNotes,
    onDeleteChat
}) => {

    const handleChatClick = (id) => {
        if (!hydrated) return;
        if (!id) return;
        onSelectChat(id);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-top">

                <div className="logo-section">
                    <div
                        className="logo"
                        style={{ backgroundImage: `url("/logo.png")` }}
                    />
                    <div className="logo-text">
                        <h1>Study AI</h1>
                        <p>Your Assistant</p>
                    </div>
                </div>

                <button className="new-chat-btn" onClick={onNewChat}>
                    + New Chat
                </button>

                <div className="chat-list">
                    {chats.length === 0 && (
                        <p style={{ padding: "10px", opacity: 0.6 }}>
                            No chats yet.
                        </p>
                    )}

                    {chats.map((chat) => {
                        // Fix untitled chat name
                        const title =
                            chat.title ||
                            (chat.messages?.[0]?.text
                                ? chat.messages[0].text.slice(0, 20) + "..."
                                : "New Chat");

                        return (
                            <div
                                key={chat.id}
                                className={`chat-item ${chat.id === activeChatId ? "active" : ""
                                    }`}
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <div
                                    className="chat-info"
                                    onClick={() => handleChatClick(chat.id)}
                                >
                                    <span className="material-symbols-outlined">
                                        chat_bubble
                                    </span>
                                    <p>{title}</p>
                                </div>

                                {/* Delete Icon */}
                                <span
                                    className="material-symbols-outlined delete-icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent opening chat
                                        onDeleteChat(chat.id);
                                    }}
                                >
                                    delete
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="sidebar-bottom">
                <div className="nav-item">
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                </div>

                <div className="nav-item" onClick={onOpenSavedNotes}>
                    <span className="material-symbols-outlined">bookmark</span>
                    <p>Saved Notes</p>
                </div>

                <div className="nav-item">
                    <span className="material-symbols-outlined">history</span>
                    <p>History</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

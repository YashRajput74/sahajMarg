import "../styles/HomePage.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <div className="logo-section">
                    <div
                        className="logo"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQOvwGvn4QiIEwi40WpKUIlmjy9s0jT7sq0uz8L5XoR3PSYRoIudFTffa6ak6wrzZbovpHnk7C7J54x2LtXfQt8mOzzHYLCw1gZvc5LDeC_5IHXS3B6jNpZykqWbMMUpl1a0V4RJRvcDf1sKp_3FohC3FfGEXbA64_jZWj9YB0CYXZw1_8Qrm5TSZMJU8TwMVOVcuvcJqx7eqvyYfFj_oTLbCxa7t51z-p1AhgUlXzuITJiNq6q7_m9DgqRYGyo6exwDXypKMdsXNr")',
                        }}
                    />
                    <div className="logo-text">
                        <h1>Study AI</h1>
                        <p>Your Assistant</p>
                    </div>
                </div>

                <button className="new-chat-btn">+ New Chat</button>

                <div className="chat-list">
                    <div className="chat-item active">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <p>Summary of Cognitive...</p>
                    </div>
                    <div className="chat-item">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <p>French Revolution Flashcards</p>
                    </div>
                    <div className="chat-item">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <p>Untitled Chat</p>
                    </div>
                    <div className="chat-item">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <p>Cellular Biology Quiz</p>
                    </div>
                </div>
            </div>

            <div className="sidebar-bottom">
                <div className="nav-item">
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                </div>
                <div className="nav-item">
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

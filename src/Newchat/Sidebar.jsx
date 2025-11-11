import "./NewChat.css";

const Sidebar = () => {
    return (
        <aside className="sw-sidebar">
            <div className="sw-sidebar-top">
                <div className="sw-logo-section">
                    <div className="sw-logo-icon">
                        <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <div>
                        <h1 className="sw-logo-title">StudyWise</h1>
                        <p className="sw-logo-subtitle">AI Study Assistant</p>
                    </div>
                </div>

                <nav className="sw-nav">
                    <a href="#" className="sw-nav-item sw-active">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        New Chat
                    </a>
                    <a href="#" className="sw-nav-item">
                        <span className="material-symbols-outlined">history_edu</span>
                        World War II History
                    </a>
                    <a href="#" className="sw-nav-item">
                        <span className="material-symbols-outlined">calculate</span>
                        Calculus Fundamentals
                    </a>
                    <a href="#" className="sw-nav-item">
                        <span className="material-symbols-outlined">science</span>
                        Organic Chemistry
                    </a>
                </nav>
            </div>

            <button className="sw-add-topic-btn" disabled>Add New Topic</button>
        </aside>
    );
};

export default Sidebar;

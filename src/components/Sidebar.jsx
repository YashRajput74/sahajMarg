import "../pages/StudyHub.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">✨</div>
                <div className="brand-text">
                    <h1>StudyAI</h1>
                    <p>Your Assistant</p>
                </div>
            </div>

            <nav className="nav">
                <a href="#" className="nav-item active">📝 Summary Generator</a>
                <a href="#" className="nav-item">💡 Flashcards</a>
                <a href="#" className="nav-item">🧠 Quiz</a>
                <a href="#" className="nav-item">⚙️ Settings</a>
            </nav>
        </aside>
    );
};

export default Sidebar;

import "../pages/StudyHub.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">
                    <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div className="brand-text">
                    <h1>StudyAI</h1>
                    <p>Your Assistant</p>
                </div>
            </div>

            <nav className="nav">
                <a href="#" className="nav-item active">
                    <span className="material-symbols-outlined">edit_document</span>
                    Summary Generator
                </a>
                <a href="#" className="nav-item">
                    <span className="material-symbols-outlined">style</span>
                    Flashcards
                </a>
                <a href="#" className="nav-item">
                    <span className="material-symbols-outlined">quiz</span>
                    Quiz
                </a>
                <a href="#" className="nav-item">
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;

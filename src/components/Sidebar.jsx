import { NavLink } from "react-router-dom";

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
                <NavLink
                    to="/features/summary"
                    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                >
                    <span className="material-symbols-outlined">edit_document</span>
                    Summary Generator
                </NavLink>

                <NavLink
                    to="/features/flashcards"
                    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                >
                    <span className="material-symbols-outlined">style</span>
                    Flashcards
                </NavLink>

                <NavLink
                    to="/features/quiz"
                    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                >
                    <span className="material-symbols-outlined">quiz</span>
                    Quiz
                </NavLink>

                <NavLink
                    to="/features/settings"
                    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                >
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;

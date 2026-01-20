import { useState } from "react";
import "./LearningView.css";
import { webVitalsTopic } from "../../data";

export default function LearningView() {
    const [currentPage, setCurrentPage] = useState(0); // tracks page index
    const [notesOpen, setNotesOpen] = useState(false);
    const [doubt, setDoubt] = useState("");

    const page = webVitalsTopic.pages[currentPage];

    const handleContinue = () => {
        if (currentPage < webVitalsTopic.pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("You have reached the end of the topic!");
        }
    };

    return (
        <div className="lv-root">
            {/* Header */}
            <header className="lv-header">
                <div className="lv-header-left">
                    <span className="material-symbols-outlined lv-header-icon">
                        school
                    </span>
                    <h2 className="lv-header-title">Learning Mode</h2>
                </div>
                <button className="lv-exit-btn">
                    <span className="material-symbols-outlined">close</span>
                    Exit
                </button>
            </header>

            {/* Main */}
            <main className="lv-main">
                {/* Concept Panel */}
                <section className="lv-concept-panel">
                    <div className="lv-concept-inner">
                        <div className="lv-concept-badge">
                            <span className="material-symbols-outlined">
                                {page.conceptPanel.badgeIcon}
                            </span>
                            <span>{page.conceptPanel.badgeText}</span>
                        </div>

                        <h1 className="lv-concept-title">{page.conceptPanel.title}</h1>

                        <ul className="lv-concept-list">
                            {page.conceptPanel.points.map((point, index) => (
                                <li key={index}>
                                    <span className="material-symbols-outlined">
                                        {point.icon}
                                    </span>
                                    {point.text}
                                </li>
                            ))}
                        </ul>

                        <div className="lv-quote-box">{page.conceptPanel.quote}</div>
                    </div>
                </section>

                {/* Example Card */}
                <section className="lv-content-panel">
                    <div className="lv-card">
                        <div className="lv-card-header">
                            <div className="lv-card-icon">
                                <span className="material-symbols-outlined">
                                    {page.exampleCard.icon}
                                </span>
                            </div>
                            <div>
                                <h3>{page.exampleCard.title}</h3>
                                <p>{page.exampleCard.subtitle}</p>
                            </div>
                        </div>

                        <p className="lv-card-text">{page.exampleCard.text}</p>

                        <div className="lv-card-highlight">
                            <span className="material-symbols-outlined">
                                {page.exampleCard.highlight.icon}
                            </span>
                            {page.exampleCard.highlight.text}
                        </div>
                    </div>
                </section>

                {/* Notes Panel */}
                <aside
                    className={`lv-notes-panel ${notesOpen ? "lv-notes-open" : ""}`}
                >
                    <div className="lv-notes-header">
                        <div>
                            <span className="material-symbols-outlined">edit_note</span>
                            <h4>My Journal</h4>
                        </div>
                        <button onClick={() => setNotesOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <textarea
                        className="lv-notes-textarea"
                        placeholder="Write in your own words..."
                    />

                    <button className="lv-notes-save">Save Progress</button>
                </aside>

                {/* Notes Trigger */}
                {!notesOpen && (
                    <button
                        className="lv-notes-trigger"
                        onClick={() => setNotesOpen(true)}
                    >
                        <span className="material-symbols-outlined">edit_note</span>
                    </button>
                )}
            </main>

            {/* Footer */}
            <footer className="lv-footer">
                {/* Doubt input */}
                <div className="lv-doubt-wrapper">
                    <span className="material-symbols-outlined lv-doubt-icon">
                        quiz
                    </span>
                    <input
                        type="text"
                        className="lv-doubt-input"
                        placeholder="Have a doubt? Type here..."
                        value={doubt}
                        onChange={(e) => setDoubt(e.target.value)}
                    />
                </div>

                {/* Footer actions */}
                <div className="lv-footer-actions">
                    <button
                        className="lv-skip-btn"
                        onClick={handleContinue}
                    >
                        <span className="material-symbols-outlined">skip_next</span>
                        Skip Topic
                    </button>
                    <button className="lv-continue-btn" onClick={handleContinue}>
                        Continue
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}

import "../styles/SavedNotesPage.css";

const SavedNotesPage = ({ savedFlashcards = [] }) => {
    return (
        <div className="saved-notes-container">
            <header className="saved-notes-header">
                <h2>Saved Flashcards</h2>
                <p>Manage your flashcard collections and study sessions.</p>
            </header>

            <div className="saved-notes-toolbar">
                <input
                    type="text"
                    placeholder="Search collections..."
                    className="notes-search"
                />

                <select className="notes-sort">
                    <option>Sort by: Date</option>
                    <option>Sort by: Topic</option>
                    <option>Sort by: Name</option>
                </select>
            </div>

            <div className="flashcards-grid">
                {savedFlashcards.length === 0 && (
                    <p className="no-flashcards">No flashcards saved yet.</p>
                )}

                {savedFlashcards.map((item, index) => (
                    <div className="flashcard-box" key={index}>
                        <div className="flashcard-header">
                            <h3>{item.title || "Untitled Set"}</h3>
                            <span className="tag">
                                {item.topic || "General"}
                            </span>
                        </div>

                        <p className="flashcard-desc">
                            {item.description || "No description provided."}
                        </p>

                        <p className="flashcard-count">
                            {Array.isArray(item.cards) ? item.cards.length : 0} Cards
                        </p>

                        <div className="flashcard-actions">
                            <button className="open-btn">Open</button>
                            <button className="icon-btn">✏️</button>
                            <button className="icon-btn">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedNotesPage;

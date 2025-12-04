const SavedNotesModal = ({ savedFlashcards, onClose }) => {
    return (
        <div className="sn-modal-overlay">
            <div className="sn-modal-container">
                <div className="sn-modal-header">
                    <h2>Saved Flashcards</h2>
                    <button className="sn-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="sn-modal-content">
                    {savedFlashcards.length === 0 ? (
                        <p>No flashcards saved yet.</p>
                    ) : (
                        savedFlashcards.map((f, idx) => (
                            <div key={idx} className="sn-flashcard">
                                <p><strong>Topic:</strong> {f.topic}</p>
                                <p><strong>Question:</strong> {f.card.question}</p>
                                <p><strong>Answer:</strong> {f.card.answer}</p>
                                {f.card.explanation && (
                                    <p><strong>Explanation:</strong> {f.card.explanation}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedNotesModal;

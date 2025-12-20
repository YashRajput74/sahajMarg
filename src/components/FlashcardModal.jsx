import { useState } from "react";
import "../styles/Modal.css";

const FlashcardModal = ({ onClose, cards = [], topic = "Flashcards", onSaveFlashcards }) => {
    const safeCards = Array.isArray(cards) ? cards : [];
    const total = safeCards.length;
    const [isSaved, setIsSaved] = useState(false);

    const [index, setIndex] = useState(0);

    const current = safeCards[index];

    const nextCard = () => {
        if (index < total - 1) setIndex(index + 1);
    };

    const prevCard = () => {
        if (index > 0) setIndex(index - 1);
    };

    const saveFlashcards = () => {
        if (isSaved) return;

        onSaveFlashcards({
            topic,
            cards: safeCards,
            savedAt: Date.now()
        });

        setIsSaved(true);
    };

    return (
        <div className="fc-modal-overlay">
            <div className="fc-modal-container">

                <div className="fc-modal-close">
                    <button className="fc-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {total === 0 ? (
                    <p style={{ padding: "20px", textAlign: "center" }}>
                        No flashcards generated.
                    </p>
                ) : (
                    <>
                        <div className="fc-flip-card" tabIndex="0">
                            <div className="fc-flip-card-inner">
                                <div className="fc-flip-card-front">
                                    <div className="fc-card-content">
                                        <p className="fc-question">{current.question}</p>
                                        <p className="fc-hint">Click to flip</p>
                                    </div>
                                </div>

                                <div className="fc-flip-card-back">
                                    <div className="fc-card-content">
                                        <p className="fc-answer">{current.answer}</p>
                                        {current.explanation && (
                                            <p className="fc-explanation">{current.explanation}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fc-card-nav">
                            <button
                                className={`fc-nav-btn ${index === 0 ? "fc-disabled" : ""}`}
                                onClick={prevCard}
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>

                            <p className="fc-progress-text">
                                {index + 1} / {total}
                            </p>

                            <button
                                className={`fc-nav-btn ${index === total - 1 ? "fc-disabled" : ""}`}
                                onClick={nextCard}
                            >
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>

                        <div className="fc-modal-footer">
                            <button
                                className="fc-secondary-btn"
                                onClick={() => setIndex(0)}
                                disabled={isSaved}
                            >
                                Review Again
                            </button>

                            <button
                                className={`fc-primary-btn ${isSaved ? "fc-saved" : ""}`}
                                onClick={saveFlashcards}
                                disabled={isSaved}
                            >
                                {isSaved ? "Saved ✓" : "Save Flashcards"}
                            </button>

                            {isSaved && (
                                <button
                                    className="fc-secondary-btn"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            )}
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default FlashcardModal;

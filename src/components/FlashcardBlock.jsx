import React, { useState } from "react";
import FlashcardModal from "./FlashcardModal";
import "../styles/HomePage.css";

const FlashcardBlock = ({ cards = [], topic = "Flashcards", onSaveFlashcards }) => {
    const [showModal, setShowModal] = useState(false);
    const count = Array.isArray(cards) ? cards.length : 0;

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">{topic}</p>
                    <div className="block-actions">
                        <p className="block-subtext">{count} cards created.</p>
                        <button className="primary-btn" onClick={() => setShowModal(true)}>
                            Open Flashcards
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <FlashcardModal
                    onClose={() => setShowModal(false)}
                    cards={cards}
                    topic={topic}
                    onSaveFlashcards={onSaveFlashcards}
                />
            )}
        </>
    );
};

export default FlashcardBlock;

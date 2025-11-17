import React, { useState } from "react";
import FlashcardModal from "./FlashcardModal";
import "../styles/HomePage.css";

const FlashcardBlock = ({ cards, topic = "Flashcards" }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">{topic}</p>
                    <div className="block-actions">
                        <p className="block-subtext">{cards.length} cards created.</p>
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
                />
            )}
        </>
    );
};

export default FlashcardBlock;

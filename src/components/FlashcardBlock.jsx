import React, { useState } from "react";
import FlashcardModal from "./FlashcardModal";
import "../styles/HomePage.css";

const FlashcardBlock = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">Flashcards: The Roman Empire</p>
                    <div className="block-actions">
                        <p className="block-subtext">10 cards created from your document.</p>
                        <button className="primary-btn" onClick={() => setShowModal(true)}>
                            Open Flashcards
                        </button>
                    </div>
                </div>
            </div>

            {showModal && <FlashcardModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default FlashcardBlock;

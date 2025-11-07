import { useState } from "react";
import "../pages/Flashcards.css"; // optional custom styles

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`flashcard-container ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
        >
            {/* Front */}
            <div className="flashcard front">
                <p className="question">{question}</p>
                <div className="flip-hint">
                    <span className="material-symbols-outlined">flip_camera_android</span>
                    <span>Click to flip</span>
                </div>
            </div>

            {/* Back */}
            <div className="flashcard back">
                <p className="answer">{answer}</p>
                <div className="flip-hint">
                    <span className="material-symbols-outlined">flip_camera_android</span>
                    <span>Click to flip back</span>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;

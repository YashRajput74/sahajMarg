import { useState } from "react";
import "../styles/HomePage.css";
import QuizModal from "./QuizModal";

const QuizBlock = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">Quiz: Key Concepts of the Roman Empire</p>
                    <div className="block-actions">
                        <p className="block-subtext">15 questions to test your knowledge.</p>
                        <button
                            className="primary-btn"
                            onClick={() => setShowModal(true)}
                        >
                            Take Quiz
                        </button>
                    </div>
                </div>
            </div>

            {showModal && <QuizModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default QuizBlock;

import { useState } from "react";
import "../styles/HomePage.css";
import QuizModal from "./QuizModal";

const QuizBlock = ({ questions = [], topic = "Quiz" }) => {
    const [showModal, setShowModal] = useState(false);

    const safeQuestions = Array.isArray(questions) ? questions : [];
    const count = safeQuestions.length;

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">{topic}</p>
                    <div className="block-actions">
                        <p className="block-subtext">{count} questions generated.</p>

                        <button
                            className="primary-btn"
                            disabled={count === 0}
                            onClick={() => count > 0 && setShowModal(true)}
                        >
                            {count === 0 ? "No Quiz Available" : "Take Quiz"}
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <QuizModal
                    onClose={() => setShowModal(false)}
                    questions={safeQuestions}
                    topic={topic}
                />
            )}
        </>
    );
};

export default QuizBlock;

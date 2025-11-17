import { useState } from "react";
import "../styles/HomePage.css";
import QuizModal from "./QuizModal";

const QuizBlock = ({ questions, topic = "Quiz" }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="ai-block">
                <div className="block-header">
                    <p className="block-title">{topic}</p>
                    <div className="block-actions">
                        <p className="block-subtext">{questions.length} questions generated.</p>
                        <button className="primary-btn" onClick={() => setShowModal(true)}>
                            Take Quiz
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <QuizModal
                    onClose={() => setShowModal(false)}
                    questions={questions}
                    topic={topic}
                />
            )}
        </>
    );
};

export default QuizBlock;

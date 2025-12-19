import { useState } from "react";
import "../styles/QuizModal.css";

export default function QuizModal({ onClose, questions = [], topic = "Quiz" }) {
    const safeQuestions = Array.isArray(questions) ? questions : [];
    const total = safeQuestions.length;

    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    if (total === 0) {
        return (
            <div className="quizModal-overlay">
                <div className="quizModal-container">
                    <header className="quizModal-header">
                        <h2 className="quizModal-title">{topic}</h2>
                        <button className="quizModal-close" onClick={onClose}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </header>

                    <p style={{ padding: "30px", textAlign: "center" }}>
                        No quiz questions were generated.
                    </p>
                </div>
            </div>
        );
    }

    const current = safeQuestions[index];

    const options = Array.isArray(current.options) ? current.options : [];

    const selectOption = (option) => {
        setAnswers({ ...answers, [index]: option });
        setShowResult(true);
    };

    const next = () => {
        if (index < total - 1) {
            setIndex(index + 1);
            setShowResult(false);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
            setShowResult(false);
        }
    };

    const goToQuestion = (i) => {
        if (i >= 0 && i < total) {
            setIndex(i);
            setShowResult(false);
        }
    };

    const retryQuiz = () => {
        setIndex(0);
        setAnswers({});
        setShowResult(false);
    };

    return (
        <div className="quizModal-overlay">
            <div className="quizModal-container">

                <header className="quizModal-header">
                    <h2 className="quizModal-title">{topic}</h2>
                    <button className="quizModal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <div className="quizModal-content">
                    <main className="quizModal-main">
                        <div className="quizModal-questionBlock">
                            <h1 className="quizModal-questionTitle">
                                Question {index + 1}
                            </h1>

                            <p className="quizModal-questionText">{current.question}</p>

                            <div className="quizModal-options">
                                {options.map((option, i) => {
                                    const isSelected = answers[index] === option;
                                    const isCorrectAnswer = showResult && option === current.answer;
                                    const isWrongSelected = showResult && isSelected && option !== current.answer;

                                    return (
                                        <label
                                            key={i}
                                            className={`quizModal-option
                                                ${isSelected ? "selected" : ""}
                                                ${isCorrectAnswer ? "correct" : ""}
                                                ${isWrongSelected ? "incorrect" : ""}
                                            `}
                                            onClick={() => selectOption(option)}
                                        >
                                            <input
                                                type="radio"
                                                name={`quiz_q_${index}`}
                                                className="quizModal-radio"
                                                checked={isSelected}
                                                onChange={() => selectOption(option)}
                                            />
                                            <span className="quizModal-optionText">{option}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            {showResult && (
                                <div className="quizModal-feedback">
                                    {answers[index] === current.answer ? (
                                        <p className="correct">✅ Correct!</p>
                                    ) : (
                                        <p className="incorrect">
                                            ❌ Incorrect. <br />
                                            <strong>Correct answer:</strong> {current.answer}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="quizModal-progressSection">
                            <div className="quizModal-progressInfo">
                                <p>Question {index + 1} of {total}</p>
                            </div>

                            <div className="quizModal-progressBar">
                                <div
                                    className="quizModal-progressFill"
                                    style={{ width: `${((index + 1) / total) * 100}%` }}
                                ></div>
                            </div>

                            <div className="quizModal-navButtons">
                                <button
                                    className="quizModal-btnSecondary"
                                    disabled={index === 0}
                                    onClick={prev}
                                >
                                    Previous
                                </button>

                                <button
                                    className="quizModal-btnPrimary"
                                    disabled={index === total - 1}
                                    onClick={next}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>

                    <aside className="quizModal-sidebar">
                        <h3 className="quizModal-sidebarTitle">QUESTIONS</h3>

                        <div className="quizModal-sidebarList">
                            {safeQuestions.map((q, i) => (
                                <div
                                    key={i}
                                    className={`quizModal-sidebarItem 
                                        ${i === index ? "active" : ""}
                                        ${answers[i] ? "answered" : ""}
                                    `}
                                    onClick={() => goToQuestion(i)}
                                >
                                    <span className="material-symbols-outlined">
                                        {answers[i]
                                            ? "check_circle"
                                            : i === index
                                            ? "visibility"
                                            : "radio_button_unchecked"}
                                    </span>
                                    <span>Question {i + 1}</span>
                                </div>
                            ))}
                        </div>

                        <button className="quizModal-submit" onClick={retryQuiz}>
                            Retry Quiz
                        </button>
                    </aside>
                </div>
            </div>
        </div>
    );
}

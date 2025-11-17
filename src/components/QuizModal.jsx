import { useState } from "react";
import "../styles/QuizModal.css";

export default function QuizModal({ onClose, questions = [], topic = "Quiz" }) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const total = questions.length;

    const current = questions[index];

    const selectOption = (option) => {
        setAnswers({ ...answers, [index]: option });
    };

    const next = () => {
        if (index < total - 1) setIndex(index + 1);
    };

    const prev = () => {
        if (index > 0) setIndex(index - 1);
    };

    return (
        <div className="quizModal-overlay">
            <div className="quizModal-container">

                {/* Header */}
                <header className="quizModal-header">
                    <h2 className="quizModal-title">{topic}</h2>
                    <button className="quizModal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <div className="quizModal-content">

                    {/* Main Section */}
                    <main className="quizModal-main">
                        <div className="quizModal-questionBlock">
                            <h1 className="quizModal-questionTitle">
                                Question {index + 1}
                            </h1>

                            <p className="quizModal-questionText">
                                {current.question}
                            </p>

                            <div className="quizModal-options">
                                {current.options.map((option, i) => (
                                    <label
                                        key={i}
                                        className={`quizModal-option ${answers[index] === option ? "selected" : ""
                                            }`}
                                        onClick={() => selectOption(option)}
                                    >
                                        <input
                                            type="radio"
                                            name={`quiz_q_${index}`}
                                            className="quizModal-radio"
                                            checked={answers[index] === option}
                                            onChange={() => selectOption(option)}
                                        />
                                        <span className="quizModal-optionText">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Progress */}
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

                    {/* Sidebar */}
                    <aside className="quizModal-sidebar">
                        <h3 className="quizModal-sidebarTitle">QUESTIONS</h3>

                        <div className="quizModal-sidebarList">
                            {questions.map((q, i) => (
                                <div
                                    key={i}
                                    className={`quizModal-sidebarItem ${i === index
                                            ? "active"
                                            : answers[i]
                                                ? "answered"
                                                : ""
                                        }`}
                                    onClick={() => setIndex(i)}
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

                        <button className="quizModal-submit">Submit Quiz</button>
                    </aside>

                </div>
            </div>
        </div>
    );
}

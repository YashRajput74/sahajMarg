import { useState } from "react";
import { learningModeQuestions } from "../../mockData/learningModeQuestions.js";
import "../../styles/LearningSession.css";

const LearningSession = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentQuestion = learningModeQuestions[currentIndex];
    const totalQuestions = learningModeQuestions.length;

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="ls-root">
            <header className="ls-header">
                <div className="ls-header-left">
                    <div className="ls-header-icon">
                        <svg viewBox="0 0 48 48" fill="currentColor">
                            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
                        </svg>
                    </div>
                    <h2>Learning Mode</h2>
                </div>

                <div className="ls-header-right">
                    <div className="ls-progress">
                        <p className="ls-progress-label">Topic Progress</p>
                        <div className="ls-progress-row">
                            <p className="ls-progress-text">Question {currentIndex + 1} of {totalQuestions}</p>
                            <div className="ls-progress-bar">
                                <div
                                    className="ls-progress-fill"
                                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="ls-divider" />

                    <button className="ls-exit-btn">
                        <span className="material-symbols-outlined">close</span>
                        Exit
                    </button>
                </div>
            </header>

            <main className="ls-main">
                <section className="ls-left">
                    <div className="ls-left-inner">
                        <div className="ls-badge">
                            <span className="material-symbols-outlined">auto_awesome</span>
                            <span>Concept Definition</span>
                        </div>

                        <h1>{currentQuestion.question}</h1>

                        <p className="ls-text-primary">
                            {currentQuestion.explanation.definition}
                        </p>

                        <p className="ls-text-secondary">
                            {currentQuestion.explanation.description}
                        </p>

                        {currentQuestion.tip && (
                            <div className="ls-tip">
                                <span className="material-symbols-outlined">lightbulb</span>
                                <p>{currentQuestion.tip}</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="ls-right">
                    <div className="ls-right-inner">
                        <h3 className="ls-section-title">Key Examples</h3>

                        {currentQuestion.examples.map((example, index) => (
                            <div className="ls-card" key={index}>
                                <div className="ls-card-icon">
                                    <span className="material-symbols-outlined">diamond</span>
                                </div>
                                <div>
                                    <h4>{example.title}</h4>
                                    <p>{example.description}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </section>
            </main>

            <footer className="ls-footer">
                <div className="ls-footer-inner">
                    <details className="ls-reflection">
                        <summary>
                            <div className="ls-reflection-title">
                                <span className="material-symbols-outlined">edit_note</span>
                                Reflect: Write in your own words
                            </div>
                            <span className="material-symbols-outlined">expand_more</span>
                        </summary>

                        <div className="ls-reflection-body">
                            <textarea
                                maxLength={200}
                                placeholder="Explain this concept back to yourself..."
                            />
                            <button className="ls-save-reflection">Save Reflection</button>
                        </div>
                    </details>

                    <div className="ls-footer-actions">
                        <button className="ls-action-btn">
                            <span className="material-symbols-outlined">bookmark</span>
                            Save
                        </button>
                        <button className="ls-action-btn">
                            <span className="material-symbols-outlined">skip_next</span>
                            Skip
                        </button>
                        <button className="ls-next-btn" onClick={handleNext}>
                            Next Question
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </footer>

            <div className="ls-bg">
                <div className="ls-blob primary" />
                <div className="ls-blob purple" />
            </div>
        </div>
    );
};

export default LearningSession;

import "./QuizGenerator.css";

export default function QuizGenerator() {
    const question = {
        title: "Introduction to Biology - Chapter 3 Quiz",
        subtitle: "Question 5 of 20",
        progress: 25,
        questionText: "What is the powerhouse of the cell?",
        description: "Select the correct option from the choices below.",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"],
        selectedOption: "Mitochondria",
    };

    const summary = {
        answered: 5,
        unanswered: 15,
        total: 20,
    };

    const totalQuestions = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className="quiz-container">
            <main className="quiz-main">
                <div className="quiz-header">
                    <div className="quiz-title-section">
                        <h1>{question.title}</h1>
                        <p>{question.subtitle}</p>
                    </div>

                    <div className="quiz-progress">
                        <div className="progress-header">
                            <p>Quiz Progress</p>
                            <p>{question.progress}%</p>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${question.progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="quiz-card">
                    <h2>{question.questionText}</h2>
                    <p className="question-desc">{question.description}</p>

                    <div className="options-list">
                        {question.options.map((opt) => (
                            <label
                                key={opt}
                                className={`option ${question.selectedOption === opt ? "selected" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="question"
                                    checked={question.selectedOption === opt}
                                    onChange={() => { }}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Button Group */}
                <div className="quiz-buttons">
                    <button className="btn-secondary">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Previous
                    </button>
                    <button className="btn-primary">
                        Next Question
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="quiz-sidebar">
                <div className="sidebar-content">
                    <div className="quiz-summary">
                        <h3>Quiz Summary</h3>
                        <div className="summary-row">
                            <span>Answered:</span>
                            <strong>{summary.answered}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Unanswered:</span>
                            <strong>{summary.unanswered}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Total Questions:</span>
                            <strong>{summary.total}</strong>
                        </div>
                    </div>

                    <div className="quiz-navigator">
                        <h3>Question Navigator</h3>
                        <div className="navigator-grid">
                            {totalQuestions.map((n) => (
                                <button
                                    key={n}
                                    className={`nav-btn ${n <= summary.answered
                                            ? "answered"
                                            : n === summary.answered + 1
                                                ? "active"
                                                : ""
                                        }`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="btn-submit">
                        <span className="material-symbols-outlined">check_circle</span>
                        Submit Quiz
                    </button>
                </div>
            </aside>
        </div>
    );
}

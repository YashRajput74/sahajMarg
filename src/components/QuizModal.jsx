import "../styles/QuizModal.css";

export default function QuizModal({ onClose }) {
    return (
        <div className="quizModal-overlay">
            <div className="quizModal-container">
                {/* Header */}
                <header className="quizModal-header">
                    <h2 className="quizModal-title">Biology Chapter 5 Quiz</h2>
                    <button className="quizModal-close" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <div className="quizModal-content">
                    {/* Main Quiz Section */}
                    <main className="quizModal-main">
                        <div className="quizModal-questionBlock">
                            <h1 className="quizModal-questionTitle">Question 3</h1>
                            <p className="quizModal-questionText">
                                Which of the following is responsible for transporting oxygen in the blood?
                            </p>

                            <div className="quizModal-options">
                                {["White Blood Cells", "Hemoglobin", "Plasma", "Platelets"].map(
                                    (option, i) => (
                                        <label key={i} className={`quizModal-option ${option === "Hemoglobin" ? "selected" : ""}`}>
                                            <input
                                                type="radio"
                                                name="quiz_q3"
                                                className="quizModal-radio"
                                                defaultChecked={option === "Hemoglobin"}
                                            />
                                            <span className="quizModal-optionText">{option}</span>
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Progress and navigation */}
                        <div className="quizModal-progressSection">
                            <div className="quizModal-progressInfo">
                                <p>Question 3 of 10</p>
                            </div>
                            <div className="quizModal-progressBar">
                                <div className="quizModal-progressFill" style={{ width: "30%" }}></div>
                            </div>

                            <div className="quizModal-navButtons">
                                <button className="quizModal-btnSecondary">Previous</button>
                                <button className="quizModal-btnPrimary">Next</button>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar Tracker */}
                    <aside className="quizModal-sidebar">
                        <h3 className="quizModal-sidebarTitle">QUESTIONS</h3>
                        <div className="quizModal-sidebarList">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`quizModal-sidebarItem ${i + 1 === 3 ? "active" : i + 1 < 3 ? "answered" : ""
                                        }`}
                                >
                                    <span className="material-symbols-outlined">
                                        {i + 1 < 3
                                            ? "check_circle"
                                            : i + 1 === 3
                                                ? "visibility"
                                                : "radio_button_unchecked"}
                                    </span>
                                    <span>Question {i + 1}</span>
                                </a>
                            ))}
                        </div>
                        <button className="quizModal-submit">Submit Quiz</button>
                    </aside>
                </div>
            </div>
        </div>
    );
}

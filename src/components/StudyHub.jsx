import React, { useState, useEffect } from "react";
import "./StudyHub.css";

const StudyHub = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [currentTab, setCurrentTab] = useState("summary");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("studyHistory")) || [];
        setHistory(saved);
    }, []);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleTextChange = (e) => {
        if (e.target.value.length <= 5000) setText(e.target.value);
    };

    const saveToHistory = (data) => {
        const updated = [...history, data];
        setHistory(updated);
        localStorage.setItem("studyHistory", JSON.stringify(updated));
    };

    const generateContent = async (type) => {
        const hasText = text.trim().length > 0;
        const hasFile = !!file;

        if (!hasText && !hasFile) {
            setMessage("Please enter text or upload a PDF first!");
            return;
        }

        setLoading(true);
        setMessage(`Generating ${type}...`);

        let url = "";
        try {
            const formData = new FormData();
            if (file) formData.append("file", file);
            else formData.append("text", text);

            // API route setup
            if (type === "Summary") url = "http://localhost:5000/summarize";
            else if (type === "Flashcards") url = "http://localhost:5000/generate-flashcards";
            else if (type === "Quiz") url = "http://localhost:5000/generate-quiz";

            const res = await fetch(url, { method: "POST", body: formData });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to generate content.");

            if (type === "Summary") {
                setSummary(data.summary);
                saveToHistory({ type: "Summary", content: data.summary });
            } else if (type === "Flashcards") {
                setFlashcards(data.flashcards);
                setCurrentCardIndex(0);
                setIsFlipped(false);
                saveToHistory({ type: "Flashcards", content: data.flashcards });
            } else if (type === "Quiz") {
                setQuizzes(data.quizzes);
                saveToHistory({ type: "Quiz", content: data.quizzes });
            }

            setMessage(`${type} generated successfully!`);
        } catch (err) {
            console.error(err);
            setMessage("Error generating content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = (idx) => {
        if (selectedOption !== null) return; // prevent re-click
        setSelectedOption(idx);

        setTimeout(() => {
            setSelectedOption(null);
            setCurrentQuizIndex((prev) =>
                prev < quizzes.length - 1 ? prev + 1 : 0
            );
        }, 1000); // auto move to next after 1s
    };

    const handleSave = () => {
        if (!summary && flashcards.length === 0 && quizzes.length === 0) {
            setMessage("Nothing to save!");
            return;
        }
        setMessage("Study material saved locally!");
    };

    return (
        <div className="studyhub-container">
            <h1 className="page-title">Study Material Management</h1>

            {/* ===== INPUT AREA ===== */}
            <div className="input-area">
                <textarea
                    placeholder="Enter text or upload PDF"
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
                <p className="char-limit">Character limit: 5000</p>
            </div>

            {/* ===== FILE UPLOAD ===== */}
            <div className="upload-section">
                <label htmlFor="pdf-upload" className="upload-btn">
                    Upload PDF
                </label>
                <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                {file && <span className="file-name">{file.name}</span>}
            </div>

            {/* ===== BUTTONS ===== */}
            <div className="generate-buttons">
                <button
                    className="gen-btn"
                    onClick={() => generateContent("Summary")}
                    disabled={loading}
                >
                    Generate Summary
                </button>
                <button
                    className="gen-btn"
                    onClick={() => generateContent("Flashcards")}
                    disabled={loading}
                >
                    Generate Flashcards
                </button>
                <button
                    className="gen-btn"
                    onClick={() => generateContent("Quiz")}
                    disabled={loading}
                >
                    Generate Quiz
                </button>
            </div>

            {/* ===== STATUS MESSAGE ===== */}
            {message && <div className="status-message">{message}</div>}

            {/* ===== TAB COMPONENT ===== */}
            <div className="tab-container">
                <div className="tabs">
                    <button
                        className={`tab ${currentTab === "summary" ? "active" : ""}`}
                        onClick={() => setCurrentTab("summary")}
                    >
                        Summary
                    </button>
                    <button
                        className={`tab ${currentTab === "flashcards" ? "active" : ""}`}
                        onClick={() => setCurrentTab("flashcards")}
                    >
                        Flashcards
                    </button>
                    <button
                        className={`tab ${currentTab === "quiz" ? "active" : ""}`}
                        onClick={() => setCurrentTab("quiz")}
                    >
                        Quiz
                    </button>
                </div>

                <div className="tab-panel">
                    {currentTab === "summary" && (
                        <div>
                            {summary ? (
                                <div className="summary-box">{summary}</div>
                            ) : (
                                <p>No summary yet. Generate one above!</p>
                            )}
                        </div>
                    )}

                    {currentTab === "flashcards" && (
                        <div className="flashcard-view">
                            {flashcards.length > 0 ? (
                                <div className="flashcard-wrapper">
                                    <div
                                        className={`flashcard ${isFlipped ? "flipped" : ""}`}
                                        onClick={() => setIsFlipped(!isFlipped)}
                                    >
                                        <div className="flashcard-front">
                                            <p>{flashcards[currentCardIndex].question}</p>
                                        </div>
                                        <div className="flashcard-back">
                                            <p>{flashcards[currentCardIndex].answer}</p>
                                        </div>
                                    </div>

                                    <div className="flashcard-controls">
                                        <button
                                            onClick={() =>
                                                setCurrentCardIndex((prev) =>
                                                    prev > 0 ? prev - 1 : flashcards.length - 1
                                                )
                                            }
                                        >
                                            ⏪ Previous
                                        </button>
                                        <span>
                                            {currentCardIndex + 1} / {flashcards.length}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setCurrentCardIndex((prev) =>
                                                    prev < flashcards.length - 1 ? prev + 1 : 0
                                                )
                                            }
                                        >
                                            Next ⏩
                                        </button>
                                    </div>
                                    <p className="flip-hint">(Click the card to flip)</p>
                                </div>
                            ) : (
                                <p>No flashcards yet. Generate some above!</p>
                            )}
                        </div>
                    )}

                    {currentTab === "quiz" && (
                        <div className="quiz-container">
                            {quizzes.length > 0 ? (
                                <div className="quiz-layout">
                                    {/* MAIN QUIZ AREA */}
                                    <div className="quiz-main">
                                        <div className="quiz-card active">
                                            <h3 className="quiz-question">
                                                Q{currentQuizIndex + 1}. {quizzes[currentQuizIndex].question}
                                            </h3>
                                            <ul className="quiz-options">
                                                {quizzes[currentQuizIndex].options.map((opt, idx) => (
                                                    <li
                                                        key={idx}
                                                        className={`quiz-option ${selectedOption === idx
                                                            ? idx === quizzes[currentQuizIndex].correctIndex
                                                                ? "correct"
                                                                : "wrong"
                                                            : ""
                                                            }`}
                                                        onClick={() => handleOptionClick(idx)}
                                                    >
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="quiz-controls">
                                                <button
                                                    onClick={() =>
                                                        setCurrentQuizIndex((prev) =>
                                                            prev > 0 ? prev - 1 : quizzes.length - 1
                                                        )
                                                    }
                                                >
                                                    ⏪ Previous
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setCurrentQuizIndex((prev) =>
                                                            prev < quizzes.length - 1 ? prev + 1 : 0
                                                        )
                                                    }
                                                >
                                                    Next ⏩
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SIDEBAR */}
                                    <div className="quiz-sidebar">
                                        <h4>Questions</h4>
                                        <div className="question-list">
                                            {quizzes.map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`question-btn ${i === currentQuizIndex ? "active" : ""
                                                        }`}
                                                    onClick={() => setCurrentQuizIndex(i)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>No quiz yet. Generate one above!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== SAVE SECTION ===== */}
            <div className="save-section">
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
            </div>

            {/* ===== HISTORY ===== */}
            {/* {history.length > 0 && (
                <div className="history-section">
                    <h2>Past Generated Items</h2>
                    <ul>
                        {history.map((item, idx) => (
                            <li key={idx}>
                                <strong>{item.type}:</strong>{" "}
                                {typeof item.content === "string"
                                    ? item.content.slice(0, 100) + "..."
                                    : `${item.content.length} items`}
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}
        </div>
    );
};

export default StudyHub;

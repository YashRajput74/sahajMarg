import React, { useState, useEffect } from "react";
import "./StudyHub.css";

const StudyHub = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [topic, setTopic] = useState("");
    const [summary, setSummary] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const [currentTab, setCurrentTab] = useState("summary");  // Track active tab

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("studyTopics")) || [];
        setHistory(saved);
    }, []);

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleTextChange = (e) => setText(e.target.value);

    const saveTopic = (topicName, data) => {
        const saved = JSON.parse(localStorage.getItem("studyTopics")) || [];
        const updated = [...saved, { topic: topicName, ...data }];
        localStorage.setItem("studyTopics", JSON.stringify(updated));
        setHistory(updated);
    };

    const generateFeature = async (feature) => {
        const hasContent = text.trim() || file;
        const hasTopic = topic.trim();

        if (!hasContent && !hasTopic) {
            alert("Please enter a topic name or upload content!");
            return;
        }

        setLoading(true);

        let url = "";
        let options = {};

        try {
            const topicName =
                hasTopic ||
                `topic-${(JSON.parse(localStorage.getItem("studyTopics")) || []).length + 1}`;

            // If text or file exists → use content-based endpoints
            if (hasContent) {
                const formData = new FormData();
                if (file) formData.append("file", file);
                else formData.append("text", text);

                if (feature === "summary") url = "http://localhost:5000/summarize";
                else if (feature === "flashcards") url = "http://localhost:5000/generate-flashcards";
                else if (feature === "quiz") url = "http://localhost:5000/generate-quiz";

                options = { method: "POST", body: formData };
            }
            // Otherwise → topic-only endpoints
            else {
                const body = JSON.stringify({ topic: topicName });

                if (feature === "summary") url = "http://localhost:5000/summarize-topic";
                else if (feature === "flashcards") url = "http://localhost:5000/generate-flashcards-topic";
                else if (feature === "quiz") url = "http://localhost:5000/generate-quiz-topic";

                options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body,
                };
            }

            const res = await fetch(url, options);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to generate.");

            // Save data to state
            if (feature === "summary") setSummary(data.summary);
            else if (feature === "flashcards") setFlashcards(data.flashcards);
            else if (feature === "quiz") setQuizzes(data.quizzes);

            // Save in history
            saveTopic(topicName, {
                summary: feature === "summary" ? data.summary : summary,
                flashcards: feature === "flashcards" ? data.flashcards : flashcards,
                quizzes: feature === "quiz" ? data.quizzes : quizzes,
            });
        } catch (err) {
            console.error(err);
            alert("Error generating content.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!file && !text.trim()) {
            alert("Please upload a PDF or enter text first!");
            return;
        }

        setLoading(true);

        // Order of features — put the current tab first
        const features = ["summary", "flashcards", "quiz"];
        const ordered = [currentTab, ...features.filter(f => f !== currentTab)];

        try {
            for (const feature of ordered) {
                await generateFeature(feature);
            }
            alert("All content generated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error generating study materials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="studyhub-container">
            <h1 className="title"> Study Hub</h1>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Topic Name"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="topic-input"
                />
                <div className="upload-area">
                    <textarea
                        placeholder="Paste your text here..."
                        value={text}
                        onChange={handleTextChange}
                    />

                    <label className="upload-box">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                        <p>Click to upload or drag a file here</p>
                        {file && <span>{file.name}</span>}
                    </label>
                </div>

                <div className="button-group">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || (!text.trim() && !file && !topic.trim())}
                    >
                        {loading ? "Generating..." : "Submit"}
                    </button>
                </div>


            </div>
            {/* Tab Navigation */}
            {/* ===== MATERIAL STYLE TAB BAR ===== */}
            <div className="tab-header">
                <h1 className="tab-title">Study Hub</h1>
                <div className="tab-items">
                    <button
                        className={`tab-item ${currentTab === "summary" ? "active" : ""}`}
                        onClick={() => setCurrentTab("summary")}
                    >
                        Summary
                    </button>
                    <button
                        className={`tab-item ${currentTab === "flashcards" ? "active" : ""}`}
                        onClick={() => setCurrentTab("flashcards")}
                    >
                        Flashcards
                    </button>
                    <button
                        className={`tab-item ${currentTab === "quiz" ? "active" : ""}`}
                        onClick={() => setCurrentTab("quiz")}
                    >
                        Quiz
                    </button>
                </div>
            </div>
            {/* Tab Content */}
            <div className="tab-content-wrapper">
                {currentTab === "summary" && summary && (
                    <div className="output-section">
                        <h2>Summary</h2>
                        <div className="summary-box">{summary}</div>
                    </div>
                )}

                {currentTab === "flashcards" && flashcards.length > 0 && (
                    <div className="output-section">
                        <h2>Flashcards</h2>
                        <div className="flashcard-grid">
                            {flashcards.map((card, index) => (
                                <div key={index} className="flashcard">
                                    <div className="front">{card.question}</div>
                                    <div className="back">{card.answer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentTab === "quiz" && quizzes.length > 0 && (
                    <div className="output-section">
                        <h2>Quiz</h2>
                        <div className="quiz-grid">
                            {quizzes.map((quiz, qIndex) => (
                                <div key={qIndex} className="quiz-card">
                                    <p className="quiz-question">{quiz.question}</p>
                                    <ul>
                                        {quiz.options.map((opt, idx) => (
                                            <li key={idx} className="quiz-option">
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Past Topics */}
            <div className="history-section">
                <h2>Past Topics</h2>
                {history.length === 0 ? (
                    <p>No past topics yet.</p>
                ) : (
                    <div className="history-list">
                        {history.map((item, i) => (
                            <details key={i} className="history-item">
                                <summary>{item.topic}</summary>
                                {item.summary && (
                                    <>
                                        <h4>Summary:</h4>
                                        <p>{item.summary}</p>
                                    </>
                                )}
                                {item.flashcards && item.flashcards.length > 0 && (
                                    <>
                                        <h4>Flashcards:</h4>
                                        <ul>
                                            {item.flashcards.map((f, idx) => (
                                                <li key={idx}>
                                                    Q: {f.question} <br /> A: {f.answer}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {item.quizzes && item.quizzes.length > 0 && (
                                    <>
                                        <h4>Quizzes:</h4>
                                        <ul>
                                            {item.quizzes.map((q, idx) => (
                                                <li key={idx}>
                                                    Q: {q.question} <br /> ✅ {q.answer}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </details>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyHub;

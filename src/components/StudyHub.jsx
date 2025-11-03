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

    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [flashcardFlipped, setFlashcardFlipped] = useState(false);

    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({}); // {questionIndex: chosenOptionIndex}

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
        if (!file && !text.trim()) {
            alert("Please upload a PDF or enter text first!");
            return;
        }
        setLoading(true);

        const formData = new FormData();
        if (file) formData.append("file", file);
        else formData.append("text", text);

        const topicName =
            topic.trim() || `topic-${(JSON.parse(localStorage.getItem("studyTopics")) || []).length + 1}`;

        try {
            let res, data;
            if (feature === "summary") {
                res = await fetch("http://localhost:5000/summarize", { method: "POST", body: formData });
                data = await res.json();
                setSummary(data.summary);
            } else if (feature === "flashcards") {
                res = await fetch("http://localhost:5000/generate-flashcards", { method: "POST", body: formData });
                data = await res.json();
                console.log(data.flashcards);
                setFlashcards(data.flashcards);
                setCurrentFlashcard(0);
                setFlashcardFlipped(false);
            } else if (feature === "quiz") {
                res = await fetch("http://localhost:5000/generate-quiz", { method: "POST", body: formData });
                data = await res.json();
                setQuizzes(data.quizzes);
                setCurrentQuiz(0);
                setQuizAnswers({});
            }

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

    const handleQuizAnswer = (qIndex, optionIndex) => {
        setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
    };

    return (
        <div className="studyhub-container">
            <h1 className="title"> Study Hub</h1>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Topic Name (optional)"
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
                        <p> Click to upload or drag a file here</p>
                        {file && <span>{file.name}</span>}
                    </label>
                </div>

                <div className="button-group">
                    <button onClick={() => generateFeature("summary")} disabled={loading}>
                        {loading ? "Loading..." : "Generate Summary"}
                    </button>
                    <button onClick={() => generateFeature("flashcards")} disabled={loading}>
                        {loading ? "Loading..." : "Generate Flashcards"}
                    </button>
                    <button onClick={() => generateFeature("quiz")} disabled={loading}>
                        {loading ? "Loading..." : "Generate Quiz"}
                    </button>
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <div className="output-section">
                    <h2> Summary</h2>
                    <div className="summary-box">{summary}</div>
                </div>
            )}

            {/* Flashcards */}
            {flashcards.length > 0 && (
                <div className="output-section">
                    <h2> Flashcards</h2>
                    <div className="flashcard-grid">
                        {flashcards.map((card, index) => (
                            <div
                                key={index}
                                className={`flashcard ${currentFlashcard === index && flashcardFlipped ? "flipped" : ""
                                    }`}
                                onClick={() => {
                                    setCurrentFlashcard(index);
                                    setFlashcardFlipped((prev) => !prev);
                                }}
                            >
                                <div className="front">{card.question}</div>
                                <div className="back">{card.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quizzes */}
            {quizzes.length > 0 && (
                <div className="output-section">
                    <h2> Quiz</h2>
                    <div className="quiz-grid">
                        {quizzes.map((quiz, qIndex) => (
                            <div key={qIndex} className="quiz-card">
                                <p className="quiz-question">{quiz.question}</p>
                                <ul>
                                    {quiz.options.map((opt, idx) => {
                                        const chosen = quizAnswers[qIndex];
                                        const correct = quiz.answer;

                                        const isCorrect =
                                            typeof correct === "number"
                                                ? idx === correct
                                                : opt === correct;

                                        return (
                                            <li
                                                key={idx}
                                                className={`quiz-option ${chosen !== undefined
                                                    ? isCorrect
                                                        ? "correct"
                                                        : idx === chosen
                                                            ? "wrong"
                                                            : ""
                                                    : ""
                                                    }`}
                                                onClick={() => {
                                                    if (quizAnswers[qIndex] === undefined)
                                                        handleQuizAnswer(qIndex, idx); // ✅ fix
                                                }}
                                            >
                                                {opt}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Past Topics */}
            <div className="history-section">
                <h2> Past Topics</h2>
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

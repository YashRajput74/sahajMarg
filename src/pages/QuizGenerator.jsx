import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeatureHeader from "../components/FeatureHeader";
import Footer from "../components/Footer";
import "./QuizGenerator.css";

export default function QuizGenerator() {
    const [mode, setMode] = useState("pdf");
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQuizzes = localStorage.getItem("lastQuizzes");
        if (savedQuizzes) {
            setQuizzes(JSON.parse(savedQuizzes));
        } else {
            const lastSummary = localStorage.getItem("lastSummary");
            if (lastSummary) {
                setText(lastSummary);
                console.log("Loaded last summary for quiz generation.");
            }
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setQuizzes([]);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setQuizzes([]);

        try {
            let response;
            let inputText = text;

            if (mode === "pdf") {
                let docxFile = file;

                const lastConverted = localStorage.getItem("lastConvertedFile");
                if (!docxFile && lastConverted) {
                    const parsed = JSON.parse(lastConverted);
                    if (parsed.FileData) {
                        const byteCharacters = atob(parsed.FileData);
                        const byteNumbers = new Array(byteCharacters.length)
                            .fill()
                            .map((_, i) => byteCharacters.charCodeAt(i));
                        const byteArray = new Uint8Array(byteNumbers);
                        docxFile = new File([byteArray], parsed.FileName || "converted.docx", {
                            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        });
                    }
                }

                if (!docxFile) return alert("No DOCX found. Please upload or convert a PDF first.");

                const formData = new FormData();
                formData.append("file", docxFile);

                response = await fetch("http://localhost:5000/generate-quiz", {
                    method: "POST",
                    body: formData,
                });
            } else {
                if (!inputText.trim()) {
                    const lastSummary = localStorage.getItem("lastSummary");
                    if (lastSummary) {
                        inputText = lastSummary;
                    } else {
                        return alert("Please enter text or summarize a document first.");
                    }
                }

                response = await fetch("http://localhost:5000/generate-quiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: inputText }),
                });
            }

            const data = await response.json();
            if (data.quizzes && data.quizzes.length > 0) {
                setQuizzes(data.quizzes);
                localStorage.setItem("lastQuizzes", JSON.stringify(data.quizzes));
            } else {
                alert("Failed to generate quizzes. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while generating the quiz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FeatureHeader />

            <main className="quiz-generator-page">
                <div className="left-section">
                    <h1>{mode === "pdf" ? "Generate Quizzes from Your PDF" : "Generate Quizzes from Text"}</h1>
                    <p>
                        {mode === "pdf"
                            ? "Upload a PDF (or DOCX) or use your last summarized file to create quizzes."
                            : "Paste text, or automatically use your last summary, to generate AI-powered quizzes."}
                    </p>

                    <div className="utility-buttons">
                        <button className="switch-btn" onClick={() => navigate("/summarize")}>
                            Summarize PDF/Text
                        </button>

                        <button className="switch-btn alt" onClick={() => navigate("/flashcards")}>
                            Generate Flashcards
                        </button>
                    </div>
                </div>

                <div className="right-section">
                    <div className="upload-box">
                        <div className="mode-toggle">
                            <button
                                className={`toggle-btn ${mode === "pdf" ? "active" : ""}`}
                                onClick={() => setMode("pdf")}
                            >
                                📄 PDF Mode
                            </button>
                            <button
                                className={`toggle-btn ${mode === "text" ? "active" : ""}`}
                                onClick={() => setMode("text")}
                            >
                                📝 Text Mode
                            </button>
                        </div>

                        {mode === "pdf" ? (
                            <label className="file-label">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="file-input"
                                />
                                {file ? file.name : "Click to Upload PDF"}
                            </label>
                        ) : (
                            <textarea
                                className="text-input"
                                rows={8}
                                placeholder="Paste or type text here... (or leave empty to use last summary)"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        )}

                        <button
                            className="convert-btn"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate Quiz"}
                        </button>

                        {quizzes.length > 0 && (
                            <div className="result">
                                <p>✅ Quiz Generated:</p>
                                <div className="quiz-list">
                                    {quizzes.map((q, i) => (
                                        <div key={i} className="quiz-item">
                                            <div className="question">
                                                {i + 1}. {q.question}
                                            </div>
                                            {q.options && q.options.length > 0 && (
                                                <ul className="options">
                                                    {q.options.map((opt, idx) => (
                                                        <li key={idx}>{opt}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {q.answer && (
                                                <div className="answer">
                                                    <strong>Answer:</strong> {q.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

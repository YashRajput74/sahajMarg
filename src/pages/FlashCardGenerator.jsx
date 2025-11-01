import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeatureHeader from "../components/FeatureHeader";
import Footer from "../components/Footer";
import "./FlashCardGenerator.css";

export default function FlashCardGenerator() {
    const [mode, setMode] = useState("pdf");
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFlashcards = localStorage.getItem("lastFlashcards");
        if (savedFlashcards) {
            setFlashcards(JSON.parse(savedFlashcards));
        } else {
            const lastSummary = localStorage.getItem("lastSummary");
            if (lastSummary) {
                setText(lastSummary);
                console.log("Loaded last summary for flashcard generation.");
            }
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFlashcards([]);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setFlashcards([]);

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

                response = await fetch("http://localhost:5000/generate-flashcards", {
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

                response = await fetch("http://localhost:5000/generate-flashcards", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: inputText }),
                });
            }

            const data = await response.json();
            if (data.flashcards && data.flashcards.length > 0) {
                setFlashcards(data.flashcards);
                localStorage.setItem("lastFlashcards", JSON.stringify(data.flashcards));
            } else {
                alert("Failed to generate flashcards. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while generating flashcards.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FeatureHeader />

            <main className="flashcard-generator-page">
                <div className="left-section">
                    <h1>{mode === "pdf" ? "Generate Flashcards from Your PDF" : "Generate Flashcards from Text"}</h1>
                    <p>
                        {mode === "pdf"
                            ? "Upload a PDF (or DOCX) or use your last summarized file to create study flashcards."
                            : "Paste text, or automatically use your last summary, to generate AI flashcards."}
                    </p>

                    <div className="utility-buttons">
                        <button className="switch-btn" onClick={() => navigate("/summarize")}>
                            Summarize PDF/Text
                        </button>

                        <button className="switch-btn alt" onClick={() => navigate("/generate-quiz")}>
                            Generate Quiz
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
                            {loading ? "Generating..." : "Generate Flashcards"}
                        </button>

                        {flashcards.length > 0 && (
                            <div className="result">
                                <p>✅ Flashcards Generated:</p>
                                <div className="flashcards-grid">
                                    {flashcards.map((card, i) => (
                                        <div key={i} className="flashcard">
                                            <div className="question">{card.question}</div>
                                            <div className="answer">{card.answer}</div>
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

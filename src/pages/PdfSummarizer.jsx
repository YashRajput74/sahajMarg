import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureHeader from "../components/FeatureHeader";
import Footer from "../components/Footer";
import "./PdfSummarizer.css";

export default function PdfSummarizer() {
    const [mode, setMode] = useState("pdf"); // "pdf" or "text"
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSummary("");
    };

    const handleSummarize = async () => {
        setLoading(true);
        setSummary("");

        try {
            let response;

            if (mode === "pdf") {
                let docxFile = file;

                // ✅ Try to use the last converted DOCX from localStorage
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

                response = await fetch("http://localhost:5000/summarize", {
                    method: "POST",
                    body: formData,
                });
            } else {
                if (!text.trim()) return alert("Please enter or paste some text.");

                response = await fetch("http://localhost:5000/summarize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text }),
                });
            }

            const data = await response.json();
            if (data.summary) {
                setSummary(data.summary);
                localStorage.setItem("lastSummary", data.summary);
            } else {
                alert("Failed to summarize. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while summarizing.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FeatureHeader />

            <main className="pdf-summarizer-page">
                <div className="left-section">
                    <h1>{mode === "pdf" ? "Summarize Your PDF Instantly" : "Summarize Any Text Instantly"}</h1>
                    <p>
                        {mode === "pdf"
                            ? "Upload any PDF and get a concise summary generated for you."
                            : "Paste or type text below and get a summarized version instantly."}
                    </p>

                    <div className="utility-buttons">
                        <button className="switch-btn" onClick={() => navigate("/generate-flashcard")}>
                            Generate Flashcards
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
                            <>
                                <label className="file-label">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    {file ? file.name : "Click to Upload PDF"}
                                </label>
                            </>
                        ) : (
                            <>
                                <textarea
                                    className="text-input"
                                    rows={8}
                                    placeholder="Paste or type your text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </>
                        )}

                        <button
                            className="convert-btn"
                            onClick={handleSummarize}
                            disabled={loading}
                        >
                            {loading ? "Summarizing..." : "Generate Summary"}
                        </button>

                        {summary && (
                            <div className="result">
                                <p>✅ Summary Generated:</p>
                                <div className="summary-box">
                                    <p>{summary}</p>
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

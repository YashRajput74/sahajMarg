import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
    const [showStudySection, setShowStudySection] = useState(false);

    const navigate = useNavigate();

    const handleGenerateClick = () => {
        // When the user clicks the Generate button:
        setShowStudySection(true);
    };

    return (
        <main className="sw-main">
            <div className="sw-header">
                <h1>Start new chat</h1>
                <p>Upload Text or PDF to generate summary</p>
            </div>

            {!showStudySection ? (
                /* 🟢 Initial view before generation */
                <div className="sw-upload-section">
                    {/* Upload New PDF */}
                    <div className="sw-upload-card">
                        <div className="sw-upload-header">
                            <span className="material-symbols-outlined">upload_file</span>
                            <h3>Upload New PDF</h3>
                        </div>
                        <p>Generate flashcards and summaries from your PDF files.</p>
                        <div className="sw-dropzone">
                            <span className="material-symbols-outlined">draft</span>
                            <p className="sw-upload-maintext">Upload a file</p>
                            <p>or drag and drop</p>
                            <p className="sw-upload-subtext">PDF up to 10MB</p>
                        </div>
                        <button className="sw-primary-btn" onClick={handleGenerateClick}>
                            <span className="material-symbols-outlined filled">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>

                    {/* Enter Text Summary */}
                    <div className="sw-upload-card">
                        <div className="sw-upload-header">
                            <span className="material-symbols-outlined">edit_note</span>
                            <h3>Enter Text Summary</h3>
                        </div>
                        <p>Create study materials by pasting your own text.</p>
                        <textarea
                            className="sw-textarea"
                            placeholder="Paste or type your text here..."
                        ></textarea>
                        <button
                            className="sw-primary-btn"
                            style={{ marginTop: "1.25rem" }}
                            onClick={handleGenerateClick}
                        >
                            <span className="material-symbols-outlined filled">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>
                </div>
            ) : (
                /* 🟣 What appears AFTER generation */
                <div className={`sw-fade-enter ${showStudySection ? "sw-fade-enter-active" : ""}`}>
                    {/* Uploaded Text Card */}
                    <section className="sw-card">
                        <div className="sw-card-header">
                            <h2>Your Uploaded Text/PDF</h2>
                            <div className="sw-card-actions">
                                <button>
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                                <button>
                                    <span className="material-symbols-outlined">palette</span>
                                </button>
                                <button>
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </div>
                        </div>
                        <div className="sw-card-body">
                            <p>Your uploaded text will appear here.</p>
                        </div>
                    </section>

                    {/* Topic Overview */}
                    <section>
                        <h2 className="sw-section-title">Topic Overview</h2>
                        <div className="sw-grid">
                            {/* AI Summary */}
                            <div className="sw-card sw-card-small">
                                <div className="sw-icon-box">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h3>AI Summary</h3>
                                    <p>
                                        A brief overview of organelles, cell division, and cellular
                                        respiration, highlighting key processes and structures essential
                                        for understanding life at the microscopic level.
                                    </p>
                                </div>
                            </div>

                            {/* Flashcards */}
                            <div className="sw-card sw-card-small" style={{ justifyContent: "flex-start" }}>
                                <div className="sw-icon-box">
                                    <span className="material-symbols-outlined">style</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div>
                                        <h3>Flashcards</h3>
                                        <p>78 Cards</p>
                                    </div>
                                    <button className="sw-outline-btn" style={{ display: "block" }} onClick={() => navigate("/topic1/flashcard")}>
                                        View All
                                    </button>
                                </div>
                            </div>

                            {/* Quiz */}
                            <div className="sw-card sw-card-small" style={{ justifyContent: "flex-start" }}>
                                <div className="sw-icon-box">
                                    <span className="material-symbols-outlined">quiz</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div>
                                        <h3>Quiz Results</h3>
                                        <p>Latest Score: Attempt quiz to see latest score</p>
                                    </div>
                                    <button className="sw-outline-btn" style={{ display: "block" }} onClick={() => navigate("/topic1/quiz")}>
                                        Attempt Quiz
                                    </button>
                                </div>
                            </div>

                            {/* Related Topics */}
                            <div className="sw-card sw-card-small" style={{ justifyContent: "flex-start" }}>
                                <div className="sw-icon-box">
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <h3>Related Topics</h3>
                                    <ul>
                                        <li>Genetics</li>
                                        <li>Molecular Biology</li>
                                        <li>Biochemistry</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sw-upload-section">
                    {/* Upload New PDF */}
                    <div className="sw-upload-card">
                        <div className="sw-upload-header">
                            <span className="material-symbols-outlined">upload_file</span>
                            <h3>Upload New PDF</h3>
                        </div>
                        <p>Generate flashcards and summaries from your PDF files.</p>
                        <div className="sw-dropzone">
                            <span className="material-symbols-outlined">draft</span>
                            <p className="sw-upload-maintext">Upload a file</p>
                            <p>or drag and drop</p>
                            <p className="sw-upload-subtext">PDF up to 10MB</p>
                        </div>
                        <button className="sw-primary-btn" onClick={handleGenerateClick}>
                            <span className="material-symbols-outlined filled">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>

                    {/* Enter Text Summary */}
                    <div className="sw-upload-card">
                        <div className="sw-upload-header">
                            <span className="material-symbols-outlined">edit_note</span>
                            <h3>Enter Text Summary</h3>
                        </div>
                        <p>Create study materials by pasting your own text.</p>
                        <textarea
                            className="sw-textarea"
                            placeholder="Paste or type your text here..."
                        ></textarea>
                        <button
                            className="sw-primary-btn"
                            style={{ marginTop: "1.25rem" }}
                            onClick={handleGenerateClick}
                        >
                            <span className="material-symbols-outlined filled">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>
                </div>
                </div>
            )}
        </main>
    );
};

export default MainContent;

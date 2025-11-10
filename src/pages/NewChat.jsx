import { useState } from "react";
import StudywiseSidebar from "../components/StudywiseSidebar";
import SummaryOutput from "../components/SummaryOutput";
import './NewChat.css'


const FlashcardsHeader = () => {
    return (
        <header className="flashcards-header">
            <div className="header-left">
                <h1>Start new chat</h1>
                <p>Upload Text or PDF to generate summary</p>
            </div>
            {/* <a href="#" className="back-button">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
            </a> */}
        </header>
    );
};

export default function NewChat() {
    const [showOverview, setShowOverview] = useState(false);

    const handleGenerate = () => {
        setShowOverview(false);
        setTimeout(() => setShowOverview(true), 300); // delay before showing section
    };

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <StudywiseSidebar />

            <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
                <FlashcardsHeader />

                {/* ======= Topic Overview (Shown only after Generate) ======= */}
                {showOverview && (
                    <div className="fade-in">
                        {/* ======= Summary Output ======= */}
                        <div style={{ padding: "1% 5%" }}>
                            <SummaryOutput />
                        </div>

                        <section className="topic-overview" style={{ padding: "1% 5%" }}>
                            <h2>Topic Overview</h2>
                            <div className="cards">
                                {/* AI Summary */}
                                <div className="card">
                                    <div className="card-header">
                                        <div className="icon-bg">
                                            <span className="material-symbols-outlined">auto_awesome</span>
                                        </div>
                                        <h3>AI Summary</h3>
                                    </div>
                                    <p>
                                        A brief overview of organelles, cell division, and cellular respiration,
                                        highlighting key processes and structures essential for understanding life
                                        at the microscopic level.
                                    </p>
                                </div>

                                {/* Flashcards */}
                                <div className="card">
                                    <div className="card-header">
                                        <div className="icon-bg">
                                            <span className="material-symbols-outlined">style</span>
                                        </div>
                                        <div>
                                            <h3>Flashcards</h3>
                                            <p className="subtext">78 Cards</p>
                                        </div>
                                    </div>
                                    <button
                                        className="outline-btn"
                                        onClick={() => navigate("/topic1/flashcard")}
                                    >
                                        View All
                                    </button>
                                </div>

                                {/* Quiz Results */}
                                <div className="card">
                                    <div className="card-header">
                                        <div className="icon-bg">
                                            <span className="material-symbols-outlined">quiz</span>
                                        </div>
                                        <div>
                                            <h3>Quiz Results</h3>
                                            <p className="subtext">
                                                Latest Score:{" "}
                                                <span className="highlight">
                                                    Attempt quiz to see latest score
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="outline-btn">Attempt quiz</button>
                                </div>

                                {/* Related Topics */}
                                <div className="card">
                                    <div className="card-header">
                                        <div className="icon-bg">
                                            <span className="material-symbols-outlined">hub</span>
                                        </div>
                                        <h3>Related Topics</h3>
                                    </div>
                                    <ul>
                                        <li>Genetics</li>
                                        <li>Molecular Biology</li>
                                        <li>Biochemistry</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <br />
                        <hr />
                        <br />
                    </div>
                )}

                {/* ======= Upload Panels ======= */}
                <div className="main-panels" style={{ padding: "1% 5%" }}>
                    {/* Upload PDF Panel */}
                    <div className="panel">
                        <div className="panel-header">
                            <span className="material-symbols-outlined primary">upload_file</span>
                            <h2>Upload New PDF</h2>
                        </div>
                        <p className="panel-desc">
                            Generate flashcards and summaries from your PDF files.
                        </p>

                        <div className="upload-box">
                            <div className="upload-content">
                                <span className="material-symbols-outlined upload-icon">
                                    picture_as_pdf
                                </span>
                                <div className="upload-text">
                                    <label htmlFor="file-upload" className="upload-label">
                                        Upload a file
                                        <input id="file-upload" type="file" className="hidden-input" />
                                    </label>
                                    <p>or drag and drop</p>
                                </div>
                                <p className="upload-hint">PDF up to 10MB</p>
                            </div>
                        </div>

                        <button className="primary-btn" onClick={handleGenerate}>
                            <span className="material-symbols-outlined">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>

                    {/* Text Summary Panel */}
                    <div className="panel">
                        <div className="panel-header">
                            <span className="material-symbols-outlined primary">edit_note</span>
                            <h2>Enter Text Summary</h2>
                        </div>
                        <p className="panel-desc">
                            Create study materials by pasting your own text.
                        </p>
                        <textarea
                            rows="7"
                            placeholder="Paste your text here..."
                            className="text-input"
                        ></textarea>

                        <button className="primary-btn" onClick={handleGenerate}>
                            <span className="material-symbols-outlined">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

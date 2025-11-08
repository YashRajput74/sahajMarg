import { useState } from "react";
import MasteryProgress from "./MasteryProgress";
import "./StudywisePage.css";

const StudywisePage = () => {
    const [mode, setMode] = useState("Text"); // default checked

    return (

        <main className="studywise-page">
            {/* Header */}
            <header className="page-heading">
                <div className="heading-left">
                    <h1>Cellular Biology</h1>
                    <p>Last studied: Yesterday</p>
                </div>
                <button className="primary-btn">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Start Study Session
                </button>
            </header>

            {/* Segmented Buttons */}
            <section className="segmented-buttons">
                <label>
                    <input
                        type="radio"
                        name="study-mode"
                        value="Text"
                        checked={mode === "Text"}
                        onChange={() => setMode("Text")}
                    />
                    <span>See source text</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="study-mode"
                        value="Flashcards"
                        checked={mode === "Flashcards"}
                        onChange={() => setMode("Flashcards")}
                    />
                    <span>Review Flashcards</span>
                </label>
            </section>

            {/* Conditional Rendering */}
            {mode === "Flashcards" ? (
                <>
                    <MasteryProgress score={85} />
                    <section className="topic-overview">
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
                                <button className="outline-btn">View All</button>
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
                                            Latest Score: <span className="highlight">9 / 10</span>
                                        </p>
                                    </div>
                                </div>
                                <button className="outline-btn">Review Results</button>
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
                </>
            ) : (
                <div className="main-panels">
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

                        <button className="primary-btn">
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

                        <button className="primary-btn">
                            <span className="material-symbols-outlined">play_arrow</span>
                            Generate Study Material
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default StudywisePage;

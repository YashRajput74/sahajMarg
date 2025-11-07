import "./DashboardPage.css";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back! Manage your study materials here.</p>
            </header>

            {/* Top Stats Cards */}
            <div className="stats-grid">
                <div className="card">
                    <div className="card-header">
                        <h3>Active Topics</h3>
                        <span className="material-symbols-outlined">topic</span>
                    </div>
                    <p className="card-value">8</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Total Flashcards</h3>
                        <span className="material-symbols-outlined">style</span>
                    </div>
                    <p className="card-value">1,234</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Summaries Generated</h3>
                        <span className="material-symbols-outlined">article</span>
                    </div>
                    <p className="card-value">15</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Quizzes Taken</h3>
                        <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <p className="card-value">27</p>
                </div>
            </div>

            {/* Two Main Panels */}
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
                            <span className="material-symbols-outlined upload-icon">picture_as_pdf</span>
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
        </div>
    );
}

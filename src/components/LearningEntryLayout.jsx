import "../styles/LearningEntry.css";

export default function LearningEntryLayout({
    title,
    subtitle,
    topic,
    setTopic,
    onStart,
    loading = false,
    buttonText = "Start Learning",
    showLearningMode = false,
}) {
    return (
        <div className="le-root">
            <div className="le-bg-pattern" />
            <div className="le-bg-blob le-blob-1" />
            <div className="le-bg-blob le-blob-2" />
            <div className="le-bg-blob le-blob-3" />

            <header className="le-header">
                <div className="le-brand">
                    <div className="le-logo">
                        <svg viewBox="0 0 48 48" fill="currentColor">
                            <path d="M42.17 20.17L27.83 5.83C29.14 7.14 28.4 10.19 26.2 13.77C24.85 15.96 22.96 18.34 20.65 20.65C18.34 22.96 15.96 24.85 13.77 26.2C10.19 28.4 7.14 29.14 5.83 27.83L20.17 42.17Z" />
                        </svg>
                    </div>
                    <h2 className="le-title">StudyFocus</h2>
                </div>
            </header>

            <main className="le-main">
                <div className="le-center">
                    <h1 className="le-heading">{title}</h1>
                    <p className="le-subtitle">{subtitle}</p>

                    {/* ✅ Learning Mode Button (optional) */}
                    {showLearningMode && (
                        <button className="le-learning-btn">
                            <span className="material-symbols-outlined">
                                auto_awesome
                            </span>
                            Learning Mode
                        </button>
                    )}

                    <div className="le-input-wrapper">
                        <input
                            className="le-input"
                            placeholder="Type a topic name"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onStart()}
                        />

                        <button
                            className="le-start-btn"
                            onClick={onStart}
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : buttonText}
                            <span className="material-symbols-outlined">
                                arrow_forward
                            </span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

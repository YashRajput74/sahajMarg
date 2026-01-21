import "./LearningSummary.css";

export default function LearningSummary() {
    return (
        <div className="ls-page">
            {/* Background blobs */}
            <div className="ls-blob-container">
                <div className="ls-blob ls-blob-1" />
                <div className="ls-blob ls-blob-2" />
                <div className="ls-blob ls-blob-3" />
                <div className="ls-blob ls-blob-4" />
            </div>

            <main className="ls-content">
                <div className="ls-icon-wrapper">
                    <span className="material-symbols-outlined ls-icon">
                        colors_spark
                    </span>
                </div>

                <p className="ls-subtitle">
                    Today we explored the fundamentals of Web vitals.
                </p>

                <div className="ls-headline">
                    <h1>That’s enough for now.</h1>
                    <p>Come back when your mind wants more.</p>
                </div>

                <div className="ls-actions">
                    <button className="ls-btn ls-btn-primary">
                        <span>
                            Exit to Dashboard
                            <span className="material-symbols-outlined ls-arrow">
                                east
                            </span>
                        </span>
                    </button>

                    <button className="ls-btn ls-btn-secondary">
                        <span>
                            <span className="material-symbols-outlined ls-arrow-left">
                                auto_stories
                            </span>
                            Explore another topic
                        </span>
                    </button>
                </div>
            </main>

            <footer className="ls-footer">
                <span />
                <span />
                <span />
            </footer>
        </div>
    );
}

// src/components/StatsWidget.jsx

const StatsWidget = () => {
    return (
        <div className="stats-widget">
            <h3 className="widget-title">Study Stats</h3>

            <div className="stats-grid">
                <div className="stat-box">
                    <p className="stat-value">12</p>
                    <p className="stat-label">Flashcards Created</p>
                </div>

                <div className="stat-box">
                    <p className="stat-value">8</p>
                    <p className="stat-label">Quizzes Generated</p>
                </div>

                <div className="stat-box">
                    <p className="stat-value">3h</p>
                    <p className="stat-label">Study Time</p>
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;

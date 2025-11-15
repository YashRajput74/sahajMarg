// src/components/ProgressWidget.jsx

const ProgressWidget = () => {
    return (
        <div className="progress-widget">
            <h3 className="widget-title">Weekly Progress</h3>

            <div className="progress-circle">
                <svg width="120" height="120">
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="progress-bg"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="progress-bar"
                        style={{ strokeDashoffset: 125 }} // 60% progress
                    />
                </svg>

                <div className="progress-text">60%</div>
            </div>

            <p className="progress-sub">You're on track! Keep going </p>
        </div>
    );
};

export default ProgressWidget;

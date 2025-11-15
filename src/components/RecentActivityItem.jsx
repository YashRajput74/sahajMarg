// src/components/RecentActivityItem.jsx

const RecentActivityItem = ({ icon, iconColor, title, subtitle }) => {
    return (
        <div className="activity-item">
            <div className="activity-icon" style={{ color: iconColor }}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>

            <div className="activity-info">
                <p className="activity-title">{title}</p>
                <p className="activity-sub">{subtitle}</p>
            </div>

            <button className="activity-more">
                <span className="material-symbols-outlined">more_horiz</span>
            </button>
        </div>
    );
};

export default RecentActivityItem;

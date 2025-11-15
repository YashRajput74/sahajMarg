// src/components/QuickAccessCard.jsx

const QuickAccessCard = ({ icon, title, desc }) => {
    return (
        <div className="qa-card">
            <div className="qa-icon">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="qa-title">{title}</p>
                <p className="qa-desc">{desc}</p>
            </div>
        </div>
    );
};

export default QuickAccessCard;

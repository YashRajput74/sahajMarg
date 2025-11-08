import "./MasteryProgress.css";

const MasteryProgress = ({ score }) => {
    return (
        <div className="mastery-progress">
            <div className="progress-header">
                <p>Overall Mastery Score</p>
                <p className="score">{score}%</p>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
};

export default MasteryProgress;

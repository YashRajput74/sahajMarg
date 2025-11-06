import "../pages/StudyHub.css";

const SummaryOutput = ({ summary }) => {
    return (
        <div className="summary-output">
            <div className="output-header">
                <h2>Your Summary</h2>
                <div className="output-actions">
                    <button title="Copy">📋</button>
                    <button title="Save">💾</button>
                    <button title="Download">⬇️</button>
                </div>
            </div>
            <div className="output-box">
                {summary ? <p>{summary}</p> : <p>Your AI-generated summary will appear here once generated.</p>}
            </div>
        </div>
    );
};

export default SummaryOutput;

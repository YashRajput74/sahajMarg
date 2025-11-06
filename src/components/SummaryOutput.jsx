import "../pages/StudyHub.css";

const SummaryOutput = ({ summary }) => {
    const handleCopy = () => {
        if (summary) {
            navigator.clipboard.writeText(summary);
            alert("Summary copied to clipboard!");
        }
    };

    const handleSave = () => {
        if (summary) {
            localStorage.setItem("savedSummary", summary);
            alert("Summary saved locally!");
        }
    };

    const handleDownload = () => {
        if (summary) {
            const blob = new Blob([summary], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "summary.txt";
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="summary-output">
            <div className="output-header">
                <h2>Your Summary</h2>
                <div className="output-actions">
                    <button title="Copy" onClick={handleCopy}>
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                    <button title="Save" onClick={handleSave}>
                        <span className="material-symbols-outlined">save</span>
                    </button>
                    <button title="Download" onClick={handleDownload}>
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
            </div>

            <div className="output-box">
                {summary ? (
                    <p>{summary}</p>
                ) : (
                    <p>Your AI-generated summary will appear here once generated.</p>
                )}
            </div>
        </div>
    );
};

export default SummaryOutput;

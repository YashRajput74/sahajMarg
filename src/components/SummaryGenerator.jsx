// import "../pages/StudyHub.css";

const SummaryGenerator = ({ file, setFile, text, setText, onGenerate, loading, message }) => {
    return (
        <div className="summary-generator">
            <h1>Generate a New Summary</h1>
            <p className="subtext">Upload a PDF or paste your notes to get started.</p>

            <div className="input-card">
                <div className="input-options">
                    <label className="option">
                        <input type="radio" name="input-method" value="pdf" onChange={() => { }} />
                        Upload PDF
                    </label>
                    <label className="option">
                        <input type="radio" name="input-method" value="text" defaultChecked />
                        Paste Text
                    </label>
                </div>

                <label className="text-input">
                    <p>Paste your notes here</p>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="You can paste your long-form text here..."
                        maxLength={5000}
                    />
                </label>

                <button onClick={onGenerate} disabled={loading}>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    {loading ? "Generating..." : "Generate Summary"}
                </button>
                {message && <p className="status">{message}</p>}
            </div>
        </div>
    );
};

export default SummaryGenerator;

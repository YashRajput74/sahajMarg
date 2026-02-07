import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Misconception.css'

export default function MisconceptionLoop() {
    const { topic } = useParams();

    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "https://sahajmarg-backend.onrender.com";

    const [sessionId, setSessionId] = useState(null);
    const [myths, setMyths] = useState([]);
    const [current, setCurrent] = useState(0);

    const [selected, setSelected] = useState(null);
    const [explanation, setExplanation] = useState("");

    const [aiMood, setAiMood] = useState("NEUTRAL");
    const [aiResponse, setAiResponse] = useState("");
    useEffect(() => {
        async function init() {
            // 1. Create session
            const sRes = await fetch(`${BACKEND_URL}/learning/misconception/session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            const sData = await sRes.json();
            setSessionId(sData.sessionId);

            // 2. Fetch myths
            const mRes = await fetch(`${BACKEND_URL}/learning/misconception/list`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            const mData = await mRes.json();
            setMyths(mData.myths);
        }

        init();
    }, [topic]);

    async function submit() {
        if (!selected || !sessionId) return;

        const res = await fetch(`${BACKEND_URL}/learning/misconception/evaluate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                myth: myths[current],
                userAnswer: selected,
                explanation,
                didExplain: explanation.trim().length > 0,
            }),
        });

        const data = await res.json();
        setAiMood(data.mood);
        setAiResponse(data.response);
    }
    function nextMyth() {
        setSelected(null);
        setExplanation("");
        setAiResponse("");
        setAiMood("NEUTRAL");
        setCurrent((i) => i + 1);
    }
    return (
        <div className="loop-root">
            {/* LEFT */}
            <div className="left">
                <h3 className="step-title">Myth {current + 1}</h3>

                <p className="myth-statement">
                    {myths[current]?.statement}
                </p>

                <div className="step">
                    <span className="step-label">Step 1</span>
                    <div className="choice-buttons">
                        <button
                            className={selected === "True" ? "active" : ""}
                            onClick={() => setSelected("True")}
                        >
                            True
                        </button>
                        <button
                            className={selected === "False" ? "active" : ""}
                            onClick={() => setSelected("False")}
                        >
                            False
                        </button>
                    </div>
                </div>

                <div className={`step ${selected ? "enabled" : "disabled"}`}>
                    <span className="step-label">Step 2</span>
                    <textarea
                        placeholder="Why do you think so? (This helps the assistant understand your thinking)"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        disabled={!selected}
                    />
                </div>

                <button
                    className="submit-btn"
                    onClick={submit}
                    disabled={!selected}
                >
                    Submit
                </button>
            </div>

            {/* RIGHT */}
            <div className={`right mood-${aiMood}`}>
                <h3>Assistant</h3>
                <p><strong>Mood:</strong> {aiMood}</p>

                <div className="ai-bubble">
                    {aiResponse || "Waiting for your answer..."}
                </div>

                {aiResponse && (
                    <button onClick={nextMyth}>Next Myth</button>
                )}
            </div>
        </div>
    );
}
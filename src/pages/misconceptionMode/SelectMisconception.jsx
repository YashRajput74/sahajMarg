import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SelectMisconceptionTopic() {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    function start() {
        if (!topic.trim()) return;
        navigate(`/misconceptions/${encodeURIComponent(topic)}`);
    }

    return (
        <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
            <h1>DeepDive</h1>
            <p>Enter a topic to uncover common misconceptions</p>

            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Quantum Physics, Thermodynamics"
                style={{ width: "100%", padding: 12, marginBottom: 12 }}
                onKeyDown={(e) => e.key === "Enter" && start()}
            />

            <button onClick={start}>Start</button>
        </div>
    );
}

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SelectTopic() {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    function startLearning() {
        if (!topic.trim()) return;
        navigate(`/two-assistants/${encodeURIComponent(topic)}`);
    }

    return (
        <div style={{ padding: "40px", maxWidth: 600, margin: "auto" }}>
            <h1>Two-Assistant Learning</h1>
            <p>Select a topic to begin</p>

            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Alcohols, Thermodynamics, AC Circuits"
                style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
                onKeyDown={(e) => e.key === "Enter" && startLearning()}
            />

            <button onClick={startLearning}>
                Start Learning
            </button>
        </div>
    );
}

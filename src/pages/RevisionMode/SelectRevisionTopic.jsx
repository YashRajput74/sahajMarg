import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectRevisionTopic = () => {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!topic.trim()) return;
        navigate(`/revision/canvas/${encodeURIComponent(topic)}`);
    };

    return (
        <div style={{ padding: 32, maxWidth: 500 }}>
            <h1>Revision Mode</h1>
            <p>Enter a topic to generate a concept canvas.</p>

            <input
                type="text"
                placeholder="e.g. Core Web Vitals"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 12
                }}
            />

            <button onClick={handleSubmit}>
                Start Revision
            </button>
        </div>
    );
};

export default SelectRevisionTopic;

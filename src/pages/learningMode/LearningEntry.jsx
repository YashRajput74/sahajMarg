import { useRef, useState } from "react";
import LearningEntryLayout from "../../components/LearningEntryLayout";

export default function LearningEntry({ onStart }) {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const abortRef = useRef(null);

    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "https://sahajmarg-backend.onrender.com";

    const startLearning = async () => {
        if (!topic.trim() || loading) return;

        abortRef.current?.abort();
        abortRef.current = new AbortController();
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/flowchart/nodes`, {
                method: "POST",
                signal: abortRef.current.signal,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, level: "beginner" }),
            });

            const flowchart = await res.json();
            onStart(flowchart, topic);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LearningEntryLayout
            title="Welcome back, ready to focus?"
            subtitle="Enter a single topic to begin your distraction-free session."
            topic={topic}
            setTopic={setTopic}
            onStart={startLearning}
            loading={loading}
            showLearningMode={true}
        />
    );
}

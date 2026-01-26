import "../../styles/LearningEntry.css";
import { useRef, useState } from "react";

export default function LearningEntry({ onStart }) {
    const [topic, setTopic] = useState("");
    const abortRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL !== ""
            ? import.meta.env.VITE_BACKEND_URL
            : "https://sahajmarg-backend.onrender.com";
    const startLearning = async () => {
        if (!topic.trim() || loading) return;

        abortRef.current?.abort();
        abortRef.current = new AbortController();

        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/flowchart/nodes`, {
                method: "POST",
                signal: abortRef.current.signal,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic,
                    level: "beginner",
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to generate flowchart");
            }

            const flowchart = await res.json();

            onStart(flowchart, topic);

        } catch (err) {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="le-root">
            <div className="le-bg-pattern" />
            <div className="le-bg-blob le-blob-1" />
            <div className="le-bg-blob le-blob-2" />
            <div className="le-bg-blob le-blob-3" />

            <header className="le-header">
                <div className="le-brand">
                    <div className="le-logo">
                        <svg viewBox="0 0 48 48" fill="currentColor">
                            <path d="M42.17 20.17L27.83 5.83C29.14 7.14 28.4 10.19 26.2 13.77C24.85 15.96 22.96 18.34 20.65 20.65C18.34 22.96 15.96 24.85 13.77 26.2C10.19 28.4 7.14 29.14 5.83 27.83L20.17 42.17C21.48 43.48 24.54 42.75 28.11 40.55C30.3 39.2 32.69 37.31 35 35C37.31 32.69 39.2 30.3 40.55 28.11C42.75 24.54 43.48 21.48 42.17 20.17Z" />
                        </svg>
                    </div>
                    <h2 className="le-title">StudyFocus</h2>
                </div>

                <div className="le-header-actions">
                    <button className="le-icon-btn">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="le-icon-btn">
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                    </button>
                </div>
            </header>

            <main className="le-main">
                <div className="le-center">
                    <h1 className="le-heading">
                        Welcome back, ready to focus?
                    </h1>
                    <p className="le-subtitle">
                        Enter a single topic to begin your distraction-free session.
                    </p>

                    <button className="le-learning-btn">
                        <span className="material-symbols-outlined">
                            auto_awesome
                        </span>
                        Learning Mode
                    </button>

                    <div className="le-input-wrapper">
                        <input
                            className="le-input"
                            placeholder="Type a topic name"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <button
                            className="le-start-btn"
                            onClick={startLearning}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Start Learning"}
                            <span className="material-symbols-outlined">
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    <div className="le-suggestions">
                        <span>Suggestions:</span>
                        <button onClick={() => setTopic("Quantum Physics")}>
                            Quantum Physics
                        </button>

                        <button>Digital Art History</button>
                        <button>Sustainable Farming</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

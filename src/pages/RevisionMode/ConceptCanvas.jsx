import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityBlock from "./ActivityBlock";

const ConceptCanvas = () => {
    const { topic } = useParams();
    const [canvas, setCanvas] = useState(null);
    const [completed, setCompleted] = useState({});
    const [error, setError] = useState("");
    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL || "https://sahajmarg-backend.onrender.com";


    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                setError("");
                setCanvas(null);

                const res = await fetch(`${BACKEND_URL}/api/revision/canvas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        topic: decodeURIComponent(topic).trim(),
                    }),
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || "Failed to load canvas");
                }

                const data = await res.json();
                setCanvas(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            }
        };

        fetchCanvas();
    }, [topic]);

    if (error) {
        return (
            <div style={{ padding: 24, color: "red" }}>
                ❌ {error}
            </div>
        );
    }

    if (!canvas) {
        return <div style={{ padding: 24 }}>Loading canvas...</div>;
    }

    const total = canvas.activities.length;
    const doneCount = Object.keys(completed).length;

    return (
        <div style={{ padding: 24 }}>
            <h1>{canvas.title}</h1>
            <p>
                Progress: {doneCount} / {total}
            </p>

            {canvas.activities.map(activity => (
                <ActivityBlock
                    key={activity.id}
                    activity={activity}
                    isDone={completed[activity.id]}
                    onComplete={() =>
                        setCompleted(prev => ({
                            ...prev,
                            [activity.id]: true,
                        }))
                    }
                />
            ))}

            {doneCount === total && (
                <h2 style={{ marginTop: 32, color: "green" }}>
                    🎉 Canvas Completed
                </h2>
            )}
        </div>
    );
};

export default ConceptCanvas;

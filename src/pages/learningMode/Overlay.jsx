import "./Overlay.css";
import { useEffect, useState } from "react";

export default function Overlay({ topic, node, onClose }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL !== ""
            ? import.meta.env.VITE_BACKEND_URL
            : "https://sahajmarg-backend.onrender.com";

    useEffect(() => {
        if (!node) return;

        const controller = new AbortController();

        setLoading(true);
        setError(null);

        fetch(`${BACKEND_URL}/flowchart/overlay`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                topic,
                node: {
                    id: node.id,
                    label: node.label,
                    subtitle: node.subtitle,
                },
                level: "beginner",
            }),
        })
            .then(res => res.json())
            .then(setData)
            .catch(err => {
                if (err.name !== "AbortError") {
                    console.error("Overlay fetch failed:", err);
                    setError("Failed to load content");
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [node, topic]);

    if (!node) return null;

    return (
        <div className="ov-backdrop">
            <div className="ov-modal">
                <div className="ov-header">
                    <div className="ov-header-left">
                        <div className="ov-icon">
                            <span className="material-symbols-outlined">
                                {data?.meta?.icon || "school"}
                            </span>
                        </div>

                        <div>
                            {data?.meta?.badge && (
                                <div className="ov-badges">
                                    <span className="ov-badge ov-badge-primary">
                                        {data.meta.badge}
                                    </span>
                                </div>
                            )}
                            <h2 className="ov-title">
                                {data?.meta?.title || node.label}
                            </h2>
                        </div>
                    </div>

                    <button className="ov-close-icon" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="ov-content ov-scroll">
                    {loading && <p>Loading content…</p>}
                    {error && <p>{error}</p>}

                    {!loading && data?.sections?.map((section, idx) => {
                        if (section.type === "text") {
                            return (
                                <section className="ov-section" key={idx}>
                                    <h3 className="ov-section-title">
                                        {section.heading}
                                    </h3>
                                    <p className="ov-text">{section.content}</p>
                                </section>
                            );
                        }

                        if (section.type === "notes") {
                            return (
                                <section className="ov-section" key={idx}>
                                    <h3 className="ov-section-title">
                                        {section.heading}
                                    </h3>
                                    <div className="ov-textarea-wrapper">
                                        <textarea
                                            placeholder={section.placeholder}
                                        />
                                        <div className="ov-hint">
                                            <span className="material-symbols-outlined">
                                                auto_awesome
                                            </span>
                                            Saved to your study guide
                                        </div>
                                    </div>
                                </section>
                            );
                        }

                        return null;
                    })}
                </div>

                <div className="ov-footer">
                    <button className="ov-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

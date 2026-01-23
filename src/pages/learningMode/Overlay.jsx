import "./Overlay.css";

export default function Overlay() {
    return (
        <div className="overlay-root">
            {/* Header */}
            <header className="overlay-header">
                <div className="header-left">
                    <div className="logo-icon">⬢</div>
                    <h2>Study AI</h2>
                </div>

                <div className="header-right">
                    <span className="topic-pill">Topic: Web Performance Optimization</span>
                    <button className="icon-btn">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </header>

            {/* Background (blurred flowchart preview) */}
            <main className="overlay-background">
                <div className="root-node">
                    <p className="node-label">Root Concept</p>
                    <h1>Web Performance</h1>
                </div>
            </main>

            {/* Modal */}
            <div className="modal-backdrop">
                <div className="modal">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <div className="modal-title">
                            <div className="modal-icon">
                                <span className="material-symbols-outlined">speed</span>
                            </div>
                            <div>
                                <span className="badge primary">Core Web Vital</span>
                                <h2>Largest Contentful Paint (LCP)</h2>
                            </div>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="modal-content">
                        <section>
                            <h3>What is it?</h3>
                            <p>
                                Largest Contentful Paint (LCP) measures perceived load speed by
                                tracking when the largest element becomes visible.
                            </p>
                        </section>

                        <section>
                            <h3>Why it matters</h3>
                            <p>
                                Faster LCP reduces bounce rates and improves SEO by making the
                                page feel useful sooner.
                            </p>
                        </section>

                        <section>
                            <h3>My Reflections</h3>
                            <textarea placeholder="Add your notes here..." />
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button className="btn-secondary">Close</button>
                        <button className="btn-primary">
                            <span className="material-symbols-outlined">edit_note</span>
                            Add Personal Notes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

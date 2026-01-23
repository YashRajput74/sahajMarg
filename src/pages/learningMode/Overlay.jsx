// Overlay.jsx
import "./Overlay.css";

export default function Overlay({ nodeData, onClose }) {
    if (!nodeData) return null;

    const { meta, sections } = nodeData;

    return (
        <div className="ov-backdrop">
            <div className="ov-modal">
                {/* Header */}
                <div className="ov-header">
                    <div className="ov-header-left">
                        <div className="ov-icon">
                            <span className="material-symbols-outlined">{meta.icon}</span>
                        </div>

                        <div>
                            <div className="ov-badges">
                                <span className="ov-badge ov-badge-primary">{meta.badge}</span>
                            </div>

                            <h2 className="ov-title">{meta.title}</h2>
                        </div>
                    </div>

                    <button className="ov-close-icon" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="ov-content ov-scroll">
                    {sections.map((section, idx) => {
                        if (section.type === "text") {
                            return (
                                <section className="ov-section" key={idx}>
                                    <h3 className="ov-section-title">{section.heading}</h3>
                                    <p className="ov-text">{section.content}</p>
                                </section>
                            );
                        } else if (section.type === "notes") {
                            return (
                                <section className="ov-section" key={idx}>
                                    <h3 className="ov-section-title">{section.heading}</h3>
                                    <div className="ov-textarea-wrapper">
                                        <textarea placeholder={section.placeholder}></textarea>
                                        <div className="ov-hint">
                                            <span className="material-symbols-outlined">auto_awesome</span>
                                            Saved to your study guide
                                        </div>
                                    </div>
                                </section>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* Footer */}
                <div className="ov-footer">
                    <button className="ov-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

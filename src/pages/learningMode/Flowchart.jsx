import "./Flowchart.css";
import { nodesData, tooltips, overlayData } from "../../data";
import Overlay from "./Overlay";
import { useState } from "react";

export default function Flowchart() {
    const [activeNode, setActiveNode] = useState(null);

    const handleNodeClick = (nodeId) => {
        if (overlayData[nodeId]) {
            setActiveNode(overlayData[nodeId]);
        }
    };

    return (
        <div className="fc-root">
            <header className="fc-header">
                <div className="fc-header-left">
                    <div className="fc-logo">
                        <svg viewBox="0 0 48 48">
                            <path
                                fill="currentColor"
                                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                            />
                        </svg>
                    </div>
                    <h2 className="fc-title">Study AI</h2>
                </div>
                <button className="fc-close">✕</button>
            </header>

            <main className="fc-main">
                <div className="fc-root-node">
                    <div className="fc-root-card">
                        <p className="fc-root-label">{nodesData.root.label}</p>
                        <h1>{nodesData.root.title}</h1>
                    </div>
                    <div className="fc-line-vertical" />
                </div>

                <div className="fc-columns">
                    <div className="fc-horizontal-line" />

                    {nodesData.columns.map((column) => (
                        <div className="fc-column" key={column.id}>
                            <div className="fc-line-vertical small" />

                            <div className="fc-column-card">
                                <h3>{column.title}</h3>
                                <p>{column.subtitle}</p>
                            </div>

                            <div className="fc-line-vertical" />

                            <div className="fc-item-list">
                                {column.nodes.map((node) => {
                                    const tooltip = tooltips[node.id];

                                    return (
                                        <div
                                            key={node.id}
                                            className={`fc-item ${tooltip ? "fc-tooltip-trigger" : ""}`}
                                            onClick={() => handleNodeClick(node.id)}
                                        >
                                            <span className="fc-dot" />

                                            <div>
                                                <strong>{node.label}</strong>
                                                <small>{node.subtitle}</small>
                                            </div>

                                            {tooltip && (
                                                <div className="fc-tooltip">
                                                    <strong>{tooltip.heading}</strong>
                                                    <p>{tooltip.data}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="fc-guide">
                    <h4>Study Guide</h4>
                    <p>
                        Explore the hierarchy of web performance. Hover nodes like{" "}
                        <strong>LCP</strong> for quick definitions.
                    </p>
                </div>
            </main>
            {activeNode && (
                <Overlay nodeData={activeNode} onClose={() => setActiveNode(null)} />
            )}
        </div>
    );
}

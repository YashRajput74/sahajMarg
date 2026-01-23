import "./Flowchart.css";

export default function Flowchart() {
    return (
        <div className="fc-root">
            {/* Header */}
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

            {/* Main */}
            <main className="fc-main">
                {/* Root node */}
                <div className="fc-root-node">
                    <div className="fc-root-card">
                        <p className="fc-root-label">Root Concept</p>
                        <h1>Web Performance</h1>
                    </div>
                    <div className="fc-line-vertical" />
                </div>

                {/* Columns */}
                <div className="fc-columns">
                    <div className="fc-horizontal-line" />

                    {/* Column 1 */}
                    <div className="fc-column">
                        <div className="fc-line-vertical small" />
                        <div className="fc-column-card">
                            <h3>Core Web Vitals</h3>
                            <p>User experience metrics</p>
                        </div>
                        <div className="fc-line-vertical" />

                        <div className="fc-item-list">
                            <div className="fc-item fc-tooltip-trigger">
                                <span className="fc-dot" />
                                <div>
                                    <strong>LCP</strong>
                                    <small>Largest Contentful Paint</small>
                                </div>

                                <div className="fc-tooltip">
                                    <strong>Largest Contentful Paint (LCP)</strong>
                                    <p>
                                        Measures the time it takes for the largest image or text block
                                        to become visible in the viewport.
                                    </p>
                                </div>
                            </div>

                            <div className="fc-item">
                                <span className="fc-dot" />
                                <div>
                                    <strong>FID</strong>
                                    <small>First Input Delay</small>
                                </div>
                            </div>

                            <div className="fc-item">
                                <span className="fc-dot" />
                                <div>
                                    <strong>CLS</strong>
                                    <small>Cumulative Layout Shift</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="fc-column">
                        <div className="fc-line-vertical small" />
                        <div className="fc-column-card">
                            <h3>Network Timing</h3>
                            <p>Latency and delivery</p>
                        </div>
                        <div className="fc-line-vertical" />

                        <div className="fc-item-list">
                            <div className="fc-item">
                                <span className="fc-dot muted" />
                                <div>
                                    <strong>TTFB</strong>
                                    <small>Time to First Byte</small>
                                </div>
                            </div>
                            <div className="fc-item">
                                <span className="fc-dot muted" />
                                <div>
                                    <strong>DNS Lookup</strong>
                                    <small>Domain resolution time</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="fc-column">
                        <div className="fc-line-vertical small" />
                        <div className="fc-column-card">
                            <h3>Asset Optimization</h3>
                            <p>Resource efficiency</p>
                        </div>
                        <div className="fc-line-vertical" />

                        <div className="fc-item-list">
                            <div className="fc-item">
                                <span className="fc-dot light" />
                                <div>
                                    <strong>Compression</strong>
                                    <small>Gzip, Brotli</small>
                                </div>
                            </div>
                            <div className="fc-item">
                                <span className="fc-dot light" />
                                <div>
                                    <strong>Caching</strong>
                                    <small>CDN, Browser Cache</small>
                                </div>
                            </div>
                            <div className="fc-item">
                                <span className="fc-dot light" />
                                <div>
                                    <strong>Bundling</strong>
                                    <small>Minification, Tree Shaking</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Study guide */}
                <div className="fc-guide">
                    <h4>Study Guide</h4>
                    <p>
                        Explore the hierarchy of web performance. Hover nodes like{" "}
                        <strong>LCP</strong> for quick definitions.
                    </p>
                </div>
            </main>
        </div>
    );
}

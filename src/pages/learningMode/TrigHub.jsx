import "./TrigHub.css";

export default function TrigHub() {
    return (
        <div className="th-root">
            <header className="th-header">
                <div className="th-header-left">
                    <div className="th-logo">
                        <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <h2 className="th-title">Math Visual Guide</h2>
                </div>

                <nav className="th-nav">
                    <a href="#">Home</a>
                    <a href="#">Concepts</a>
                    <a href="#">Formulas</a>
                    <a href="#">Practice</a>
                </nav>

                <div className="th-header-right">
                    <div className="th-search">
                        <span className="material-symbols-outlined">search</span>
                        <input placeholder="Search identities..." />
                    </div>
                    <button className="th-primary-btn">Solve Problems</button>
                </div>
            </header>

            <main className="th-main">
                <div className="th-page-title">
                    <h1>
                        Trigonometry <span>Class 12</span>
                    </h1>
                    <p>
                        Advanced Trig Formula Hub: Inverse Functions, Multiple Angles &
                        Calculus essentials.
                    </p>
                </div>

                <div className="th-grid">
                    <section className="th-card th-info-card">
                        <h3>
                            <span className="material-symbols-outlined">lightbulb</span>
                            What & Why?
                        </h3>

                        <p>
                            From basic ratios to <strong>Inverse Trigonometric Functions</strong>.
                            This chapter bridges geometry and calculus.
                        </p>

                        <ul className="th-highlight-list">
                            <li>
                                <span className="material-symbols-outlined">switch_access_shortcut</span>
                                <div>
                                    <strong>The Inverse</strong>
                                    <small>sin⁻¹x : Domain [-1, 1]</small>
                                </div>
                            </li>
                            <li>
                                <span className="material-symbols-outlined">all_inclusive</span>
                                <div>
                                    <strong>Periodic Nature</strong>
                                    <small>Understanding cycles & waves</small>
                                </div>
                            </li>
                            <li>
                                <span className="material-symbols-outlined">change_history</span>
                                <div>
                                    <strong>General Solutions</strong>
                                    <small>Finding all possible angles</small>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section className="th-card th-vault">
                        <header>
                            <h3>
                                <span className="material-symbols-outlined">category</span>
                                The Formula Vault
                            </h3>
                        </header>

                        <div className="th-vault-grid">
                            <div className="th-vault-item">
                                <h4>Principal Values</h4>
                                <p className="th-formula">sin⁻¹x ∈ [-π/2, π/2]</p>
                                <small>Restricting domain to make functions invertible.</small>
                            </div>

                            <div className="th-vault-item">
                                <h4>ITF Properties</h4>
                                <p className="th-formula">sin⁻¹x + cos⁻¹x = π/2</p>
                                <small>Fundamental inverse identities.</small>
                            </div>

                            <div className="th-vault-item">
                                <h4>Multiple Angles</h4>
                                <p className="th-formula">sin 2θ = 2sinθcosθ</p>
                                <small>Essential for calculus & simplification.</small>
                            </div>
                        </div>
                    </section>

                    <section className="th-card th-rules">
                        <h3>
                            <span className="material-symbols-outlined">menu_book</span>
                            Rules & Strategy
                        </h3>

                        <ul>
                            <li>
                                <strong>√(a² − x²)</strong>
                                <span>x = a sin θ</span>
                            </li>
                            <li>
                                <strong>√(a² + x²)</strong>
                                <span>x = a tan θ</span>
                            </li>
                        </ul>
                    </section>

                    <section className="th-card th-impact">
                        <h3>
                            <span className="material-symbols-outlined">rocket_launch</span>
                            Real World Impact
                        </h3>

                        <div className="th-impact-item">
                            <span className="material-symbols-outlined">graphic_eq</span>
                            <h4>Signal Processing</h4>
                            <p>Fourier transforms decompose signals into sine waves.</p>
                        </div>

                        <div className="th-impact-item">
                            <span className="material-symbols-outlined">waves</span>
                            <h4>Physics (SHM)</h4>
                            <p>Simple Harmonic Motion uses sinusoidal functions.</p>
                        </div>
                    </section>
                    <section className="th-card th-howto">
                        <div className="th-howto-header">
                            <span className="material-symbols-outlined">menu_book</span>
                            <h3>How to Solve: Proofs & Equations</h3>
                        </div>

                        <div className="th-howto-steps">
                            <div className="th-step">
                                <span className="th-step-num">1</span>
                                <p><strong>Check Domain</strong>: Ensure values lie within principal branch.</p>
                            </div>

                            <div className="th-step">
                                <span className="th-step-num">2</span>
                                <p><strong>Substitute</strong>: Use tan θ / sin θ substitutions.</p>
                            </div>

                            <div className="th-step">
                                <span className="th-step-num">3</span>
                                <p><strong>Apply Identities</strong>: sin²θ + cos²θ = 1.</p>
                            </div>

                            <div className="th-step">
                                <span className="th-step-num">4</span>
                                <p><strong>Invert</strong>: Apply inverse functions carefully.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

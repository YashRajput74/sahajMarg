import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="page bg-dark text-white font-display">
            <header className="navbar">
                <div className="brand">
                    <div className="logo">
                        <svg fill="none" viewBox="0 0 48 48">
                            <g clipPath="url(#clip0_6_543)">
                                <path
                                    d="M42.1739 20.1739L27.8261 5.82609C29.1366..."
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </div>
                    <h2 className="brand-title">StudyAI</h2>
                </div>

                <nav className="nav-links">
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Testimonials</a>
                </nav>

                <div className="nav-actions">
                    <button className="btn secondary">Log In</button>
                    <button className="btn primary">Sign Up Free</button>
                </div>
            </header>

            <main className="main">
                <section className="hero">
                    <div
                        className="hero-img"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdKG2r5Az4b8mzai2xCDadeg1CSiDry-qq4cS_fuK6_TGdtB2IDtGYxYDgVVIQi7b1RJng8iaCn_GJtALwHlq1MhQQpGILgVotuPjlC-4B9lzdpuPSbcV1_0_kS4xLhO9hS1sR36CLjM4MOBioopxxUZHCDcKHJz_MjplwHvOgl4FdhKa0vR_4U9U6mJ2GO6zEEiR4x0SRVnGZIKcaR8N_4MP9Bjwj_FyrIrItKWk7GJTtiF9V412uwrdJzj-zMU5_H-7FrHwgknrv")',
                        }}
                    ></div>

                    <div className="hero-text">
                        <h1>Study Smarter, Not Harder.</h1>
                        <h2>
                            Transform your study materials into summaries, flashcards, and
                            practice quizzes with the power of AI.
                        </h2>
                        <button className="btn primary big" onClick={() => { navigate("/newchat") }}>Get Started for Free</button>
                    </div>
                </section>

                <section className="features">
                    <h2 className="section-title">Unlock Your Learning Potential</h2>
                    <p className="section-subtitle">
                        Our AI-powered tools help you understand complex topics, memorize
                        key facts, and ace exams.
                    </p>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <span className="material-symbols-outlined icon">description</span>
                            <h3>Instant PDF Summaries</h3>
                            <p>
                                Upload any PDF and get a concise, easy-to-digest summary in
                                seconds.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span className="material-symbols-outlined icon">style</span>
                            <h3>Smart Flashcards</h3>
                            <p>Create flashcards from your notes automatically.</p>
                        </div>

                        <div className="feature-card">
                            <span className="material-symbols-outlined icon">quiz</span>
                            <h3>Custom Quiz Creation</h3>
                            <p>
                                Generate practice quizzes tailored to your study material.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="steps">
                    <h2 className="section-title">How It Works in 3 Steps</h2>

                    <div className="timeline">
                        <div className="timeline-number">
                            <span className="material-symbols-outlined icon">upload_file</span>
                            <div className="line"></div>
                        </div>
                        <div className="timeline-info">
                            <p className="step-title">1. Upload Your Document</p>
                            <p className="step-text">
                                Securely upload your PDFs, notes, or text-based materials.
                            </p>
                        </div>

                        <div className="timeline-number">
                            <div className="line"></div>
                            <span className="material-symbols-outlined icon">auto_awesome</span>
                            <div className="line"></div>
                        </div>
                        <div className="timeline-info">
                            <p className="step-title">2. Let AI Do the Work</p>
                            <p className="step-text">
                                AI analyzes your content to generate summaries, flashcards,
                                quizzes.
                            </p>
                        </div>

                        <div className="timeline-number">
                            <div className="line"></div>
                            <span className="material-symbols-outlined icon">school</span>
                        </div>
                        <div className="timeline-info">
                            <p className="step-title">3. Master Your Material</p>
                            <p className="step-text">
                                Use personalized study aids to learn faster and retain more.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <h2 className="section-title">What Students Say</h2>

                    <div className="testimonials-grid">
                        {[1, 2, 3].map((i) => (
                            <div className="testimonial-card" key={i}>
                                <div className="stars">
                                    {"★★★★★".split("").map((star, j) => (
                                        <span
                                            key={j}
                                            className="material-symbols-outlined star"
                                        >
                                            star
                                        </span>
                                    ))}
                                </div>

                                <blockquote>
                                    "This app is amazing. Summaries and flashcards saved me hours."
                                </blockquote>
                                <div className="user">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvZASP0gtBL_xYccZwJz_iZ40XiEjmB17Hww7EsRcXZQGM1AGmF8VjTOvfKEgdsmHFnYWO_X5FXohbbTmOznIf4YKK5vuSRY12WjlFT-eG--fYSWAIDgPFn8jrRJPMXm0i-tpoPiNy4ab-dCVj5OS1l09J9ZVsgA4lFS1qvlqzEFblJfNheIikMYrdS04tnSEhk5o5eZyuQJoUjwCA_XcbpTaSMgdgRSX0dPtaM3NYO3YdDJCN7usyDgLzGF0IOps-FCOOuig6qRaI"
                                        alt="User"
                                    />
                                    <div>
                                        <p className="user-name">Alex Johnson</p>
                                        <p className="user-desc">Computer Science</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>© 2024 StudyAI. All rights reserved.</p>
            </footer>
        </div>
    );
}

import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles/Dashboard.css";
import { useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="study-root">
            <header className="study-header">
                <div className="study-logo">
                    <div className="study-logo-icon">
                        <svg viewBox="0 0 48 48">
                            <path
                                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h1>Study AI</h1>
                </div>

                <nav className="study-nav">
                    <button onClick={() => { navigate("/learning-mode") }}>Learning Mode</button>
                    <a href="#">Features</a>
                    <a href="#">Testimonials</a>
                    <button className="study-btn-primary" onClick={openModal}>Sign In</button>
                </nav>
            </header>

            <main className="study-main">
                <div className="study-hero-bg" />

                <section className="study-hero">
                    <div className="study-badge">
                        Universal Learning Platform
                    </div>

                    <h2>
                        Study Smarter, <span>Not Harder</span>
                    </h2>

                    <p>
                        From quantum physics to creative writing, our AI-guided flows and
                        interactive challenges help you master any topic faster.
                    </p>

                    <button className="study-cta" onClick={() => { navigate("/newchat") }}>
                        Get Started for Free
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </section>

                <section className="study-section">
                    <h3>Unlock Your Learning Potential</h3>
                    <p className="study-section-sub">
                        Our AI-powered tools are designed to help you understand complex
                        topics effortlessly.
                    </p>

                    <div className="study-cards">
                        {[
                            ["description", "PDF Summaries", "Upload any PDF and get a concise summary in seconds."],
                            ["style", "Flashcards", "Automatically generate flashcards from your notes."],
                            ["quiz", "Quizzes", "Create tailored practice quizzes from your material."]
                        ].map(([icon, title, text]) => (
                            <div key={title} className="study-card">
                                <div className="study-card-icon">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </div>
                                <h4>{title}</h4>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="study-section">
                    <h3>How It Works in 3 Simple Steps</h3>

                    <div className="study-steps">
                        {[
                            ["upload_file", "Upload Your Document", "Upload PDFs, notes, or text-based material."],
                            ["psychology", "Let AI Do the Work", "We generate summaries, flashcards, and quizzes."],
                            ["school", "Master Your Material", "Study smarter and retain more information."]
                        ].map(([icon, title, text], i) => (
                            <div key={i} className="study-step">
                                <div className="study-step-icon">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </div>
                                <div>
                                    <h4>{title}</h4>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="study-footer">
                <p>© 2025 Study AI. Personalized learning for every subject.</p>
            </footer>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

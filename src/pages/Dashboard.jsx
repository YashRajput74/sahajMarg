import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles/Dashboard.css";
import { useState } from "react";

const testimonials = [
    {
        id: 1,
        text: "This app is amazing. Summaries and flashcards saved me hours.",
        name: "Alex Johnson",
        major: "Computer Science",
        photo:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBvZASP0gtBL_xYccZwJz_iZ40XiEjmB17Hww7EsRcXZQGM1AGmF8VjTOvfKEgdsmHFnYWO_X5FXohbbTmOznIf4YKK5vuSRY12WjlFT-eG--fYSWAIDgPFn8jrRJPMXm0i-tpoPiNy4ab-dCVj5OS1l09J9ZVsgA4lFS1qvlqzEFblJfNheIikMYrdS04tnSEhk5o5eZyuQJoUjwCA_XcbpTaSMgdgRSX0dPtaM3NYO3YdDJCN7usyDgLzGF0IOps-FCOOuig6qRaI",
        stars: 5
    },
    {
        id: 2,
        text: "AI-generated summaries make studying so much faster.",
        name: "Sara Kim",
        major: "Biology",
        photo:
            "https://randomuser.me/api/portraits/women/44.jpg",
        stars: 5
    },
    {
        id: 3,
        text: "The flashcards are incredibly accurate and save me tons of time.",
        name: "David Lee",
        major: "Engineering",
        photo:
            "https://randomuser.me/api/portraits/men/46.jpg",
        stars: 5
    }
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="page bg-dark text-white font-display">
            <header className="navbar">
                <div className="brand">
                    <div className="logo">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_6_543)"><path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path><path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path></g><defs><clippath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clippath></defs></svg>
                    </div>
                    <h2 className="brand-title">StudyAI</h2>
                </div>

                <nav className="nav-links">
                    <button onClick={() => { navigate("/learning-mode") }}>Learning Mode</button>
                    <a href="#">Pricing</a>
                    <a href="#">Testimonials</a>
                </nav>

                <div className="nav-actions">
                    <button className="btn secondary" onClick={openModal}>Log In</button>
                    <button className="btn primary" onClick={openModal}>Sign Up Free</button>
                </div>
            </header>

            <main className="main">
                <section className="hero">
                    <div
                        className="hero-img"
                        style={{
                            backgroundImage:
                                'url("/Study.png")',
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
                                Tired of dense readings? Upload any PDF and get a concise, easy-to-digest summary in seconds.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span className="material-symbols-outlined icon">style</span>
                            <h3>Smart Flashcards</h3>
                            <p>Automatically create flashcards from your notes or documents to reinforce key concepts</p>
                        </div>

                        <div className="feature-card">
                            <span className="material-symbols-outlined icon">quiz</span>
                            <h3>Custom Quiz Creation</h3>
                            <p>
                                Test your knowledge by generating practice quizzes tailored to your study material.
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
                        {testimonials.map((t) => (
                            <div className="testimonial-card" key={t.id}>

                                <div className="stars">
                                    {Array.from({ length: t.stars }).map((_, i) => (
                                        <span key={i} className="material-symbols-outlined star">star</span>
                                    ))}
                                </div>

                                <blockquote>"{t.text}"</blockquote>

                                <div className="user">
                                    <img src={t.photo} alt={t.name} />
                                    <div>
                                        <p className="user-name">{t.name}</p>
                                        <p className="user-desc">{t.major}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>© 2025 StudyAI. All rights reserved.</p>
            </footer>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

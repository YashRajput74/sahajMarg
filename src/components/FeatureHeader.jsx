// src/components/FeatureHeader.jsx
import { Link } from "react-router-dom";
import "./FeatureHeader.css";

export default function FeatureHeader() {
    return (
        <header className="feature-header">
            <div className="logo">
                <img src="#" alt="logo" />
                <span>Sahajmarg</span>
            </div>

            <nav className="feature-nav">
                <Link to="/">Home</Link>
                <Link to="/doc-to-pdf">Flashcard Generator</Link>
                <Link to="/doc-to-pdf">PDF Summarizer</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="header-cta">
                <button className="signup-btn">Sign Up</button>
                <button className="login-btn">Log In</button>
            </div>
        </header>
    );
}

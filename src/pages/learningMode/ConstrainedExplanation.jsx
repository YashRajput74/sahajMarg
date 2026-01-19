import React from "react";
import "./ConstrainedExplanation.css";

export default function ConstrainedExplanation() {
    return (
        <div className="ce-root">
            {/* Background */}
            <div className="ce-background"></div>

            {/* Container */}
            <div className="ce-container">
                {/* Header */}
                <header className="ce-header">
                    <div className="ce-header-left">
                        <div className="ce-back-button">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </div>
                        <h2 className="ce-header-title">Learning Practice</h2>
                    </div>

                    <div className="ce-header-right">
                        <div className="ce-topic">
                            <span className="ce-topic-label">Current Topic</span>
                            <span className="ce-topic-value">Simplifying Concepts</span>
                        </div>
                        <div
                            className="ce-avatar"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClnkGxchNK_NlcnaZEwkTKOO-2KuuKDFNjJQNeiXl_FPdOg96tltWd_Cqi0Ocjngvi0GLl0mj1obZ31E2SHd3aWGh-K3dNoX0SkypnXEo5YdGKRb1HwT7e7B5y3Kz_fg-BbYZ1ZuylPNZTOG7lS-yTRAnkvNZmnCBdivTEMuUdw0x0j33OvTiH8SSmTdBU6grraxyfcsJphtMJPcx3uSzF-fkgG4GbeRey0du42qC")',
                            }}
                        />
                    </div>
                </header>

                {/* Main */}
                <main className="ce-main">
                    <div className="ce-content">
                        <h1 className="ce-title">Explain this to a 12-year-old</h1>

                        {/* Disabled input */}
                        <div className="ce-input-wrapper">
                            <input
                                type="text"
                                className="ce-input"
                                placeholder="Type your explanation here..."
                                disabled
                                value="A cell membrane is a semi-permeable barrier..."
                            />
                            <div className="ce-input-icon">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                        </div>

                        {/* Loader */}
                        <div className="ce-loader-wrapper">
                            <div className="ce-loader">
                                <div className="ce-loader-ring"></div>
                                <div className="ce-loader-spinner"></div>
                            </div>
                            <p className="ce-loader-text">Here’s one way it could be explained…</p>
                        </div>

                        {/* Example explanation box */}
                        <div className="ce-example">
                            <p>
                                "It’s like a tiny filter that lets good air in and bad air out."
                            </p>
                        </div>
                    </div>

                    {/* Continue button */}
                    <div className="ce-continue-wrapper">
                        <button className="ce-continue-button">
                            Continue
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </main>

                {/* Footer */}
              
            </div>
        </div>
    );
}

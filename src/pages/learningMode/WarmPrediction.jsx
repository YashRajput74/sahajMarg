import React, { useState } from "react";
import "./WarmPrediction.css";
import { set1Questions } from "../../mockData/learningModeQuestions";


export default function WarmPrediction() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [showOutcome, setShowOutcome] = useState(false);

    const currentQuestion = set1Questions[currentIndex];

    const handleSelect = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);

        // Show loader
        setTimeout(() => {
            setShowLoader(true);

            // Show outcome after loader delay
            setTimeout(() => {
                setShowOutcome(true);
            }, 1200);
        }, 400);
    };

    const handleContinue = () => {
        // Reset for next question
        setSelectedOption(null);
        setShowLoader(false);
        setShowOutcome(false);

        // Move to next question if available
        if (currentIndex < set1Questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Quiz finished – you could show a summary here
            alert("Quiz completed!");
        }
    };

    return (
        <div className="wp-root">
            <div className="wp-background" />

            <div className="wp-container">
                {/* Header */}
                <header className="wp-header">
                    <div className="wp-header-left">
                        <div className="wp-back-button">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </div>
                        <h2 className="wp-header-title">Discovery Learning</h2>
                    </div>

                    <div className="wp-header-right">
                        <div className="wp-topic">
                            <span className="wp-topic-label">Current Topic</span>
                            <span className="wp-topic-value">Web Vitals Quiz</span>
                        </div>
                        <div
                            className="wp-avatar"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClnkGxchNK_NlcnaZEwkTKOO-2KuuKDFNjJQNeiXl_FPdOg96tltWd_Cqi0Ocjngvi0GLl0mj1obZ31E2SHd3aWGh-K3dNoX0SkypnXEo5YdGKRb1HwT7e7B5y3Kz_fg-BbYZ1ZuylPNZTOG7lS-yTRAnkvNZmnCBdivTEMuUdw0x0j33OvTiH8SSmTdBU6grraxyfcsJphtMJPcx3uSzF-fkgG4GbeRey0du42qC")',
                            }}
                        />
                    </div>
                </header>

                {/* Main */}
                <main className="wp-main">
                    <h1 className="wp-question">{currentQuestion.question}</h1>

                    <div className="wp-interaction-zone">
                        {!showOutcome && (
                            <>
                                {/* Options */}
                                <div
                                    className="wp-options"
                                    style={{
                                        opacity: selectedOption !== null ? 0.6 : 1,
                                        pointerEvents: selectedOption !== null ? "none" : "auto",
                                    }}
                                >
                                    {currentQuestion.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`wp-option ${selectedOption === index ? "wp-option-selected" : ""
                                                }`}
                                            onClick={() => handleSelect(index)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <span className="material-symbols-outlined">
                                                {selectedOption === index
                                                    ? "check_circle"
                                                    : "radio_button_unchecked"}
                                            </span>
                                            <p>{option}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Loader overlay */}
                                <div
                                    className={`wp-loader-wrapper ${showLoader && !showOutcome ? "is-visible" : ""
                                        }`}
                                >
                                    <div className="wp-loader">
                                        <div className="wp-loader-ring" />
                                        <div className="wp-loader-spinner" />
                                        <div className="wp-loader-dot" />
                                    </div>
                                    <p className="wp-loader-text">Let’s see what happens...</p>
                                </div>
                            </>
                        )}

                        {/* Outcome overlay */}
                        {showOutcome && (
                            <div className="wp-outcome animate-in fade-in zoom-in duration-700 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Outcome
                                </h2>
                                <p className="text-2xl md:text-3xl font-medium mb-4 text-deep-charcoal dark:text-warm-cream">
                                    {currentQuestion.outcome}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Continue button */}
                    <div className="wp-continue-wrapper">
                        <button
                            className="wp-continue-button"
                            disabled={!showOutcome}
                            onClick={handleContinue}
                            style={{
                                opacity: showOutcome ? 1 : 0.6,
                                pointerEvents: showOutcome ? "auto" : "none",
                            }}
                        >
                            Continue
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

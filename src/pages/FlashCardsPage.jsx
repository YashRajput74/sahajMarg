import { useState } from "react";
import StudyLayout from "./StudyLayout";
import "./Flashcards.css";
import Flashcard from "../components/Flashcard";

const FlashcardsPage = () => {
    const [currentCard, setCurrentCard] = useState(4);
    const totalCards = 20;

    const flashcardData = {
        title: "Chapter 5: Cell Biology",
        question: "What is Mitochondria?",
        answer:
            "The powerhouse of the cell, responsible for generating most of the cell's supply of ATP.",
    };

    const handlePrev = () => {
        setCurrentCard((prev) => (prev > 1 ? prev - 1 : totalCards));
    };

    const handleNext = () => {
        setCurrentCard((prev) => (prev < totalCards ? prev + 1 : 1));
    };

    const handleShuffle = () => {
        const randomCard = Math.floor(Math.random() * totalCards) + 1;
        setCurrentCard(randomCard);
    };

    const progress = (currentCard / totalCards) * 100;

    return (
        <StudyLayout active="flashcards">
            <div className="content-wrapper">
                <h1 className="chapter-title">{flashcardData.title}</h1>

                <div className="progress-section">
                    <p>Progress</p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="progress-info">
                        Card {currentCard} of {totalCards}
                    </p>
                </div>

                <Flashcard
                    question={flashcardData.question}
                    answer={flashcardData.answer}
                />

                <div className="controls">
                    <button onClick={handlePrev} title="Previous">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button onClick={handleShuffle} title="Shuffle">
                        <span className="material-symbols-outlined">shuffle</span>
                    </button>
                    <button onClick={handleNext} title="Next">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </StudyLayout>
    );
};

export default FlashcardsPage;

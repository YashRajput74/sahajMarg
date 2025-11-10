import StudywiseSidebar from "../components/StudywiseSidebar";
import "./FlashcardPage.css";

const FlashcardsHeader = () => {
    return (
        <header className="flashcards-header">
            <div className="header-left">
                <h1>Cellular Biology</h1>
                <p>Flashcards</p>
            </div>
            <a href="#" className="back-button">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
            </a>
        </header>
    );
};

const Flashcard = () => {
    return (
        <div className="flashcard-container">
            <div className="flashcard">
                <div className="flashcard-front">
                    <p className="card-label">Question</p>
                    <h2>What is the powerhouse of the cell?</h2>
                    <div className="flip-hint">
                        <span className="material-symbols-outlined">flip_camera_android</span>
                        <span>Click to flip</span>
                    </div>
                </div>
                <div className="flashcard-back">
                    <p className="card-label answer">Answer</p>
                    <h2>The Mitochondrion</h2>
                    <p className="answer-detail">
                        It generates most of the cell's supply of adenosine triphosphate (ATP),
                        used as a source of chemical energy.
                    </p>
                </div>
            </div>
        </div>
    );
};

const FlashcardsPage = () => {
    return (
        <div className="flashcards-page">
            <StudywiseSidebar />

            <main className="flashcards-main">
                <div className="flashcards-content">
                    <FlashcardsHeader />
                    <div className="flashcards-body">
                        <Flashcard />
                        <div className="card-progress">
                            <p>Card 12 of 78</p>
                            <div className="controls">
                                <button className="control-btn">
                                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                                </button>
                                <button className="control-btn">
                                    <span className="material-symbols-outlined">shuffle</span>
                                </button>
                                <button className="control-btn primary">
                                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FlashcardsPage;

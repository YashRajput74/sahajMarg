import "./FlashcardPage.css";
import StudywiseSidebar from "../components/StudywiseSidebar";

const FlashcardPage = () => {
    return (
        <div className="flashcard-page">
            <StudywiseSidebar />

            <main className="flashcard-content">
                <div className="flashcard-header">
                    <h2>Cellular Biology</h2>
                    <p>Review key cellular biology concepts using interactive flashcards.</p>
                </div>

                <div className="flashcard-container">
                    <div className="flashcard">
                        <div className="flashcard-inner">
                            <div className="flashcard-front">
                                <h3>What is the powerhouse of the cell?</h3>
                            </div>
                            <div className="flashcard-back">
                                <p>The mitochondrion is known as the powerhouse of the cell.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flashcard-controls">
                    <button className="btn">Previous</button>
                    <button className="btn">Next</button>
                </div>
            </main>
        </div>
    );
};

export default FlashcardPage;

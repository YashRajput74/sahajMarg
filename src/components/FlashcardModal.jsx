import "../styles/Modal.css";

const FlashcardModal = ({ onClose }) => {
    return (
        <div className="fc-modal-overlay">
            <div className="fc-modal-container">
                <div className="fc-modal-close">
                    <button className="fc-close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="fc-flip-card" tabIndex="0">
                    <div className="fc-flip-card-inner">
                        <div className="fc-flip-card-front">
                            <div className="fc-card-content">
                                <p className="fc-question">What is the powerhouse of the cell?</p>
                                <p className="fc-hint">Click to flip</p>
                            </div>
                        </div>
                        <div className="fc-flip-card-back">
                            <div className="fc-card-content">
                                <p className="fc-answer">Mitochondria</p>
                                <p className="fc-explanation">
                                    It generates most of the cell’s supply of ATP.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fc-card-nav">
                    <button className="fc-nav-btn fc-disabled">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <p className="fc-progress-text">3 / 10</p>
                    <button className="fc-nav-btn">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                <div className="fc-modal-footer">
                    <button className="fc-secondary-btn">Review Again</button>
                    <button className="fc-primary-btn">Known</button>
                </div>
            </div>
        </div>
    );
};

export default FlashcardModal;

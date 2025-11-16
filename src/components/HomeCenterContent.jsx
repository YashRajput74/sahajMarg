import "../styles/HomeCenterContent.css";

const HomeCenterContent = () => {
    return (
        <div className="study-center-wrapper">
            <div className="study-center-container">
                <div className="study-center-content">

                    {/* Header */}
                    <div className="study-center-header">
                        <div className="study-center-icon-circle">
                            <span className="material-symbols-outlined study-center-main-icon">
                                auto_awesome
                            </span>
                        </div>

                        <h2 className="study-center-title">
                            Start your smart study session
                        </h2>

                        <p className="study-center-subtitle">
                            Ready to learn? Upload a PDF, paste a text to sumamrize, get quiz, or get flashcards from your notes to begin.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="study-center-features">

                        <div className="study-center-feature-card">
                            <span className="material-symbols-outlined study-center-feature-icon">
                                description
                            </span>
                            <h3 className="study-center-feature-title">Upload a PDF to summarize</h3>
                            <p className="study-center-feature-desc">Get key insights from documents.</p>
                        </div>

                        <div className="study-center-feature-card">
                            <span className="material-symbols-outlined study-center-feature-icon">
                                help_outline
                            </span>
                            <h3 className="study-center-feature-title">Paste some text to generate quiz</h3>
                            <p className="study-center-feature-desc">Generate quiz from text</p>
                        </div>

                        <div className="study-center-feature-card">
                            <span className="material-symbols-outlined study-center-feature-icon">
                                style
                            </span>
                            <h3 className="study-center-feature-title">Create flashcards from your notes</h3>
                            <p className="study-center-feature-desc">Memorize concepts effectively.</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeCenterContent;

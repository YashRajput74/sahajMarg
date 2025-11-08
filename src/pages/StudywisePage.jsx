import StudywiseSidebar from "../components/StudywiseSidebar";
import MasteryProgress from "./MasteryProgress";
import "./StudywisePage.css";

const StudywisePage = () => {
    return (
        <div className="studywise-layout">
            <StudywiseSidebar />
            <main className="studywise-page">
                <header className="page-heading">
                    <div className="heading-left">
                        <h1>Cellular Biology</h1>
                        <p>Last studied: Yesterday</p>
                    </div>
                    <button className="primary-btn">
                        <span className="material-symbols-outlined">play_arrow</span>
                        Start Study Session
                    </button>
                </header>

                <section className="segmented-buttons">
                    <label>
                        <input type="radio" name="study-mode" value="Text" />
                        <span>See source text</span>
                    </label>
                    <label>
                        <input type="radio" name="study-mode" value="Flashcards" defaultChecked />
                        <span>Review Flashcards</span>
                    </label>
                </section>

                <MasteryProgress score={85} />

                <section className="topic-overview">
                    <h2>Topic Overview</h2>
                    <div className="cards">
                        {/* AI Summary */}
                        <div className="card">
                            <div className="card-header">
                                <div className="icon-bg">
                                    <span className="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <h3>AI Summary</h3>
                            </div>
                            <p>
                                A brief overview of organelles, cell division, and cellular respiration,
                                highlighting key processes and structures essential for understanding life at
                                the microscopic level.
                            </p>
                        </div>

                        {/* Flashcards */}
                        <div className="card">
                            <div className="card-header">
                                <div className="icon-bg">
                                    <span className="material-symbols-outlined">style</span>
                                </div>
                                <div>
                                    <h3>Flashcards</h3>
                                    <p className="subtext">78 Cards</p>
                                </div>
                            </div>
                            <button className="outline-btn">View All</button>
                        </div>

                        {/* Quiz Results */}
                        <div className="card">
                            <div className="card-header">
                                <div className="icon-bg">
                                    <span className="material-symbols-outlined">quiz</span>
                                </div>
                                <div>
                                    <h3>Quiz Results</h3>
                                    <p className="subtext">
                                        Latest Score: <span className="highlight">9 / 10</span>
                                    </p>
                                </div>
                            </div>
                            <button className="outline-btn">Review Results</button>
                        </div>

                        {/* Related Topics */}
                        <div className="card">
                            <div className="card-header">
                                <div className="icon-bg">
                                    <span className="material-symbols-outlined">hub</span>
                                </div>
                                <h3>Related Topics</h3>
                            </div>
                            <ul>
                                <li>Genetics</li>
                                <li>Molecular Biology</li>
                                <li>Biochemistry</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StudywisePage;

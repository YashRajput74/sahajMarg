import "./TopicsPage.css";

export default function TopicsPage() {
    const topics = [
        {
            title: "Cellular Biology",
            flashcards: 78,
            type: "Source PDF",
            icon: "picture_as_pdf",
            description:
                "An overview of organelles, cell division, and cellular respiration, key for understanding life at a microscopic level.",
        },
        {
            title: "World War II History",
            flashcards: 124,
            type: "Typed Note",
            icon: "edit_note",
            description:
                "Key events, figures, and turning points of the Second World War, from its origins to its conclusion and aftermath.",
        },
        {
            title: "Calculus Fundamentals",
            flashcards: 95,
            type: "Source PDF",
            icon: "picture_as_pdf",
            description:
                "Core concepts of calculus including limits, derivatives, and integrals, forming the basis of advanced mathematics.",
        },
    ];

    return (
        <div>
            <header className="topics-header">
                <div>
                    <h1>My Topics</h1>
                    <p>All your study materials in one place.</p>
                </div>
                <button className="create-btn">
                    <span className="material-symbols-outlined">add</span>
                    Create New Topic
                </button>
            </header>

            <div className="topics-grid">
                {topics.map((topic, index) => (
                    <div className="topic-card" key={index}>
                        <div className="topic-content">
                            <div className="topic-top">
                                <div>
                                    <h3>{topic.title}</h3>
                                    <p>{topic.flashcards} Flashcards</p>
                                </div>
                                <a href="#" className="topic-type">
                                    <span className="material-symbols-outlined">{topic.icon}</span>
                                    {topic.type}
                                </a>
                            </div>
                            <p className="topic-description">{topic.description}</p>
                        </div>

                        <div className="topic-actions">
                            <a href="#" className="topic-action">
                                <span className="material-symbols-outlined">style</span>
                                View Flashcards
                            </a>
                            <a href="#" className="topic-action">
                                <span className="material-symbols-outlined">article</span>
                                View Summary
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

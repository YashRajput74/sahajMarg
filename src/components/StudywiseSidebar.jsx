import "./StudywiseSidebar.css";

const StudywiseSidebar = () => {
    return (
        <aside className="studywise-sidebar">
            <div className="studywise-sidebar-header">
                <div className="logo">
                    <div className="logo-image" />
                    <div>
                        <h1>StudyWise</h1>
                        <p>AI Study Assistant</p>
                    </div>
                </div>

                <nav className="nav-links">
                    <a href="#" className="nav-item active">Cellular Biology</a>
                    <a href="#" className="nav-item">World War II History</a>
                    <a href="#" className="nav-item">Calculus Fundamentals</a>
                    <a href="#" className="nav-item">Organic Chemistry</a>
                </nav>
            </div>

            <div className="add-topic">
                <button>Add New Topic</button>
            </div>
        </aside>
    );
};

export default StudywiseSidebar;

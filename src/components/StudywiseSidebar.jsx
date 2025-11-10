import "./StudywiseSidebar.css";

const StudywiseSidebar = () => {
    return (
        <aside className="studywise-sidebar">
            <div className="sidebar-top">
                <div className="logo-section">
                    <div
                        className="logo-image"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDw350C_7R1GPrRFD0Rrq88ZrJWEWRHI4vtoKKS1911on1iiHev1KgpWyiH2lyWBDc7LbI4kxW38IdmSvE5ggxli3GtWvfwinLw_MiZBniRYHnO2-vIUcKvSp5Ur64nVthpcdKJa7mMa4sznxqib_hmluzTfUmVVocobSiv36ptZMTAACJAO4TDk7U8ZIIBiDVnB2dXIoJiqd6bXcWoX9HI2n30HejKpQdgaGkxcQIJYioqwIBg_5ulh5qA_WFRwSBEnQOAunXTzDxI")',
                        }}
                    ></div>
                    <div>
                        <h1>StudyWise</h1>
                        <p>AI Study Assistant</p>
                    </div>
                </div>

                <nav className="nav-links">
                    <a href="#" className="nav-item active">
                        <span className="material-symbols-outlined">science</span>
                        New Chat
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-symbols-outlined">history_edu</span>
                        World War II History
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-symbols-outlined">functions</span>
                        Calculus Fundamentals
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-symbols-outlined">biotech</span>
                        Organic Chemistry
                    </a>
                </nav>
            </div>

            <div className="sidebar-bottom">
                <button className="add-topic-btn">Add New Topic</button>
            </div>
        </aside>
    );
};

export default StudywiseSidebar;

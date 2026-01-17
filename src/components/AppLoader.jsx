import "../styles/AppLoader.css";

const AppLoader = () => {
    return (
        <div className="app-loader">
            <div className="loader-card">
                <span className="material-symbols-outlined study-center-main-icon">auto_awesome</span>

                <h2>Study AI</h2>
                <p>Preparing your study session…</p>

                <div className="loader-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default AppLoader;

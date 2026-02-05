export default function SnapShotHeader() {
    return (
        <header className="th-header">
            <div className="th-header-left">
                <div className="th-logo">
                    <span className="material-symbols-outlined">architecture</span>
                </div>
                <h2 className="th-title">Dev Visual Guide</h2>
            </div>

            <nav className="th-nav">
                <a href="#">Home</a>
                <a href="#">Concepts</a>
                <a href="#">Practice</a>
            </nav>

            <div className="th-header-right">
                <button className="th-primary-btn">Start Learning</button>
            </div>
        </header>
    );
}

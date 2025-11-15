// src/components/Navbar.jsx

const Navbar = () => {
    return (
        <header className="navbar">
            <h1 className="navbar-title">Dashboard</h1>

            <div className="navbar-right">
                <button className="nav-icon-btn">
                    <span className="material-symbols-outlined">notifications</span>
                </button>

                <div
                    className="navbar-avatar"
                    style={{
                        backgroundImage:
                            `url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80")`,
                    }}
                />
            </div>
        </header>
    );
};

export default Navbar;

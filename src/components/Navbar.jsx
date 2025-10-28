import "./Navbar.css"

export default function Navbar() {
    return (
        <header>
            <div>
                <img src="#" alt="" />
                <span>SahajMarg</span>
            </div>
            <nav>
                <div>Home</div>
                <div>About</div>
                <div>Services</div>
                <div>Contact</div>
                {/* later on convert there into Links or anchor tag what ever we need */}
            </nav>
            <div>
                <button>Signup</button>
            </div>
        </header>
    )
}
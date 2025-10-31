import "./Footer.css"

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-about">
                    <h3>SahajMarg</h3>
                    <p>Your innovative learning leader with expert technical solutions.</p>
                </div>
                <div className="footer-links">
                    <div>
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Customers</a>
                        <a href="#">Events</a>
                    </div>
                    <div>
                        <h4>Industries</h4>
                        <a href="#">Precision learning</a>
                        <a href="#">Tools</a>
                    </div>
                    <div>
                        <h4>Products</h4>
                        <a href="#">AI app</a>
                        <a href="#">Resume builder</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Let's Grow Together. All rights reserved.</p>
            </div>
        </footer>
    )
}
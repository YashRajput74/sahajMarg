import { useNavigate } from "react-router-dom";
import "./Features.css";
import { servicesData } from "../data/servicesData";

export default function Features() {
    const navigate = useNavigate();

    return (
        <>
            <section className="services">
                <h1>Efficient and Integrated Learning Services</h1>
                <p>Simplify learning with our efficient, quality-focused services.</p>

                <div className="service-grid">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            onClick={() => navigate(service.route)}
                            style={{ cursor: "pointer" }}
                        >
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* You can keep your other sections as they are */}
            <section className="benefits">
                <div className="benefits-content">
                    <h2>Key Benefits of Our System for Your Business Efficiency</h2>
                    <ul>
                        <li><strong>Boosting Learning with Tech:</strong> Enhance study quality with advanced tools.</li>
                        <li><strong>Optimization Learning Process:</strong> Maximize your output efficiently.</li>
                        <li><strong>AI-Driven Learning:</strong> Leverage AI to transform learning processes.</li>
                    </ul>
                </div>
                <div className="benefits-image">
                    <img src="https://via.placeholder.com/300x250" alt="chart" />
                </div>
            </section>

            <section className="pricing">
                <h2>Tailored Plans for Your Manufacturing Scale</h2>
                <p>Flexible pricing for any business size.</p>
                <div className="pricing-grid">
                    <div className="pricing-card">
                        <h3>Starter</h3>
                        <p className="price">$39 <span>/month</span></p>
                        <ul>
                            <li>Production up to 1,000 units</li>
                            <li>24/7 Tech Support</li>
                            <li>Access to Dashboard</li>
                        </ul>
                        <a href="#" className="btn primary">Get Started</a>
                    </div>
                    <div className="pricing-card">
                        <h3>Enterprise</h3>
                        <p className="price">$99 <span>/month</span></p>
                        <ul>
                            <li>Unlimited Production Units</li>
                            <li>Dedicated Account Manager</li>
                            <li>Private Production Integration</li>
                        </ul>
                        <a href="#" className="btn primary">Get Started</a>
                    </div>
                    <div className="pricing-card highlight">
                        <h3>Professional</h3>
                        <p className="price">Custom</p>
                        <ul>
                            <li>Custom Tailored Solutions</li>
                            <li>Advanced Features</li>
                            <li>Dedicated Support</li>
                        </ul>
                        <a href="#" className="btn secondary">Get Started</a>
                    </div>
                </div>
            </section>

            <section className="integration">
                <h2>Empowering Top Companies with Seamless Integrations</h2>
                <p>Effortlessly integrate with your existing systems and boost productivity.</p>
                <img src="https://via.placeholder.com/400x200" alt="Integration illustration" />
                <a href="#" className="btn primary">Work With Us</a>
            </section>
        </>
    )
}
import { useNavigate } from "react-router-dom";
import './Hero.css'

export default function Hero(){
    const navigate = useNavigate();
    return (
        <section id="hero">
            <h1>
                The Future of Learning
                <br /> with Latest Technology
            </h1>
            <p>
                Expert Tech to enhance productivity and learning. Let's take your studying further
            </p>
            <div>
                <button className='heroButton' onClick={() => navigate("/features")}>Get Started</button>
                <button className='heroButton demoButton' onClick={() => navigate("/features")}>Try Demo</button>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    )
}
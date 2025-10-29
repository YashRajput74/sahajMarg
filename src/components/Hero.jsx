import './Hero.css'

export default function Hero(){
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
                <button className='heroButton'>Get Started</button>
                <button className='heroButton demoButton'>Try Demo</button>
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
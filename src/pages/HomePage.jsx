import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function HomePage(){
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </>
    )
}
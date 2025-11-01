import "./App.css"
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfToDoc from "./pages/PdfToDoc";
import PdfSummarizer from "./pages/PdfSummarizer";
// import DocToPdf from "./pages/DocToPdf";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlashCardGenerator from "./pages/FlashCardGenerator";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return null;
};

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pdf-to-doc" element={<PdfToDoc />} />
                <Route path="/pdf-summarizer" element={<PdfSummarizer />} />
                <Route path="/generate-flashcard" element={<FlashCardGenerator />} />
            </Routes>
        </Router>
    );
}

export default App;

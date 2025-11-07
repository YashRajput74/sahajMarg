import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PdfToDoc from "./pages/PdfToDoc";
import PdfSummarizer from "./pages/PdfSummarizer";
import FlashCardGenerator from "./pages/FlashCardGenerator";
import QuizGenerator from "./pages/QuizGenerator";
import FeaturesPage from "./pages/FeaturesPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage";
import FlashcardsPage from "./pages/FlashCardsPage";
import SettingsPage from "./pages/SettingsPage";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                <Route path="/generate-quiz" element={<QuizGenerator />} />

                {/* NESTED ROUTE */}
                <Route path="/features" element={<FeaturesPage />}>
                    <Route index element={<Navigate to="summary" replace />} />

                    <Route path="summary" element={<SummaryPage />} />
                    <Route path="flashcards" element={<FlashcardsPage />} />
                    <Route path="quiz" element={<QuizGenerator />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

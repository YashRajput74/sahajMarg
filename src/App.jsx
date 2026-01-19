import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LearningEntry from "./pages/learningMode/LearningEntry";
import LearningSession from "./pages/learningMode/LearningSession";
import WarmPrediction from "./pages/learningMode/WarmPrediction";
import ConstrainedExplanation from "./pages/learningMode/ConstrainedExplanation";

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/newchat" element={<HomePage />} />
                <Route path="/learning-mode" element={<LearningEntry />} />
                <Route path="/learning-mode/session" element={<LearningSession />} />
                <Route path="/choice-prediction" element={<WarmPrediction />} />
                <Route path="/choice-second" element={<ConstrainedExplanation />} />
            </Routes>
        </Router>
    );
}

export default App;

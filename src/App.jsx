import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LearningEntry from "./pages/learningMode/LearningEntry";
import Flowchart from "./pages/learningMode/Flowchart";

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
                <Route path="/learning-mode/session" element={<Flowchart />} />
            </Routes>
        </Router>
    );
}

export default App;

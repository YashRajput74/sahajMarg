import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import QuizGenerator from "./pages/QuizGenerator";
import FeaturesPage from "./pages/FeaturesPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import TopicsPage from "./components/TopicsPage";
import StudywisePage from "./pages/StudywisePage";

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

                <Route path="/features" element={<FeaturesPage />}>
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="topics" element={<TopicsPage />} />
                    <Route path="quiz" element={<QuizGenerator />} />
                    <Route path="summary" element={<StudywisePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

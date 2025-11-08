import TopicsPage from "../components/TopicsPage";
import "./DashboardPage.css";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back! Manage your study materials here.</p>
            </header>

            {/* Top Stats Cards */}
            <div className="stats-grid">
                <div className="card">
                    <div className="card-header">
                        <h3>Active Topics</h3>
                        <span className="material-symbols-outlined">topic</span>
                    </div>
                    <p className="card-value">8</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Total Flashcards</h3>
                        <span className="material-symbols-outlined">style</span>
                    </div>
                    <p className="card-value">1,234</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Summaries Generated</h3>
                        <span className="material-symbols-outlined">article</span>
                    </div>
                    <p className="card-value">15</p>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Quizzes Taken</h3>
                        <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <p className="card-value">27</p>
                </div>
            </div>

            {/* Two Main Panels */}
            <TopicsPage />
        </div>
    );
}

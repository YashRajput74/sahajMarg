import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import QuickAccessCard from "../components/QuickAccessCard";
import RecentActivityItem from "../components/RecentActivityItem";
import ProgressWidget from "../components/ProgressWidget";
import StatsWidget from "../components/StatsWidget";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />

            <main className="dashboard-main">
                <Navbar />

                <div className="dashboard-body" style={{display:"flex"}}>
                    <div className="dashboard-content">

                        <section>
                            <h1 className="title">Welcome back, Alex!</h1>
                            <p className="subtitle">Let's dive into your studies and make today productive.</p>
                        </section>

                        <section>
                            <h2 className="section-title">Quick Access</h2>
                            <div className="quick-access-grid">
                                <QuickAccessCard icon="description" title="Summarize PDF" desc="Upload a document…" />
                                <QuickAccessCard icon="style" title="Create Flashcards" desc="Generate a deck…" />
                                <QuickAccessCard icon="quiz" title="Generate Quiz" desc="Test your knowledge…" />
                            </div>
                        </section>

                        <section>
                            <h2 className="section-title">Recent Activity</h2>
                            <div className="recent-activity-list">
                                <RecentActivityItem iconColor="var(--primary)" icon="description" title='Summarized "Intro to Neuroscience"' subtitle="PDF Document • 3 hours ago" />
                                <RecentActivityItem iconColor="#22c55e" icon="quiz" title='Passed "Organic Chemistry" quiz' subtitle="Score: 92% • Yesterday" />
                            </div>
                        </section>

                    </div>

                    <aside className="dashboard-right">
                        <ProgressWidget />
                        <StatsWidget />
                    </aside>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./StudyLayout.css";

const FeaturesPage = () => {
    return (
        <div className="studyhub-container">
            <Sidebar />
            <main className="studyhub-content">
                <Outlet />
            </main>
        </div>
    );
};

export default FeaturesPage;

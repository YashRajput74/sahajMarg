import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./FeaturesPage.css";

export default function FeaturesPage() {
    return (
        <div className="features-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

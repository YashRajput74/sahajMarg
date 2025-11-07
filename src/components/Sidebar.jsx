import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Header / Logo Section */}
            <div className="sidebar-top">
                <div className="sidebar-header">
                    <div
                        className="logo-img"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDw350C_7R1GPrRFD0Rrq88ZrJWEWRHI4vtoKKS1911on1iiHev1KgpWyiH2lyWBDc7LbI4kxW38IdmSvE5ggxli3GtWvfwinLw_MiZBniRYHnO2-vIUcKvSp5Ur64nVthpcdKJa7mMa4sznxqib_hmluzTfUmVVocobSiv36ptZMTAACJAO4TDk7U8ZIIBiDVnB2dXIoJiqd6bXcWoX9HI2n30HejKpQdgaGkxcQIJYioqwIBg_5ulh5qA_WFRwSBEnQOAunXTzDxI")',
                        }}
                    ></div>
                    <div className="app-info">
                        <h1 className="app-title">StudyWise</h1>
                        <p className="app-subtitle">AI Study Assistant</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="nav-links">
                    <NavLink to="dashboard" className="nav-item">
                        <span className="material-symbols-outlined">home</span>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="topics" className="nav-item">
                        <span className="material-symbols-outlined">topic</span>
                        <span>My Topics</span>
                    </NavLink>
                    <NavLink to="quiz" className="nav-item">
                        <span className="material-symbols-outlined">quiz</span>
                        <span>Practice Quizzes</span>
                    </NavLink>
                    <NavLink to="settings" className="nav-item">
                        <span className="material-symbols-outlined">settings</span>
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>

            {/* Add Topic Button */}
            <div className="sidebar-bottom">
                <button className="add-btn">+ Add New Topic</button>
            </div>
        </aside>
    );
}

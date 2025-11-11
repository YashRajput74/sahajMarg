import "../styles/HomePage.css";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";

const HomePage = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <main className="main-content">
                <ChatWindow />
                <InputBar />
            </main>
        </div>
    );
};

export default HomePage;

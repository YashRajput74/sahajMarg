import "../styles/HomePage.css";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import HomeCenterContent from "../components/HomeCenterContent";

const HomePage = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <main className="main-content">
                <HomeCenterContent />
                {/* <ChatWindow /> */}
                <InputBar />
            </main>
        </div>
    );
};

export default HomePage;

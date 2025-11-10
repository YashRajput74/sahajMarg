import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./NewChat.css";

function NewChat() {
    return (
        <div className="sw-app">
            <Sidebar />
            <MainContent />
        </div>
    );
}

export default NewChat;

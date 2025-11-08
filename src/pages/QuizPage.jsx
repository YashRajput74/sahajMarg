import StudywiseSidebar from "../components/StudywiseSidebar";
import QuizGenerator from "./QuizGenerator";

export default function QuizPage() {
    return (
        <div style={{ display: "flex" }}>
            <StudywiseSidebar />
            <div style={{padding: "2rem", display: "flex",flexDirection: "column",width:"100%"}}>
                <QuizGenerator />
            </div>
        </div>
    )
}
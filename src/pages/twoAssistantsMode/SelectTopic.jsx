import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LearningEntryLayout from "../../components/LearningEntryLayout";

export default function SelectTopic() {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    function startLearning() {
        if (!topic.trim()) return;
        navigate(`/two-assistants/${encodeURIComponent(topic)}`);
    }

    return (
        <LearningEntryLayout
            title="Two-Assistant Learning"
            subtitle="Choose a topic and learn with two AI guides."
            topic={topic}
            setTopic={setTopic}
            onStart={startLearning}
            buttonText="Start Session"
        />
    );
}

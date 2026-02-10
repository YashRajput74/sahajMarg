import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LearningEntryLayout from "../../components/LearningEntryLayout";

export default function SelectMisconceptionTopic() {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    function start() {
        if (!topic.trim()) return;
        navigate(`/misconceptions/${encodeURIComponent(topic)}`);
    }

    return (
        <LearningEntryLayout
            title="Misconception Deep Dive"
            subtitle="Enter a topic to uncover common misunderstandings."
            topic={topic}
            setTopic={setTopic}
            onStart={start}
            buttonText="Reveal Misconceptions"
        />
    );
}

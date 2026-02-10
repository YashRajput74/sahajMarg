import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningEntryLayout from "../../components/LearningEntryLayout";

const SelectRevisionTopic = () => {
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!topic.trim()) return;
        navigate(`/revision/canvas/${encodeURIComponent(topic)}`);
    };

    return (
        <LearningEntryLayout
            title="Revision Mode"
            subtitle="Enter a topic to generate a concept canvas."
            topic={topic}
            setTopic={setTopic}
            onStart={handleSubmit}
            buttonText="Start Revision"
            showLearningMode={false}
        />
    );
};

export default SelectRevisionTopic;

import { useState } from "react";
import LearningEntry from "./LearningEntry";
import FlowChart from "./Flowchart";

export default function LearningMode() {
    const [flowchart, setFlowchart] = useState(null);
    const [topic, setTopic] = useState("");

    return (
        <>
            {!flowchart ? (
                <LearningEntry
                    onStart={(data, topic) => {
                        setFlowchart(data);
                        setTopic(topic);
                    }}
                />
            ) : (
                <FlowChart
                    flowchart={flowchart}
                    topic={topic}
                    onExit={() => {
                        setFlowchart(null);
                        setTopic("");
                    }}
                />
            )}
        </>
    );
}

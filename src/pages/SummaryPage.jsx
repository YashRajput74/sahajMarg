import { useState } from "react";
import StudyLayout from "./StudyLayout";
import SummaryGenerator from "../components/SummaryGenerator";
import SummaryOutput from "../components/SummaryOutput";


function SummaryPage() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(
        JSON.parse(localStorage.getItem("studyHistory")) || []
    );

    const saveToHistory = (data) => {
        const updated = [...history, data];
        setHistory(updated);
        localStorage.setItem("studyHistory", JSON.stringify(updated));
    };

    const generateContent = async (type) => {
        const hasText = text.trim().length > 0;
        const hasFile = !!file;

        if (!hasText && !hasFile) {
            setMessage("Please enter text or upload a PDF first!");
            return;
        }

        setLoading(true);
        setMessage(`Generating ${type}...`);

        try {
            const formData = new FormData();
            if (file) formData.append("file", file);
            else formData.append("text", text);

            const url = "http://localhost:5000/summarize";
            const res = await fetch(url, { method: "POST", body: formData });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to generate content.");

            setSummary(data.summary);
            saveToHistory({ type: "Summary", content: data.summary });
            setMessage(`${type} generated successfully!`);
        } catch (err) {
            console.error(err);
            setMessage("Error generating content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudyLayout active="summary">
            <SummaryGenerator
                file={file}
                setFile={setFile}
                text={text}
                setText={setText}
                onGenerate={() => generateContent("Summary")}
                loading={loading}
                message={message}
            />
            <SummaryOutput summary={summary} />
        </StudyLayout>
    );
}

export default SummaryPage;

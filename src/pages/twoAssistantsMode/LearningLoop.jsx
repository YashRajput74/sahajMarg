import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LearningLoop.css";

export default function LearningLoop() {
    const { topic } = useParams();

    const [sessionId, setSessionId] = useState(null);

    const [teacherInput, setTeacherInput] = useState("");
    const [teacherExplanation, setTeacherExplanation] = useState("");

    const [studentInput, setStudentInput] = useState("");
    const [studentFeedback, setStudentFeedback] = useState("");
    const [studentStatus, setStudentStatus] = useState("ON_TRACK");
    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL !== ""
            ? import.meta.env.VITE_BACKEND_URL
            : "https://sahajmarg-backend.onrender.com";
    useEffect(() => {
        if (sessionId) return;

        async function createSession() {
            const res = await fetch(`${BACKEND_URL}/learning-loop/session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            setSessionId(data.sessionId);
        }

        createSession();
    }, [topic, sessionId]);

    async function askTeacher() {
        if (!sessionId || !teacherInput.trim()) return;

        const res = await fetch(
            `${BACKEND_URL}/learning-loop/teacher/explain`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    intent: "EXPLAIN",
                    reason: teacherInput,
                }),
            }
        );

        const data = await res.json();
        setTeacherExplanation(data.explanation);
        setTeacherInput("");
    }

    async function explainToStudent() {
        if (!sessionId || !studentInput.trim()) return;

        await fetch(`${BACKEND_URL}/learning-loop/student/respond`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                explanation: studentInput,
            }),
        });

        const evalRes = await fetch(
            `${BACKEND_URL}/learning-loop/student/evaluate`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
            }
        );

        const evalData = await evalRes.json();
        setStudentFeedback(evalData.feedback);
        setStudentStatus(evalData.status);
        setStudentInput("");
    }

    async function refocus() {
        if (!sessionId) return;

        const res = await fetch(
            `${BACKEND_URL}/learning-loop/teacher/explain`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    intent: "REDIRECT",
                }),
            }
        );

        const data = await res.json();
        setTeacherExplanation(data.explanation);
    }

    return (
        <div className="ll-root">
            <header className="ll-header">
                <h1 className="ll-title">The Learning Loop</h1>
                <div className="ll-role-switch">
                    <span>Teacher</span>
                    <span className="ll-dot" />
                    <span>User</span>
                    <span className="ll-dot" />
                    <span>Student</span>
                </div>
            </header>

            <main className="ll-main">
                {/* LEFT — TEACHER */}
                <section className="ll-panel ll-teacher">
                    <div className="ll-badge">AI TEACHER</div>
                    <h2 className="ll-topic">{topic}</h2>

                    {teacherExplanation && (
                        <div className="ll-code-block">
                            <div className="ll-code-title">AI EXPLANATION</div>
                            <pre>{teacherExplanation}</pre>
                        </div>
                    )}

                    <input
                        value={teacherInput}
                        onChange={(e) => setTeacherInput(e.target.value)}
                        placeholder="Ask the AI teacher a doubt..."
                    />

                    <button className="ll-btn-primary" onClick={askTeacher}>
                        Ask Teacher
                    </button>

                </section>

                {/* RIGHT — CO-STUDENT */}
                <section className="ll-panel ll-student">
                    {studentStatus !== "ON_TRACK" && (
                        <div className="ll-alert">
                            CO-STUDENT IS {studentStatus.replace("_", " ")}
                        </div>
                    )}

                    <div className="ll-chat-card">
                        <p>{studentFeedback || "Explain the concept to your co-student."}</p>
                    </div>


                    <div className="ll-chat-card ll-exam-focus">
                        <p>
                            Is this relevant for the exam, or should we focus on key patterns?
                        </p>
                    </div>

                    <div className="ll-checklist">
                        <div className="ll-checklist-title">STILL NEED TO COVER (3)</div>
                        <ul>
                            <li>Acid-Catalyzed Dehydration</li>
                            <li>Lucas Reagent Test</li>
                            <li>Branching vs Boiling Point</li>
                        </ul>
                        <small>High-frequency exam topics</small>
                    </div>

                    {/* CO-STUDENT INPUT */}
                    <div className="ll-input-area">
                        <input
                            value={studentInput}
                            onChange={(e) => setStudentInput(e.target.value)}
                            placeholder="Explain to your co-student in simple words..."
                        />

                        <button className="ll-btn-primary" onClick={explainToStudent}>
                            Explain
                        </button>
                        <button className="ll-btn-outline" onClick={refocus}>
                            Refocus
                        </button>
                    </div>
                </section>
            </main>
        </div >
    );
}

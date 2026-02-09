import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./LearningLoop.css";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

export default function LearningLoop() {
    const { topic } = useParams();

    const [sessionId, setSessionId] = useState(null);

    const [teacherInput, setTeacherInput] = useState("");
    const [messages, setMessages] = useState([]);
    const teacherFeedRef = useRef(null);
    const studentFeedRef = useRef(null);
    const recognitionRef = useRef(null);
    const [listening, setListening] = useState(false);

    const [studentInput, setStudentInput] = useState("");
    const [studentStatus, setStudentStatus] = useState("ON_TRACK");

    const BACKEND_URL =
        import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL !== ""
            ? import.meta.env.VITE_BACKEND_URL
            : "https://sahajmarg-backend.onrender.com";


    async function explainToStudentAuto() {
        if (!sessionId) return;

        const spokenText = lastTranscriptRef.current;
        if (!spokenText?.trim()) return;

        lastTranscriptRef.current = "";
        setStudentInput("");

        await fetch(`${BACKEND_URL}/learning-loop/student/respond`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                explanation: spokenText,
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

        setMessages(prev => [
            ...prev,
            { role: "user", target: "student", content: spokenText },
            { role: "student", content: evalData.feedback }
        ]);

        setStudentStatus(evalData.status);
    }

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setStudentInput(transcript);
        };

        recognition.onend = () => {
            setListening(false);
            setTimeout(() => {
                explainToStudentAuto();
            }, 0);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
    }, []);


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

    useEffect(() => {
        if (teacherFeedRef.current) {
            teacherFeedRef.current.scrollTop =
                teacherFeedRef.current.scrollHeight;
        }

        if (studentFeedRef.current) {
            studentFeedRef.current.scrollTop =
                studentFeedRef.current.scrollHeight;
        }
    }, [messages]);

    function startListening() {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        recognitionRef.current.start();
    }

    async function askTeacher() {
        if (!sessionId || !teacherInput.trim()) return;

        setMessages(prev => [
            ...prev,
            { role: "user", target: "teacher", content: teacherInput }
        ]);

        const res = await fetch(`${BACKEND_URL}/learning-loop/teacher/explain`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                intent: "EXPLAIN",
                reason: teacherInput,
            }),
        });

        const data = await res.json();

        setMessages(prev => [
            ...prev,
            { role: "teacher", content: data.explanation }
        ]);

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
        setMessages(prev => [
            ...prev,
            { role: "user", target: "student", content: studentInput },
            { role: "student", content: evalData.feedback }
        ]);

        setStudentStatus(evalData.status);
        setStudentInput("");
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

                    <div className="ll-chat-feed" ref={teacherFeedRef}>
                        {messages
                            .filter(
                                m =>
                                    m.role === "teacher" ||
                                    (m.role === "user" && m.target === "teacher")
                            )
                            .map((m, i) => (
                                <div
                                    key={i}
                                    className={`ll-message ${m.role === "teacher" ? "ll-teacher-msg" : "ll-user-msg"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            ))}
                    </div>

                    <div className="ll-input-area">

                        <input
                            value={teacherInput}
                            onChange={(e) => setTeacherInput(e.target.value)}
                            placeholder="Ask the AI teacher a doubt..."
                        />
                    </div>

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

                    <div className="ll-chat-feed" ref={studentFeedRef}>
                        {messages
                            .filter(
                                m =>
                                    m.role === "student" ||
                                    (m.role === "user" && m.target === "student")
                            )
                            .map((m, i) => (
                                <div
                                    key={i}
                                    className={`ll-message ${m.role === "student" ? "ll-student-msg" : "ll-user-msg"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            ))}
                    </div>

                    <div className="ll-input-area">
                        <input
                            value={studentInput}
                            onChange={(e) => setStudentInput(e.target.value)}
                            placeholder="Explain to your co-student in simple words..."
                        />

                        <button className="ll-btn-primary" onClick={explainToStudent}>
                            Explain
                        </button>
                        <button
                            type="button"
                            className={`ll-mic-btn ${listening ? "listening" : ""}`}
                            onClick={() => recognitionRef.current?.start()}
                            aria-label="Tap to speak"
                        >
                            <span className="ll-mic-ping" />
                            <span className="ll-mic-glow" />
                            <span className="material-symbols-outlined ll-mic-icon">
                                mic
                            </span>
                        </button>

                    </div>
                </section>
            </main>
        </div >
    );
}

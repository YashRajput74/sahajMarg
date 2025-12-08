import { useEffect, useState } from "react";

const TypewriterText = ({ text, speed = 20 }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!text) return;

        let i = 0;
        setDisplayed(""); 
        const str = typeof text === "string" ? text : text.toString();

        const interval = setInterval(() => {
            setDisplayed(str.slice(0, i));
            i++;
            if (i > str.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span style={{ whiteSpace: "pre-wrap" }}>{displayed}</span>;
};

export default TypewriterText;

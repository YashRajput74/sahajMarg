import { useEffect, useState } from "react";

const TypewriterText = ({ text, speed = 20 }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayed}</span>;
};

export default TypewriterText;

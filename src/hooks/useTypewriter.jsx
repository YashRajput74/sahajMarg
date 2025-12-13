import { useEffect, useState } from "react";

const useTypewriter = (text, speed = 20) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!text || typeof text !== "string") return;

        let i = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));

            if (i >= text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayed;
};

export default useTypewriter;

import { useState } from "react";

const FillActivity = ({ activity, onComplete }) => {
    const [value, setValue] = useState("");

    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
            <h3>{activity.title}</h3>
            <p>{activity.question}</p>

            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Your answer"
                style={{ width: "100%", marginBottom: 8 }}
            />

            <button disabled={!value} onClick={onComplete}>
                Submit
            </button>
        </div>
    );
};

export default FillActivity;

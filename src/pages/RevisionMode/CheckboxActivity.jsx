import { useState } from "react";

const CheckboxActivity = ({ activity, onComplete }) => {
    const [selected, setSelected] = useState([]);

    const toggle = opt => {
        setSelected(prev =>
            prev.includes(opt)
                ? prev.filter(x => x !== opt)
                : [...prev, opt]
        );
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
            <h3>{activity.title}</h3>
            <p>{activity.question}</p>

            {activity.options?.map(opt => (
                <div key={opt}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selected.includes(opt)}
                            onChange={() => toggle(opt)}
                        />
                        {opt}
                    </label>
                </div>
            ))}

            <button
                disabled={selected.length === 0}
                onClick={onComplete}
                style={{ marginTop: 8 }}
            >
                Submit
            </button>
        </div>
    );
};

export default CheckboxActivity;

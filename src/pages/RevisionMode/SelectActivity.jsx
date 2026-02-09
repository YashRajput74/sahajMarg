import { useState } from "react";

const SelectActivity = ({ activity, onComplete }) => {
    const [selected, setSelected] = useState(null);

    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
            <h3>{activity.title}</h3>
            <p>{activity.question}</p>

            {activity.options.map(opt => (
                <div key={opt}>
                    <label>
                        <input
                            type="radio"
                            name={activity.id}
                            value={opt}
                            checked={selected === opt}
                            onChange={() => setSelected(opt)}
                        />
                        {opt}
                    </label>
                </div>
            ))}

            <button
                disabled={!selected}
                onClick={onComplete}
                style={{ marginTop: 8 }}
            >
                Submit
            </button>
        </div>
    );
};

export default SelectActivity;

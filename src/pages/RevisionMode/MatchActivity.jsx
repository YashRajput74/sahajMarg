const MatchActivity = ({ activity, onComplete }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
            <h3>{activity.title}</h3>
            <p>{activity.question}</p>

            {activity.items?.map((item, idx) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                    <strong>{item.label}</strong>
                    <select style={{ marginLeft: 8 }}>
                        <option>Choose</option>
                        {(activity.options || []).map(opt => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button onClick={onComplete} style={{ marginTop: 8 }}>
                Submit
            </button>
        </div>
    );
};

export default MatchActivity;

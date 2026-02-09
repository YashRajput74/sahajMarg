const ReorderActivity = ({ activity, onComplete }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
            <h3>{activity.title}</h3>
            <p>{activity.question}</p>

            <ol>
                {(activity.correctOrder || []).map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ol>

            <button onClick={onComplete}>
                Submit
            </button>
        </div>
    );
};

export default ReorderActivity;

export default function FlowSection({ data }) {
    return (
        <section className="th-card th-howto">
            <h3>{data.title}</h3>

            <div className="th-howto-steps">
                {data.steps.map((step, i) => (
                    <div key={i} className="th-step">
                        <span className="th-step-num">{i + 1}</span>
                        <p>
                            <strong>{step.label}</strong>: {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

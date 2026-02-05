export default function InfoSection({ data }) {
    return (
        <section className="th-card th-info-card">
            <h3>{data.title}</h3>
            <p>{data.description}</p>

            <ul className="th-highlight-list">
                {data.highlights.map((item, i) => (
                    <li key={i} className={item.type}>
                        <strong>{item.text}</strong>
                    </li>
                ))}
            </ul>
        </section>
    );
}

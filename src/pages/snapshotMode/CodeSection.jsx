export default function CodeSection({ data }) {
    return (
        <section className="th-card th-vault">
            <h3>{data.title}</h3>
            <pre className="th-formula">
                <code>{data.code}</code>
            </pre>
        </section>
    );
}

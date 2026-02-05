export default function PageTitle({ title, subtitle }) {
    return (
        <div className="th-page-title">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}

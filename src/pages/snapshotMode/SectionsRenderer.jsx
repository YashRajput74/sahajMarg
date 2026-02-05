import InfoSection from "./InfoSection";
import CodeSection from "./CodeSection";
import FlowSection from "./FlowSection";

export default function SectionsRenderer({ sections }) {
    return (
        <div className="th-grid">
            {sections.map((section, index) => {
                switch (section.type) {
                    case "info":
                        return <InfoSection key={index} data={section} />;
                    case "code":
                        return <CodeSection key={index} data={section} />;
                    case "flow":
                        return <FlowSection key={index} data={section} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}

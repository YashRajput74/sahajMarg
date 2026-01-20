export default function LearningScreen({ screen }) {
    switch (screen.type) {
        case "definition":
            return <DefinitionScreen data={screen} />;

        case "metric":
            return <MetricScreen data={screen} />;

        default:
            return null;
    }
}

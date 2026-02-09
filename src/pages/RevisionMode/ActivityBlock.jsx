import MatchActivity from "./MatchActivity";
import ReorderActivity from "./ReorderActivity";
import SelectActivity from "./SelectActivity";
import FillActivity from "./FillActivity";
import CheckboxActivity from "./CheckboxActivity";

const ActivityBlock = ({ activity, isDone, onComplete }) => {
    if (isDone) {
        return (
            <div style={{ marginBottom: 16, opacity: 0.6 }}>
                <h3>{activity.title}</h3>
                <strong>✅ Completed</strong>
            </div>
        );
    }

    switch (activity.type) {
        case "match":
            return <MatchActivity activity={activity} onComplete={onComplete} />;
        case "reorder":
            return <ReorderActivity activity={activity} onComplete={onComplete} />;
        case "select":
            return <SelectActivity activity={activity} onComplete={onComplete} />;
        case "fill":
            return <FillActivity activity={activity} onComplete={onComplete} />;
        case "checkbox":
            return <CheckboxActivity activity={activity} onComplete={onComplete} />;
        default:
            return null;
    }
};

export default ActivityBlock;

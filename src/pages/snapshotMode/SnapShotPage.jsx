import "./SnapShotPage.css";
import SnapShotHeader from "./SnapShotHeader";
import PageTitle from "./PageTitle";
import SectionsRenderer from "./SectionsRenderer";
import { javascriptPromises } from "../../mockData/revisionModeData";

export default function SnapShotPage() {
    return (
        <div className="th-root">
            <SnapShotHeader />

            <main className="th-main">
                <PageTitle
                    title={javascriptPromises.title}
                    subtitle={javascriptPromises.subtitle}
                />

                <SectionsRenderer sections={javascriptPromises.sections} />
            </main>
        </div>
    );
}

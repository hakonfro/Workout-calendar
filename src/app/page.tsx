// app/page.tsx
import { getTrainingData } from "../lib/store";
import MarathonTrainingCalendar from "../components/MarathonTrainingCalendar";

export default function Page() {
    const trainingData = getTrainingData();

    return <MarathonTrainingCalendar initialTrainingData={trainingData} />;
}

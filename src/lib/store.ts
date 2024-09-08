// app/lib/store.ts
import data from "./data.json";
export type TrainingDay = {
    Date: string;
    Day: string;
    Training: string;
    Completed: boolean;
};

let trainingData: TrainingDay[] = data;

export function getTrainingData() {
    return trainingData;
}

export function updateTraining(date: string, newTraining: string) {
    trainingData = trainingData.map((day) => (day.Date === date ? { ...day, Training: newTraining } : day));
}

export function toggleCompletion(date: string) {
    trainingData = trainingData.map((day) => (day.Date === date ? { ...day, Completed: !day.Completed } : day));
}

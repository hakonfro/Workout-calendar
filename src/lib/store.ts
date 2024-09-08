// app/lib/store.ts
export type TrainingDay = {
    Date: string;
    Day: string;
    Training: string;
    Completed: boolean;
};

let trainingData: TrainingDay[] = [
    {
        Date: "2024-09-09",
        Day: "Monday",
        Training: "Run 7-10 km (Base building)",
        Completed: false,
    },
];

export function getTrainingData() {
    return trainingData;
}

export function updateTraining(date: string, newTraining: string) {
    trainingData = trainingData.map((day) => (day.Date === date ? { ...day, Training: newTraining } : day));
}

export function toggleCompletion(date: string) {
    trainingData = trainingData.map((day) => (day.Date === date ? { ...day, Completed: !day.Completed } : day));
}

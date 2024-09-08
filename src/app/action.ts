// app/actions.ts
"use server";

import { updateTraining, toggleCompletion } from "../lib/store";

export async function updateTrainingAction(date: string, newTraining: string) {
    updateTraining(date, newTraining);
}

export async function toggleCompletionAction(date: string) {
    toggleCompletion(date);
}

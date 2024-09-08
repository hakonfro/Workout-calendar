"use client";

import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Check, X } from "lucide-react";
import { updateTrainingAction, toggleCompletionAction } from "../app/action";

type TrainingDay = {
    Date: string;
    Day: string;
    Training: string;
    Completed: boolean;
};

export default function MarathonCalendar({ initialTrainingData }: { initialTrainingData: TrainingDay[] }) {
    const [trainingData, setTrainingData] = useState<TrainingDay[]>(initialTrainingData);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const toggleWorkoutCompletion = async (date: string) => {
        await toggleCompletionAction(date);
        setTrainingData((prevData) =>
            prevData.map((day) => (day.Date === date ? { ...day, Completed: !day.Completed } : day))
        );
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditValue(trainingData[index].Training);
    };

    const saveEdit = async () => {
        if (editingIndex !== null) {
            const date = trainingData[editingIndex].Date;
            await updateTrainingAction(date, editValue);
            setTrainingData((prevData) =>
                prevData.map((day, index) => (index === editingIndex ? { ...day, Training: editValue } : day))
            );
            setEditingIndex(null);
        }
    };

    const cancelEdit = () => {
        setEditingIndex(null);
    };

    return (
        <div className="container mx-auto p-4 bg-white text-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Marathon Training Calendar</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-gray-900">Date</th>
                            <th className="py-2 px-4 border-b text-gray-900">Day</th>
                            <th className="py-2 px-4 border-b text-gray-900">Training</th>
                            <th className="py-2 px-4 border-b text-gray-900">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingData.map((day, index) => (
                            <tr
                                key={index}
                                className={`
                  ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  ${day.Completed ? "bg-green-100 hover:bg-green-200" : "hover:bg-gray-100"}
                  transition-colors duration-150
                `}
                            >
                                <td
                                    className={`py-2 px-4 border-b ${
                                        day.Completed ? "text-green-800" : "text-gray-900"
                                    }`}
                                >
                                    {format(parseISO(day.Date), "yyyy-MM-dd")}
                                </td>
                                <td
                                    className={`py-2 px-4 border-b ${
                                        day.Completed ? "text-green-800" : "text-gray-900"
                                    }`}
                                >
                                    {day.Day}
                                </td>
                                <td
                                    className={`py-2 px-4 border-b ${
                                        day.Completed ? "text-green-800" : "text-gray-900"
                                    }`}
                                >
                                    {editingIndex === index ? (
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-grow text-gray-900"
                                            />
                                            <Button
                                                onClick={saveEdit}
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-900"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                onClick={cancelEdit}
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-900"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span>{day.Training}</span>
                                            <Button
                                                onClick={() => startEditing(index)}
                                                size="sm"
                                                variant="ghost"
                                                className={
                                                    day.Completed
                                                        ? "text-green-700 hover:text-green-800"
                                                        : "text-gray-900 hover:text-gray-700"
                                                }
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    <Checkbox
                                        checked={day.Completed}
                                        onCheckedChange={() => toggleWorkoutCompletion(day.Date)}
                                        aria-label={`Mark ${day.Training} as completed`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

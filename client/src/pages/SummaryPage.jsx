import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exercises } from "../data/exercisesData";
import { loadExerciseData } from "../../../../trening-app/src/utils/trainingStorage";

const SummaryPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const exerciseIds = state?.exerciseIds || [];

    const getExerciseData = () => {
        return exerciseIds.map(id => {
            const exercise = exercises.find(ex => ex.id === id);
            return {
                ...exercise,
                sets: loadExerciseData(id)
            };
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-amber-400">
                Podsumowanie treningu
            </h1>
            
            {getExerciseData().map(exercise => (
                <div key={exercise.id} className="mb-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">{exercise.name}</h2>
                    <ul className="space-y-2">
                        {exercise.sets.map((set, index) => (
                            <li key={index} className="flex justify-between">
                                <span>Seria {index + 1}:</span>
                                <span>{set.weight}kg × {set.reps}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <button
                onClick={() => navigate("/home")}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-bold"
            >
                Zakończ trening
            </button>
        </div>
    );
};

export default SummaryPage;
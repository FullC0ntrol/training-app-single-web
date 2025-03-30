import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Warmup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { trainingPlan } = location.state || {
        trainingPlan: { exercises: [] },
    };
    const startExercises = () => {
        if (trainingPlan.exercises.length > 0) {
            navigate(`/exercise/${trainingPlan.exercises[0]}`, {state: {trainingPlan} }); // Przejdź do pierwszego ćwiczenia
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Rozgrzewka</h1>
            <p className="text-xl mb-6">
                Wykonaj 5-10 minut lekkiego cardio i rozciąganie dynamiczne.
            </p>
            <button
                onClick={startExercises}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all"
            >
                ROZPOCZNIJ TRENING
            </button>
        </div>
    );
};

export default Warmup;

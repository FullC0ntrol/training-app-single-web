import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const WorkoutFooter = ({ currentExercise, totalExercises, progress, trainingPlan }) => {
    const navigate = useNavigate();
    const [showCongratulations, setShowCongratulations] = useState(false);

    const user = JSON.parse(localStorage.getItem("user")); // Pobierz dane użytkownika z localStorage

    // Funkcja zapisująca dane treningowe do bazy danych
    const saveWorkoutDataToDatabase = async () => {
        if (!user || !user.id) {
            console.error("Brak zalogowanego użytkownika w localStorage!");
            return;
        }

        const workoutData = [];

        // Zbierz dane z localStorage dla wszystkich ćwiczeń w trainingPlan
        trainingPlan.exercises.forEach((exerciseId) => {
            const savedData = localStorage.getItem(`exercise_${exerciseId}_sets`);
            if (savedData) {
                const sets = JSON.parse(savedData);
                sets.forEach((set) => {
                    if (set.reps && set.weight !== undefined) { // Sprawdź, czy reps istnieje
                        workoutData.push({
                            user_id: user.id,
                            exercise_id: parseInt(exerciseId),
                            repetitions: parseInt(set.reps),
                            weight: set.weight ? parseFloat(set.weight) : null,
                        });
                    } else {
                        console.warn(`Nieprawidłowe dane serii dla ćwiczenia ${exerciseId}:`, set);
                    }
                });
            } else {
                console.log(`Brak danych w localStorage dla ćwiczenia ${exerciseId}`);
            }
        });

        if (workoutData.length === 0) {
            console.log("Brak danych treningowych do zapisania.");
            return;
        }

        // Debugowanie: wyświetl dane przed wysłaniem
        console.log("Dane do zapisania:", workoutData);

        // Wysyłanie danych do API
        try {
            for (const data of workoutData) {
                console.log(`Wysyłanie danych dla ćwiczenia ${data.exercise_id}:`, data);
                const response = await fetch("http://localhost:5000/api/workout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (!response.ok) {
                    console.error(`Błąd zapisu dla ćwiczenia ${data.exercise_id}:`, result.error);
                } else {
                    console.log(`Zapisano dane dla ćwiczenia ${data.exercise_id}:`, result);
                }
            }
        } catch (err) {
            console.error("Błąd sieci:", err);
        }
    };

    const handlePrevious = () => {
        if (currentExercise > 0) {
            navigate(`/exercise/${trainingPlan.exercises[currentExercise - 1]}`, {
                state: { trainingPlan },
            });
        }
    };

    const handleNext = () => {
        if (currentExercise < totalExercises - 1) {
            navigate(`/exercise/${trainingPlan.exercises[currentExercise + 1]}`, {
                state: { trainingPlan },
            });
        }
    };

    const endTraining = async () => {
        await saveWorkoutDataToDatabase();

        // Czyszczenie danych z localStorage
        trainingPlan.exercises.forEach((exId) => {
            localStorage.removeItem(`exercise_${exId}_sets`);
        });

        setShowCongratulations(true);
        setTimeout(() => {
            setShowCongratulations(false);
            navigate("/summary", {
                state: {
                    trainingPlan,
                    exerciseIds: trainingPlan.exercises,
                },
            });
        }, 2000);
    };

    const returnToHome = () => {
        navigate("/home");
    };

    // Warianty animacji
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <>
            {/* Full-screen congratulations modal */}
            {showCongratulations && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <div className="text-center max-w-md">
                        <motion.h2
                            className="text-5xl font-bold text-amber-400 mb-6"
                            initial={{ y: -20 }}
                            animate={{ y: 0, transition: { yoyo: Infinity, duration: 0.8 } }}
                        >
                            Gratulacje!
                        </motion.h2>
                        <p className="text-xl text-white mb-8">
                            Ukończyłeś cały trening! Jesteś niesamowity!
                        </p>
                        <motion.button
                            onClick={returnToHome}
                            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-lg transition-colors"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                        >
                            Powrót do strony głównej
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Footer */}
            <motion.footer
                className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 shadow-lg border-t border-gray-800"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <motion.button
                        onClick={handlePrevious}
                        disabled={currentExercise === 0}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentExercise === 0
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-amber-600 text-white hover:bg-amber-700"
                        }`}
                        variants={buttonVariants}
                        whileHover={currentExercise !== 0 && "hover"}
                        whileTap={{ scale: currentExercise !== 0 ? 0.95 : 1 }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Poprzednie
                    </motion.button>

                    <div className="flex-1 mx-4">
                        <div className="text-center text-gray-300 mb-1">
                            Ćwiczenie {currentExercise + 1} z {totalExercises}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <motion.div
                                className="bg-amber-400 h-2.5 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <motion.button
                        onClick={currentExercise === totalExercises - 1 ? endTraining : handleNext}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentExercise === totalExercises - 1
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-amber-600 hover:bg-amber-700 text-white"
                        }`}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentExercise === totalExercises - 1 ? "Koniec" : "Następne"}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
            </motion.footer>
        </>
    );
};

export default WorkoutFooter;
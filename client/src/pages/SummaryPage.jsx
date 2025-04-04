import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exercises } from "../data/exercisesData";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SummaryPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const exerciseIds = state?.exerciseIds || [];

    const getExerciseData = () => {
        return exerciseIds.map(id => {
            return exercises.find(ex => ex.id === id);
        }).filter(Boolean); // Filtrujemy undefined jeśli jakieś ćwiczenie nie zostanie znalezione
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white"
        >
            <motion.h1 
                className="text-4xl font-bold mb-8 text-center text-amber-400"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                Podsumowanie treningu
            </motion.h1>
            
            {getExerciseData().map((exercise, index) => (
                <motion.div
                    key={exercise.id}
                    className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-orange-500">{exercise.name}</h2>
                    <ul className="space-y-3">
                        {/* Przykładowe serie - możesz zastąpić prawdziwymi danymi */}
                        {[1, 2, 3].map((set, i) => (
                            <motion.li 
                                key={i}
                                className="flex justify-between bg-gray-700/50 p-3 rounded"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span>Seria {i + 1}:</span>
                                <span className="font-mono">
                                    {/* Przykładowe dane - zastąp rzeczywistymi */}
                                    {Math.floor(Math.random() * 50) + 50}kg × {Math.floor(Math.random() * 5) + 5}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}

            <motion.button
                onClick={() => navigate("/home")}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-lg font-bold mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Zakończ trening
            </motion.button>
        </motion.div>
    );
};

export default SummaryPage;
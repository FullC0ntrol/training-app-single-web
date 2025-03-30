import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { exercises } from "../data/exercisesData";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Timer from "../components/Timer";
import SeriesTracker from "../components/SeriesTracker";
import WorkoutFooter from "../components/WorkoutFooter";

const ExercisePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const { trainingPlan } = location.state || {
        trainingPlan: { exercises: [parseInt(id)] },
    };
    const exercise = exercises.find((ex) => ex.id === parseInt(id)) || exercises[0];
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    const currentExerciseIndex = trainingPlan.exercises.indexOf(exercise.id);
    const totalExercises = trainingPlan.exercises.length;

    const renderSection = (section) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold mb-4 text-orange-500">{section.title}</h2>
            <ol className="list-decimal list-inside space-y-2">
                {section.content.map((item, index) => (
                    <motion.li 
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ol>
        </motion.div>
    );

    const sectionVariants = {
        hover: { scale: 1.03, backgroundColor: "rgba(55, 65, 81, 0.8)" },
        tap: { scale: 0.98 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4"
        >
            {/* Nagłówek ćwiczenia */}
            <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 pt-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {exercise.name}
            </motion.h1>

            {/* Sekcje ćwiczenia */}
            <motion.div 
                className="flex flex-row w-full max-w-lg mb-6 bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {Object.entries(exercise.sections).map(([key, section]) => (
                    <motion.div
                        key={key}
                        className="cursor-pointer flex-1 bg-gray-700 text-gray-200 text-center py-3 hover:bg-gray-600 transition-colors border-r border-gray-600 last:border-r-0"
                        onClick={() => openModal(renderSection(section))}
                        variants={sectionVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {section.title}
                    </motion.div>
                ))}
            </motion.div>

            {/* Wideo */}
            <motion.div
                className="w-full max-w-lg mb-6 rounded-xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <video
                    key={exercise.video}
                    className="w-full"
                    autoPlay
                    controls
                    loop
                    muted
                >
                    <source src={`/assets/${exercise.video}`} type="video/mp4" />
                </video>
            </motion.div>

            {/* Komponenty treningowe */}
            <motion.div 
                className="w-full max-w-lg space-y-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <SeriesTracker />
                <Timer />
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {modalContent && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative border border-gray-700"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <motion.button
                                className="absolute top-4 right-4 text-2xl font-bold text-amber-400 hover:text-amber-300"
                                onClick={closeModal}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ×
                            </motion.button>
                            {modalContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stopka */}
            <motion.div
                className="w-full pb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <WorkoutFooter
                    currentExercise={currentExerciseIndex}
                    totalExercises={totalExercises}
                    progress={
                        (currentExerciseIndex / (totalExercises - 1)) * 100 || 0
                    }
                    trainingPlan={trainingPlan}
                />
            </motion.div>
        </motion.div>
    );
};

export default ExercisePage;
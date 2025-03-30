/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaDumbbell, FaCalendarAlt, FaArrowRight, FaArrowLeft, FaListUl, FaCalendarDay } from "react-icons/fa";
import { motion } from "framer-motion";
import trainingPlan from "../data/trainingPlan";


const Home = () => {
    const location = useLocation();
    const username = location.state || "Sportowiec";
    const navigate = useNavigate();
    let today = new Date().getDay();
    today = 1; // Tymczasowo na środę
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const todayName = days[today];
    const todayTraining = trainingPlan[today];

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Przycisk powrotu */}
            <motion.button
                onClick={() => navigate("/")}
                className="absolute left-8 top-8 text-sky-400 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaArrowLeft className="w-6 h-6" />
            </motion.button>

            {/* Główny kontener */}
            <motion.div
                className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
            >
                {/* Nagłówek */}
                <div className="text-center mb-8">
                    <motion.h1 
                        className="text-4xl font-bold mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Witaj, <span className="text-orange-500">{username}</span>
                    </motion.h1>
                    
                    {/* Sekcja dnia i nawigacji */}
                    <div className="flex flex-col items-center gap-4 mb-6">
                        {/* Aktualny dzień */}
                        <motion.div
                            className="flex items-center text-xl text-gray-300 bg-gray-700/50 px-6 py-3 rounded-full"
                            whileHover={{ scale: 1.03 }}
                        >
                            <FaCalendarAlt className="mr-3 text-sky-400" />
                            <span>{todayName}</span>
                        </motion.div>
                        
                        {/* Przyciski nawigacyjne */}
                        <div className="flex gap-4 w-full justify-center">
                            <motion.button
                                onClick={() => navigate("/training-plans")}
                                className="cursor-pointer flex items-center justify-center gap-2 bg-sky-800/50 hover:bg-sky-700 text-sky-300 px-4 py-2 rounded-lg flex-1 max-w-[160px] transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaListUl />
                                <span>Plany</span>
                            </motion.button>
                            
                            <motion.button
                                onClick={() => navigate("/calendar")}
                                className="cursor-pointer flex items-center justify-center gap-2 bg-orange-800/50 hover:bg-orange-700 text-orange-300 px-4 py-2 rounded-lg flex-1 max-w-[160px] transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaCalendarDay />
                                <span>Kalendarz</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Karta treningu */}
                <motion.div
                    className={`mb-8 p-6 rounded-xl ${
                        todayTraining.name === "Regeneracja" 
                            ? "bg-blue-900/30 border-blue-700" 
                            : "bg-orange-900/30 border-orange-700"
                    } border`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold flex items-center">
                                <span className="text-3xl mr-3">{todayTraining.icon}</span>
                                {todayTraining.name}
                            </h2>
                            <p className="text-gray-300 mt-2">
                                {todayTraining.exercises.length > 0 
                                    ? `${todayTraining.exercises.length} ćwiczeń` 
                                    : "Dzień odpoczynku"}
                            </p>
                        </div>
                        <FaDumbbell className="text-3xl opacity-70" />
                    </div>
                </motion.div>

                {/* Przycisk główny */}
                <motion.button
                    onClick={() => navigate("/warmup", { state: { trainingPlan: todayTraining } })}
                    disabled={todayTraining.name === "Regeneracja"}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center ${
                        todayTraining.name === "Regeneracja"
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                    } transition-all`}
                    whileHover={{ scale: todayTraining.name !== "Regeneracja" ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {todayTraining.name === "Regeneracja" ? "Dziś odpoczywasz" : "Rozpocznij trening"}
                    {todayTraining.name !== "Regeneracja" && <FaArrowRight className="ml-2" />}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Home;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const SeriesTracker = () => {
    const { id } = useParams();
    const [sets, setSets] = useState([]);
    const [formData, setFormData] = useState({
        weight: "",
        reps: "",
    });

    // Ładowanie danych z localStorage i resetowanie przy zmianie ćwiczenia
    useEffect(() => {
        const savedData = localStorage.getItem(`exercise_${id}_sets`);
        if (savedData) {
            setSets(JSON.parse(savedData));
        } else {
            // Resetuj sets, jeśli nie ma danych dla nowego ćwiczenia
            setSets([]);
        }
    }, [id]);

    // Zapisywanie danych do localStorage
    useEffect(() => {
        localStorage.setItem(`exercise_${id}_sets`, JSON.stringify(sets));
    }, [sets, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.weight || !formData.reps) return;

        const newSet = {
            ...formData,
            id: Date.now(),
            weight: parseFloat(formData.weight),
            reps: parseInt(formData.reps),
        };

        setSets([...sets, newSet]);
        setFormData({ weight: "", reps: "" });
    };

    const handleDelete = (idToDelete) => {
        setSets(sets.filter((set) => set.id !== idToDelete));
    };

    const calculateTotalVolume = () => {
        return sets.reduce((total, set) => {
            return total + (set.weight || 0) * (set.reps || 0);
        }, 0);
    };

    // Warianty animacji
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div
            className="max-w-full mb-9 mx-auto bg-gray-800 rounded-xl shadow-lg overflow-visible p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-3xl font-bold text-amber-400 mb-6">Śledzenie serii</h2>

            <div className="bg-gray-700 p-4 rounded-lg mb-6 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-400 text-sm">Liczba serii</p>
                    <p className="text-white text-xl font-bold">{sets.length}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Całkowity tonaż</p>
                    <p className="text-white text-xl font-bold">{calculateTotalVolume()} kg</p>
                </div>
            </div>

            <ul className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                {sets.length === 0 ? (
                    <motion.li
                        className="text-gray-400 text-center py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Brak dodanych serii
                    </motion.li>
                ) : (
                    sets.map((set, index) => (
                        <motion.li
                            key={set.id}
                            className="bg-gray-700 p-4 rounded-lg"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white font-medium">
                                        {set.weight}kg × {set.reps} powtórzeń
                                    </p>
                                </div>
                                <motion.button
                                    onClick={() => handleDelete(set.id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Usuń
                                </motion.button>
                            </div>
                        </motion.li>
                    ))
                )}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="weight" className="block text-gray-300 text-sm mb-1">
                            Ciężar (kg)*
                        </label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="np. 60"
                            min="0"
                            step="0.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reps" className="block text-gray-300 text-sm mb-1">
                            Powtórzenia*
                        </label>
                        <input
                            type="number"
                            name="reps"
                            id="reps"
                            value={formData.reps}
                            onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="np. 8"
                            min="1"
                            required
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Dodaj serię
                </motion.button>
            </form>
        </motion.div>
    );
};

export default SeriesTracker;
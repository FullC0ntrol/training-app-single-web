import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoginPageName = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (name.trim()) {
            localStorage.setItem("userName", name);
            navigate("/password", { state: name });
        } else {
            setError("Proszę wprowadzić imię");
        }
    };

    // Warianty animacji
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, delay: 0.2 },
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.4 },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, delay: 0.6 },
        },
        hover: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } },
    };

    return (
        <main className="flex h-screen w-screen justify-center items-center bg-gray-900 p-4">
            <motion.div
                className="relative w-full max-w-2xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Powitanie */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-gray-200 mb-6"
                    variants={titleVariants}
                >
                    Training <span className="text-orange-400">OD</span>
                    <span className="text-sky-600">I</span>
                    <span className="text-orange-400">DO</span> APP
                </motion.h1>

                {/* Input */}
                <div className="relative z-0">
                    <motion.input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        name="userName"
                        id="userName"
                        className="block w-full pt-6 pb-2 px-6 pr-20 text-3xl md:text-5xl font-semibold bg-gray-850 border-0 border-b-2 border-gray-700 focus:outline-none focus:border-sky-400 text-sky-400 peer transition-all duration-300 rounded-t-lg shadow-sm hover:shadow-md focus:shadow-[0_0_12px_rgba(56,189,248,0.4)] placeholder:text-gray-500/50"
                        placeholder=" "
                        autoComplete="off"
                        required
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        variants={inputVariants}
                    />
                    <motion.label
                        htmlFor="userName"
                        className="absolute font-bold text-2xl md:text-3xl text-sky-400/80 top-4 left-4 origin-[0] peer-focus:text-orange-500 peer-focus:-translate-y-8 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none transition-all duration-300"
                        initial={{ y: 0, scale: 1 }}
                        animate={
                            name
                                ? { y: -15, scale: 0.75, color: "#f97316" } // orange-500
                                : { y: 0, scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                    >
                        Jak masz na imię?
                    </motion.label>

                    {/* Strzałka */}
                    {name && (
                        <motion.button
                            onClick={handleSubmit}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-400 hover:text-orange-500 focus:outline-none"
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            <FaArrowRight className="w-8 h-8" />
                        </motion.button>
                    )}

                    {/* Błąd */}
                    {error && (
                        <motion.p
                            className="absolute left-5 mt-10 -bottom-10 text-red-500 text-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Podpowiedź */}
                    <motion.p
                        className="absolute left-0 -bottom-6 text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Wpisz swoje imię
                    </motion.p>
                </div>
            </motion.div>
        </main>
    );
};

export default LoginPageName;

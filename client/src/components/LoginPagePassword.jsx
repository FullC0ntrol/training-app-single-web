import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoginPageNumber = () => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state || "Gość"; // Domyślna wartość, jeśli state jest undefined

    const handleSubmit = async () => {
        const password = number;
        try {
            const response = await fetch("http://localhost:5000/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home", { state: username });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Coś poszło nie tak", err);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    // Walidacja - tylko cyfry
    const handleNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setNumber(value);
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
            {/* Przycisk powrotu */}
            <motion.button
                onClick={handleBack}
                className="absolute left-12 top-10 text-sky-400 hover:text-orange-500 focus:outline-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
            >
                <FaArrowLeft className="w-6 h-6" />
            </motion.button>

            {/* Główny kontener */}
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
                    Witaj{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text">
                        {username}
                    </span>
                    !
                </motion.h1>

                {/* Input */}
                <div className="relative z-0">
                    <motion.input
                        onChange={handleNumberChange}
                        value={number}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        name="favoriteNumber"
                        id="favoriteNumber"
                        className="block w-full pt-6 pb-2 px-6 pr-20 text-3xl md:text-5xl font-semibold bg-gray-850 border-0 border-b-2 border-gray-700 focus:outline-none focus:border-sky-400 text-sky-400 peer transition-all duration-300 rounded-t-lg shadow-sm hover:shadow-md focus:shadow-[0_0_12px_rgba(56,189,248,0.4)] placeholder:text-gray-500/50"
                        placeholder=" "
                        autoComplete="off"
                        required
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        variants={inputVariants}
                    />
                    <motion.label
                        htmlFor="favoriteNumber"
                        className="absolute font-bold text-2xl md:text-3xl text-sky-400/80 top-4 left-4 origin-[0] peer-focus:text-orange-500 peer-focus:-translate-y-8 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none transition-all duration-300"
                        initial={{ y: -10, scale: 1 }}
                        animate={
                            number
                                ? { y: -20, scale: 0.75, color: "#f97316" } // orange-500
                                : { y: 0, scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                    >
                        Podaj ulubioną liczbę
                    </motion.label>

                    {/* Strzałka */}
                    {number && (
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
                            className="left-5 top-25 -bottom-10 text-red-500 text-lg"
                            initial={{ opacity: 0, y: 30 }}
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
                        Wpisz cyfry (np. 1234)
                    </motion.p>
                </div>
            </motion.div>
        </main>
    );
};

export default LoginPageNumber;

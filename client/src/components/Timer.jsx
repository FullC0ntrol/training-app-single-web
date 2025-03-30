import React, { useState, useEffect } from "react";

const Timer = () => {
  // Tryb pracy (stopwatch/countdown)
  const [mode, setMode] = useState('stopwatch');
  
  // Stoper
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // Minutnik
  const [countdownTime, setCountdownTime] = useState(0);
  const [initialCountdownTime, setInitialCountdownTime] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempMinutes, setTempMinutes] = useState("");

  // Efekty dla stopera
  useEffect(() => {
    let interval;
    if (mode === 'stopwatch' && isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [mode, isStopwatchRunning]);

  // Efekty dla minutnika
  useEffect(() => {
    let interval;
    if (mode === 'countdown' && isCountdownRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (countdownTime <= 0 && isCountdownRunning) {
      setIsCountdownRunning(false);
    }
    return () => clearInterval(interval);
  }, [mode, isCountdownRunning, countdownTime]);

  // Funkcje stopera
  const startStopStopwatch = () => {
    setIsStopwatchRunning(!isStopwatchRunning);
  };

  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
  };

  // Funkcje minutnika
  const startStopCountdown = () => {
    if (countdownTime > 0) {
      setIsCountdownRunning(!isCountdownRunning);
    }
  };

  const resetCountdown = () => {
    setIsCountdownRunning(false);
    setCountdownTime(initialCountdownTime);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleSettingsSave = () => {
    const minutes = parseInt(tempMinutes) || 0;
    const newTime = minutes * 60 * 1000;
    setCountdownTime(newTime);
    setInitialCountdownTime(newTime);
    setShowSettings(false);
    setTempMinutes("");
    setIsCountdownRunning(false);
  };

  const switchMode = (newMode) => {
    // Zatrzymaj aktualny timer przed zmianą trybu
    if (mode === 'stopwatch') {
      setIsStopwatchRunning(false);
    } else {
      setIsCountdownRunning(false);
    }
    setMode(newMode);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 mx-auto">
      {/* Przełącznik trybów */}
      <div className="flex mb-4 bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => switchMode('stopwatch')}
          className={`flex-1 py-1 rounded-md ${
            mode === 'stopwatch' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-600'
          } transition-colors`}
        >
          Stoper
        </button>
        <button
          onClick={() => switchMode('countdown')}
          className={`flex-1 py-1 rounded-md ${
            mode === 'countdown' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-600'
          } transition-colors`}
        >
          Minutnik
        </button>
      </div>

      {/* Wyświetlanie aktualnego timera */}
      {mode === 'stopwatch' ? (
        <div>
          <div className="text-4xl font-mono text-amber-400 mb-4 text-center">
            {formatTime(stopwatchTime)}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={startStopStopwatch}
              className={`px-4 py-2 rounded ${
                isStopwatchRunning
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-bold transition-colors`}
            >
              {isStopwatchRunning ? "Stop" : "Start"}
            </button>
            <button
              onClick={resetStopwatch}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="text-4xl font-mono text-amber-400 mb-4 text-center">
            {formatTime(countdownTime)}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={startStopCountdown}
              className={`px-4 py-2 rounded ${
                isCountdownRunning
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-bold transition-colors ${
                countdownTime === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={countdownTime === 0}
            >
              {isCountdownRunning ? "Stop" : "Start"}
            </button>
            <button
              onClick={resetCountdown}
              className={`px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors ${
                countdownTime === initialCountdownTime ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={countdownTime === initialCountdownTime}
            >
              Reset
            </button>
          </div>

          {/* Ikona ustawień */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-0 right-0 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Ustawienia minutnika */}
          {showSettings && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-lg p-4 flex flex-col justify-center items-center">
              <label className="text-gray-300 mb-2">Ustaw minuty:</label>
              <input
                type="number"
                value={tempMinutes}
                onChange={(e) => setTempMinutes(e.target.value)}
                className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-amber-400"
                min="0"
                placeholder="5"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSettingsSave}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  Zapisz
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
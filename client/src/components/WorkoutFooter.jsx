import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clearExerciseData } from "../../../../trening-app/src/utils/trainingStorage";

const WorkoutFooter = ({ currentExercise, totalExercises, progress, trainingPlan }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showCongratulations, setShowCongratulations] = useState(false);

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

    const endTraining = () => {
        navigate("/summary", {
          state: {
            trainingPlan,
            exerciseIds: trainingPlan.exercises
          }
        });
      };

    const returnToHome = () => {
        // Czyścimy dane wszystkich ćwiczeń z tego treningu
        trainingPlan.exercises.forEach(exId => {
            clearExerciseData(exId);
        });
        navigate("summary");
    };

  return (
    <>
      {/* Full-screen congratulations modal */}
      {showCongratulations && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-5xl font-bold text-amber-400 mb-6 animate-bounce">
              Gratulacje!
            </h2>
            <p className="text-xl text-white mb-8">
              Ukończyłeś cały trening! Jesteś niesamowity!
            </p>
            <button
              onClick={returnToHome}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Powrót do strony głównej
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 shadow-lg border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentExercise === 0}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentExercise === 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Poprzednie
          </button>
          
          <div className="flex-1 mx-4">
            <div className="text-center text-gray-300 mb-1">
              Ćwiczenie {currentExercise + 1} z {totalExercises}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-amber-400 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={currentExercise === totalExercises - 1 ? endTraining : handleNext}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentExercise === totalExercises - 1
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {currentExercise === totalExercises - 1 ? "Koniec" : "Następne"}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
};

export default WorkoutFooter;
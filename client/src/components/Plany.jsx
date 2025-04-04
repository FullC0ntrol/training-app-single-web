import React from "react";
import { exercises } from "../data/exercisesData";

const Plany = () => {
    const names = exercises.map(exercises => exercises.name);
    console.log(names);
    return (
        <div className="bg-gray-900 h-screen w-screen flex items-center justify-center">
            <h2 className="text-white"> JOOO</h2>
        </div>
    );
};

export default Plany;

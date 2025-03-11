import React from "react";
import Logo from "../assets/itic.svg";

export default function Achievement() {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg">
      <h3 id="Translatable" className="text-green-500 font-semibold text-3xl mb-4">
        Recognized by the best
      </h3>
      <img src={Logo} alt="logo" className="w-2/4 pt-10 pb-10 mb-4" />
      <p id="Translatable" className="text-gray-900 text-lg mb-2">
        Recognized as Top 10 startups across India
      </p>
      <p id="Translatable" className="text-gray-600 text-base">The MeitY Grand Challenge 2024</p>
    </div>
  );
}
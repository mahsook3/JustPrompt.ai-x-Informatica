import React, { useState } from "react";
import CredentialsForm from "./CredentialsForm";
import ModelCreate from "./ModelCreate";
import Verify from "./Verify";

export default function APICreator() {
  const [steps, setSteps] = useState({
    stepsItems: ["Credentials", "Model", "Verify"],
    currentStep: 1
  });

  const handleStepClick = (stepIndex) => {
    setSteps((prev) => ({
      ...prev,
      currentStep: stepIndex + 1
    }));
  };

  return (
    <div className="w-full px-4 md:px-0 mt-10">
      <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
        {steps.stepsItems.map((item, idx) => (
          <li
            key={idx}
            aria-current={steps.currentStep === idx + 1 ? "step" : false}
            className="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0 cursor-pointer"
            onClick={() => handleStepClick(idx)}
          >
            <div className="flex flex-col items-center md:flex-row md:flex-1">
              <hr className={`w-full border hidden md:block ${idx === 0 ? "border-none" : "" || steps.currentStep >= idx + 1 ? "border-green-400" : ""}`} />
              <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-green-400 border-green-400" : "" || steps.currentStep === idx + 1 ? "border-green-400" : ""}`}>
                <span className={`w-2.5 h-2.5 rounded-full bg-green-400 ${steps.currentStep !== idx + 1 ? "hidden" : ""}`}></span>
                {steps.currentStep > idx + 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <hr className={`h-12 border md:w-full md:h-auto ${idx + 1 === steps.stepsItems.length ? "border-none" : "" || steps.currentStep > idx + 1 ? "border-green-400" : ""}`} />
            </div>
            <div className="h-8 flex justify-center items-center md:mt-3 md:h-auto">
              <h3 className={`text-sm ${steps.currentStep === idx + 1 ? "text-green-400" : ""}`}>
                {item}
              </h3>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col min-h-screen justify-between h-screen">
        <div className="flex-grow overflow-y-auto">
          {steps.currentStep === 1 && <CredentialsForm />}
          {steps.currentStep === 2 && <ModelCreate />}
          {steps.currentStep === 3 && <Verify />}
        </div>
      </div>
    </div>
  );
}
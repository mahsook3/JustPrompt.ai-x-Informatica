import React, { useContext } from "react";
import { ResponseContext } from "../sdlc/ResponseContext";

export default function Documentations() {
  const { response } = useContext(ResponseContext);

  if (!response || !response.plan) {
    return <div className="text-center text-gray-500">Please Start Building</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Documentations</h1>
      {response.plan.steps.map((step, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
          <strong className="text-xl">{step.step}:</strong>
          {Array.isArray(step.details) ? (
            <ul className="list-disc list-inside ml-4 mt-2">
              {step.details.map((file, fileIndex) => (
                <li key={fileIndex} className="ml-4">
                  <strong className="font-medium">{file.fileName}:</strong> {file.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">{step.details}</p>
          )}
        </div>
      ))}
    </div>
  );
}
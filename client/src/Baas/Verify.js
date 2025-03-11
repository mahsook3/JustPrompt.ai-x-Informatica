import React, { useState } from "react";
import axios from "axios";

const Verify = ({ connectionId, models }) => {
  const [selectedModel, setSelectedModel] = useState(
    models ? Object.keys(models)[0] : null
  );
  const [helperAPIresponse, setHelperAPIresponse] = useState({
    endpoints: [],
  });
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handlePublish = async () => {
    try {
      const schemaArray = models[selectedModel].schema;
      const transformedSchema = schemaArray.reduce((acc, item) => {
        acc[item.name] = item.type;
        return acc;
      }, {});

      const paramsResponse = await axios.post("https://justprompt-baas.onrender.com/api/params", {
        schema: transformedSchema,
      });

      const paramsID = paramsResponse.data._id;

      const helperResponse = await axios.post("https://justprompt-baas.onrender.com/api/helper", {
        modelName: selectedModel,
        connectID: connectionId,
        paramsID: paramsID,
        methods: ["get", "post", "put"],
      });

      setHelperAPIresponse(helperResponse.data);
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  const handleCopy = (endpoint, index) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  return (
<div className="flex h-screen m-10">
  <div className="flex flex-col items-center w-40 h-full  text-gray-700 rounded-md">
    <h2 className="text-2xl font-bold mb-4 mt-4">Models</h2>
    <ul className="w-full">
      {models && Object.keys(models).length > 0 ? (
        Object.keys(models).map((modelName) => (
          <li
            key={modelName}
            className={`flex items-center w-full h-12 px-3 mt-2 rounded-md cursor-pointer transition-colors ${
              selectedModel === modelName ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedModel(modelName)}
            role="button"
            aria-label={`Select model ${modelName}`}
          >
            <span className="ml-2 text-sm font-medium">{modelName}</span>
          </li>
        ))
      ) : (
        <p className="text-gray-500 px-3 mt-4">No models available.</p>
      )}
    </ul>
  </div>

  <div className="flex-grow p-6 overflow-auto">
    <h2 className="text-3xl font-bold mb-6">Verify Models</h2>
    <p className="mb-4">
      <strong>Connection ID:</strong> {connectionId}
    </p>

    {selectedModel && models[selectedModel] ? (
      <div className="mb-6">
        <div className="flex justify-between items-center bg-green-600 p-4 rounded-t-md">
          <span className="font-bold text-white">{selectedModel}</span>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
            onClick={handlePublish}
            aria-label="Publish model"
          >
            Publish
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row mt-4 gap-4">
          <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-md">
            <p className="mb-2">
              <strong>Methods:</strong>{" "}
              {Object.keys(models[selectedModel].methods).join(", ")}
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(models[selectedModel].schema, null, 2)}
            </pre>
          </div>

          <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-md">
            <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
            {helperAPIresponse.endpoints.map((endpoint, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center bg-gray-200 p-3 rounded-t-md">
                  <p className="font-bold text-gray-700">{endpoint.method}</p>
                  <p className="text-sm text-gray-600 overflow-hidden text-ellipsis">
                    {endpoint.endpoint}
                  </p>
                  <button
                    className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition-colors ${
                      copiedIndex === idx ? "bg-green-500 text-white" : ""
                    }`}
                    onClick={() => handleCopy(endpoint.endpoint, idx)}
                    aria-label="Copy API endpoint"
                  >
                    {copiedIndex === idx ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-3 bg-white rounded-b-md">
                  <p className="text-sm">
                    <strong>Description:</strong> {endpoint.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <p className="text-gray-500">Please select a model to view its details.</p>
    )}
  </div>
</div>

  );
};

export default Verify;
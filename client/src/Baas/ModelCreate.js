import React, { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { MdDragIndicator } from "react-icons/md";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Verify from "./Verify";

const initialModels = {
  AttendanceTracker: {
    modelName: "AttendanceTracker",
    schema: [
      { name: "employeeId", type: "String" },
      { name: "name", type: "String" },
      { name: "attendanceStatus", type: "String" },
      { name: "date", type: "Date" },
      { name: "markedAt", type: "Date" }
    ],
    methods: { POST: true, GET: true, PUT: true, DELETE: true }
  }
};

const dataTypes = ["String", "Number", "Boolean", "Object", "Date", "Mixed"];
const httpMethods = ["POST", "GET", "PUT", "PATCH", "DELETE", "GET SINGLE"];

const formatSchema = (schema) => {
  return schema.reduce((acc, item) => {
    acc[item.name] = item.type;
    return acc;
  }, {});
};

const DraggableItem = ({ item, index, moveItem, handleModelInputChange, handleDelete }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`mb-6 ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{ cursor: "move" }}
    >
      <div className="relative mt-3 max-w-xs text-gray-600">
        <span className="h-5 text-gray-400 absolute left-3 inset-y-0 my-auto hover:text-black">
          <MdDragIndicator className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Variable Name"
          value={item.name}
          onChange={(e) => handleModelInputChange(index, "name", e.target.value)}
          className="w-full pl-10 pr-20 py-2 appearance-none bg-white outline-none border border-gray-300 focus:border-green-400 shadow-sm rounded-lg transition duration-200"
          aria-label="Variable Name"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <select
            className="text-sm bg-white outline-none px-2 py-1 h-full border border-gray-300 focus:border-green-400 transition duration-200"
            value={item.type}
            onChange={(e) => handleModelInputChange(index, "type", e.target.value)}
            aria-label="Variable Type"
          >
            {dataTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleDelete(index)}
            className="ml-3 text-gray-500 hover:text-red-500 transition duration-200"
            aria-label="Delete Variable"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ModelCreate({ connectionId }) {
  console.log("Here is" + connectionId);
  const [models, setModels] = useState(initialModels);
  const [selectedModelIndex, setSelectedModelIndex] = useState("AttendanceTracker");
  const [jsonRepresentation, setJsonRepresentation] = useState(
    JSON.stringify(formatSchema(initialModels.AttendanceTracker.schema), null, 2)
  );
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const inputBoxRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreateClick = async () => {
    setIsCreating(true);
    try {
      const response = await fetch("http://localhost:5000/generateModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ requirement: inputValue })
      });
      const data = await response.json();
      if (data && data.ModelStructure) {
        setModels(data);
        setSelectedModelIndex(Object.keys(data.ModelStructure)[0]);
        setJsonRepresentation(
          JSON.stringify(formatSchema(data.ModelStructure[Object.keys(data.ModelStructure)[0]].schema), null, 2)
        );
      }
    } catch (error) {
      console.error("Error generating model:", error);
    } finally {
      setIsCreating(false);
      setShowInputBox(false);
    }
  };

  const handleModelInputChange = (index, key, value) => {
    const updatedModels = { ...models };
    const model = updatedModels[selectedModelIndex];
    if (key === "name" && index === null) {
      model.modelName = value;  // Ensure modelName is updated properly
    } else {
      model.schema[index][key] = value;
    }
    setModels(updatedModels);
  };

  const handleDelete = (index) => {
    const updatedModels = { ...models };
    const model = updatedModels[selectedModelIndex];
    model.schema.splice(index, 1);
    setModels(updatedModels);
    setJsonRepresentation(
      JSON.stringify(formatSchema(model.schema), null, 2)
    );
  };

  const handleAdd = () => {
    const newSchemaItem = { name: "", type: "String" };
    const updatedModels = { ...models };
    const model = updatedModels[selectedModelIndex];
    model.schema.push(newSchemaItem);
    setModels(updatedModels);
    setJsonRepresentation(
      JSON.stringify(formatSchema(model.schema), null, 2)
    );
  };

  const handleAddModel = () => {
    const newModelName = `Model ${Object.keys(models).length + 1}`;
    const newModel = {
      modelName: newModelName,
      schema: [
        { name: "Variable1", type: "Number" },
        { name: "Variable2", type: "String" }
      ],
      methods: { POST: true, GET: true, PUT: true, DELETE: true }
    };
    const updatedModels = { ...models };
    updatedModels[newModelName] = newModel;
    setModels(updatedModels);
  };

  const handleDeleteModel = (modelName) => {
    const updatedModels = { ...models };
    delete updatedModels[modelName];
    setModels(updatedModels);
    const modelNames = Object.keys(updatedModels);
    if (modelNames.length > 0) {
      setSelectedModelIndex(modelNames[0]);
    } else {
      setSelectedModelIndex(null);
    }
  };

  const handleJsonChange = (e) => {
    const newJson = e.target.value;
    setJsonRepresentation(newJson);
    try {
      const newSchema = JSON.parse(newJson);
      const updatedModels = { ...models };
      const model = updatedModels[selectedModelIndex];
      model.schema = Object.keys(newSchema).map((key) => ({
        name: key,
        type: newSchema[key],
      }));
      setModels(updatedModels);
    } catch (error) {
      console.error("Invalid JSON");
    }
  };

  const handleMethodChange = (method) => {
    const updatedModels = { ...models };
    const model = updatedModels[selectedModelIndex];
    model.methods[method] = !model.methods[method];
    setModels(updatedModels);
  };

  const handleClickOutside = (event) => {
    if (inputBoxRef.current && !inputBoxRef.current.contains(event.target)) {
      setShowInputBox(false);
    }
  };

  useEffect(() => {
    if (showInputBox) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInputBox]);

  useEffect(() => {
    if (selectedModelIndex) {
      setJsonRepresentation(
        JSON.stringify(formatSchema(models[selectedModelIndex].schema), null, 2)
      );
    } else {
      setJsonRepresentation("{}");
    }
  }, [models, selectedModelIndex]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedModels = { ...models };
    const model = updatedModels[selectedModelIndex];
    const [movedItem] = model.schema.splice(fromIndex, 1);
    model.schema.splice(toIndex, 0, movedItem);
    setModels(updatedModels);
    setJsonRepresentation(
      JSON.stringify(formatSchema(model.schema), null, 2)
    );
  };

  const handleSave = () => {
    setShowVerify(true);
  };

  if (showVerify) {
    return <Verify connectionId={connectionId} models={models} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row p-4 md:p-8">
        <div className="w-full md:w-2/3 p-4 relative">
          <h2 className="text-2xl font-bold mb-4">Model Create</h2>
          <button
            onClick={() => setShowInputBox(!showInputBox)}
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-black"
          >
            <BsStars className="w-6 h-6" />
          </button>
          {showInputBox && (
            <div
              ref={inputBoxRef}
              className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
              style={{
                zIndex: 10,
                position: "absolute",
                top: "50px", // Adjusted to place below the button
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
              }}
            >
              <input
                type="text"
                placeholder="Ask AI to create model"
                className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                name="topic"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
                onClick={handleCreateClick}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"} <BsStars />
              </button>
            </div>
          )}
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.keys(models).map((modelName) => (
              <div key={modelName} className="relative group">
                <button
                  onClick={() => setSelectedModelIndex(modelName)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedModelIndex === modelName
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {modelName}
                </button>
                <button
                  onClick={() => handleDeleteModel(modelName)}
                  className="absolute top-0 right-0 px-2 py-1  text-gray-500 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddModel}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
            >
              Add Model
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
          {selectedModelIndex && models[selectedModelIndex] && (
            <>
              <div className="mb-6">
                <label className="text-gray-700 font-semibold">Model Name</label>
                <input
                  type="text"
                  placeholder="Model Name"
                  value={selectedModelIndex}
                  onChange={(e) =>
                    handleModelInputChange(null, "name", e.target.value)
                  }
                  className="w-full mt-2 p-2 appearance-none bg-white outline-none border border-gray-300 focus:border-green-400 shadow-sm rounded-lg transition duration-200"
                  aria-label="Model Name"
                />
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">HTTP Methods</h3>
                {httpMethods.map((method) => (
                  <label key={method} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={models[selectedModelIndex]?.methods[method] || false}
                      onChange={() => handleMethodChange(method)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{method}</span>
                  </label>
                ))}
              </div>
              {models[selectedModelIndex].schema.map((item, index) => (
                <DraggableItem
                  key={index}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  handleModelInputChange={handleModelInputChange}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
          <button
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="flex items-center justify-between bg-green-400 p-2 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">JSON Representation</h2>
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-white rounded-full border border-gray-300"></span>
              <span className="w-3 h-3 bg-white rounded-full border border-gray-300"></span>
              <span className="w-3 h-3 bg-white rounded-full border border-gray-300"></span>
            </div>
          </div>
          <textarea
            className="w-full h-64 p-4 bg-gray-800 text-white rounded-b-lg outline-none"
            value={jsonRepresentation}
            onChange={handleJsonChange}
          />
        </div>
      </div>
      {showVerify && <Verify connectionId={connectionId} models={models} />}
    </DndProvider>
  );
}
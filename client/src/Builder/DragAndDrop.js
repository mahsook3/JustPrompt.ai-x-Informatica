//DragAndDrop.js
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const DragAndDrop = ({ droppedComponents = [], setDroppedComponents }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (item, monitor) => {
    const itemData = monitor.getItem();
    if (itemData && itemData.component) {
      try {
        const component = JSON.parse(itemData.component);
        if (component && component.title) {
          setDroppedComponents((prevComponents) => [
            ...prevComponents,
            component,
          ]);
        }
      } catch (error) {
        console.error("Error parsing component data:", error);
      }
    }
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDelete = (index) => {
    setDroppedComponents((prevComponents) =>
      prevComponents.filter((_, i) => i !== index)
    );
  };

  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-4 bg-white shadow rounded-lg mb-4 ${
        isDragOver
          ? "border-2 border-green-500 border-dashed"
          : "border-2 border-gray-300 border-dashed"
      } min-h-[200px]`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-2xl font-bold mb-4">Drag and Drop</h2>
      {droppedComponents.map((component, index) => (
        <DraggableComponent
          key={index}
          index={index}
          component={component}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const DraggableComponent = ({ component, index, handleDelete }) => {
  const [, drag] = useDrag({
    type: "COMPONENT",
    item: { index },
  });

  if (!component || !component.title) {
    return null;
  }

  return (
    <div
      ref={drag}
      className="p-2 mb-2 bg-gray-50 border rounded-lg flex justify-between items-center h-full"
    >
      <span>{component.title}</span>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded"
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
    </div>
  );
};

export default DragAndDrop;
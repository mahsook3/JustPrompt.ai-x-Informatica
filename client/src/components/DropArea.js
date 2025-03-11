import React from "react";
import { useDrop } from "react-dnd";

function DropArea({ droppedItems, onDrop, onElementClick, onDeleteElement }) {
  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item),
  }));

  return (
    <div
      ref={drop}
      className="w-1/5 h-full bg-white shadow-md rounded-lg p-4 overflow-y-auto border-dashed"
    >
      <h2 className="text-xl font-semibold mb-4">Drop Area</h2>
      <ul>
        {droppedItems.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-md"
          >
            <span
              className="text-gray-700 cursor-pointer"
              onClick={() => onElementClick(item)}
            >
              {item.templateName}
            </span>
            <div>
              <button
                className="text-yellow-500 hover:text-yellow-700 mr-2"
                onClick={() => onElementClick(item)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteElement(item)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropArea;

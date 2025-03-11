import React from "react";
import { useDrag } from "react-dnd";

function Item({ item }) {
  const [, drag] = useDrag(() => ({
    type: "ITEM",
    item,
  }));

  return (
    <li ref={drag} className="mb-4 flex flex-col items-center">
      <img
        src={item.thumbnailurl}
        alt={item.templateName}
        className="w-20 h-20 object-cover mb-2 rounded"
      />
      <button className="text-blue-500 hover:underline">
        {item.templateName}
      </button>
    </li>
  );
}

function Items({ items }) {
  return (
    <div className="w-1/5 h-full bg-white shadow-md rounded-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Items</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.templateName} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default Items;

import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import componentsData from "../components.json";

const ComponentResult = ({ query, setDroppedComponents }) => {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchComponents = () => {
      try {
        const filteredComponents = componentsData.filter((component) => {
          const titleMatch = component.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const tagMatch = component.tags.some((tag) =>
            tag.name.toLowerCase().includes(query.toLowerCase())
          );
          return titleMatch || tagMatch;
        });
        setComponents(filteredComponents);
      } catch (error) {
        setError(error);
        console.error("Error fetching components:", error);
      }
    };

    if (query) {
      fetchComponents();
    }
  }, [query]);

  if (error) {
    return <div>Error fetching components: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Component Results</h2>
      <div className="space-y-4">
        {components.map((component) => (
          <DraggableComponentCard
            key={component.uuid} 
            component={component}
            setDroppedComponents={setDroppedComponents}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableComponentCard = ({ component, setDroppedComponents }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { component: JSON.stringify(component) },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white shadow rounded-lg flex items-center space-x-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img
        src={component.thumbnails?.images?.light} // Safely access nested properties
        alt={component.title}
        className="w-full rounded"
      />
    </div>
  );
};

export default ComponentResult;

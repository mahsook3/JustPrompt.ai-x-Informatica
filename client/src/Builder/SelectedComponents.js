import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

const SelectedComponents = ({ components, onComponentClick }) => {
  const [selectedTab, setSelectedTab] = useState(components[0]);

  return (
    <Tabs.Root
      className="max-w-screen-xl "
      value={selectedTab}
      onValueChange={(val) => setSelectedTab(val)}
      orientation="vertical"
    >
      <Tabs.List
        className="hidden border-l flex-col justify-start items-start gap-y-3 text-sm sm:flex"
        aria-label="Selected Components"
      >
        {components.map((component, idx) => (
          <Tabs.Trigger
            key={idx}
            className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-green-600 data-[state=active]:text-green-600"
            value={component}
            onClick={() => onComponentClick(component)}
          >
            <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-green-600 group-hover:bg-gray-100 font-medium">
              {component}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="relative text-gray-500 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <select
          value={selectedTab}
          className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-green-600 text-sm"
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {components.map((component, idx) => (
            <option key={idx} idx={idx}>
              {component}
            </option>
          ))}
        </select>
      </div>
    </Tabs.Root>
  );
};

export default SelectedComponents;

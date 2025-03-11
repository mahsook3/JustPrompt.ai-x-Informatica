import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import * as Icons from '@heroicons/react/24/outline';

export default function IconsComponent({ iconProps, onIconChange, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [color, setColor] = useState(iconProps.color);
  const [width, setWidth] = useState(iconProps.width);
  const [height, setHeight] = useState(iconProps.height);

  const filteredIcons = Object.keys(Icons).filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = (iconName) => {
    const newIcon = `<${iconName} className="w-${width} h-${height} text-${color}" />`;
    onIconChange(newIcon);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search icons..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute left-2 top-2 w-6 h-6 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {filteredIcons.map((iconName) => {
          const IconComponent = Icons[iconName];
          return (
            <div key={iconName} className="flex flex-col items-center">
              <IconComponent className="w-8 h-8 text-gray-700" onClick={() => handleIconClick(iconName)} />
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Width</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Close
      </button>
    </div>
  );
}
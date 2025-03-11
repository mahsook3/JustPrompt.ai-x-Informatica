import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import * as Icons from '@heroicons/react/24/outline';

export default function Test() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = Object.keys(Icons).filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = (iconName) => {
    const codeSnippet = `<${iconName} className="w-8 h-8 text-gray-700" />`;
    alert(`Use the following code to include the icon in your JSX file:\n\n${codeSnippet}`);
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
    </div>
  );
}
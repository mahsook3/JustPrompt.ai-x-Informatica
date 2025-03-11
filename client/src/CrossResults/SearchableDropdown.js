import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({ options, placeholder, name, id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.name && option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.name);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        name={name}
        id={id}
        value={searchTerm}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-[#e0e0e0] rounded-md mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={`${option.id || ''}-${index}`}
              onClick={() => handleSelect(option)}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
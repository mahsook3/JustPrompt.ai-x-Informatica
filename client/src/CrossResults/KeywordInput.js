import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import { MdAutoAwesome } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const KeywordInput = ({ 
  keywords, 
  setKeywords, 
  businessDetails, 
  products,
  isGeneratingKeywords,
  setIsGeneratingKeywords 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.includes(',')) {
      const newKeywords = value.split(',').map((keyword) => keyword.trim()).filter((keyword) => keyword);
      setKeywords([...keywords, ...newKeywords]);
      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
      event.preventDefault();
    }
  };


  const handleGenerateKeywords = async () => {
    if (!businessDetails || !products) {
      toast.error("Please enter both business details and products.");
      return;
    }

    setIsGeneratingKeywords(true);
    try {
      const response = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/generate-keywords', {
        paragraph: `${businessDetails} ${products}`
      });
      setKeywords(response.data);
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast.error("Failed to generate keywords");
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  return (
    <div className="keyword-input-container w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md relative">
      {keywords.map((keyword, index) => (
        <div key={index} className="keyword-box inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {keyword}
          <span className="remove-keyword ml-2 cursor-pointer" onClick={() => handleRemoveKeyword(index)}>x</span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="inline-block border-none outline-none focus:outline-none"
        placeholder="Enter keywords"
        disabled={isGeneratingKeywords}
      />
      {isGeneratingKeywords ? (
        <div className="absolute right-3 bottom-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"/>
      ) : (
        <MdAutoAwesome
          className="absolute right-3 bottom-3 text-[#6B7280] cursor-pointer"
          onClick={handleGenerateKeywords}
        />
      )}
      
    </div>
  );
};

export default KeywordInput;
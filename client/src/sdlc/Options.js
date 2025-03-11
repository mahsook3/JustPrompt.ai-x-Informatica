import React, { useState } from 'react';
import UploadFile from './UploadFile';
import ChatbotInterface from '../Chatbot/ChatbotInterface';

export default function Options() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleBack = () => {
    setSelectedOption(null);
  };

  if (selectedOption === 'docToCode') {
    return <UploadFile onBack={handleBack} />;
  }

  if (selectedOption === 'chatbot') {
    return <ChatbotInterface onBack={handleBack} />;
  }

  return (
<div className="space-y-8 p-6 md:p-10 mt-12">
  <div className="flex flex-col space-y-8">
    <button
      onClick={() => setSelectedOption('docToCode')}
      className="w-full flex flex-col p-6 space-y-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-8 text-left"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner lg:h-20 lg:w-20">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      </div>
      <div className="flex-1">
        <h5 className="mb-3 text-xl font-bold lg:text-2xl">Doc to Code</h5>
        <p className="mb-6 text-lg text-gray-600">
          Convert business requirement documents or project reports into code.
        </p>
        <span className="flex items-baseline text-lg font-bold text-green-400">
          Get Started
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </div>
    </button>
    <button
      onClick={() => setSelectedOption('chatbot')}
      className="w-full flex flex-col p-6 space-y-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-8 text-left"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner lg:h-20 lg:w-20">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
      </div>
      <div className="flex-1">
        <h5 className="mb-3 text-xl font-bold lg:text-2xl">AI-powered Chatbot</h5>
        <p className="mb-6 text-lg text-gray-600">
          Use our AI-powered chatbot to get instant answers and assistance.
        </p>
        <span className="flex items-baseline text-lg font-bold text-green-400">
          Chat Now
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </div>
    </button>
  </div>
</div>
  );
}
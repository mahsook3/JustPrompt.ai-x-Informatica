import React, { useState } from 'react';
import CodeDisplay from './CodeDisplay';
import Documentations from './Documentations';
import Instructions from './Instructions';
import Plan from './Plan';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  console.log('Tabs component is rendered');
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Plan />;
      case 'tab2':
        return <Instructions />;
      case 'tab3':
        return <CodeDisplay />;
      case 'tab4':
        return <Documentations />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
    <div className="bg-green-400 p-2 rounded-t-lg m-5">
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-2 text-white font-semibold border-b-4 ${activeTab === 'tab1' ? 'border-green-500 bg-green-500 rounded-lg' : 'border-transparent'} hover:bg-green-500 rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('tab1')}
        >
          Plan
        </button>
        <button
          className={`px-4 py-2 text-white font-semibold border-b-4 ${activeTab === 'tab2' ? 'border-green-500 bg-green-500 rounded-lg' : 'border-transparent'} hover:bg-green-500 rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('tab2')}
        >
          Instructions
        </button>
        <button
          className={`px-4 py-2 text-white font-semibold border-b-4 ${activeTab === 'tab3' ? 'border-green-500 bg-green-500 rounded-lg' : 'border-transparent'} hover:bg-green-500 rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('tab3')}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 text-white font-semibold border-b-4 ${activeTab === 'tab4' ? 'border-green-500 bg-green-500 rounded-lg' : 'border-transparent'} hover:bg-green-500 rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('tab4')}
        >
          Documentations
        </button>
      </div>
    </div>
    <div className="p-4 w-full">
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  </div>
  );
}
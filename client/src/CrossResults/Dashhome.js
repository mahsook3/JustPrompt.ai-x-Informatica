import React from "react";
import { ArrowRight } from 'lucide-react';

const Dashhome = ({ setActiveTab }) => {
  const items = [
    { id: 'product', label: 'Product Category', description: 'Details about product categories and compliance requirements for export.' },
    { id: 'hsn', label: 'HSN, GST, RoDTEP', description: 'Information on HSN, GST and RoDTEP details for your products.' },
    { id: 'market', label: 'Market Analysis', description: 'Market analysis for your products in the destination country.' },
    { id: 'duty', label: 'Duty Drawback', description: 'Information on duty drawbacks for your exports.' },
    { id: 'documents', label: 'Required Documents', description: 'List of documents required for exporting your products.' },
  ];

  return (
    <div className="p-8 w-full mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Explore your product internationally</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => setActiveTab(item.id)}
          >
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.label}</h3>
            <p className="text-gray-600 mb-6">{item.description}</p>
            <button
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
            >
              Explore now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashhome;
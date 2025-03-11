import React, { useState } from 'react';
import docs from '../assets/docs.png';
import BillofLading from './DBillofLading';
import DInvoice from './DInvoice';
import DShippingBill from './DShippingBill';

export default function DocumentationGenerator({
  exportingCountry,
  destinationCountry,
  businessDetails,
  products,
  selectedState,
  selectedDistrict,
  keywords
}) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleGenerateClick = (documentType) => {
    setIsGenerated(true);
    setSelectedDocument(documentType);
  };

  return (
    <div className="container mx-auto px-4 py-8" >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Bill of Lading</h2>
            <p className="text-gray-600 text-base mb-5">
              Click the button below to generate and download your document.
            </p>
          </div>
          <div className="p-6 bg-gray-50">
            <button 
              onClick={() => handleGenerateClick('BillofLading')} 
              className="w-full py-3 px-5 rounded-lg font-medium bg-green-400 text-white hover:bg-green-500 transition duration-300 ease-in-out"
            >
              Generate Document
            </button>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Commercial Invoice cum Packing List</h2>
            <p className="text-gray-600 text-base mb-5">
              Click the button below to generate and download your document.
            </p>
          </div>
          <div className="p-6 bg-gray-50">
            <button 
              onClick={() => handleGenerateClick('DInvoice')} 
              className="w-full py-3 px-5 rounded-lg font-medium bg-green-400 text-white hover:bg-green-500 transition duration-300 ease-in-out"
            >
              Generate Document
            </button>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Bill of Export</h2>
            <p className="text-gray-600 text-base mb-5">
              Click the button below to generate and download your document.
            </p>
          </div>
          <div className="p-6 bg-gray-50">
            <button 
              onClick={() => handleGenerateClick('DShippingBill')} 
              className="w-full py-3 px-5 rounded-lg font-medium bg-green-400 text-white hover:bg-green-500 transition duration-300 ease-in-out"
            >
              Generate Document
            </button>
          </div>
        </div>
      </div>

      {isGenerated && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          {selectedDocument === 'BillofLading' && <BillofLading />}
          {selectedDocument === 'DInvoice' && <DInvoice />}
          {selectedDocument === 'DShippingBill' && <DShippingBill />}
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, AlertCircle, FileText, CheckSquare, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';

function ComplianceRequirements() {
  const {
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords
  } = useSelector((state) => state.form.formData);

  const [tabledata, setTabledata] = useState(null);
  const [loadingTabledata, setLoadingTabledata] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading.');
  const [activeTab, setActiveTab] = useState('mandatory');
  const [error, setError] = useState(null);

  // Loading text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading.') return 'Loading..';
        if (prev === 'Loading..') return 'Loading...';
        return 'Loading.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTabledata = async () => {
      setLoadingResponse(true);
      setLoadingTabledata(true);
      setError(null);
      
      try {
        const storedTabledata = sessionStorage.getItem('amazonSellerCentral');
        if (storedTabledata) {
          setTabledata(JSON.parse(storedTabledata));
          setLoadingTabledata(false);
          setLoadingResponse(false);
          return;
        }

        const productsArray = Array.isArray(products) ? products : [];
        const keywordsArray = Array.isArray(keywords) ? keywords : [];

        if (productsArray.length === 0 && keywordsArray.length === 0) {
          throw new Error('No products or keywords available');
        }

        const query = `${productsArray.join(' ')} ${keywordsArray.join(' ')}`.trim();
        const requestBody = { query: `I want to sell ${query}` };

        const responseResult = await axios.post(
          'https://cross-intelligence-50023657941.development.catalystappsail.in/amazon-product-category',
          requestBody
        );

        const extractedTextArray = responseResult.data.documents.map(doc => doc.extractedText).join(' ');
        const tabledataRequestBody = {
          query: `I want to sell ${query}`,
          documents: extractedTextArray
        };

        const tabledataResult = await axios.post(
          'https://cross-intelligence-50023657941.development.catalystappsail.in/amazon-seller-central',
          tabledataRequestBody
        );

        setTabledata(tabledataResult.data);
        sessionStorage.setItem('amazonSellerCentral', JSON.stringify(tabledataResult.data));

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoadingTabledata(false);
        setLoadingResponse(false);
      }
    };

    if (products || keywords) {
      fetchTabledata();
    }
  }, [products, keywords]);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-l-4 border-r-4 border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
      <p id="Translatable" className="mt-4 text-blue-700 font-medium text-lg">{loadingText}</p>
      <p id="Translatable" className="text-gray-500 mt-2">Fetching compliance requirements...</p>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 text-red-600 shadow-sm">
      <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
      <h3 id="Translatable" className="text-lg font-medium mb-2">Error</h3>
      <p id="Translatable" className="text-center">{message}</p>
    </div>
  );

  if (!products || !keywords || (!Array.isArray(products) && !Array.isArray(keywords))) {
    return <ErrorMessage message="Please fill in the Product Details to get the results" />;
  }

  if (loadingTabledata) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="bg-green-400 px-6 py-4">
          <h1 id="Translatable" className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Shield className="mr-3 h-6 w-6" />
            Compliance Requirements
          </h1>
        </div>

        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors ${activeTab === 'mandatory' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
            onClick={() => setActiveTab('mandatory')}
          >
            <div className="flex items-center justify-center">
              <CheckSquare className="w-5 h-5 mr-2" />
              <span id="Translatable">Mandatory Requirements</span>
            </div>
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors ${activeTab === 'recommended' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
            onClick={() => setActiveTab('recommended')}
          >
            <div className="flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2" />
              <span id="Translatable">Recommended Requirements</span>
            </div>
          </button>
        </div>

        <div className="p-4">
          {tabledata && (
            <div className="animate-fadeIn">
              {activeTab === 'mandatory' && (
                <RequirementTable 
                  requirements={tabledata["Mandatory Requirements"] || []} 
                />
              )}
              {activeTab === 'recommended' && (
                <RequirementTable 
                  requirements={tabledata["Recommended Requirements"] || []} 
                />
              )}
            </div>
          )}

          {tabledata && tabledata["Reference URLs"] && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h2 id="Translatable" className="text-xl font-semibold mb-4 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Reference URLs
              </h2>
              <ul className="space-y-2">
                {tabledata["Reference URLs"].map((url, index) => (
                  <li key={index} className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <span id="Translatable">{url}</span>
                      <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function RequirementTable({ requirements = [] }) {
  if (!requirements.length) {
    return (
      <div id="Translatable" className="text-center py-8 text-gray-500">
        No requirements available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span id="Translatable">Requirement</span>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span id="Translatable">Description</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requirements.map((req, index) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span id="Translatable">{req.Requirement}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span id="Translatable">{req.Description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplianceRequirements;
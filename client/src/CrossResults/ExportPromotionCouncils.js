'use client'

import React, { useState, useEffect } from "react";
import { Search, Globe, Phone, Mail, ChevronDown, ChevronUp, ExternalLink,AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ExportPromotionCouncils() {
  const {
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords,
  } = useSelector((state) => state.form.formData);

  const [relevantCouncils, setRelevantCouncils] = useState([]);
  const [otherCouncils, setOtherCouncils] = useState([]);
  const [loading, setLoading] = useState({ relevant: true, other: true });
  const [error, setError] = useState({ relevant: null, other: null });
  const [expandedCouncil, setExpandedCouncil] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRelevantCouncils = async () => {
      try {
        // Check if data exists in session storage
        const sessionData = sessionStorage.getItem('exportcouncil');
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          setRelevantCouncils(parsedData.relevantCouncils || []);
          setOtherCouncils(parsedData.otherCouncils || []);
          setLoading({ relevant: false, other: false });
          return;
        }

        // If no session data, fetch from API
        const [relevantResponse, otherResponse] = await Promise.all([
          fetch("https://cross-intelligence-50023657941.development.catalystappsail.in/export-promotion-councils", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: `<${businessDetails}><${products}><${keywords}>` }),
          }),
          fetch("https://cross-intelligence-50023657941.development.catalystappsail.in/councils-details")
        ]);

        if (!relevantResponse.ok || !otherResponse.ok) {
          throw new Error('Failed to fetch councils');
        }

        const relevantData = await relevantResponse.json();
        const otherData = await otherResponse.json();

        // Store the combined data in session storage
        const dataToStore = {
          relevantCouncils: relevantData.documents || [],
          otherCouncils: otherData || []
        };
        sessionStorage.setItem('exportcouncil', JSON.stringify(dataToStore));

        // Update state
        setRelevantCouncils(dataToStore.relevantCouncils);
        setOtherCouncils(dataToStore.otherCouncils);

      } catch (error) {
        console.error("Error fetching councils:", error);
        setError({
          relevant: 'Failed to load relevant export promotion councils. Please try again later.',
          other: 'Failed to load other export promotion councils. Please try again later.'
        });
      } finally {
        setLoading({ relevant: false, other: false });
      }
    };

    fetchRelevantCouncils();
  }, [businessDetails, products, keywords]);

  if(!products || !keywords || !businessDetails) {
    return (
      <div className="flex items-center justify-center text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Please fill the Product Details to get the results</span>
      </div>
    );
  }

  const filteredRelevantCouncils = relevantCouncils.filter(council =>
    council.council_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOtherCouncils = otherCouncils.filter(council =>
    council.council_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedCouncil(expandedCouncil === id ? null : id);
  };

  const renderCouncils = (councils) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {councils.map((council) => (
        <div
          key={council._id || council.council_name}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative"
        >
          {council.contact.website && (
            <a
              href={`http://${council.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 p-2 text-green-500 hover:text-green-600 transition-colors duration-300"
              aria-label="Visit Website"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <div className="p-6 flex-grow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{council.council_name}</h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Globe className="mr-2" size={16} />
              <span>{council.contact.address}</span>
            </div>
            {council.contact.telephone && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Phone className="mr-2" size={16} />
                <span>{council.contact.telephone}</span>
              </div>
            )}
            {council.contact.email && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Mail className="mr-2" size={16} />
                <span>{council.contact.email}</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <button
              onClick={() => toggleExpand(council._id || council.council_name)}
              className="flex justify-between items-center w-full text-left text-gray-700 font-medium focus:outline-none"
            >
              Products & Services
              {expandedCouncil === (council._id || council.council_name) ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </button>
            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                expandedCouncil === (council._id || council.council_name) ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {council.details.description.map((desc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800" id="Translatable">Export Promotion Councils</h1>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search councils..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700" id="Translatable">Based on Information Provided Below Export Promotion Councils You Can Reach Out</h2>
        {loading.relevant && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}
        {error.relevant && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error.relevant}</span>
          </div>
        )}
        {!loading.relevant && !error.relevant && filteredRelevantCouncils.length === 0 && (
          <p className="text-gray-600 text-center" id="Translatable">No relevant export promotion councils found matching your search.</p>
        )}
        {!loading.relevant && !error.relevant && filteredRelevantCouncils.length > 0 && renderCouncils(filteredRelevantCouncils)}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700" id="Translatable">Other Export Promotion Councils</h2>
        {loading.other && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        )}
        {error.other && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error.other}</span>
          </div>
        )}
        {!loading.other && !error.other && filteredOtherCouncils.length === 0 && (
          <p className="text-gray-600 text-center" id="Translatable">No other export promotion councils found matching your search.</p>
        )}
        {!loading.other && !error.other && filteredOtherCouncils.length > 0 && renderCouncils(filteredOtherCouncils)}
      </section>
    </div>
  );
}
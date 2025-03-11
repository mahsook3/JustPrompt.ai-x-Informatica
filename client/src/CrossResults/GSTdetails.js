import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { AlertCircle, FileText, Tag, Calculator, PieChart } from 'lucide-react';

export default function GSTdetails() {
  const {
    businessDetails,
    products,
    keywords
  } = useSelector((state) => state.form.formData);

  const [gstDetails, setGstDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedParagraph, setGeneratedParagraph] = useState('');
  const [loadingText, setLoadingText] = useState('Loading.');
  const [activeTab, setActiveTab] = useState('summary');

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
    const fetchGstDetails = async () => {
      setLoading(true);
      try {
        const query = `${Array.isArray(keywords) ? keywords.join(' ') : ''}`;
        const response = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/gst-details', { query });
        
        setGstDetails(response.data);
        sessionStorage.setItem('gstDetails', JSON.stringify(response.data));
        generateParagraph(response.data);
      } catch (error) {
        console.error('Error fetching GST details:', error);
      } finally {
        setLoading(false);
      }
    };

    const generateParagraph = async (gstDetails) => {
      try {
        const requestBody = {
          contents: [{
            parts: [{
              text: `You are my business advisor. Help me find GST tax for my business. Here are my details: ${businessDetails} ${products} ${keywords}. Based on this GST info, generate a business-specific response: ${JSON.stringify(gstDetails)}`
            }]
          }]
        };

        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAEVmvPFWgKJXSY9LyJISgbxNOFVM0Op58',
          requestBody
        );

        const paragraph = response.data.candidates[0].content.parts[0].text;
        setGeneratedParagraph(paragraph);
        sessionStorage.setItem('generatedParagraph', paragraph);
      } catch (error) {
        console.error('Error generating paragraph:', error);
      }
    };

    const storedGstDetails = sessionStorage.getItem('gstDetails');
    const storedParagraph = sessionStorage.getItem('generatedParagraph');

    if (storedGstDetails) {
      const parsedGstDetails = JSON.parse(storedGstDetails);
      setGstDetails(parsedGstDetails);
      storedParagraph ? setGeneratedParagraph(storedParagraph) : generateParagraph(parsedGstDetails);
      setLoading(false);
    } else {
      fetchGstDetails();
    }
  }, [businessDetails, products, keywords]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-green-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-l-4 border-r-4 border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
      <p className="mt-4 text-green-700 font-medium text-lg">{loadingText}</p>
      <p className="text-gray-500 mt-2">Fetching GST details...</p>
    </div>
  );

  if(!products || !keywords || !businessDetails) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 text-red-600 shadow-sm">
        <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
        <h3 className="text-lg font-medium mb-2">Missing Information</h3>
        <p className="text-center">Please fill the Product Details to get the results</p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (!gstDetails) {
    return (
      <div className="max-w-3xl mx-auto my-8 p-6 bg-red-50 rounded-lg border border-red-200 shadow-md">
        <div className="flex flex-col items-center text-red-600">
          <AlertCircle className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-medium mb-2">Error Loading Data</h3>
          <p>We couldn't retrieve the GST details. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="bg-green-400 px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Calculator className="mr-3 h-6 w-6" />
            GST Details
          </h1>
          <p className="text-green-100 mt-2 text-sm md:text-base" id="Translatable">
            Based on your business: <span className="font-medium">{businessDetails}</span>
          </p>
        </div>

        {generatedParagraph && (
          <div className="bg-green-50 p-5 border-b border-green-100">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                <FileText className="h-5 w-5 text-green-700" />
              </div>
              <div className="text-gray-700 prose prose-sm max-w-none" id="Translatable">
                <p dangerouslySetInnerHTML={{ __html: generatedParagraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-700">$1</strong>') }}></p>
              </div>
            </div>
          </div>
        )}

        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors ${activeTab === 'summary' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
            onClick={() => setActiveTab('summary')}
          >
            <div className="flex items-center justify-center">
              <PieChart className="w-5 h-5 mr-2" />
              GST Summary
            </div>
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gstDetails.documents.map((doc) => (
              <div
                key={doc._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-400/60 to-transparent" />
                  <h2 className="absolute bottom-2 left-3 text-white font-semibold">
                    {doc.ChapterHeadingSubheadingTariffItem}
                  </h2>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Schedules:</span> {doc.Schedules} |{" "}
                    <span className="font-medium">SNo:</span> {doc.SNo}
                  </p>
                  <p className="text-sm text-gray-700" id="Translatable">
                    <span className="font-medium" id="Translatable">Description:</span> {doc.DescriptionOfGoods}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">CGST</p>
                      <p className="text-sm font-semibold text-gray-800">{doc.CGSTRate}%</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">SGST/UTGST</p>
                      <p className="text-sm font-semibold text-gray-800">{doc.SGSTUTGSTRate}%</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">IGST</p>
                      <p className="text-sm font-semibold text-gray-800">{doc.IGSTRate}%</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">Comp. Cess</p>
                      <p className="text-sm font-semibold text-gray-800">{doc.CompensationCess}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
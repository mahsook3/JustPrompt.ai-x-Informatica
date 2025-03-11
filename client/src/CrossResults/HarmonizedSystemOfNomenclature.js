import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, FileText, Shield, Table, ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";

export default function HarmonizedSystemOfNomenclature() {
  const {
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords,
  } = useSelector((state) => state.form.formData);

  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [data, setData] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingText, setLoadingText] = useState('Loading.');
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedData = sessionStorage.getItem("hsnGstData");
        const storedSummary = sessionStorage.getItem("hsnGstSummary");

        if (storedData && storedSummary) {
          setData(JSON.parse(storedData));
          setSummary(storedSummary);
          setLoading(false);
          return;
        }

        const query = `${products} ${keywords}`;
        const response = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/hsn-gst-detail",
          { query }
        );

        setData(response.data);
        sessionStorage.setItem("hsnGstData", JSON.stringify(response.data));

        // Fetch summary
        setSummaryLoading(true);
        const tableData = response.data.map(item => 
          `HSN: ${item.HSN}, Description: ${item.description}, GST: ${!item.GST || item.GST === "" ? "Free" : item.GST}`
        ).join("\n");

        const summaryResponse = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/genarate-summary", 
          {
            prompt: `Think like you are an international HSN code finder and GST Details provider for India. Answer the following question from the available data:
            What all the HSN code and GST can apply for ${businessDetails} ${products} ${keywords}? Use the below reference:
            ${tableData}`,
            hsnData: response.data,
          }
        );

        if (summaryResponse.data && summaryResponse.data.anwser) {
          setSummary(summaryResponse.data.anwser);
          sessionStorage.setItem("hsnGstSummary", summaryResponse.data.anwser);
        }

      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        setSummaryLoading(false);
      }
    };

    if (products || keywords) {
      fetchData();
    }
  }, [products, keywords, businessDetails]);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-l-4 border-r-4 border-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
      <p id="Translatable" className="mt-4 text-blue-700 font-medium text-lg">{loadingText}</p>
      <p id="Translatable" className="text-gray-500 mt-2">Fetching HSN and GST details...</p>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 text-red-600 shadow-sm">
      <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
      <h3 id="Translatable" className="text-lg font-medium mb-2">Error</h3>
      <p id="Translatable" className="text-center">{message}</p>
    </div>
  );

  if (!products || !keywords || !businessDetails) {
    return <ErrorMessage message="Please fill in the Product Details to get the results" />;
  }

  if (loading) {
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
            HSN and GST Details
          </h1>
        </div>

        {summaryLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          </div>
        ) : (
          summary && (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p id="Translatable" className="text-gray-700">
                  {summary.split(/(\*\*.*?\*\*)/).map((part, index) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={index} className="text-blue-700">{part.slice(2, -2)}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </div>
          )
        )}

        <div className="p-4">
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 id="Translatable" className="text-lg font-semibold flex items-center text-gray-800">
                <Table className="w-5 h-5 mr-2" />
                HSN Code Details
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span id="Translatable">HSN Code</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span id="Translatable">Description</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span id="Translatable">GST Rate</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data && data.map((item) => (
                    <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span>{item.HSN}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span id="Translatable">{item.description}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span id="Translatable" className={`px-3 py-1 text-sm font-medium rounded-full ${
                          !item.GST || item.GST === ""
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {!item.GST || item.GST === "" ? "Free" : item.GST}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
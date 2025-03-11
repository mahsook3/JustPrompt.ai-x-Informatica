import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DutyDrawback() {
  const { products, keywords } = useSelector((state) => state.form.formData);
  const [dutydrawbackData, setDutyDrawbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/duty-drawback', {
          query: `${products}, ${keywords}`
        });
        setDutyDrawbackData(response.data);
        sessionStorage.setItem("dutyDrawbackData", JSON.stringify(response.data));
        setLoading(false);
        fetchSummary(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const fetchSummary = async (data) => {
      setSummaryLoading(true);
      try {
        const tableData = data.map(item => 
          `Tariff Item: ${item.tariff_item}, Drawback Rate: ${item.drawback_rate || 'N/A'}, Cap per unit in Rs.: ${item.drawback_cap_per_unit || 'N/A'}, Description: ${item.description_of_goods}`
        ).join("\n");

        const response = await axios.post("https://cross-intelligence-50023657941.development.catalystappsail.in/genarate-summary", {
          prompt: `Think like you are an international duty drawback advisor. Answer the following question from the available data:
          What are the duty drawbacks for ${products} ${keywords}? Use the below reference:
          ${tableData}`,
          data,
        });
        if (response.data && response.data.anwser) {
          setSummary(response.data.anwser); // Fixed the key
          sessionStorage.setItem("dutyDrawbackSummary", response.data.anwser);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setSummaryLoading(false);
      }
    };

    const storedData = sessionStorage.getItem("dutyDrawbackData");
    const storedSummary = sessionStorage.getItem("dutyDrawbackSummary");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDutyDrawbackData(parsedData);
      setLoading(false);
      if (storedSummary) {
        setSummary(storedSummary);
      } else {
        fetchSummary(parsedData);
      }
    } else {
      fetchData();
    }
  }, [products, keywords]);

  if(!products || !keywords) {
    return (
      <div className="flex items-center justify-center text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Please fill the Product Details to get the results</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
    <h1 className="text-3xl text-center font-bold text-gray-800" id="Translatable">Duty Drawback</h1>
    {summaryLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    ) : (
      summary && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
          <p className="text-lg font-medium" id="Translatable">
            {summary.split(/(\*\*.*?\*\*)/).map((part, index) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={index}>{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
          </p>
        </div>
      )
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dutydrawbackData.map((item, index) => (
        <div key={index} className="relative flex flex-col bg-white border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <div className="p-5 bg-gradient-to-r from-green-400 to-blue-500 text-white flex-shrink-0">
            <p className="font-semibold text-lg" id="Translatable">{item.tariff_item}</p>
            <p className="text-sm" id="Translatable">Tariff Item</p>
          </div>
          <div className="px-6 py-4 text-gray-800 flex-grow">
            <h3 className="text-lg font-semibold mb-2 tracking-wide" id="Translatable">Drawback Rate</h3>
            <p className="text-4xl font-bold text-gray-600" id="Translatable">{item.drawback_rate || 'N/A'}</p>
            <p className="text-lg font-medium text-gray-600 mt-1" id="Translatable">
              Cap per unit in Rs.{" "}
              <span className="font-semibold">
                {item.drawback_cap_per_unit || 'N/A'}
              </span>
            </p>
            <p className="text-md mt-2 text-gray-600" id="Translatable">
              {item.description_of_goods}
            </p>
            {item.unit && (
              <p className="absolute top-2 right-2 text-md text-gray-600" id="Translatable">
                Unit: {item.unit}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
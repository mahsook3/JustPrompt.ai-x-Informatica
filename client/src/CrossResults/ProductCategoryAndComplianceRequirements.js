import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  ExternalLink,
  FileText,
  BarChart,
  Tag,
  Calendar,
} from "lucide-react";
import { useSelector } from "react-redux";

function ProductCategoryAndComplianceRequirements() {
  const {
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords,
  } = useSelector((state) => state.form.formData);

  const [response, setResponse] = useState(null);
  const [tabledata, setTabledata] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(true);
  const [loadingTabledata, setLoadingTabledata] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading.");
  const [hsnData, setHsnData] = useState(null);
  const [loadingHsn, setLoadingHsn] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [hsnSummary, setHsnSummary] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [activeTab, setActiveTab] = useState("categories"); // For tab navigation

  useEffect(() => {
    const fetchHsnSummary = async (hsnData) => {
      setSummaryLoading(true);
      try {
        const tableData = hsnData
          .map(
            (item) =>
              `HSN: ${item.HSN}, Description: ${item.description}, GST: ${
                !item.GST || item.GST === "" ? "Free" : item.GST
              }`
          )
          .join("\n");

        const response = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/genarate-summary",
          {
            prompt: `Think like you are an international HSN code finder and GST Details provider for India. Answer the following question from the available data:
          What all the HSN code and GST can apply for ${businessDetails} ${products} ${keywords}? Use the below reference:
          ${tableData}`,
            hsnData,
          }
        );
        if (response.data && response.data.anwser) {
          setHsnSummary(response.data.anwser);
          sessionStorage.setItem("hsnGstSummary", response.data.anwser);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setSummaryLoading(false);
      }
    };

    const fetchData = async () => {
      setLoadingResponse(true);
      setLoadingTabledata(true);
      setLoadingHsn(true);
      try {
        const productsArray = Array.isArray(products) ? products : [];
        const keywordsArray = Array.isArray(keywords) ? keywords : [];
        const query = `${productsArray.join(" ")} ${keywordsArray.join(" ")}`;
        const requestBody = { query: `I want to sell ${query}` };

        const responseResult = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/amazon-product-category",
          requestBody
        );
        setResponse(responseResult.data);
        sessionStorage.setItem(
          "ProductCategoryAndComplianceRequirement",
          JSON.stringify(responseResult.data)
        );
        setLoadingResponse(false);

        const documentsText = Array.isArray(responseResult.data.documents)
          ? responseResult.data.documents
              .map((doc) => doc.extractedText)
              .join(" ")
          : "";

        const tabledataResult = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/amazon-seller-central",
          {
            query: `I want to sell ${query}`,
            documents: documentsText,
          }
        );
        setTabledata(tabledataResult.data);
        sessionStorage.setItem(
          "amazonSellerCentral",
          JSON.stringify(tabledataResult.data)
        );
        setLoadingTabledata(false);

        const hsnResponse = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/hsn-gst-detail",
          { query }
        );
        setHsnData(hsnResponse.data);
        sessionStorage.setItem("hsnGstData", JSON.stringify(hsnResponse.data));
        setLoadingHsn(false);
        fetchHsnSummary(hsnResponse.data);

        // Fetch and store paragraph
        const paragraphRequestBody = {
          contents: [
            {
              parts: [
                {
                  text: `You are my business advisor now you are helping me to find Product Category and HSN details for my business here are my business details ${businessDetails} ${products} ${keywords} and Here are details about Product Categories and HSN. Based on it, you can answer it, but don't provide extra content and provide the paragraph specifically for my business. ${JSON.stringify(
                    responseResult.data.documents || []
                  )} ${JSON.stringify(hsnResponse.data || [])}`,
                },
              ],
            },
          ],
        };

        const paragraphResponse = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAEVmvPFWgKJXSY9LyJISgbxNOFVM0Op58",
          paragraphRequestBody
        );
        const paragraphText =
          paragraphResponse.data.candidates[0].content.parts[0].text;
        setParagraph(paragraphText);
        sessionStorage.setItem("productCategoryParagraph", paragraphText);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingResponse(false);
        setLoadingTabledata(false);
        setLoadingHsn(false);
      }
    };

    // Check session storage for existing data
    const storedResponse = sessionStorage.getItem(
      "ProductCategoryAndComplianceRequirement"
    );
    const storedTabledata = sessionStorage.getItem("amazonSellerCentral");
    const storedHsnData = sessionStorage.getItem("hsnGstData");
    const storedHsnSummary = sessionStorage.getItem("hsnGstSummary");
    const storedParagraph = sessionStorage.getItem("productCategoryParagraph");

    if (storedResponse && storedTabledata && storedHsnData) {
      setResponse(JSON.parse(storedResponse));
      setTabledata(JSON.parse(storedTabledata));
      setHsnData(JSON.parse(storedHsnData));
      if (storedParagraph) {
        setParagraph(storedParagraph);
      }
      setLoadingResponse(false);
      setLoadingTabledata(false);
      setLoadingHsn(false);
      if (storedHsnSummary) {
        setHsnSummary(storedHsnSummary);
      } else {
        fetchHsnSummary(JSON.parse(storedHsnData));
      }
    } else {
      fetchData();
    }
  }, [products, keywords, businessDetails]);

  // Loading text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading.") return "Loading..";
        if (prev === "Loading..") return "Loading...";
        return "Loading.";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Store paragraph in session storage when it changes
  useEffect(() => {
    if (paragraph) {
      sessionStorage.setItem("productCategoryParagraph", paragraph);
    }
  }, [paragraph]);

  // Custom loading spinner component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-green-600 animate-spin"></div>
        <div
          className="absolute top-0 left-0 h-20 w-20 rounded-full border-l-4 border-r-4 border-transparent animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>
      <p className="mt-4 text-green-700 font-medium text-lg">{loadingText}</p>
      <p className="text-gray-500 mt-2">
        Fetching product categories and HSN details...
      </p>
    </div>
  );

  // Input validation
  if (!products || !keywords || !businessDetails) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 text-red-600 shadow-sm">
        <AlertCircle className="w-12 h-12 mb-3 text-red-500" />
        <h3 className="text-lg font-medium mb-2">Missing Information</h3>
        <p className="text-center">
          Please fill the Product Details to get the results
        </p>
      </div>
    );
  }

  // Loading state
  if (loadingResponse || loadingHsn) {
    return <LoadingSpinner />;
  }

  // Error state
  if (!response) {
    return (
      <div className="max-w-3xl mx-auto my-8 p-6 bg-red-50 rounded-lg border border-red-200 shadow-md">
        <div className="flex flex-col items-center text-red-600">
          <AlertCircle className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-medium mb-2">Error Loading Data</h3>
          <p id="Translatable">
            We couldn't retrieve the product category and HSN details. Please
            try again later.
          </p>
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
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center" id="Translatable">
            <Tag className="mr-3 h-6 w-6" />
            Product Category and HSN Details
          </h1>
          <p className="text-green-100 mt-2 text-sm md:text-base" id="Translatable">
            Based on your business:{" "}
            <span className="font-medium">{businessDetails}</span>
          </p>
        </div>

        {paragraph && (
          <div className="bg-green-50 p-5 border-b border-green-100">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                <FileText className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <div className="text-gray-700 prose prose-sm max-w-none" id="Translatable">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-green-700">$1</strong>'
                      ),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors ${
              activeTab === "categories"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            <div className="flex items-center justify-center" id="Translatable">
              <BarChart className="w-5 h-5 mr-2" />
              Product Categories
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm md:text-base transition-colors ${
              activeTab === "hsn"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("hsn")}
          >
            <div className="flex items-center justify-center" id="Translatable">
              <Calendar className="w-5 h-5 mr-2" />
              HSN Details
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "categories" && (
            <div className="animate-fadeIn">
              <div className="mb-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-800 font-medium mb-2" id="Translatable">
                  What are Product Categories?
                </h3>
                <p className="text-sm text-gray-700" id="Translatable">
                  Product categories help determine compliance requirements,
                  taxation, and applicable regulations for your business.
                  They're essential for proper classification in e-commerce
                  platforms.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          Subtype
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          Documentation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {response.documents && response.documents.length > 0 ? (
                        response.documents.map((doc, index) => (
                          <tr
                            key={doc._id || index}
                            className="hover:bg-green-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" id="Translatable">
                              {doc.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" id="Translatable">
                              {doc.subtype}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <a
                                href={doc.downloadURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                              >
                                <span className="mr-1" id="Translatable">Documentation</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <AlertCircle className="w-10 h-10 text-gray-400 mb-2" />
                              <p id="Translatable">No product categories found for your query</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hsn" && (
            <div className="animate-fadeIn">
              <div className="mb-4 bg-green-50 p-4 rounded-lg">
                <h3 className="text-green-800 font-medium mb-2" id="Translatable">
                  What are HSN Codes?
                </h3>
                <p className="text-sm text-gray-700" id="Translatable">
                  Harmonized System of Nomenclature (HSN) codes are standardized
                  numerical codes that classify goods for trade. They determine
                  applicable GST rates and are essential for international trade
                  documentation.
                </p>

                {hsnSummary && (
                  <div className="mt-3 p-3 bg-white rounded border border-green-100">
                    <h4 className="text-sm font-medium text-green-700 mb-1" id="Translatable">
                      HSN Summary for Your Products:
                    </h4>
                    <p className="text-sm text-gray-700" id="Translatable">{hsnSummary}</p>
                  </div>
                )}

                {summaryLoading && (
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <div className="w-4 h-4 border-2 border-t-green-500 rounded-full animate-spin mr-2" id="Translatable"></div>
                    Generating HSN summary...
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          HSN Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" id="Translatable"
                        >
                          GST Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {hsnData && hsnData.length > 0 ? (
                        hsnData.map((item, index) => (
                          <tr
                            key={item._id || index}
                            className="hover:bg-green-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.HSN}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 break-words" id="Translatable">
                              {item.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  !item.GST || item.GST === ""
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`} id="Translatable"
                              >
                                {!item.GST || item.GST === ""
                                  ? "Free"
                                  : item.GST}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <AlertCircle className="w-10 h-10 text-gray-400 mb-2" />
                              <p id="Translatable">No HSN codes found for your query</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS animation classes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ProductCategoryAndComplianceRequirements;
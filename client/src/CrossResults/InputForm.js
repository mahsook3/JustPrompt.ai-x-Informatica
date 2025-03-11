import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchableDropdown from "./SearchableDropdown";
import countries from "../Data/countries.json";
import stateDistrict from "../Data/stateDistrict.json";
import axios from "axios";
import pdfToText from "react-pdftotext";
import KeywordInput from "./KeywordInput";
import { submitForm } from "../redux/formActions";

// List of 22 official Indian languages
const indianLanguages = [
  { code: "en", name: "English" },
  { code: "as", name: "Assamese (অসমীয়া)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "mr", name: "Marathi (मराठी)" },
  { code: "ne", name: "Nepali (नेपाली)" },
  { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "sa", name: "Sanskrit (संस्कृतम्)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "kok", name: "Konkani (कोंकणी)" },
  { code: "mai", name: "Maithili (मैथिली)" },
  { code: "ks", name: "Kashmiri (कश्मीरी)" },
  { code: "mni", name: "Manipuri (मणिपुरी)" },
  { code: "sat", name: "Santali (संथाली)" },
  { code: "dog", name: "Dogri (डोगरी)" },
  { code: "gom", name: "Goan Konkani (गोवा कोंकणी)" },
  { code: "brx", name: "Bodo (बोडो)" },
  { code: "sd", name: "Sindhi (सिंधी)" },
];

export default function InputForm({ resultRef, setActiveTab }) {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [products, setProducts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [odopProducts, setOdopProducts] = useState([]);
  const [giProducts, setGiProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [businessDetails, setBusinessDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const businessDetailsRef = useRef(null);
  const navigate = useNavigate();
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setProducts(savedFormData.products);
      setSelectedState(savedFormData.selectedState);
      setSelectedDistrict(savedFormData.selectedDistrict);
      setDistricts(stateDistrict[savedFormData.selectedState] || []);
      setKeywords(savedFormData.keywords);
      setBusinessDetails(savedFormData.businessDetails);
    }
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const text = await extractTextFromPDF(file);
        const response = await axios.post(
          "https://cross-intelligence-50023657941.development.catalystappsail.in/generate-product-details",
          { paragraph: text }
        );
        console.log("Response data:", response.data); // Log the response data
        if (response.data && response.data.length > 0) {
          const { product_name, product_details } = response.data[0];
          setProducts(`${product_name}: ${product_details}`);
        } else {
          setErrorMessage("No product details found in the response.");
        }
      } catch (error) {
        setErrorMessage("Failed to process the file. Please try again.");
        console.error("Error processing file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const text = await pdfToText(file);
      return text;
    } catch (error) {
      setErrorMessage("Failed to extract text from PDF. Please try again.");
      console.error("Failed to extract text from pdf", error);
      return "";
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setDistricts(stateDistrict[state] || []);
    setSelectedDistrict(""); // Reset district selection
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      exportingCountry: "India",
      destinationCountry: document.getElementById("destinationCountry").value,
      businessDetails: businessDetailsRef.current.value,
      products,
      selectedState,
      selectedDistrict,
      keywords,
      selectedLanguage,
    };

    // Check if all fields are filled
    if (!formData.destinationCountry) {
      setErrorMessage("Please select a destination country.");
      setIsLoading(false);
      return;
    }
    if (!formData.businessDetails) {
      setErrorMessage("Please enter your business details.");
      setIsLoading(false);
      return;
    }
    if (!formData.products) {
      setErrorMessage("Please enter the products you want to export.");
      setIsLoading(false);
      return;
    }
    if (!formData.selectedState) {
      setErrorMessage("Please select a state.");
      setIsLoading(false);
      return;
    }
    if (!formData.selectedDistrict) {
      setErrorMessage("Please select a district.");
      setIsLoading(false);
      return;
    }
    if (formData.keywords.length === 0) {
      setErrorMessage(
        "Please enter some keywords related to your product or service."
      );
      setIsLoading(false);
      return;
    }

    try {
      if (selectedLanguage !== "en") {
        const translatedBusinessDetails = await translateText(
          formData.businessDetails,
          [],
          selectedLanguage
        );
        const translatedProducts = await translateText(
          formData.products,
          [],
          selectedLanguage
        );
        const translatedKeywords = await translateText(
          formData.keywords.join(", "),
          [],
          selectedLanguage
        );

        formData.businessDetails = translatedBusinessDetails.query;
        formData.products = translatedProducts.query;
        formData.keywords = translatedKeywords.query.split(", ");
      }

      // Dispatch form data to Redux store
      dispatch(submitForm(formData));

      // Store form data in local storage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Navigate to "Product Category" tab
      setActiveTab("getstart");
    } catch (error) {
      if (selectedLanguage !== "en") {
        setErrorMessage(
          "We have encountered an error in our Multilingual Translation Service. Please try again later or use English as the language."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      console.error("Error translating text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const translateText = async (text, objects, sourceLanguage) => {
    try {
      const response = await axios.post(
        "https://cross-intelligence-50023657941.development.catalystappsail.in/translate",
        {
          query: text,
          objects: objects,
          sourceLanguage: sourceLanguage,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error translating text:", error);
      return { query: text, objects: objects };
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-12" id="demo">
        <div className="w-full max-w-2xl relative">
          <form onSubmit={handleSubmit}>
            {/* Language Selection */}
            <div className="mb-5 z-10">
              <label
                htmlFor="language"
                className="mb-3 block text-base font-medium text-black" id="Translatable"
              >
                Select Your Preferred Language
              </label>
              <select
                name="language"
                id="language"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
              >
                <option value="">Select Language</option>
                {indianLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Render the form only after a language is selected */}
            {selectedLanguage && (
              <>
                {/* Exporting and Destination Country */}
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="exportingCountry"
                        className="mb-3 block text-base font-medium text-black" id="Translatable"
                      >
                        Exporting Country
                      </label>
                      <input
                        type="text"
                        name="exportingCountry"
                        id="exportingCountry"
                        placeholder="Exporting country"
                        value="India"
                        disabled
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md disabled:opacity-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="destinationCountry"
                        className="mb-3 block text-base font-medium text-black"
                        id="Translatable"
                      >
                        Destination Country
                      </label>
                      <SearchableDropdown
                        name="destinationCountry"
                        id="destinationCountry"
                        options={countries}
                        placeholder="Select Destination Country"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="mb-5">
                  <label
                    htmlFor="businessDetails"
                    className="mb-3 block text-base font-medium text-black"
                    id="Translatable"
                  >
                    Tell us about your business
                  </label>
                  <textarea
                    name="businessDetails"
                    id="businessDetails"
                    placeholder="Enter your business details"
                    ref={businessDetailsRef}
                    value={businessDetails}
                    onChange={(e) => setBusinessDetails(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                  ></textarea>
                </div>

                {/* Products */}
                <div className="mb-5">
                  <label
                    htmlFor="products"
                    className="mb-3 block text-base font-medium text-black"
                    id="Translatable"
                  >
                    What are the products you want to export?
                  </label>
                  <textarea
                    name="products"
                    id="products"
                    placeholder="Products"
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                    disabled={isLoading}
                  ></textarea>
                </div>

                {/* Keywords */}
                <div className="mb-5">
                  <label className="block text-base font-medium text-black" id="Translatable">
                    Give some keywords related to your product or service
                  </label>
                  <KeywordInput
                    keywords={keywords}
                    setKeywords={setKeywords}
                    businessDetails={businessDetails}
                    products={products}
                    isGeneratingKeywords={isGeneratingKeywords}
                    setIsGeneratingKeywords={setIsGeneratingKeywords}
                  />
                  <p className="text-sm text-gray-500 mt-1 ml-1" id="Translatable">
                    Please enter keywords separated by comma or press Enter
                  </p>
                </div>

                {/* State and District */}
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="state"
                        className="mb-3 block text-base font-medium text-black"
                        id="Translatable"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        id="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                      >
                        <option value="">Select State</option>
                        {Object.keys(stateDistrict).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="district"
                        className="mb-3 block text-base font-medium text-black"
                        id="Translatable"
                      >
                        District
                      </label>
                      <select
                        name="district"
                        id="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                        disabled={!selectedState}
                      >
                        <option value="">Select District</option>
                        {districts.map((district, index) => (
                          <option key={`${district}-${index}`} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="hover:shadow-form w-full rounded-md bg-green-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Start Oversight"}
                  </button>
                  {errorMessage && (
                    <p className="mt-3 text-center text-base font-medium text-red-600">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

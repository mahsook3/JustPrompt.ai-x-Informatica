import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AlertCircle, MapPinHouse } from "lucide-react";
import NoSelectionModal from "./NoSelectionModal";

const LocalProducts = ({ setActiveTab }) => {
  const { selectedState, selectedDistrict } = useSelector(
    (state) => state.form.formData
  );
  const [odopProducts, setOdopProducts] = useState([]);
  const [giProducts, setGiProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

const fetchProducts = async () => {
  if (!selectedState || !selectedDistrict) {
    return;
  }

  const storageKey = `local-${selectedState}-${selectedDistrict}`;

  try {
    // Try to get cached data
    const cachedData = sessionStorage.getItem(storageKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (parsedData.timestamp && Date.now() - parsedData.timestamp < 3600000) {
        setOdopProducts(parsedData.odopProducts || []);
        setGiProducts(parsedData.giProducts || []);
        return;
      }
    }

    setIsFetchingProducts(true);
    setError(null);

    const [odopResponse, giResponse] = await Promise.all([
      axios.post(
        "https://cross-intelligence-50023657941.development.catalystappsail.in/odop-details",
        { state: selectedState, district: selectedDistrict },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
      axios.post(
        "https://cross-intelligence-50023657941.development.catalystappsail.in/geographical-indication",
        { state: selectedState, district: selectedDistrict },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    ]);

    const newData = {
      odopProducts: odopResponse.data || [],
      giProducts: giResponse.data || [],
      timestamp: Date.now(),
    };

    // Cache the data
    sessionStorage.setItem(storageKey, JSON.stringify(newData));

    setOdopProducts(newData.odopProducts);
    setGiProducts(newData.giProducts);

  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage = error.response?.status === 500
      ? "Server error. Please try again later."
      : "Failed to fetch products. Please check your connection and try again.";
    setError(errorMessage);

    // Use cached data as fallback if available
    const cachedData = sessionStorage.getItem(storageKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setOdopProducts(parsedData.odopProducts || []);
      setGiProducts(parsedData.giProducts || []);
      setError(errorMessage + " Showing cached data.");
    } else {
      setOdopProducts([]);
      setGiProducts([]);
    }
  } finally {
    setIsFetchingProducts(false);
  }
};

    fetchProducts();
  }, [selectedState, selectedDistrict]);

  const handleCloseModal = () => {
    setActiveTab("input");
  };

  // Custom loading component with Tailwind
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div
          className="absolute top-0 left-0 h-16 w-16 rounded-full border-l-4 border-r-4 border-transparent animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>
      <span className="ml-4 text-blue-600 font-medium" id="Translatable">
        Loading products...
      </span>
    </div>
  );

  if (!selectedState || !selectedDistrict) {
    return <NoSelectionModal onClose={handleCloseModal} />;
  }

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800" id="Translatable">Local Products</h2>
        <div className="flex items-center mt-2 bg-blue-50 p-3 rounded-md">
          <span className="text-blue-700" id="Translatable">
            Based on your selection:{" "}
            <span className="font-semibold" id="Translatable">
              {selectedDistrict}, {selectedState}
            </span>
          </span>
        </div>
      </div>

      {isFetchingProducts && <LoadingSpinner />}

      {error && (
        <div className="text-red-600 mb-6 p-4 bg-red-50 rounded-lg flex items-start border border-red-200">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span id="Translatable">{error}</span>
        </div>
      )}

      <div className="space-y-8">

{Array.isArray(odopProducts) && odopProducts.length > 0 && (
  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200">
    <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center" >
      <MapPinHouse className="h-6 w-6 mr-2" />
      Your Native ODOP Products
    </h3>
    <div className="mt-5 mb-5 p-4 bg-white rounded-md border border-gray-200 text-sm text-gray-600">
      <p id="Translatable">
        <span className="font-medium text-amber-700" id="Translatable">
          One District One Product (ODOP)
        </span>{" "}
        as part of the District Export Plan, identifies one product per
        district. The District Export Promotion Committee provides
        continuous facilitation to help industries navigate export
        procedures.
      </p>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {odopProducts.map((product, index) => (
        <li
          key={`odop-${index}`}
          className="flex items-center bg-white p-3 rounded-md shadow-sm border border-amber-100"
        >
          <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
          <span className="text-gray-700" id="Translatable">{product.Product}</span>
        </li>
      ))}
    </ul>
  </div>
)}

{Array.isArray(giProducts) && giProducts.length > 0 && (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
    <h3 className="text-xl font-semibold mb-4 text-emerald-800 flex items-center" id="Translatable">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      Your State GI Products
    </h3>
    <div className="mt-5 mb-5 p-4 bg-white rounded-md border border-gray-200 text-sm text-gray-600">
      <p id="Translatable">
        <span className="font-medium text-emerald-700" id="Translatable">
          A geographical indication (GI)
        </span>{" "}
        is a sign used on products that have a specific geographical
        origin and possess qualities or a reputation that are due to
        that origin.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {giProducts.map((product, index) => (
        <div
          key={`gi-${product.GeographicalIndications}-${index}`}
          className="bg-white p-4 rounded-md shadow-sm border border-green-100 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-lg text-emerald-700 mb-2" id="Translatable">
            {product.GeographicalIndications}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2" id="Translatable">
                Application No:
              </span>
              <span className="font-medium text-gray-700" id="Translatable">
                {product.ApplicationNo}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2" id="Translatable">Goods:</span>
              <span className="font-medium text-gray-700" id="Translatable">
                {product.Goods}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {(!Array.isArray(odopProducts) || odopProducts.length === 0) &&
          (!Array.isArray(giProducts) || giProducts.length === 0) &&
          !isFetchingProducts && (
            <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h4 className="text-lg font-medium mb-2 text-gray-700" id="Translatable">
                No Products Found
              </h4>
              <p className="text-center" id="Translatable">
                We couldn't find any local products for {selectedDistrict},{" "}
                {selectedState}.
              </p>
            </div>
          )}
      </div>

      {/* Back to top button - appears when scrolling down */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{ display: "none" }} // Initially hidden, show with JS on scroll
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default LocalProducts;
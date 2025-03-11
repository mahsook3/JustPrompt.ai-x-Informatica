import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';

// Define the structure of a product information item
const ProductInfoItemPropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
};

// Define the props for the GSTProductInfo component
const GSTProductInfoPropTypes = {
  selectedHSN: PropTypes.string.isRequired,
  selectedGST: PropTypes.string.isRequired,
  productInfo: PropTypes.shape({
    HSN: PropTypes.string,
    "description-of-goods": PropTypes.string,
    "Recommended-RoDTEP-rate-as-percentage-age-of-FOB": PropTypes.string,
    UQC: PropTypes.string,
    "Recommended-RoDTEP-cap": PropTypes.number,
  }),
};

export default function GSTProductInfo({ selectedHSN, selectedGST, productInfo }) {
  // Function to render each product information item
  const renderInfoItem = ({ label, value, icon }) => (
    <div className="flex flex-col space-y-1">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </dt>
      <dd className="text-lg font-semibold text-gray-900 dark:text-white">{value}</dd>
    </div>
  );

  // List of product information items to display
  const infoItems = [
    { label: "Description of Goods", value: productInfo?.["description-of-goods"] || `No data available` },
    { label: "Recommended RoDTEP Rate", value: productInfo?.["Recommended-RoDTEP-rate-as-percentage-age-of-FOB"] || `No data available` },
    { label: "Unit of Quantity (UQC)", value: productInfo?.UQC || `No data available` },
    { 
      label: "Recommended RoDTEP Cap", 
      value: productInfo?.["Recommended-RoDTEP-cap"] ? `₹${productInfo["Recommended-RoDTEP-cap"].toLocaleString('en-IN')}` : `No data available`,
      icon: <span className="text-green-600 dark:text-green-400">₹</span>
    }
  ];

  return (
    <div className="w-full  bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">GST Product Information</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl" aria-label="GST Information">🧾</span>
          </div>
        </div>
        {selectedHSN ? (
          <div className="pt-4 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">GST Rate</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">{selectedGST || "No data available"}</p>
            </div>
            {productInfo ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                {infoItems.map((item, index) => (
                  <div key={index} className="sm:col-span-1">
                    {renderInfoItem(item)}
                  </div>
                ))}
              </dl>
            ) : (
              <div className="flex items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  No Remission of Duties and Taxes on Exported Products data available for {selectedHSN}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Select an HSN code to view product information</p>
          </div>
        )}
      </div>
    </div>
  );
}

GSTProductInfo.propTypes = GSTProductInfoPropTypes;
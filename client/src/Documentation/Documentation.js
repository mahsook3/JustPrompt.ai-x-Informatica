import React, { useState } from 'react';
import { FaRegFileAlt, FaShippingFast, FaMoneyCheckAlt, FaFileInvoiceDollar } from 'react-icons/fa';
import Registration from './Registration';
import ProductCategoryAndComplianceRequirements from '../CrossResults/ProductCategoryAndComplianceRequirements';
import ProductDocumentation from './ProductDocumentation';
import ShippingDocumentation from './ShippingDocumentation';
import PaymentReconciliation from './PaymentReconciliation';
import TaxDocumentation from './TaxDocumentation';

export default function Documentation() {
  const [currentStep, setCurrentStep] = useState(null);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Registration onBack={() => setCurrentStep(null)} />;
      case 2:
        return <ProductDocumentation onBack={() => setCurrentStep(null)} />;
      case 3:
        return <ShippingDocumentation onBack={() => setCurrentStep(null)} />;
      case 4:
        return <PaymentReconciliation onBack={() => setCurrentStep(null)} />;
      case 5:
        return <TaxDocumentation onBack={() => setCurrentStep(null)} />;
      default:
        return null;
    }
  };

  if (currentStep !== null) {
    return (
      <div className="bg-white">
        {renderStepComponent()}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" id='Translatable'>STEPS TO</p>
          <h3 className="text-3xl leading-normal font-bold tracking-tight text-gray-900" id='Translatable'>
            Start your <span className="text-green-400" id='Translatable'>Global Journey</span>
          </h3>
        </div>
        <div className="mt-20">
          <ul>
            <li className="bg-gray-100 p-5 pb-10 text-center mb-20 cursor-pointer" onClick={() => setCurrentStep(1)}>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-400 text-white border-4 border-white text-xl font-semibold">
                    1
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg leading-6 font-semibold text-gray-900" id='Translatable'>
                    Registration
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500" id='Translatable'>
                    Learn about compliance requirements, view registration steps.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-100 p-5 pb-10 text-center mb-20 cursor-pointer" onClick={() => setCurrentStep(2)}>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-400 text-white border-4 border-white text-xl font-semibold">
                    2
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg leading-6 font-semibold text-gray-900" id='Translatable'>
                    Product Documentation
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500" id='Translatable'>
                    Details about product categories and compliance requirements for export.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-100 p-5 pb-10 text-center mb-20 cursor-pointer" onClick={() => setCurrentStep(3)}>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-400 text-white border-4 border-white text-xl font-semibold">
                    3
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg leading-6 font-semibold text-gray-900" id='Translatable'>
                    Shipping Documentation
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500" id='Translatable'>
                    Learn about shipping documentation requirements for export.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-100 p-5 pb-10 text-center mb-20 cursor-pointer" onClick={() => setCurrentStep(4)}>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-400 text-white border-4 border-white text-xl font-semibold">
                    4
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg leading-6 font-semibold text-gray-900" id='Translatable'>
                    Payment Reconciliation
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500" id='Translatable'>
                    Details about payment reconciliation for export.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-100 p-5 pb-10 text-center mb-20 cursor-pointer" onClick={() => setCurrentStep(5)}>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-400 text-white border-4 border-white text-xl font-semibold">
                    5
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg leading-6 font-semibold text-gray-900" id='Translatable'>
                    Tax Documentation
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-500" id='Translatable'>
                    Learn about tax documentation requirements for export.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
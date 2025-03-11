import { link } from 'framer-motion/client';
import React from 'react';
import { FaArrowRight, FaArrowLeft, FaFileAlt } from 'react-icons/fa'; // Importing the arrow and file icons from react-icons

export default function ShippingDocumentation({ onBack }) { // Accepting onBack prop
    const steps = [
        {
            title: "Courier mode",
            description: "Exporters can choose this mode if their shipment value is up to INR 5 Lakhs. Export incentives (such as duty drawbacks, EPCG) are not applicable for exports made via Courier mode. The mandatory documents for shipping via Courier mode are Commercial invoice, Packing list, and Shipper Letter of Instruction.",
        },
        {
            title: "Cargo mode",
            description: "There is no limit on the shipment value for choosing the Cargo mode. Exporters can claim export-related benefits if they ship via Cargo mode. The mandatory documents for shipping via Cargo mode are Commercial invoice, Packing list, Export Value Declaration, and Shipper Letter of Instruction.",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <button 
                    onClick={onBack} 
                    className="inline-flex items-center justify-center px-4 py-2 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <FaArrowLeft className="mr-2 h-4 w-4" /> Back
                </button>
                <h1 className="text-4xl font-bold mb-6 text-center" id="Translatable">Shipping Documentation</h1>
                <p className="text-lg mb-8 text-center max-w-3xl mx-auto" id="Translatable">
                    Generally, there are 2 modes of clearance of exporting shipments:
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-2" id="Translatable">{index + 1}. {step.title}</h2>
                                <p className="text-gray-600" id="Translatable">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-white shadow rounded-lg">
                    <h2 className="text-2xl font-bold mb-6" id="Translatable">Shipping Document Templates</h2>
                    <p className="text-gray-600 mb-6" id="Translatable">Below are the shipping document templates of a few carriers for reference. Please contact your logistic partner to understand the required documents.</p>
                    <div className="flex space-x-6">
                        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2" id="Translatable">FedEx</h3>
                            <ul className="list-none list-inside space-y-2">
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/fedex_commercial_invoice.xlsx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />Commercial invoice
                                    </a>
                                </li>
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/fedex_packing_list.xlsx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />Packing List
                                    </a>
                                </li>
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/fedex_evd.docx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />EVD
                                    </a>
                                </li>
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/fedex_sli.xlsx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />SLI
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2" id="Translatable">DHL</h3>
                            <ul className="list-none list-inside space-y-2">
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/dhl_courier_invoice.xlsx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />Courier invoice
                                    </a>
                                </li>
                                <li>
                                    <a href="https://d30e13dxbd9wo.cloudfront.net/shipping/templates/dhl_cargo_documents.xlsx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center" id="Translatable">
                                        <FaFileAlt className="mr-2" />Cargo documents
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
import { link } from 'framer-motion/client';
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Importing the arrow icons from react-icons

export default function ProductDocumentation({ onBack, onNavigate }) { // Added onNavigate prop

    const steps = [
        {
            title: "Exportable Items",
            description: "All items are freely exportable except few items appearing in prohibited/ restricted list. After studying the trends of export of different products from India proper selection of the product(s) to be exported may be made.",
            link: "https://www.dgft.gov.in/CP/",
            linkText: "Prohibited Items",
        },
        {
            title: "Regulated Products",
            description: "Certain products and categories are regulated and have specific requirements to be imported into USA. Choose the product below to find out the certification and regulations applicable to them. So explore at Product Category menu.",
            link: "https://sellercentral.amazon.in/spec/productcompliance/form?clientName=spec_web",
            linkText: "Product Category",
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
                <h1 className="text-4xl font-bold mb-6 text-center text-green-800" id="Translatable">Product Documentation</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-2" id="Translatable">{index + 1}. {step.title}</h2>
                                <p className="text-gray-600" id="Translatable">{step.description}</p>
                            </div>
                            {step.link && (
                                <div className="mt-auto p-6 pt-0">
                                    <a 
                                        href={step.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" id="Translatable"
                                    >
                                        {step.linkText} <FaArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
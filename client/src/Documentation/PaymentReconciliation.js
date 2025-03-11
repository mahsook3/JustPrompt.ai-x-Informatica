import { link } from 'framer-motion/client';
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function Registration({ onBack }) {
    const steps = [
        {
            title: "eFIRC",
            description: "anks need to report all inward remittances under EDPMS received against export of goods/software. When the exporter proceeds for export of goods are received by a bank other than the one through which documents are submitted, e-FIRC is required for connecting the two.",
            link: "https://www.icicibank.com/business-banking/trade-service/foreign-inward-remittance-certificate",
            linkText: "Learn more",
        },
        {
            title: "eBRC",
            description: "After receiving all payments, request the bank to close the entry in EDPMS and obtain an eBRC.",
            link: "https://www.dgft.gov.in/CP/?opt=eBRC",
            linkText: "Self Certification Link",
        },
        {
          title: "RBI Circular",
          description: "Guidelines and regulations issued by the Reserve Bank of India.",
          link: "https://www.rbi.org.in/scripts/feduser.aspx#14122017",
          linkText: "RBI Circular Link",
      },
      {
          title: "Guidelines for Amazon Payments",
          description: "Guidelines for processing payments on Amazon. (You will need an Amazon seller account to view this page.)",
          link: "https://sellercentral.amazon.com/help/hub/reference/G201756390?locale=en_US",
          linkText: "Amazon Payments Link",
      },
      {
          title: "eBRC",
          description: "After receiving all payments, request the bank to close the entry in EDPMS and obtain an eBRC.",
          link: "https://www.dgft.gov.in/CP/?opt=eBRC",
          linkText: "Self Certification Link",
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
                <h1 className="text-4xl font-bold mb-6 text-center" id="Translatable">Payment Reconciliation</h1>
                <p className="text-lg mb-8 text-center max-w-3xl mx-auto" id="Translatable">
                Export in India is subject to several compliances as stipulated under the Foreign Exchange Management Act 1999, Foreign Exchange Management (Current Account Transactions) Rules, 2000, and the Foreign Exchange Management (Export of Goods and Services) Regulations, 2015. Such compliances are required to be adhered by every exporter in India.
                </p>
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
import { link } from 'framer-motion/client';
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Importing the arrow icons from react-icons

export default function Registration({ onBack }) { // Accepting onBack prop
    const steps = [
        {
            title: "Establishing an Organisation",
            description: "Set up a sole Proprietary concern/ Partnership firm/Company as per procedure with an attractive name and logo.",
        },
        {
            title: "Opening a Bank Account",
            description: "Open a current account with a Bank authorized to deal in Foreign Exchange.",
        },
        {
            title: "Obtaining Permanent Account Number (PAN)",
            description: "Obtain a PAN from the Income Tax Department. It's necessary for every exporter and importer.",
            link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
            linkText: "Apply for PAN Card",
        },
        {
            "title": "GST LUT",
            "description": "Letter of Undertaking (LUT) is a document that expolters can file to expolt goods or services without having to pay IGST.",
            "link": "https://tutorial.gst.gov.in/userguide/refund/Furnishing_of_Letter_of_Undertaking.html",
            "linkText": "Format of LUT",
        },
        {
            title: "Obtaining Importer-Exporter Code (IEC) Number",
            description: "It's mandatory to obtain IEC for export/import from India. Follow the procedure laid down in Para 2.05 of the FTP, 2015-20.",
            link: "https://www.dgft.gov.in/CP/",
            linkText: "Apply for IEC",
        },
        {
            title: "AD Code",
            description: "Authorized dealer (AD) code is a 14 digit unique code allotted to banks dealing in foreign currency by RBI.",
            link: "https://www.icegate.gov.in/guidelines/ad-code-bank-account-registration-advisory",
            linkText: "More Information",
        },
        {
            title: "Registration cum membership certificate (RCMC)",
            description: "Obtain RCMC granted by the concerned Export Promotion Councils/ FIEO/Commodity Boards/ Authorities to avail authorizations, benefits, concessions, and services under FTP 2015-20.",
            link: "https://www.dgft.gov.in/CP/?opt=e-rcmc",
            linkText: "Apply for e-RCMC",
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
                <h1 className="text-4xl font-bold mb-6 text-center" id="Translatable"> Required Registrations before Starting Export  </h1>
                <p className="text-lg mb-8 text-center max-w-3xl mx-auto" id="Translatable">
                    Export in itself is a very wide concept and lot of preparations is required by an exporter before starting
                    an export business. To start export business, follow these steps:
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
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'; 

export default function TaxDocumentation({ onBack }) {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="inline-flex items-center justify-center px-4 py-2 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        <h1 className="text-4xl font-bold mb-6 text-center" id="Translatable">Tax Documentation</h1>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4" id="Translatable">Tax requirements in India</h2>
              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2" id="Translatable">GST Treatment on Export Sales</h3>
                <p className="text-gray-600 mb-4" id="Translatable">As per Central Board of Indirect taxes & Customs, export of goods from India is treated as GST free subject to certain conditions.</p>
                <p className="text-gray-600 mb-4" id="Translatable">Exporters have 2 options in paying GST:</p>
                <ul className="list-disc list-inside mb-4 text-gray-600" id="Translatable">
                  <li id="Translatable">Export with a Letter of Undertaking (LUT) without payment of IGST</li>
                  <li id="Translatable">Export with payment of IGST and claim a refund after the goods have been exported</li>
                </ul>
                <a href="https://cbic-gst.gov.in/hindi/sectoral-faq.html"  target='blank' className="text-green-400 underline mb-4 block" id="Translatable">View CBEC booklet on GST for Exports here</a>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2" id="Translatable">1. Exports against Letter of Undertaking (LUT)</h3>
                <p className="text-gray-600 mb-4" id="Translatable">Exporters registered under GST are required to generate a Letter of Undertaking (LUT) on GST portal for each financial year. Further, they can generate GST free export invoice and provide the acknowledgement number of generated LUT to their logistic partner. The logistic partner shall file the shipping bill against LUT and shall not show any liability of GST on the sale in the shipping bill.</p>
                <p className="text-gray-600 mb-4" id="Translatable">Any GST paid on the procurement of goods/ raw material for exports can be claimed as input tax credit by the exporter while filing the GST Returns. Exporters can subsequently explore refund of such GST from GST authorities.</p>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2" id="Translatable">2. Exports with payment of IGST (without LUT)</h3>
                <p className="text-gray-600 mb-4" id="Translatable">Without a LUT, exporters are required to show the GST liability on their export invoice and hence it needs to be declared in the shipping bill (filed by the logistic partner). Exporters can claim their input tax credit for the GST paid on the procurement of raw material and adjust it while paying the GST liability on export sales in their GST returns.</p>
                <p className="text-gray-600 mb-4" id="Translatable">After the valid filing of returns and shipping bill, exporters will receive the refund of their GST in full from custom authorities.</p>
              </section>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4" id="Translatable">Sales Tax requirements in USA</h2>
              <section className="mb-6">
                <p className="text-gray-600 mb-4" id="Translatable">Sellers are responsible for understanding the tax policies and any remittance obligations that apply to their business. This includes registering with any applicable tax authorities, setting up applicable tax calculation settings, and/or filing with a tax authority.</p>
                <p className="text-gray-600 mb-4" id="Translatable">For products destined to a state or jurisdiction where Marketplace Tax Collection laws apply, Amazon will calculate, collect, and remit applicable sales tax automatically. Your business may have certain direct tax reporting obligations, such as federal/state/local income tax or state/local gross receipts tax, based on your sales on Amazon’s marketplace, other marketplaces, or direct sales to the US. Amazon is not responsible for reporting those taxes as any direct tax obligation is yours that you must report separately.</p>
                <p className="text-gray-600 mb-4" id="Translatable">For products destined to a state or jurisdiction where Marketplace Tax Collection laws do not apply, Amazon does not automatically calculate, collect, and remit applicable sales tax and any calculation, collection and remittance remains the seller’s responsibility. Amazon provides Tax Calculation Services to professional sellers to assist with their sales tax obligation in instances where it is still their obligation to calculate, collect and remit sales tax.</p>
                <a href="https://sellercentral.amazon.in/spec/taxcompliance/us?clientName=spec_web" className="text-green-400 underline mb-4 block" id="Translatable">Please refer to more details at United States Tax and Regulatory Considerations and Amazon’s tax policies.</a>
                <p className="text-gray-600 mb-4" id="Translatable">Amazon sellers can find the tax paid on their products in Sales Tax information in seller reports (you will need an Amazon seller account to view this page).</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
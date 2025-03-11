import React from "react";

export default function FormData({ formData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Review Your Information</h3>
      <p><strong>Business Name:</strong> {formData.businessName}</p>
      <p><strong>Business Description:</strong> {formData.businessDescription}</p>
      <p>image</p>
      <img src={formData.logoUrl} alt="Logo" className="w-16 h-16 object-cover" />
      <p><strong>Theme Color:</strong> <span style={{ backgroundColor: formData.themeColor }} className="inline-block w-6 h-6 rounded-full"></span></p>
      <p><strong>Theme:</strong> {formData.theme}</p>
      <p><strong>Sections:</strong> {formData.sections.join(", ")}</p>
      <p><strong>Testimonials:</strong> {formData.testimonials}</p>
      <p><strong>Statistics:</strong> {formData.statistics}</p>
      <p><strong>Products File:</strong> {formData.productsFile ? formData.productsFile.name : "No file uploaded"}</p>
      {formData.csvData && (
        <div>
          <h4 className="text-md font-semibold text-gray-700">CSV Data:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  {formData.csvData[0].split(",").map((header, index) => (
                    <th key={index} className="py-2 px-4 border-b border-gray-300">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.csvData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.split(",").map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-4 border-b border-gray-300">
                        {formData.csvData[0].split(",")[cellIndex].trim() === "image" ? (
                          <img src={cell} alt="Product" className="w-16 h-16 object-cover" />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>
        <h4 className="text-md font-semibold text-gray-700">Social Media Links:</h4>
        <p><strong>Facebook:</strong> {formData.socialMediaLinks.facebook}</p>
        <p><strong>Twitter:</strong> {formData.socialMediaLinks.twitter}</p>
        <p><strong>Instagram:</strong> {formData.socialMediaLinks.instagram}</p>
        <p><strong>LinkedIn:</strong> {formData.socialMediaLinks.linkedin}</p>
        <p><strong>Youtube:</strong> {formData.socialMediaLinks.youtube}</p>
        <p><strong>Others:</strong> {formData.socialMediaLinks.others}</p>
      </div>
    </div>
  );
}
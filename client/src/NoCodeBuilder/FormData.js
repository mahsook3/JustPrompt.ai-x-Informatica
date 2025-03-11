import React from "react";
export default function FormData({ formData }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-800 tracking-tight">
        Review Your Information
      </h2>
      {/* Basic Information Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm uppercase text-gray-500 font-medium">Business Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Business Name</label>
                <p className="text-lg font-medium text-gray-800">{formData.businessName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Description</label>
                <p className="text-gray-800 leading-relaxed">{formData.businessDescription}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase text-gray-500 font-medium">Brand Assets</h3>
            <div className="flex items-center gap-4">
              {formData.logoUrl && (
                <div className="relative">
                  <img
                    src={formData.logoUrl}
                    alt="Business Logo"
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-600">Theme Color</label>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    style={{ backgroundColor: formData.themeColor }}
                    className="w-8 h-8 rounded-full shadow-sm border border-gray-200"
                  />
                  <span className="text-sm text-gray-600">{formData.themeColor}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Theme</label>
              <p className="text-gray-800">{formData.theme}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Content Sections */}
      <section className="mb-8">
        <h3 className="text-sm uppercase text-gray-500 font-medium mb-4">Content Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Selected Sections</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.sections.map((section, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {section}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Testimonials</label>
              <p className="text-gray-800">{formData.testimonials}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Statistics</label>
              <p className="text-gray-800">{formData.statistics}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Products Data */}
      {formData.csvData && (
        <section className="mb-8">
          <h3 className="text-sm uppercase text-gray-500 font-medium mb-4">Products Data</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {formData.csvData[0].split(",").map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.csvData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.split(",").map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 whitespace-nowrap">
                        {formData.csvData[0].split(",")[cellIndex].trim() === "image" ? (
                          <img
                            src={cell}
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* Social Media Links */}
      <section>
        <h3 className="text-sm uppercase text-gray-500 font-medium mb-4">Social Media Presence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(formData.socialMediaLinks).map(([platform, link]) => (
            link && (
              <div key={platform} className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm text-gray-600 capitalize mb-1">{platform}</label>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate block"
                >
                  {link}
                </a>
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
}
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import FormDataComponent from "./FormData";
import FormatOfCSV from "./format.csv";
import validateCSV from "./js/validateCSV";
import GenerateCcontent from "./GenerateCcontent";

export default function NoCode() {
  const [step, setStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#ff5722");
  const [showGenerateContent, setShowGenerateContent] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    themeColor: "#ff5722",
    theme: "Light",
    sections: ["Header", "Home", "About", "Contact", "Footer"],
    testimonials: "",
    statistics: "",
    productsFile: null,
    csvData: null,
    logoUrl: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      others: "",
    },
  });

  const navigate = useNavigate();

  const nextStep = async () => {
    if (await validateStep()) {
      if (step < 10) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateStep()) {
      console.log("Form submitted", formData);
      toast.success("Form submitted successfully!");
      setShowGenerateContent(true); // Set flag to show GenerateCcontent
    }
  };

  const handleImageUpload = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);
  
    try {
      const response = await fetch("https://crossintelligence2-50024996332.development.catalystappsail.in/upload-image", {
        method: "POST",
        body: uploadFormData,
      });
  
      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;
        setFormData({ ...formData, logoUrl: imageUrl });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the image");
    }
  };

  const validateStep = async () => {
    switch (step) {
      case 0:
        if (!formData.businessName) {
          toast.error("Business name is required");
          return false;
        }
        break;
      case 1:
        if (!formData.businessDescription) {
          toast.error("Business description is required");
          return false;
        }
        break;
      case 2:
        if (!formData.themeColor) {
          toast.error("Theme color is required");
          return false;
        }
        break;
      case 3:
        if (!formData.theme) {
          toast.error("Theme is required");
          return false;
        }
        break;
      case 4:
        if (formData.sections.length === 0) {
          toast.error("At least one section is required");
          return false;
        }
        break;
      case 5:
        if (!formData.testimonials) {
          toast.error("Testimonials are required");
          return false;
        }
        break;
      case 6:
        if (!formData.statistics) {
          toast.error("Statistics are required");
          return false;
        }
        break;
      case 7:
        if (!formData.productsFile) {
          toast.error("Products file is required");
          return false;
        }
        const csvData = await validateCSV(formData.productsFile);
        if (!csvData) {
          return false;
        }
        setFormData({ ...formData, csvData });
        break;
      case 9:
        if (!formData.logoUrl) {
          toast.error("Logo is required");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What is your business name?
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What are you doing in your business?
            </label>
            <textarea
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Describe your business activities"
              value={formData.businessDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessDescription: e.target.value,
                })
              }
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What is the theme and primary color for the website?
            </label>
            <div className="flex space-x-4 mb-4">
              {["#ff5722", "#bb86fc", "#03dac6", "#eb6de7", "#FF33F3"].map(
                (color) => (
                  <div
                    key={color}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelectedColor(color);
                      setFormData({ ...formData, themeColor: color });
                    }}
                  />
                )
              )}
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  setFormData({ ...formData, themeColor: e.target.value });
                }}
                className="w-12 h-12 rounded-md cursor-pointer"
              />
              <p className="text-gray-700 font-medium">
                Selected Color: {selectedColor}
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Preferred Theme
            </label>
            <select
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What sections do you want on your website?
            </label>
            <section className="flex flex-wrap gap-4">
              {[
                "Header",
                "Home",
                "About",
                "Product List",
                "Stats",
                "Customer Brand",
                "Features",
                "Contact",
                "Call to Action",
                "Testimonials",
                "Footer",
              ].map((section) => (
                <div
                  key={section}
                  className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={formData.sections.includes(section)}
                    onChange={(e) => {
                      const newSections = e.target.checked
                        ? [...formData.sections, section]
                        : formData.sections.filter((s) => s !== section);
                      setFormData({ ...formData, sections: newSections });
                    }}
                  />
                  <label className="text-gray-700">{section}</label>
                </div>
              ))}
            </section>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Can you provide some testimonials from customers?
            </label>
            <textarea
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Enter customer testimonials"
              value={formData.testimonials}
              onChange={(e) =>
                setFormData({ ...formData, testimonials: e.target.value })
              }
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What are the key statistics of your business?
            </label>
            <textarea
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Enter number of customers, products, etc."
              value={formData.statistics}
              onChange={(e) =>
                setFormData({ ...formData, statistics: e.target.value })
              }
            />
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              What products are you selling? Upload CSV we can
              extract it.
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productsFile: e.target.files[0],
                    })
                  }
                />
              </label>
            </div>
            <a
              href={FormatOfCSV}
              download="format.csv"
              className="block mt-4 text-blue-500 underline"
            >
              Download CSV Format
            </a>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Give your Social Media Links
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Facebook"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, facebook: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Twitter"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, twitter: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Instagram"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, instagram: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="LinkedIn"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, linkedin: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Youtube"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, youtube: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Others"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.socialMediaLinks.others}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMediaLinks: { ...formData.socialMediaLinks, others: e.target.value },
                  })
                }
              />
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Upload your logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select an image
                </span>
                <input
  type="file"
  className="hidden"
  onChange={(e) => handleImageUpload(e.target.files[0])}
/>
              </label>
            </div>
          </div>
        );
        case 10:
        return (
          <div className="space-y-4">
          <FormDataComponent formData={formData} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {showGenerateContent ? (
      <GenerateCcontent formData={formData} />
    ) : (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Onboarding Form
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-400 h-2.5 rounded-full"
              style={{ width: `${(step / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              step === 0 ? "invisible" : ""
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {step < 10 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          )}
        </div>
      </div>
          )}
      <ToastContainer />
    </div>
  );
}
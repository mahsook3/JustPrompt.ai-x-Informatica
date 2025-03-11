import React from "react";
import { useNavigate } from "react-router-dom";

import FeaturesGrid2 from "../assets/FeaturesGrid-1.svg";
import FeaturesGrid1 from "../assets/FeaturesGrid-2.svg";
import FeaturesGrid3 from "../assets/FeaturesGrid-3.svg";
import FeaturesGrid4 from "../assets/FeaturesGrid-4.svg";

const features = [
  {
    title: "GENAI-POWERED TOOL",
    heading:
      "Simplify cross-border regulations and government incentives for e-commerce sellers.",
    description:
      "Leverage our GenAl-powered tool to navigate complex international regulations and discover government incentives tailored to your business needs.",
    image: FeaturesGrid1,
    alt: "GenAl-powered tool illustration",
  },
  {
    title: "MARKET RESEARCH",
    heading: "Gain insights with comprehensive market research.",
    description:
      "Access detailed market research reports and analytics to make informed decisions and stay ahead of the competition.",
    image: FeaturesGrid2,
    alt: "Market research illustration",
  },
  {
    title: "INSIGHTS ABOUT TAXATION",
    heading: "Get comprehensive insights about GST and other taxes.",
    description:
      "Leverage our tool to gain detailed insights into GST and other taxation policies. Understand the implications, compliance requirements, and benefits of various tax regimes to make informed decisions.",
    image: FeaturesGrid4,
    alt: "Taxation insights illustration",
  },
  {
    title: "DRAG AND DROP",
    heading: "Easily manage your tasks with drag and drop functionality.",
    description:
      "Streamline your workflow with our intuitive drag and drop interface, making task management simple and efficient.",
    image: FeaturesGrid3,
    alt: "Drag and drop illustration",
  },
  {
    title: "STREAMLINED DOCUMENTATION",
    heading: "Generate accurate, ready-to-submit trade documents.",
    description:
      "Automate the creation of compliant trade documentation, ensuring accuracy and meeting all regulatory requirements for seamless cross-border transactions.",
    alt: "Documentation generation illustration",
  },
];

export default function FeaturesGrid() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* First large card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="grid  gap-4">
            <div className="space-y-4 z-10">
              <h3
                className="text-sm text-gray-500 font-medium uppercase tracking-wider"
                id="Translatable"
              >
                {features[0].title}
              </h3>
              <h2
                className="text-3xl font-bold leading-tight"
                id="Translatable"
              >
                {features[0].heading}
              </h2>
              <p id="Translatable" className="text-gray-500 text-lg">
                {features[0].description}
              </p>

              <div className="lg:my-10 my-6 p-4">
                <div className="flex flex-wrap items-center">
                  {/* ...existing tags... */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Market Research card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="space-y-4 z-10">
            <h3
              className="text-sm text-gray-500 font-medium uppercase tracking-wider"
              id="Translatable"
            >
              {features[1].title}
            </h3>
            <h2 className="text-2xl font-bold leading-tight" id="Translatable">
              {features[1].heading}
            </h2>
            <p className="text-gray-500 text-lg" id="Translatable">
              {features[1].description}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mt-6">
        {/* Taxation Insights card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="space-y-4 z-10 mb-0">
            <h3
              className="text-sm text-gray-500 font-medium uppercase tracking-wider"
              id="Translatable"
            >
              {features[2].title}
            </h3>
            <h2 className="text-2xl font-bold leading-tight" id="Translatable">
              {features[2].heading}
            </h2>
            <p className="text-gray-500 text-lg" id="Translatable">
              {features[2].description}
            </p>
            <img
              src={features[2].image}
              alt={features[2].alt}
              className="w-full h-auto object-contain absolute bottom-0 left-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* Drag and Drop card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="space-y-4 z-10">
              <h3
                className="text-sm text-gray-500 font-medium uppercase tracking-wider"
                id="Translatable"
              >
                {features[3].title}
              </h3>
              <h2
                className="text-2xl font-bold leading-tight"
                id="Translatable"
              >
                {features[3].heading}
              </h2>
              <p className="text-gray-500 text-lg" id="Translatable">
                {features[3].description}
              </p>
            </div>
          </div>
          {/* Streamlined Documentation card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="space-y-4 z-10">
              <h3
                className="text-sm text-gray-500 font-medium uppercase tracking-wider"
                id="Translatable"
              >
                {features[4].title}
              </h3>
              <h2
                className="text-2xl font-bold leading-tight"
                id="Translatable"
              >
                {features[4].heading}
              </h2>
              <p className="text-gray-500 text-lg" id="Translatable">
                {features[4].description}
              </p>
            </div>
          </div>
          {/* CTA card */}
          <div className="bg-green-400 text-white rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <span
              className="text-xl font-semibold text-center sm:text-left"
              id="Translatable"
            >
              Ready to Transform Your Business?
            </span>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-400 px-8 py-3 rounded-full font-medium text-lg hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap"
              id="Translatable"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

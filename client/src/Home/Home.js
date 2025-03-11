import React, { useState } from "react";
import { ChevronRight, Play } from "lucide-react";
import FeaturesGrid4 from "../assets/FeaturesGrid-4.svg";
import Header from "./Header";

const features = [
  {
    title: "BUSINESS INSIGHTS",
    heading: "Make informed decisions with comprehensive market research.",
    description:
      "Leverage AI-powered analytics to gain deep insights into market trends, competitor strategies, and cross-border regulatory compliance. Stay ahead with data-driven decision-making.",
    image: FeaturesGrid4,
    alt: "Business insights illustration",
  },
  {
    title: "ONLINE PRESENCE & WEBSITE BUILDER",
    heading: "Launch your brand online with ease.",
    description:
      "Create a professional online presence with pre-built templates for websites, landing pages, and digital ads. Customize effortlessly and go live in minutes.",
    alt: "Website builder illustration",
  },
  {
    title: "GROW YOUR BUSINESS WITH AI-POWERED VIDEO ADS",
    heading: "Create high-impact ads with AI-driven automation.",
    description:
      "Generate compelling video ads using AI-powered tools. Access pre-built templates, automate content creation, and optimize campaigns for maximum reach and engagement.",
    alt: "AI-powered video ads illustration",
    comingSoon: true,
  },
];

export default function Home({ setActiveComponent }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Modified to directly set the active component to "Business Advisor"
  const handleBusinessAdvisorClick = () => {
    setActiveComponent("Business Advisor");
  };

  return (
    <>
      <Header setActiveComponent={setActiveComponent} />
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-green-50 to-white z-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Business Insights card - main feature */}
          <div
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-green-200 cursor-pointer group z-5"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleBusinessAdvisorClick}
          >
            <div className="absolute top-4 right-4 transition-transform duration-300 group-hover:translate-x-1 z-5">
              <ChevronRight className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-5 z-5 mb-36 lg:mb-48">
              <span id="Translatable" className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                {features[0].title}
              </span>
              <h2 id="Translatable" className="text-2xl md:text-3xl font-bold leading-tight">
                {features[0].heading}
              </h2>
              <p id="Translatable" className="text-gray-600 text-lg">{features[0].description}</p>
              <div className="h-1 w-20 bg-green-400 rounded-full mt-2 transition-all duration-300 group-hover:w-32"></div>
            </div>
            <img
              src={features[0].image}
              alt={features[0].alt}
              className="w-full h-auto object-contain absolute bottom-0 left-0 transform transition-transform duration-500 group-hover:scale-105 z-5"
            />
          </div>

          <div className="flex flex-col gap-8">
            {/* Website Builder card */}
            <div
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-green-200 cursor-pointer group z-5"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveComponent("No code Builder")}
            >
              <div className="absolute top-4 right-4 transition-transform duration-300 group-hover:translate-x-1 z-5">
                <ChevronRight className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-4 z-5">
                <span id="Translatable" className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {features[1].title}
                </span>
                <h2 id="Translatable" className="text-2xl font-bold leading-tight">
                  {features[1].heading}
                </h2>
                <p id="Translatable" className="text-gray-600 text-lg">{features[1].description}</p>
              </div>
            </div>

            {/* AI Video Ads card */}
            <div
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-green-200 cursor-pointer group z-5"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveComponent("Ads")}
            >
              <div className="absolute top-4 right-4 transition-transform duration-300 group-hover:translate-x-1 z-5">
                <ChevronRight className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-4 z-5">
                <span id="Translatable" className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {features[2].title}
                </span>
                <h2 id="Translatable" className="text-2xl font-bold leading-tight">
                  {features[2].heading}
                </h2>
                <p id="Translatable" className="text-gray-600 text-lg">{features[2].description}</p>
                <div className="flex items-center mt-4">
                  <div className="animate-pulse bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center font-semibold">
                    <span className="mr-2">Coming Soon</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <button className="ml-4 text-green-600 hover:text-green-700 underline text-sm">
                    Get notified
                  </button>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md hover:shadow-lg transition-all duration-300 z-5">
              <span id="Translatable" className="text-xl font-semibold text-center sm:text-left">
                Not sure how to get started?
              </span>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="bg-white text-green-500 px-8 py-3 rounded-full font-medium text-lg hover:bg-green-50 transition-colors duration-200 whitespace-nowrap flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {videoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-5 p-4" onClick={() => setVideoModalOpen(false)}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <div className="p-4 flex justify-between items-center border-b">
                <h3 id="Translatable" className="font-bold text-xl">Getting Started Guide</h3>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/hUBCP1Kzpfc"
                  title="Getting Started Guide"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import React from "react";
import FeaturesGrid from "./FeaturesGrid";

export default function Features() {
  const stats = [
    {
      title: "Product categorization and compliance management",
      value: "10L+",
      color: "text-green-600",
    },
    {
      title: "Market research across countries",
      value: "50+",
      color: "text-green-600",
    },
    {
      title: "Drag-and-drop components",
      value: "750+",
      color: "text-green-600",
    },
    {
      title: "Automated documentation",
      value: "13+",
      color: "text-green-600",
    }
  ];

  return (
    <div id="features" className="bg-green-50 :bg-gray-800 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="pt-20">
          {" "}
          <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
            <div className="max-w-xl space-y-3 md:mx-auto">
              <h3 className="text-green-400 font-semibold" id="Translatable">
                WITH AI-POWERED SIMPLICITY
              </h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl" id="Translatable">
                Build your business with JustPrompt
              </p>
              <p className="text-gray-600" id="Translatable">
                Transform your local business into a thriving global presence
                with JustPrompt, It Simplify Cross-Border Regulations and Govt.
                Incentives for Sellers in E-commerce
              </p>
            </div>
            <div className="mt-2 md:mt-0 py-12 pb-6 sm:py-16 lg:pb-24 overflow-hidden">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
                <div className="relative mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                    <svg
                      className="w-full"
                      xmlns="http://www.w3.org/2000/svg"
                      width={875}
                      height={48}
                      viewBox="0 0 875 48"
                      fill="none"
                    >
                      <path
                        d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                        stroke="#D4D4D8"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeDasharray="1 12"
                      />
                    </svg>
                  </div>
                  <div className="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-12">
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white :bg-gray-800 border-2 border-gray-200 :border-gray-700 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700 :text-gray-200">
                          1
                        </span>
                      </div>
                      <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 :text-white md:mt-10" id="Translatable">
                        Tell Us About Your Business
                      </h3>
                      <p className="mt-3 sm:mt-4 text-base text-gray-600 :text-gray-400" id="Translatable">
                        Answer a few simple questions, and we'll handle the rest
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white :bg-gray-800 border-2 border-gray-200 :border-gray-700 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700 :text-gray-200">
                          2
                        </span>
                      </div>
                      <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 :text-white md:mt-10" id="Translatable">
                        Understand Regulations and Incentives
                      </h3>
                      <p className="mt-3 sm:mt-4 text-base text-gray-600 :text-gray-400" id="Translatable">
                        Discover cross-border regulations and government
                        incentives tailored to your products.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white :bg-gray-800 border-2 border-gray-200 :border-gray-700 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700 :text-gray-200">
                          3
                        </span>
                      </div>
                      <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 :text-white md:mt-10" id="Translatable">
                        Start Selling
                      </h3>
                      <p className="mt-3 sm:mt-4 text-base text-gray-600 :text-gray-400" id="Translatable">
                        Export your products worldwide and grow your business
                        effortlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-5xl text-center"></div>
      </div>
      <FeaturesGrid />
      <div className="mt-10 bg-white pb-12 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-green-50" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl"> {/* Increased max width */}
              <dl className="rounded-lg bg-white :bg-gray-800 shadow-lg sm:grid sm:grid-cols-4"> {/* Changed to 4 columns */}
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      index !== stats.length - 1
                        ? "border-b border-gray-100 :border-gray-700 sm:border-0 sm:border-r"
                        : ""
                    } p-6 text-center`}
                  >
                    <dt className="order-2 mt-2 text-lg font-normal leading-6 text-gray-500 :text-gray-300">
                      {stat.title}
                    </dt>
                    <dd
                      className={`order-1 text-5xl font-bold tracking-tight ${stat.color} :text-green-400`}
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

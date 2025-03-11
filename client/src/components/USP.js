import React from "react";
import usp from "../assets/stepper.svg";

export default function USP() {
  const data = [
    { text: "GenAI-Powered Tool to Simplify Cross-Border Regulations and Govt. Incentives for Sellers in E-commerce." },
    { text: "Create your own online page in minutes." },
    { text: "Show your products to the world." },
    { text: "Drag-and-drop interface for easy creation." },
    { text: "Pre-built templates for various industries." },
    { text: "Real-time analytics and engagement tools." },
    { text: "24/7 customer support and forum." },
    { text: "Smart International Business Advisors." }
  ];

  return (
    <>
      <div id="about">
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 id="Translatable" className="text-base font-semibold leading-7 text-green-500">
                    Your business, your way
                  </h2>
                  <p id="Translatable" className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Why Choose JustPrompt?
                  </p>
                  <p id="Translatable" className="mt-6 text-lg leading-8 text-gray-600">
                    JustPrompt empowers small and medium-scale
                    businesses to global trade without
                    needing extensive knowledge or high expenses. Our
                    platform offers:
                  </p>

                  <div>
                    <ul className="mt-8 space-y-3 font-medium">
                      {data.map((item, index) => (
                        <li
                          className={`flex items-start ${
                            index !== 0 ? "mt-5" : ""
                          } lg:col-span-1 lg:mt-0`}
                          key={index}
                        >
                          <div className="flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p id="Translatable" className="ml-3 leading-5 text-gray-600">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <img
                src={usp}
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
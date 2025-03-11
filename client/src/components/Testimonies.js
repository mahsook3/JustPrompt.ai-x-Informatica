import React from "react";

const testimoniesData = [
  {
    name: "Rahul Sharma",
    title: "Owner of Sharma Electronics",
    text: "JustPrompt has been a game-changer for my business. The easy-to-use drag-and-drop interface allowed me to create a professional website in just a few hours without any coding knowledge. My online sales have increased significantly since I started using the platform. Highly recommended!",
  },
  {
    name: "Priya Nair",
    title: "Founder of Priya’s Boutique",
    text: "Before JustPrompt, I was struggling to establish an online presence for my boutique. The pre-built templates and seamless integration with social media have made it so much easier for me to reach new customers. The customer support team is also very responsive and helpful. I couldn’t be happier with the results!",
  },
  {
    name: "Arjun Singh",
    title: "Entrepreneur and Startup Founder",
    text: "As a startup founder, I needed a cost-effective solution to launch my online store quickly. JustPrompt provided exactly what I needed. The real-time analytics and customer engagement tools have given me valuable insights into my customers' behavior. This platform has exceeded my expectations.",
  },
  {
    name: "Neha Gupta",
    title: "Owner of Neha’s Café",
    text: "Creating a website seemed daunting, but JustPrompt made the process incredibly simple. The user-friendly platform and beautiful templates allowed me to set up my café’s website effortlessly. The real-time analytics have been especially useful in understanding my customers’ preferences and improving my services. JustPrompt is a must-have for any small business owner!",
  },
];

export default function Testimonies() {
  return (
    <section id="testimonies" className="py-20 bg-white">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60" id="Translatable">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold text-green-400 md:text-center md:text-5xl" id="Translatable">
              It's not just us.
            </h1>
            <p id="Translatable" className="text-xl text-gray-800 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-10 mt-20 px-4">
          {testimoniesData.map((testimony, index) => (
            <div
              key={index}
              className="hover:shadow-indigo-300 hover:shadow-lg rounded-lg border flex flex-col"
            >
              <div className="flex justify-center items-start flex-col p-5 flex-grow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="icon icon-tabler icon-tabler-quote rotate-180 text-green-400"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"></path>
                </svg>
                <div className="flex justify-center items-start flex-col text-left gap-5">
                  <p className="text-base">{testimony.text}</p>
                  <div>
                    <h3 className="text-base font-semibold">
                      {testimony.name}
                    </h3>
                    <p className="text-base">{testimony.title}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-400 p-0.5 rounded-b-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

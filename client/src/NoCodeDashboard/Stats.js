// Stats.js
import React, { useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { FaFile } from "react-icons/fa6";
import { RiFlowChart } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link component

const Stats = ({ totalCount, liveProductsCount, flowBuilderCount, questionnaireCount }) => {
  const cards = [
    {
      title: "Instant Website Making",
      description: "Drag and drop interface for developing complete SDLC solutions on an LCNC platform, from prototyping to deployment.",
      link: "/builder/instantpresent",
      icon: <FiFilePlus className="text-white text-2xl" /> // Make icon white and larger
    },
    {
      title: "Flowchart Builder",
      description: "Create flowcharts for SDLC solutions on an LCNC platform, from prototyping to deployment.",
      link: "/builder/flow",
      icon: <RiFlowChart className="text-white text-2xl" /> // Make icon white and larger
    },
    {
      title: "Doc Builder",
      description: "Upload documents for developing complete SDLC solutions on an LCNC platform, from prototyping to deployment.",
      link: "/builder/chatdoc",
      icon: <FaFile className="text-white text-2xl" /> // Make icon white and larger
    }
  ];

  return (
    <>
      <section className="flex flex-col mt-20">
        <div className="relative inline-block mb-10">
          <h1 className="font-semibold text-2xl md:text-3xl text-center">
            <span className="relative">
              No code
              <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-1/2 left-0 h-[0.58em] w-full fill-green-500/70" preserveAspectRatio="none">
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
            </span> {" "}
            No Problem
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-slate-400 sm:mt-5 md:mt-5">
            Track your progress and see how many websites, flow builders and questionnaires you have created.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10"
            >
              <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-green-400 transition-all duration-300 group-hover:scale-[10]" />
              <div className="relative z-10 mx-auto max-w-md">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-green-400 transition-all duration-300 group-hover:bg-green-300">
                  {card.icon}
                </span>
                <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <p>
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Stats;
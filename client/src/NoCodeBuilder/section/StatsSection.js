import React from "react";

export default function StatsSection({ stats }) {
  if (!stats) {
    return null;
  }
  return (
    <section className="mt-8 flex gap-x-4 sm:justify-center">
      <div>
        <div className="mx-auto lg:mx-0 p-6 sm:p-8 py-8 sm:py-10 max-w-5xl rounded-3xl bg-box-bg border border-box-border shadow-lg shadow-box-shadow md:divide-x divide-box-border grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-8 lg:gap-14">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">
                {stat.value}
              </h2>
              <p className="mt-2 text-heading-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
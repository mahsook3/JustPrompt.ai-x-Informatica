import React from "react";

// Utility function to determine if a color is light
function isLightColor(color) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

export default function AboutUsSection({ aboutUs, primaryColor }) {
  const textColor = isLightColor(primaryColor) ? 'text-black' : 'text-white';
  if (!aboutUs) {
    return null;
  }

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block">
            <img
              src={aboutUs.image.src}
              className="md:max-w-lg sm:rounded-lg"
              alt={aboutUs.image.alt}
            />
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="font-semibold" style={{ color: primaryColor }}>
              {aboutUs.title}
            </h3>
            <p className="text-3xl font-semibold sm:text-4xl">
              {aboutUs.subtitle}
            </p>
            <p className="mt-3">
              {aboutUs.description}
            </p>
            <a
              href="javascript:void(0)"
              className={`inline-flex gap-x-1 items-center font-medium duration-150 ${textColor}`}
              style={{ color: primaryColor }}
            >
              {aboutUs.linkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
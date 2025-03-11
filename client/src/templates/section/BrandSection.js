import React from "react";

export default function BrandSection({ brands }) {
  if (!brands) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5 mt-20 mb-20">
      {brands.map((brand, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1"
        >
          <img src={brand.src} alt={brand.alt} className="h-12" />
        </div>
      ))}
    </div>
  );
}
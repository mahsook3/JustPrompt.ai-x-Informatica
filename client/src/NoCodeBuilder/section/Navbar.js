import React from "react";
import { Menu, X } from "lucide-react";

function isLightColor(color) {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  }

export default function Navbar({ logo, navigation, isOpen, setIsOpen, primaryColor }) {
  const textColor = isLightColor(primaryColor) ? "text-gray-900" : "text-white";

  if (!navigation) {
    return null;
  }

  return (
    <nav className="border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="#">
            <img
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.alt}
            />
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.path}
                  className="block"
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = 1;
                    e.target.style.color = "";
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                <a
                  href="#"
                  className={`block py-3 text-center border rounded-lg md:border-none`}
                  style={{ transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = 0.7;
                    e.target.style.color = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = 1;
                    e.target.style.color = "";
                  }}
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block py-3 px-4 font-medium text-center rounded-lg shadow md:inline test-white`}
                  style={{ backgroundColor: primaryColor, transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
                  onMouseLeave={(e) => (e.target.style.opacity = 1)}
                >
                  Sign up
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
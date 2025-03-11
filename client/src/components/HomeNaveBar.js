import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Translator from "../CrossResults/Translator";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { title: "Home", path: "#home" },
    { title: "Features", path: "#features" },
    { title: "About", path: "#about" },
    { title: "Testimonies", path: "#testimonies" },
    { title: "Pricing", path: "#pricing" },
    { title: "Contact", path: "#contact" },
  ];

  const handleScroll = (e, path) => {
    e.preventDefault();
    const section = document.querySelector(path);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = navigation.map((navItem) =>
        document.querySelector(navItem.path)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navigation[i].path);
          break;
        }
      }

      setHasScrolled(window.scrollY > 50); // Translator disappears after 50px scroll
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <>
      {/* Translator appears only at the top */}
      {!hasScrolled && (
        <div className="fixed top-2 right-4 z-50">
          <Translator />
        </div>
      )}

      {/* Navbar now moves up when scrolled */}
      <nav
        className={`bg-white fixed left-0 right-0 w-full z-40 transition-all duration-300 shadow-md ${
          hasScrolled ? "top-0" : "top-10"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto py-2.5">
          <Link to="/" className="flex items-center">
            <p className="text-2xl font-bold text-green-400">
              Just
              <span className="text-gray-700">Prompt.ai</span>
            </p>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              id="Translatable"
              className="bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none text-white"
            >
              Get Started
            </Link>
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navigation.map((navItem, index) => (
                <li key={index}>
                  <Link
                    to={navItem.path}
                    onClick={(e) => handleScroll(e, navItem.path)}
                    id="Translatable"
                    className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 text-gray-700 ${
                      activeSection === navItem.path
                        ? "font-bold text-green-400"
                        : ""
                    }`}
                  >
                    {navItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
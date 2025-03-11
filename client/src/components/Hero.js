import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { motion } from "framer-motion";
import { ShoppingBag, Globe, ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('modal-background')) {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-green-50" id="home">
      <div className="absolute inset-0 opacity-70"></div>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
        <div className="w-full mx-auto text-center">
          <motion.p
            className="mb-4 text-sm font-semibold tracking-widest text-green-600 uppercase flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simplify International Expansion with GenAI
          </motion.p>
          <motion.h1
            className="mb-8 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>Transform Local Businesses into</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Global Success
            </span>
          </motion.h1>
          <motion.p
            className="px-0 mb-12 text-lg text-gray-600 md:text-xl lg:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            We empower businesses to break barriers and expand into international markets with ease
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
                        <Link
              to="/login" // Update this path according to your routing needs
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-400 rounded-full hover:bg-green-500 transition-colors duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Get Start
              <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <button
              onClick={toggleModal}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white border-2 border-green-500 rounded-full hover:bg-green-50 transition-colors duration-300 ease-in-out shadow-lg hover:scale-105"
            >
              Watch Demo
              <Play className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-background" onClick={handleCloseModal}>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button className="absolute top-4 right-4 text-gray-600" onClick={toggleModal}>
              <FaTimes />
            </button>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XNejlBcillc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
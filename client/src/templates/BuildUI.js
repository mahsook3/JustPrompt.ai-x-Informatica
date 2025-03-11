"use client"

import { useState } from "react"
import { Pencil, Sun, Moon, Palette, Globe } from "lucide-react"
import Navbar from "./section/Navbar"
import HeroSection from "./section/HeroSection"
import StatsSection from "./section/StatsSection"
import BrandSection from "./section/BrandSection"
import FeaturedComponents from "./section/FeaturedComponents"
import ProductsList from "./section/ProductsList"
import AboutUsSection from "./section/AboutUsSection"
import CTASection from "./section/CTASection"
import TestimonialsSection from "./section/TestimonialsSection"
import Footer from "./section/Footer"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function BuildUI({ content }) {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(content.theme)
  const [isAsideOpen, setIsAsideOpen] = useState(true)

  const { navigation, logo, hero, stats, brands, features, aboutUs, cta, testimonialsSection, footer } = content

  const bgColor = theme.dark ? "bg-gray-900" : "bg-white"
  const textColor = theme.dark ? "text-gray-100" : "text-gray-900"

  const handleMakeItLive = async () => {
    try {
      const response = await axios.post(
        "https://crossintelligence2-50024996332.development.catalystappsail.in/post-template-details",
        { ...content, theme },
      )
      if (response.status === 200 && response.data.success) {
        const liveUrl = `https://justprompt.vercel.app/public/${response.data.insertedId}`
        navigator.clipboard.writeText(liveUrl)
        toast.success("Template is live! URL copied to clipboard.")
        setTimeout(() => {
          window.location.href = liveUrl
        }, 2000)
      } else {
        toast.error("Failed to make the template live.")
        console.error(response.data.message)
      }
    } catch (error) {
      toast.error("An error occurred while making the template live.")
    }
  }

  const handleThemeChange = () => {
    setTheme((prevTheme) => ({ ...prevTheme, dark: !prevTheme.dark }))
  }

  const handlePrimaryColorChange = (e) => {
    setTheme((prevTheme) => ({ ...prevTheme, primaryColor: e.target.value }))
  }

  return (
    <div className={`${bgColor} ${textColor} min-h-screen flex`}>
      {/* Mockup */}
      <div className="flex-1 overflow-y-auto">
        <Navbar
          logo={logo}
          navigation={navigation}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          theme={theme.dark}
          primaryColor={theme.primaryColor}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32">
          {[
            {
              Component: HeroSection,
              props: { hero, primarybutton: hero.primarybutton, secondarybutton: hero.secondarybutton },
            },
            { Component: StatsSection, props: { stats } },
            { Component: BrandSection, props: { brands } },
            { Component: FeaturedComponents, props: { features } },
            { Component: ProductsList, props: { products: content.products } },
            { Component: AboutUsSection, props: { aboutUs } },
            { Component: CTASection, props: { cta } },
            { Component: TestimonialsSection, props: { testimonialsSection } },
          ].map(({ Component, props }, index) => (
            <section key={index} className="mb-16 relative">
              <Component {...props} theme={theme.dark} primaryColor={theme.primaryColor} />
              <Pencil className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" />
            </section>
          ))}
        </main>

        <Footer footer={footer} theme={theme.dark} primaryColor={theme.primaryColor} logo={logo} />
      </div>

      {/* Main Menu */}
      <aside
        className={`${isAsideOpen ? "w-64" : "w-16"} bg-gray-800 text-white py-4 px-4 sticky top-0 h-screen transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold ${isAsideOpen ? "block" : "hidden"}`}>BuildUI</h1>
          <button
            onClick={() => setIsAsideOpen(!isAsideOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {isAsideOpen ? "←" : "→"}
          </button>
        </div>
        <div className="flex flex-col space-y-6 flex-grow">
          <div className={`flex items-center space-x-4 ${isAsideOpen ? "" : "justify-center"}`}>
            <button
              onClick={handleThemeChange}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              title={theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme.dark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {isAsideOpen && <span>{theme.dark ? "Dark Mode" : "Light Mode"}</span>}
          </div>
          <div className={`flex items-center space-x-4 ${isAsideOpen ? "" : "justify-center"}`}>
            <Palette size={24} />
            {isAsideOpen && (
              <input
                type="color"
                value={theme.primaryColor}
                onChange={handlePrimaryColorChange}
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                title="Choose Primary Color"
              />
            )}
          </div>
        </div>
        <button
          onClick={handleMakeItLive}
          className={`${isAsideOpen ? "w-full" : "w-12 h-12"} bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out flex items-center justify-center`}
          title="Make it Live"
        >
          {isAsideOpen ? "Make it Live" : <Globe size={24} />}
        </button>
      </aside>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}


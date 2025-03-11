'use client'

import { useState } from 'react'

export default function Footer({ footer, theme, primaryColor, logo }) {
  const [emailInput, setEmailInput] = useState('')

  if (!footer) {
    return null
  }

  const footerStyle = theme
    ? { background: 'linear-gradient(to right, #1a202c, #2d3748, #1a202c)' }
    : { background: `linear-gradient(to right, #1a202c, #2d3748, #1a202c)` }

  const textClass = theme ? 'text-gray-300' : 'text-gray-300'
  const titleClass = theme ? 'text-white' : 'text-white'
  const aClass = theme ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
  const inputClass = theme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
  const buttonClass = theme
    ? 'bg-blue-500 hover:bg-blue-600 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white'

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription logic here
    console.log('Subscribed:', emailInput)
    setEmailInput('')
  }

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8" style={footerStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo?.src || "/placeholder.svg"} alt={logo?.alt || "Logo"} width={96} height={96} className="mb-4" />
            <p className={`text-sm ${textClass} text-center md:text-left mb-4`}>
              {footer.description}
            </p>
            <span className={`text-sm ${textClass}`}>
              © {new Date().getFullYear()} {footer.companyName}. All Rights Reserved.
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className={`text-lg font-semibold ${titleClass} mb-4`}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {footer.sections?.map((section, index) => (
                <li key={index}>
                  <a
                    href={section.href}
                    className={`text-sm ${aClass} transition duration-150 ease-in-out`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

{/* Contact Section */}
<div className="flex flex-col items-center md:items-start">
  <h3 className={`text-lg font-semibold ${titleClass} mb-4`}>
    Get in Touch
  </h3>
  <p className={`text-sm ${textClass} mb-2 text-center md:text-left`}>
    {footer.contact?.description}
  </p>
  <a
    href={`mailto:${footer.contact?.email}`}
    className="text-sm font-medium text-blue-500 hover:underline transition duration-150 ease-in-out mb-4"
  >
    {footer.contact?.email}
  </a>
  <div className="flex justify-center md:justify-start mt-4 space-x-4">
    {footer.socialLinks?.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className={`${aClass} transition duration-150 ease-in-out`}
        aria-label={link.iconName}
      >
        <span className="material-icons text-2xl">
          {link.iconName}
        </span>
      </a>
    ))}
  </div>
</div>
        </div>
      </div>
    </footer>
  )
}
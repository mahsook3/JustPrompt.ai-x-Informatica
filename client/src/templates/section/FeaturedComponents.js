"use client"
import { motion } from "framer-motion"

// Utility function to determine if a color is light
function isLightColor(color) {
  const hex = color.replace("#", "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

export default function Featuredfeatures({ features, primaryColor }) {
  const iconColor = isLightColor(primaryColor) ? "text-gray-800" : "text-white"

  if (!features) {
    return null
  }

  return (
    <section className="">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {features.title}
          </motion.h1>
          <motion.div
            className="mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block w-40 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="inline-block w-3 h-1 ml-1 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="inline-block w-1 h-1 ml-1 rounded-full" style={{ backgroundColor: primaryColor }} />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full ${iconColor}`}
                style={{ backgroundColor: primaryColor }}
              >
                <span className="material-icons text-2xl">{feature.icon}</span>
              </div>
              <h2 className="mt-8 text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h2>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
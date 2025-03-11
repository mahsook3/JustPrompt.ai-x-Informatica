// Utility function to determine if a color is light
function isLightColor(color) {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  }
  
  export default function CTASection({ cta, primaryColor }) {
    const textColor = isLightColor(primaryColor) ? "text-gray-900" : "text-white"
    const secondaryTextColor = isLightColor(primaryColor) ? "text-gray-600" : "text-gray-300"
    if (!cta) {
      return null
    }
  
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: primaryColor }}
            >
              {cta.title}
            </h2>
            <p className={`max-w-2xl mx-auto text-xl ${secondaryTextColor}`}>{cta.description}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {cta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`
                    inline-flex items-center justify-center px-6 py-3 border border-transparent 
                    text-base font-medium rounded-md shadow-sm transition duration-300 ease-in-out
                    ${textColor} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 4px 6px rgba(${Number.parseInt(primaryColor.slice(1, 3), 16)}, ${Number.parseInt(primaryColor.slice(3, 5), 16)}, ${Number.parseInt(primaryColor.slice(5, 7), 16)}, 0.1)`,
                  }}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
          />
          <div
            className="absolute right-0 bottom-0 w-64 h-64 translate-x-1/4 translate-y-1/4 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
          />
        </div>
      </section>
    )
  }
  
  
import { ArrowRight } from "lucide-react"

// Utility function to determine if a color is light
function isLightColor(color) {
  const hex = color.replace("#", "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

export default function HeroSection({ hero, primaryColor, primarybutton, secondarybutton }) {
  const textColor = isLightColor(primaryColor) ? "text-gray-900" : "text-white"
  const secondaryTextColor = isLightColor(primaryColor) ? "text-gray-900" : "text-gray-300"

  if (!hero) {
    return null
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="block">{hero.title}</span>
          </h1>
          <p className={`mx-auto max-w-md text-base ${secondaryTextColor} sm:text-lg md:mt-5 md:max-w-3xl md:text-xl`}>
            {hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a
              href={primarybutton.href}
              style={{ backgroundColor: primaryColor }}
              className={`rounded-md px-5 py-3 text-base font-medium ${textColor} shadow-md transition duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {primarybutton.text}
              <ArrowRight className="ml-2 -mr-1 inline-block h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={secondarybutton.href}
              style={{ color: primaryColor, borderColor: primaryColor }}
              className={`rounded-md px-5 py-3 text-base font-medium bg-transparent border-2 transition duration-300 ease-in-out hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {secondarybutton.text}
              <ArrowRight className="ml-2 -mr-1 inline-block h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div
          style={{ backgroundColor: primaryColor }}
          className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-45 rounded-3xl blur-2xl opacity-20 lg:opacity-30"
        />
        <div
          style={{ backgroundColor: primaryColor }}
          className="absolute right-4 bottom-12 w-24 h-24 rounded-full blur-2xl opacity-20 lg:opacity-30"
        />
        <div
          style={{ background: `linear-gradient(to top right, ${primaryColor}, #4ade80)` }}
          className="absolute -top-5 left-1/4 w-1/3 aspect-square rounded-full skew-y-12 blur-3xl opacity-20 rotate-90"
        />
      </div>
    </section>
  )
}
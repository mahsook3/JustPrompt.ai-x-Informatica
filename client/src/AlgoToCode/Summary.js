"use client"

import ReactMarkdown from "react-markdown"
import { Loader2, Play } from 'lucide-react'

export default function Summary({ summary, searchResults, loading, debug, debugLoading, code }) {
  console.log("searchResults", searchResults)
  
  function handleDebug() {
    debug(code)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="flex gap-4 p-4">
                {searchResults.map((result, index) => (
                  <a
                    key={index}
                    href={result.answers[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                      <img
                        src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
                        alt="Stack Overflow Logo"
                        className="h-6 w-auto mb-2"
                      />
                      <h3 className="text-sm font-semibold line-clamp-2">{result.question}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="absolute left-0 bottom-0 h-1.5 w-full bg-gray-200 dark:bg-gray-600">
            </div>
          </div>
        )}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Summary</h2>
          </div>
        </div>
        <div className="p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ReactMarkdown className="prose dark:prose-invert max-w-none">
              {summary}
            </ReactMarkdown>
          )}
        </div>
        <div className="p-4">
          <button
            onClick={handleDebug}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200 flex items-center"
            disabled={debugLoading} // Prevent clicking while already debugging
          >
            {debugLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Debugging
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Debug
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
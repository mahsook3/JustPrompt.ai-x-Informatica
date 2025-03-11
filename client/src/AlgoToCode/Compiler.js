import React, { useState } from "react"
import Editor from "@monaco-editor/react"
import { Loader2, Play, Sun, Moon, Trash2 } from 'lucide-react'
import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Summary from './Summary'

export default function Compiler({ code: initialCode, language, expectedOutput: initialExpectedOutput }) {

  const [code, setCode] = useState(initialCode)
  const [userInput, setUserInput] = useState("")
  const [userOutput, setUserOutput] = useState("")
  const [expectedOutput, setExpectedOutput] = useState(initialExpectedOutput)
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [correctingError, setCorrectingError] = useState(false)
  const [debugLoading, setDebugLoading] = useState(false)
  const [debugging, setDebugging] = useState(false)

  const options = {
    fontSize: 16,
  }

  function compile() {
    setLoading(true)
    axios.post(`https://justpromptaiagent-50024178798.development.catalystappsail.in/compile`, {
      code: code || "",
      input: userInput,
      language: language,
    })
      .then((res) => {
        setUserOutput(res.data.stdout || res.data.stderr)
      })
      .catch((err) => {
        console.error(err)
        setUserOutput(
          "Error: " + (err.response ? err.response.data.error : err.message)
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function debug() {
    console.log("Debugging started")
    setDebugLoading(true)
    setDebugging(true)

    const requestBody = {
      input: userInput,
      output: userOutput,
      expectedOutput: expectedOutput,
      code: code,
      summary: summary, // Pass summary to the API request
    }

    axios.post(`https://justpromptaiagent-50024178798.development.catalystappsail.in/debug`, requestBody)
      .then((res) => {
        const { changes, updatedCode } = res.data
        setCode(updatedCode)
        toast.success(changes || "Code updated successfully.")
      })
      .catch((err) => {
        console.error(err)
        toast.error(
          "Error: " + (err.response ? err.response.data.error : err.message)
        )
      })
      .finally(() => {
        console.log("Debugging finished")
        setDebugLoading(false) // Ensure this is executed
        setDebugging(false)    // Ensure this is executed
      })
  }

  function clearOutput() {
    setUserOutput("")
  }

  function correctError() {
    setCorrectingError(true)
    setSummary("")
    setSearchResults([])
    setShowSummary(false)

    axios.post(`https://justpromptaiagent-50024178798.development.catalystappsail.in/ultra-debug`, { error: userOutput })
      .then((res) => {
        setSummary(res.data.summary)
        setSearchResults(res.data.searchResults)
        setShowSummary(true)
      })
      .catch((err) => {
        console.error(err)
        toast.error("Error: " + (err.response ? err.response.data.error : err.message))
      })
      .finally(() => {
        setCorrectingError(false)
      })
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">Code Compiler</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Language: {language}</span>
            <button
              onClick={compile}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {loading ? "Running..." : "Run"}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>
        <main className="flex-grow flex p-4 space-x-4">
          <div className={`${showSummary ? 'w-1/2' : 'w-1/2'}`}>
            <Editor
              options={options}
              height="100%"
              language={language}
              value={code}
              theme={darkMode ? 'vs-dark' : 'vs-light'}
              onChange={(value) => setCode(value || "")}
              className="border rounded-md overflow-hidden"
            />
          </div>
          <div className={`flex flex-col space-y-4 ${showSummary ? 'w-1/5' : 'w-1/2'}`}>
            <div className="flex-grow flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Input</h2>
              <textarea
                className="flex-grow resize-none p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
              />
            </div>
            <div className="flex-grow flex flex-col relative">
              <h2 className="text-lg font-semibold mb-2">Output</h2>
              <textarea
                className="flex-grow resize-none p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
                value={userOutput}
                readOnly
              />
              {userOutput && (
                <button
                  className="absolute bottom-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                  onClick={clearOutput}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              {userOutput.includes("Error:") && (
                <button
                  className="absolute bottom-2 left-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                  onClick={correctError}
                  disabled={correctingError}
                >
                  {correctingError ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Correct it"
                  )}
                </button>
              )}
            </div>
            <div className="flex-grow flex flex-col">
              <h2 className="text-lg font-semibold mb-2">Expected Output</h2>
              <textarea
                className="flex-grow resize-none p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
                onChange={(e) => setExpectedOutput(e.target.value)}
                value={expectedOutput}
              />
            </div>
          </div>
          {showSummary && (
            <div className="w-3/10 flex flex-col space-y-4">
              <Summary summary={summary} searchResults={searchResults} loading={correctingError} debug={debug} debugLoading={debugLoading} code={code} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
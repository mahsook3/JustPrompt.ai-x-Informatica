import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pdfToText from "react-pdftotext";
import { ResponseContext } from "./ResponseContext";

function UploadFile({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(".");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const { response, setResponse } = useContext(ResponseContext);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingText((prev) => (prev.length < 3 ? prev + "." : "."));
      }, 500);
    } else {
      setLoadingText(".");
    }
    return () => clearInterval(interval);
  }, [loading]);

  function extractText(event) {
    const file = event.target.files[0];
    setFileName(file.name);
  }

  function handleSubmit() {
    const fileInput = document.getElementById("photo-dropbox");
    const file = fileInput.files[0];
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    if (file) {
      setLoading(true);
      setResponse(null);
  
      pdfToText(file)
        .then((text) => {
          console.log("Extracted text:", text); // Log extracted text to console
  
          // Send POST request to the server
          fetch("https://genai-jp.onrender.com/generateProject", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Server response:", data);
              setResponse(data); // Store the server response in the context
              console.log("Context after setting response:", data); // Log context after setting response
              setLoading(false);
            })
            .catch((error) => {
              console.error("Failed to send text to server", error);
              toast.error("Failed to send text to server");
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Failed to extract text from PDF", error);
          toast.error("Failed to extract text from PDF");
          setLoading(false);
        });
    } else {
      toast.error("Please select a file first.");
    }
  }


  return (
    <>
      <div className="w-full bg-white p-8 rounded-lg shadow-lg border-dotted border-4 border-gray-300 mt-20">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-400">
          Upload your Resume
        </h1>
        <label className="flex flex-col items-center cursor-pointer justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-sm transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
          <span className="flex items-center space-x-2 mb-4">
            <svg className="h-8 w-8 text-gray-400" viewBox="0 0 256 256">
              <path
                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <path
                d="M80,128a80,80,0,1,1,144,48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <polyline
                points="118.1 161.9 152 128 185.9 161.9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <line
                x1={152}
                y1={208}
                x2={152}
                y2={128}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
            </svg>
            <span className="text-gray-600">
              <span className="text-green-400 underline">
                {fileName || "Select a file"}
              </span>
            </span>
          </span>
          <input
            id="photo-dropbox"
            type="file"
            accept="application/pdf"
            onChange={extractText}
            className="sr-only"
          />
        </label>
        <button
          className="
            group
            mt-6
            p-5
            cursor-pointer 
            relative  
            text-xl 
            font-normal 
            border-0 
            flex 
            items-center 
            justify-center
            bg-green-400
            text-white 
            h-auto  
            w-full  
            rounded-lg
            overflow-hidden   
            transition-all
            duration-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          <span
            className="group-hover:w-full
              absolute 
              left-0 
              h-full 
              w-5 
              border-y
              border-l
              border-green-400
              transition-all
              duration-500"
          ></span>
          <p
            className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
              duration-200"
          >
            {loading ? "Please wait" : "Try Now"}
          </p>
          <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
            {loading ? "Processing..." : "Upload"}
          </span>
          <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-green-400 transition-all duration-500"></span>
        </button>
      </div>

      <ToastContainer />
    </>
  );
}

export default UploadFile;
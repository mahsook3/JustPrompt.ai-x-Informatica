import React, { useState, useEffect, useContext, useRef } from "react";
import { ResponseContext } from "./ResponseContext";
import Loading from "../components/LoadingwithText";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FaEye, FaEyeSlash, FaMagic } from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";
import { RiSave2Line, RiSave2Fill } from "react-icons/ri";
import { CodeBlock, dracula } from "react-code-blocks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CodeDisplay() {
  const { response } = useContext(ResponseContext);
  const [loading, setLoading] = useState(true);
  const [generatedCodes, setGeneratedCodes] = useState(null);
  const [copiedFile, setCopiedFile] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [improving, setImproving] = useState(false);
  const [editableCode, setEditableCode] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputBoxRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Response context:", response);
      const responseString = JSON.stringify(response);
  
      // Step 1: Generate the project plan
      const projectRes = await fetch("https://genai-jp.onrender.com/generateProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: responseString }),
      });
  
      const projectData = await projectRes.json();
  
      if (!projectData.plan) {
        throw new Error("Failed to generate project plan");
      }
  
      const { plan } = projectData;
  
      // Step 2: Generate the code for each file
      const fileDetailsList = plan.steps.find(step => step.step === "Files")?.details || [];
      if (fileDetailsList.length === 0) {
        throw new Error("No file details provided in the plan");
      }
  
      let combinedResults = [];
  
      for (let i = 0; i < fileDetailsList.length; i++) {
        const currentFileDetails = fileDetailsList[i];
        const currentFiles = combinedResults;
        const requestBody = {
          plan: {
            ...plan,
            steps: [
              ...plan.steps.filter(step => step.step !== "Files"),
              { step: "Files", details: [currentFileDetails] },
            ],
          },
          files: currentFiles,
        };
  
        let result = null;
        let attempts = 0;
  
        // Retry up to 3 times
        while (result === null && attempts < 3) {
          try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
  
            const codeRes = await fetch("https://genai-jp.onrender.com/generateCode", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            });
  
            const codeData = await codeRes.json();
            result = codeData.generatedCode || null;
  
            if (result !== null) {
              combinedResults.push(result);
            } else {
              attempts++;
            }
          } catch (error) {
            console.error("Error generating content:", error);
            throw new Error("Error generating content");
          }
        }
  
        // If still no result, push a null placeholder
        if (result === null) {
          combinedResults.push(null);
        }
      }
  
      // Step 3: Store the generated code and activate the first file
      setGeneratedCodes(combinedResults);
      setActiveTab(combinedResults[0]?.fileName);
      localStorage.setItem("generatedCodes", JSON.stringify(combinedResults));
      console.log("Generated codes:", combinedResults);
      toast.success("Project details fetched successfully!");
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast.error("Error fetching project details.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const storedCodes = localStorage.getItem("generatedCodes");
    if (storedCodes) {
      setGeneratedCodes(JSON.parse(storedCodes));
      setActiveTab(JSON.parse(storedCodes)[0]?.fileName);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [response]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputBoxRef.current && !inputBoxRef.current.contains(event.target)) {
        setShowInputBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputBoxRef]);

  const handleCopy = (code, fileName) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    toast.success(`${fileName} copied to clipboard!`);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadZip = () => {
    const zip = new JSZip();
    generatedCodes.forEach((file) => {
      zip.file(file.fileName, file.code);
    });
    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        saveAs(content, "generated_by_justprompt.ai.zip");
        toast.success("Files downloaded as ZIP!");
      })
      .catch((error) => {
        console.error("Error downloading ZIP:", error);
        toast.error("Error downloading ZIP.");
      });
  };

  const handleReset = () => {
    localStorage.removeItem("generatedCodes");
    fetchData();
    toast.success("Project reset successfully!");
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleImproveUIUX = async (file) => {
    setImproving(true);
    try {
        const res = await fetch("https://tunedmodel-backend.onrender.com/improveuiux", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ html: file.code }),
        });
        const data = await res.json();

        if (!data || !data.html) {
            throw new Error("Invalid response from server");
        }

        const updatedHtml = data.html;
        if (!generatedCodes || !file) {
            throw new Error("Generated codes or file is null");
        }

        const updatedCodes = generatedCodes.map((f) =>
            f && f.fileName === file.fileName ? { ...f, code: updatedHtml } : f
        );
        setGeneratedCodes(updatedCodes);
        localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));
        toast.success("UI/UX improved successfully!");
    } catch (error) {
        console.error("Error improving UI/UX:", error);
        toast.error("Error improving UI/UX.");
    } finally {
        setImproving(false);
    }
};

  const getLanguageFromFileName = (fileName) => {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "js":
        return "javascript";
      case "html":
        return "html";
      case "py":
        return "python";
      case "sh":
        return "bash";
      case "c":
        return "c";
      case "clj":
        return "clojure";
      case "cpp":
      case "cc":
      case "cxx":
        return "cpp";
      case "cs":
        return "csharp";
      case "dart":
        return "dart";
      case "ex":
      case "exs":
        return "elixir";
      case "elm":
        return "elm";
      case "erl":
        return "erlang";
      case "fs":
      case "fsi":
      case "fsx":
      case "fsscript":
        return "fsharp";
      case "graphql":
        return "graphql";
      case "go":
        return "go";
      case "groovy":
        return "groovy";
      case "hs":
        return "haskell";
      case "java":
        return "java";
      case "jsx":
        return "jsx";
      case "jl":
        return "julia";
      case "kt":
      case "kts":
        return "kotlin";
      case "lisp":
      case "lsp":
        return "lisp";
      case "makefile":
      case "mk":
        return "makefile";
      case "m":
      case "mat":
        return "matlab";
      case "m":
        return "objectivec";
      case "ml":
      case "mli":
        return "ocaml";
      case "php":
        return "php";
      case "r":
        return "r";
      case "rb":
        return "ruby";
      case "rs":
        return "rust";
      case "scala":
        return "scala";
      case "sql":
        return "sql";
      case "swift":
        return "swift";
      case "tsx":
        return "tsx";
      case "ts":
        return "typescript";
      default:
        return "text";
    }
  };

  const handleCodeChange = (fileName, newCode) => {
    setEditableCode((prev) => ({ ...prev, [fileName]: newCode }));
    setUnsavedChanges((prev) => ({ ...prev, [fileName]: true }));
  };

  const handleSaveCode = (fileName) => {
    const updatedCodes = generatedCodes.map((file) =>
      file.fileName === fileName
        ? { ...file, code: editableCode[fileName] }
        : file
    );
    setGeneratedCodes(updatedCodes);
    localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));
    setUnsavedChanges((prev) => ({ ...prev, [fileName]: false }));
    toast.success(`${fileName} saved successfully!`);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreateClick = async () => {
    setIsCreating(true);
    try {
      const currentFile = generatedCodes.find(
        (file) => file.fileName === activeTab
      );
      let finalInputValue = inputValue;
      if (selectedFile) {
        const selectedFileContent = generatedCodes.find(
          (file) => file.fileName === selectedFile
        ).code;
        finalInputValue += `\n\n${selectedFileContent}`;
      }
      const res = await fetch("https://genai-jp.onrender.com/improvecoding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: currentFile.code,
          requiredchnage: finalInputValue,
        }),
      });
      const data = await res.json();

      if (!data || !data.code) {
        throw new Error("Invalid response from server");
      }

      const updatedCode = data.code;
      const updatedCodes = generatedCodes.map((f) =>
        f.fileName === currentFile.fileName ? { ...f, code: updatedCode } : f
      );
      setGeneratedCodes(updatedCodes);
      localStorage.setItem("generatedCodes", JSON.stringify(updatedCodes));
      setEditableCode((prev) => ({
        ...prev,
        [currentFile.fileName]: updatedCode,
      }));
      toast.success("Code improved successfully!");
    } catch (error) {
      console.error("Error improving code:", error);
      toast.error("Error improving code.");
    } finally {
      setIsCreating(false);
      setShowInputBox(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!generatedCodes || generatedCodes.length === 0) {
    return <div>No response data</div>;
  }

  return (
<div className="max-w-screen-xl mx-auto px-4 md:px-8">
  <ToastContainer />
  <div className="flex justify-end items-center space-x-1 mb-2 -mt-2">
    <button
      onClick={handleReset}
      className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 shadow-lg"
      title="Sync to latest flow"
    >
      <GrUpdate className="h-5 w-5" />
    </button>
    <button
      onClick={handleDownloadZip}
      className="flex items-center bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500 shadow-lg"
      title="Download All Files as ZIP"
    >
      <FaFileZipper className="h-5 w-5" />
    </button>
  </div>
  {generatedCodes && generatedCodes.length > 0 ? (
    <div>
      {generatedCodes.map((file, idx) =>
        file && file.fileName ? (
          activeTab === file.fileName ? (
            <div key={idx} className="flex flex-col">
              <div className="flex justify-end items-center space-x-1">
                <button
                  onClick={() => setShowInputBox(true)}
                  className="flex items-center bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                  title="Update code using AI"
                >
                  <BsStars className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCopy(file.code, file.fileName)}
                  className="flex items-center bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                  title={copiedFile === file.fileName ? "Copied" : "Copy"}
                >
                  {copiedFile === file.fileName ? (
                    <IoCopy className="h-5 w-5" />
                  ) : (
                    <IoCopyOutline className="h-5 w-5" />
                  )}
                </button>
                {file.fileName.endsWith(".html") && (
                  <>
                    <button
                      onClick={togglePreview}
                      className="flex items-center bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                      title={previewMode ? "Hide Preview" : "Show Preview"}
                    >
                      {previewMode ? (
                        <FaEye className="h-5 w-5" />
                      ) : (
                        <FaEyeSlash className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleImproveUIUX(file)}
                      className="relative flex items-center bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                      title="Improve UI/UX"
                    >
                      {improving ? (
                        <span className="relative inline-flex">
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx={12}
                              cy={12}
                              r={10}
                              stroke="currentColor"
                              strokeWidth={4}
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        </span>
                      ) : (
                        <FaMagic className="h-5 w-5" />
                      )}
                    </button>
                  </>
                )}
              </div>
              <div
                className="w-full border-b flex mt-2 items-center gap-x-0 overflow-x-auto text-sm bg-gray-800 text-white rounded-lg"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#888 #444",
                }}
              >
                <style>
                  {`
                    ::-webkit-scrollbar {
                      width: 4px;
                      height: 4px;
                    }
                    ::-webkit-scrollbar-track {
                      background: #444;
                    }
                    ::-webkit-scrollbar-thumb {
                      background-color: #888;
                      border-radius: 10px;
                      border: 2px solid #444;
                    }
                  `}
                </style>
                {generatedCodes.map((file, idx) =>
                  file && file.fileName ? (
                    <button
                      key={idx}
                      className={`py-2 px-3 ${
                        activeTab === file.fileName ? "bg-green-400" : ""
                      } hover:bg-green-500 focus:bg-green-500 focus:outline-none`}
                      onClick={() => setActiveTab(file.fileName)}
                      aria-label={`Open ${file.fileName}`}
                      tabIndex="0"
                    >
                      {file.fileName}
                    </button>
                  ) : null
                )}
              </div>
              {previewMode && file.fileName.endsWith(".html") ? (
                <iframe
                  srcDoc={file.code}
                  title="HTML Preview"
                  className="w-full h-96 border bg-white "
                />
              ) : (
                <div className="relative">
                  <textarea
                    value={editableCode[file.fileName] || file.code}
                    onChange={(e) =>
                      handleCodeChange(file.fileName, e.target.value)
                    }
                    className="w-full h-96 p-2 border bg-gray-900 text-white font-mono rounded-lg"
                    style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
                    wrap="soft"
                  />
                  {unsavedChanges[file.fileName] && (
                    <button
                      onClick={() => handleSaveCode(file.fileName)}
                      className="absolute top-2 right-2 bg-green-400 text-white p-2 rounded-lg hover:bg-green-500"
                      title="Save Changes"
                    >
                      <RiSave2Fill className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : null
        ) : null
      )}
    </div>
  ) : null}
  {showInputBox && (
    <div
      ref={inputBoxRef}
      className="mt-10 mx-auto max-w-xl py-1 px-4 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
      style={{
        zIndex: 10,
        position: "absolute",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
      }}
    >
      <input
        type="text"
        placeholder="Ask AI to modify code"
        className="bg-transparent w-full focus:outline-none pr-2 font-semibold border-0 focus:ring-0"
        name="topic"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="ml-1 text-blue-500 px-2 py-1 rounded-lg hover:text-blue-700 flex items-center"
        onClick={() => setShowFileDropdown(!showFileDropdown)}
      >
        {selectedFile ? selectedFile : "files"}
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showFileDropdown && (
        <div
          className="absolute bg-white border rounded-lg mb-2 w-full max-h-40 overflow-y-auto"
          style={{ bottom: "100%" }}
        >
          {generatedCodes.map((file, idx) =>
            file && file.fileName ? (
              <div
                key={idx}
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedFile(file.fileName);
                  setShowFileDropdown(false);
                }}
              >
                {file.fileName}
              </div>
            ) : null
          )}
        </div>
      )}
      <button
        className="flex items-center justify-center min-w-[130px] px-3 rounded-full font-medium border disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 text-base bg-black text-white border-transparent py-1 h-[38px]"
        onClick={handleCreateClick}
        disabled={isCreating}
      >
        Modify <BsStars />
      </button>
    </div>
  )}
</div>
  );
}

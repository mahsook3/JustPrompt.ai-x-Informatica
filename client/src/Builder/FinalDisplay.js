import React, { useEffect, useState, useCallback, useRef } from "react";
import CodePreview from "./CodePreview";
import Loading from "../components/Loading";
import codebase from "../codebase.json";

const FinalDisplay = ({ droppedComponents }) => {
  const [finalCode, setFinalCode] = useState("");
  const [finalCss, setFinalCss] = useState("");
  const [finalConfig, setFinalConfig] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Preview");
  const iframeRef = useRef(null);

  const fetchComponentCode = useCallback((uuid) => {
    try {
      const component = codebase.find((comp) => comp.uuid === uuid);
      if (!component) {
        throw new Error("Component not found");
      }
      return component;
    } catch (err) {
      console.error("Error fetching component code:", err);
      throw new Error("Error fetching component code");
    }
  }, []);

  useEffect(() => {
    const fetchAllCodes = async () => {
      if (droppedComponents.length === 0) {
        setFinalCode("");
        setFinalCss("");
        setFinalConfig("");
        localStorage.removeItem("componentCodes");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const storedComponents = JSON.parse(localStorage.getItem("componentCodes")) || [];
        const currentComponents = droppedComponents.map((component) => component.uuid);
        const newComponents = currentComponents.filter((uuid) => !storedComponents.includes(uuid));
        const removedComponents = storedComponents.filter((uuid) => !currentComponents.includes(uuid));

        const newCodes = await Promise.all(newComponents.map((uuid) => fetchComponentCode(uuid)));

        let htmlCode = newCodes.map((code) => code.html || "").join("\n");
        const cssCode = newCodes.map((code) => code.tw_css || "").join("\n");
        const configCode = newCodes.map((code) => code.tw_config || "").join("\n");

        const questionnaireData = JSON.parse(localStorage.getItem("questionnaireData"));

        const payload = {
          html: htmlCode,
          company: questionnaireData.companyName,
          goal: questionnaireData.goal,
          keywords: questionnaireData.keywords.join(", "),
          color: questionnaireData.color,
        };

        const response = await fetch("https://codemodifier-jehf.onrender.com/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        const updatedComponents = storedComponents
          .filter((uuid) => !removedComponents.includes(uuid))
          .concat(newComponents);
        localStorage.setItem("componentCodes", JSON.stringify(updatedComponents));

        setFinalCode((prevCode) => prevCode + result.html);
        setFinalCss((prevCss) => prevCss + cssCode);
        setFinalConfig((prevConfig) => prevConfig + configCode);
      } catch (error) {
        console.error("Error fetching component codes:", error.message);
        setError("Error fetching component codes");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCodes();
  }, [droppedComponents, fetchComponentCode]);

  // Function to write content to the iframe
  const writeIframeContent = (iframe, htmlContent) => {
    if (iframe && htmlContent) {
      const doc = iframe.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Published Page</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://kit.fontawesome.com/f8e8c480d8.js" crossorigin="anonymous"></script>
          <style>
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
            }
          </style>
        </head>
        <body>
          <div id="htmlContent">${htmlContent}</div>
          <script>
            document.querySelectorAll('#htmlContent *').forEach(element => {
              element.addEventListener('click', function(event) {
                event.stopPropagation();
                this.contentEditable = true;
                this.focus();
              });
              element.addEventListener('blur', function() {
                this.contentEditable = false;
                window.parent.postMessage({
                  type: 'updateContent',
                  html: document.getElementById('htmlContent').innerHTML
                }, '*');
              });
            });
          </script>
        </body>
        </html>
      `);
      doc.close();
    }
  };

  // Write content when finalCode changes
  useEffect(() => {
    writeIframeContent(iframeRef.current, finalCode);
  }, [finalCode]);

  // Write content when switching back to "Preview" tab
  useEffect(() => {
    if (activeTab === "Preview") {
      writeIframeContent(iframeRef.current, finalCode);
    }
  }, [activeTab, finalCode]);

  // Handle message event to update finalCode
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'updateContent') {
        setFinalCode(event.data.html);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const openInNewTab = () => {
    localStorage.setItem("previewData", JSON.stringify({ finalCode, finalCss }));
    window.open("/preview-in-new-tab", "_blank");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div
            className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
              activeTab === "Preview"
                ? "bg-green-400 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("Preview")}
          >
            Preview
          </div>
          <div
            className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
              activeTab === "Code"
                ? "bg-green-400 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("Code")}
          >
            Code
          </div>
        </div>
        <button
          onClick={openInNewTab}
          className="flex items-center px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 26 26"
            className="mr-2"
          >
            <path d="M 12.3125 0 C 10.425781 0.00390625 10.566406 0.507813 11.5625 1.5 L 14.78125 4.71875 L 9.25 10.25 C 8.105469 11.394531 8.105469 13.230469 9.25 14.375 L 11.6875 16.78125 C 12.832031 17.921875 14.667969 17.925781 15.8125 16.78125 L 21.34375 11.28125 L 24.5 14.4375 C 25.601563 15.539063 26 15.574219 26 13.6875 L 26 3.40625 C 26 -0.03125 26.035156 0 22.59375 0 Z M 4.875 5 C 2.183594 5 0 7.183594 0 9.875 L 0 21.125 C 0 23.816406 2.183594 26 4.875 26 L 16.125 26 C 18.816406 26 21 23.816406 21 21.125 L 21 14.75 L 18 17.75 L 18 21.125 C 18 22.160156 17.160156 23 16.125 23 L 4.875 23 C 3.839844 23 3 22.160156 3 21.125 L 3 9.875 C 3 8.839844 3.839844 8 4.875 8 L 8.3125 8 L 11.3125 5 Z"></path>
          </svg>
          Open in New Tab
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="text-white p-4 rounded-lg">
          {activeTab === "Preview" ? (
            <iframe
              ref={iframeRef}
              style={{ width: "100%", height: "100vh", border: "none", overflow: "auto" }}
              title="Preview"
              scrolling="yes"
            />
          ) : (
            <CodePreview finalCode={finalCode} finalCss={finalCss} />
          )}
        </div>
      )}
    </div>
  );
};

export default FinalDisplay;
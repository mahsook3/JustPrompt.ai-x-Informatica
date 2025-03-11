import React, { useEffect, useState, useRef } from "react";
import TemplateHTML from "./assets/template.json";
import axios from "axios";
import Editor from "./Editor";
import { Pencil, Smartphone, Tablet, Monitor } from "lucide-react";
import HTMLRenderer from "./components/HTMLRenderer";
import { toast, ToastContainer } from "react-toastify";

export default function UICreator({ formData }) {
  console.log("formData from UICreator:", formData);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [apiResponses, setApiResponses] = useState([]);
  const [selectedSectionName, setSelectedSectionName] = useState("");

  useEffect(() => {
    // Update the HTML content in the DOM when sections change
    sections.forEach((section) => {
      const sectionElement = document.querySelector(
        `[data-section-name="${section.sectionName}"]`
      );
      if (sectionElement && section.updatedHTML) {
        sectionElement.innerHTML = section.updatedHTML;
      }
    });
  }, [sections]);

  const getSectionDetails = (sectionName) => {
    switch (sectionName) {
      case "heroSection":
        return {
          section: "Hero",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          details: `Generate a compelling hero section for ${formData.businessName} ${formData.businessDescription}`,
        };

      case "headerSection":
        return {
          section: "Header",
          company: formData.businessName,
          moredetails: formData.sections,
          details: `Create a navigation header for my business Name: ${formData.businessName} and my business details: ${formData.businessDescription}`,
        };

      case "aboutSection":
        return {
          section: "About",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          details: `Create an about section highlighting my business Name: ${formData.businessName} and my business details: ${formData.businessDescription}}`,
        };

      case "statsSection":
        return {
          section: "Stats",
          company: formData.businessName,
          moredetails: `${formData.businessDescription} ${formData.statistics}`,
          details: `Generate statistics section for ${formData.businessName} ${formData.statistics}`,
        };

      case "featuresSection":
        return {
          section: "Features",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          details: `Create feature highlights for my business Name: ${formData.businessName} and my business details: ${formData.businessDescription}`,
        };

      case "testimonialsSection":
        return {
          section: "Testimonials",
          company: formData.businessName,
          moredetails: `${formData.businessDescription} ${formData.testimonials}`,
          details: `Generate testimonials section for ${formData.businessName} ${formData.testimonials}`,
        };

      case "callToAction":
        return {
          section: "CTA",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          details: `Create a compelling call-to-action for ${formData.businessName} ${formData.businessDescription}`,
        };

      case "footer":
        return {
          section: "Footer",
          company: formData.businessName,
          moredetails: `${formData.businessDescription} ${formData.socialMediaLinks}`,
          details: `Generate footer section for ${formData.businessName} ${formData.businessDescription}`,
        };

      default:
        return {
          section: sectionName,
          company: formData.businessName,
          moredetails: formData.businessDescription,
          details: `Generate content for ${sectionName}`,
        };
    }
  };

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setStatus("Fetching sections...");
      const updatedSections = [];

      console.log("TemplateHTML.sections:", TemplateHTML.sections);

      for (const section of TemplateHTML.sections) {
        if (!section.sectionName || !section.htmlCode) {
          console.error("Invalid section data:", section);
          setStatus("Error: Invalid section data");
          continue;
        }

        const sessionKey = `template-change-${section.sectionName}`;
        const cachedResponse = sessionStorage.getItem(sessionKey);

        if (cachedResponse) {
          const response = JSON.parse(cachedResponse);
          const updatedHTML = response.updatedHTML;
          console.log(
            "Updated HTML from cache:",
            updatedHTML?.substring(0, 200)
          );
          if (typeof updatedHTML === "string") {
            updatedSections.push({
              updatedHTML,
              sectionName: section.sectionName,
            });
            setStatus(`Fetched section from cache: ${section.sectionName}`);
          } else {
            console.error(`Invalid HTML for section ${section.sectionName}`);
            setStatus(`Error fetching section: ${section.sectionName}`);
          }
        } else {
          try {
            const sectionInfo = getSectionDetails(section.sectionName);
            console.log(`Fetching section: ${section.sectionName}`);

            const response = await axios.post(
              "https://crossintelligence2-50024996332.development.catalystappsail.in/template-change",
              {
                sectionName: section.sectionName,
                htmlCode: section.htmlCode,
                ...sectionInfo,
              }
            );

            // Get the raw HTML without any processing
            const updatedHTML = response.data.updatedHTML;
            const scorsecode = response.data.scorsecode;

            console.log(
              `Raw HTML for ${section.sectionName}:`,
              updatedHTML?.substring(0, 200)
            );

            if (typeof updatedHTML === "string") {
              updatedSections.push({
                updatedHTML,
                sectionName: section.sectionName,
              });
              sessionStorage.setItem(
                sessionKey,
                JSON.stringify({ updatedHTML, scorsecode })
              );
              setStatus(`Fetched section: ${section.sectionName}`);
            } else {
              console.error(`Invalid HTML for section ${section.sectionName}`);
              setStatus(`Error fetching section: ${section.sectionName}`);
            }
          } catch (error) {
            console.error(
              `Error fetching section ${section.sectionName}:`,
              error
            );
            setStatus(`Error fetching section: ${section.sectionName}`);
          }
        }
      }

      setSections(updatedSections);
      console.log("All sections fetched:", updatedSections);
      setLoading(false);
      setStatus("All sections fetched");
    };

    fetchSections();

    // Add Tailwind CSS script to ensure all classes are available at runtime
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(tailwindScript);
    };
  }, [formData]);

  const mapSectionNameToSearchTerm = (sectionName) => {
    switch (sectionName) {
      case "heroSection":
        return "hero";
      case "headerSection":
        return "headerSection";
      case "aboutSection":
        return "about";
      case "statsSection":
        return "stats";
      case "featuresSection":
        return "features";
      case "testimonialsSection":
        return "testimonial";
      case "callToAction":
        return "call to action cta";
      case "footer":
        return "footer";
      default:
        return sectionName;
    }
  };

  const handleElementClick = async (event, selection) => {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;

    if (!element) return;

    setSelectedElement(element);
    setIsImage(element.tagName === "IMG");
    setIsText(
      element.nodeType === Node.TEXT_NODE ||
        [
          "P",
          "SPAN",
          "DIV",
          "BUTTON",
          "A",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
        ].includes(element.tagName)
    );

    // Handle text selection
    if (selection) {
      const selectedRange = selection;
      const selectedText = selectedRange.toString();

      // Store selection information for the Editor component
      const selectionInfo = {
        range: {
          startOffset: selectedRange.startOffset,
          endOffset: selectedRange.endOffset,
          startContainer: selectedRange.startContainer,
          endContainer: selectedRange.endContainer,
        },
        text: selectedText,
      };

      // Store the selection data
      element.dataset.selection = JSON.stringify(selectionInfo);

      // Keep the selection active
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(selectedRange);
    }

    // Only handle contentEditable if we're in editing mode
    if (isEditing && element.isContentEditable) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // false means collapse to end
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    }

    // Get the section name from the closest parent with data-section-name
    let currentNode = element;
    let sectionName = null;

    while (currentNode && !sectionName) {
      sectionName =
        currentNode.getAttribute?.("data-section-name") ||
        currentNode
          .closest?.("[data-section-name]")
          ?.getAttribute("data-section-name");
      currentNode = currentNode.parentNode;
    }

    if (!sectionName) {
      const closestSection = element.closest?.("[data-section-name]");
      sectionName = closestSection?.getAttribute("data-section-name");
    }

    setSelectedSectionName(sectionName);

    if (sectionName) {
      const searchTerm = mapSectionNameToSearchTerm(sectionName);
      try {
        const response = await axios.get(
          `https://crossintelligence2-50024996332.development.catalystappsail.in/get-templates-by-title?title=${searchTerm}`
        );
        setSectionDetails(response.data[0]);
        setApiResponses(response.data);
      } catch (error) {
        console.error(
          `Error fetching section details for ${sectionName}:`,
          error
        );
      }
    }
  };

  const applyStyleToSelection = (style) => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText) return;

    // Create a new span element with the desired style
    const span = document.createElement("span");
    Object.assign(span.style, style);

    try {
      // Wrap the selected text in the styled span
      range.surroundContents(span);

      // Update the content in state
      const sectionElement = range.commonAncestorContainer.closest(
        "[data-section-name]"
      );
      if (sectionElement) {
        const sectionName = sectionElement.getAttribute("data-section-name");
        setSections((prevSections) =>
          prevSections.map((section) =>
            section.sectionName === sectionName
              ? { ...section, updatedHTML: sectionElement.innerHTML }
              : section
          )
        );
      }
    } catch (error) {
      console.error("Error applying style:", error);
    }
  };

  const handleImageClick = async (html, sectionName) => {
    try {
      console.log("Sending HTML to API:", html.substring(0, 200));

      const response = await axios.post(
        "https://crossintelligence2-50024996332.development.catalystappsail.in/template-change",
        {
          sectionName: sectionName,
          htmlCode: html,
          details: "Updated EasyShop as organic shop",
        }
      );

      const newHtml = response.data.updatedHTML;
      const scorsecode = response.data.scorsecode;

      console.log("Received HTML from API:", newHtml?.substring(0, 200));

      if (typeof newHtml === "string") {
        // Update sections state
        setSections((prevSections) => {
          const updatedSections = prevSections.map((section) =>
            section.sectionName === sectionName
              ? { ...section, updatedHTML: newHtml }
              : section
          );

          // Update session storage
          const sessionKey = `template-change-${sectionName}`;
          sessionStorage.setItem(
            sessionKey,
            JSON.stringify({
              updatedHTML: newHtml,
              scorsecode,
            })
          );

          return updatedSections;
        });

        console.log("Updated sections successfully");
      } else {
        console.error("Invalid HTML received from API");
      }
    } catch (error) {
      console.error("Error updating section based on image click:", error);
    }
  };

  const updateElementContent = (newContent) => {
    if (selectedElement) {
      selectedElement.innerHTML = newContent;
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handlePublish = async () => {
    try {
      // Create a container to get the final HTML in order
      const container = document.createElement("div");

      // Get all sections in their current order from the DOM
      const sectionsContainer = document.getElementById("sections-container");
      const sectionWrappers =
        sectionsContainer.querySelectorAll(".section-wrapper");

      // Combine all sections HTML in order
      sectionWrappers.forEach((wrapper) => {
        container.innerHTML += wrapper.innerHTML;
      });

      // Send the combined HTML to the server
      const response = await axios.post(
        "https://crossintelligence2-50024996332.development.catalystappsail.in/public-template",
        {
          htmlCode: container.innerHTML,
        }
      );

      if (response.status === 200) {
        const templateId = response.data.insertedId;
        const url = `http://localhost:3000/public/${templateId}`;

        // Copy the URL to the clipboard
        navigator.clipboard.writeText(url);

        // Show a toast notification
        toast.success(`Template published! URL copied to clipboard: ${url}`);
      }
    } catch (error) {
      console.error("Error publishing template:", error);
      toast.error("Failed to publish template. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ToastContainer />
      <style jsx global>{`
        [contenteditable="true"] {
          outline: none;
          min-height: 1em;
          position: relative;
        }
        [contenteditable="true"]:hover {
          outline: 2px dashed #4b9ef4;
        }
        [contenteditable="true"]:focus {
          outline: 2px solid #4b9ef4;
          z-index: 1;
        }
        [contenteditable="true"]::selection {
          background: #4b9ef4;
          color: white;
        }
        .section-wrapper {
          position: relative;
        }
        .section-wrapper[data-editing="true"] * {
          pointer-events: auto !important;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={toggleEditing}
          className="ml-4 px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 rounded transition-colors"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
        <button
          onClick={handlePublish}
          className="ml-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors"
        >
          Make it Live
        </button>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, overflowY: "auto", height: "100vh" }}>
          {loading ? (
            <div>Loading... {status}</div>
          ) : (
            <div
              id="sections-container"
              className="tailwind-sections-container"
            >
              {sections.map((section, index) => (
                <HTMLRenderer
                  key={index}
                  html={section.updatedHTML}
                  sectionName={section.sectionName}
                  onClick={handleElementClick}
                  isEditing={isEditing}
                  onContentChange={(newHtml, sectionName) => {
                    setSections((prevSections) =>
                      prevSections.map((s) =>
                        s.sectionName === sectionName
                          ? { ...s, updatedHTML: newHtml }
                          : s
                      )
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {isEditing && (
          <div
            style={{
              width: "300px",
              marginLeft: "20px",
              overflowY: "auto",
              height: "100vh",
            }}
          >
            <Editor
              selectedElement={selectedElement}
              updateElementContent={updateElementContent}
              isImage={isImage}
              isText={isText}
              sectionDetails={sectionDetails}
              apiResponses={apiResponses}
              onImageClick={handleImageClick}
              sectionName={selectedSectionName}
              sections={sections}
              setSections={setSections}
              applyStyleToSelection={applyStyleToSelection} // Add this prop
            />
          </div>
        )}
      </div>
    </div>
  );
}

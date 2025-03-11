import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Baseline,
  AlignLeft,
  AlignRight,
  AlignJustify,
  AlignCenter,
  List,
  Link2,
  Sparkles,
  Languages,
  Link,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import DefaultColors from "./DefaultColors.json";
import EditorHistory from "./editorHistory";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "./components/Icons";

const rgbToHex = (rgb) => {
  if (!rgb || rgb === "rgba(0, 0, 0, 0)" || rgb === "transparent") return "";

  if (rgb.startsWith("#")) return rgb;

  const rgbMatch = rgb.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;

    for (const [key, value] of Object.entries(DefaultColors)) {
      if (
        typeof value === "string" &&
        value.toLowerCase() === hex.toLowerCase()
      ) {
        return value;
      } else if (typeof value === "object") {
        for (const [shade, shadeValue] of Object.entries(value)) {
          if (shadeValue.toLowerCase() === hex.toLowerCase()) {
            return shadeValue;
          }
        }
      }
    }
    return hex;
  }

  return "";
};

const getComputedBgColor = (element) => {
  if (!element) return "";

  const computedStyle = window.getComputedStyle(element);
  const bgColor =
    element.style.backgroundColor ||
    (computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
      ? computedStyle.backgroundColor
      : "");

  return rgbToHex(bgColor);
};

const getComputedTextColor = (element) => {
  if (!element) return "";

  const computedStyle = window.getComputedStyle(element);
  const textColor =
    element.style.color ||
    (computedStyle.color !== "rgba(0, 0, 0, 0)" ? computedStyle.color : "");

  return rgbToHex(textColor);
};

const Editor = ({
  selectedElement,
  updateElementContent,
  isImage,
  isText,
  sectionDetails,
  apiResponses = [],
  onImageClick,
  sectionName,
  sections = [],
  setSections,
}) => {
  const [fontSize, setFontSize] = useState("64");
  const [color, setColor] = useState("#4B9EF4");
  const [href, setHref] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [originalStyles, setOriginalStyles] = useState({});
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const [showImages, setShowImages] = useState(false);
  const [sectionBgColor, setSectionBgColor] = useState("");
  const historyRef = useRef(new EditorHistory());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selection, setSelection] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const [showIconsEditor, setShowIconsEditor] = useState(false); // State to show Icons editor
  const [iconProps, setIconProps] = useState({ color: "", width: "", height: "" }); // State for icon properties

  useEffect(() => {
    if (selectedElement) {
      // Initialize element with contentEditable
      selectedElement.contentEditable = true;

      // Add selection change listener
      const handleSelectionChange = () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
          setSelection(sel.getRangeAt(0));
          updateActiveStyles();
        }
      };

      document.addEventListener("selectionchange", handleSelectionChange);

      // Clean up
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
        selectedElement.contentEditable = false;
      };
    }
  }, [selectedElement]);

  useEffect(() => {
    if (selectedElement) {
      const initialState = {
        content: selectedElement.innerHTML,
      };
      historyRef.current.clear();
      historyRef.current.push(initialState);
      updateUndoRedoState();

      selectedElement.addEventListener("input", handleContentChange);
      selectedElement.addEventListener("mouseup", updateActiveStyles);
      selectedElement.addEventListener("keyup", updateActiveStyles);

      selectedElement.addEventListener("input", handleContentChange);
      selectedElement.addEventListener("mouseup", updateActiveStyles);
      selectedElement.addEventListener("keyup", updateActiveStyles);

      if (
        selectedElement.tagName === "A" ||
        selectedElement.tagName === "BUTTON"
      ) {
        const currentHref = selectedElement.getAttribute("href") || "";
        setHref(currentHref);

        const computedStyle = window.getComputedStyle(selectedElement);
        setOriginalStyles({
          width: selectedElement.style.width || computedStyle.width,
          height: selectedElement.style.height || computedStyle.height,
          display: selectedElement.style.display || computedStyle.display,
          padding: selectedElement.style.padding || computedStyle.padding,
          margin: selectedElement.style.margin || computedStyle.margin,
          fontSize: selectedElement.style.fontSize || computedStyle.fontSize,
          lineHeight:
            selectedElement.style.lineHeight || computedStyle.lineHeight,
          backgroundColor:
            selectedElement.style.backgroundColor ||
            computedStyle.backgroundColor,
          color: selectedElement.style.color || computedStyle.color,
        });

        const extractedBgColor = getComputedBgColor(selectedElement);
        setBgColor(extractedBgColor);

        const extractedTextColor = getComputedTextColor(selectedElement);
        setColor(extractedTextColor || "#4B9EF4");
      }

      return () => {
        selectedElement.removeEventListener("input", handleContentChange);
        selectedElement.removeEventListener("mouseup", updateActiveStyles);
        selectedElement.removeEventListener("keyup", updateActiveStyles);
        selectedElement.removeEventListener("input", handleContentChange);
        selectedElement.removeEventListener("mouseup", updateActiveStyles);
        selectedElement.removeEventListener("keyup", updateActiveStyles);
      };
    }
  }, [selectedElement]);

  const handleIconClick = (iconElement) => {
    const color = iconElement.getAttribute("fill") || "#000000";
    const width = iconElement.getAttribute("width") || "24";
    const height = iconElement.getAttribute("height") || "24";
    setIconProps({ color, width, height });
    setShowIconsEditor(true);
  };

  const handleIconChange = (newIcon) => {
    if (selectedElement) {
      selectedElement.outerHTML = newIcon;
      setShowIconsEditor(false);
      handleContentChange();
    }
  };

  const updateActiveStyles = () => {
    if (selectedElement) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.parentElement;

        setActiveStyles({
          bold:
            window.getComputedStyle(parentElement).fontWeight === "bold" ||
            window.getComputedStyle(parentElement).fontWeight === "700",
          italic: window.getComputedStyle(parentElement).fontStyle === "italic",
          underline: window
            .getComputedStyle(parentElement)
            .textDecoration.includes("underline"),
          strikethrough: window
            .getComputedStyle(parentElement)
            .textDecoration.includes("line-through"),
        });

        const currentTextColor = getComputedTextColor(parentElement);
        if (currentTextColor) {
          setColor(currentTextColor);
        }
      }
    }
  };

  const handleSectionBgColorChange = (e) => {
    const newColor = e.target.value;
    setSectionBgColor(newColor);
    if (selectedElement) {
      selectedElement.closest("[data-section-name]").style.backgroundColor =
        newColor;
      setHasChanges(true); // Mark changes as done
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://crossintelligence2-50024996332.development.catalystappsail.in/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.imageUrl) {
        updateImageSrc(response.data.imageUrl);
        setShowFileInput(false);
        toast.success("Image uploaded successfully!");
        handleContentChange(); // Trigger content change to save the update
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const updateImageSrc = (newSrc) => {
    if (selectedElement && selectedElement.tagName === "IMG") {
      selectedElement.src = newSrc;
      setHasChanges(true); // Mark changes as done
      handleContentChange();
    }
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (imageUrl) {
      try {
        updateImageSrc(imageUrl);
        setImageUrl("");
        setShowLinkInput(false);
        toast.success("Image URL updated successfully!");
        handleContentChange(); // Trigger content change to save the update
      } catch (error) {
        toast.error("Failed to update image URL");
      }
    }
  };

  const handleSectionBgColorInputChange = (e) => {
    setSectionBgColor(e.target.value);
  };

  const handleSectionBgColorInputBlur = (e) => {
    const newColor = e.target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
      handleSectionBgColorChange({ target: { value: newColor } });
    } else if (e.target.value === "") {
      setSectionBgColor("");
      handleSectionBgColorChange({ target: { value: "" } });
    }
  };

  const applyAlignment = (alignment) => {
    if (!selectedElement) return;

    const parentBlock = getParentBlock(selectedElement);
    if (parentBlock) {
      parentBlock.style.textAlign = alignment;
      handleContentChange();
    }
  };

  // Helper function to get parent block element
  const getParentBlock = (element) => {
    const blockElements = ["P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6"];
    let current = element;

    while (current && !blockElements.includes(current.tagName)) {
      current = current.parentElement;
    }

    return current;
  };

  const toggleStyle = (styleKey, cssProperty, cssValue) => {
    if (!selectedElement) return;

    const isActive = activeStyles[styleKey];
    const newStyle = `${cssProperty}: ${isActive ? "initial" : cssValue};`;
    applyStyle(newStyle);
    setActiveStyles((prev) => ({ ...prev, [styleKey]: !isActive }));
  };

  // Update text color change handler
  const handleTextColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    applyStyle(`color: ${newColor};`);
    setHasChanges(true); // Mark changes as done
  };

  const applyStyle = (style) => {
    if (!selectedElement || !selection) return;

    const range = selection;

    // If no text is selected, apply to whole element
    if (range.collapsed) {
      selectedElement.style.cssText += style;
      handleContentChange();
      return;
    }

    // Apply to selected text
    const span = document.createElement("span");
    span.style.cssText = style;

    try {
      range.surroundContents(span);
      handleContentChange();
    } catch (e) {
      // If selection crosses multiple nodes, handle differently
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      handleContentChange();
    }
  };

  const changeColor = (newColor) => {
    setColor(newColor);

    if (
      (selectedElement && selectedElement.tagName === "A") ||
      selectedElement.tagName === "BUTTON"
    ) {
      selectedElement.style.color = newColor;

      preserveOriginalStyles();

      setOriginalStyles((prev) => ({
        ...prev,
        color: newColor,
      }));
    } else {
      applyStyle(`color: ${newColor};`);
    }
  };

  const handleTextColorInputChange = (e) => {
    setColor(e.target.value);
  };

  const handleTextColorInputBlur = (e) => {
    const newColor = e.target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
      changeColor(newColor);
    } else if (e.target.value === "") {
      const originalColor = originalStyles.color || "#4B9EF4";
      setColor(originalColor);
      changeColor(originalColor);
    }
  };

  const handleHrefChange = (e) => {
    const newHref = e.target.value;
    setHref(newHref);

    if (
      selectedElement &&
      (selectedElement.tagName === "A" || selectedElement.tagName === "BUTTON")
    ) {
      selectedElement.setAttribute("href", newHref);

      preserveOriginalStyles();
    }
  };

  const updateUndoRedoState = () => {
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
  };

  const handleContentChange = () => {
    if (!selectedElement) return <>No Content</>;
    if (selectedElement) {
      const newState = {
        content: selectedElement.innerHTML,
      };
      historyRef.current.push(newState);
      updateUndoRedoState();
      updateElementContent(selectedElement.innerHTML);
      setHasChanges(true); // Mark changes as done
    }
  };

  const handleUndo = () => {
    if (!selectedElement) return;

    const previousState = historyRef.current.undo();
    if (previousState) {
      selectedElement.innerHTML = previousState.content;
      updateElementContent(previousState.content);
      updateUndoRedoState();
    }
  };

  const handleRedo = () => {
    if (!selectedElement) return;

    const nextState = historyRef.current.redo();
    if (nextState) {
      selectedElement.innerHTML = nextState.content;
      updateElementContent(nextState.content);
      updateUndoRedoState();
    }
  };

  const handleBgColorChange = (e) => {
    const newColor = e.target.value;
    setBgColor(newColor);
    applyStyle(`background-color: ${newColor};`);
    setHasChanges(true); // Mark changes as done
  };

  const handleBgColorInputChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleBgColorInputBlur = (e) => {
    const newBgColor = e.target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newBgColor) || newBgColor === "") {
      handleBgColorChange({ target: { value: newBgColor } });
    } else if (e.target.value === "") {
      const originalBgColor = originalStyles.backgroundColor || "";
      setBgColor(originalBgColor);
      handleBgColorChange({ target: { value: originalBgColor } });
    }
  };

  const saveContentToSessionStorage = () => {
    if (selectedElement && hasChanges) {
      // Find the parent section element
      const sectionElement = selectedElement.closest("[data-section-name]");
      const sectionName = sectionElement?.getAttribute("data-section-name");

      if (!sectionName) return;

      const sessionKey = `template-change-${sectionName}`;
      const cachedResponse = sessionStorage.getItem(sessionKey);

      if (cachedResponse) {
        const response = JSON.parse(cachedResponse);
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.updatedHTML, "text/html");

        // Find the matching element in the cached HTML
        const elementToUpdate = findMatchingElement(doc, selectedElement);

        if (elementToUpdate) {
          // Update all properties
          // Copy all attributes
          Array.from(selectedElement.attributes).forEach((attr) => {
            elementToUpdate.setAttribute(attr.name, attr.value);
          });

          // Update styles
          elementToUpdate.style.cssText = selectedElement.style.cssText;

          // Update specific properties for images
          if (selectedElement.tagName === "IMG") {
            elementToUpdate.src = selectedElement.src;
            elementToUpdate.alt = selectedElement.alt;
            elementToUpdate.title = selectedElement.title;
          }

          // Update content for non-image elements
          if (selectedElement.tagName !== "IMG") {
            elementToUpdate.innerHTML = selectedElement.innerHTML;
          }

          // Update background color for parent section if it exists
          const parentSection = selectedElement.closest("[data-section-name]");
          if (parentSection) {
            const targetSection = doc.querySelector(
              `[data-section-name="${sectionName}"]`
            );
            if (targetSection) {
              targetSection.style.backgroundColor =
                parentSection.style.backgroundColor;
            }
          }

          // Save all changes back to session storage
          response.updatedHTML = doc.body.innerHTML;
          sessionStorage.setItem(sessionKey, JSON.stringify(response));

          // Show success message
          toast.success("All changes saved successfully!");
        } else {
          toast.error("Could not find matching element to update");
        }
      }

      setHasChanges(false);
    }
  };

  // Helper function to find matching element in cached HTML
  const findMatchingElement = (doc, selectedElement) => {
    // Try to match by data attributes first
    if (selectedElement.dataset.id) {
      return doc.querySelector(`[data-id="${selectedElement.dataset.id}"]`);
    }

    // Try to match by class combination with proper escaping
    const classes = Array.from(selectedElement.classList)
      .map((className) =>
        // Escape special characters in class names
        className.replace(/([:.[])/g, "\\$1")
      )
      .join(".");

    if (classes) {
      try {
        return doc.querySelector(`.${classes}`);
      } catch (error) {
        console.warn(
          "Invalid selector, falling back to alternative matching:",
          error
        );
      }
    }

    // Try to match by unique attributes combination
    const uniqueAttrs = [
      selectedElement.id && `#${selectedElement.id}`,
      selectedElement.name && `[name="${selectedElement.name}"]`,
      selectedElement.getAttribute("data-testid") &&
        `[data-testid="${selectedElement.getAttribute("data-testid")}"]`,
    ]
      .filter(Boolean)
      .join("");

    if (uniqueAttrs) {
      try {
        return doc.querySelector(uniqueAttrs);
      } catch (error) {
        console.warn("Failed to match by unique attributes:", error);
      }
    }

    // Fallback: Try to match by tag name and content
    const tagName = selectedElement.tagName.toLowerCase();
    const content = selectedElement.textContent?.trim();
    if (content) {
      const elements = doc.getElementsByTagName(tagName);
      return Array.from(elements).find(
        (el) => el.textContent?.trim() === content
      );
    }

    // Final fallback: Try to match by position in parent
    const parent = selectedElement.parentElement;
    if (parent) {
      const index = Array.from(parent.children).indexOf(selectedElement);
      const similarParents = doc.querySelectorAll(parent.tagName.toLowerCase());
      for (const similarParent of similarParents) {
        if (
          similarParent.children[index]?.tagName === selectedElement.tagName
        ) {
          return similarParent.children[index];
        }
      }
    }

    return null;
  };

  const preserveOriginalStyles = () => {
    if (!selectedElement) return;

    if (originalStyles.width && originalStyles.width !== "auto") {
      selectedElement.style.width = originalStyles.width;
    }

    if (originalStyles.height && originalStyles.height !== "auto") {
      selectedElement.style.height = originalStyles.height;
    }

    if (originalStyles.display) {
      selectedElement.style.display = originalStyles.display;
    }

    if (originalStyles.padding) {
      selectedElement.style.padding = originalStyles.padding;
    }

    if (originalStyles.margin) {
      selectedElement.style.margin = originalStyles.margin;
    }

    if (originalStyles.fontSize) {
      selectedElement.style.fontSize = originalStyles.fontSize;
    }

    if (originalStyles.lineHeight) {
      selectedElement.style.lineHeight = originalStyles.lineHeight;
    }
  };

  const ToolbarButton = ({
    children,
    className = "",
    active = false,
    disabled = false,
    ...props
  }) => (
    <button
      className={`p-2 rounded-md transition-all duration-200 ease-in-out
        ${active ? "bg-white/15 shadow-inner" : "hover:bg-white/10"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );

  const handleReorder = (index, direction) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(index, 1);
    newSections.splice(index + direction, 0, movedSection);
    setSections(newSections);
  };

  const canHaveHref =
    selectedElement &&
    (selectedElement.tagName === "A" || selectedElement.tagName === "BUTTON");

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full bg-[#1a1a1a] rounded-lg shadow-xl">
      <ToastContainer />

      {/* Top toolbar */}
      <div className="flex items-center justify-between bg-[#232323] text-white p-3 rounded-t-lg border-b border-white/10">
        <div className="flex items-center gap-3">
          <ToolbarButton onClick={handleUndo} disabled={!canUndo}>
            <Undo2 className="w-4 h-4 transition-transform hover:scale-110" />
          </ToolbarButton>
          <ToolbarButton onClick={handleRedo} disabled={!canRedo}>
            <Redo2 className="w-4 h-4 transition-transform hover:scale-110" />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-md transition-colors hover:bg-white/10">
            Discard
          </button>
          <button
            className={`px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition-colors ${
              !hasChanges ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!hasChanges}
            onClick={saveContentToSessionStorage}
          >
            Save
          </button>
        </div>
      </div>

            {/* Show Icons editor */}
            {showIconsEditor && (
        <Icons
          iconProps={iconProps}
          onIconChange={handleIconChange}
          onClose={() => setShowIconsEditor(false)}
        />
      )}

      {/* Formatting toolbar */}
      {isText && (
        <div className="flex flex-wrap items-center gap-3 bg-[#2a2a2a] text-white p-3 border-b border-white/10">
          {/* Text formatting */}
          <div className="flex items-center gap-1 p-1 bg-[#333] rounded-md">
            <ToolbarButton
              onClick={() => toggleStyle("bold", "font-weight", "bold")}
              active={activeStyles.bold}
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => toggleStyle("italic", "font-style", "italic")}
              active={activeStyles.italic}
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                toggleStyle("underline", "text-decoration", "underline")
              }
              active={activeStyles.underline}
            >
              <Underline className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                toggleStyle("strikethrough", "text-decoration", "line-through")
              }
              active={activeStyles.strikethrough}
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Font size */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-3 py-2 bg-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {[12, 14, 16, 18, 24, 32, 48, 64].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          {/* Alignment */}
          <div className="flex items-center gap-1 p-1 bg-[#333] rounded-md">
            <ToolbarButton onClick={() => applyAlignment("left")}>
              <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => applyAlignment("center")}>
              <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => applyAlignment("right")}>
              <AlignRight className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => applyAlignment("justify")}>
              <AlignJustify className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* Color picker */}
          <div className="flex items-center gap-2 p-2 bg-[#333] rounded-md">
            <Baseline className="w-4 h-4" />
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={color}
                onChange={handleTextColorChange}
                className="w-6 h-6 rounded cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={color}
                onChange={handleTextColorInputChange}
                onBlur={handleTextColorInputBlur}
                placeholder="#RRGGBB"
                className="w-20 bg-[#1a1a1a] border border-white/10 rounded-md px-2 py-1 text-white text-xs placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Change Background Color
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={sectionBgColor}
                onChange={handleSectionBgColorChange}
                className="w-10 h-8 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#4B9EF4]"
              />
              <input
                type="text"
                value={sectionBgColor}
                onChange={handleSectionBgColorInputChange}
                onBlur={handleSectionBgColorInputBlur}
                placeholder="#RRGGBB"
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="p-4 bg-[#2a2a2a] border-b border-white/10">
        <h3 className="text-white text-sm font-medium mb-3">Sections</h3>
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-[#333] rounded-lg transition-colors hover:bg-[#3a3a3a]"
            >
              <span className="text-white text-sm">{section.sectionName}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReorder(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded-full transition-colors hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleReorder(index, 1)}
                  disabled={index === sections.length - 1}
                  className="p-1.5 rounded-full transition-colors hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Image options */}
      {isImage && (
        <div className="p-4 bg-[#2a2a2a] space-y-4">
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Media</label>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                onClick={() => {
                  setShowFileInput(true);
                  setShowLinkInput(false);
                  fileInputRef.current?.click();
                }}
              >
                Replace
              </button>
              <button
                className="p-2 bg-[#333] hover:bg-[#444] rounded-md transition-colors"
                onClick={() => {
                  setShowLinkInput(true);
                  setShowFileInput(false);
                }}
              >
                <Link className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Link input */}
            {showLinkInput && (
              <form onSubmit={handleLinkSubmit} className="mt-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              placeholder="Alt tag"
              value={selectedElement?.alt || ""}
              onChange={(e) => {
                if (selectedElement) {
                  selectedElement.alt = e.target.value;
                  handleContentChange();
                }
              }}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Tooltip</label>
            <input
              type="text"
              placeholder="Title tag"
              value={selectedElement?.title || ""}
              onChange={(e) => {
                if (selectedElement) {
                  selectedElement.title = e.target.value;
                  handleContentChange();
                }
              }}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
            />
          </div>
        </div>
      )}

      {/* Link and Background Color options */}
      {canHaveHref && (
        <div className="p-4 bg-[#2a2a2a] space-y-4">
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Link (href)
            </label>
            <input
              type="text"
              value={href}
              onChange={handleHrefChange}
              placeholder="Enter URL"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Text Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={color}
                onChange={handleTextColorChange}
                className="w-10 h-8 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#4B9EF4]"
              />
              <input
                type="text"
                value={color}
                onChange={handleTextColorInputChange}
                onBlur={handleTextColorInputBlur}
                placeholder="#RRGGBB"
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Background Color
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={bgColor}
                onChange={handleBgColorChange}
                className="w-10 h-8 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#4B9EF4]"
              />
              <input
                type="text"
                value={bgColor}
                onChange={handleBgColorInputChange}
                onBlur={handleBgColorInputBlur}
                placeholder="#RRGGBB"
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#4B9EF4]"
              />
            </div>
          </div>
        </div>
      )}

      {/* API responses */}
      <div className="p-4 bg-[#2a2a2a]">
        <button
          onClick={() => setShowImages(!showImages)}
          className="text-white text-sm font-medium mb-3 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition-colors"
        >
          Change Style
        </button>
        {showImages && (
          <ul className="space-y-3">
            {apiResponses.map((response, index) => (
              <li key={index} className="bg-[#333] rounded-lg p-3">
                <h4 className="text-white font-medium mb-2">
                  {response.title}
                </h4>
                {response.thumbnails?.images && (
                  <img
                    src={response.thumbnails.images.light}
                    alt={response.title}
                    onClick={() => {
                      onImageClick(response.html, sectionName);
                      setShowImages(false); // Hide the images after selection
                    }}
                    className="w-full h-auto rounded-md cursor-pointer transition-transform hover:scale-105"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Editor;

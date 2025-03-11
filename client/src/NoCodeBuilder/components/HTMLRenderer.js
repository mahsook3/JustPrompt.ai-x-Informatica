import React, { useEffect, useState, useRef } from "react";

const HTMLRenderer = ({
  html,
  sectionName,
  onClick,
  isEditing,
  onContentChange,
}) => {
  const containerRef = useRef(null);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    // Set initial HTML content only if container is empty
    if (!containerRef.current.innerHTML) {
      containerRef.current.innerHTML = html;
    }

    const elements = containerRef.current.querySelectorAll("*");

    // Update contentEditable state for all elements
    elements.forEach((element) => {
      if (
        [
          "P",
          "SPAN",
          "DIV",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "A",
          "BUTTON",
        ].includes(element.tagName)
      ) {
        element.contentEditable = isEditing;
      }
    });

    // Add selection change listener
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (containerRef.current.contains(range.commonAncestorContainer)) {
          setSelection(range);
        }
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [isEditing, html]);

  const handleInput = (e) => {
    e.stopPropagation();
    if (onContentChange) {
      onContentChange(containerRef.current.innerHTML, sectionName);
    }
  };

  const handleClick = (e) => {
    if (isEditing) {
      e.stopPropagation();
      const selectedText = window.getSelection().toString();
      onClick(e, selectedText ? selection : null);
    }
  };

  return (
    <div
      ref={containerRef}
      data-section-name={sectionName}
      className="section-wrapper"
      onClick={handleClick}
      onInput={handleInput}
      style={{ cursor: isEditing ? "text" : "default" }}
    />
  );
};

export default HTMLRenderer;

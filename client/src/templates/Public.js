import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

export default function Public() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

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
          <title>Published Template</title>
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
        </body>
        </html>
      `);
      doc.close();
    }
  };

  useEffect(() => {
    fetch(`https://crossintelligence2-50024996332.development.catalystappsail.in/public-template/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setContent(data.data);
        } else {
          setError(data.message || 'Failed to load template');
        }
      })
      .catch(error => {
        console.error('Error fetching content:', error);
        setError('Failed to load template');
      });
  }, [id]);

  // Write content when it changes
  useEffect(() => {
    if (content && content.htmlCode) {
      writeIframeContent(iframeRef.current, content.htmlCode);
    }
  }, [content]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <iframe
        ref={iframeRef}
        style={{ width: "100%", height: "100vh", border: "none", overflow: "auto" }}
        title="Template Preview"
        scrolling="yes"
      />
    </div>
  );
}

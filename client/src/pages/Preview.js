import React from "react";
import { useLocation } from "react-router-dom";

const Preview = () => {
  const location = useLocation();
  const { finalCode, finalCss } = location.state || {};

  console.log("Preview component loaded with:", { finalCode, finalCss });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="text-white p-4 rounded-lg">
        {finalCss && <style dangerouslySetInnerHTML={{ __html: finalCss }} />}
        <div dangerouslySetInnerHTML={{ __html: finalCode }} />
      </div>
    </div>
  );
};

export default Preview;

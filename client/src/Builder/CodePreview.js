import React from "react";

const CodePreview = ({ finalCode, finalCss }) => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md h-full overflow-auto">
      <h3 className="text-lg font-bold mb-2">HTML Code:</h3>
      <pre className="mb-4">
        <code>{finalCode}</code>
      </pre>
    </div>
  );
};

export default CodePreview;

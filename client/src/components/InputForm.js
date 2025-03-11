import React, { useState, useEffect } from "react";

function extractValuesFromHTML(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const inputs = {};
  const images = Array.from(tempDiv.querySelectorAll("img"));
  const links = Array.from(tempDiv.querySelectorAll("a"));
  const buttons = Array.from(tempDiv.querySelectorAll("button"));
  const texts = Array.from(
    tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6")
  );

  images.forEach((img, index) => (inputs[`img${index + 1}`] = img.src));
  links.forEach((link, index) => (inputs[`link${index + 1}`] = link.href));
  buttons.forEach(
    (button, index) => (inputs[`button${index + 1}`] = button.innerText)
  );
  texts.forEach(
    (text, index) =>
      (inputs[`text${index + 1}`] = text.innerText || text.textContent)
  );

  return inputs;
}

function InputForm({ element, onUpdateElement }) {
  const [formData, setFormData] = useState({});
  const questionnaireData =
    JSON.parse(localStorage.getItem("questionnaireData")) || {};

  useEffect(() => {
    if (element) {
      setFormData(extractValuesFromHTML(element.code));
    }
  }, [element]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = element.code;

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const type = key.slice(0, key.length - 1);
      switch (type) {
        case "img":
          tempDiv.querySelectorAll("img")[key.slice(-1) - 1].src = value;
          break;
        case "link":
          tempDiv.querySelectorAll("a")[key.slice(-1) - 1].href = value;
          break;
        case "button":
          tempDiv.querySelectorAll("button")[key.slice(-1) - 1].innerText =
            value;
          break;
        case "text":
          const index = key.slice(-1) - 1;
          const texts = tempDiv.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
          if (texts[index]) {
            texts[index].innerText = value;
          }
          break;
        default:
          break;
      }
    });

    const updatedHTML = tempDiv.innerHTML;
    const updatedElement = { ...element, code: updatedHTML };
    onUpdateElement(updatedElement);
  };

  const handleGenerateContent = async () => {
    const requestData = {
      sectionname: "Hero",
      companyName: questionnaireData.companyName || "",
      logoUrl: questionnaireData.logoUrl || "",
      goal: questionnaireData.goal || "",
      button1: formData.button1 || "",
      button2: formData.button2 || "",
      text1: formData.text1 || "",
      text2: formData.text2 || "",
      text3: formData.text3 || "",
      text4: formData.text4 || "",
    };

    try {
      const response = await fetch(
        "https://genai-jp.onrender.com/personalised_content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.generatedContent) {
        setFormData((prevData) => ({
          ...prevData,
          button1: data.generatedContent.button1,
          button2: data.generatedContent.button2,
          text1: data.generatedContent.text1,
          text2: data.generatedContent.text2,
          text3: data.generatedContent.text3,
          text4: data.generatedContent.text4,
        }));
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  if (!element)
    return <div className="text-center">Select an element to edit</div>;

  return (
    <div className="overflow-y-auto h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Edit Element</h2>
        <button
          onClick={handleGenerateContent}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generate Content
        </button>
      </div>
      <form className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-gray-700">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </form>
      <button
        onClick={handleUpdate}
        className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
}

export default InputForm;

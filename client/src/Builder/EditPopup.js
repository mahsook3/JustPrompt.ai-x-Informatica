import React, { useState, useEffect } from "react";

const EditPopup = ({ componentData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: componentData.title || '',
    heading: componentData.heading || '',
    text: componentData.text || '',
    buttonText: componentData.buttontext || '',
    imageUrl: componentData.imageurl || '',
  });

  useEffect(() => {
    setFormData(componentData);
  }, [componentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Component</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Heading"
          className="mb-4 p-2 border w-full"
        />
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Text"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          placeholder="Button Text"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="mb-4 p-2 border w-full"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;

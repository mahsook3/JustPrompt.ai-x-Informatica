import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, X } from "lucide-react";
import axios from "axios";

const indianLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  // Add other languages here as needed...
];

const Chatbot = ({ isOpen, toggleChat }) => {
  const messagesEndRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selected = selection.toString().trim();

    // Ensure selection is valid and within the chatbot container
    if (
      selected &&
      messagesEndRef.current &&
      messagesEndRef.current.contains(selection.anchorNode)
    ) {
      setSelectedText(selected);
    } else {
      setSelectedText("");
    }
  };

  const handleTranslate = async () => {
    if (!selectedText) {
      alert("Please select some text to translate.");
      return;
    }
    if (!selectedLanguage) {
      alert("Please select a language.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/translate", {
        query: selectedText,
        targetLanguage: selectedLanguage,
        sourceLanguage: "en",
      });
      setTranslatedText(response.data.query);
    } catch (error) {
      console.error("Error translating text:", error);
      alert("Translation failed. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 sm:w-96 h-[32rem] z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-400 to-green-500 text-white">
                <h3 className="text-lg font-semibold">Chatbot Translator</h3>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-grow overflow-auto p-4 space-y-4" onMouseUp={handleTextSelect}>
  <div ref={messagesEndRef}>
    <p>Welcome to the chatbot!</p>
    <h1>This is a header.</h1>
    <span>Here is some span text for testing selection.</span>
    <p>You can select text from any of these elements.</p>
  </div>
  {selectedText && (
    <div className="p-4 bg-yellow-100 rounded-lg">
      <p className="text-black">Selected Text: {selectedText}</p>
    </div>
  )}
  {translatedText && (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p className="text-black">{translatedText}</p>
    </div>
  )}
</div>
              <div className="p-4">
                <select
                  name="language"
                  id="language"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-indigo-600 focus:shadow-md"
                >
                  <option value="">Select Language</option>
                  {indianLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleTranslate}
                  className="mt-4 w-full bg-green-400 text-white py-3 rounded-md shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Translate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button
            onClick={toggleChat}
            className="bg-green-400 text-white p-4 rounded-full shadow-lg hover:bg-green-500 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Languages className="h-6 w-6" />}
            <span className="sr-only">Toggle Chat</span>
          </button>
        </motion.div>
      </div>
    </>
  );
};

const ChatbotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return <Chatbot isOpen={isOpen} toggleChat={toggleChat} />;
};

export default ChatbotContainer;

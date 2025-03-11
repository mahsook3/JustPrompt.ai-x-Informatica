import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'as', name: 'Assamese (অসমীয়া)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ne', name: 'Nepali (नेपाली)' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'sa', name: 'Sanskrit (संस्कृतम्)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'kok', name: 'Konkani (कोंकणी)' },
  { code: 'mai', name: 'Maithili (मैथिली)' },
  { code: 'ks', name: 'Kashmiri (कश्मीरी)' },
  { code: 'mni', name: 'Manipuri (मणिपुरी)' },
  { code: 'sat', name: 'Santali (संथाली)' },
  { code: 'dog', name: 'Dogri (डोगरी)' },
  { code: 'gom', name: 'Goan Konkani (गोवा कोंकणी)' },
  { code: 'brx', name: 'Bodo (बोडो)' },
  { code: 'sd', name: 'Sindhi (सिंधी)' }
];

// Mock translations for testing (remove in production)
const mockTranslations = {
  'hi': {
    'Duty Drawback': 'शुल्क वापसी',
    'Tariff Item': 'टैरिफ आइटम',
    'Drawback Rate': 'ड्रॉबैक दर',
    'Cap per unit in Rs.': 'प्रति यूनिट कैप (रु.)',
    'Unit': 'इकाई'
  }
};

const translationCache = {
  translations: {},
  addTranslation(language, originalText, translatedText) {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }
    this.translations[language][originalText] = translatedText;
  },
  getTranslation(language, originalText) {
    return this.translations[language]?.[originalText] || null;
  }
};

export default function Translator() {
  const dispatch = useDispatch();
  const { selectedLanguage: storeSelectedLanguage } = useSelector((state) => state.form.formData);
  
  // Get initial language from session storage or default to English
  const initialLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
  
  // Local state for the current language selection
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [elementCount, setElementCount] = useState(0);
  const observerRef = useRef(null);
  const translatedElementsRef = useRef(new Set());
  const isInitialRender = useRef(true);

  // Get language name for display
  const language = languages.find(lang => lang.code === currentLanguage)?.name || 'English';

  // Update local state when store changes
  useEffect(() => {
    if (storeSelectedLanguage && storeSelectedLanguage !== currentLanguage) {
      setCurrentLanguage(storeSelectedLanguage);
    }
  }, [storeSelectedLanguage]);

  const translateSingle = async (text, targetLanguage) => {
    try {
      // Skip if already translated or empty
      if (!text || text.trim() === '') return text;
      
      // Check cache first
      const cachedTranslation = translationCache.getTranslation(targetLanguage, text);
      if (cachedTranslation) {
        return cachedTranslation;
      }
      
      // Attempt to use the API
      const response = await fetch('https://cross-intelligence-50023657941.development.catalystappsail.in/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sourceLanguage: 'en',
          targetLanguage,
          text
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle API response structure
      if (data && typeof data.text === 'string' && data.text.trim()) {
        // Cache the successful translation
        translationCache.addTranslation(targetLanguage, text, data.text);
        return data.text;
      } 
      
      throw new Error('Invalid response format from translation API');
    } catch (err) {
      console.warn(`Translation API error for "${text}": ${err.message}`);
      
      // If API fails, use fallback (mock data in this example)
      if (mockTranslations[targetLanguage] && mockTranslations[targetLanguage][text]) {
        setFallbackMode(true);
        const fallbackTranslation = mockTranslations[targetLanguage][text];
        // Cache the fallback translation
        translationCache.addTranslation(targetLanguage, text, fallbackTranslation);
        return fallbackTranslation;
      }
      
      // If no fallback translation is available, return the original text
      return text;
    }
  };

  // Function to translate a specific element
  const translateElement = async (element) => {
    if (!element || translatedElementsRef.current.has(element)) return false;
    
    const originalText = element.getAttribute('data-original-text') || element.textContent.trim();
    if (!originalText) return false;
    
    try {
      // Store original text if not already stored
      if (!element.hasAttribute('data-original-text')) {
        element.setAttribute('data-original-text', originalText);
      }
      
      // Translate the text
      const translatedText = await translateSingle(originalText, currentLanguage);
      
      if (translatedText && translatedText !== originalText) {
        element.textContent = translatedText;
        translatedElementsRef.current.add(element);
        // Store in sessionStorage to persist across navigations
        sessionStorage.setItem(`translation_${currentLanguage}_${originalText}`, translatedText);
        return true;
      }
    } catch (error) {
      console.error(`Error translating element: ${error.message}`);
    }
    
    return false;
  };

  // Function to reset translations to English
  const resetToEnglish = () => {
    document.querySelectorAll('[id="Translatable"][data-original-text]').forEach(element => {
      element.textContent = element.getAttribute('data-original-text');
    });
    translatedElementsRef.current.clear();
  };

  // Function to translate all currently visible elements with id="Translatable"
  const translateVisibleElements = async () => {
    if (currentLanguage === 'en') {
      resetToEnglish();
      return;
    }
    
    setIsTranslating(true);
    setError(null);
    
    try {
      // Find all elements with id="Translatable"
      const elements = document.querySelectorAll('[id="Translatable"]');
      setElementCount(elements.length);
      
      if (!elements.length) {
        console.warn('No translatable elements found currently, will monitor for new elements');
        return;
      }

      let translationCount = 0;
      let failedCount = 0;
      
      // Process elements in batches
      const batchSize = 5;
      for (let i = 0; i < elements.length; i += batchSize) {
        const batch = Array.from(elements).slice(i, i + batchSize);
        
        // Process batch concurrently
        const results = await Promise.all(
          batch.map(element => translateElement(element))
        );
        
        // Count successes and failures
        results.forEach(success => {
          if (success) translationCount++;
          else failedCount++;
        });
      }

      // Show success message if any translations were successful
      if (translationCount > 0) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
      
    } catch (error) {
      console.error('Translation process error:', error);
      setError(error.message || 'Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Apply translations from cache for newly rendered elements
  const applyTranslationsFromCache = () => {
    const elements = document.querySelectorAll('[id="Translatable"]');
    
    elements.forEach(element => {
      if (translatedElementsRef.current.has(element)) return;
      
      const originalText = element.textContent.trim();
      if (!originalText) return;
      
      // Try to get from cache (either from translationCache or sessionStorage)
      let translatedText = translationCache.getTranslation(currentLanguage, originalText);
      
      if (!translatedText) {
        // Try sessionStorage as fallback
        translatedText = sessionStorage.getItem(`translation_${currentLanguage}_${originalText}`);
      }
      
      if (translatedText) {
        // Store original text for potential reversion to English
        if (!element.hasAttribute('data-original-text')) {
          element.setAttribute('data-original-text', originalText);
        }
        
        element.textContent = translatedText;
        translatedElementsRef.current.add(element);
        
        // Make sure it's in our runtime cache
        translationCache.addTranslation(currentLanguage, originalText, translatedText);
      }
    });
  };

  // Set up MutationObserver to watch for DOM changes
  useEffect(() => {
    // Initialize MutationObserver to watch for new translatable elements
    const observerCallback = (mutations) => {
      let newElements = false;
      
      for (const mutation of mutations) {
        // Check for newly added nodes
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Process each added node
          mutation.addedNodes.forEach(node => {
            // Check if node is an element
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if this element has id="Translatable"
              if (node.id === 'Translatable') {
                newElements = true;
              }
              
              // Also check its children
              const translatableChildren = node.querySelectorAll('[id="Translatable"]');
              if (translatableChildren.length > 0) {
                newElements = true;
              }
            }
          });
        }
      }
      
      // If new translatable elements were found, apply cached translations immediately
      if (newElements && currentLanguage !== 'en') {
        applyTranslationsFromCache();
        
        // For elements not in cache, translate them
        if (!isTranslating) {
          translateVisibleElements();
        }
      }
    };
    
    // Create observer instance
    observerRef.current = new MutationObserver(observerCallback);
    
    // Start observing the entire document for changes
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Initial translation
    if (currentLanguage !== 'en') {
      // First try to apply cached translations
      applyTranslationsFromCache();
      
      // Then translate anything that wasn't in cache
      translateVisibleElements();
    } else {
      resetToEnglish();
    }
    
    // Clean up observer on unmount or language change
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentLanguage]);

  // Load existing translations from sessionStorage on initial render
  useEffect(() => {
    if (isInitialRender.current && currentLanguage !== 'en') {
      // Populate our runtime cache from sessionStorage
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.startsWith(`translation_${currentLanguage}_`)) {
          const originalText = key.replace(`translation_${currentLanguage}_`, '');
          const translatedText = sessionStorage.getItem(key);
          translationCache.addTranslation(currentLanguage, originalText, translatedText);
        }
      }
      
      isInitialRender.current = false;
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    
    // Clear current translations tracking
    translatedElementsRef.current.clear();
    
    // Update local state
    setCurrentLanguage(newLanguage);
    
    // Also update Redux store
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        selectedLanguage: newLanguage
      }
    });
    
    // Save language preference in sessionStorage to persist across page reloads
    sessionStorage.setItem('selectedLanguage', newLanguage);
  };

  // Function to apply translation (for the Apply button)
  const applyTranslation = () => {
    translateVisibleElements();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <select
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={currentLanguage}
          onChange={handleLanguageChange}
          disabled={isTranslating}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        
        {isTranslating && (
          <div className="flex items-center text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>Translating...</span>
          </div>
        )}
         {success && (
        <div className="flex items-center text-green-500 mt-2">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {fallbackMode 
              ? "Translation completed with fallback mode" 
              : "Completed"}
          </span>
        </div>
      )}
      </div>
      
      {error && (
        <div className="flex items-center text-red-500 mt-2">
          <AlertTriangle className="w-4 h-4 mr-1" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
     
    </div>
  );
}
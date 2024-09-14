import React, {createContext,useState} from 'react'

export const LanguageContext = createContext("en")
export const LanguageProvider = ({ children }) => {
    const [Language, setLanguage] = useState(localStorage.getItem("language") || "en"); // 'en' for English, 'ar' for Arabic
  
    const ToggleLanguage = () => {
        const newLanguage = Language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    };
  
    return (
      <LanguageContext.Provider value={{ Language, ToggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  };
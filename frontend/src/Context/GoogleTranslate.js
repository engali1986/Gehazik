import React, { useEffect } from 'react';

function GoogleTranslate() {
  useEffect(() => {
    // Load Google Translate script dynamically
    const addScript = document.createElement('script');
    addScript.setAttribute('type', 'text/javascript');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);

    // Initialize Google Translate when the script is loaded
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div>
      {/* Google Translate widget will be injected here */}
      {/* <div id="google_translate_element"></div> */}
    </div>
  );
}

export default GoogleTranslate;
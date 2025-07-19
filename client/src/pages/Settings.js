import React, { useState, useEffect } from 'react';
import '../style/settings.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.style.fontSize =
      fontSize === 'small' ? '14px' : fontSize === 'large' ? '20px' : '16px';
  }, [darkMode, fontSize, highContrast]);

  const translations = {
    en: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      fontSize: 'Font Size',
      contrast: 'High Contrast',
      language: 'Language',
    },
    hi: {
      title: 'सेटिंग्स',
      darkMode: 'डार्क मोड',
      fontSize: 'फ़ॉन्ट आकार',
      contrast: 'उच्च कंट्रास्ट',
      language: 'भाषा',
    },
  };

  const t = translations[language];

  return (
    <div className="settings-container">
      <h2>{t.title}</h2>

      <div className="setting-item">
        <label>{t.darkMode}:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </div>

      <div className="setting-item">
        <label>{t.fontSize}:</label>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Default</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="setting-item">
        <label>{t.contrast}:</label>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={(e) => setHighContrast(e.target.checked)}
        />
      </div>

      <div className="setting-item">
        <label>{t.language}:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;


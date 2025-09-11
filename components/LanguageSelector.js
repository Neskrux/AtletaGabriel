import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-dark-700 border border-dark-600 hover:border-blood-600 transition-all"
      >
        <Globe className="w-4 h-4 text-blood-400" />
        <span className="text-sm text-white font-medium">{currentLang?.flag}</span>
        <span className="text-xs text-steel-400 uppercase hidden sm:block">{currentLang?.label}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600 z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition-colors ${
                language === lang.code ? 'bg-dark-700 border-l-2 border-blood-600' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm text-white">{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto text-blood-400">✓</span>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSelector;

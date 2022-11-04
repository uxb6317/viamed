import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Language from './Language';

const languages = ['en', 'hr'];

const ChangeLanguage = ({ showLanguages, setShowLanguages }) => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setShowLanguages(false);
  };

  return (
    <div>
      {showLanguages && (
        <motion.div
          className='flex'
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >
          {languages.map(lang => (
            <Language
              key={lang}
              onClick={e => changeLanguage(lang)}
              icon={`/images/languages/${lang}.svg`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ChangeLanguage;

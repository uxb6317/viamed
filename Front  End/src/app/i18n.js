import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/* 
  Configuration file for the i18 localization library.
  All translations belong here.
*/

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: 'en',
    resources: {
      hr: {
        translations: {
          'Sign In': 'Prijaviti se',
          'Sign Up': 'Prijavite Se',
          'Continue With': 'Nastavite sa',
          Continue: 'Nastaviti',
          Email: 'Email',
          Name: 'Ime',
          Book: 'Rezervirati',
          'Confirm Password': 'Potvrdi lozinku',
          'Forgot Password': 'Zaboravili ste lozinku',
          Health: 'Zdravstveni',
          Tourism: 'Turizam',
          Facebook: 'Facebook',
          'Continue with': 'Nastavi S',
          Password: 'Zaporka',
          Search: 'Traži',
          Categories: 'Kategorije',
          Clinics: 'Ordinacije',
          Treatments: 'Tretmani',
          Services: 'Usluge',
          'Check-up': 'Pregled',
          'About Us': 'O nama',
          Specialties: 'Specijaliteti',
          Contact: 'Kontakt',
          Chat: 'Razgovor',
          'Similar treatments': 'Slični tretmani',
          Location: 'Mjesto',
          'All Clinics': 'Sve Klinike',
          Profile: 'Profil',
          Language: 'Jezik',
          Logout: 'Odjavite se',
          'Phone Number': 'Broj Telefona',
          'About Treatment': 'O Tretmanu',
        },
      },
      en: {
        translations: {},
      },
    },
    fallbackLng: 'en',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

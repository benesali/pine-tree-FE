// i18n infrastructure for future multilanguage support
export type Locale = 'en' | 'cs' | 'de';

export const defaultLocale: Locale = 'en';

export const locales: Record<Locale, string> = {
  en: 'English',
  cs: 'Čeština',
  de: 'Deutsch',
};

// Translation keys structure
export interface Translations {
  nav: {
    apartments: string;
    reviews: string;
    travelTips: string;
    about: string;
    contact: string;
    bookNow: string;
    faq: string; 
  };
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  apartments: {
    title: string;
    perNight: string;
    guests: string;
    bedrooms: string;
    bathrooms: string;
    available: string;
    booked: string;
    viewDetails: string;
    bookNow: string;
  };
  calendar: {
    available: string;
    booked: string;
    selected: string;
  };
  reviews: {
    title: string;
    subtitle: string;
  };
  travelTips: {
    title: string;
    subtitle: string;
  };
  common: {
    loading: string;
    error: string;
    back: string;
  };
}

// English translations (default)
export const en: Translations = {
  nav: {
    apartments: 'Apartments',
    reviews: 'Reviews',
    travelTips: 'Travel Tips',
    about: 'About Us',
    contact: 'Contact',
    bookNow: 'Book Now',
    faq: 'FAQ', 
  },
  hero: {
    title: 'Your Dalmatian Paradise Awaits',
    subtitle: 'Experience the stunning Croatian coastline from our carefully curated apartments',
    searchPlaceholder: 'Select dates',
  },
  apartments: {
    title: 'Our Apartments',
    perNight: '/ night',
    guests: 'guests',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    available: 'Available',
    booked: 'Booked',
    viewDetails: 'View Details',
    bookNow: 'Book Now',
  },
  calendar: {
    available: 'Available',
    booked: 'Booked',
    selected: 'Selected',
  },
  reviews: {
    title: 'Guest Reviews',
    subtitle: 'What our guests say about their stay',
  },
  travelTips: {
    title: 'Travel Tips',
    subtitle: 'Make the most of your Dalmatian adventure',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    back: 'Back',
  },
};

// Czech translations (to be filled)
export const cs: Translations = {
  nav: {
    apartments: 'Apartmány',
    reviews: 'Recenze',
    travelTips: 'Tipy na výlety',
    about: 'O nás',
    contact: 'Kontakt',
    bookNow: 'Rezervovat',
    faq: 'FAQ', 
  },
  hero: {
    title: 'Váš dalmatský ráj čeká',
    subtitle: 'Zažijte úchvatné chorvatské pobřeží z našich pečlivě vybraných apartmánů',
    searchPlaceholder: 'Vyberte termín',
  },
  apartments: {
    title: 'Naše apartmány',
    perNight: '/ noc',
    guests: 'hostů',
    bedrooms: 'ložnice',
    bathrooms: 'koupelny',
    available: 'Volný',
    booked: 'Obsazeno',
    viewDetails: 'Zobrazit detail',
    bookNow: 'Rezervovat',
  },
  calendar: {
    available: 'Volný',
    booked: 'Obsazeno',
    selected: 'Vybraný',
  },
  reviews: {
    title: 'Recenze hostů',
    subtitle: 'Co říkají naši hosté o svém pobytu',
  },
  travelTips: {
    title: 'Tipy na výlety',
    subtitle: 'Využijte naplno své dalmatské dobrodružství',
  },
  common: {
    loading: 'Načítání...',
    error: 'Něco se pokazilo',
    back: 'Zpět',
  },
};

// German translations (to be filled)
export const de: Translations = {
  nav: {
    apartments: 'Apartments',
    reviews: 'Bewertungen',
    travelTips: 'Reisetipps',
    about: 'Über uns',
    contact: 'Kontakt',
    bookNow: 'Jetzt buchen',
    faq: 'FAQ', 
  },
  hero: {
    title: 'Ihr dalmatinisches Paradies wartet',
    subtitle: 'Erleben Sie die atemberaubende kroatische Küste von unseren sorgfältig ausgewählten Apartments',
    searchPlaceholder: 'Datum auswählen',
  },
  apartments: {
    title: 'Unsere Apartments',
    perNight: '/ Nacht',
    guests: 'Gäste',
    bedrooms: 'Schlafzimmer',
    bathrooms: 'Badezimmer',
    available: 'Verfügbar',
    booked: 'Gebucht',
    viewDetails: 'Details anzeigen',
    bookNow: 'Jetzt buchen',
  },
  calendar: {
    available: 'Verfügbar',
    booked: 'Gebucht',
    selected: 'Ausgewählt',
  },
  reviews: {
    title: 'Gästebewertungen',
    subtitle: 'Was unsere Gäste über ihren Aufenthalt sagen',
  },
  travelTips: {
    title: 'Reisetipps',
    subtitle: 'Machen Sie das Beste aus Ihrem dalmatinischen Abenteuer',
  },
  common: {
    loading: 'Laden...',
    error: 'Etwas ist schief gelaufen',
    back: 'Zurück',
  },
};

const translations: Record<Locale, Translations> = { en, cs, de };

export const getTranslations = (locale: Locale = defaultLocale): Translations => {
  return translations[locale] || translations[defaultLocale];
};

// Hook for future React context integration
export const useTranslation = () => {
  const locale = defaultLocale; // Will be replaced with context
  return {
    t: getTranslations(locale),
    locale,
  };
};

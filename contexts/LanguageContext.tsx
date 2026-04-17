'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import i18n, { type Lang, type Translations } from '@/lib/i18n';

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'da',
  setLang: () => {},
  t: i18n.da,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('da');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dietzcc_lang') as Lang | null;
      if (stored === 'da' || stored === 'en') setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('dietzcc_lang', l); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: i18n[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

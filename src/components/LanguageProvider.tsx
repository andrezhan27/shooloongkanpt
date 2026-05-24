"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState
} from "react";

export type Language = "pt" | "en";

type CopyValue = {
  pt: string;
  en: string;
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (copy: CopyValue) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (copy: CopyValue) => copy[language]
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

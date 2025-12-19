import { useState, useEffect, useCallback } from 'react';
import { DICTIONARY } from '../../core/i18n/translations';
import type { Language } from '../../core/i18n/translations'; // <--- CORRECCIÓN TIPO

// Re-exportamos Language para que otros archivos lo usen
export type { Language };

export const LANGUAGES: Record<Language, { label: string, flag: string }> = {
  es: { label: 'Español', flag: '🇪🇸' },
  en: { label: 'English', flag: '🇺🇸' },
  pt: { label: 'Português', flag: '🇧🇷' },
  fr: { label: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', flag: '🇩🇪' }
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    // Default a Español si no hay preferencia guardada
    return (localStorage.getItem('cipher-lang') as Language) || 'es';
  });

  useEffect(() => {
    localStorage.setItem('cipher-lang', language);
  }, [language]);

  // Función de traducción segura
  const t = useCallback((key: string): string => {
    const dictionary = DICTIONARY[language];
    return dictionary[key] || key;
  }, [language]);

  return { language, setLanguage, t };
}

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, translations, type Translations } from '@/lib/translations';

interface TranslationContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: keyof Translations) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Helper to load language from localStorage
function loadLanguage(): Language {
    if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('preferredLanguage') as Language;
        if (savedLang && ['en', 'uz', 'ru'].includes(savedLang)) {
            return savedLang;
        }
    }
    return 'en';
}

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>(loadLanguage);

    // Keep the <html lang> attribute in sync for accessibility & SEO.
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }, [lang]);

    // Save language to localStorage when changed
    const changeLang = (newLang: Language) => {
        setLang(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredLanguage', newLang);
        }
    };

    // Translation helper
    const t = (key: keyof Translations): string => {
        return translations[lang][key as keyof Translations] || translations.en[key as keyof Translations];
    };

    return (
        <TranslationContext.Provider value={{ lang, setLang: changeLang, t }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { fadeIn } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import Link from 'next/link';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { lang, setLang, t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const langOptions = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    ] as const;

    const currentLang = langOptions.find(l => l.code === lang) || langOptions[0];

    const handleLangChange = (newLang: string) => {
        setLang(newLang as 'en' | 'uz' | 'ru');
        setShowLangMenu(false);
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-[#4F6815]/20 shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18">
                    {/* Logo - No R div */}
                    <motion.div variants={fadeIn} initial="hidden" animate="visible">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-2xl text-[#4F6815] tracking-tight">
                                Recipe<span className="text-[#75070C]">AI</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link href="/predefined" className="text-base font-medium text-gray-700 hover:text-[#4F6815] transition-colors">
                            {t('navBrowseRecipes')}
                        </Link>
                        <Link href="/saved" className="text-base font-medium text-gray-700 hover:text-[#4F6815] transition-colors">
                            {t('navMyCookbook')}
                        </Link>
                        <a href="#demo" className="text-base font-medium text-gray-700 hover:text-[#4F6815] transition-colors">
                            {t('navGenerateNew')}
                        </a>
                    </div>

                    {/* Right Side: Language + CTA */}
                    <div className="flex items-center gap-3">
                        {/* Language Toggle - Smaller, cleaner */}
                        <div className="relative">
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FFEDAB]/30 hover:bg-[#FFEDAB] transition-colors"
                            >
                                <span className="text-lg">{currentLang.flag}</span>
                            </button>

                            {/* Language Dropdown */}
                            {showLangMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-[#4F6815]/10 py-2 z-50"
                                >
                                    {langOptions.map((option) => (
                                        <button
                                            key={option.code}
                                            onClick={() => handleLangChange(option.code)}
                                            className={`w-full text-left px-4 py-2.5 hover:bg-[#FFEDAB]/30 transition-colors flex items-center gap-2 ${lang === option.code ? 'bg-[#4F6815]/10 text-[#4F6815] font-medium' : 'text-gray-700'}`}
                                        >
                                            <span className="text-lg">{option.flag}</span>
                                            <span className="text-sm">{option.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* CTA Button - Darker */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Link href="#waitlist">
                                <Button
                                    className="bg-[#5a0509] hover:bg-[#3d0306] text-white font-semibold px-5 py-2.5"
                                >
                                    {t('navSaved')}
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
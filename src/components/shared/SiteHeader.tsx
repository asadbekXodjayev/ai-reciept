'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';

const LANGS = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: "O‘zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
] as const;

interface SiteHeaderProps {
    /** Landing page sits over a hero, so the bar starts transparent. */
    transparentOnTop?: boolean;
    /** Show the in-page "Generate" anchor (landing only). */
    showGenerateAnchor?: boolean;
}

export function SiteHeader({ transparentOnTop = false, showGenerateAnchor = false }: SiteHeaderProps) {
    const { lang, setLang, t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const solid = scrolled || !transparentOnTop || menuOpen;
    const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

    const navLinks = (
        <>
            <Link
                href="/predefined"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-[#4F6815] dark:hover:text-[#a3c14f]"
            >
                {t('navBrowseRecipes')}
            </Link>
            <Link
                href="/saved"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-[#4F6815] dark:hover:text-[#a3c14f]"
            >
                {t('navMyCookbook')}
            </Link>
            {showGenerateAnchor && (
                <a
                    href="#demo"
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium text-foreground/80 transition-colors hover:text-[#4F6815] dark:hover:text-[#a3c14f]"
                >
                    {t('navGenerateNew')}
                </a>
            )}
        </>
    );

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                solid
                    ? 'border-b border-[#4F6815]/15 bg-background/90 backdrop-blur-md shadow-sm dark:border-white/10'
                    : 'bg-transparent',
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center" aria-label="RecipeAI home">
                    <span className="font-heading text-2xl font-bold tracking-tight text-[#4F6815] dark:text-[#a3c14f]">
                        Recipe<span className="text-[#75070C] dark:text-[#e06b70]">AI</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-7 lg:flex">{navLinks}</nav>

                <div className="flex items-center gap-2">
                    {/* Theme toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
                        className="rounded-lg p-2 text-foreground/80 transition-colors hover:bg-[#FFEDAB]/40 dark:hover:bg-white/10"
                    >
                        {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
                    </button>

                    {/* Language */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="menu"
                            aria-expanded={langOpen}
                            aria-label={t('langLabel')}
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-foreground/80 transition-colors hover:bg-[#FFEDAB]/40 dark:hover:bg-white/10"
                        >
                            <Globe className="size-5" />
                            <span className="text-sm font-medium uppercase">{current.code}</span>
                        </button>
                        <AnimatePresence>
                            {langOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" aria-hidden onClick={() => setLangOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        role="menu"
                                        className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-xl"
                                    >
                                        {LANGS.map((l) => (
                                            <button
                                                key={l.code}
                                                role="menuitemradio"
                                                aria-checked={lang === l.code}
                                                onClick={() => {
                                                    setLang(l.code);
                                                    setLangOpen(false);
                                                }}
                                                className={cn(
                                                    'flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#FFEDAB]/30 dark:hover:bg-white/5',
                                                    lang === l.code ? 'font-semibold text-[#4F6815] dark:text-[#a3c14f]' : 'text-foreground/80',
                                                )}
                                            >
                                                <span className="text-base">{l.flag}</span>
                                                <span className="flex-1">{l.label}</span>
                                                {lang === l.code && <Check className="size-4" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Primary CTA (desktop) */}
                    <Link href="/predefined" className="hidden sm:block">
                        <Button className="bg-[#75070C] font-semibold text-white hover:bg-[#5a0509]">
                            {t('navBrowseRecipes')}
                        </Button>
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
                        aria-expanded={menuOpen}
                        className="rounded-lg p-2 text-foreground/80 transition-colors hover:bg-[#FFEDAB]/40 lg:hidden dark:hover:bg-white/10"
                    >
                        {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-border bg-background lg:hidden"
                    >
                        <nav className="flex flex-col gap-1 px-4 py-4">
                            {navLinks}
                            <Link href="/predefined" onClick={() => setMenuOpen(false)} className="mt-2">
                                <Button className="w-full bg-[#75070C] font-semibold text-white hover:bg-[#5a0509]">
                                    {t('navBrowseRecipes')}
                                </Button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

'use client';

import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { useTranslation } from '@/contexts/TranslationContext';

export function SiteFooter() {
    const { t } = useTranslation();
    const year = 2026;

    const columns = [
        {
            heading: t('footerProduct'),
            links: [
                { label: t('footerFeatures'), href: '/#features' },
                { label: t('footerPricing'), href: '/#pricing' },
                { label: t('navBrowseRecipes'), href: '/predefined' },
            ],
        },
        {
            heading: t('footerCompany'),
            links: [
                { label: t('footerAbout'), href: '/#features' },
                { label: t('navMyCookbook'), href: '/saved' },
                { label: t('footerBlog'), href: '/#demo' },
            ],
        },
        {
            heading: t('footerLegal'),
            links: [
                { label: t('footerPrivacy'), href: '/#waitlist' },
                { label: t('footerTerms'), href: '/#waitlist' },
                { label: t('footerContact'), href: '/#waitlist' },
            ],
        },
    ];

    return (
        <footer className="border-t border-border bg-[#1c1a12] py-14 text-gray-300 dark:bg-card">
            <Container>
                <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <div className="col-span-2 sm:col-span-1">
                        <Link href="/" className="font-heading text-2xl font-bold text-[#FFEDAB]">
                            Recipe<span className="text-[#e06b70]">AI</span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm text-gray-400">{t('footerTagline')}</p>
                    </div>
                    {columns.map((col) => (
                        <div key={col.heading}>
                            <h4 className="mb-4 font-semibold text-white">{col.heading}</h4>
                            <ul className="space-y-2.5 text-sm">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-gray-400 transition-colors hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-sm text-gray-400">
                        © {year} RecipeAI. {t('footerCopyright')}
                    </p>
                    <div className="flex gap-5 text-sm text-gray-400">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                            Twitter
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                            Instagram
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                            Facebook
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

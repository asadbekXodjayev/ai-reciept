'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/contexts/TranslationContext';

const DEMO_INGREDIENTS = ['chicken', 'lemon', 'pasta', 'rice'] as const;

export function HeroSection() {
    const { t } = useTranslation();
    const [displayedIngredient, setDisplayedIngredient] = useState('');
    const [ingredientIndex, setIngredientIndex] = useState(0);

    useEffect(() => {
        const currentIngredient = DEMO_INGREDIENTS[ingredientIndex];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < currentIngredient.length) {
                setDisplayedIngredient(currentIngredient.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setDisplayedIngredient('');
                    setIngredientIndex((prev) => (prev + 1) % DEMO_INGREDIENTS.length);
                }, 2000);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, [ingredientIndex]);

    return (
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 bg-gradient-to-b from-[#FFFBF0] via-white to-white dark:from-background dark:via-background dark:to-background overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFEDAB]/20 dark:bg-[#FFEDAB]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F6815]/10 dark:bg-[#4F6815]/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#75070C]/5 dark:bg-[#75070C]/10 rounded-full blur-3xl" />
            </div>

            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6815]/10 dark:bg-[#4F6815]/20 text-[#4F6815] dark:text-[#a3c14f] text-sm font-medium mb-8"
                    >
                        <span className="text-lg" aria-hidden="true">🍳</span>
                        <span>{t('heroBadge')}</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight text-balance"
                    >
                        {t('heroHeadlinePre')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6815] to-[#75070C] dark:from-[#a3c14f] dark:to-[#e06b70]">
                            {t('heroHeadlineAccent')}
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto text-pretty"
                    >
                        {t('heroSubtitle')}
                    </motion.p>

                    {/* Demo Input */}
                    <motion.div variants={fadeInUp} className="mb-10">
                        <div className="bg-card/80 backdrop-blur-sm border-2 border-[#4F6815]/20 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow">
                            <label htmlFor="hero-demo-input" className="block text-sm font-medium text-foreground mb-4">
                                {t('demoIngredients')}
                            </label>
                            <div className="flex items-center gap-3">
                                <Input
                                    id="hero-demo-input"
                                    type="text"
                                    placeholder={t('demoIngredientsPlaceholder')}
                                    value={displayedIngredient}
                                    readOnly
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="flex-1 border-[#FFEDAB] dark:border-white/10 focus:border-[#4F6815] text-lg font-mono py-4 px-5"
                                />
                                <span className="animate-pulse text-3xl text-[#75070C] dark:text-[#e06b70]" aria-hidden="true">|</span>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2 justify-center">
                                {DEMO_INGREDIENTS.map((ingredient) => (
                                    <span
                                        key={ingredient}
                                        className={`text-sm px-4 py-1.5 rounded-full transition-all capitalize ${
                                            displayedIngredient.toLowerCase() === ingredient.toLowerCase()
                                                ? 'bg-[#4F6815] text-white scale-105 shadow-lg'
                                                : 'bg-[#FFEDAB]/50 dark:bg-white/5 text-foreground/80'
                                        }`}
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-[#75070C] hover:bg-[#5a0509] text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            <Link href="#demo">
                                <span aria-hidden="true">🚀</span> {t('heroCtaPrimary')}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-[#4F6815] dark:border-[#a3c14f] text-[#4F6815] dark:text-[#a3c14f] px-10 py-4 text-lg font-semibold hover:bg-[#4F6815]/5 dark:hover:bg-[#a3c14f]/10"
                        >
                            <Link href="/predefined">
                                <span aria-hidden="true">📚</span> {t('heroCtaSecondary')}
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 pt-8 border-t border-border"
                    >
                        <p className="text-sm text-muted-foreground mb-4">{t('heroTrustLabel')}</p>
                        <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl" aria-hidden="true">⭐</span>
                                <span className="font-semibold text-foreground">4.9/5</span>
                                <span>{t('heroStatRating')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl" aria-hidden="true">👥</span>
                                <span className="font-semibold text-foreground">100K+</span>
                                <span>{t('heroStatUsers')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl" aria-hidden="true">🍽️</span>
                                <span className="font-semibold text-foreground">50K+</span>
                                <span>{t('heroStatRecipes')}</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}

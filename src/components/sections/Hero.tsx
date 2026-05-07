'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/contexts/TranslationContext';
import Link from 'next/link';

export function HeroSection() {
    const { t, lang } = useTranslation();
    const [displayedIngredient, setDisplayedIngredient] = useState('');
    const [ingredientIndex, setIngredientIndex] = useState(0);

    useEffect(() => {
        const ingredients = ['chicken', 'lemon', 'pasta', 'rice'];
        const currentIngredient = ingredients[ingredientIndex];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < currentIngredient.length) {
                setDisplayedIngredient(currentIngredient.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setDisplayedIngredient('');
                    setIngredientIndex((prev) => (prev + 1) % ingredients.length);
                }, 2000);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, [ingredientIndex]);

    return (
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#FFFBF0] via-white to-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFEDAB]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F6815]/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#75070C]/5 rounded-full blur-3xl" />
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6815]/10 text-[#4F6815] text-sm font-medium mb-8"
                    >
                        <span className="text-lg">🍳</span>
                        <span>{t('heroTitle')}</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
                    >
                        Dinner Decided in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6815] to-[#75070C]">
                            10 Seconds
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
                    >
                        {t('heroSubtitle')}
                    </motion.p>

                    {/* Demo Input */}
                    <motion.div variants={fadeInUp} className="mb-10">
                        <div className="bg-white/80 backdrop-blur-sm border-2 border-[#4F6815]/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow">
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                {t('demoIngredients')}
                            </label>
                            <div className="flex items-center space-x-3">
                                <Input
                                    type="text"
                                    placeholder={t('demoIngredientsPlaceholder')}
                                    value={displayedIngredient}
                                    readOnly
                                    className="flex-1 border-[#FFEDAB] focus:border-[#4F6815] text-lg font-mono py-4 px-5"
                                />
                                <span className="animate-pulse text-3xl text-[#75070C]">|</span>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2 justify-center">
                                {['chicken', 'lemon', 'pasta', 'rice'].map((ingredient) => (
                                    <span
                                        key={ingredient}
                                        className={`text-sm px-4 py-1.5 rounded-full transition-all capitalize ${
                                            displayedIngredient.toLowerCase() === ingredient.toLowerCase()
                                                ? 'bg-[#4F6815] text-white scale-105 shadow-lg'
                                                : 'bg-[#FFEDAB]/50 text-gray-700'
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
                        <Link href="#demo">
                            <Button
                                size="lg"
                                className="bg-[#5a0509] hover:bg-[#3d0306] text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                🚀 {t('demoGenerate')}
                            </Button>
                        </Link>
                        <Link href="/predefined">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-[#4F6815] text-[#4F6815] px-10 py-4 text-lg font-semibold hover:bg-[#4F6815]/5"
                            >
                                📚 {t('predefinedTitle')}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 pt-8 border-t border-gray-200"
                    >
                        <p className="text-sm text-gray-500 mb-4">Trusted by home cooks worldwide</p>
                        <div className="flex items-center justify-center gap-8 text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⭐</span>
                                <span className="font-semibold text-gray-700">4.9/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">👥</span>
                                <span className="font-semibold text-gray-700">100K+ Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🍽️</span>
                                <span className="font-semibold text-gray-700">50K+ Recipes</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
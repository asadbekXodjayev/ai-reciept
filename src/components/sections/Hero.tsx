'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HERO } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';

export function HeroSection() {
    const [displayedIngredient, setDisplayedIngredient] = useState('');
    const [ingredientIndex, setIngredientIndex] = useState(0);

    useEffect(() => {
        const ingredients = HERO.demoIngredients;
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
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#FFFBF0] to-white">
            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        {HERO.headline}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed"
                    >
                        {HERO.subheadline}
                    </motion.p>

                    {/* Demo Input */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <div className="bg-white border-2 border-[#4F6815]/20 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Try it now:
                            </label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Type an ingredient..."
                                    value={displayedIngredient}
                                    readOnly
                                    className="flex-1 border-[#FFEDAB] focus:border-[#4F6815] text-base font-mono"
                                />
                                <span className="animate-pulse text-2xl text-[#75070C]">|</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {HERO.demoIngredients.map((ingredient) => (
                                    <span
                                        key={ingredient}
                                        className={`text-sm px-3 py-1 rounded-full transition-all ${displayedIngredient.toLowerCase() ===
                                                ingredient.toLowerCase()
                                                ? 'bg-[#4F6815] text-white scale-105'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div variants={fadeInUp}>
                        <a href="#waitlist">
                            <Button
                                size="lg"
                                className="bg-[#75070C] hover:bg-[#5a0509] text-white px-8 font-semibold"
                            >
                                {HERO.cta}
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}

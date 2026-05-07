'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DEMO_RECIPE = {
    title: 'Lemon Caper Pasta with Chicken',
    time: '25 mins',
    servings: 4,
    ingredients: [
        '400g pasta (spaghetti or linguine)',
        '500g chicken breast, cubed',
        '4 tbsp capers',
        '3 lemons (zest + juice)',
        'Olive oil, salt, pepper',
    ],
    instructions: [
        'Cook pasta according to package directions',
        'Sear chicken until golden (8-10 mins)',
        'Toss with lemon juice, capers, and pasta',
        'Finish with fresh parsley and lemon zest',
    ],
};

export function DemoSection() {
    const [step, setStep] = useState<'input' | 'thinking' | 'result'>('input');
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setStep('thinking');
            setTimeout(() => setStep('result'), 2500);
        }
    };

    const resetDemo = () => {
        setStep('input');
        setInputValue('');
    };

    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FFFBF0] to-white">
            <Container>
                <motion.div className="text-center mb-16">
                    <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        See It In Action
                    </motion.h2>
                    <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Type your ingredients and watch RecipeAI generate a personalized recipe in seconds
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-2xl mx-auto"
                >
                    {/* Input Stage */}
                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="p-8 border-2 border-[#4F6815]/20">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        What do you have?
                                    </h3>
                                    <div className="space-y-4">
                                        <Input
                                            type="text"
                                            placeholder="e.g., chicken, lemon, capers, pasta"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                            className="text-base py-3 px-4 border-[#FFEDAB] focus:border-[#4F6815]"
                                            autoFocus
                                        />
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={!inputValue.trim()}
                                                className="flex-1 bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold"
                                            >
                                                Generate Recipe
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 mb-3">Try these examples:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['chicken, lemon, pasta', 'salmon, broccoli', 'eggs, spinach'].map(
                                                (example) => (
                                                    <button
                                                        key={example}
                                                        onClick={() => setInputValue(example)}
                                                        className="text-sm px-3 py-1 rounded-full bg-[#FFEDAB]/30 text-[#4F6815] hover:bg-[#FFEDAB] transition-colors"
                                                    >
                                                        {example}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* Thinking Stage */}
                        {step === 'thinking' && (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="p-12 text-center border-2 border-[#4F6815]/20">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="w-12 h-12 border-4 border-[#FFEDAB] border-t-[#4F6815] rounded-full mx-auto mb-4"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">
                                        AI is cooking up the perfect recipe...
                                    </p>
                                </Card>
                            </motion.div>
                        )}

                        {/* Result Stage */}
                        {step === 'result' && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div variants={staggerContainer} className="space-y-6">
                                    {/* Header */}
                                    <motion.div variants={fadeInUp}>
                                        <Card className="p-8 bg-gradient-to-br from-[#4F6815]/5 to-[#FFEDAB]/10 border-2 border-[#4F6815]/20">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {DEMO_RECIPE.title}
                                            </h3>
                                            <div className="flex gap-6 text-sm font-medium text-gray-600">
                                                <span>⏱️ {DEMO_RECIPE.time}</span>
                                                <span>👥 {DEMO_RECIPE.servings} servings</span>
                                            </div>
                                        </Card>
                                    </motion.div>

                                    {/* Ingredients */}
                                    <motion.div variants={fadeInUp}>
                                        <Card className="p-6 border-2 border-[#4F6815]/20">
                                            <h4 className="text-lg font-bold text-gray-900 mb-4">
                                                Ingredients
                                            </h4>
                                            <ul className="space-y-2">
                                                {DEMO_RECIPE.ingredients.map((ingredient, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * idx }}
                                                        className="flex items-start gap-3 text-gray-700"
                                                    >
                                                        <span className="text-[#4F6815] font-bold mt-1">✓</span>
                                                        {ingredient}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </Card>
                                    </motion.div>

                                    {/* Instructions */}
                                    <motion.div variants={fadeInUp}>
                                        <Card className="p-6 border-2 border-[#4F6815]/20">
                                            <h4 className="text-lg font-bold text-gray-900 mb-4">
                                                Instructions
                                            </h4>
                                            <ol className="space-y-3">
                                                {DEMO_RECIPE.instructions.map((instruction, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * (idx + DEMO_RECIPE.ingredients.length) }}
                                                        className="flex gap-4 text-gray-700"
                                                    >
                                                        <span className="font-bold text-[#4F6815] min-w-6">
                                                            {idx + 1}.
                                                        </span>
                                                        {instruction}
                                                    </motion.li>
                                                ))}
                                            </ol>
                                        </Card>
                                    </motion.div>

                                    {/* CTA */}
                                    <motion.div variants={fadeInUp} className="flex gap-3">
                                        <Button
                                            onClick={resetDemo}
                                            variant="outline"
                                            className="flex-1 border-2 border-[#4F6815] text-[#4F6815] hover:bg-[#4F6815]/5"
                                        >
                                            Try Another
                                        </Button>
                                        <Button className="flex-1 bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold">
                                            Save Recipe
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}

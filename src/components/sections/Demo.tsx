'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CUISINE_TYPES, DIETARY_PRESETS } from '@/lib/predefined-recipes';
import { useTranslation } from '@/contexts/TranslationContext';
import { getCuisineName, getDietaryName } from '@/lib/translations';

interface Recipe {
    title: string;
    totalTime: string;
    servings: number;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
    tips: string;
    calories: number;
    cuisine: string;
}

export function DemoSection() {
    const { t, lang } = useTranslation();
    const [step, setStep] = useState<'input' | 'thinking' | 'result' | 'error'>('input');
    const [inputValue, setInputValue] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('any');
    const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPredefined, setIsPredefined] = useState(false);

    const togglePreset = (presetId: string) => {
        setSelectedPresets(prev => 
            prev.includes(presetId) 
                ? prev.filter(id => id !== presetId)
                : [...prev, presetId]
        );
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;

        setStep('thinking');
        setIsLoading(true);
        setErrorMessage('');

        const combinedDietary = selectedPresets.join(', ');

        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: inputValue,
                    dietaryRestrictions: combinedDietary || dietaryRestrictions || undefined,
                    cuisine: selectedCuisine,
                    usePredefined: selectedPresets.length > 0,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('demoErrorSub'));
            }

            setRecipes(data.recipes || []);
            setIsPredefined(data.isPredefined || false);
            setStep('result');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : t('demoErrorSub'));
            setStep('error');
        } finally {
            setIsLoading(false);
        }
    };

    const resetDemo = () => {
        setStep('input');
        setInputValue('');
        setDietaryRestrictions('');
        setSelectedCuisine('any');
        setSelectedPresets([]);
        setRecipes([]);
        setErrorMessage('');
        setIsPredefined(false);
    };

    const saveAllRecipes = (recipesToSave: Recipe[]) => {
        const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        recipesToSave.forEach((recipe) => {
            saved.push({
                id: `ai-${crypto.randomUUID().slice(0, 8)}`,
                recipe: {
                    title: recipe.title,
                    totalTime: recipe.totalTime,
                    servings: recipe.servings,
                    difficulty: recipe.difficulty,
                    cuisine: recipe.cuisine,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    tips: recipe.tips,
                    calories: recipe.calories,
                },
                savedAt: new Date().toISOString(),
                isPredefined: false,
            });
        });
        localStorage.setItem('savedRecipes', JSON.stringify(saved));
        alert(`${recipesToSave.length} ${t('savedRecipesCount')}`);
    };

    return (
        <section id="demo" className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#FFFBF0]/50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFEDAB]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F6815]/5 rounded-full blur-3xl" />
            </div>

            <Container>
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6815]/10 text-[#4F6815] text-sm font-medium mb-4"
                    >
                        <span>✨</span>
                        <span>{t('demoTitle')}</span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                    >
                        {t('demoTitle')}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        {t('demoSubtitle')}
                    </motion.p>
                </div>

                <div className="max-w-3xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-white border-2 border-[#4F6815]/20 rounded-2xl p-8 shadow-xl">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        {t('demoWhatToCook')}
                                    </h3>
                                    <div className="space-y-5">
                                        {/* Ingredients Input */}
                                        <div>
                                            <label className="block text-base font-semibold text-gray-700 mb-2">
                                                {t('demoIngredients')}
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder={t('demoIngredientsPlaceholder')}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                                className="text-base py-4 px-5 border-2 border-[#FFEDAB] focus:border-[#4F6815] rounded-xl"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Cuisine Selection */}
                                        <div>
                                            <label className="block text-base font-semibold text-gray-700 mb-3">
                                                {t('demoCuisine')}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {CUISINE_TYPES.map((cuisine) => (
                                                    <button
                                                        key={cuisine.id}
                                                        onClick={() => setSelectedCuisine(cuisine.id)}
                                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                            selectedCuisine === cuisine.id
                                                                ? 'bg-[#4F6815] text-white shadow-lg scale-105'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                                        }`}
                                                    >
                                                        {cuisine.icon} {getCuisineName(lang, cuisine.id)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dietary Presets */}
                                        <div>
                                            <label className="block text-base font-semibold text-gray-700 mb-3">
                                                {t('demoDietary')}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {DIETARY_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.id}
                                                        onClick={() => togglePreset(preset.id)}
                                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                            selectedPresets.includes(preset.id)
                                                                ? 'bg-[#75070C] text-white shadow-lg scale-105'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                                        }`}
                                                    >
                                                        {preset.icon} {getDietaryName(lang, preset.id)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Additional Restrictions */}
                                        <div>
                                            <label className="block text-base font-semibold text-gray-700 mb-2">
                                                {t('demoOtherRestrictions')}
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder={t('demoOtherRestrictionsPlaceholder')}
                                                value={dietaryRestrictions}
                                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                                className="text-base py-4 px-5 border-2 border-[#FFEDAB] focus:border-[#4F6815] rounded-xl"
                                            />
                                        </div>

                                        {/* Generate Button - Darker */}
                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={!inputValue.trim() || isLoading}
                                                className="flex-1 bg-[#5a0509] hover:bg-[#3d0306] text-white font-semibold py-4 text-lg shadow-xl disabled:opacity-50"
                                            >
                                                {isLoading ? t('demoGenerating') : `🍳 ${t('demoGenerate')}`}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Example Ingredients */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 mb-3">{t('demoExamples')}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['chicken, rice, vegetables', 'pasta, tomatoes, garlic', 'eggs, cheese, spinach'].map(
                                                (example) => (
                                                    <button
                                                        key={example}
                                                        onClick={() => setInputValue(example)}
                                                        className="text-sm px-4 py-2 rounded-full bg-[#FFEDAB]/50 text-[#4F6815] hover:bg-[#FFEDAB] transition-colors border border-[#4F6815]/20"
                                                    >
                                                        {example}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
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
                                <div className="bg-white border-2 border-[#4F6815]/20 rounded-2xl p-16 text-center shadow-xl">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="w-20 h-20 border-4 border-[#FFEDAB] border-t-[#4F6815] rounded-full mx-auto mb-6"
                                    />
                                    <motion.p 
                                        className="text-xl font-bold text-gray-900 mb-2"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        {t('demoThinking')}
                                    </motion.p>
                                    <p className="text-gray-500">{t('demoThinkingSub')}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Error Stage */}
                        {step === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-10 text-center shadow-xl">
                                    <div className="text-5xl mb-4">😕</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t('demoError')}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {errorMessage}
                                    </p>
                                    <Button
                                        onClick={resetDemo}
                                        className="bg-[#5a0509] hover:bg-[#3d0306] text-white"
                                    >
                                        {t('demoTryAgain')}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Result Stage */}
                        {step === 'result' && recipes.length > 0 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div variants={staggerContainer} className="space-y-8">
                                    {/* Header */}
                                    <motion.div variants={fadeInUp} className="text-center">
                                        <div className="inline-block px-5 py-2.5 bg-[#4F6815]/10 rounded-full text-[#4F6815] font-semibold mb-4">
                                            {isPredefined ? `📚 ${t('demoCurated')}` : `✨ ${t('demoAI')}`}
                                        </div>
                                        <p className="text-gray-600">
                                            {recipes.length} {t('demoFound')}
                                        </p>
                                    </motion.div>

                                    {/* Recipe Cards */}
                                    {recipes.map((recipe, recipeIdx) => (
                                        <motion.div key={recipeIdx} variants={fadeInUp}>
                                            <div className="bg-white border-2 border-[#4F6815]/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                                                {/* Recipe Header */}
                                                <div className="flex items-start justify-between mb-6">
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                                            {recipe.title}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-4 text-base text-gray-600">
                                                            <span className="flex items-center gap-1">⏱️ {recipe.totalTime}</span>
                                                            <span className="flex items-center gap-1">👥 {recipe.servings} {t('demoServings')}</span>
                                                            <span className="flex items-center gap-1">📊 {recipe.difficulty}</span>
                                                            <span className="flex items-center gap-1">🔥 {recipe.calories} {t('demoCalories')}</span>
                                                            {recipe.cuisine && (
                                                                <span className="bg-[#4F6815]/10 text-[#4F6815] px-3 py-1 rounded-full font-medium">
                                                                    {recipe.cuisine}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-6 border-gray-200" />

                                                {/* Ingredients */}
                                                <div className="mb-6">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <span className="text-2xl">🛒</span> {t('demoIngredientsTitle')}
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {recipe.ingredients.map((ingredient, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                                <span className="text-[#4F6815] font-bold mt-0.5">✓</span>
                                                                <span>{ingredient}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className="my-6 border-gray-200" />

                                                {/* Instructions */}
                                                <div className="mb-6">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                        <span className="text-2xl">👨‍🍳</span> {t('demoInstructionsTitle')}
                                                    </h4>
                                                    <ol className="space-y-4">
                                                        {recipe.instructions.map((instruction, idx) => (
                                                            <li key={idx} className="flex gap-4 text-gray-700">
                                                                <span className="font-bold text-[#4F6815] min-w-8 flex-shrink-0 bg-[#4F6815]/5 rounded-full w-8 h-8 flex items-center justify-center">
                                                                    {idx + 1}
                                                                </span>
                                                                <span className="leading-relaxed">{instruction}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                {/* Tips */}
                                                {recipe.tips && (
                                                    <div className="bg-[#FFEDAB]/20 border-2 border-[#FFEDAB] rounded-xl p-5">
                                                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                            <span>💡</span> {t('demoProTip')}
                                                        </h4>
                                                        <p className="text-gray-700">{recipe.tips}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Action Buttons */}
                                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            onClick={resetDemo}
                                            variant="outline"
                                            className="flex-1 border-2 border-[#4F6815] text-[#4F6815] hover:bg-[#4F6815]/5 py-4 text-lg font-semibold"
                                        >
                                            🔄 {t('demoGenerateNew')}
                                        </Button>
                                        <Button 
                                            onClick={() => saveAllRecipes(recipes)}
                                            className="flex-1 bg-[#5a0509] hover:bg-[#3d0306] text-white font-semibold py-4 text-lg shadow-xl"
                                        >
                                            💾 {t('demoSaveAll')}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* No Results */}
                        {step === 'result' && recipes.length === 0 && (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="text-6xl mb-6">🤔</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {t('demoNoResults')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('demoNoResultsSub')}
                                </p>
                                <Button
                                    onClick={resetDemo}
                                    className="bg-[#5a0509] hover:bg-[#3d0306] text-white"
                                >
                                    {t('demoTryAgain')}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
}
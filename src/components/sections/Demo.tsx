'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CUISINE_TYPES, DIETARY_PRESETS } from '@/lib/predefined-recipes';

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
    const [step, setStep] = useState<'input' | 'thinking' | 'result' | 'error'>('input');
    const [inputValue, setInputValue] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('any');
    const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPredefined, setIsPredefined] = useState(false);

    // Load available options on mount
    useEffect(() => {
        // Preload options if needed
    }, []);

    const togglePreset = (presetId: string) => {
        setSelectedPresets(prev => 
            prev.includes(presetId) 
                ? prev.filter(id => id !== presetId)
                : [...prev, presetId]
        );
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) return;

        console.log('Starting recipe generation...');
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
            console.log('API Response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate recipes');
            }

            setRecipes(data.recipes || []);
            setIsPredefined(data.isPredefined || false);
            setStep('result');
        } catch (error) {
            console.error('Recipe generation error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Failed to generate recipes');
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
        alert(`${recipesToSave.length} recipe${recipesToSave.length > 1 ? 's' : ''} saved to your cookbook!`);
    };

    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FFFBF0] to-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        See It In Action
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Enter your ingredients and get personalized recipes with detailed cooking times
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-white border-2 border-[#4F6815]/20 rounded-xl p-8 shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                        What would you like to cook?
                                    </h3>
                                    <div className="space-y-5">
                                        {/* Ingredients Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Ingredients (comma-separated)
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., chicken, lemon, garlic, rice"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                                className="text-base py-3 px-4 border-[#FFEDAB] focus:border-[#4F6815]"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Cuisine Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Choose Cuisine Type
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {CUISINE_TYPES.map((cuisine) => (
                                                    <button
                                                        key={cuisine.id}
                                                        onClick={() => setSelectedCuisine(cuisine.id)}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                            selectedCuisine === cuisine.id
                                                                ? 'bg-[#4F6815] text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {cuisine.icon} {cuisine.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dietary Presets */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Dietary Preferences (optional)
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {DIETARY_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.id}
                                                        onClick={() => togglePreset(preset.id)}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                            selectedPresets.includes(preset.id)
                                                                ? 'bg-[#75070C] text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {preset.icon} {preset.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Additional Restrictions */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Other Restrictions (optional)
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., nut-free, spicy, quick meals"
                                                value={dietaryRestrictions}
                                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                                className="text-base py-3 px-4 border-[#FFEDAB] focus:border-[#4F6815]"
                                            />
                                        </div>

                                        {/* Generate Button */}
                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={!inputValue.trim() || isLoading}
                                                className="flex-1 bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold py-3"
                                            >
                                                {isLoading ? 'Generating...' : 'Get Recipes'}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Example Ingredients */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 mb-3">Quick examples:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['chicken, rice, vegetables', 'pasta, tomatoes, garlic', 'eggs, cheese, spinach'].map(
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
                                <div className="bg-white border-2 border-[#4F6815]/20 rounded-xl p-12 text-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="w-16 h-16 border-4 border-[#FFEDAB] border-t-[#4F6815] rounded-full mx-auto mb-6"
                                    />
                                    <motion.p 
                                        className="text-lg font-semibold text-gray-900 mb-2"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        AI is cooking up perfect recipes for you...
                                    </motion.p>
                                    <p className="text-sm text-gray-500">
                                        Analyzing ingredients and preferences...
                                    </p>
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
                                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                                    <div className="text-4xl mb-4">😕</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Oops! Something went wrong
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {errorMessage}
                                    </p>
                                    <Button
                                        onClick={resetDemo}
                                        className="bg-[#75070C] hover:bg-[#5a0509] text-white"
                                    >
                                        Try Again
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
                                        <div className="inline-block px-4 py-2 bg-[#FFEDAB]/30 rounded-full text-[#4F6815] font-medium mb-4">
                                            {isPredefined ? '📚 Curated Recipe' : '✨ AI Generated'}
                                        </div>
                                        <p className="text-gray-600">
                                            {recipes.length} recipe{recipes.length > 1 ? 's' : ''} found for you
                                        </p>
                                    </motion.div>

                                    {/* Recipe Cards */}
                                    {recipes.map((recipe, recipeIdx) => (
                                        <motion.div key={recipeIdx} variants={fadeInUp}>
                                            <div className="bg-white border-2 border-[#4F6815]/20 rounded-xl p-6 shadow-sm">
                                                {/* Recipe Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                            {recipe.title}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                            <span>⏱️ {recipe.totalTime}</span>
                                                            <span>👥 {recipe.servings} servings</span>
                                                            <span>📊 {recipe.difficulty}</span>
                                                            <span>🔥 {recipe.calories} cal</span>
                                                            {recipe.cuisine && (
                                                                <span className="bg-[#4F6815]/10 text-[#4F6815] px-2 py-0.5 rounded">
                                                                    {recipe.cuisine}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Ingredients */}
                                                <div className="mb-6">
                                                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                                                        🛒 Ingredients
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {recipe.ingredients.map((ingredient, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-3 text-gray-700"
                                                            >
                                                                <span className="text-[#4F6815] font-bold mt-0.5">✓</span>
                                                                <span>{ingredient}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Instructions */}
                                                <div className="mb-6">
                                                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                                                        👨‍🍳 Instructions
                                                    </h4>
                                                    <ol className="space-y-4">
                                                        {recipe.instructions.map((instruction, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex gap-4 text-gray-700"
                                                            >
                                                                <span className="font-bold text-[#4F6815] min-w-6 flex-shrink-0">
                                                                    {idx + 1}.
                                                                </span>
                                                                <span>{instruction}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                {/* Tips */}
                                                {recipe.tips && (
                                                    <div className="bg-[#FFEDAB]/10 border-2 border-[#FFEDAB] rounded-lg p-4">
                                                        <h4 className="font-bold text-gray-900 mb-2">
                                                            💡 Pro Tip
                                                        </h4>
                                                        <p className="text-gray-700 text-sm">{recipe.tips}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Action Buttons */}
                                    <motion.div variants={fadeInUp} className="flex gap-3">
                                        <Button
                                            onClick={resetDemo}
                                            variant="outline"
                                            className="flex-1 border-2 border-[#4F6815] text-[#4F6815] hover:bg-[#4F6815]/5 py-3"
                                        >
                                            Generate New Recipes
                                        </Button>
                                        <Button 
                                            onClick={() => saveAllRecipes(recipes)}
                                            className="flex-1 bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold py-3"
                                        >
                                            💾 Save All Recipes
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
                                className="text-center py-12"
                            >
                                <div className="text-4xl mb-4">🤔</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No recipes found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try different ingredients or adjust your preferences
                                </p>
                                <Button
                                    onClick={resetDemo}
                                    className="bg-[#75070C] hover:bg-[#5a0509] text-white"
                                >
                                    Try Again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
}
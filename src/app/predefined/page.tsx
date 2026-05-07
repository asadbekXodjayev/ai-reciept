'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PREDEFINED_RECIPES, CUISINE_TYPES, DIETARY_PRESETS } from '@/lib/predefined-recipes';
import { useTranslation } from '@/contexts/TranslationContext';
import { getCuisineName, getDietaryName } from '@/lib/translations';

export default function PredefinedRecipesPage() {
    const { t, lang } = useTranslation();
    const [selectedCuisine, setSelectedCuisine] = useState('any');
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDietary = (id: string) => {
        setSelectedDietary(prev =>
            prev.includes(id)
                ? prev.filter(d => d !== id)
                : [...prev, id]
        );
    };

    const filteredRecipes = PREDEFINED_RECIPES.filter(recipe => {
        if (selectedCuisine !== 'any' && recipe.cuisine !== selectedCuisine) {
            return false;
        }

        if (selectedDietary.length > 0) {
            const hasDietaryMatch = selectedDietary.some(diet =>
                recipe.dietaryTags.some(tag => tag.toLowerCase().includes(diet.toLowerCase()))
            );
            if (!hasDietaryMatch) return false;
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.some(i => i.toLowerCase().includes(query))
            );
        }

        return true;
    });

    const getRecipeImage = (title: string) => {
        const hash = title.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const images = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
            'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
        ];
        return images[hash % images.length];
    };

    const saveRecipe = (recipe: typeof PREDEFINED_RECIPES[0]) => {
        const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const newRecipe = {
            id: `predefined-${crypto.randomUUID().slice(0, 8)}`,
            recipe: {
                title: recipe.title,
                totalTime: recipe.time,
                servings: recipe.servings,
                difficulty: recipe.difficulty,
                cuisine: recipe.cuisine,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                tips: recipe.tips,
                calories: recipe.calories,
            },
            savedAt: new Date().toISOString(),
            isPredefined: true,
        };
        saved.push(newRecipe);
        localStorage.setItem('savedRecipes', JSON.stringify(saved));
        alert('Recipe saved to your cookbook!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-white to-[#FFEDAB]/20">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#4F6815]/10">
                <Container>
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center space-x-3">
                            <span className="font-bold text-2xl text-[#4F6815]">
                                Recipe<span className="text-[#75070C]">AI</span>
                            </span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/saved">
                                <Button variant="outline" className="border-[#4F6815] text-[#4F6815]">
                                    {t('navMyCookbook')}
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button className="bg-[#75070C] hover:bg-[#5a0509] text-white">
                                    {t('navGenerateNew')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-12">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6815]/10 text-[#4F6815] text-sm font-medium mb-4">
                            <span>📚</span>
                            <span>{t('predefinedTitle')}</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                            {t('predefinedTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('predefinedSubtitle')}
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Filters */}
            <section className="pb-8">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* Search */}
                        <div className="max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder={t('predefinedSearch')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 rounded-full border-2 border-[#FFEDAB] focus:border-[#4F6815] outline-none text-lg"
                            />
                        </div>

                        {/* Cuisine Filter */}
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-3">{t('predefinedCuisine')}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {CUISINE_TYPES.map((cuisine) => (
                                    <button
                                        key={cuisine.id}
                                        onClick={() => setSelectedCuisine(cuisine.id)}
                                        className={`px-5 py-2.5 rounded-full text-base font-medium transition-all ${
                                            selectedCuisine === cuisine.id
                                                ? 'bg-[#4F6815] text-white shadow-lg'
                                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#4F6815]'
                                        }`}
                                    >
                                        {cuisine.icon} {getCuisineName(lang, cuisine.id)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dietary Filter */}
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-3">{t('predefinedDietary')}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {DIETARY_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => toggleDietary(preset.id)}
                                        className={`px-5 py-2.5 rounded-full text-base font-medium transition-all ${
                                            selectedDietary.includes(preset.id)
                                                ? 'bg-[#75070C] text-white shadow-lg'
                                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#75070C]'
                                        }`}
                                    >
                                        {preset.icon} {getDietaryName(lang, preset.id)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Recipes Grid */}
            <section className="pb-20">
                <Container>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredRecipes.map((recipe) => (
                            <motion.div
                                key={recipe.id}
                                variants={fadeInUp}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#4F6815]/10 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="h-52 bg-gradient-to-br from-[#4F6815] to-[#75070C] relative">
                                    <img
                                        src={getRecipeImage(recipe.title)}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#4F6815]">
                                        {recipe.cuisine}
                                    </div>
                                    <div className="absolute top-4 right-4 bg-[#75070C]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                                        {recipe.difficulty}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {recipe.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 text-base text-gray-600 mb-4">
                                        <span>⏱️ {recipe.time}</span>
                                        <span>👥 {recipe.servings} {t('demoServings')}</span>
                                        <span>🔥 {recipe.calories} {t('demoCalories')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {recipe.dietaryTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-3 py-1 rounded-full bg-[#FFEDAB]/50 text-[#4F6815] font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => saveRecipe(recipe)}
                                            className="flex-1 bg-[#4F6815] hover:bg-[#3d5210] text-white"
                                        >
                                            {t('predefinedSaveRecipe')}
                                        </Button>
                                        <Link href={`/recipe/${recipe.id}`}>
                                            <Button variant="outline" className="border-[#4F6815] text-[#4F6815]">
                                                {t('predefinedView')}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredRecipes.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-6">🔍</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                {t('predefinedNoResults')}
                            </h2>
                            <p className="text-gray-600">
                                {t('predefinedNoResultsSub')}
                            </p>
                        </motion.div>
                    )}
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <Container>
                    <div className="text-center">
                        <p className="text-sm">
                            © 2026 RecipeAI. {t('footerCopyright')}
                        </p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
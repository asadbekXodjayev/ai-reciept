'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Flame, Search, X } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    PREDEFINED_RECIPES,
    CUISINE_TYPES,
    DIETARY_PRESETS,
    type Recipe,
} from '@/lib/predefined-recipes';
import { useTranslation } from '@/contexts/TranslationContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import { getCuisineName, getDietaryName, getDifficultyName } from '@/lib/translations';
import type { RecipeData } from '@/lib/recipe-storage';

const RECIPE_IMAGES = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
];
const imageFor = (title: string): string =>
    RECIPE_IMAGES[title.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % RECIPE_IMAGES.length];

type DifficultyFilter = 'all' | 'Easy' | 'Medium' | 'Hard';
type MaxTimeFilter = 'any' | '30' | '60';

/** Parse leading minutes out of a free-form time string (e.g. "25 mins", "1 hour", "4 hours"). */
function parseMinutes(time: string): number {
    const match = time.match(/(\d+)/);
    if (!match) return Number.POSITIVE_INFINITY;
    const value = parseInt(match[1], 10);
    return /hour/i.test(time) ? value * 60 : value;
}

export default function PredefinedRecipesPage() {
    const { t, lang } = useTranslation();
    const { toast } = useToast();
    const { save } = useSavedRecipes();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('any');
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');
    const [maxTime, setMaxTime] = useState<MaxTimeFilter>('any');

    const toggleDietary = (id: string) => {
        setSelectedDietary((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
        );
    };

    const filtersActive =
        searchQuery.trim() !== '' ||
        selectedCuisine !== 'any' ||
        selectedDietary.length > 0 ||
        selectedDifficulty !== 'all' ||
        maxTime !== 'any';

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCuisine('any');
        setSelectedDietary([]);
        setSelectedDifficulty('all');
        setMaxTime('any');
    };

    const filtered: Recipe[] = PREDEFINED_RECIPES.filter((recipe) => {
        // Cuisine (case-insensitive equality — fixes the old exact-match bug).
        if (
            selectedCuisine !== 'any' &&
            recipe.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()
        ) {
            return false;
        }

        // Dietary: must match at least one selected tag (case-insensitive).
        if (selectedDietary.length > 0) {
            const matchesDietary = selectedDietary.some((diet) =>
                recipe.dietaryTags.some((tag) => tag.toLowerCase().includes(diet.toLowerCase())),
            );
            if (!matchesDietary) return false;
        }

        // Difficulty.
        if (selectedDifficulty !== 'all' && recipe.difficulty !== selectedDifficulty) {
            return false;
        }

        // Max time.
        if (maxTime !== 'any') {
            const limit = parseInt(maxTime, 10);
            if (parseMinutes(recipe.time) > limit) return false;
        }

        // Search: title OR any ingredient.
        const query = searchQuery.trim().toLowerCase();
        if (query) {
            const inTitle = recipe.title.toLowerCase().includes(query);
            const inIngredients = recipe.ingredients.some((i) => i.toLowerCase().includes(query));
            if (!inTitle && !inIngredients) return false;
        }

        return true;
    });

    const handleSave = (recipe: Recipe) => {
        const recipeData: RecipeData = {
            title: recipe.title,
            cuisine: recipe.cuisine,
            totalTime: recipe.time,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            tips: recipe.tips,
            calories: recipe.calories,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fat: recipe.fat,
        };
        const result = save(recipeData, { isPredefined: true });
        if (result) {
            toast(t('toastSaved'), 'success');
        } else {
            toast(t('toastAlreadySaved'), 'info');
        }
    };

    const difficulties: DifficultyFilter[] = ['all', 'Easy', 'Medium', 'Hard'];
    const maxTimeOptions: { value: MaxTimeFilter; label: string }[] = [
        { value: 'any', label: t('predefinedAnyTime') },
        { value: '30', label: t('predefinedUnder30') },
        { value: '60', label: t('predefinedUnder60') },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFBF0] via-background to-[#FFEDAB]/20 dark:from-[#1a1407] dark:via-background dark:to-[#0f0a02] pt-24 pb-10">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6815]/10 text-[#4F6815] dark:text-[#a3c14f] text-sm font-medium mb-4">
                            <span aria-hidden>📚</span>
                            <span>{t('predefinedTitle')}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            {t('predefinedTitle')}
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
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
                        <div className="max-w-xl mx-auto relative">
                            <Search
                                className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none"
                                aria-hidden
                            />
                            <input
                                type="text"
                                placeholder={t('predefinedSearch')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label={t('predefinedSearch')}
                                className="w-full pl-12 pr-6 py-4 rounded-full bg-card border border-border focus:border-[#4F6815] dark:focus:border-[#a3c14f] outline-none text-base text-foreground placeholder:text-muted-foreground transition-colors"
                            />
                        </div>

                        {/* Cuisine chips */}
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                                {t('predefinedCuisine')}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {CUISINE_TYPES.map((cuisine) => (
                                    <button
                                        key={cuisine.id}
                                        type="button"
                                        onClick={() => setSelectedCuisine(cuisine.id)}
                                        aria-pressed={selectedCuisine === cuisine.id}
                                        className={cn(
                                            'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                                            selectedCuisine === cuisine.id
                                                ? 'bg-[#4F6815] text-white border-[#4F6815] shadow-md'
                                                : 'bg-card text-foreground border-border hover:border-[#4F6815] dark:hover:border-[#a3c14f]',
                                        )}
                                    >
                                        <span aria-hidden>{cuisine.icon}</span>{' '}
                                        {getCuisineName(lang, cuisine.id)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dietary chips */}
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                                {t('predefinedDietary')}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {DIETARY_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => toggleDietary(preset.id)}
                                        aria-pressed={selectedDietary.includes(preset.id)}
                                        className={cn(
                                            'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                                            selectedDietary.includes(preset.id)
                                                ? 'bg-[#75070C] text-white border-[#75070C] shadow-md'
                                                : 'bg-card text-foreground border-border hover:border-[#75070C] dark:hover:border-[#e06b70]',
                                        )}
                                    >
                                        <span aria-hidden>{preset.icon}</span>{' '}
                                        {getDietaryName(lang, preset.id)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty + Max time controls */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-muted-foreground mb-3">
                                    {t('predefinedDifficulty')}
                                </p>
                                <div className="inline-flex rounded-full border border-border bg-card p-1">
                                    {difficulties.map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setSelectedDifficulty(level)}
                                            aria-pressed={selectedDifficulty === level}
                                            className={cn(
                                                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                                                selectedDifficulty === level
                                                    ? 'bg-[#4F6815] text-white'
                                                    : 'text-foreground hover:text-[#4F6815] dark:hover:text-[#a3c14f]',
                                            )}
                                        >
                                            {level === 'all'
                                                ? t('predefinedAllDifficulties')
                                                : getDifficultyName(lang, level)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm font-semibold text-muted-foreground mb-3">
                                    {t('predefinedMaxTime')}
                                </p>
                                <div className="inline-flex rounded-full border border-border bg-card p-1">
                                    {maxTimeOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setMaxTime(option.value)}
                                            aria-pressed={maxTime === option.value}
                                            className={cn(
                                                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                                                maxTime === option.value
                                                    ? 'bg-[#4F6815] text-white'
                                                    : 'text-foreground hover:text-[#4F6815] dark:hover:text-[#a3c14f]',
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results count + clear */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-[#4F6815] dark:text-[#a3c14f]">
                                    {filtered.length}
                                </strong>{' '}
                                {t('predefinedResults')}
                            </p>
                            {filtersActive && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-[#75070C] dark:text-[#e06b70] hover:underline"
                                >
                                    <X className="size-4" aria-hidden />
                                    {t('predefinedClearFilters')}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Recipes grid */}
            <section className="pb-20">
                <Container>
                    {filtered.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filtered.map((recipe) => (
                                <motion.div
                                    key={recipe.id}
                                    variants={fadeInUp}
                                    className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1"
                                >
                                    <div className="h-52 relative bg-gradient-to-br from-[#4F6815] to-[#75070C]">
                                        <Image
                                            src={imageFor(recipe.title)}
                                            alt={`${recipe.title} — ${getCuisineName(lang, recipe.cuisine)} dish`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover opacity-90"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#4F6815] dark:text-[#a3c14f]">
                                            {getCuisineName(lang, recipe.cuisine)}
                                        </div>
                                        <div className="absolute top-4 right-4 bg-[#75070C]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                                            {getDifficultyName(lang, recipe.difficulty)}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            {recipe.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="size-4" aria-hidden />
                                                {recipe.time}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <Users className="size-4" aria-hidden />
                                                {recipe.servings} {t('demoServings')}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <Flame className="size-4" aria-hidden />
                                                {recipe.calories} {t('demoCalories')}
                                            </span>
                                        </div>
                                        {recipe.dietaryTags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {recipe.dietaryTags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-3 py-1 rounded-full bg-[#FFEDAB]/50 dark:bg-[#a3c14f]/10 text-[#4F6815] dark:text-[#a3c14f] font-medium"
                                                    >
                                                        {getDietaryName(lang, tag)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleSave(recipe)}
                                                className="flex-1 bg-[#4F6815] hover:bg-[#3d5210] text-white"
                                            >
                                                {t('predefinedSaveRecipe')}
                                            </Button>
                                            <Link href={`/recipe/${recipe.id}`}>
                                                <Button
                                                    variant="outline"
                                                    className="border-[#4F6815] text-[#4F6815] dark:border-[#a3c14f] dark:text-[#a3c14f]"
                                                >
                                                    {t('predefinedView')}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-6" aria-hidden>
                                🔍
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                                {t('predefinedNoResults')}
                            </h2>
                            <p className="text-muted-foreground mb-6">{t('predefinedNoResultsSub')}</p>
                            {filtersActive && (
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="border-[#4F6815] text-[#4F6815] dark:border-[#a3c14f] dark:text-[#a3c14f]"
                                >
                                    {t('predefinedClearFilters')}
                                </Button>
                            )}
                        </motion.div>
                    )}
                </Container>
            </section>

            <SiteFooter />
        </div>
    );
}

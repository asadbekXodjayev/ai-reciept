'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, BarChart3, Flame, ShoppingCart, ChefHat, Lightbulb, RotateCw, BookmarkPlus, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CUISINE_TYPES, DIETARY_PRESETS, getRecipeById } from '@/lib/predefined-recipes';
import { useTranslation } from '@/contexts/TranslationContext';
import { getCuisineName, getDietaryName } from '@/lib/translations';
import { useToast } from '@/components/providers/ToastProvider';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import { loadSavedRecipes, type RecipeData } from '@/lib/recipe-storage';

interface Recipe {
    id?: string;
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

const EXAMPLES = ['chicken, rice, vegetables', 'pasta, tomatoes, garlic', 'eggs, cheese, spinach'];

function toRecipeData(recipe: Recipe): RecipeData {
    return {
        title: recipe.title,
        totalTime: recipe.totalTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tips: recipe.tips,
        calories: recipe.calories,
    };
}

export function DemoSection() {
    const { t, lang } = useTranslation();
    const { toast } = useToast();
    const { save } = useSavedRecipes();
    const router = useRouter();

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
        setSelectedPresets((prev) =>
            prev.includes(presetId) ? prev.filter((id) => id !== presetId) : [...prev, presetId],
        );
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            toast(t('demoNeedIngredients'), 'info');
            return;
        }

        setStep('thinking');
        setIsLoading(true);
        setErrorMessage('');

        const combinedDietary = selectedPresets.join(', ');

        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ingredients: inputValue,
                    dietaryRestrictions: combinedDietary || dietaryRestrictions || undefined,
                    cuisine: selectedCuisine,
                    usePredefined: selectedPresets.length > 0,
                    language: lang,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || t('demoErrorSub'));

            setRecipes(Array.isArray(data.recipes) ? data.recipes : []);
            setIsPredefined(Boolean(data.isPredefined));
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

    const saveAllRecipes = () => {
        let added = 0;
        for (const recipe of recipes) {
            if (save(toRecipeData(recipe), { isPredefined })) added++;
        }
        if (added > 0) {
            toast(`${added} ${t('toastSavedCount')}`);
        } else {
            toast(t('toastAlreadySaved'), 'info');
        }
    };

    const viewRecipe = (recipe: Recipe) => {
        // Curated result already has a stable route.
        if (recipe.id && getRecipeById(recipe.id)) {
            router.push(`/recipe/${recipe.id}`);
            return;
        }
        // AI recipe: persist (dedup) then open its detail page.
        const entry = save(toRecipeData(recipe), { isPredefined });
        const key = recipe.title.trim().toLowerCase();
        const id = entry?.id ?? loadSavedRecipes().find((s) => s.recipe.title.trim().toLowerCase() === key)?.id;
        if (id) router.push(`/recipe/${id}`);
    };

    return (
        <section
            id="demo"
            className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFFBF0]/50 to-white py-20 sm:py-28 dark:from-background dark:via-background dark:to-background"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#FFEDAB]/10 blur-3xl dark:bg-[#FFEDAB]/5" />
                <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#4F6815]/5 blur-3xl" />
            </div>

            <Container>
                <div className="relative mb-14 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4F6815]/10 px-4 py-2 text-sm font-medium text-[#4F6815] dark:bg-[#4F6815]/20 dark:text-[#a3c14f]"
                    >
                        <span aria-hidden>✨</span>
                        <span>{t('demoTitle')}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 text-4xl font-bold text-foreground sm:text-5xl"
                    >
                        {t('demoTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl text-xl text-muted-foreground"
                    >
                        {t('demoSubtitle')}
                    </motion.p>
                </div>

                <div className="relative mx-auto max-w-3xl">
                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="rounded-2xl border-2 border-[#4F6815]/20 bg-card p-6 shadow-xl sm:p-8 dark:border-white/10">
                                    <h3 className="mb-6 text-2xl font-bold text-foreground">{t('demoWhatToCook')}</h3>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="demo-ingredients" className="mb-2 block text-base font-semibold text-foreground/90">
                                                {t('demoIngredients')}
                                            </label>
                                            <Input
                                                id="demo-ingredients"
                                                type="text"
                                                placeholder={t('demoIngredientsPlaceholder')}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleSubmit();
                                                }}
                                                className="rounded-xl border-2 border-[#FFEDAB] px-5 py-4 text-base focus:border-[#4F6815] dark:border-white/15"
                                                autoFocus
                                            />
                                        </div>

                                        <fieldset>
                                            <legend className="mb-3 block text-base font-semibold text-foreground/90">{t('demoCuisine')}</legend>
                                            <div className="flex flex-wrap gap-2">
                                                {CUISINE_TYPES.map((cuisine) => (
                                                    <button
                                                        key={cuisine.id}
                                                        type="button"
                                                        aria-pressed={selectedCuisine === cuisine.id}
                                                        onClick={() => setSelectedCuisine(cuisine.id)}
                                                        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                                                            selectedCuisine === cuisine.id
                                                                ? 'scale-105 bg-[#4F6815] text-white shadow-lg'
                                                                : 'border border-border bg-muted text-foreground/80 hover:bg-muted/70'
                                                        }`}
                                                    >
                                                        <span aria-hidden>{cuisine.icon}</span> {getCuisineName(lang, cuisine.id)}
                                                    </button>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <legend className="mb-3 block text-base font-semibold text-foreground/90">{t('demoDietary')}</legend>
                                            <div className="flex flex-wrap gap-2">
                                                {DIETARY_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.id}
                                                        type="button"
                                                        aria-pressed={selectedPresets.includes(preset.id)}
                                                        onClick={() => togglePreset(preset.id)}
                                                        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                                                            selectedPresets.includes(preset.id)
                                                                ? 'scale-105 bg-[#75070C] text-white shadow-lg'
                                                                : 'border border-border bg-muted text-foreground/80 hover:bg-muted/70'
                                                        }`}
                                                    >
                                                        <span aria-hidden>{preset.icon}</span> {getDietaryName(lang, preset.id)}
                                                    </button>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div>
                                            <label htmlFor="demo-other" className="mb-2 block text-base font-semibold text-foreground/90">
                                                {t('demoOtherRestrictions')}
                                            </label>
                                            <Input
                                                id="demo-other"
                                                type="text"
                                                placeholder={t('demoOtherRestrictionsPlaceholder')}
                                                value={dietaryRestrictions}
                                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                                className="rounded-xl border-2 border-[#FFEDAB] px-5 py-4 text-base focus:border-[#4F6815] dark:border-white/15"
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={!inputValue.trim() || isLoading}
                                                className="flex-1 bg-[#75070C] py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#5a0509] disabled:opacity-50"
                                            >
                                                {isLoading ? t('demoGenerating') : `🍳 ${t('demoGenerate')}`}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-6 border-t border-border pt-6">
                                        <p className="mb-3 text-sm text-muted-foreground">{t('demoExamples')}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {EXAMPLES.map((example) => (
                                                <button
                                                    key={example}
                                                    type="button"
                                                    onClick={() => setInputValue(example)}
                                                    className="rounded-full border border-[#4F6815]/20 bg-[#FFEDAB]/50 px-4 py-2 text-sm text-[#4F6815] transition-colors hover:bg-[#FFEDAB] dark:bg-[#FFEDAB]/10 dark:text-[#a3c14f]"
                                                >
                                                    {example}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'thinking' && (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="rounded-2xl border-2 border-[#4F6815]/20 bg-card p-16 text-center shadow-xl dark:border-white/10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="mx-auto mb-6 h-20 w-20 rounded-full border-4 border-[#FFEDAB] border-t-[#4F6815]"
                                    />
                                    <motion.p
                                        className="mb-2 text-xl font-bold text-foreground"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        {t('demoThinking')}
                                    </motion.p>
                                    <p className="text-muted-foreground">{t('demoThinkingSub')}</p>
                                </div>
                            </motion.div>
                        )}

                        {step === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-10 text-center shadow-xl">
                                    <div className="mb-4 text-5xl" aria-hidden>😕</div>
                                    <h3 className="mb-2 text-2xl font-bold text-foreground">{t('demoError')}</h3>
                                    <p className="mb-6 text-muted-foreground">{errorMessage}</p>
                                    <Button onClick={resetDemo} className="bg-[#75070C] text-white hover:bg-[#5a0509]">
                                        {t('demoTryAgain')}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'result' && recipes.length > 0 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
                                    <motion.div variants={fadeInUp} className="text-center">
                                        <div className="mb-4 inline-block rounded-full bg-[#4F6815]/10 px-5 py-2.5 font-semibold text-[#4F6815] dark:bg-[#4F6815]/20 dark:text-[#a3c14f]">
                                            {isPredefined ? `📚 ${t('demoCurated')}` : `✨ ${t('demoAI')}`}
                                        </div>
                                        <p className="text-muted-foreground">
                                            {recipes.length} {t('demoFound')}
                                        </p>
                                    </motion.div>

                                    {recipes.map((recipe, recipeIdx) => (
                                        <motion.div key={recipe.id ?? `${recipe.title}-${recipeIdx}`} variants={fadeInUp}>
                                            <div className="rounded-2xl border-2 border-[#4F6815]/20 bg-card p-6 shadow-xl transition-shadow hover:shadow-2xl sm:p-8 dark:border-white/10">
                                                <div className="mb-6 flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">{recipe.title}</h3>
                                                        <div className="flex flex-wrap gap-3 text-base text-muted-foreground">
                                                            <span className="flex items-center gap-1.5"><Clock className="size-4" /> {recipe.totalTime}</span>
                                                            <span className="flex items-center gap-1.5"><Users className="size-4" /> {recipe.servings} {t('demoServings')}</span>
                                                            <span className="flex items-center gap-1.5"><BarChart3 className="size-4" /> {recipe.difficulty}</span>
                                                            <span className="flex items-center gap-1.5"><Flame className="size-4" /> {recipe.calories} {t('demoCalories')}</span>
                                                            {recipe.cuisine && (
                                                                <span className="rounded-full bg-[#4F6815]/10 px-3 py-1 font-medium text-[#4F6815] dark:bg-[#4F6815]/20 dark:text-[#a3c14f]">
                                                                    {recipe.cuisine}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-6 border-border" />

                                                <div className="mb-6">
                                                    <h4 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                                                        <ShoppingCart className="size-5 text-[#4F6815] dark:text-[#a3c14f]" /> {t('demoIngredientsTitle')}
                                                    </h4>
                                                    <ul className="space-y-2.5">
                                                        {(recipe.ingredients ?? []).map((ingredient, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-foreground/80">
                                                                <span className="mt-0.5 font-bold text-[#4F6815] dark:text-[#a3c14f]" aria-hidden>✓</span>
                                                                <span>{ingredient}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className="my-6 border-border" />

                                                <div className="mb-6">
                                                    <h4 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                                                        <ChefHat className="size-5 text-[#4F6815] dark:text-[#a3c14f]" /> {t('demoInstructionsTitle')}
                                                    </h4>
                                                    <ol className="space-y-4">
                                                        {(recipe.instructions ?? []).map((instruction, idx) => (
                                                            <li key={idx} className="flex gap-4 text-foreground/80">
                                                                <span className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-[#4F6815]/10 font-bold text-[#4F6815] dark:bg-[#4F6815]/20 dark:text-[#a3c14f]">
                                                                    {idx + 1}
                                                                </span>
                                                                <span className="leading-relaxed">{instruction}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                {recipe.tips && (
                                                    <div className="rounded-xl border-2 border-[#FFEDAB] bg-[#FFEDAB]/20 p-5 dark:bg-[#FFEDAB]/10">
                                                        <h4 className="mb-2 flex items-center gap-2 font-bold text-foreground">
                                                            <Lightbulb className="size-5 text-[#75070C] dark:text-[#e06b70]" /> {t('demoProTip')}
                                                        </h4>
                                                        <p className="text-foreground/80">{recipe.tips}</p>
                                                    </div>
                                                )}

                                                <div className="mt-6 flex justify-end">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => viewRecipe(recipe)}
                                                        className="border-2 border-[#4F6815] text-[#4F6815] hover:bg-[#4F6815]/5 dark:border-[#a3c14f]/60 dark:text-[#a3c14f]"
                                                    >
                                                        {t('demoViewRecipe')} <ArrowRight className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <motion.div variants={fadeInUp} className="flex flex-col gap-3 sm:flex-row">
                                        <Button
                                            onClick={resetDemo}
                                            variant="outline"
                                            className="flex-1 border-2 border-[#4F6815] py-4 text-lg font-semibold text-[#4F6815] hover:bg-[#4F6815]/5 dark:border-[#a3c14f]/60 dark:text-[#a3c14f]"
                                        >
                                            <RotateCw className="size-5" /> {t('demoGenerateNew')}
                                        </Button>
                                        <Button
                                            onClick={saveAllRecipes}
                                            className="flex-1 bg-[#75070C] py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#5a0509]"
                                        >
                                            <BookmarkPlus className="size-5" /> {t('demoSaveAll')}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 'result' && recipes.length === 0 && (
                            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                                <div className="mb-6 text-6xl" aria-hidden>🤔</div>
                                <h3 className="mb-3 text-2xl font-bold text-foreground">{t('demoNoResults')}</h3>
                                <p className="mb-6 text-muted-foreground">{t('demoNoResultsSub')}</p>
                                <Button onClick={resetDemo} className="bg-[#75070C] text-white hover:bg-[#5a0509]">
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

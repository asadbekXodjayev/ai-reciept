'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    BarChart3,
    Bookmark,
    BookmarkCheck,
    Check,
    ChefHat,
    Clock,
    Copy,
    Flame,
    ListChecks,
    Minus,
    Plus,
    Printer,
    Share2,
    Trash2,
    Users,
} from 'lucide-react';

import { Container } from '@/components/shared/Container';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { useToast } from '@/components/providers/ToastProvider';
import { getCuisineName, getDifficultyName } from '@/lib/translations';
import { getRecipeById } from '@/lib/predefined-recipes';
import {
    addRecipe,
    getSavedById,
    isTitleSaved,
    normalizeRecipe,
    removeRecipe,
    type DisplayRecipe,
    type RecipeData,
} from '@/lib/recipe-storage';
import { cn } from '@/lib/utils';
import { useHydrated } from '@/hooks/useHydrated';

// Deterministic hero image picker (same set the rest of the app uses).
const RECIPE_IMAGES = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200',
];
const imageFor = (title: string) =>
    RECIPE_IMAGES[title.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % RECIPE_IMAGES.length];

/** Format a scaled number nicely: drop trailing ".0", round to 2 decimals. */
function formatQty(n: number): string {
    if (!Number.isFinite(n)) return String(n);
    const rounded = Math.round(n * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

/** Parse a token into a number, supporting simple fractions like "1/2". */
function parseQty(token: string): number | null {
    const frac = token.match(/^(\d+)\/(\d+)$/);
    if (frac) {
        const denom = Number(frac[2]);
        if (denom === 0) return null;
        return Number(frac[1]) / denom;
    }
    const num = Number(token);
    return Number.isFinite(num) ? num : null;
}

/**
 * Scale the leading quantity of an ingredient line by `ratio`.
 * Handles integers, decimals, simple fractions ("1/2"), and ranges ("5-7").
 * Returns the line unchanged when there is no leading number.
 */
function scaleIngredient(line: string, ratio: number): string {
    if (ratio === 1) return line;
    // Leading (whitespace-tolerant) number, optionally a range "a-b" or fraction.
    const match = line.match(/^(\s*)(\d+(?:\.\d+)?(?:\/\d+)?)(\s*-\s*(\d+(?:\.\d+)?(?:\/\d+)?))?/);
    if (!match) return line;

    const lead = match[1] ?? '';
    const first = parseQty(match[2]);
    if (first === null) return line;

    let replacement = formatQty(first * ratio);

    if (match[4]) {
        const second = parseQty(match[4]);
        if (second !== null) {
            replacement = `${formatQty(first * ratio)}-${formatQty(second * ratio)}`;
        }
    }

    return lead + replacement + line.slice((lead + match[0].trimStart()).length);
}

type ResolvedRecipe = {
    /** Display data, time-normalized. */
    data: DisplayRecipe;
    /** Saved-list id when this came from localStorage (enables Remove). */
    savedId: string | null;
    /** Whether this is a curated/predefined recipe. */
    isPredefined: boolean;
};

/** Resolve a curated recipe synchronously (available during SSR + first paint). */
function resolveCurated(id: string | undefined): ResolvedRecipe | null {
    if (!id) return null;
    const curated = getRecipeById(id);
    if (!curated) return null;
    return {
        data: normalizeRecipe({
            title: curated.title,
            cuisine: curated.cuisine,
            time: curated.time,
            servings: curated.servings,
            difficulty: curated.difficulty,
            ingredients: curated.ingredients,
            instructions: curated.instructions,
            tips: curated.tips,
            calories: curated.calories,
            protein: curated.protein,
            carbs: curated.carbs,
            fat: curated.fat,
        }),
        savedId: null,
        isPredefined: true,
    };
}

function LoadingState({ label }: { label: string }) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground">
            <div
                className="size-10 animate-spin rounded-full border-4 border-[#4F6815]/20 border-t-[#4F6815] dark:border-[#a3c14f]/20 dark:border-t-[#a3c14f]"
                aria-hidden="true"
            />
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
}

export default function RecipeDetailPage() {
    const params = useParams<{ id: string }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const router = useRouter();
    const { t, lang } = useTranslation();
    const { toast } = useToast();

    // Curated recipes resolve synchronously so they render on the server and on
    // first paint (no loading flash, better SEO). Saved recipes live in
    // localStorage and resolve once hydrated — derived, never via setState in an
    // effect (avoids cascading renders / hydration mismatches).
    const initialCurated = useMemo(() => resolveCurated(id), [id]);
    const hydrated = useHydrated();
    const resolved = useMemo<ResolvedRecipe | null>(() => {
        if (initialCurated) return initialCurated;
        if (hydrated && id) {
            const saved = getSavedById(id);
            if (saved) {
                return {
                    data: normalizeRecipe(saved.recipe),
                    savedId: saved.id,
                    isPredefined: saved.isPredefined,
                };
            }
        }
        return null;
    }, [initialCurated, hydrated, id]);

    // Interactive state. Servings/saved are "overrides" layered over derived
    // defaults so they don't need an effect to sync when `resolved` arrives.
    const [servingsOverride, setServingsOverride] = useState<number | null>(null);
    const [savedOverride, setSavedOverride] = useState<boolean | null>(null);
    const [checked, setChecked] = useState<Set<number>>(new Set());
    const [cookMode, setCookMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    const recipe = resolved?.data ?? null;
    const originalServings = recipe?.servings || 1;
    const servings = servingsOverride ?? originalServings;
    const ratio = servings / originalServings;

    const scaledIngredients = useMemo(
        () => (recipe ? recipe.ingredients.map((line) => scaleIngredient(line, ratio)) : []),
        [recipe, ratio],
    );

    const instructions = recipe?.instructions ?? [];
    const totalSteps = instructions.length;

    // --- Loading / not-found gates ---------------------------------------
    // Only show loading while we're still waiting on localStorage; curated
    // recipes are already resolved synchronously.
    if (!hydrated && !resolved) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <SiteHeader />
                <Container className="pt-24">
                    <LoadingState label={t('loading')} />
                </Container>
                <SiteFooter />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <SiteHeader />
                <Container className="pt-24 pb-20">
                    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center text-card-foreground shadow-sm">
                        <div className="flex size-16 items-center justify-center rounded-full bg-[#75070C]/10 text-[#75070C] dark:bg-[#75070C]/20 dark:text-[#ef9ba0]">
                            <ChefHat className="size-8" aria-hidden="true" />
                        </div>
                        <h1 className="text-2xl font-bold">{t('detailNotFound')}</h1>
                        <p className="text-muted-foreground">{t('detailNotFoundSub')}</p>
                        <Button asChild className="bg-[#75070C] text-white hover:bg-[#5a0509]">
                            <Link href="/predefined">
                                <ArrowLeft className="size-4" aria-hidden="true" />
                                {t('detailBack')}
                            </Link>
                        </Button>
                    </div>
                </Container>
                <SiteFooter />
            </div>
        );
    }

    // --- Handlers ---------------------------------------------------------
    const decServings = () => setServingsOverride(Math.max(1, servings - 1));
    const incServings = () => setServingsOverride(servings + 1);

    const toggleCheck = (i: number) =>
        setChecked((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    const markAll = () => setChecked(new Set(scaledIngredients.map((_, i) => i)));
    const clearChecks = () => setChecked(new Set());

    const copyList = async () => {
        try {
            await navigator.clipboard.writeText(scaledIngredients.join('\n'));
            toast(t('toastCopied'), 'success');
        } catch {
            toast(t('toastShareFailed'), 'error');
        }
    };

    const enterCookMode = () => {
        setCookMode(true);
        setStepIndex(0);
        setFinished(false);
    };
    const exitCookMode = () => {
        setCookMode(false);
        setFinished(false);
        setStepIndex(0);
    };

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            try {
                await navigator.share({ title: recipe.title, url });
                return;
            } catch {
                // User cancelled or share failed — fall through to copy.
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            toast(t('toastCopied'), 'success');
        } catch {
            toast(t('toastShareFailed'), 'error');
        }
    };

    const handleSave = () => {
        const payload: RecipeData = {
            title: recipe.title,
            cuisine: recipe.cuisine,
            totalTime: recipe.totalTime,
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
        const entry = addRecipe(payload, { isPredefined: resolved?.isPredefined ?? false });
        if (entry) {
            toast(t('toastSaved'), 'success');
        } else {
            toast(t('toastAlreadySaved'), 'info');
        }
        setSavedOverride(true);
    };

    const handleRemove = () => {
        if (!resolved?.savedId) return;
        removeRecipe(resolved.savedId);
        toast(t('toastRemoved'), 'success');
        router.push('/saved');
    };

    const macros: { key: 'protein' | 'carbs' | 'fat'; label: string; value?: number }[] = [
        { key: 'protein', label: t('detailProtein'), value: recipe.protein },
        { key: 'carbs', label: t('detailCarbs'), value: recipe.carbs },
        { key: 'fat', label: t('detailFat'), value: recipe.fat },
    ];
    const macroMax = Math.max(1, ...macros.map((m) => m.value ?? 0));
    const hasMacros = macros.some((m) => typeof m.value === 'number');

    const accent = 'text-[#4F6815] dark:text-[#a3c14f]';

    // Saved-state is derived: explicit override wins; a localStorage entry is
    // always saved; otherwise check by title once hydrated.
    const isSaved =
        savedOverride ?? (resolved?.savedId ? true : hydrated ? isTitleSaved(recipe.title) : false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            <main className="pt-24 pb-20">
                <Container>
                    {/* Back link (chrome — excluded from print) */}
                    <div data-no-print className="mb-6">
                        <Link
                            href="/predefined"
                            className={cn(
                                'inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6815]/40',
                            )}
                        >
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            {t('detailBack')}
                        </Link>
                    </div>

                    <article data-print-recipe>
                        {/* Hero */}
                        <header className="relative mb-8 overflow-hidden rounded-2xl border border-border shadow-sm">
                            <div className="relative h-56 bg-gradient-to-br from-[#4F6815] to-[#75070C] sm:h-72">
                                <Image
                                    src={imageFor(recipe.title)}
                                    alt={recipe.title}
                                    fill
                                    priority
                                    sizes="100vw"
                                    className="object-cover opacity-70 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    {recipe.cuisine && (
                                        <span className="mb-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#75070C] backdrop-blur-sm">
                                            {getCuisineName(lang, recipe.cuisine)}
                                        </span>
                                    )}
                                    <h1 className="text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
                                        {recipe.title}
                                    </h1>
                                </div>
                                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#4F6815] backdrop-blur-sm">
                                    {resolved?.isPredefined ? t('demoCurated') : t('demoAI')}
                                </span>
                            </div>

                            {/* Meta chips */}
                            <div className="flex flex-wrap gap-x-6 gap-y-3 bg-card p-5 text-sm text-card-foreground sm:p-6">
                                {recipe.totalTime && (
                                    <span className="inline-flex items-center gap-2">
                                        <Clock className={cn('size-4', accent)} aria-hidden="true" />
                                        {recipe.totalTime}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-2">
                                    <Users className={cn('size-4', accent)} aria-hidden="true" />
                                    {servings} {t('demoServings')}
                                </span>
                                {recipe.difficulty && (
                                    <span className="inline-flex items-center gap-2">
                                        <BarChart3 className={cn('size-4', accent)} aria-hidden="true" />
                                        {getDifficultyName(lang, recipe.difficulty)}
                                    </span>
                                )}
                                {typeof recipe.calories === 'number' && (
                                    <span className="inline-flex items-center gap-2">
                                        <Flame className={cn('size-4', accent)} aria-hidden="true" />
                                        {recipe.calories} {t('demoCalories')}
                                    </span>
                                )}
                            </div>
                        </header>

                        {/* Two-column layout */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Sidebar: ingredients + nutrition */}
                            <aside className="space-y-6 md:col-span-1">
                                <section className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:sticky md:top-24">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <h2 className="flex items-center gap-2 text-lg font-bold">
                                            <ListChecks className={cn('size-5', accent)} aria-hidden="true" />
                                            {t('detailIngredients')}
                                        </h2>
                                    </div>

                                    {/* Servings scaler */}
                                    <div
                                        data-no-print
                                        className="mb-5 flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-3"
                                    >
                                        <span className="text-sm font-medium">{t('detailServings')}</span>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                size="icon-sm"
                                                variant="outline"
                                                onClick={decServings}
                                                disabled={servings <= 1}
                                                aria-label={t('detailServings')}
                                            >
                                                <Minus className="size-4" aria-hidden="true" />
                                            </Button>
                                            <span
                                                className="w-8 text-center text-base font-bold tabular-nums"
                                                aria-live="polite"
                                            >
                                                {servings}
                                            </span>
                                            <Button
                                                type="button"
                                                size="icon-sm"
                                                variant="outline"
                                                onClick={incServings}
                                                aria-label={t('detailServings')}
                                            >
                                                <Plus className="size-4" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Checklist */}
                                    <ul className="space-y-1">
                                        {scaledIngredients.map((line, i) => {
                                            const isChecked = checked.has(i);
                                            return (
                                                <li key={i}>
                                                    <button
                                                        type="button"
                                                        role="checkbox"
                                                        aria-checked={isChecked}
                                                        onClick={() => toggleCheck(i)}
                                                        className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6815]/40"
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={cn(
                                                                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                                                                isChecked
                                                                    ? 'border-[#4F6815] bg-[#4F6815] text-white dark:border-[#a3c14f] dark:bg-[#a3c14f] dark:text-[#1a1a12]'
                                                                    : 'border-border bg-background',
                                                            )}
                                                        >
                                                            {isChecked && <Check className="size-3.5" />}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                'leading-snug',
                                                                isChecked &&
                                                                    'text-muted-foreground line-through',
                                                            )}
                                                        >
                                                            {line}
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* Checklist actions */}
                                    <div data-no-print className="mt-4 flex flex-wrap gap-2">
                                        <Button type="button" size="sm" variant="outline" onClick={markAll}>
                                            <Check className="size-3.5" aria-hidden="true" />
                                            {t('detailMarkAll')}
                                        </Button>
                                        <Button type="button" size="sm" variant="outline" onClick={clearChecks}>
                                            {t('detailClearChecks')}
                                        </Button>
                                        <Button type="button" size="sm" variant="outline" onClick={copyList}>
                                            <Copy className="size-3.5" aria-hidden="true" />
                                            {t('detailCopyList')}
                                        </Button>
                                    </div>
                                </section>

                                {/* Nutrition */}
                                {(typeof recipe.calories === 'number' || hasMacros) && (
                                    <section className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                                        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold">
                                            <Flame className={cn('size-5', accent)} aria-hidden="true" />
                                            {t('detailNutrition')}
                                        </h2>
                                        <p className="mb-4 text-xs text-muted-foreground">
                                            ({t('detailPerServing')})
                                        </p>

                                        {typeof recipe.calories === 'number' && (
                                            <div className="mb-4 flex items-baseline justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    {t('demoCalories')}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {recipe.calories}
                                                </span>
                                            </div>
                                        )}

                                        {hasMacros && (
                                            <div className="space-y-3">
                                                {macros.map(
                                                    (m) =>
                                                        typeof m.value === 'number' && (
                                                            <div key={m.key}>
                                                                <div className="mb-1 flex items-center justify-between text-xs">
                                                                    <span className="text-muted-foreground">
                                                                        {m.label}
                                                                    </span>
                                                                    <span className="font-semibold tabular-nums">
                                                                        {m.value}g
                                                                    </span>
                                                                </div>
                                                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                                    <div
                                                                        className="h-full rounded-full bg-gradient-to-r from-[#4F6815] to-[#75070C]"
                                                                        style={{
                                                                            width: `${Math.round(((m.value ?? 0) / macroMax) * 100)}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ),
                                                )}
                                            </div>
                                        )}
                                    </section>
                                )}
                            </aside>

                            {/* Main: instructions + tips */}
                            <div className="space-y-6 md:col-span-2">
                                <section className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <h2 className="flex items-center gap-2 text-lg font-bold">
                                            <ChefHat className={cn('size-5', accent)} aria-hidden="true" />
                                            {t('detailInstructions')}
                                        </h2>
                                        {totalSteps > 0 && (
                                            <Button
                                                data-no-print
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={cookMode ? exitCookMode : enterCookMode}
                                            >
                                                {cookMode ? t('detailExitCookMode') : t('detailCookMode')}
                                            </Button>
                                        )}
                                    </div>

                                    {/* Normal step list (also what prints) */}
                                    {!cookMode && (
                                        <ol className="space-y-4">
                                            {instructions.map((step, i) => (
                                                <li key={i} className="flex gap-4">
                                                    <span
                                                        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#4F6815]/10 text-sm font-bold text-[#4F6815] dark:bg-[#a3c14f]/15 dark:text-[#a3c14f]"
                                                        aria-hidden="true"
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <p className="pt-0.5 leading-relaxed">{step}</p>
                                                </li>
                                            ))}
                                        </ol>
                                    )}

                                    {/* Cook mode */}
                                    {cookMode && (
                                        <div data-no-print>
                                            <AnimatePresence mode="wait">
                                                {finished ? (
                                                    <motion.div
                                                        key="done"
                                                        initial={{ opacity: 0, scale: 0.96 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="flex flex-col items-center gap-4 py-10 text-center"
                                                    >
                                                        <span className="text-5xl" aria-hidden="true">
                                                            🎉
                                                        </span>
                                                        <h3 className="text-xl font-bold">
                                                            {t('detailAllDone')}
                                                        </h3>
                                                        <p className="max-w-sm text-muted-foreground">
                                                            {t('detailAllDoneSub')}
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={exitCookMode}
                                                        >
                                                            {t('detailExitCookMode')}
                                                        </Button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key={stepIndex}
                                                        initial={{ opacity: 0, x: 16 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -16 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <p className="mb-3 text-sm font-medium text-muted-foreground">
                                                            {t('detailStep')} {stepIndex + 1} {t('detailOf')}{' '}
                                                            {totalSteps}
                                                        </p>
                                                        <div
                                                            className="mb-5 h-2 overflow-hidden rounded-full bg-muted"
                                                            role="progressbar"
                                                            aria-valuemin={1}
                                                            aria-valuemax={totalSteps}
                                                            aria-valuenow={stepIndex + 1}
                                                        >
                                                            <div
                                                                className="h-full rounded-full bg-gradient-to-r from-[#4F6815] to-[#75070C] transition-all"
                                                                style={{
                                                                    width: `${((stepIndex + 1) / totalSteps) * 100}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="min-h-[6rem] text-xl leading-relaxed">
                                                            {instructions[stepIndex]}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {!finished && (
                                                <div className="mt-6 flex items-center justify-between gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setStepIndex((s) => Math.max(0, s - 1))
                                                        }
                                                        disabled={stepIndex === 0}
                                                    >
                                                        {t('detailPrev')}
                                                    </Button>
                                                    {stepIndex < totalSteps - 1 ? (
                                                        <Button
                                                            type="button"
                                                            className="bg-[#4F6815] text-white hover:bg-[#3d5210]"
                                                            onClick={() =>
                                                                setStepIndex((s) =>
                                                                    Math.min(totalSteps - 1, s + 1),
                                                                )
                                                            }
                                                        >
                                                            {t('detailNext')}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            type="button"
                                                            className="bg-[#75070C] text-white hover:bg-[#5a0509]"
                                                            onClick={() => setFinished(true)}
                                                        >
                                                            {t('detailFinish')}
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </section>

                                {/* Tips */}
                                {recipe.tips && (
                                    <section className="rounded-2xl border border-[#FFEDAB] bg-[#FFEDAB]/20 p-6 dark:border-[#FFEDAB]/30 dark:bg-[#FFEDAB]/10">
                                        <h2 className="mb-2 text-lg font-bold text-[#75070C] dark:text-[#ef9ba0]">
                                            {t('detailTips')}
                                        </h2>
                                        <p className="leading-relaxed text-foreground/90">{recipe.tips}</p>
                                    </section>
                                )}
                            </div>
                        </div>
                    </article>

                    {/* Actions (chrome — excluded from print) */}
                    <div data-no-print className="mt-10 flex flex-wrap items-center gap-3">
                        <Button type="button" variant="outline" onClick={() => window.print()}>
                            <Printer className="size-4" aria-hidden="true" />
                            {t('detailPrint')}
                        </Button>
                        <Button type="button" variant="outline" onClick={handleShare}>
                            <Share2 className="size-4" aria-hidden="true" />
                            {t('detailShare')}
                        </Button>

                        {resolved?.savedId ? (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleRemove}
                            >
                                <Trash2 className="size-4" aria-hidden="true" />
                                {t('detailRemove')}
                            </Button>
                        ) : isSaved ? (
                            <Button
                                type="button"
                                variant="outline"
                                disabled
                                className="border-[#4F6815] text-[#4F6815] dark:border-[#a3c14f] dark:text-[#a3c14f]"
                            >
                                <BookmarkCheck className="size-4" aria-hidden="true" />
                                {t('detailSaved')}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                className="bg-[#4F6815] text-white hover:bg-[#3d5210]"
                                onClick={handleSave}
                            >
                                <Bookmark className="size-4" aria-hidden="true" />
                                {t('detailSave')}
                            </Button>
                        )}
                    </div>
                </Container>
            </main>

            <SiteFooter />
        </div>
    );
}

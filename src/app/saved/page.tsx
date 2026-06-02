'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, BarChart3, BookOpen } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import { normalizeRecipe } from '@/lib/recipe-storage';
import { getCuisineName, getDifficultyName } from '@/lib/translations';

const RECIPE_IMAGES = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
];
const imageFor = (title: string): string =>
    RECIPE_IMAGES[title.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % RECIPE_IMAGES.length];

export default function SavedRecipesPage() {
    const { t, lang } = useTranslation();
    const { toast } = useToast();
    const { recipes, hydrated, remove, clear } = useSavedRecipes();

    const handleClear = () => {
        clear();
        toast(t('toastClearedAll'), 'success');
    };

    const handleRemove = (id: string) => {
        remove(id);
        toast(t('toastRemoved'), 'info');
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFBF0] via-background to-[#FFEDAB]/20 dark:from-[#1a1407] dark:via-background dark:to-[#0f0a02] pt-24 pb-12">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#75070C]/10 text-[#75070C] dark:text-[#e06b70] text-sm font-medium mb-4">
                            <span aria-hidden>📖</span>
                            <span>{t('savedTitle')}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            {t('savedTitle')}
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('savedSubtitle')}
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Content */}
            <section className="pb-20">
                <Container>
                    {!hydrated ? (
                        <div className="text-center py-20 text-muted-foreground" role="status">
                            {t('loading')}
                        </div>
                    ) : recipes.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex items-center justify-center size-20 rounded-full bg-[#75070C]/10 text-[#75070C] dark:text-[#e06b70] mb-6">
                                <BookOpen className="size-10" aria-hidden />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                                {t('savedNoRecipes')}
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                {t('savedStartExploring')}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href="/">
                                    <Button className="bg-[#75070C] hover:bg-[#5a0509] text-white text-base px-8 py-3">
                                        {t('demoGenerate')}
                                    </Button>
                                </Link>
                                <Link href="/predefined">
                                    <Button
                                        variant="outline"
                                        className="border-[#4F6815] text-[#4F6815] dark:border-[#a3c14f] dark:text-[#a3c14f] text-base px-8 py-3"
                                    >
                                        {t('navBrowseRecipes')}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-base text-muted-foreground">
                                    <strong className="text-[#4F6815] dark:text-[#a3c14f]">
                                        {recipes.length}
                                    </strong>{' '}
                                    {t('savedRecipesCount')}
                                </p>
                                <Button
                                    onClick={handleClear}
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                                >
                                    {t('savedClearAll')}
                                </Button>
                            </div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {recipes.map((saved) => {
                                    const recipe = normalizeRecipe(saved.recipe);
                                    return (
                                        <motion.div
                                            key={saved.id}
                                            variants={fadeInUp}
                                            className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1"
                                        >
                                            <div className="h-48 relative bg-gradient-to-br from-[#4F6815] to-[#75070C]">
                                                <Image
                                                    src={imageFor(recipe.title)}
                                                    alt={`${recipe.title}${recipe.cuisine ? ` — ${getCuisineName(lang, recipe.cuisine)} dish` : ''}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover opacity-90"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#4F6815] dark:text-[#a3c14f]">
                                                    {recipe.cuisine
                                                        ? getCuisineName(lang, recipe.cuisine)
                                                        : t('savedGenerated')}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-foreground mb-3">
                                                    {recipe.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                                                    {recipe.totalTime && (
                                                        <span className="inline-flex items-center gap-1">
                                                            <Clock className="size-4" aria-hidden />
                                                            {recipe.totalTime}
                                                        </span>
                                                    )}
                                                    <span className="inline-flex items-center gap-1">
                                                        <Users className="size-4" aria-hidden />
                                                        {recipe.servings} {t('demoServings')}
                                                    </span>
                                                    {recipe.difficulty && (
                                                        <span className="inline-flex items-center gap-1">
                                                            <BarChart3 className="size-4" aria-hidden />
                                                            {getDifficultyName(lang, recipe.difficulty)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/recipe/${saved.id}`}
                                                        className="flex-1"
                                                    >
                                                        <Button className="w-full bg-[#4F6815] hover:bg-[#3d5210] text-white">
                                                            {t('savedViewRecipe')}
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        onClick={() => handleRemove(saved.id)}
                                                        variant="outline"
                                                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                                                    >
                                                        {t('savedDelete')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </>
                    )}
                </Container>
            </section>

            <SiteFooter />
        </div>
    );
}

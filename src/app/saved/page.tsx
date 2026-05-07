'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SavedRecipe {
    id: string;
    recipe: {
        title: string;
        totalTime?: string;
        time?: string;
        servings: number;
        difficulty?: string;
        cuisine?: string;
    };
    savedAt: string;
    isPredefined: boolean;
}

// Helper to load from localStorage
function loadSavedRecipes(): SavedRecipe[] {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('savedRecipes');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved recipes:', e);
            }
        }
    }
    return [];
}

export default function SavedRecipesPage() {
    const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>(loadSavedRecipes);

    const deleteRecipe = (id: string) => {
        const updated = savedRecipes.filter(r => r.id !== id);
        setSavedRecipes(updated);
        localStorage.setItem('savedRecipes', JSON.stringify(updated));
    };

    const deleteAll = () => {
        setSavedRecipes([]);
        localStorage.removeItem('savedRecipes');
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-white to-[#FFEDAB]/20">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#4F6815]/10">
                <Container>
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F6815] to-[#75070C] flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="font-bold text-2xl text-[#4F6815]">RecipeAI</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/predefined">
                                <Button variant="outline" className="border-[#4F6815] text-[#4F6815]">
                                    Browse Recipes
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button className="bg-[#75070C] hover:bg-[#5a0509] text-white">
                                    Generate New
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16">
                <Container>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                            Your Cookbook
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            All your saved recipes in one beautiful place
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Saved Recipes */}
            <section className="pb-20">
                <Container>
                    {savedRecipes.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-6">📖</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                No saved recipes yet
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Start exploring and save your favorite recipes!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/">
                                    <Button className="bg-[#75070C] hover:bg-[#5a0509] text-white text-lg px-8 py-3">
                                        Generate Recipes
                                    </Button>
                                </Link>
                                <Link href="/predefined">
                                    <Button variant="outline" className="border-[#4F6815] text-[#4F6815] text-lg px-8 py-3">
                                        Browse Library
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-lg text-gray-600">
                                    <strong className="text-[#4F6815]">{savedRecipes.length}</strong> recipe{savedRecipes.length > 1 ? 's' : ''} saved
                                </p>
                                <Button 
                                    onClick={deleteAll}
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    Clear All
                                </Button>
                            </div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {savedRecipes.map((saved) => (
                                    <motion.div
                                        key={saved.id}
                                        variants={fadeInUp}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#4F6815]/10 hover:shadow-xl transition-shadow"
                                    >
                                        <div className="h-48 bg-gradient-to-br from-[#4F6815] to-[#75070C] relative">
                                            <img 
                                                src={getRecipeImage(saved.recipe.title)}
                                                alt={saved.recipe.title}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                                {saved.recipe.cuisine || 'AI Generated'}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {saved.recipe.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
                                                <span>⏱️ {saved.recipe.totalTime || saved.recipe.time}</span>
                                                <span>👥 {saved.recipe.servings} servings</span>
                                                {saved.recipe.difficulty && (
                                                    <span>📊 {saved.recipe.difficulty}</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/recipe/${saved.id}`} className="flex-1">
                                                    <Button className="w-full bg-[#4F6815] hover:bg-[#3d5210] text-white">
                                                        View Recipe
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteRecipe(saved.id)}
                                                    variant="outline"
                                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    )}
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <Container>
                    <div className="text-center">
                        <p className="text-sm">
                            © 2026 RecipeAI. All rights reserved.
                        </p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
    addRecipe,
    addRecipes,
    clearAllRecipes,
    getSavedRecipesSnapshot,
    getServerRecipesSnapshot,
    isTitleSaved,
    removeRecipe,
    subscribeSavedRecipes,
    type RecipeData,
} from '@/lib/recipe-storage';
import { useHydrated } from '@/hooks/useHydrated';

/**
 * Client hook over the recipe-storage layer. Uses useSyncExternalStore so it is
 * SSR-safe (empty on the server, real data after hydration — no mismatch and no
 * setState-in-effect) and stays in sync via the native `storage` event (other
 * tabs) and our custom event (same tab).
 */
export function useSavedRecipes() {
    const recipes = useSyncExternalStore(
        subscribeSavedRecipes,
        getSavedRecipesSnapshot,
        getServerRecipesSnapshot,
    );
    const hydrated = useHydrated();

    const save = useCallback(
        (recipe: RecipeData, opts?: { isPredefined?: boolean }) => addRecipe(recipe, opts),
        [],
    );
    const saveMany = useCallback(
        (items: RecipeData[], opts?: { isPredefined?: boolean }) => addRecipes(items, opts),
        [],
    );
    const remove = useCallback((id: string) => removeRecipe(id), []);
    const clear = useCallback(() => clearAllRecipes(), []);

    return { recipes, hydrated, save, saveMany, remove, clear, isTitleSaved };
}

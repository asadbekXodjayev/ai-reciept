// Shared localStorage layer for saved recipes ("cookbook").
// Used by the Demo (AI results), the predefined library, the saved page,
// and the recipe detail page so every surface reads/writes the same shape.

const STORAGE_KEY = 'savedRecipes';
// Fired on the window after any mutation so hooks in the SAME tab can re-sync
// (the native `storage` event only fires in OTHER tabs).
export const SAVED_RECIPES_EVENT = 'savedrecipes:change';

export interface RecipeData {
    title: string;
    cuisine?: string;
    /** Canonical total-time string. */
    totalTime?: string;
    /** Legacy field used by predefined recipes. */
    time?: string;
    servings: number;
    difficulty?: string;
    ingredients: string[];
    instructions: string[];
    tips?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
}

export interface SavedRecipe {
    id: string;
    recipe: RecipeData;
    savedAt: string;
    isPredefined: boolean;
}

/** Normalized view used by display components (handles legacy `time` field). */
export interface DisplayRecipe extends RecipeData {
    totalTime: string;
}

export function normalizeRecipe(recipe: RecipeData): DisplayRecipe {
    return {
        ...recipe,
        totalTime: recipe.totalTime || recipe.time || '',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    };
}

export function loadSavedRecipes(): SavedRecipe[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error('Failed to parse saved recipes:', e);
        return [];
    }
}

// --- useSyncExternalStore support ---------------------------------------
// getSnapshot must return a stable reference when nothing changed, so we cache
// the parsed list keyed by the raw localStorage string.
const EMPTY: SavedRecipe[] = [];
let cachedRaw: string | null = null;
let cachedList: SavedRecipe[] = EMPTY;

export function getSavedRecipesSnapshot(): SavedRecipe[] {
    if (typeof window === 'undefined') return EMPTY;
    const raw = localStorage.getItem(STORAGE_KEY) ?? '';
    if (raw === cachedRaw) return cachedList;
    cachedRaw = raw;
    cachedList = raw ? loadSavedRecipes() : EMPTY;
    return cachedList;
}

export function getServerRecipesSnapshot(): SavedRecipe[] {
    return EMPTY;
}

export function subscribeSavedRecipes(callback: () => void): () => void {
    window.addEventListener(SAVED_RECIPES_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(SAVED_RECIPES_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

function persist(list: SavedRecipe[]) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        window.dispatchEvent(new Event(SAVED_RECIPES_EVENT));
    } catch (e) {
        console.error('Failed to persist saved recipes:', e);
    }
}

const titleKey = (title: string) => title.trim().toLowerCase();

export function isTitleSaved(title: string): boolean {
    return loadSavedRecipes().some((s) => titleKey(s.recipe.title) === titleKey(title));
}

function makeId(prefix: string): string {
    const uuid =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID().slice(0, 8)
            : Math.abs(Date.parse(new Date().toISOString())).toString(36);
    return `${prefix}-${uuid}`;
}

/**
 * Add a single recipe, skipping duplicates (matched by title).
 * Returns the saved entry, or null if it was already present.
 */
export function addRecipe(
    recipe: RecipeData,
    opts: { isPredefined?: boolean; id?: string } = {},
): SavedRecipe | null {
    const list = loadSavedRecipes();
    if (list.some((s) => titleKey(s.recipe.title) === titleKey(recipe.title))) {
        return null;
    }
    const entry: SavedRecipe = {
        id: opts.id ?? makeId(opts.isPredefined ? 'predefined' : 'ai'),
        recipe,
        savedAt: new Date().toISOString(),
        isPredefined: opts.isPredefined ?? false,
    };
    persist([...list, entry]);
    return entry;
}

/** Add multiple recipes, skipping duplicates. Returns how many were added. */
export function addRecipes(recipes: RecipeData[], opts: { isPredefined?: boolean } = {}): number {
    const list = loadSavedRecipes();
    const seen = new Set(list.map((s) => titleKey(s.recipe.title)));
    let added = 0;
    for (const recipe of recipes) {
        const key = titleKey(recipe.title);
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({
            id: makeId(opts.isPredefined ? 'predefined' : 'ai'),
            recipe,
            savedAt: new Date().toISOString(),
            isPredefined: opts.isPredefined ?? false,
        });
        added++;
    }
    if (added > 0) persist(list);
    return added;
}

export function removeRecipe(id: string): void {
    persist(loadSavedRecipes().filter((s) => s.id !== id));
}

export function clearAllRecipes(): void {
    persist([]);
}

export function getSavedById(id: string): SavedRecipe | undefined {
    return loadSavedRecipes().find((s) => s.id === id);
}

// Translation keys for English, Uzbek, and Russian

export type Language = 'en' | 'uz' | 'ru';

export interface Translations {
    // Navigation
    navBrowseRecipes: string;
    navMyCookbook: string;
    navGenerateNew: string;
    navSaved: string;
    
    // Hero Section
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    
    // Demo Section
    demoTitle: string;
    demoSubtitle: string;
    demoWhatToCook: string;
    demoIngredients: string;
    demoIngredientsPlaceholder: string;
    demoCuisine: string;
    demoDietary: string;
    demoOtherRestrictions: string;
    demoOtherRestrictionsPlaceholder: string;
    demoExamples: string;
    demoGenerate: string;
    demoGenerating: string;
    demoThinking: string;
    demoThinkingSub: string;
    demoError: string;
    demoErrorSub: string;
    demoTryAgain: string;
    demoNoResults: string;
    demoNoResultsSub: string;
    demoAI: string;
    demoCurated: string;
    demoFound: string;
    demoServings: string;
    demoDifficulty: string;
    demoCalories: string;
    demoIngredientsTitle: string;
    demoInstructionsTitle: string;
    demoProTip: string;
    demoGenerateNew: string;
    demoSaveAll: string;
    
    // Cuisine Types - explicit keys
    cuisineAny: string;
    cuisineItalian: string;
    cuisineChinese: string;
    cuisineAmerican: string;
    cuisineMexican: string;
    cuisineJapanese: string;
    cuisineIndian: string;
    cuisineThai: string;
    cuisineMediterranean: string;
    cuisineKorean: string;
    cuisineUzbek: string;
    cuisineRussian: string;
    
    // Dietary Presets - explicit keys
    dietaryLowCarb: string;
    dietaryHighProtein: string;
    dietaryGlutenFree: string;
    dietaryVegan: string;
    dietaryVegetarian: string;
    dietaryKeto: string;
    dietaryDairyFree: string;
    dietaryPaleo: string;
    
    // Predefined Page
    predefinedTitle: string;
    predefinedSubtitle: string;
    predefinedSearch: string;
    predefinedCuisine: string;
    predefinedDietary: string;
    predefinedNoResults: string;
    predefinedNoResultsSub: string;
    predefinedSaveRecipe: string;
    predefinedView: string;
    
    // Saved Page
    savedTitle: string;
    savedSubtitle: string;
    savedNoRecipes: string;
    savedStartExploring: string;
    savedRecipesCount: string;
    savedClearAll: string;
    savedViewRecipe: string;
    savedDelete: string;
    savedGenerated: string;
    
    // Footer
    footerCopyright: string;
    
    // Common
    loading: string;
    error: string;
    success: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        navBrowseRecipes: 'Browse Recipes',
        navMyCookbook: 'My Cookbook',
        navGenerateNew: 'Generate New',
        navSaved: 'Saved',
        heroTitle: 'AI Recipe Generator',
        heroSubtitle: 'Turn your ingredients into delicious meals',
        heroDescription: 'Enter what you have and get personalized recipes',
        demoTitle: 'See It In Action',
        demoSubtitle: 'Enter your ingredients and get personalized recipes',
        demoWhatToCook: 'What would you like to cook?',
        demoIngredients: 'Your Ingredients (comma-separated)',
        demoIngredientsPlaceholder: 'e.g., chicken, lemon, garlic, rice',
        demoCuisine: 'Choose Cuisine Type',
        demoDietary: 'Dietary Preferences (optional)',
        demoOtherRestrictions: 'Other Restrictions (optional)',
        demoOtherRestrictionsPlaceholder: 'e.g., nut-free, spicy, quick meals',
        demoExamples: 'Quick examples:',
        demoGenerate: 'Get Recipes',
        demoGenerating: 'Generating...',
        demoThinking: 'AI is cooking up perfect recipes for you...',
        demoThinkingSub: 'Analyzing ingredients and preferences...',
        demoError: 'Oops! Something went wrong',
        demoErrorSub: 'Failed to generate recipes',
        demoTryAgain: 'Try Again',
        demoNoResults: 'No recipes found',
        demoNoResultsSub: 'Try different ingredients or adjust your preferences',
        demoAI: 'AI Generated',
        demoCurated: 'Curated Recipe',
        demoFound: 'recipes found for you',
        demoServings: 'servings',
        demoDifficulty: 'difficulty',
        demoCalories: 'cal',
        demoIngredientsTitle: 'Ingredients',
        demoInstructionsTitle: 'Instructions',
        demoProTip: 'Pro Tip',
        demoGenerateNew: 'Generate New Recipes',
        demoSaveAll: 'Save All Recipes',
        cuisineAny: 'Any Cuisine',
        cuisineItalian: 'Italian',
        cuisineChinese: 'Chinese',
        cuisineAmerican: 'American',
        cuisineMexican: 'Mexican',
        cuisineJapanese: 'Japanese',
        cuisineIndian: 'Indian',
        cuisineThai: 'Thai',
        cuisineMediterranean: 'Mediterranean',
        cuisineKorean: 'Korean',
        cuisineUzbek: 'Uzbek',
        cuisineRussian: 'Russian',
        dietaryLowCarb: 'Low-Carb',
        dietaryHighProtein: 'High-Protein',
        dietaryGlutenFree: 'Gluten-Free',
        dietaryVegan: 'Vegan',
        dietaryVegetarian: 'Vegetarian',
        dietaryKeto: 'Keto',
        dietaryDairyFree: 'Dairy-Free',
        dietaryPaleo: 'Paleo',
        predefinedTitle: 'Recipe Library',
        predefinedSubtitle: 'Browse our collection of curated recipes',
        predefinedSearch: 'Search recipes or ingredients...',
        predefinedCuisine: 'Cuisine',
        predefinedDietary: 'Dietary',
        predefinedNoResults: 'No recipes found',
        predefinedNoResultsSub: 'Try adjusting your filters',
        predefinedSaveRecipe: 'Save Recipe',
        predefinedView: 'View',
        savedTitle: 'Your Cookbook',
        savedSubtitle: 'All your saved recipes in one place',
        savedNoRecipes: 'No saved recipes yet',
        savedStartExploring: 'Start exploring and save your favorites!',
        savedRecipesCount: 'recipes saved',
        savedClearAll: 'Clear All',
        savedViewRecipe: 'View Recipe',
        savedDelete: 'Delete',
        savedGenerated: 'AI Generated',
        footerCopyright: 'RecipeAI. All rights reserved.',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
    },
    uz: {
        navBrowseRecipes: 'Retseplarni Ko\'rish',
        navMyCookbook: 'Mening Kitobim',
        navGenerateNew: 'Yangi Yaratish',
        navSaved: 'Saqlangan',
        heroTitle: 'AI Retsept Generator',
        heroSubtitle: 'Mahsulotlaringizni mazali taomlarga aylantiring',
        heroDescription: 'Nima borligini kiriting va shaxsiy retseplarni oling',
        demoTitle: 'Ishini Ko\'ring',
        demoSubtitle: 'Mahsulotlaringizni kiriting va shaxsiy retseplarni oling',
        demoWhatToCook: 'Nima pishirmoqchisiz?',
        demoIngredients: 'Mahsulotlaringiz (vergul bilan)',
        demoIngredientsPlaceholder: 'masalan, tovuq, limon, sarimsoq, guruch',
        demoCuisine: 'Oshxona Turini Tanlang',
        demoDietary: 'Dieta afzalliklari (ixtiyoriy)',
        demoOtherRestrictions: 'Boshqa Cheklovlar (ixtiyoriy)',
        demoOtherRestrictionsPlaceholder: 'masalan, yong\'oqsiz, achchiq, tez taomlar',
        demoExamples: 'Tez misollar:',
        demoGenerate: 'Retseptlarni Olish',
        demoGenerating: 'Yaratilmoqda...',
        demoThinking: 'AI siz uchun retseptlarni tayyorlamoqda...',
        demoThinkingSub: 'Mahsulotlarni tahlil qilmoqda...',
        demoError: 'Xato! Nimadir noto\'g\'ri',
        demoErrorSub: 'Retsept yaratishda xatolik',
        demoTryAgain: 'Qayta Urning',
        demoNoResults: 'Retseptlar topilmadi',
        demoNoResultsSub: 'Boshqa mahsulotlarni sinab ko\'ring',
        demoAI: 'AI Yaratgan',
        demoCurated: 'Tanlangan Retsept',
        demoFound: 'retsept topildi',
        demoServings: 'porsiyalar',
        demoDifficulty: 'qiyinlik',
        demoCalories: 'kal',
        demoIngredientsTitle: 'Mahsulotlar',
        demoInstructionsTitle: 'Ko\'rsatmalar',
        demoProTip: 'Maslahat',
        demoGenerateNew: 'Yangi Retseptlar',
        demoSaveAll: 'Barchasini Saqlash',
        cuisineAny: 'Har Qanday Oshxona',
        cuisineItalian: 'Italiya',
        cuisineChinese: 'Xitoy',
        cuisineAmerican: 'Amerika',
        cuisineMexican: 'Meksika',
        cuisineJapanese: 'Yapon',
        cuisineIndian: 'Hind',
        cuisineThai: 'Tay',
        cuisineMediterranean: 'O\'rta yer',
        cuisineKorean: 'Koreys',
        cuisineUzbek: 'O\'zbek',
        cuisineRussian: 'Rus',
        dietaryLowCarb: 'Kam Karbohidrat',
        dietaryHighProtein: 'Oqsilli',
        dietaryGlutenFree: 'Glutensiz',
        dietaryVegan: 'Vegan',
        dietaryVegetarian: 'Vegetarian',
        dietaryKeto: 'Keto',
        dietaryDairyFree: 'Kafasiz',
        dietaryPaleo: 'Paleo',
        predefinedTitle: 'Retseplar Kutubxonasi',
        predefinedSubtitle: 'Tanlangan retseplar to\'plami',
        predefinedSearch: 'Retseplarni qidiring...',
        predefinedCuisine: 'Oshxona',
        predefinedDietary: 'Dieta',
        predefinedNoResults: 'Retseptlar topilmadi',
        predefinedNoResultsSub: 'Filtrlarni o\'zgartiring',
        predefinedSaveRecipe: 'Saqlash',
        predefinedView: 'Ko\'rish',
        savedTitle: 'Sizning Kitobingiz',
        savedSubtitle: 'Barcha saqlangan retseplar',
        savedNoRecipes: 'Hali saqlangan retseptlar yo\'q',
        savedStartExploring: 'Qidirishni boshlang!',
        savedRecipesCount: 'retsept saqlangan',
        savedClearAll: 'Tozalash',
        savedViewRecipe: 'Ko\'rish',
        savedDelete: 'O\'chirish',
        savedGenerated: 'AI Yaratgan',
        footerCopyright: 'RecipeAI. Barcha huquqlar himoyalangan.',
        loading: 'Yuklanmoqda...',
        error: 'Xato',
        success: 'Muvaffaqiyat',
    },
    ru: {
        navBrowseRecipes: 'Рецепты',
        navMyCookbook: 'Моя Книга',
        navGenerateNew: 'Создать',
        navSaved: 'Сохранено',
        heroTitle: 'Генератор Рецептов AI',
        heroSubtitle: 'Превратите ингредиенты в блюда',
        heroDescription: 'Введите что у вас есть и получите рецепты',
        demoTitle: 'Посмотреть в Действии',
        demoSubtitle: 'Введите ингредиенты и получите рецепты',
        demoWhatToCook: 'Что вы хотите приготовить?',
        demoIngredients: 'Ваши Ингредиенты (через запятую)',
        demoIngredientsPlaceholder: 'например, курица, лимон, чеснок',
        demoCuisine: 'Выберите Кухню',
        demoDietary: 'Диетические Предпочтения',
        demoOtherRestrictions: 'Другие Ограничения',
        demoOtherRestrictionsPlaceholder: 'например, без орехов, острое',
        demoExamples: 'Примеры:',
        demoGenerate: 'Получить Рецепты',
        demoGenerating: 'Генерация...',
        demoThinking: 'AI готовит рецепты для вас...',
        demoThinkingSub: 'Анализ ингредиентов...',
        demoError: 'Ой! Что-то пошло не так',
        demoErrorSub: 'Ошибка создания рецептов',
        demoTryAgain: 'Попробовать Снова',
        demoNoResults: 'Рецепты не найдены',
        demoNoResultsSub: 'Попробуйте другие ингредиенты',
        demoAI: 'Создано AI',
        demoCurated: 'Подобранный Рецепт',
        demoFound: 'рецептов найдено',
        demoServings: 'порции',
        demoDifficulty: 'сложность',
        demoCalories: 'кал',
        demoIngredientsTitle: 'Ингредиенты',
        demoInstructionsTitle: 'Инструкции',
        demoProTip: 'Совет',
        demoGenerateNew: 'Новые Рецепты',
        demoSaveAll: 'Сохранить Все',
        cuisineAny: 'Любая Кухня',
        cuisineItalian: 'Итальянская',
        cuisineChinese: 'Китайская',
        cuisineAmerican: 'Американская',
        cuisineMexican: 'Мексиканская',
        cuisineJapanese: 'Японская',
        cuisineIndian: 'Индийская',
        cuisineThai: 'Тайская',
        cuisineMediterranean: 'Средиземноморская',
        cuisineKorean: 'Корейская',
        cuisineUzbek: 'Узбекская',
        cuisineRussian: 'Русская',
        dietaryLowCarb: 'Низкоуглеводная',
        dietaryHighProtein: 'Высокобелковая',
        dietaryGlutenFree: 'Без Глютена',
        dietaryVegan: 'Веган',
        dietaryVegetarian: 'Вегетарианская',
        dietaryKeto: 'Кето',
        dietaryDairyFree: 'Без Молочного',
        dietaryPaleo: 'Палео',
        predefinedTitle: 'Библиотека Рецептов',
        predefinedSubtitle: 'Коллекция рецептов',
        predefinedSearch: 'Поиск рецептов...',
        predefinedCuisine: 'Кухня',
        predefinedDietary: 'Диета',
        predefinedNoResults: 'Рецепты не найдены',
        predefinedNoResultsSub: 'Измените фильтры',
        predefinedSaveRecipe: 'Сохранить',
        predefinedView: 'Смотреть',
        savedTitle: 'Ваша Книга Рецептов',
        savedSubtitle: 'Все сохраненные рецепты',
        savedNoRecipes: 'Нет сохраненных рецептов',
        savedStartExploring: 'Начните исследовать!',
        savedRecipesCount: 'рецептов сохранено',
        savedClearAll: 'Очистить',
        savedViewRecipe: 'Просмотр',
        savedDelete: 'Удалить',
        savedGenerated: 'Создано AI',
        footerCopyright: 'RecipeAI. Все права защищены.',
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
    },
};

// Helper function with proper type handling
export function t(lang: Language, key: keyof Translations): string {
    return translations[lang][key] || translations.en[key];
}

// Helper to get cuisine translation
export function getCuisineName(lang: Language, cuisineId: string): string {
    const key = `cuisine${cuisineId.charAt(0).toUpperCase() + cuisineId.slice(1)}` as keyof Translations;
    return translations[lang][key] || cuisineId;
}

// Helper to get dietary translation
export function getDietaryName(lang: Language, dietaryId: string): string {
    const formattedId = dietaryId.charAt(0).toUpperCase() + dietaryId.slice(1).replace('-', '');
    const key = `dietary${formattedId}` as keyof Translations;
    return translations[lang][key] || dietaryId;
}
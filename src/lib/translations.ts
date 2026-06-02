// Translation keys for English, Uzbek, and Russian

export type Language = 'en' | 'uz' | 'ru';

export interface Translations {
    // Navigation
    navBrowseRecipes: string;
    navMyCookbook: string;
    navGenerateNew: string;
    navSaved: string;
    navHome: string;

    // Theme
    themeToLight: string;
    themeToDark: string;
    langLabel: string;
    menuOpen: string;
    menuClose: string;

    // Hero Section
    heroBadge: string;
    heroHeadlinePre: string;
    heroHeadlineAccent: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    heroTrustLabel: string;
    heroStatRating: string;
    heroStatUsers: string;
    heroStatRecipes: string;

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
    demoViewRecipe: string;
    demoNeedIngredients: string;

    // Features
    featuresTitle: string;
    featuresSubtitle: string;

    // Testimonials
    testimonialsTitle: string;
    testimonialsSubtitle: string;

    // Pricing
    pricingTitle: string;
    pricingSubtitle: string;
    pricingMonthly: string;
    pricingAnnual: string;
    pricingSave: string;
    pricingMostPopular: string;
    pricingGetStarted: string;
    pricingStartTrial: string;
    pricingPerMonth: string;
    pricingPerYear: string;
    pricingPerMonthBilled: string;

    // Waitlist
    waitlistTitle: string;
    waitlistSubtitle: string;
    waitlistPlaceholder: string;
    waitlistButton: string;
    waitlistButtonLoading: string;
    waitlistSpam: string;
    waitlistSuccessTitle: string;
    waitlistSuccessBody: string;
    waitlistAddAnother: string;
    waitlistEmailInvalid: string;
    waitlistEmailRequired: string;

    // Footer
    footerTagline: string;
    footerProduct: string;
    footerCompany: string;
    footerLegal: string;
    footerFeatures: string;
    footerPricing: string;
    footerFaq: string;
    footerAbout: string;
    footerBlog: string;
    footerCareers: string;
    footerPrivacy: string;
    footerTerms: string;
    footerContact: string;
    footerCopyright: string;

    // Cuisine Types
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

    // Dietary Presets
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
    predefinedDifficulty: string;
    predefinedMaxTime: string;
    predefinedAnyTime: string;
    predefinedUnder30: string;
    predefinedUnder60: string;
    predefinedAllDifficulties: string;
    predefinedClearFilters: string;
    predefinedResults: string;
    predefinedNoResults: string;
    predefinedNoResultsSub: string;
    predefinedSaveRecipe: string;
    predefinedView: string;
    difficultyEasy: string;
    difficultyMedium: string;
    difficultyHard: string;

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

    // Recipe Detail Page
    detailBack: string;
    detailNotFound: string;
    detailNotFoundSub: string;
    detailServings: string;
    detailIngredients: string;
    detailInstructions: string;
    detailNutrition: string;
    detailProtein: string;
    detailCarbs: string;
    detailFat: string;
    detailPerServing: string;
    detailTips: string;
    detailPrint: string;
    detailShare: string;
    detailSave: string;
    detailSaved: string;
    detailRemove: string;
    detailCookMode: string;
    detailExitCookMode: string;
    detailStep: string;
    detailOf: string;
    detailPrev: string;
    detailNext: string;
    detailFinish: string;
    detailAllDone: string;
    detailAllDoneSub: string;
    detailCopyList: string;
    detailMarkAll: string;
    detailClearChecks: string;

    // Toasts
    toastSaved: string;
    toastRemoved: string;
    toastClearedAll: string;
    toastAlreadySaved: string;
    toastCopied: string;
    toastShareFailed: string;
    toastSavedCount: string;

    // Common
    loading: string;
    error: string;
    success: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        navBrowseRecipes: 'Browse Recipes',
        navMyCookbook: 'My Cookbook',
        navGenerateNew: 'Generate',
        navSaved: 'Cookbook',
        navHome: 'Home',
        themeToLight: 'Switch to light mode',
        themeToDark: 'Switch to dark mode',
        langLabel: 'Language',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        heroBadge: 'AI Recipe Generator',
        heroHeadlinePre: 'Dinner Decided in',
        heroHeadlineAccent: '10 Seconds',
        heroTitle: 'AI Recipe Generator',
        heroSubtitle: 'Type your ingredients, dietary needs, or cravings. RecipeAI generates a personalized, restaurant-quality recipe instantly.',
        heroDescription: 'Enter what you have and get personalized recipes',
        heroCtaPrimary: 'Get Recipes',
        heroCtaSecondary: 'Browse Library',
        heroTrustLabel: 'Trusted by home cooks worldwide',
        heroStatRating: 'rating',
        heroStatUsers: 'users',
        heroStatRecipes: 'recipes',
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
        demoViewRecipe: 'View Full Recipe',
        demoNeedIngredients: 'Please enter at least one ingredient',
        featuresTitle: 'How It Works',
        featuresSubtitle: 'Four simple steps from empty fridge to restaurant-quality dinner',
        testimonialsTitle: 'Loved by Home Cooks Everywhere',
        testimonialsSubtitle: 'See what real users are saying about RecipeAI',
        pricingTitle: 'Simple, Transparent Pricing',
        pricingSubtitle: 'Choose the plan that fits your cooking style',
        pricingMonthly: 'Monthly',
        pricingAnnual: 'Annual',
        pricingSave: 'Save',
        pricingMostPopular: 'Most Popular',
        pricingGetStarted: 'Get Started',
        pricingStartTrial: 'Start Free Trial',
        pricingPerMonth: '/month',
        pricingPerYear: '/year',
        pricingPerMonthBilled: '/month billed annually',
        waitlistTitle: 'Ready to Transform Your Cooking?',
        waitlistSubtitle: 'Join thousands of home cooks saving time and eating better.',
        waitlistPlaceholder: 'your@email.com',
        waitlistButton: 'Get Early Access',
        waitlistButtonLoading: 'Joining...',
        waitlistSpam: "We'll never spam you. Unsubscribe anytime.",
        waitlistSuccessTitle: "You're on the list!",
        waitlistSuccessBody: "Check your email for a special welcome offer. We'll notify you when RecipeAI launches.",
        waitlistAddAnother: 'Add Another Email',
        waitlistEmailInvalid: 'Please enter a valid email address',
        waitlistEmailRequired: 'Email is required',
        footerTagline: 'AI-powered recipe generation for home cooks.',
        footerProduct: 'Product',
        footerCompany: 'Company',
        footerLegal: 'Legal',
        footerFeatures: 'Features',
        footerPricing: 'Pricing',
        footerFaq: 'FAQ',
        footerAbout: 'About',
        footerBlog: 'Blog',
        footerCareers: 'Careers',
        footerPrivacy: 'Privacy',
        footerTerms: 'Terms',
        footerContact: 'Contact',
        footerCopyright: 'All rights reserved.',
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
        predefinedDifficulty: 'Difficulty',
        predefinedMaxTime: 'Max Time',
        predefinedAnyTime: 'Any Time',
        predefinedUnder30: 'Under 30 min',
        predefinedUnder60: 'Under 1 hour',
        predefinedAllDifficulties: 'All Levels',
        predefinedClearFilters: 'Clear filters',
        predefinedResults: 'recipes',
        predefinedNoResults: 'No recipes found',
        predefinedNoResultsSub: 'Try adjusting your filters',
        predefinedSaveRecipe: 'Save Recipe',
        predefinedView: 'View',
        difficultyEasy: 'Easy',
        difficultyMedium: 'Medium',
        difficultyHard: 'Hard',
        savedTitle: 'Your Cookbook',
        savedSubtitle: 'All your saved recipes in one place',
        savedNoRecipes: 'No saved recipes yet',
        savedStartExploring: 'Start exploring and save your favorites!',
        savedRecipesCount: 'recipes saved',
        savedClearAll: 'Clear All',
        savedViewRecipe: 'View Recipe',
        savedDelete: 'Delete',
        savedGenerated: 'AI Generated',
        detailBack: 'Back',
        detailNotFound: 'Recipe not found',
        detailNotFoundSub: "We couldn't find this recipe. It may have been removed.",
        detailServings: 'Servings',
        detailIngredients: 'Ingredients',
        detailInstructions: 'Instructions',
        detailNutrition: 'Nutrition',
        detailProtein: 'Protein',
        detailCarbs: 'Carbs',
        detailFat: 'Fat',
        detailPerServing: 'per serving',
        detailTips: 'Pro Tip',
        detailPrint: 'Print',
        detailShare: 'Share',
        detailSave: 'Save to Cookbook',
        detailSaved: 'Saved',
        detailRemove: 'Remove',
        detailCookMode: 'Cook Mode',
        detailExitCookMode: 'Exit Cook Mode',
        detailStep: 'Step',
        detailOf: 'of',
        detailPrev: 'Previous',
        detailNext: 'Next',
        detailFinish: 'Finish',
        detailAllDone: 'Bon appétit!',
        detailAllDoneSub: "You've completed every step. Enjoy your meal!",
        detailCopyList: 'Copy shopping list',
        detailMarkAll: 'Check all',
        detailClearChecks: 'Clear',
        toastSaved: 'Saved to your cookbook',
        toastRemoved: 'Removed from your cookbook',
        toastClearedAll: 'Cookbook cleared',
        toastAlreadySaved: 'Already in your cookbook',
        toastCopied: 'Copied to clipboard',
        toastShareFailed: 'Could not share',
        toastSavedCount: 'recipes saved to your cookbook',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
    },
    uz: {
        navBrowseRecipes: 'Retseplar',
        navMyCookbook: 'Kitobim',
        navGenerateNew: 'Yaratish',
        navSaved: 'Kitobim',
        navHome: 'Bosh sahifa',
        themeToLight: 'Yorug‘ rejim',
        themeToDark: 'Tungi rejim',
        langLabel: 'Til',
        menuOpen: 'Menyuni ochish',
        menuClose: 'Menyuni yopish',
        heroBadge: 'AI Retsept Generatori',
        heroHeadlinePre: 'Kechki ovqat',
        heroHeadlineAccent: '10 soniyada',
        heroTitle: 'AI Retsept Generatori',
        heroSubtitle: 'Mahsulotlaringiz, parhez yoki xohishingizni yozing. RecipeAI siz uchun shaxsiy, restoran darajasidagi retsept yaratadi.',
        heroDescription: 'Nima borligini kiriting va shaxsiy retseplarni oling',
        heroCtaPrimary: 'Retseptlarni olish',
        heroCtaSecondary: 'Kutubxona',
        heroTrustLabel: 'Dunyo bo‘ylab oshpazlar ishonchi',
        heroStatRating: 'reyting',
        heroStatUsers: 'foydalanuvchi',
        heroStatRecipes: 'retsept',
        demoTitle: 'Ishini Ko‘ring',
        demoSubtitle: 'Mahsulotlaringizni kiriting va shaxsiy retseplarni oling',
        demoWhatToCook: 'Nima pishirmoqchisiz?',
        demoIngredients: 'Mahsulotlaringiz (vergul bilan)',
        demoIngredientsPlaceholder: 'masalan, tovuq, limon, sarimsoq, guruch',
        demoCuisine: 'Oshxona Turini Tanlang',
        demoDietary: 'Dieta afzalliklari (ixtiyoriy)',
        demoOtherRestrictions: 'Boshqa Cheklovlar (ixtiyoriy)',
        demoOtherRestrictionsPlaceholder: 'masalan, yong‘oqsiz, achchiq, tez taomlar',
        demoExamples: 'Tez misollar:',
        demoGenerate: 'Retseptlarni Olish',
        demoGenerating: 'Yaratilmoqda...',
        demoThinking: 'AI siz uchun retseptlarni tayyorlamoqda...',
        demoThinkingSub: 'Mahsulotlarni tahlil qilmoqda...',
        demoError: 'Xato! Nimadir noto‘g‘ri',
        demoErrorSub: 'Retsept yaratishda xatolik',
        demoTryAgain: 'Qayta Urinish',
        demoNoResults: 'Retseptlar topilmadi',
        demoNoResultsSub: 'Boshqa mahsulotlarni sinab ko‘ring',
        demoAI: 'AI Yaratgan',
        demoCurated: 'Tanlangan Retsept',
        demoFound: 'retsept topildi',
        demoServings: 'porsiya',
        demoDifficulty: 'qiyinlik',
        demoCalories: 'kal',
        demoIngredientsTitle: 'Mahsulotlar',
        demoInstructionsTitle: 'Ko‘rsatmalar',
        demoProTip: 'Maslahat',
        demoGenerateNew: 'Yangi Retseptlar',
        demoSaveAll: 'Barchasini Saqlash',
        demoViewRecipe: 'To‘liq retseptni ko‘rish',
        demoNeedIngredients: 'Kamida bitta mahsulot kiriting',
        featuresTitle: 'Qanday Ishlaydi',
        featuresSubtitle: 'Bo‘sh muzlatgichdan restoran darajasidagi taomgacha to‘rt oddiy qadam',
        testimonialsTitle: 'Oshpazlar Sevimlisi',
        testimonialsSubtitle: 'Foydalanuvchilar RecipeAI haqida nima deyishadi',
        pricingTitle: 'Oddiy va Shaffof Narxlar',
        pricingSubtitle: 'O‘zingizga mos rejani tanlang',
        pricingMonthly: 'Oylik',
        pricingAnnual: 'Yillik',
        pricingSave: 'Tejang',
        pricingMostPopular: 'Eng Mashhur',
        pricingGetStarted: 'Boshlash',
        pricingStartTrial: 'Bepul Sinash',
        pricingPerMonth: '/oy',
        pricingPerYear: '/yil',
        pricingPerMonthBilled: '/oy, yillik to‘lov',
        waitlistTitle: 'Pishirishni O‘zgartirishga Tayyormisiz?',
        waitlistSubtitle: 'Vaqtni tejab, yaxshiroq ovqatlanayotgan minglab oshpazlarga qo‘shiling.',
        waitlistPlaceholder: 'sizning@email.com',
        waitlistButton: 'Erta Kirish',
        waitlistButtonLoading: 'Qo‘shilmoqda...',
        waitlistSpam: 'Hech qachon spam yubormaymiz. Istalgan vaqtda bekor qiling.',
        waitlistSuccessTitle: 'Siz ro‘yxatdasiz!',
        waitlistSuccessBody: 'Maxsus taklif uchun emailingizni tekshiring. RecipeAI ishga tushganda xabar beramiz.',
        waitlistAddAnother: 'Boshqa Email Qo‘shish',
        waitlistEmailInvalid: 'To‘g‘ri email manzilini kiriting',
        waitlistEmailRequired: 'Email talab qilinadi',
        footerTagline: 'Oshpazlar uchun AI retsept generatori.',
        footerProduct: 'Mahsulot',
        footerCompany: 'Kompaniya',
        footerLegal: 'Huquqiy',
        footerFeatures: 'Imkoniyatlar',
        footerPricing: 'Narxlar',
        footerFaq: 'Savol-javob',
        footerAbout: 'Biz haqimizda',
        footerBlog: 'Blog',
        footerCareers: 'Ish o‘rinlari',
        footerPrivacy: 'Maxfiylik',
        footerTerms: 'Shartlar',
        footerContact: 'Aloqa',
        footerCopyright: 'Barcha huquqlar himoyalangan.',
        cuisineAny: 'Har Qanday Oshxona',
        cuisineItalian: 'Italiya',
        cuisineChinese: 'Xitoy',
        cuisineAmerican: 'Amerika',
        cuisineMexican: 'Meksika',
        cuisineJapanese: 'Yapon',
        cuisineIndian: 'Hind',
        cuisineThai: 'Tay',
        cuisineMediterranean: 'O‘rta yer',
        cuisineKorean: 'Koreys',
        cuisineUzbek: 'O‘zbek',
        cuisineRussian: 'Rus',
        dietaryLowCarb: 'Kam Uglevod',
        dietaryHighProtein: 'Oqsilli',
        dietaryGlutenFree: 'Glutensiz',
        dietaryVegan: 'Vegan',
        dietaryVegetarian: 'Vegetarian',
        dietaryKeto: 'Keto',
        dietaryDairyFree: 'Sutsiz',
        dietaryPaleo: 'Paleo',
        predefinedTitle: 'Retseplar Kutubxonasi',
        predefinedSubtitle: 'Tanlangan retseplar to‘plamini ko‘ring',
        predefinedSearch: 'Retsept yoki mahsulot qidiring...',
        predefinedCuisine: 'Oshxona',
        predefinedDietary: 'Dieta',
        predefinedDifficulty: 'Qiyinlik',
        predefinedMaxTime: 'Maks. vaqt',
        predefinedAnyTime: 'Har qanday',
        predefinedUnder30: '30 daqiqagacha',
        predefinedUnder60: '1 soatgacha',
        predefinedAllDifficulties: 'Barcha darajalar',
        predefinedClearFilters: 'Filtrlarni tozalash',
        predefinedResults: 'retsept',
        predefinedNoResults: 'Retseptlar topilmadi',
        predefinedNoResultsSub: 'Filtrlarni o‘zgartirib ko‘ring',
        predefinedSaveRecipe: 'Saqlash',
        predefinedView: 'Ko‘rish',
        difficultyEasy: 'Oson',
        difficultyMedium: 'O‘rtacha',
        difficultyHard: 'Qiyin',
        savedTitle: 'Sizning Kitobingiz',
        savedSubtitle: 'Barcha saqlangan retseplar bir joyda',
        savedNoRecipes: 'Hali saqlangan retseptlar yo‘q',
        savedStartExploring: 'Qidirishni boshlang va sevimlilaringizni saqlang!',
        savedRecipesCount: 'retsept saqlangan',
        savedClearAll: 'Tozalash',
        savedViewRecipe: 'Ko‘rish',
        savedDelete: 'O‘chirish',
        savedGenerated: 'AI Yaratgan',
        detailBack: 'Orqaga',
        detailNotFound: 'Retsept topilmadi',
        detailNotFoundSub: 'Bu retseptni topa olmadik. U o‘chirilgan bo‘lishi mumkin.',
        detailServings: 'Porsiya',
        detailIngredients: 'Mahsulotlar',
        detailInstructions: 'Ko‘rsatmalar',
        detailNutrition: 'Tarkibi',
        detailProtein: 'Oqsil',
        detailCarbs: 'Uglevod',
        detailFat: 'Yog‘',
        detailPerServing: 'bir porsiyaga',
        detailTips: 'Maslahat',
        detailPrint: 'Chop etish',
        detailShare: 'Ulashish',
        detailSave: 'Kitobga saqlash',
        detailSaved: 'Saqlandi',
        detailRemove: 'O‘chirish',
        detailCookMode: 'Pishirish rejimi',
        detailExitCookMode: 'Rejimdan chiqish',
        detailStep: 'Qadam',
        detailOf: '/',
        detailPrev: 'Oldingi',
        detailNext: 'Keyingi',
        detailFinish: 'Tugatish',
        detailAllDone: 'Yoqimli ishtaha!',
        detailAllDoneSub: 'Barcha qadamlarni bajardingiz. Yoqimli ishtaha!',
        detailCopyList: 'Ro‘yxatni nusxalash',
        detailMarkAll: 'Hammasini belgilash',
        detailClearChecks: 'Tozalash',
        toastSaved: 'Kitobingizga saqlandi',
        toastRemoved: 'Kitobingizdan o‘chirildi',
        toastClearedAll: 'Kitob tozalandi',
        toastAlreadySaved: 'Allaqachon kitobingizda',
        toastCopied: 'Nusxalandi',
        toastShareFailed: 'Ulashib bo‘lmadi',
        toastSavedCount: 'retsept kitobingizga saqlandi',
        loading: 'Yuklanmoqda...',
        error: 'Xato',
        success: 'Muvaffaqiyat',
    },
    ru: {
        navBrowseRecipes: 'Рецепты',
        navMyCookbook: 'Моя книга',
        navGenerateNew: 'Создать',
        navSaved: 'Книга',
        navHome: 'Главная',
        themeToLight: 'Светлая тема',
        themeToDark: 'Тёмная тема',
        langLabel: 'Язык',
        menuOpen: 'Открыть меню',
        menuClose: 'Закрыть меню',
        heroBadge: 'AI Генератор Рецептов',
        heroHeadlinePre: 'Ужин решён за',
        heroHeadlineAccent: '10 секунд',
        heroTitle: 'AI Генератор Рецептов',
        heroSubtitle: 'Введите ингредиенты, диету или пожелания. RecipeAI мгновенно создаст персональный рецепт ресторанного уровня.',
        heroDescription: 'Введите что у вас есть и получите рецепты',
        heroCtaPrimary: 'Получить рецепты',
        heroCtaSecondary: 'Библиотека',
        heroTrustLabel: 'Нам доверяют повара по всему миру',
        heroStatRating: 'рейтинг',
        heroStatUsers: 'пользователей',
        heroStatRecipes: 'рецептов',
        demoTitle: 'Посмотреть в Действии',
        demoSubtitle: 'Введите ингредиенты и получите рецепты',
        demoWhatToCook: 'Что вы хотите приготовить?',
        demoIngredients: 'Ваши ингредиенты (через запятую)',
        demoIngredientsPlaceholder: 'например, курица, лимон, чеснок, рис',
        demoCuisine: 'Выберите Кухню',
        demoDietary: 'Диетические предпочтения (необязательно)',
        demoOtherRestrictions: 'Другие ограничения (необязательно)',
        demoOtherRestrictionsPlaceholder: 'например, без орехов, острое, быстрые блюда',
        demoExamples: 'Примеры:',
        demoGenerate: 'Получить Рецепты',
        demoGenerating: 'Генерация...',
        demoThinking: 'AI готовит идеальные рецепты для вас...',
        demoThinkingSub: 'Анализ ингредиентов и предпочтений...',
        demoError: 'Упс! Что-то пошло не так',
        demoErrorSub: 'Не удалось создать рецепты',
        demoTryAgain: 'Попробовать Снова',
        demoNoResults: 'Рецепты не найдены',
        demoNoResultsSub: 'Попробуйте другие ингредиенты',
        demoAI: 'Создано AI',
        demoCurated: 'Подобранный Рецепт',
        demoFound: 'рецептов найдено',
        demoServings: 'порций',
        demoDifficulty: 'сложность',
        demoCalories: 'ккал',
        demoIngredientsTitle: 'Ингредиенты',
        demoInstructionsTitle: 'Инструкции',
        demoProTip: 'Совет',
        demoGenerateNew: 'Новые Рецепты',
        demoSaveAll: 'Сохранить Все',
        demoViewRecipe: 'Открыть рецепт',
        demoNeedIngredients: 'Введите хотя бы один ингредиент',
        featuresTitle: 'Как Это Работает',
        featuresSubtitle: 'Четыре простых шага от пустого холодильника до ужина ресторанного уровня',
        testimonialsTitle: 'Любимец Домашних Поваров',
        testimonialsSubtitle: 'Что реальные пользователи говорят о RecipeAI',
        pricingTitle: 'Простые и Прозрачные Цены',
        pricingSubtitle: 'Выберите план под ваш стиль готовки',
        pricingMonthly: 'Месяц',
        pricingAnnual: 'Год',
        pricingSave: 'Экономия',
        pricingMostPopular: 'Популярный',
        pricingGetStarted: 'Начать',
        pricingStartTrial: 'Пробный период',
        pricingPerMonth: '/мес',
        pricingPerYear: '/год',
        pricingPerMonthBilled: '/мес при годовой оплате',
        waitlistTitle: 'Готовы Преобразить Вашу Готовку?',
        waitlistSubtitle: 'Присоединяйтесь к тысячам поваров, экономящих время и питающихся лучше.',
        waitlistPlaceholder: 'ваш@email.com',
        waitlistButton: 'Ранний Доступ',
        waitlistButtonLoading: 'Отправка...',
        waitlistSpam: 'Мы никогда не спамим. Отписка в любой момент.',
        waitlistSuccessTitle: 'Вы в списке!',
        waitlistSuccessBody: 'Проверьте почту — там приветственное предложение. Мы сообщим о запуске RecipeAI.',
        waitlistAddAnother: 'Добавить ещё Email',
        waitlistEmailInvalid: 'Введите корректный email',
        waitlistEmailRequired: 'Email обязателен',
        footerTagline: 'AI генерация рецептов для домашних поваров.',
        footerProduct: 'Продукт',
        footerCompany: 'Компания',
        footerLegal: 'Правовое',
        footerFeatures: 'Возможности',
        footerPricing: 'Цены',
        footerFaq: 'Вопросы',
        footerAbout: 'О нас',
        footerBlog: 'Блог',
        footerCareers: 'Карьера',
        footerPrivacy: 'Конфиденциальность',
        footerTerms: 'Условия',
        footerContact: 'Контакты',
        footerCopyright: 'Все права защищены.',
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
        dietaryGlutenFree: 'Без глютена',
        dietaryVegan: 'Веган',
        dietaryVegetarian: 'Вегетарианская',
        dietaryKeto: 'Кето',
        dietaryDairyFree: 'Без молочного',
        dietaryPaleo: 'Палео',
        predefinedTitle: 'Библиотека Рецептов',
        predefinedSubtitle: 'Просмотрите нашу коллекцию подобранных рецептов',
        predefinedSearch: 'Поиск рецептов или ингредиентов...',
        predefinedCuisine: 'Кухня',
        predefinedDietary: 'Диета',
        predefinedDifficulty: 'Сложность',
        predefinedMaxTime: 'Макс. время',
        predefinedAnyTime: 'Любое',
        predefinedUnder30: 'До 30 мин',
        predefinedUnder60: 'До 1 часа',
        predefinedAllDifficulties: 'Все уровни',
        predefinedClearFilters: 'Сбросить фильтры',
        predefinedResults: 'рецептов',
        predefinedNoResults: 'Рецепты не найдены',
        predefinedNoResultsSub: 'Попробуйте изменить фильтры',
        predefinedSaveRecipe: 'Сохранить',
        predefinedView: 'Открыть',
        difficultyEasy: 'Легко',
        difficultyMedium: 'Средне',
        difficultyHard: 'Сложно',
        savedTitle: 'Ваша Книга Рецептов',
        savedSubtitle: 'Все сохранённые рецепты в одном месте',
        savedNoRecipes: 'Пока нет сохранённых рецептов',
        savedStartExploring: 'Начните исследовать и сохраняйте любимое!',
        savedRecipesCount: 'рецептов сохранено',
        savedClearAll: 'Очистить',
        savedViewRecipe: 'Открыть',
        savedDelete: 'Удалить',
        savedGenerated: 'Создано AI',
        detailBack: 'Назад',
        detailNotFound: 'Рецепт не найден',
        detailNotFoundSub: 'Не удалось найти этот рецепт. Возможно, он был удалён.',
        detailServings: 'Порций',
        detailIngredients: 'Ингредиенты',
        detailInstructions: 'Инструкции',
        detailNutrition: 'Пищевая ценность',
        detailProtein: 'Белки',
        detailCarbs: 'Углеводы',
        detailFat: 'Жиры',
        detailPerServing: 'на порцию',
        detailTips: 'Совет',
        detailPrint: 'Печать',
        detailShare: 'Поделиться',
        detailSave: 'В книгу рецептов',
        detailSaved: 'Сохранено',
        detailRemove: 'Удалить',
        detailCookMode: 'Режим готовки',
        detailExitCookMode: 'Выйти из режима',
        detailStep: 'Шаг',
        detailOf: 'из',
        detailPrev: 'Назад',
        detailNext: 'Далее',
        detailFinish: 'Готово',
        detailAllDone: 'Приятного аппетита!',
        detailAllDoneSub: 'Вы выполнили все шаги. Приятного аппетита!',
        detailCopyList: 'Скопировать список',
        detailMarkAll: 'Отметить всё',
        detailClearChecks: 'Сбросить',
        toastSaved: 'Сохранено в книгу рецептов',
        toastRemoved: 'Удалено из книги рецептов',
        toastClearedAll: 'Книга очищена',
        toastAlreadySaved: 'Уже в вашей книге',
        toastCopied: 'Скопировано в буфер',
        toastShareFailed: 'Не удалось поделиться',
        toastSavedCount: 'рецептов сохранено в книгу',
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
    },
};

// Helper function with proper type handling
export function t(lang: Language, key: keyof Translations): string {
    return translations[lang][key] || translations.en[key];
}

// Helper to get cuisine translation. Cuisine IDs are already capitalized
// (e.g. "Italian", "any"), so capitalizing the first char yields keys like
// "cuisineItalian" / "cuisineAny".
export function getCuisineName(lang: Language, cuisineId: string): string {
    const key = `cuisine${cuisineId.charAt(0).toUpperCase()}${cuisineId.slice(1)}` as keyof Translations;
    return translations[lang][key] || cuisineId;
}

// Helper to get dietary translation.
// Converts a kebab-case id ("low-carb") into the PascalCase suffix used by the
// translation keys ("dietaryLowCarb"). The previous implementation only
// stripped the first hyphen and lower-cased the rest, so hyphenated diets
// (low-carb, high-protein, gluten-free, dairy-free) never matched a key.
export function getDietaryName(lang: Language, dietaryId: string): string {
    const pascal = dietaryId
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    const key = `dietary${pascal}` as keyof Translations;
    return translations[lang][key] || dietaryId;
}

// Map a difficulty value ("Easy" | "Medium" | "Hard") to a localized label.
export function getDifficultyName(lang: Language, difficulty: string): string {
    const key = `difficulty${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1).toLowerCase()}` as keyof Translations;
    return translations[lang][key] || difficulty;
}

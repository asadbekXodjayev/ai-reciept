// Localized marketing content for the landing page (features, testimonials,
// pricing). Kept separate from translations.ts (UI strings) so the section
// components can pull fully-localized, structured data via a single getter.

import type { Language } from '@/lib/translations';

export interface Feature {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    quote: string;
}

export interface PricingTier {
    id: string;
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    description: string;
    features: string[];
    highlighted: boolean;
}

const FEATURES: Record<Language, Feature[]> = {
    en: [
        { id: 'ingredients', icon: '🥘', title: 'Type Your Ingredients', description: 'Simply list what you have in your kitchen. RecipeAI recognizes everything.' },
        { id: 'filters', icon: '🌱', title: 'Set Your Filters', description: 'Dietary preferences, allergies, cuisine type. Customize to your needs.' },
        { id: 'instant', icon: '⚡', title: 'Get Instant Recipes', description: 'AI generates personalized recipes in seconds with timing and plating tips.' },
        { id: 'save', icon: '💾', title: 'Save & Cook', description: 'Build your cookbook, follow step-by-step cook mode, and export a shopping list.' },
    ],
    uz: [
        { id: 'ingredients', icon: '🥘', title: 'Mahsulotlarni Yozing', description: 'Oshxonangizda nima borligini yozing. RecipeAI hammasini taniydi.' },
        { id: 'filters', icon: '🌱', title: 'Filtrlarni Tanlang', description: 'Parhez, allergiya, oshxona turi — o‘zingizga moslang.' },
        { id: 'instant', icon: '⚡', title: 'Tezkor Retseptlar', description: 'AI bir necha soniyada vaqt va maslahatlar bilan retsept yaratadi.' },
        { id: 'save', icon: '💾', title: 'Saqlang va Pishiring', description: 'Kitob yarating, bosqichma-bosqich pishiring va xarid ro‘yxatini oling.' },
    ],
    ru: [
        { id: 'ingredients', icon: '🥘', title: 'Введите Ингредиенты', description: 'Просто перечислите, что есть на кухне. RecipeAI распознаёт всё.' },
        { id: 'filters', icon: '🌱', title: 'Настройте Фильтры', description: 'Диета, аллергии, тип кухни. Подстройте под себя.' },
        { id: 'instant', icon: '⚡', title: 'Мгновенные Рецепты', description: 'AI создаёт рецепты за секунды с таймингом и советами.' },
        { id: 'save', icon: '💾', title: 'Сохраняйте и Готовьте', description: 'Соберите книгу, готовьте по шагам и выгрузите список покупок.' },
    ],
};

const TESTIMONIALS: Record<Language, Testimonial[]> = {
    en: [
        { id: 'maya', name: 'Maya K.', role: 'Busy Mom', avatar: 'MK', quote: 'I used to waste 30 minutes every night deciding what to cook. Now dinner is sorted in 10 seconds. Total game changer.' },
        { id: 'james', name: 'James R.', role: 'Fitness Student', avatar: 'JR', quote: 'Finally a way to eat interesting meals while hitting my macros. No more chicken and rice for the 100th time.' },
        { id: 'sofia', name: 'Sofia L.', role: 'Home Cook', avatar: 'SL', quote: 'It gives me creative starting points without telling me how to cook. Like a sous chef who respects my skills.' },
    ],
    uz: [
        { id: 'maya', name: 'Maya K.', role: 'Band Ona', avatar: 'MK', quote: 'Avval har kuni nima pishirishni o‘ylab 30 daqiqa sarflardim. Endi kechki ovqat 10 soniyada hal bo‘ladi.' },
        { id: 'james', name: 'James R.', role: 'Fitnes Talabasi', avatar: 'JR', quote: 'Nihoyat makrolarimga mos qiziqarli taomlar. Endi yuzinchi marta tovuq va guruch emas.' },
        { id: 'sofia', name: 'Sofia L.', role: 'Uy Oshpazi', avatar: 'SL', quote: 'U menga ijodiy g‘oyalar beradi, lekin qanday pishirishni buyurmaydi. Mahoratimni hurmat qiladigan yordamchidek.' },
    ],
    ru: [
        { id: 'maya', name: 'Майя К.', role: 'Занятая мама', avatar: 'МК', quote: 'Раньше я тратила 30 минут на решение, что готовить. Теперь ужин решён за 10 секунд. Полностью изменило всё.' },
        { id: 'james', name: 'Джеймс Р.', role: 'Студент-фитнес', avatar: 'ДР', quote: 'Наконец-то интересные блюда в рамках моих макросов. Хватит курицы с рисом в сотый раз.' },
        { id: 'sofia', name: 'София Л.', role: 'Домашний повар', avatar: 'СЛ', quote: 'Даёт креативные идеи, не диктуя, как готовить. Как су-шеф, уважающий мои навыки.' },
    ],
};

const PRICING: Record<Language, PricingTier[]> = {
    en: [
        { id: 'taste', name: 'Taste', monthlyPrice: 0, annualPrice: 0, description: 'Perfect for exploring', features: ['3 recipes/month', 'Basic ingredients', 'Community recipes', 'Save to cookbook'], highlighted: false },
        { id: 'master', name: 'Kitchen Master', monthlyPrice: 9, annualPrice: 90, description: 'Most popular', features: ['Unlimited recipes', 'Advanced dietary filters', 'Keto, vegan, paleo & more', 'Step-by-step cook mode', 'Shopping lists'], highlighted: true },
        { id: 'family', name: 'Family Feast', monthlyPrice: 19, annualPrice: 190, description: 'For the whole family', features: ['All Master features', 'Up to 6 members', 'Shared family cookbook', 'Weekly meal planning', 'Priority support'], highlighted: false },
    ],
    uz: [
        { id: 'taste', name: 'Taste', monthlyPrice: 0, annualPrice: 0, description: 'O‘rganish uchun', features: ['Oyiga 3 retsept', 'Asosiy mahsulotlar', 'Hamjamiyat retseptlari', 'Kitobga saqlash'], highlighted: false },
        { id: 'master', name: 'Kitchen Master', monthlyPrice: 9, annualPrice: 90, description: 'Eng mashhur', features: ['Cheksiz retseptlar', 'Kengaytirilgan filtrlar', 'Keto, vegan, paleo va boshqalar', 'Bosqichma-bosqich rejim', 'Xarid ro‘yxatlari'], highlighted: true },
        { id: 'family', name: 'Family Feast', monthlyPrice: 19, annualPrice: 190, description: 'Butun oila uchun', features: ['Barcha Master imkoniyatlari', '6 a‘zogacha', 'Umumiy oilaviy kitob', 'Haftalik menyu rejasi', 'Ustuvor yordam'], highlighted: false },
    ],
    ru: [
        { id: 'taste', name: 'Taste', monthlyPrice: 0, annualPrice: 0, description: 'Для знакомства', features: ['3 рецепта/месяц', 'Базовые ингредиенты', 'Рецепты сообщества', 'Сохранение в книгу'], highlighted: false },
        { id: 'master', name: 'Kitchen Master', monthlyPrice: 9, annualPrice: 90, description: 'Популярный', features: ['Безлимит рецептов', 'Расширенные фильтры', 'Кето, веган, палео и др.', 'Пошаговый режим готовки', 'Списки покупок'], highlighted: true },
        { id: 'family', name: 'Family Feast', monthlyPrice: 19, annualPrice: 190, description: 'Для всей семьи', features: ['Все функции Master', 'До 6 участников', 'Общая семейная книга', 'Планирование на неделю', 'Приоритетная поддержка'], highlighted: false },
    ],
};

export const getFeatures = (lang: Language): Feature[] => FEATURES[lang] ?? FEATURES.en;
export const getTestimonials = (lang: Language): Testimonial[] => TESTIMONIALS[lang] ?? TESTIMONIALS.en;
export const getPricingTiers = (lang: Language): PricingTier[] => PRICING[lang] ?? PRICING.en;

// Annual plans are billed at 10× the monthly price → 2 months free (~17%).
export const ANNUAL_SAVING_PERCENT = 17;

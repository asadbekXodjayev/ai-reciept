import { NextResponse } from 'next/server';
import { PREDEFINED_RECIPES, CUISINE_TYPES, DIETARY_PRESETS } from '@/lib/predefined-recipes';

export async function POST(request: Request) {
  try {
    const { ingredients, dietaryRestrictions, cuisine, usePredefined } = await request.json();

    if (!ingredients || ingredients.trim() === '') {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      );
    }

    // Parse user ingredients
    const userIngredients = ingredients
      .toLowerCase()
      .split(',')
      .map((i: string) => i.trim())
      .filter((i: string) => i.length > 0);

    // Detect language from user input
    function detectLanguage(text: string): 'ru' | 'uz' | 'en' {
      const ruChars = /[а-яА-ЯёЁ]/;
      
      // Common Uzbek words/patterns
      const uzPatterns = /\b(tayyorlash|retsept|mahsulot|ovqat|pishirish|qanday|qancha|qaysi|va|bilan|uchun|bu|men|siz|ko'p|oz|ingrediyent|qoshiq|dona|gramm|stakan)\b/i;
      
      if (ruChars.test(text)) return 'ru';
      if (uzPatterns.test(text)) return 'uz';
      return 'en';
    }

    const detectedLanguage = detectLanguage(ingredients);

    // Function to calculate ingredient match score
    function calculateIngredientScore(recipeIngredients: string[], userIngredients: string[]): { matchCount: number; extraIngredientCount: number; missingIngredientCount: number; score: number } {
      const recipeIngredientNames = recipeIngredients.map(ing => {
        // Extract just the ingredient name (remove quantities and extras in parentheses)
        return ing.toLowerCase()
          .replace(/^\d+[.\d]*\s*(g|kg|ml|l|cup|cups|tbsp|tsp|oz|lb|pounds?|ounces?|cans?|bunch|head|slice|slices?|piece|pieces?)\s*/i, '')
          .replace(/[(),]/g, '')
          .replace(/\s*\(.*?\)\s*/g, '') // Remove text in parentheses
          .replace(/\s+/g, ' ')
          .trim();
      });

      let matchCount = 0;
      let missingIngredientCount = 0;
      let extraIngredientCount = 0;

      // Check how many user ingredients are in the recipe
      userIngredients.forEach(userIng => {
        const matched = recipeIngredientNames.some(recipeIng => 
          recipeIng.includes(userIng) || userIng.includes(recipeIng) || recipeIng === userIng
        );
        if (matched) {
          matchCount++;
        } else {
          missingIngredientCount++;
        }
      });

      // Check how many recipe ingredients are NOT in user's list (extras)
      recipeIngredientNames.forEach(recipeIng => {
        const isUserIngredient = userIngredients.some(userIng => 
          recipeIng.includes(userIng) || userIng.includes(recipeIng) || recipeIng === userIng
        );
        if (!isUserIngredient && recipeIng.length > 2) {
          // Ignore very short words that might be seasonings
          extraIngredientCount++;
        }
      });

      // Score: Higher is better
      // - Bonus for matching all user ingredients
      // - Heavy penalty for missing user ingredients
      // - Moderate penalty for extra ingredients in recipe
      const score = (matchCount * 100) - (missingIngredientCount * 50) - (extraIngredientCount * 5);
      
      return { matchCount, extraIngredientCount, missingIngredientCount, score };
    }

    // If user wants predefined recipes based on dietary restrictions
    if (usePredefined && dietaryRestrictions) {
      const filteredRecipes = PREDEFINED_RECIPES.filter(recipe => {
        const dietaryTags: string[] = dietaryRestrictions.toLowerCase().split(',').map((t: string) => t.trim());
        return dietaryTags.some((tag: string) => 
          recipe.dietaryTags.some((dietaryTag: string) => 
            dietaryTag.toLowerCase().includes(tag) || tag.includes(dietaryTag)
          )
        );
      });

      if (filteredRecipes.length === 0 && cuisine && cuisine !== 'any') {
        return NextResponse.json({
          recipes: PREDEFINED_RECIPES.filter(r => 
            r.cuisine.toLowerCase() === cuisine.toLowerCase()
          ).slice(0, 5),
          isPredefined: true,
          message: 'Showing recipes from ' + cuisine + ' cuisine',
        });
      }

      return NextResponse.json({
        recipes: filteredRecipes.slice(0, 5),
        isPredefined: true,
        message: 'Found ' + filteredRecipes.length + ' matching recipes',
      });
    }

    // Get Groq API keys (primary and backup)
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_API_KEY_BACKUP = process.env.GROQ_API_KEY_BACKUP;
    const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

    const apiKeys = [GROQ_API_KEY, GROQ_API_KEY_BACKUP].filter(Boolean);

    if (apiKeys.length === 0) {
      // Fallback to predefined recipes with ingredient matching
      console.warn('No Groq API key provided. Returning predefined recipes based on ingredients.');
      
      let recipes = PREDEFINED_RECIPES;
      
      if (cuisine && cuisine !== 'any') {
        recipes = recipes.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
      }
      
      if (dietaryRestrictions) {
        const dietaryTags: string[] = dietaryRestrictions.toLowerCase().split(',');
        recipes = recipes.filter(r => 
          dietaryTags.some((tag: string) => 
            r.dietaryTags.some((dt: string) => dt.toLowerCase().includes(tag.trim()))
          )
        );
      }

      // Score and sort recipes by ingredient match
      const scoredRecipes = recipes.map(recipe => {
        const scoreData = calculateIngredientScore(recipe.ingredients, userIngredients);
        return { ...recipe, ...scoreData };
      });

      // Sort by score (highest first) - recipes with more matches and fewer extras come first
      scoredRecipes.sort((a, b) => b.score - a.score);

      return NextResponse.json({
        recipes: scoredRecipes.slice(0, 5),
        isPredefined: true,
        message: `Showing ${scoredRecipes.length > 0 ? 'best matching' : 'curated'} recipes`,
      });
    }

    // Language-specific prompts
    const languagePrompts = {
      en: {
        system: 'You are a helpful cooking assistant that creates detailed recipes using ONLY the ingredients provided by the user. Always respond with valid JSON only. Do not add extra ingredients beyond what the user listed. Respond in ENGLISH.',
        prompt: `You are a helpful cooking assistant. Based EXACTLY on these ingredients: "${ingredients}"${dietaryRestrictions ? ` and dietary restrictions: "${dietaryRestrictions}"` : ''}${cuisine && cuisine !== 'any' ? ` and cuisine preference: "${cuisine}"` : ''}, create 3 complete different recipes.

IMPORTANT RULES:
1. Use ONLY the ingredients I provided - do NOT add extra ingredients
2. If a recipe needs a small amount of basic pantry items (salt, pepper, oil), mention them minimally
3. Prioritize recipes that can be made with just the listed ingredients
4. Each recipe should be different from the others
5. USE PROPER MEASUREMENTS - Do NOT use the same measurement unit for everything:
   - Grains (rice, pasta, oats): use cups, grams, or ounces
   - Meat (chicken, beef, pork): use grams, ounces, pounds, or pieces (NOT cups)
   - Cheese: use grams, ounces, or cups (shredded/diced only)
   - Vegetables: use pieces, grams, cups (if chopped), or ounces
   - Liquids: use ml, liters, cups, or tablespoons
   - Spices: use teaspoons, tablespoons, or pinches
   - Eggs: use count (number of eggs)

For EACH recipe, provide detailed cooking instructions with specific times for each step.

RESPOND IN ENGLISH.

Please respond in this exact JSON format only (no markdown, no extra text):
{
  "recipes": [
    {
      "title": "Recipe 1 Title",
      "totalTime": "XX mins",
      "servings": number,
      "difficulty": "Easy/Medium/Hard",
      "ingredients": ["ingredient 1 with amounts", "ingredient 2 with amounts"],
      "instructions": ["Step 1 with time (e.g., Cook for 5 mins)", "Step 2 with time"],
      "tips": "Cooking tips for this recipe",
      "calories": number,
      "cuisine": "Cuisine type"
    },
    {
      "title": "Recipe 2 Title",
      ...
    },
    {
      "title": "Recipe 3 Title",
      ...
    }
  ]
}`
      },
      ru: {
        system: 'Вы - полезный кулинарный помощник, который создает подробные рецепты, используя ТОЛЬКО предоставленные пользователем ингредиенты. Всегда отвечайте валидным JSON. Не добавляйте дополнительные ингредиенты сверх указанных пользователем. Отвечайте на РУССКОМ языке.',
        prompt: `Вы - полезный кулинарный помощник. Основываясь ТОЛЬКО на этих ингредиентах: "${ingredients}"${dietaryRestrictions ? ` и диетических ограничениях: "${dietaryRestrictions}"` : ''}${cuisine && cuisine !== 'any' ? ` и предпочтении по кухне: "${cuisine}"` : ''}, создайте 3 разных рецепта.

ВАЖНЫЕ ПРАВИЛА:
1. Используйте ТОЛЬКО предоставленные ингредиенты - НЕ добавляйте дополнительные
2. Если рецепт требует немного базовых продуктов (соль, перец, масло), упомяните их минимально
3. Приоритет рецептам, которые можно приготовить только из указанных ингредиентов
4. Каждый рецепт должен быть разным
5. ИСПОЛЬЗУЙТЕ ПРАВИЛЬНЫЕ МЕРЫ:
   - Зерновые (рис, макароны, овес): используйте стаканы, граммы или унции
   - Мясо (курица, говядина, свинина): используйте граммы, унции, фунты или штуки (НЕ стаканы)
   - Сыр: используйте граммы, унции или стаканы (тертый/нарезанный)
   - Овощи: используйте штуки, граммы, стаканы (если нарезаны) или унции
   - Жидкости: используйте мл, литры, стаканы или столовые ложки
   - Специи: используйте чайные ложки, столовые ложки или щепотки
   - Яйца: используйте количество (штуки)

Для КАЖДОГО рецепта предоставьте подробные инструкции с указанием времени для каждого шага.

ОТВЕЧАЙТЕ НА РУССКОМ ЯЗЫКЕ.

Ответьте ТОЛЬКО в этом JSON формате (без markdown и лишнего текста):
{
  "recipes": [
    {
      "title": "Название рецепта 1",
      "totalTime": "XX минут",
      "servings": число,
      "difficulty": "Легко/Средне/Сложно",
      "ingredients": ["ингредиент 1 с количеством", "ингредиент 2 с количеством"],
      "instructions": ["Шаг 1 со временем (например, Готовьте 5 минут)", "Шаг 2 со временем"],
      "tips": "Советы по приготовлению этого рецепта",
      "calories": число,
      "cuisine": "Тип кухни"
    },
    {
      "title": "Название рецепта 2",
      ...
    },
    {
      "title": "Название рецепта 3",
      ...
    }
  ]
}`
      },
      uz: {
        system: 'Siz foydalanuvchi tomonidan taqdim etilgan mahsulotlardan FAQAT shu mahsulotlardan foydalanib, batafsil retseplar yaratadigan foydali oshxona yordamchisiz. Har doim faqat JSON formatida javob bering. Foydalanuvchi ko\'rsatganidan tashqari qo\'shimcha mahsulotlar qo\'shmang. O\'ZBEK TILIDA javob bering.',
        prompt: `Siz foydali oshxona yordamchisiz. Faqat shu mahsulotlarga asoslanib: "${ingredients}"${dietaryRestrictions ? ` va parhez cheklovlar: "${dietaryRestrictions}"` : ''}${cuisine && cuisine !== 'any' ? ` va oshxona tanlovi: "${cuisine}"` : ''}, 3 ta turli retsept yarating.

MUHIM QOIDALAR:
1. Faqat taqdim etilgan mahsulotlardan foydalaning - QO\'SHIMCHA mahsulotlar qo\'shmang
2. Agar retsept oz miqdorda asosiy mahsulotlarni talab qilsa (tuz, murch, moy), ularni qisqacha ayting
3. Faqat ko\'rsatilgan mahsulotlardan tayyorlanadigan retseptlarga ustuvorlik bering
4. Har bir retsept boshqacha bo\'lishi kerak
5. TO\'G\'RI O\'LCHAMLARNI ISHLATING:
   - Don mahsulotlari (guruch, makaron, suli): stakan, gramm yoki unsiya
   - Go\'sht (tovuq, mol go\'shi, cho\'chqa go\'shi): gramm, unsiya, funt yoki dona (STAKAN EMAS)
   - Pishloq: gramm, unsiya yoki stakan (maydalangan/tilimlangan)
   - Sabzavotlar: dona, gramm, stakan (agar maydalangan bo\'lsa) yoki unsiya
   - Suyuqliklar: ml, litr, stakan yoki osh qoshiq
   - Mavsumlar: chayqalish qoshiq, osh qoshiq yoki chimchilash
   - Tuxum: son (tuxum soni)

HAR BIR retsept uchun har bir qadam uchun aniq vaqt bilan batafsil pishirish ko\'rsatmalarini bering.

O\'ZBEK TILIDA JAVOB BERING.

Faqat bu JSON formatida javob bering (markdown va qo\'shimcha matnsiz):
{
  "recipes": [
    {
      "title": "Retsept 1 nomi",
      "totalTime": "XX daqiqa",
      "servings": son,
      "difficulty": "Oson/O\'rtacha/Qiyin",
      "ingredients": ["mahsulot 1 miqdori bilan", "mahsulot 2 miqdori bilan"],
      "instructions": ["Qadam 1 vaqt bilan (masalan, 5 daqiqa pishiring)", "Qadam 2 vaqt bilan"],
      "tips": "Bu retsept uchun pishirish maslahatlari",
      "calories": son,
      "cuisine": "Oshxona turi"
    },
    {
      "title": "Retsept 2 nomi",
      ...
    },
    {
      "title": "Retsept 3 nomi",
      ...
    }
  ]
}`
      }
    };

    const currentPrompt = languagePrompts[detectedLanguage];

    let lastError: Error | null = null;

    for (const apiKey of apiKeys) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              {
                role: 'system',
                content: currentPrompt.system,
              },
              {
                role: 'user',
                content: currentPrompt.prompt,
              },
            ],
            temperature: 0.5,
            max_tokens: 2048,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiContent = data.choices[0]?.message?.content;

          if (!aiContent) {
            throw new Error('No content in AI response');
          }

          // Parse the JSON response
          let result;
          try {
            const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              result = JSON.parse(jsonMatch[0]);
            } else {
              result = JSON.parse(aiContent);
            }
          } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            throw new Error('Failed to parse AI response');
          }

          return NextResponse.json({
            recipes: result.recipes || [],
            isPredefined: false,
            message: 'AI-generated recipes using your ingredients',
          });
        } else {
          const errorData = await response.json();
          lastError = new Error(`Groq API error: ${response.status}`);
          console.error('Groq API error:', errorData);
          
          // If it's a rate limit error, try the next API key
          if (response.status === 429 && apiKeys.indexOf(apiKey) < apiKeys.length - 1) {
            console.log('Rate limit reached, trying backup API key...');
            continue;
          }
        }
      } catch (error) {
        console.error('API request failed:', error);
        lastError = error as Error;
      }
    }

    // All API keys failed, return predefined recipes with ingredient matching
    console.warn('All API keys failed. Returning predefined recipes based on ingredients.');
    
    let recipes = PREDEFINED_RECIPES;
    
    if (cuisine && cuisine !== 'any') {
      recipes = recipes.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
    }
    
    if (dietaryRestrictions) {
      const dietaryTags: string[] = dietaryRestrictions.toLowerCase().split(',');
      recipes = recipes.filter(r => 
        dietaryTags.some((tag: string) => 
          r.dietaryTags.some((dt: string) => dt.toLowerCase().includes(tag.trim()))
        )
      );
    }

    // Score and sort recipes by ingredient match
    const scoredRecipes = recipes.map(recipe => {
      const scoreData = calculateIngredientScore(recipe.ingredients, userIngredients);
      return { ...recipe, ...scoreData };
    });

    // Sort by score (highest first)
    scoredRecipes.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      recipes: scoredRecipes.slice(0, 5),
      isPredefined: true,
      message: 'Using curated recipes (API unavailable)',
    });

  } catch (error) {
    console.error('Recipe generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate recipes',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to return available cuisines and dietary options
export async function GET() {
  return NextResponse.json({
    cuisines: CUISINE_TYPES,
    dietaryPresets: DIETARY_PRESETS,
  });
}
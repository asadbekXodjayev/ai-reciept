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

    // If user wants predefined recipes based on dietary restrictions
    if (usePredefined && dietaryRestrictions) {
      const filteredRecipes = PREDEFINED_RECIPES.filter(recipe => {
        // Check if recipe matches any of the selected dietary restrictions
        const dietaryTags: string[] = dietaryRestrictions.toLowerCase().split(',').map((t: string) => t.trim());
        return dietaryTags.some((tag: string) => 
          recipe.dietaryTags.some((dietaryTag: string) => 
            dietaryTag.toLowerCase().includes(tag) || tag.includes(dietaryTag)
          )
        );
      });

      // If no exact match, return recipes from selected cuisine
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
      // Fallback to predefined recipes if no API key
      console.warn('No Groq API key provided. Returning predefined recipes.');
      
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

      return NextResponse.json({
        recipes: recipes.slice(0, 5),
        isPredefined: true,
        message: 'Showing curated recipes (no API key configured)',
      });
    }

    // Create prompt for the AI
    const prompt = `You are a helpful cooking assistant. Based on these ingredients: "${ingredients}"${dietaryRestrictions ? ` and dietary restrictions: "${dietaryRestrictions}"` : ''}${cuisine && cuisine !== 'any' ? ` and cuisine preference: "${cuisine}"` : ''}, create 3 complete different recipes.

For EACH recipe, provide detailed cooking instructions with specific times for each step.

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
}`;

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
                content: 'You are a helpful cooking assistant that creates detailed recipes with cooking times. Always respond with valid JSON only.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
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
            message: 'AI-generated recipes',
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

    // All API keys failed, return predefined recipes
    console.warn('All API keys failed. Returning predefined recipes.');
    
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

    return NextResponse.json({
      recipes: recipes.slice(0, 5),
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
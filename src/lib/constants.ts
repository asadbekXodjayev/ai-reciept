// Navigation Links
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
] as const;

// Hero Copy
export const HERO = {
  headline: "Dinner Decided in 10 Seconds",
  subheadline:
    "Type your ingredients, dietary needs, or cravings. RecipeAI generates a personalized restaurant-quality recipe instantly.",
  cta: "Join Waitlist",
  demoIngredients: ["chicken", "lemon", "capers", "pasta"],
} as const;

// Pricing Tiers
export const PRICING_TIERS = [
  {
    name: "Taste",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Perfect for exploring",
    features: [
      "3 recipes/month",
      "Basic ingredients",
      "No dietary filtering",
      "Community recipes only",
    ],
    highlighted: false,
  },
  {
    name: "Kitchen Master",
    monthlyPrice: 9,
    annualPrice: 99,
    description: "Most popular",
    features: [
      "Unlimited recipes",
      "Advanced dietary filters",
      "Keto, vegan, paleo & more",
      "Recipe history & favorites",
      "Export as PDF",
    ],
    highlighted: true,
  },
  {
    name: "Family Feast",
    monthlyPrice: 19,
    annualPrice: 209,
    description: "For the whole family",
    features: [
      "All Pro features",
      "Up to 6 family members",
      "Shared family cookbook",
      "Weekly meal planning",
      "Shopping list generator",
    ],
    highlighted: false,
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Maya K.",
    role: "Busy Mom",
    avatar: "MK",
    quote:
      "I used to waste 30 minutes every night deciding what to cook. Now I open RecipeAI and dinner is sorted in 10 seconds. Total game changer.",
  },
  {
    name: "James R.",
    role: "Fitness Student",
    avatar: "JR",
    quote:
      "Finally found a way to eat interesting meals while staying within my macro targets. No more chicken and rice for the 100th time this month.",
  },
  {
    name: "Sofia L.",
    role: "Home Cook",
    avatar: "SL",
    quote:
      "I love that it gives me creative starting points without telling me how to cook. It's like having a sous chef who respects my skills.",
  },
] as const;

// Features
export const FEATURES = [
  {
    icon: "🥘",
    title: "Type Your Ingredients",
    description:
      "Simply list what you have in your kitchen. RecipeAI recognizes everything.",
  },
  {
    icon: "🌱",
    title: "Set Your Filters",
    description:
      "Dietary preferences, allergies, cuisine type. Customize to your needs.",
  },
  {
    icon: "⚡",
    title: "Get Instant Recipes",
    description:
      "AI generates personalized recipes in seconds with timing and plating tips.",
  },
  {
    icon: "💾",
    title: "Save & Share",
    description:
      "Build your cookbook, share recipes with family, or export for planning.",
  },
] as const;

// CTA Copy
export const CTA = {
  headline: "Ready to Transform Your Cooking?",
  subheadline: "Join thousands of home cooks saving time and eating better.",
  button: "Get Early Access",
  placeholder: "your@email.com",
} as const;

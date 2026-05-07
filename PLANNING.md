# PLANNING.md — RecipeAI Landing Page

## Project Description
**RecipeAI** is a premium marketing landing page for an AI recipe generator SaaS.  
Users type what ingredients they have, dietary restrictions, or cravings → the AI instantly generates a personalized recipe.

**This project (Project 1 of 6)**: Pure frontend showcase. No real backend. The live demo is animated and simulated (hardcoded transitions + beautiful Framer Motion). The goal is conversion: hook visitors in <10 seconds and capture waitlist emails.

**Brand name**: RecipeAI  
**Target vibe**: Warm Mediterranean kitchen — calm, appetizing, premium, trustworthy.  
**Core user pain points**:
1. "I open the fridge every evening and just stare at random ingredients with zero idea what to cook."
2. "I'm stuck eating the same boring meals every week that don't match my macros, budget, or dietary needs."
3. "I love cooking but get stuck in the same routine and need fresh, creative inspiration fast."

## Design System

**Color Palette (Warm & Calm)**
- Olive (primary/brand): `#4F6815`
- Butter (highlight/accent): `#FFEDAB`
- Cherry (CTA/energy): `#75070C`
- Ivory Whisper (background): `#FFFBF0`

**Typography**
- Headlines: Bold, 1.2–1.5 line-height, max-width 50ch
- Body: Regular weight, 1.6 line-height, 16–18px base
- Font: System fonts preferred (no custom font dependencies yet)

## The 8 Page Sections

1. **Navbar** — Sticky, blur backdrop on scroll, logo + nav links + CTA button
2. **Hero** — Headline, subhead, animated ingredient input demo, primary CTA
3. **Live Demo Simulation** — Framer Motion centerpiece: fake typewriter input, spinner, recipe card reveal
4. **Feature Cards** — 4 cards (ingredient input → filters → instant recipe → save & share), scroll-triggered stagger
5. **Social Proof** — 3 testimonial cards with avatars, horizontal scroll or grid layout
6. **Pricing Section** — 3-tier table (Free/Kitchen Master/Family), monthly/annual toggle with animated price swap
7. **Waitlist CTA** — Full-width section, email input + validation (RHF + Zod), success state with animation
8. **Footer** — Links, social icons, legal, simple

## Tech Stack

- **Next.js 15** (App Router, Server Components default)
- **TypeScript** (strict mode)
- **Tailwind v4** (utility-first)
- **Framer Motion v11** (scroll triggers, AnimatePresence)
- **shadcn/ui** (Button, Card, Input, Badge)
- **React Hook Form** (form state)
- **Zod** (validation)
- **No backend** — Form submission to mock handler or Formspree

## Project Structure

```
src/
├── app/
│   ├── page.tsx           ← Single page component
│   ├── layout.tsx
│   └── globals.css        ← Design tokens + custom CSS
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Demo.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── Waitlist.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   └── shared/
│       ├── AnimatedSection.tsx (wrapper with scroll trigger)
│       └── Container.tsx
├── lib/
│   ├── constants.ts       ← All static data (pricing, testimonials, nav links)
│   ├── animations.ts      ← Shared Framer Motion variants
│   └── validations.ts     ← Zod schemas
```

## Progress Tracking

### Phase 1: Design Decisions ✅
- [x] Color palette chosen
- [x] Pain points defined
- [x] Pricing tiers drafted
- [x] Testimonials written
- [x] Hero headline chosen

### Phase 2: Environment Setup ✅
- [x] Next.js 15 scaffolded
- [x] Tailwind v4 configured
- [x] Dependencies installed (Framer Motion, RHF, Zod, shadcn/ui)
- [x] shadcn/ui initialized (Button, Card, Input, Badge)
- [x] Design tokens in globals.css
- [x] lib/constants.ts created
- [x] lib/animations.ts created
- [x] lib/validations.ts created

### Phase 3: Rules & Planning ⏳ In Progress
- [ ] .cursorrules updated for this project
- [ ] PLANNING.md created (this file)

### Phase 4: Build Components (Next)
- [ ] Navbar
- [ ] Hero section
- [ ] Demo simulation (Framer Motion focus)
- [ ] Feature cards
- [ ] Testimonials
- [ ] Pricing with toggle
- [ ] Waitlist form
- [ ] Footer

### Phase 5: Polish & Deploy
- [ ] Mobile responsiveness
- [ ] Performance audit
- [ ] Form submission wired up
- [ ] Vercel deployment
- [ ] Case study paragraph

## Cursor Prompting Strategy

**Always start a Cursor session with:**
> Here's my project: [paste from PLANNING.md]. Now build [COMPONENT]. Use variants from lib/animations.ts. Do not use inline styles. Do not add dependencies.

**One section per prompt. Review all diffs. Commit after each working section.**

**Golden constraints to paste:**
- No inline styles — use Tailwind @apply in CSS or className
- No new dependencies
- TypeScript strict mode
- Server Components by default; use `use client` only for Framer Motion or forms
- Reuse variants from lib/animations.ts
- Use data from lib/constants.ts

## Key Insights

1. **The demo is the hero** — The animated recipe-generation simulation is what sells the concept. Spend disproportionate time polishing this one component.

2. **Design distinction matters** — At 15+ projects, visual polish outweighs originality. The warm terracotta/olive palette is intentionally NOT the default light-blue SaaS look.

3. **No backend needed** — All interactions are frontend. Focus on *feeling* like a real product, not being one.

4. **Conversion is king** — Every section exists to move the visitor closer to email signup. Navbar → Hook (Hero) → Proof (Demo) → Trust (Social Proof + Pricing) → Action (Waitlist).

## Next Immediate Action

Build **Navbar** component:
- Fixed/sticky positioning with blur backdrop on scroll
- Logo + 3 nav links + CTA button
- Responsive hamburger for mobile (stretch goal)
- Use li/a semantic HTML

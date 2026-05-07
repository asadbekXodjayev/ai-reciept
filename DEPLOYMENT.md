# Deployment Guide — RecipeAI Landing Page

## Quick Start (5 minutes)

### Option 1: Deploy with Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project root
cd recipe-ai

# Deploy
vercel

# Follow prompts:
# - Link to existing Vercel project? (no — create new)
# - Project name: recipe-ai
# - Framework preset: Next.js (auto-detected)
# - Root directory: ./ (current)
# - Build command: (use default)
# - Output directory: (use default)
```

### Option 2: Deploy via GitHub (Recommended for Teams)
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

Your site will be live in ~2 minutes.

## Post-Deployment Checklist

- [ ] Test on mobile, tablet, desktop
- [ ] Verify form validation works
- [ ] Check animations are smooth (60fps)
- [ ] Confirm navbar scroll behavior
- [ ] Test pricing toggle (monthly/annual)
- [ ] Verify all CTA buttons link correctly
- [ ] Check footer links

## Environment Variables (If Needed)

If you add a backend form submission service later (e.g., Formspree, SendGrid):

```bash
# .env.local (local development)
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Vercel Dashboard > Settings > Environment Variables
# Add the same variable there for production
```

## Custom Domain

1. In Vercel Dashboard, go to project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., recipeai.com)
4. Follow DNS instructions from your registrar
5. Vercel provides free SSL/TLS

## Analytics & Monitoring

Vercel includes built-in:
- **Web Analytics** — Page views, visitors, bounce rate
- **Lighthouse CI** — Performance scoring on each deploy
- **Error Reporting** — Function errors, client-side exceptions

Enable in Vercel Dashboard > Settings > Analytics.

## Future Enhancements

1. **Add real AI backend** — Connect Groq API for actual recipe generation
2. **Form submission** — Wire waitlist form to email service
3. **A/B testing** — Use Vercel's native A/B testing for CTAs
4. **Image optimization** — Add Next.js Image for hero images
5. **SEO** — Add Open Graph meta tags in `layout.tsx`

## Troubleshooting

**Build fails on Vercel?**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Review build logs in Vercel Dashboard
```

**Animations lag on production?**
- Verify no inline styles (use Tailwind + CSS vars)
- Check Framer Motion variants are reused (not redefined)
- Profile with DevTools Lighthouse

**Form not working?**
- Check network tab in browser DevTools
- Verify form endpoint environment variable
- Test form submission locally (`npm run dev`)

---

**Happy shipping! 🚀**

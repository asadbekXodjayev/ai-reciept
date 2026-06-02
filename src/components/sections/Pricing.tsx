'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { getPricingTiers, ANNUAL_SAVING_PERCENT } from '@/lib/content';
import { staggerContainer, scrollFadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/TranslationContext';

export function PricingSection() {
    const { t, lang } = useTranslation();
    const tiers = getPricingTiers(lang);
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section id="pricing" className="py-20 sm:py-28 bg-card">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                        {t('pricingTitle')}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                        {t('pricingSubtitle')}
                    </p>

                    {/* Toggle */}
                    <div
                        role="group"
                        aria-label={t('pricingTitle')}
                        className="inline-flex items-center bg-[#FFFBF0] dark:bg-white/5 border-2 border-[#4F6815]/20 dark:border-white/10 rounded-full p-1"
                    >
                        <button
                            type="button"
                            onClick={() => setIsAnnual(false)}
                            aria-pressed={!isAnnual}
                            className={cn(
                                'px-6 py-2 rounded-full font-semibold transition-all',
                                !isAnnual
                                    ? 'bg-[#4F6815] text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {t('pricingMonthly')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAnnual(true)}
                            aria-pressed={isAnnual}
                            className={cn(
                                'px-6 py-2 rounded-full font-semibold transition-all',
                                isAnnual
                                    ? 'bg-[#4F6815] text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {t('pricingAnnual')}
                            <span
                                className={cn(
                                    'ml-2 text-sm font-normal',
                                    isAnnual ? 'text-white/90' : 'text-[#4F6815] dark:text-[#a3c14f]'
                                )}
                            >
                                {t('pricingSave')} {ANNUAL_SAVING_PERCENT}%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start"
                >
                    {tiers.map((tier) => {
                        const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
                        return (
                            <motion.div key={tier.id} variants={scrollFadeInUp} className="h-full">
                                <Card
                                    className={cn(
                                        'relative p-8 transition-all h-full',
                                        tier.highlighted
                                            ? 'border-2 border-[#4F6815] dark:border-[#a3c14f] bg-gradient-to-br from-[#FFFBF0] to-white dark:from-white/[0.04] dark:to-transparent shadow-2xl md:scale-105'
                                            : 'border-2 border-[#4F6815]/10 dark:border-white/10'
                                    )}
                                >
                                    {tier.highlighted && (
                                        <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#75070C] dark:bg-[#e06b70] text-white">
                                            {t('pricingMostPopular')}
                                        </Badge>
                                    )}

                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

                                    {/* Price */}
                                    <motion.div
                                        key={`${tier.id}-${isAnnual}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-6"
                                    >
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-foreground">
                                                ${price}
                                            </span>
                                            {(tier.monthlyPrice > 0 || tier.annualPrice > 0) && (
                                                <span className="text-muted-foreground">
                                                    {isAnnual ? t('pricingPerYear') : t('pricingPerMonth')}
                                                </span>
                                            )}
                                        </div>
                                        {isAnnual && tier.monthlyPrice > 0 && (
                                            <p className="text-sm text-muted-foreground mt-2">
                                                ${(tier.annualPrice / 12).toFixed(0)}
                                                {t('pricingPerMonthBilled')}
                                            </p>
                                        )}
                                    </motion.div>

                                    {/* CTA Button */}
                                    <Button
                                        className={cn(
                                            'w-full mb-8 font-semibold py-2',
                                            tier.highlighted
                                                ? 'bg-[#75070C] hover:bg-[#5a0509] text-white'
                                                : 'bg-[#FFFBF0] hover:bg-[#FFE8A0] dark:bg-white/5 dark:hover:bg-white/10 text-[#4F6815] dark:text-[#a3c14f] border-2 border-[#4F6815] dark:border-white/10'
                                        )}
                                    >
                                        {tier.monthlyPrice === 0 ? t('pricingGetStarted') : t('pricingStartTrial')}
                                    </Button>

                                    {/* Features */}
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, featureIdx) => (
                                            <li
                                                key={featureIdx}
                                                className="flex items-start gap-3 text-foreground/80"
                                            >
                                                <Check
                                                    className="size-4 mt-0.5 shrink-0 text-[#4F6815] dark:text-[#a3c14f]"
                                                    aria-hidden="true"
                                                />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </section>
    );
}

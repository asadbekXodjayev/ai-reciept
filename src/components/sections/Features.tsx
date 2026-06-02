'use client';

import { motion } from 'framer-motion';
import { getFeatures } from '@/lib/content';
import { staggerContainer, scrollFadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { useTranslation } from '@/contexts/TranslationContext';

export function FeaturesSection() {
    const { t, lang } = useTranslation();
    const features = getFeatures(lang);

    return (
        <section id="features" className="py-20 sm:py-28 bg-card">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                        {t('featuresTitle')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        {t('featuresSubtitle')}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            variants={scrollFadeInUp}
                            className="bg-gradient-to-br from-[#FFFBF0] to-white dark:from-white/[0.03] dark:to-transparent border border-[#4F6815]/10 dark:border-white/10 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}

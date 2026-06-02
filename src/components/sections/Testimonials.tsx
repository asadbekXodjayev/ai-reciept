'use client';

import { motion } from 'framer-motion';
import { getTestimonials } from '@/lib/content';
import { staggerContainer, scrollFadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/contexts/TranslationContext';

export function TestimonialsSection() {
    const { t, lang } = useTranslation();
    const testimonials = getTestimonials(lang);

    return (
        <section className="py-20 sm:py-28 bg-[#FFFBF0] dark:bg-background">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                        {t('testimonialsTitle')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        {t('testimonialsSubtitle')}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div key={testimonial.id} variants={scrollFadeInUp}>
                            <Card className="h-full border-2 border-[#4F6815]/10 dark:border-white/10 p-6 hover:shadow-lg transition-shadow duration-300">
                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F6815] to-[#75070C] flex items-center justify-center shrink-0"
                                        aria-hidden="true"
                                    >
                                        <span className="text-white font-bold text-sm">
                                            {testimonial.avatar}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-foreground/80 leading-relaxed italic">
                                    “{testimonial.quote}”
                                </blockquote>

                                {/* Stars */}
                                <div className="flex gap-1 text-[#E8B62C]" aria-hidden="true">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className="text-lg">
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}

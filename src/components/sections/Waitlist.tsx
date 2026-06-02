'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';

export function WaitlistSection() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<WaitlistFormData>({
        resolver: zodResolver(waitlistSchema),
    });

    const onSubmit = async () => {
        setSubmitError(false);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setSubmitted(true);
            reset();
        } catch {
            setSubmitError(true);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setSubmitError(false);
        reset();
    };

    return (
        <section id="waitlist" className="py-20 sm:py-28 bg-gradient-to-b from-white to-[#FFFBF0] dark:from-background dark:to-background">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-2xl mx-auto text-center"
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                                    {t('waitlistTitle')}
                                </motion.h2>
                                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 text-pretty">
                                    {t('waitlistSubtitle')}
                                </motion.p>

                                <motion.form
                                    variants={fadeInUp}
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 text-left">
                                            <Input
                                                type="email"
                                                placeholder={t('waitlistPlaceholder')}
                                                aria-label={t('waitlistPlaceholder')}
                                                aria-invalid={errors.email ? true : undefined}
                                                aria-describedby={
                                                    errors.email || submitError ? 'waitlist-email-error' : undefined
                                                }
                                                {...register('email')}
                                                className="w-full py-3 px-4 border-2 border-[#4F6815]/20 dark:border-white/10 focus:border-[#4F6815] rounded-lg text-base"
                                            />
                                            {(errors.email || submitError) && (
                                                <p
                                                    id="waitlist-email-error"
                                                    role="alert"
                                                    className="mt-2 text-sm text-[#75070C] dark:text-[#e06b70]"
                                                >
                                                    {t('waitlistEmailInvalid')}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold py-3 px-8 whitespace-nowrap disabled:opacity-50"
                                        >
                                            {isSubmitting ? t('waitlistButtonLoading') : t('waitlistButton')}
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        {t('waitlistSpam')}
                                    </p>
                                </motion.form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-6xl mb-4"
                                    aria-hidden="true"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    {t('waitlistSuccessTitle')}
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    {t('waitlistSuccessBody')}
                                </p>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="border-2 border-[#4F6815] dark:border-[#a3c14f] text-[#4F6815] dark:text-[#a3c14f] hover:bg-[#4F6815]/5 dark:hover:bg-[#a3c14f]/10"
                                >
                                    {t('waitlistAddAnother')}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}

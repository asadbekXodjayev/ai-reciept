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
import { CTA } from '@/lib/constants';

export function WaitlistSection() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<WaitlistFormData>({
        resolver: zodResolver(waitlistSchema),
    });

    const onSubmit = async (data: WaitlistFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form submitted:', data);
        setSubmitted(true);
        reset();
    };

    const handleReset = () => {
        setSubmitted(false);
        reset();
    };

    return (
        <section id="waitlist" className="py-20 sm:py-28 bg-gradient-to-b from-white to-[#FFFBF0]">
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
                                <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    {CTA.headline}
                                </motion.h2>
                                <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
                                    {CTA.subheadline}
                                </motion.p>

                                <motion.form
                                    variants={fadeInUp}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1">
                                            <Input
                                                type="email"
                                                placeholder={CTA.placeholder}
                                                {...register('email')}
                                                className="w-full py-3 px-4 border-2 border-[#4F6815]/20 focus:border-[#4F6815] rounded-lg text-base"
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#75070C] hover:bg-[#5a0509] text-white font-semibold py-3 px-8 whitespace-nowrap disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Joining...' : CTA.button}
                                        </Button>
                                    </div>

                                    <p className="text-xs text-gray-500">
                                        We'll never spam you. Unsubscribe anytime.
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
                                >
                                    🎉
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    You're on the list!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Check your email for a special welcome offer. We'll notify you when RecipeAI launches.
                                </p>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="border-2 border-[#4F6815] text-[#4F6815] hover:bg-[#4F6815]/5"
                                >
                                    Add Another Email
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}

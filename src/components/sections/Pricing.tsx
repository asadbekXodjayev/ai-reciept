'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING_TIERS } from '@/lib/constants';
import { staggerContainer, scrollFadeInUp, fadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section id="pricing" className="py-20 sm:py-28 bg-white">
            <Container>
                <motion.div className="text-center mb-12">
                    <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Choose the plan that fits your cooking style
                    </motion.p>

                    {/* Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center bg-[#FFFBF0] border-2 border-[#4F6815]/20 rounded-full p-1"
                    >
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${!isAnnual
                                    ? 'bg-[#4F6815] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${isAnnual
                                    ? 'bg-[#4F6815] text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Annual
                            <span className="ml-2 text-sm font-normal text-yellow-600">
                                Save 17%
                            </span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {PRICING_TIERS.map((tier, idx) => (
                        <motion.div key={idx} variants={scrollFadeInUp}>
                            <Card
                                className={`relative p-8 transition-all h-full ${tier.highlighted
                                        ? 'border-2 border-[#4F6815] bg-gradient-to-br from-[#FFFBF0] to-white shadow-2xl scale-105'
                                        : 'border-2 border-[#4F6815]/10 bg-white'
                                    }`}
                            >
                                {tier.highlighted && (
                                    <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#75070C] text-white">
                                        Most Popular
                                    </Badge>
                                )}

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">{tier.description}</p>

                                {/* Price */}
                                <motion.div
                                    key={`${tier.name}-${isAnnual}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-6"
                                >
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-gray-900">
                                            $
                                            {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                                        </span>
                                        {(tier.monthlyPrice > 0 || tier.annualPrice > 0) && (
                                            <span className="text-gray-600">
                                                {isAnnual ? '/year' : '/month'}
                                            </span>
                                        )}
                                    </div>
                                    {isAnnual && tier.monthlyPrice > 0 && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            ${(tier.annualPrice / 12).toFixed(2)}/month
                                        </p>
                                    )}
                                </motion.div>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full mb-8 font-semibold py-2 ${tier.highlighted
                                            ? 'bg-[#75070C] hover:bg-[#5a0509] text-white'
                                            : 'bg-[#FFFBF0] hover:bg-[#FFE8A0] text-[#4F6815] border-2 border-[#4F6815]'
                                        }`}
                                >
                                    {tier.monthlyPrice === 0 ? 'Get Started' : 'Start Free Trial'}
                                </Button>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {tier.features.map((feature, featureIdx) => (
                                        <li
                                            key={featureIdx}
                                            className="flex items-start gap-3 text-gray-700"
                                        >
                                            <span className="text-[#4F6815] font-bold mt-0.5">✓</span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}

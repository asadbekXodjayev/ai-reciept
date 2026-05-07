'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS, HERO } from '@/lib/constants';
import { fadeIn } from '@/lib/animations';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div variants={fadeIn} initial="hidden" animate="visible">
                        <a href="#" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F6815] to-[#75070C] flex items-center justify-center">
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span className="hidden sm:inline font-bold text-[#4F6815]">
                                RecipeAI
                            </span>
                        </a>
                    </motion.div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {NAV_LINKS.map((link, idx) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 * (idx + 1), duration: 0.5 }}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#4F6815] transition-colors"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <a href="#waitlist">
                            <Button
                                className="bg-[#75070C] hover:bg-[#5a0509] text-white"
                                size="sm"
                            >
                                {HERO.cta}
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}

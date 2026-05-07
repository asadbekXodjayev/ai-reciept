'use client';

import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import { staggerContainer, scrollFadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <Container>
        <motion.div className="text-center mb-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps from empty fridge to restaurant-quality dinner
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={scrollFadeInUp}
              className="bg-gradient-to-br from-[#FFFBF0] to-white border border-[#4F6815]/10 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

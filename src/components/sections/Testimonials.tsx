'use client';

import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { staggerContainer, scrollFadeInUp } from '@/lib/animations';
import { Container } from '@/components/shared/Container';
import { Card } from '@/components/ui/card';

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFFBF0]">
      <Container>
        <motion.div className="text-center mb-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Home Cooks Everywhere
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what real users are saying about RecipeAI
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div key={idx} variants={scrollFadeInUp}>
              <Card className="h-full bg-white border-2 border-[#4F6815]/10 p-6 hover:shadow-lg transition-shadow duration-300">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F6815] to-[#75070C] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Stars */}
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#FFEDAB] text-lg">
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

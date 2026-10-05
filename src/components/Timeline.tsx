import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem } from '../types';
import { Rocket, Building2, Cpu, Globe } from 'lucide-react';

export const Timeline: React.FC = () => {
  const timelineData: (TimelineItem & { icon: React.ElementType })[] = [
    {
      year: '01',
      title: 'Explore',
      description: 'Browse gyms and view the plans they offer.',
      icon: Rocket,
    },
    {
      year: '02',
      title: 'Join',
      description: 'Manage your gym connection and membership.',
      icon: Building2,
    },
    {
      year: '03',
      title: 'Check in',
      description: 'Use gym QR check-in and view attendance.',
      icon: Cpu,
    },
    {
      year: '04',
      title: 'Track',
      description: 'Keep a logbook of your own fitness habits.',
      icon: Globe,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cyber-bg relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-cyber-lime font-mono text-xs font-semibold tracking-widest uppercase">
            // YOUR ROUTINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            From finding a gym to building a routine
          </h2>
          <p className="text-cyber-textMuted text-sm sm:text-base">
            Explore the member journey through Aura Apex.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timelineData.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative p-6 rounded-2xl bg-cyber-card border border-cyber-cardBorder hover:border-cyber-lime/50 transition-all duration-300 shadow-card-glow hover:-translate-y-1 hover:shadow-lime-glow-sm flex flex-col justify-between"
              >
                {/* Connector line effect for desktop */}
                {index < timelineData.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-cyber-cardBorder group-hover:bg-cyber-lime/40 z-0" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-cyber-lime font-mono tracking-tight">
                      {item.year}
                    </span>
                    <div className="p-2.5 rounded-xl bg-cyber-bg border border-white/10 text-cyber-lime group-hover:border-cyber-lime/40 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyber-lime transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyber-textMuted mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyber-textMuted">
                  <span>STEP {index + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

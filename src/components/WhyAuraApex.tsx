import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, BarChart3, LineChart, CreditCard, TrendingUp, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { FeatureItem } from '../types';

export const WhyAuraApex: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'personal-logbook',
      title: 'Personal Logbook',
      description:
        'A place to record your own fitness habits and progress.',
      iconName: 'Cpu',
      details:
        'Enter weight, workouts and daily habits manually, and review your own fitness records in one place.',
    },
    {
      id: 'data-driven',
      title: 'Data Driven',
      description:
        'Keep membership, payment and attendance records together.',
      iconName: 'BarChart3',
      details:
        'Gym teams can view member records, membership status, payments and check-ins in the web portal.',
    },
    {
      id: 'smart-analytics',
      title: 'Gym Dashboards',
      description:
        'Views of gym activity for everyday administration.',
      iconName: 'LineChart',
      details:
        'The portal provides operational views for gym administration, including memberships, payments and check-ins.',
    },
    {
      id: 'flexible-memberships',
      title: 'Flexible Memberships',
      description:
        'View the membership options offered by your gym.',
      iconName: 'CreditCard',
      details:
        'Gyms define their available plans and prices. Check the plan and checkout information before purchasing.',
    },
    {
      id: 'business-growth',
      title: 'Member Management',
      description:
        'Manage gym memberships and joining requests.',
      iconName: 'TrendingUp',
      details:
        'Keep track of gym members and their plan status through the portal, with member records available to the gym team.',
    },
    {
      id: 'secure-platform',
      title: 'Account Access',
      description:
        'Sign-in and role-based tools for members and gym teams.',
      iconName: 'ShieldCheck',
      details:
        'Account requests use authentication and HTTPS. Read the privacy review draft for current image access and data handling details.',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return Cpu;
      case 'BarChart3':
        return BarChart3;
      case 'LineChart':
        return LineChart;
      case 'CreditCard':
        return CreditCard;
      case 'TrendingUp':
        return TrendingUp;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Cpu;
    }
  };

  return (
    <section id="features" className="py-20 md:py-32 bg-cyber-bg relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime text-xs font-mono font-bold tracking-widest uppercase">
            // WHY AURA APEX
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built different. By design.
          </h2>
          <p className="text-cyber-textMuted text-base sm:text-lg">
            Click any card to learn more.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const IconComp = getIcon(item.iconName);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveFeature(item)}
                className="group p-6 rounded-2xl bg-cyber-card border border-cyber-cardBorder hover:border-cyber-lime/30 transition-all duration-300 shadow-card-glow hover:-translate-y-1 hover:shadow-lime-glow-sm cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyber-bg border border-white/10 text-cyber-lime group-hover:border-cyber-lime/30 transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-cyber-textMuted group-hover:text-cyber-lime group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyber-lime transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyber-textMuted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyber-textMuted">
                  <span>FEATURE 0{index + 1}</span>
                  <span className="text-cyber-lime font-semibold group-hover:underline">Explore Details &rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl bg-cyber-card border border-cyber-cardBorder shadow-2xl p-6 sm:p-8 text-white space-y-5"
            >
              <button
                onClick={() => setActiveFeature(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-cyber-bg border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-white transition-colors"
                aria-label="Close feature details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyber-lime/10 border border-cyber-lime/40 text-cyber-lime">
                  {React.createElement(getIcon(activeFeature.iconName), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyber-lime uppercase tracking-wider font-bold">
                    WHY AURA APEX
                  </span>
                  <h3 className="text-2xl font-bold text-white">{activeFeature.title}</h3>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-medium leading-relaxed">
                {activeFeature.description}
              </p>

              {activeFeature.details && (
                <div className="p-4 rounded-xl bg-cyber-bg border border-white/10 text-xs text-cyber-textMuted leading-relaxed font-mono">
                  {activeFeature.details}
                </div>
              )}

              <button
                onClick={() => setActiveFeature(null)}
                className="w-full py-3 rounded-xl bg-cyber-lime text-black font-bold text-sm hover:bg-cyber-limeHover transition-all shadow-lime-glow"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

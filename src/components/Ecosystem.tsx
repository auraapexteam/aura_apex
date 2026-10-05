import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Building2, LayoutDashboard, ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';
import { EcosystemItem } from '../types';

export const Ecosystem: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<EcosystemItem | null>(null);

  const ecosystemCards: EcosystemItem[] = [
    {
      id: 'members',
      category: 'For Members',
      title: 'User App',
      description:
        'Browse gyms, manage your membership, check in and record personal fitness habits from your phone.',
      buttonText: 'Learn more',
      iconName: 'Smartphone',
      highlights: [
        'Gym discovery and membership information',
        'QR check-in and attendance history',
        'Manually entered fitness and habit logs',
        'Profile and account settings',
      ],
      metrics: 'Member app for Android and iOS',
    },
    {
      id: 'businesses',
      category: 'For Businesses',
      title: 'Gym Owner Platform',
      description:
        'A web workspace for managing gym members, plans, payments and attendance.',
      buttonText: 'Learn more',
      iconName: 'Building2',
      highlights: [
        'Gym member and membership management',
        'Membership plans and payment records',
        'Attendance and gym check-in tools',
        'Gym equipment and gallery management',
      ],
      metrics: 'Web portal for gym management',
    },
    {
      id: 'operators',
      category: 'For Operators',
      title: 'Admin Dashboard',
      description:
        'Administration tools for gym records, platform settings and role-based access.',
      buttonText: 'Learn more',
      iconName: 'LayoutDashboard',
      highlights: [
        'Gym and account administration',
        'Plan, membership and payment views',
        'Role and staff permission settings',
        'Operational dashboards',
      ],
      metrics: 'Platform administration workspace',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return Smartphone;
      case 'Building2':
        return Building2;
      case 'LayoutDashboard':
        return LayoutDashboard;
      default:
        return Smartphone;
    }
  };

  return (
    <section id="ecosystem" className="py-20 md:py-32 bg-cyber-bg relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime text-xs font-mono font-bold tracking-widest uppercase">
            // OUR ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            One platform. Every stakeholder.
          </h2>
          <p className="text-cyber-textMuted text-base sm:text-lg">
            Three purpose-built products, one unified intelligence layer. Click any card to explore.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ecosystemCards.map((card, index) => {
            const IconComp = getIcon(card.iconName);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative p-8 rounded-3xl bg-cyber-card border border-cyber-cardBorder hover:border-cyber-lime/30 transition-all duration-300 shadow-card-glow hover:-translate-y-1 hover:shadow-lime-glow-sm flex flex-col justify-between"
              >
                {/* Subtle Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyber-lime/20 to-transparent group-hover:via-cyber-lime/40 transition-all duration-300" />

                <div className="space-y-6">
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 text-cyber-lime border border-cyber-lime/30 uppercase tracking-wider">
                      {card.category}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-cyber-bg border border-white/10 text-cyber-lime group-hover:border-cyber-lime group-hover:scale-110 transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-cyber-lime transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-cyber-textMuted leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8 mt-6 border-t border-white/5">
                  <button
                    onClick={() => setSelectedCard(card)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-cyber-bg border border-white/10 text-white font-semibold text-sm hover:bg-cyber-lime hover:text-black hover:border-cyber-lime transition-all duration-300 group/btn"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-4 h-4 text-cyber-lime group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal for "Learn More" */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl rounded-3xl bg-cyber-card border border-cyber-cardBorder shadow-2xl p-6 sm:p-8 text-white space-y-6"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-cyber-bg border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-white transition-colors"
                aria-label="Close detail modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime text-xs font-mono font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedCard.category}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedCard.title}
                </h3>
              </div>

              <p className="text-sm text-cyber-textMuted leading-relaxed">
                {selectedCard.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider">
                  Platform Highlights
                </h4>
                <ul className="space-y-2.5">
                  {selectedCard.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-cyber-lime flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-lime/30 flex items-center justify-between text-xs font-mono">
                <span className="text-cyber-textMuted">Impact Metric:</span>
                <span className="text-cyber-lime font-bold">{selectedCard.metrics}</span>
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="w-full py-3 rounded-xl bg-cyber-lime text-black font-bold text-sm hover:bg-cyber-limeHover transition-all shadow-lime-glow"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

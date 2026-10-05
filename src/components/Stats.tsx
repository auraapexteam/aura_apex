import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, HeartHandshake, MapPin } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      icon: Users,
      value: 'Members',
      label: 'Your gym, your account',
      description: 'Browse gyms and keep track of your membership in the app.',
    },
    {
      id: 'stat-2',
      icon: Building2,
      value: 'Gyms',
      label: 'Membership management',
      description: 'Tools for plans, members, payments and check-ins.',
    },
    {
      id: 'stat-3',
      icon: HeartHandshake,
      value: 'Fitness',
      label: 'Personal logbook',
      description: 'Record your own fitness habits and progress over time.',
    },
    {
      id: 'stat-4',
      icon: MapPin,
      value: 'Support',
      label: 'A place to ask',
      description: 'Reach the team for account, app and privacy questions.',
    },
  ];

  return (
    <section id="metrics" className="py-16 md:py-24 bg-cyber-bg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-cyber-lime font-mono text-xs font-semibold tracking-widest uppercase">
            // THE PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Built around your gym routine
          </h2>
          <p className="text-cyber-textMuted mt-3 text-sm sm:text-base">
            One app for members, with a web platform for gym operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-cyber-card border border-cyber-cardBorder hover:border-cyber-lime/30 transition-all duration-300 shadow-card-glow hover:-translate-y-1 hover:shadow-lime-glow-sm flex flex-col justify-between"
              >
                {/* Subtle accent top bar */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyber-lime/20 to-transparent group-hover:via-cyber-lime/40 transition-all duration-300" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyber-bg border border-white/10 group-hover:border-cyber-lime/40 text-cyber-lime transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyber-lime transition-colors">
                      {item.value}
                    </div>
                    <div className="text-base font-semibold text-gray-200">
                      {item.label}
                    </div>
                    <p className="text-xs text-cyber-textMuted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

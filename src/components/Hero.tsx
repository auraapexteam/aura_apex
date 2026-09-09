import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight, Sparkles, Activity, Users, Building2, Flame, HeartPulse, Trophy, Download } from 'lucide-react';
import { APP_DOWNLOAD_LINK } from '../constants';

interface HeroProps {
  onOpenBookDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookDemo }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-overlay">
      {/* Background Ambient Glows - Subtle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-lime/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-cyber-lime/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Small Heading / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-card border border-cyber-lime/20 text-cyber-lime text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lime-glow-sm"
          >
            <Dumbbell className="w-4 h-4 text-cyber-lime animate-pulse" />
            <span>The Future of Fitness Is Here</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Building the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-lime to-cyber-limeHover text-neon-glow">
              Fitness.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-cyber-textMuted max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Aura Apex is transforming the fitness industry through technology &mdash; connecting users, gym owners, trainers, and wellness partners into one intelligent ecosystem.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Download App Primary CTA */}
            <a
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyber-lime text-black font-bold text-base hover:bg-cyber-limeHover transition-all duration-300 shadow-lime-glow hover:scale-105 active:scale-95 group"
            >
              <Download className="w-5 h-5 text-black" />
              <span>Download the App</span>
            </a>

            <a
              href="#ecosystem"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyber-card border border-white/10 text-white font-semibold text-base hover:border-cyber-lime/30 hover:bg-cyber-cardHover transition-all duration-300 group"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyber-lime" />
            </a>

            <button
              onClick={onOpenBookDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyber-card border border-white/10 text-white font-semibold text-base hover:border-cyber-lime/30 hover:bg-cyber-cardHover transition-all duration-300 group"
            >
              <Sparkles className="w-5 h-5 text-cyber-lime" />
              <span>Book a Demo</span>
            </button>
          </motion.div>
        </div>

        {/* Hero Interactive Fitness Tech Dashboard Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 relative max-w-5xl mx-auto rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-xl backdrop-blur-xl"
        >
          <div className="bg-cyber-card rounded-xl border border-cyber-cardBorder p-4 sm:p-6 overflow-hidden relative">
            {/* Control Bar Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-cyber-textMuted hidden sm:inline">
                  aura-apex://fitness-intelligence-v2.4
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyber-lime animate-ping" />
                  LIVE FITNESS ECOSYSTEM
                </span>
              </div>
            </div>

            {/* Simulated Fitness Tech Interface Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Active Member Telemetry */}
              <div className="p-4 rounded-lg bg-cyber-bg border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-cyber-textMuted font-mono">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyber-lime" /> Member Energy Burn
                  </span>
                  <span className="text-cyber-lime font-bold">842 kcal avg</span>
                </div>
                <div className="h-24 flex items-end gap-1 pt-4">
                  {[45, 60, 75, 50, 90, 80, 85, 95, 70, 88, 92, 85, 65, 98].map((val, i) => (
                    <div
                      key={i}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-gradient-to-t from-cyber-card to-cyber-lime rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-cyber-textMuted font-mono pt-1">
                  <span>WORKOUT PEAK</span>
                  <span>50K+ ACTIVE USERS</span>
                </div>
              </div>

              {/* Card 2: Gym Platform Operations */}
              <div className="p-4 rounded-lg bg-cyber-bg border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-cyber-textMuted font-mono">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyber-lime" /> Connected Facilities
                  </span>
                  <span className="text-white font-bold">2,000+ Gyms</span>
                </div>
                <div className="space-y-2 pt-1">
                  {[
                    { label: 'Automated Check-Ins', value: '14,280/hr' },
                    { label: 'Trainer Sessions Active', value: '3,840 Live' },
                    { label: 'Member Retention SLA', value: '98% Score' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white/5">
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-cyber-lime font-mono font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Intelligent Ecosystem Insights */}
              <div className="p-4 rounded-lg bg-cyber-bg border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-cyber-textMuted font-mono">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-cyber-lime" /> Member Satisfaction
                  </span>
                  <span className="text-cyber-lime font-bold">98% Rating</span>
                </div>
                <div className="p-3 rounded bg-cyber-card border border-white/10 space-y-2 text-xs font-mono">
                  <div className="text-cyber-lime text-[11px] font-semibold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> SMART PREDICTIVE RETENTION
                  </div>
                  <div className="text-gray-400 text-[10px]">
                    40+ CITIES &bull; FULLY INTEGRATED ECOSYSTEM
                  </div>
                  <div className="text-gray-400 text-[10px]">
                    ZERO FRAGMENTATION &bull; REAL-TIME SYNC
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyber-lime w-[98%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

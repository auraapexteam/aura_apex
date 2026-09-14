import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Menu, X, ArrowUpRight, Sparkles, Compass, Download } from 'lucide-react';
import { APP_DOWNLOAD_LINK } from '../constants';

interface NavbarProps {
  onOpenBookDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-1.5 sm:gap-3 group text-white font-extrabold text-[13px] sm:text-xl tracking-wider"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-cyber-card border border-cyber-cardBorder group-hover:border-cyber-lime transition-all duration-300 shadow-lime-glow-sm">
              <Dumbbell className="w-5 h-5 text-cyber-lime group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyber-lime animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5">
                AURA <span className="text-cyber-lime">APEX</span>
              </span>
              <span className="text-[8px] sm:text-[9px] whitespace-nowrap text-cyber-textMuted font-mono tracking-widest -mt-1">
                FITNESS TECH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 bg-cyber-card/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-cyber-textMuted hover:text-cyber-lime transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Download App CTA */}
            <a
              href={APP_DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 min-h-11 sm:min-h-0 whitespace-nowrap rounded-full bg-cyber-lime text-black font-bold text-[11px] sm:text-sm hover:bg-cyber-limeHover transition-all duration-300 shadow-lime-glow hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Download App</span>
            </a>

            {/* Explore Platform CTA */}
            <a
              href="#ecosystem"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-card border border-white/10 text-white font-semibold text-xs hover:border-cyber-lime/50 hover:text-cyber-lime transition-all duration-300"
            >
              <Compass className="w-3.5 h-3.5 text-cyber-lime" />
              <span>Explore Platform</span>
            </a>

            {/* Book a Demo CTA */}
            <button
              onClick={onOpenBookDemo}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyber-card border border-white/10 text-white font-semibold text-xs sm:text-sm hover:border-cyber-lime/50 hover:text-cyber-lime transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-cyber-lime" />
              <span>Book a Demo</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-cyber-lime" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-cyber-card border border-white/10 text-white hover:text-cyber-lime focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cyber-card/95 backdrop-blur-xl border-b border-cyber-cardBorder"
          >
            <div className="px-6 pt-4 pb-6 space-y-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-gray-300 hover:text-cyber-lime transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-2 space-y-3">
                <a
                  href="#ecosystem"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyber-bg border border-white/10 text-white font-semibold text-sm hover:border-cyber-lime"
                >
                  <Compass className="w-4 h-4 text-cyber-lime" />
                  <span>Explore Platform</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookDemo();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyber-card border border-white/10 text-white font-semibold text-sm hover:border-cyber-lime"
                >
                  <Sparkles className="w-5 h-5 text-cyber-lime" />
                  <span>Book a Demo</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

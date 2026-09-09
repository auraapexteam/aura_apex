import React, { useState } from 'react';
import { Dumbbell, Github, Twitter, Linkedin, ArrowRight, CheckCircle, Download } from 'lucide-react';
import { APP_DOWNLOAD_LINK } from '../constants';

interface FooterProps {
  onOpenBookDemo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBookDemo }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-cyber-bg border-t border-white/10 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 text-white font-extrabold text-xl">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyber-card border border-cyber-cardBorder text-cyber-lime shadow-lime-glow-sm">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-extrabold tracking-tight">
                AURA <span className="text-cyber-lime">APEX</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-cyber-textMuted max-w-sm leading-relaxed">
              Building the intelligent infrastructure powering the future of fitness.
            </p>

            {/* CTA Button */}
            {onOpenBookDemo && (
              <div className="pt-2">
                <button
                  onClick={onOpenBookDemo}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-lime text-black font-bold text-xs hover:bg-cyber-limeHover transition-all shadow-lime-glow"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Nav Links Col 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-cyber-textMuted font-medium">
              <li>
                <a
                  href={APP_DOWNLOAD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-lime font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download App
                </a>
              </li>
              <li><a href="#ecosystem" className="hover:text-cyber-lime transition-colors">User App</a></li>
              <li><a href="#ecosystem" className="hover:text-cyber-lime transition-colors">Gym Platform</a></li>
              <li><a href="#ecosystem" className="hover:text-cyber-lime transition-colors">Admin Dashboard</a></li>
              <li><a href="#features" className="hover:text-cyber-lime transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Nav Links Col 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-cyber-textMuted font-medium">
              <li><a href="#about" className="hover:text-cyber-lime transition-colors">About</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Legal</a></li>
            </ul>
          </div>

          {/* Nav Links Col 3: Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-cyber-textMuted font-medium">
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-cyber-lime transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Legal Section */}
        <div className="py-8 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-1">
            <h4 className="text-sm font-bold text-white">Stay in the loop</h4>
            <p className="text-xs text-cyber-textMuted">
              Product updates, industry insights, and what we&apos;re building next.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-3 rounded-xl bg-cyber-lime/10 border border-cyber-lime text-cyber-lime text-xs font-mono flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-xl bg-cyber-card border border-white/10 text-xs text-white focus:border-cyber-lime focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyber-lime text-black font-bold text-xs hover:bg-cyber-limeHover transition-all shadow-lime-glow"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cyber-textMuted">
          <div>
            &copy; 2024 Aura Apex, Inc. All rights reserved.
          </div>

          <div className="font-mono text-[11px] text-cyber-lime">
            Made with precision in San Francisco
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="GitHub Repository"
              className="p-2 rounded-lg bg-cyber-card border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-cyber-lime transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter Feed"
              className="p-2 rounded-lg bg-cyber-card border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-cyber-lime transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn Page"
              className="p-2 rounded-lg bg-cyber-card border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-cyber-lime transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

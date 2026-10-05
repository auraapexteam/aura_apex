import React from 'react';
import { Dumbbell, ArrowRight, Mail } from 'lucide-react';
import { SUPPORT_EMAIL, supportMailto } from '../support';

interface FooterProps { onOpenBookDemo?: () => void }

export const Footer: React.FC<FooterProps> = ({ onOpenBookDemo }) => (
  <footer className="bg-cyber-bg border-t border-white/10 pt-14 pb-9 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 pb-10 border-b border-white/10">
        <div className="lg:col-span-2 space-y-4">
          <a href="/" className="inline-flex items-center gap-3 text-white font-extrabold text-xl"><Dumbbell className="w-7 h-7 text-cyber-lime" /><span>AURA <span className="text-cyber-lime">APEX</span></span></a>
          <p className="text-sm text-cyber-textMuted max-w-sm leading-6">Gym memberships, check-ins and personal fitness tracking in one place.</p>
          {onOpenBookDemo && <button onClick={onOpenBookDemo} className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-xl bg-cyber-card border border-white/10 text-white font-semibold text-sm hover:border-cyber-lime">Book a Demo <ArrowRight className="w-4 h-4 text-cyber-lime" /></button>}
        </div>
        <div><h2 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider mb-4">Explore</h2><ul className="space-y-3 text-sm text-cyber-textMuted">
          <li><a href="/#about" className="hover:text-cyber-lime">About Aura Apex</a></li>
          <li><a href="/#ecosystem" className="hover:text-cyber-lime">App and gym platform</a></li>
          <li><a href="/#features" className="hover:text-cyber-lime">Features</a></li>
          <li><a href="/#contact" className="hover:text-cyber-lime">Contact</a></li>
        </ul></div>
        <div><h2 className="text-xs font-mono font-bold text-cyber-lime uppercase tracking-wider mb-4">Support and privacy</h2><ul className="space-y-3 text-sm text-cyber-textMuted">
          <li><a href="/support" className="hover:text-cyber-lime">Get support</a></li>
          <li><a href="/delete-account" className="hover:text-cyber-lime">Request account deletion</a></li>
          <li><a href="/privacy-policy" className="hover:text-cyber-lime">Privacy policy · review draft</a></li>
          <li><a href="/terms-of-service" className="hover:text-cyber-lime">Terms · review draft</a></li>
        </ul></div>
      </div>
      <div className="py-7 border-b border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-5">
        <div><h2 className="font-bold text-white">Have a question?</h2><p className="text-sm text-cyber-textMuted mt-1">Talk to us about the app or your gym.</p></div>
        <a href={supportMailto('Aura Apex enquiry')} className="inline-flex min-h-11 items-center gap-2 text-sm text-cyber-lime hover:text-white break-all"><Mail className="w-4 h-4 shrink-0" />{SUPPORT_EMAIL}</a>
      </div>
      <div className="pt-7 text-xs text-cyber-textMuted">&copy; {new Date().getFullYear()} Aura Apex. All rights reserved.</div>
    </div>
  </footer>
);

import React from 'react';
import { ArrowLeft, Download, Smartphone } from 'lucide-react';

export const DownloadPage: React.FC = () => (
  <section className="relative min-h-[80vh] pt-36 pb-24 md:pt-44 bg-grid-overlay">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-card border border-cyber-lime/20 text-cyber-lime text-sm font-semibold">
        <Smartphone className="w-4 h-4" aria-hidden="true" />
        Aura Apex for Android
      </div>
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
        Download <span className="text-cyber-lime">Aura Apex.</span>
      </h1>
      <p className="mt-5 text-lg text-cyber-textMuted">
        Get the Aura Apex app on your Android device.
      </p>
      <div className="mt-10 max-w-lg mx-auto p-8 sm:p-10 rounded-2xl bg-cyber-card border border-cyber-cardBorder shadow-card-glow">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-cyber-lime/10 border border-cyber-lime/20">
          <Smartphone className="w-8 h-8 text-cyber-lime" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-bold">Your fitness, on the go.</h2>
        <p className="mt-3 text-sm text-cyber-textMuted">Android app &middot; APK download</p>
        <a
          href="https://github.com/auraapexteam/aura_apex/releases/download/android-app/aura-apex.apk"
          download="aura-apex.apk"
          className="mt-7 flex items-center justify-center gap-3 px-5 py-4 rounded-xl bg-cyber-lime text-black font-bold hover:bg-cyber-limeHover transition-colors shadow-lime-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyber-lime"
        >
          <Download className="w-5 h-5 shrink-0" aria-hidden="true" />
          Download for Android
        </a>
        <p className="mt-4 text-xs text-cyber-textMuted">Open the downloaded APK on your Android device to install.</p>
      </div>
      <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm text-cyber-textMuted hover:text-cyber-lime transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to home
      </a>
    </div>
  </section>
);

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Ecosystem } from './components/Ecosystem';
import { WhyAuraApex } from './components/WhyAuraApex';
import { ContactSection } from './components/ContactSection';
import { BookDemoModal } from './components/BookDemoModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { DownloadPage } from './components/DownloadPage';

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDownloadPage, setIsDownloadPage] = useState(window.location.hash === '#download');

  useEffect(() => {
    const handleHashChange = () => {
      const downloading = window.location.hash === '#download';
      setIsDownloadPage(downloading);
      requestAnimationFrame(() => {
        const section = document.getElementById(window.location.hash.slice(1));
        if (!downloading && section) section.scrollIntoView();
        else window.scrollTo(0, 0);
      });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openBookDemo = () => setIsDemoModalOpen(true);
  const closeBookDemo = () => setIsDemoModalOpen(false);

  return (
    <div className="bg-cyber-bg text-white min-h-screen relative font-sans">
      {/* Top Navbar */}
      <Navbar onOpenBookDemo={openBookDemo} />

      {/* Main Content Sections */}
      <main>
        {isDownloadPage ? <DownloadPage /> : <>
        <Hero onOpenBookDemo={openBookDemo} />
        <Stats />
        <About />
        <Timeline />
        <Ecosystem />
        <WhyAuraApex />
        <ContactSection />
        </>}
      </main>

      {/* Footer */}
      <Footer onOpenBookDemo={openBookDemo} />

      {/* Interactive 3-Step Book a Demo Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={closeBookDemo} />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;

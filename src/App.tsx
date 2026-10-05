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
import { PublicPage } from './components/PublicPages';
import { resolvePage } from './routing';

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [location, setLocation] = useState({ pathname: window.location.pathname, hash: window.location.hash });
  const page = resolvePage(location.pathname, location.hash);

  useEffect(() => {
    const updateLocation = () => setLocation({ pathname: window.location.pathname, hash: window.location.hash });
    window.addEventListener('hashchange', updateLocation);
    window.addEventListener('popstate', updateLocation);
    return () => {
      window.removeEventListener('hashchange', updateLocation);
      window.removeEventListener('popstate', updateLocation);
    };
  }, []);

  useEffect(() => {
    const titles = { home: 'Gym memberships and fitness', download: 'Download for Android', privacy: 'Privacy policy review draft', terms: 'Terms of service review draft', support: 'Support', 'delete-account': 'Request account deletion', 'not-found': 'Page not found' };
    document.title = `${titles[page]} | Aura Apex`;
    requestAnimationFrame(() => {
      const section = page === 'home' ? document.getElementById(location.hash.slice(1)) : null;
      if (section) section.scrollIntoView();
      else window.scrollTo(0, 0);
    });
  }, [page, location.hash]);

  const openBookDemo = () => setIsDemoModalOpen(true);
  const closeBookDemo = () => setIsDemoModalOpen(false);

  return (
    <div className="bg-cyber-bg text-white min-h-screen relative font-sans">
      {/* Top Navbar */}
      <Navbar onOpenBookDemo={openBookDemo} />

      {/* Main Content Sections */}
      <main>
        {page === 'download' ? <DownloadPage /> : page === 'home' ? <>
        <Hero onOpenBookDemo={openBookDemo} />
        <Stats />
        <About />
        <Timeline />
        <Ecosystem />
        <WhyAuraApex />
        <ContactSection />
        </> : <PublicPage page={page} />}
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

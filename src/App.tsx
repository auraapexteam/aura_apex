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
import { StoreSupportPage } from './components/StoreSupportPage';
import { resolvePage } from './routing';

export function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [location, setLocation] = useState({ pathname: window.location.pathname, hash: window.location.hash });
  const page = resolvePage(location.pathname, location.hash);
  const isDownloadPage = page === 'download';
  const publicPage = page !== 'home' && !isDownloadPage;

  useEffect(() => {
    const handleHashChange = () => {
      setLocation({ pathname: window.location.pathname, hash: window.location.hash });
      const downloading = window.location.hash === '#download';
      requestAnimationFrame(() => {
        const section = document.getElementById(window.location.hash.slice(1));
        if (!downloading && section) section.scrollIntoView();
        else window.scrollTo(0, 0);
      });
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.title = publicPage
      ? `${page === 'delete-account' ? 'Request account deletion' : page === 'support' ? 'Support' : 'Page not found'} | Aura Apex`
      : 'Aura Apex | Building the Future of Fitness';
  }, [page, publicPage]);

  const openBookDemo = () => setIsDemoModalOpen(true);
  const closeBookDemo = () => setIsDemoModalOpen(false);

  return (
    <div className="bg-cyber-bg text-white min-h-screen relative font-sans">
      {/* Top Navbar */}
      {!publicPage && <Navbar onOpenBookDemo={openBookDemo} />}

      {/* Main Content Sections */}
      <main>
        {publicPage ? <StoreSupportPage page={page} /> : isDownloadPage ? <DownloadPage /> : <>
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
      {!publicPage && <Footer onOpenBookDemo={openBookDemo} />}

      {/* Interactive 3-Step Book a Demo Modal */}
      {!publicPage && <BookDemoModal isOpen={isDemoModalOpen} onClose={closeBookDemo} />}

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang-saya', label: 'Tentang Saya' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo */}
          <div
            onClick={() => handleItemClick('beranda')}
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-full bg-pastel-purple-600 flex items-center justify-center text-white font-serif font-black text-xl italic shadow-md shadow-pastel-purple-500/10 group-hover:scale-105 transition-transform duration-300">
              K
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tighter uppercase text-pastel-purple-700/90 gap-1 flex items-center leading-none">
                Kembara<span className="text-pastel-green-600">Pastel.</span>
              </span>
              <span className="text-[9px] block text-slate-400 font-bold tracking-widest mt-0.5 uppercase font-mono">
                Miza's Journal
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-full border border-slate-200/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-350 relative ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-pastel-purple-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleItemClick('tentang-saya')}
              className="px-6 py-2 bg-pastel-purple-600 hover:bg-pastel-purple-700 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              id="nav-subscribe"
            >
              Langgan
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-pastel-green-500/10 to-pastel-purple-500/10 text-pastel-purple-700 border-l-4 border-pastel-green-500 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 px-4">
                <button
                  onClick={() => handleItemClick('tentang-saya')}
                  className="w-full text-center py-2 px-4 bg-gradient-to-r from-pastel-green-500 to-pastel-purple-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  id="mobile-nav-cta"
                >
                  <Sparkles className="w-4 h-4" />
                  Langgan Artikel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

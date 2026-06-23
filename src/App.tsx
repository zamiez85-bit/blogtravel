import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowDown,
  Search,
  Filter,
  ArrowUp,
  Mail,
  Camera,
  Heart,
  MessageCircle,
  Sparkles,
  Map,
  MapPin,
  Check,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types, Data & Components
import { BlogPost, Category } from './types';
import { samplePosts, blogAuthor, blogCategories } from './data';
import Navbar from './components/Navbar';
import BlogCard from './components/BlogCard';
import PostModal from './components/PostModal';
import Sidebar from './components/Sidebar';
import ContactSection from './components/ContactSection';
import travelHeroBanner from './assets/images/travel_hero_banner_1782182363731.jpg';

export default function App() {
  // State managers
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeSection, setActiveSection] = useState('beranda');
  
  // Newsletter Subscribe
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Show "Back to Top" button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Determine active sections during scroll for navbar high-lighting
      const sections = ['beranda', 'tentang-saya', 'artikel', 'kontak'];
      for (const section of sections) {
        const el = document.getElementById(section + '-section');
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const target = document.getElementById(id + '-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // State handlers
  const handleLikePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const updated = { ...p, likes: p.likes + 1 };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, author: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author,
      text,
      date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const updated = {
            ...p,
            comments: [...p.comments, newComment]
          };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('Alamat e-mel tidak boleh dibiarkan kosong.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Format alamat e-mel tidak sah.');
      return;
    }

    setNewsletterError('');
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4500);
  };

  // Filtering Logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate top/popular posts (highest likes)
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-700 flex flex-col selection:bg-pastel-purple-100 selection:text-pastel-purple-900" id="app-root">
      {/* 1. Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* 2. Hero Section */}
      <header
        id="beranda-section"
        className="pt-24 pb-14 md:pt-32 md:pb-24 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-pastel-green-50/70 via-pastel-purple-50/50 to-white/30 z-0" />
        
        {/* Floating background geometries */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-pastel-green-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-pastel-purple-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Intro */}
            <div className="lg:col-span-12 xl:col-span-7 bg-pastel-purple-100/90 rounded-[40px] p-8 md:p-12 border-l-[12px] border-pastel-purple-500 relative overflow-hidden shadow-sm space-y-6" id="hero-intro-box">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-pastel-purple-300/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-pastel-purple-700 text-xs font-bold uppercase tracking-wider relative z-10 shadow-xs border border-pastel-purple-200/20">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Travel & Visual Journal</span>
              </div>
              
              <h1 className="font-serif font-black text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight relative z-10">
                Jelajahi Dunia Bersama <span className="italic text-pastel-purple-600">Miza.</span>
              </h1>
              
              <p className="text-pastel-purple-900/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium relative z-10">
                Catatan perjalanan dari gang-gang sempit di Kyoto hingga puncak bersalju Alpen dan kearifan warisan budaya Penang yang memukau.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
                <button
                  onClick={() => scrollToSection('artikel')}
                  className="py-2.5 px-6 bg-pastel-purple-600 hover:bg-pastel-purple-700 text-white font-bold text-xs rounded-full uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02]"
                  id="hero-cta-articles"
                >
                  Mulai Membaca
                </button>
                
                <button
                  onClick={() => scrollToSection('tentang-saya')}
                  className="py-2.5 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-full uppercase tracking-wider transition duration-300 shadow-sm"
                  id="hero-cta-about"
                >
                  Tentang Penulis
                </button>
              </div>

              {/* Fun stats bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-pastel-purple-200/50 max-w-sm text-left relative z-10">
                <div>
                  <span className="font-serif font-black text-xl md:text-2xl text-slate-800 block">6</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Destinasi</span>
                </div>
                <div>
                  <span className="font-serif font-black text-xl md:text-2xl text-slate-800 block">1K+</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Pembaca</span>
                </div>
                <div>
                  <span className="font-serif font-black text-xl md:text-2xl text-slate-800 block">4.8★</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Generated Visual Banner */}
            <div className="lg:col-span-12 xl:col-span-5 relative" id="hero-banner-image">
              <div className="absolute inset-0 bg-gradient-to-tr from-pastel-purple-300 to-pastel-green-300 rounded-[40px] rotate-3 scale-[1.02] opacity-30 shadow-md blur-xs -z-10" />
              <div className="relative overflow-hidden rounded-[40px] border-4 border-white shadow-xl aspect-video lg:aspect-[4/3] bg-slate-100">
                <img
                  src={travelHeroBanner}
                  alt="Scenic Pastel Travel Illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-750"
                  id="hero-banner"
                />
                
                {/* Embedded Glass badge in banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-pastel-purple-800 tracking-wider font-mono">Artikel Pilihan</span>
                    <h4 className="font-serif font-bold text-slate-800 text-xs">Sunset Damai Bukit Bendera</h4>
                  </div>
                  <button onClick={() => {
                    const penangPost = posts.find(p => p.id === 'post-1');
                    if (penangPost) setSelectedPost(penangPost);
                  }} className="text-[10px] uppercase font-bold text-white bg-pastel-purple-600 hover:bg-pastel-purple-700 py-2 px-4 rounded-full transition shadow-sm">
                    Buka
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. Main Content: Blog & Sidebar Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow" id="artikel-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Search, filter & articles grid */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search and current filters headers */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search query box */}
                <div className="relative w-full flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari artikel destinasi impian anda..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-pastel-green-500 focus:outline-none rounded-xl"
                    id="search-input-box"
                  />
                </div>

                {/* Clear / Filter indicator column */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0">
                  <div className="w-10 h-10 border border-slate-150 rounded-xl flex items-center justify-center text-slate-500 bg-white" title="Tapis Carian">
                    <Filter className="w-4 h-4" />
                  </div>
                  {/* Category quick selectors for small devices */}
                  <div className="sm:hidden flex-grow overflow-x-auto whitespace-nowrap py-1">
                    {/* Compact layout */}
                  </div>
                </div>
              </div>

              {/* Filter Active Badge row */}
              {(selectedCategory || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-50" id="active-filters">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Penapis Aktif:</span>
                  
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs bg-pastel-purple-50 text-pastel-purple-700 font-semibold border border-pastel-purple-100">
                      Kategori: {selectedCategory}
                      <button onClick={() => setSelectedCategory(null)} className="hover:text-rose-600 font-bold ml-0.5">×</button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs bg-pastel-green-50 text-pastel-green-700 font-semibold border border-pastel-green-100">
                      Kata kunci: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-rose-600 font-bold ml-0.5">×</button>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="text-[10px] font-bold text-rose-500 hover:underline uppercase"
                  >
                    Set Semula Semua
                  </button>
                </div>
              )}
            </div>

            {/* Articles Grid list */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm" id="empty-posts-result">
                <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3.5 animate-spin-slow" />
                <h3 className="font-display font-semibold text-slate-800 text-sm">Destinasi Tidak Ditemui</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Kami tidak dapat menemui sebarang catatan jurnal dengan kata kunci tersebut. Cuba cari kata kunci lain seperti "Bukit Bendera", "Pantai", atau "Kuliner".
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-1.5 rounded-xl border border-pastel-green-200 text-pastel-green-700 font-semibold text-xs hover:bg-pastel-green-50 transition"
                >
                  Tampilkan Semua
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="posts-grid">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.08, 0.4) }}
                  >
                    <BlogCard post={post} onOpen={(p) => setSelectedPost(p)} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar cards */}
          <div className="lg:col-span-4 select-none">
            <Sidebar
              author={blogAuthor}
              categories={blogCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              popularPosts={popularPosts}
              onOpenPost={(p) => setSelectedPost(p)}
            />
          </div>

        </div>
      </main>

      {/* 4. Tentang Saya Detail Landing Card */}
      <section className="py-16 bg-[#ebf7ee]/50 rounded-[40px] mx-4 md:mx-8 my-10 border-2 border-slate-950/5 shadow-xs" id="tentang-saya-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Photo frame elements */}
            <div className="md:col-span-5 relative" id="about-photo-block">
              <div className="absolute inset-0 bg-pastel-purple-200 rotate-2 scale-[1.01] rounded-[32px] -z-10" />
              <div className="relative overflow-hidden rounded-[32px] border-4 border-white shadow-lg aspect-square max-w-md mx-auto">
                <img
                  src={blogAuthor.avatar}
                  alt="Miza Rinjani Travel Gear"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Camera lens label tag */}
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md rounded-full px-4 py-2 text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-pastel-purple-300" />
                  <div>
                    <span className="text-[8px] text-slate-300 block uppercase font-bold leading-none font-mono">Gear Andalan</span>
                    <span className="text-[10px] font-bold">Fujifilm X-T4 • 35mm f/1.4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text details */}
            <div className="md:col-span-7 space-y-5" id="about-narrative-block">
              <span className="text-[10px] items-center gap-1.5 px-3.5 py-1 bg-white text-pastel-purple-700 font-bold uppercase rounded-full tracking-wider inline-flex shadow-xs font-mono border border-pastel-purple-100">
                <Sparkles className="w-3.5 h-3.5 text-pastel-purple-500" />
                Di Sebalik Lensa Kembara
              </span>
              <h2 className="font-serif font-black text-slate-900 text-2xl md:text-3xl leading-tight">
                "Kembara bukan sekadar mempamerkan destinasi, sebaliknya mencari ruang kedamaian yang baharu."
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold" id="about-intro-text">
                Rakan kembara sekalian! Saya Miza Rinjani. Menetap di kawasan bersejarah George Town, Penang, minat mendalam saya terhadap pengembaraan bermula sejak kali pertama menikmati keindahan senja di pantai Batu Ferringhi dan mendaki Bukit Bendera sewaktu bergelar mahasiswa dahulu.
              </p>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
                Bagi saya, setiap sudut di Penang menyimpan seribu satu lipatan sejarah yang mendalam. Jurnal blog <span className="font-bold text-pastel-purple-600">KembaraPastel.</span> sengaja saya kemas dalam nada warna visual pastel yang teduh. Saya ingin menyebarkan pandangan bahawa meneroka alam semula jadi serta warisan budaya Malaysia tidak perlu bising atau merosakkan, sebaliknya mempelajari kearifan lokal serta menghargai keindahan muka bumi dengan penuh santun.
              </p>

              {/* Hobby bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold font-mono uppercase tracking-wide">
                  <div className="w-6 h-6 rounded-full bg-pastel-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Eco-Tourism Advocate</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-bold font-mono uppercase tracking-wide">
                  <div className="w-6 h-6 rounded-full bg-pastel-purple-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Traditional Coffee Fan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Kontak Section with validation */}
      <section className="py-12" id="kontak-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </section>

      {/* 6. Footer section with newsletter subscribe & social hooks */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t-2 border-slate-900" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
            {/* Branding Column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-pastel-purple-600 flex items-center justify-center text-white font-serif font-black italic text-lg">
                  K
                </div>
                <span className="font-serif font-black text-white text-lg tracking-tighter uppercase">
                  Kembara<span className="text-pastel-green-500">Pastel.</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Catatan kembara penuh warna, memeluk keharmonian budaya dan keindahan landskap warisan sejarah Pulau Pinang, Malaysia.
              </p>
              <div className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} KembaraPastel. Hak Cipta Terpelihara. <br />
                Dihasilkan dengan penuh dedikasi oleh pembangun hadapan profesional.
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Navigasi Jurnal</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('beranda')} className="hover:text-pastel-green-400 transition">Utama</button></li>
                <li><button onClick={() => scrollToSection('tentang-saya')} className="hover:text-pastel-green-400 transition">Tentang Miza</button></li>
                <li><button onClick={() => scrollToSection('artikel')} className="hover:text-pastel-green-400 transition">Koleksi Artikel</button></li>
                <li><button onClick={() => scrollToSection('kontak')} className="hover:text-pastel-green-400 transition">Hubungi Kami</button></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-5 space-y-3.5">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Langgan Catatan Baharu</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dapatkan notifikasi catatan perjalanan menarik dan tip rahsia jadual perjalanan (itinerary) terus ke peti masuk e-mel anda secara percuma!
              </p>

              <form onSubmit={handleNewsletterSubscribe} className="space-y-2" id="newsletter-form">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="emelanda@gmail.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow text-xs py-2 px-3 bg-slate-800 border border-slate-700 focus:border-pastel-green-500 focus:outline-none rounded-xl text-white"
                    id="newsletter-email"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-pastel-green-600 text-white hover:bg-pastel-green-700 transition font-semibold text-xs rounded-xl flex items-center justify-center shrink-0"
                    id="newsletter-subscribe-btn"
                  >
                    Langgan
                  </button>
                </div>
                
                {newsletterError && <p className="text-[10px] text-rose-400 font-semibold">{newsletterError}</p>}
                
                {newsletterSubscribed && (
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Berjaya melanggan! Selamat menyertai perjalanan kembara Miza.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>Melancong dengan sihat, sokong usaha pemeliharaan kawasan pelancongan bebas sampah.</p>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Media Sosial Miza</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <a href="https://instagram.com" className="hover:text-white transition">Instagram</a>
              <a href="https://twitter.com" className="hover:text-white transition">Twitter</a>
              <a href="https://youtube.com" className="hover:text-white transition">YouTube</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 7. Floating details modal for reading active blog */}
      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onLike={handleLikePost}
        onAddComment={handleAddComment}
      />

      {/* 8. Sticky Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-tr from-pastel-green-500 to-pastel-purple-500 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            id="back-to-top-btn"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

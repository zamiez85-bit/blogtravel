import React, { useState } from 'react';
import { Sparkles, Route, MapPin, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Recommendation {
  title: string;
  location: string;
  desc: string;
  tag: string;
}

const recommendations: Record<string, Recommendation> = {
  santai: {
    title: "Pantai Batu Ferringhi",
    location: "George Town, Penang",
    desc: "Menikmati hembusan angin sepoi-sepoi di Selat Melaka di bawah pohon kelapa rendang sepanjang pantai pasir putih yang menenangkan.",
    tag: "Pantai"
  },
  petualang: {
    title: "The Habitat @ Bukit Bendera",
    location: "Penang, Malaysia",
    desc: "Melihat panorama alam 360 darjah seluruh Pulau Pinang dari puncak tertinggi berselimut kabut sejuk.",
    tag: "Gunung"
  },
  budaya: {
    title: "Kuil Buddha Kek Lok Si",
    location: "Air Itam, Penang",
    desc: "Menghayati keindahan Pagoda Ban Po Thar, sebuah gabungan seni bina harmoni tiga negara Asia Tenggara.",
    tag: "Budaya"
  },
  kuliner: {
    title: "Char Kway Teow George Town",
    location: "Pinang Road, Penang",
    desc: "Eksplorasi rasa mi goreng udang arang warisan leluhur dengan aroma wajan besi (Wok Hei) yang legendaris.",
    tag: "Kuliner"
  }
};

interface MoodGeneratorProps {
  onSelectCategory: (category: any) => void;
}

export default function MoodGenerator({ onSelectCategory }: MoodGeneratorProps) {
  const [mood, setMood] = useState<string | null>(null);

  const moods = [
    { id: 'santai', label: '🏖️ Santai & Rileks', color: 'hover:bg-pastel-green-100 hover:text-pastel-green-700' },
    { id: 'petualang', label: '🧗 Adrenalin & Trekking', color: 'hover:bg-pastel-purple-100 hover:text-pastel-purple-700' },
    { id: 'budaya', label: '⛩️ Seni & Budaya', color: 'hover:bg-amber-50 hover:text-amber-700' },
    { id: 'kuliner', label: '🍜 Kuliner Penang', color: 'hover:bg-rose-50 hover:text-rose-700' },
  ];

  return (
    <div className="bg-white rounded-[32px] p-6 border-2 border-slate-950/5 shadow-xs relative overflow-hidden" id="mood-generator">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pastel-green-100 to-transparent opacity-50 rounded-bl-full pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-pastel-purple-500 animate-pulse" />
        <h3 className="font-serif font-black text-slate-900 text-base">Cadangan Segera</h3>
      </div>
      
      <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
        Ingin bercuti tetapi buntu? Pilih suasana hati anda sekarang, dan dapatkan cadangan terbaik daripada Miza:
      </p>

      <div className="grid grid-cols-1 gap-2 mb-4">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`w-full text-left py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-between border ${
              mood === m.id
                ? 'bg-pastel-purple-600 text-white border-pastel-purple-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-200 ' + m.color
            }`}
            id={`mood-btn-${m.id}`}
          >
            <span>{m.label}</span>
            <Route className="w-4 h-4 opacity-70" />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mood && recommendations[mood] && (
          <motion.div
            key={mood}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-pastel-purple-50 rounded-2xl border border-pastel-purple-100/50"
            id="mood-result"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-pastel-purple-700 mb-1 font-mono uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>{recommendations[mood].location}</span>
            </div>
            <h4 className="font-serif font-bold text-slate-900 text-sm mb-1.5 leading-tight hover:text-pastel-purple-600 cursor-pointer" onClick={() => onSelectCategory(recommendations[mood].tag)}>
              {recommendations[mood].title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {recommendations[mood].desc}
            </p>
            <button
              onClick={() => onSelectCategory(recommendations[mood].tag)}
              className="w-full text-center py-2 px-4 bg-white hover:bg-pastel-purple-100 border border-pastel-purple-200 text-pastel-purple-700 font-bold text-[10px] rounded-full uppercase tracking-wider transition-all flex items-center justify-center gap-1"
              id="mood-action"
            >
              <Smile className="w-3.5 h-3.5" />
              Lihat Kategori {recommendations[mood].tag}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

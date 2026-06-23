import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Nama penuh wajib diisi.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Alamat e-mel wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Alamat e-mel tidak sah.';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subjek mesej wajib diisi.';
    if (!formData.message.trim()) {
      tempErrors.message = 'Kandungan mesej tidak boleh dibiarkan kosong.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Kandungan mesej sekurang-kurangnya 10 aksara.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div className="py-12 px-6 md:px-8 bg-white/70 rounded-[40px] border-2 border-slate-950/5 shadow-xs" id="kontak-section-box">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold text-white bg-pastel-purple-600 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono">
            Hubungi Miza
          </span>
          <h2 className="font-serif font-black text-slate-900 text-2xl md:text-3xl mt-4 mb-3">
            Idea Kolaborasi & Sapaan Hangat
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Mempunyai cadangan destinasi, pertanyaan tentang kembara, atau jalinan kerjasama liputan pelancongan? Sila hantarkan mesej anda kepada kami!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick info columns */}
          <div className="md:col-span-1 space-y-5">
            <h3 className="font-serif font-black text-slate-900 text-sm tracking-wide">Informasi Kontak</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2.5 items-center">
                <div className="w-9 h-9 rounded-full bg-pastel-purple-50 flex items-center justify-center text-pastel-purple-600 shrink-0 border border-pastel-purple-100">
                   <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-mono">E-mel Miza</span>
                  <a href="mailto:miza@kembarapastel.com" className="text-xs font-bold text-slate-700 hover:text-pastel-purple-600 transition duration-300">
                    miza@kembarapastel.com
                  </a>
                </div>
              </div>

              <div className="flex gap-2.5 items-center">
                <div className="w-9 h-9 rounded-full bg-pastel-purple-50 flex items-center justify-center text-pastel-purple-600 shrink-0 border border-pastel-purple-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Asal Domisili</span>
                  <span className="text-xs font-bold text-slate-700">
                    Penang, Malaysia
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 items-center">
                <div className="w-9 h-9 rounded-full bg-pastel-purple-50 flex items-center justify-center text-pastel-purple-600 shrink-0 border border-pastel-purple-100">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-mono">WhatsApp</span>
                  <span className="text-xs font-bold text-slate-700">
                    +60 12-3456 789
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-pastel-purple-50 rounded-2xl border border-pastel-purple-100 mt-4">
              <span className="text-[9px] font-bold text-pastel-purple-700 uppercase tracking-widest block mb-1 font-mono">Mitra Kerja Sama</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Terbuka untuk kolaborasi pariwisata Penang & Malaysia, sponsor resort ramah lingkungan, serta ulasan mendalam kuliner lokal istimewa.
              </p>
            </div>
          </div>

          {/* Form / Success Cards */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-[32px] p-6 border-2 border-slate-950/5 shadow-xs min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    id="contact-form-el"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                          Nama Penuh
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="cth. Budiman"
                          className={`w-full text-xs py-2.5 px-4 border rounded-full focus:outline-none transition-all ${
                            errors.name ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-pastel-purple-500 bg-slate-50/50 focus:bg-white'
                          }`}
                          id="contact-name"
                        />
                        {errors.name && <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.name}</p>}
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                          Alamat E-mel
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="cth. budi@gmail.com"
                          className={`w-full text-xs py-2.5 px-4 border rounded-full focus:outline-none transition-all ${
                            errors.email ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-pastel-purple-500 bg-slate-50/50 focus:bg-white'
                          }`}
                          id="contact-email"
                        />
                        {errors.email && <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject input */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                        Subjek Mesej
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="cth. Tawaran Kerjasama Kembara & Liputan"
                        className={`w-full text-xs py-2.5 px-4 border rounded-full focus:outline-none transition-all ${
                          errors.subject ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-pastel-purple-500 bg-slate-50/50 focus:bg-white'
                        }`}
                        id="contact-subject"
                      />
                      {errors.subject && <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.subject}</p>}
                    </div>

                    {/* Message input */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                        Kandungan Mesej Ringkas
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan cadangan atau mesej anda di sini..."
                        className={`w-full text-xs py-3 px-4 border rounded-2xl focus:outline-none transition-all ${
                          errors.message ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-pastel-purple-500 bg-slate-50/50 focus:bg-white'
                        }`}
                        id="contact-message"
                      />
                      {errors.message && <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto py-2.5 px-6 bg-pastel-purple-600 hover:bg-pastel-purple-700 disabled:opacity-75 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-md cursor-pointer transition flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                      id="contact-submit-el"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                          <span>Menghantar Mesej...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Hantar Mesej Sekarang</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center py-6 flex flex-col items-center"
                    id="contact-success-card"
                  >
                    <CheckCircle className="w-12 h-12 text-pastel-purple-500 mb-4 animate-bounce" />
                    <h3 className="font-serif font-black text-slate-900 text-lg mb-1">
                      Mesej Berjaya Dihantar!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed font-medium">
                      Sapaan hangat anda telah mendarat dengan selamat di peti masuk e-mel Miza Rinjani. Kami akan segera membalas mesej anda secepat mungkin dalam tempoh 1x24 jam. Terima kasih!
                    </p>
                    <button
                      onClick={handleReset}
                      className="py-2 px-6 rounded-full border border-pastel-purple-200 hover:bg-pastel-purple-50 text-pastel-purple-700 font-bold text-xs uppercase tracking-wider transition duration-300"
                      id="contact-reset-btn"
                    >
                      Hantar Mesej Baharu
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

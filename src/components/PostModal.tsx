import React, { useState } from 'react';
import { X, Heart, MessageCircle, Calendar, Clock, Send, Share2, CornerDownRight } from 'lucide-react';
import { BlogPost, Comment } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, commentAuthor: string, commentText: string) => void;
}

export default function PostModal({ post, onClose, onLike, onAddComment }: PostModalProps) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleLikeClick = () => {
    if (!hasLiked) {
      onLike(post.id);
      setHasLiked(true);
    }
  };

  const handleShareClick = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed, using fallback:", err);
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Fallback clipboard copy failed:", fallbackErr);
      }
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) {
      setErrorMsg('Nama dan kandungan komen wajib diisi!');
      return;
    }
    
    onAddComment(post.id, commentAuthor.trim(), commentText.trim());
    setCommentText('');
    setErrorMsg('');
  };

  // Convert custom bolding and section markdown elements to clean HTML manually
  const parseContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('###')) {
        return (
          <h3 key={index} className="font-display font-bold text-slate-800 text-lg mt-6 mb-3 border-l-4 border-pastel-green-500 pl-3">
            {paragraph.replace('###', '').trim()}
          </h3>
        );
      }
      if (paragraph.startsWith('**')) {
        return (
          <div key={index} className="bg-pastel-green-50 border border-pastel-green-100 p-4 rounded-xl my-4 text-xs leading-relaxed text-slate-700">
            {paragraph.split('\n').map((line, lidx) => (
              <p key={lidx} className={lidx > 0 ? 'mt-1.5' : ''}>
                {line.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        );
      }
      if (paragraph.startsWith('-')) {
        return (
          <ul key={index} className="list-disc pl-5 my-3 text-xs leading-relaxed text-slate-600 space-y-1.5">
            {paragraph.split('\n').map((line, lidx) => (
              <li key={lidx}>{line.replace(/^-\s*/, '')}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id={`post-modal-${post.id}`}>
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Outer Container */}
        <div className="flex min-h-full items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[85vh] md:h-[80vh] border border-slate-100"
          >
            {/* Close button top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80 hover:scale-105 transition-all shadow-md"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left part: Banner image and responsive metadata */}
            <div className="w-full md:w-1/2 h-44 md:h-full relative bg-slate-100">
              <img
                src={post.imageUrl}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pastel-green-500 text-white uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h2 className="font-display font-extrabold text-white text-base md:text-2xl leading-tight mb-3">
                  {post.title}
                </h2>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-slate-300 text-[11px] font-semibold">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right part: Scrollable Reading & Interaction panels */}
            <div className="w-full md:w-1/2 flex flex-col h-[calc(85vh-11rem)] md:h-full bg-white">
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Author Card row */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100">
                      <img src={post.author.avatar} alt={post.author.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-none">{post.author.name}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Penulis Blog / Pengembara</span>
                    </div>
                  </div>
                  
                  {/* Share/Like Floating bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShareClick}
                      className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition"
                      title="Salin Pautan Blog"
                      id="share-post-btn"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-[10px] text-pastel-green-600 font-semibold absolute -mt-8 bg-white px-2 py-1 border border-slate-100 rounded shadow-sm">Disalin!</span>}

                    <button
                      onClick={handleLikeClick}
                      className={`py-1.5 px-3 rounded-lg border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                        hasLiked
                          ? 'bg-rose-50 border-rose-100 text-rose-600'
                          : 'border-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-500'
                      }`}
                      id="like-post-btn"
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                  </div>
                </div>

                {/* Main Article Text */}
                <article className="prose max-w-none">
                  {parseContent(post.content)}
                </article>

                {/* Comment Section separator */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-800 font-display font-bold text-sm mb-4">
                    <MessageCircle className="w-4.5 h-4.5 text-pastel-purple-500" />
                    <span>Komen ({post.comments.length})</span>
                  </div>

                  {/* Comments lists */}
                  <div className="space-y-3 mb-6">
                    {post.comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">
                        Belum ada komen. Jadilah yang pertama memberikan inspirasi!
                      </p>
                    ) : (
                      post.comments.map((comment) => (
                        <div key={comment.id} className="p-3.5 bg-slate-50 rounded-2xl flex gap-2.5 items-start">
                          <div className="w-7 h-7 rounded-full bg-pastel-purple-100 flex items-center justify-center text-[10px] font-bold text-pastel-purple-700 shrink-0">
                            {comment.author.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-slate-800">{comment.author}</span>
                              <span className="text-[9px] text-slate-400 font-medium">{comment.date}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comments Form */}
                  <form onSubmit={handleSubmitComment} className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Tulis Komen Anda</span>
                    
                    {errorMsg && <p className="text-[10px] text-rose-500 font-semibold">{errorMsg}</p>}
                    
                    <div className="grid grid-cols-1 gap-2.5">
                      <input
                        type="text"
                        placeholder="Nama Penuh"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-white border border-slate-100 rounded-xl focus:border-pastel-green-500 focus:outline-none"
                        id="comment-author-input"
                      />
                      <textarea
                        rows={2}
                        placeholder="Ulasan atau pertanyaan tentang destinasi ini..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-white border border-slate-100 rounded-xl focus:border-pastel-green-500 focus:outline-none resize-none"
                        id="comment-text-input"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-gradient-to-r from-pastel-green-500 to-pastel-purple-500 text-white font-semibold text-xs rounded-xl shadow hover:opacity-95 transition flex items-center justify-center gap-1.5"
                      id="comment-submit-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Hantar Komen
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

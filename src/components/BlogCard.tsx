import React from 'react';
import { Heart, MessageCircle, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { BlogPost, Category } from '../types';
import { motion } from 'motion/react';

interface BlogCardProps {
  post: BlogPost;
  onOpen: (post: BlogPost) => void;
}

const getCategoryStyles = (category: Category) => {
  switch (category) {
    case 'Gunung':
      return 'bg-pastel-green-50 text-pastel-green-700 border-pastel-green-200';
    case 'Pantai':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Kuliner':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Budaya':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Petualangan':
      return 'bg-pastel-purple-50 text-pastel-purple-700 border-pastel-purple-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export default function BlogCard({ post, onOpen }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onOpen(post)}
      className="bg-white rounded-[32px] overflow-hidden border-2 border-slate-950/5 shadow-xs hover:shadow-lg hover:border-pastel-purple-200 transition-all duration-300 flex flex-col h-full cursor-pointer group"
      id={`blog-card-${post.id}`}
    >
      {/* Post Image Container */}
      <div className="relative overflow-hidden aspect-[1.4] bg-slate-100">
        <img
          src={post.imageUrl}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          id={`blog-img-${post.id}`}
        />
        <div className="absolute top-4 left-4 flex gap-1.5 z-10">
          <span
            className={`px-3.5 py-1 text-[10px] font-bold rounded-full border shadow-xs uppercase tracking-wider transition-all ${getCategoryStyles(
              post.category
            )}`}
          >
            {post.category}
          </span>
        </div>
        {/* Hover overlay indicator */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
          <span className="text-xs font-semibold">Baca Artikel</span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Post Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date & Read time */}
        <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold mb-2.5 uppercase tracking-wider font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-pastel-purple-200" />
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-serif font-black text-slate-900 text-lg md:text-xl mb-2.5 leading-snug group-hover:text-pastel-purple-600 transition-colors duration-300 line-clamp-2"
          id={`blog-title-${post.id}`}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-500 line-clamp-3 mb-5 leading-relaxed flex-grow">
          {post.summary}
        </p>

        {/* Footer Metrics */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src={post.author.avatar || "https://picsum.photos/50"}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-bold text-slate-700">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              className="flex items-center gap-1 hover:text-rose-500 transition-colors font-mono"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(post);
              }}
              id={`blog-like-btn-${post.id}`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center gap-1 font-mono">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

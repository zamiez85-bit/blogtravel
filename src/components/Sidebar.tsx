import React from 'react';
import { Instagram, Twitter, Youtube, Github, BookOpen, Heart, MessageCircle } from 'lucide-react';
import { Author, BlogPost, Category } from '../types';
import MoodGenerator from './MoodGenerator';

interface SidebarProps {
  author: Author;
  categories: { name: Category; count: number }[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  popularPosts: BlogPost[];
  onOpenPost: (post: BlogPost) => void;
}

export default function Sidebar({
  author,
  categories,
  selectedCategory,
  onSelectCategory,
  popularPosts,
  onOpenPost,
}: SidebarProps) {
  return (
    <aside className="space-y-6" id="blog-sidebar">
      {/* 1. Author Profile Card */}
      <div className="bg-white rounded-[32px] p-6 border-2 border-slate-950/5 shadow-xs relative overflow-hidden" id="author-card">
        {/* Subtle decorative background gradient blob */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-pastel-purple-500" />
        
        <div className="flex flex-col items-center text-center mt-3">
          {/* Avatar frame */}
          <div className="relative w-20 h-20 rounded-full p-1 bg-pastel-purple-200 shadow-xs">
            <img
              src={author.avatar}
              alt={author.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </div>

          <h3 className="font-serif font-black text-slate-900 text-lg mt-3 mb-0.5">{author.name}</h3>
          <span className="text-[9px] font-bold text-white bg-pastel-purple-600 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            Travel Blogger
          </span>

          <p className="text-xs text-slate-500 mt-3 mb-5 leading-relaxed font-medium">
            {author.bio}
          </p>

          {/* Socials Grid */}
          <div className="flex items-center gap-3">
            {author.socials.instagram && (
              <a
                href={author.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 hover:border-pastel-green-500 flex items-center justify-center text-slate-500 hover:text-pastel-green-600 hover:bg-pastel-green-50 transition-all duration-305"
                id="social-ig"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {author.socials.twitter && (
              <a
                href={author.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 hover:border-pastel-purple-500 flex items-center justify-center text-slate-500 hover:text-pastel-purple-600 hover:bg-pastel-purple-50 transition-all duration-305"
                id="social-tw"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {author.socials.youtube && (
              <a
                href={author.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 hover:border-amber-400 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-305"
                id="social-yt"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {author.socials.github && (
              <a
                href={author.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 hover:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-305"
                id="social-git"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Mood recommendations widget */}
      <MoodGenerator onSelectCategory={(cat) => onSelectCategory(cat as Category)} />

      {/* 3. Categories Selection List */}
      <div className="bg-white rounded-[32px] p-6 border-2 border-slate-950/5 shadow-xs" id="categories-sidebar-widget">
        <div className="flex items-center gap-1.5 mb-4">
          <BookOpen className="w-4.5 h-4.5 text-pastel-purple-600" />
          <h3 className="font-serif font-black text-slate-950 text-base">Kategori</h3>
        </div>

        <div className="space-y-1.5 flex flex-col">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left py-2 px-3.5 rounded-full text-xs font-bold flex items-center justify-between transition-all font-mono uppercase tracking-wider border ${
              selectedCategory === null
                ? 'bg-pastel-purple-600 border-pastel-purple-600 text-white shadow-xs'
                : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-800'
            }`}
            id="cat-button-all"
          >
            <span>Semua Destinasi</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
              selectedCategory === null ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {categories.reduce((acc, current) => acc + current.count, 0) - 2}
            </span>
          </button>

          {/* Filtering buttons */}
          {categories.filter(c => ['Pantai', 'Gunung', 'Kuliner', 'Budaya', 'Petualangan'].includes(c.name)).map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full text-left py-2 px-3.5 rounded-full text-xs font-bold flex items-center justify-between transition-all font-mono uppercase tracking-wider border ${
                selectedCategory === cat.name
                  ? 'bg-pastel-purple-600 border-pastel-purple-600 text-white shadow-xs'
                  : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
              id={`cat-button-${cat.name}`}
            >
              <span>{cat.name}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                selectedCategory === cat.name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Curated Popular Articles */}
      <div className="bg-white rounded-[32px] p-6 border-2 border-slate-950/5 shadow-xs" id="popular-posts-widget">
        <h3 className="font-serif font-black text-slate-900 text-base mb-4">Artikel Paling Popular</h3>

        <div className="space-y-4">
          {popularPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="group flex gap-3 cursor-pointer items-center"
              id={`popular-item-${post.id}`}
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
              <div className="space-y-0.5 min-w-0 flex-grow">
                <span className="text-[8px] font-bold text-pastel-purple-600 tracking-wider block uppercase font-mono">
                  {post.category}
                </span>
                <h4 className="font-serif font-bold text-slate-900 text-xs leading-tight group-hover:text-pastel-purple-600 line-clamp-2 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2.5 text-slate-400 text-[9px] font-mono mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <Heart className="w-3 h-3 text-rose-500 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

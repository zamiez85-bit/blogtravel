export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  socials: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    github?: string;
  };
}

export type Category = 'Gunung' | 'Pantai' | 'Kuliner' | 'Budaya' | 'Petualangan';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown or detailed text
  category: Category;
  imageUrl: string;
  date: string;
  readTime: string;
  author: Author;
  likes: number;
  comments: Comment[];
  featured?: boolean;
}

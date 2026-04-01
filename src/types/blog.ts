export interface BlogPost {
  slug: string;
  title: string;
  titleVI?: string;
  titleUS?: string;
  titleUK?: string;
  excerpt: string;
  excerptVI?: string;
  excerptUS?: string;
  excerptUK?: string;
  content: string;
  contentVI?: string;
  contentUS?: string;
  contentUK?: string;
  coverImage: string;
  category: string;
  categoryVI?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    roleVI?: string;
  };
  date: string;
  readTime: number;
  tags: string[];
  tagsVI?: string[];
}

import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogForm from '@/features/admin/components/BlogForm';
import { useRouter } from 'next/router';
import { postsData } from '@/data/posts';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/domains/blog/blog.types';

export default function AdminBlogEditPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const found = postsData.find(p => p.slug === slug);
      if (found) {
        setPost(found);
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Edit {post?.title || 'Post'} | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        {post ? (
          <BlogForm initialValues={post} isEdit />
        ) : (
          <div className="p-8 text-center text-gray-500">Post not found</div>
        )}
      </AdminLayout>
    </>
  );
}

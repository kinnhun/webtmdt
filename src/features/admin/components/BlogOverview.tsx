import React from 'react';
import { Card, Tag, Table, Progress } from 'antd';
import {
  FileTextOutlined,
  FolderOutlined,
  EyeOutlined,
  RiseOutlined,
  EditOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { postsData, blogCategories } from '@/data/posts';
import type { BlogPost } from '@/domains/blog/blog.types';

/* ── Stat Card ── */
function StatCard({ icon, label, value, color, trend }: { icon: React.ReactNode; label: string; value: string | number; color: string; trend?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-md" style={{ borderColor: 'hsl(var(--navy)/0.08)', background: '#fff' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--navy)/0.45)' }}>{label}</p>
          <p className="font-display text-2xl font-bold m-0" style={{ color: 'hsl(var(--navy-deep))' }}>{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1.5">
              <RiseOutlined className="text-xs" style={{ color: '#22c55e' }} />
              <span className="font-body text-[11px] font-semibold" style={{ color: '#22c55e' }}>{trend}</span>
            </div>
          )}
        </div>
        <div className="w-11 h-11 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.04]" style={{ backgroundColor: color }} />
    </div>
  );
}

/* ── Main Component ── */
export default function BlogOverview() {
  const router = useRouter();
  const posts = postsData;
  const categories = blogCategories.filter((c) => c !== 'All');

  // Compute stats
  const totalPosts = posts.length;
  const totalCategories = categories.length;
  const totalTags = [...new Set(posts.flatMap((p) => p.tags || []))].length;
  const totalAuthors = [...new Set(posts.map((p) => p.author?.name).filter(Boolean))].length;

  // Category breakdown
  const categoryStats = categories.map((cat) => {
    const count = posts.filter((p) => p.category === cat).length;
    return { category: cat, count, percentage: Math.round((count / totalPosts) * 100) };
  }).sort((a, b) => b.count - a.count);

  // Recent posts for quick table
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentColumns = [
    {
      title: 'Cover',
      dataIndex: 'coverImage',
      key: 'coverImage',
      render: (img: string) => (
        <img src={img} alt="cover" className="w-14 h-9 rounded object-cover border border-gray-100" />
      ),
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: BlogPost) => (
        <div className="cursor-pointer" onClick={() => router.push(`/admin/blog/${record.slug}`)}>
          <div className="font-semibold text-sm hover:text-orange transition-colors" style={{ color: 'hsl(var(--navy-deep))' }}>{text}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="purple" className="text-[11px]">{category}</Tag>,
      width: 130,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <CalendarOutlined className="text-[10px]" />
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
      width: 130,
    },
    {
      title: '',
      key: 'action',
      render: (_: unknown, record: BlogPost) => (
        <button
          onClick={() => router.push(`/admin/blog/${record.slug}`)}
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
        >
          <EditOutlined className="text-[11px]" /> Edit
        </button>
      ),
      width: 70,
    },
  ];

  // Colors for categories
  const catColors = ['#f97316', '#8b5cf6', '#06b6d4', '#22c55e', '#ec4899', '#eab308'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl m-0" style={{ color: 'hsl(var(--navy-deep))' }}>
            Blog Overview
          </h2>
          <p className="text-sm m-0 mt-0.5" style={{ color: 'hsl(var(--navy)/0.5)' }}>
            Dashboard & analytics for your blog content
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FileTextOutlined />}
          label="Total Posts"
          value={totalPosts}
          color="hsl(var(--orange))"
          trend="+2 this month"
        />
        <StatCard
          icon={<FolderOutlined />}
          label="Categories"
          value={totalCategories}
          color="#8b5cf6"
        />
        <StatCard
          icon={<EyeOutlined />}
          label="Unique Tags"
          value={totalTags}
          color="#06b6d4"
        />
        <StatCard
          icon={<EditOutlined />}
          label="Authors"
          value={totalAuthors}
          color="#22c55e"
        />
      </div>

      {/* Two column layout: Category breakdown + Recent posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <Card
          className="shadow-sm rounded-xl border"
          styles={{ header: { borderBottom: '1px solid hsl(var(--navy)/0.06)', padding: '16px 20px' }, body: { padding: '16px 20px' } }}
          style={{ borderColor: 'hsl(var(--navy)/0.08)' }}
          title={
            <span className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>
              <FolderOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
              Posts by Category
            </span>
          }
        >
          <div className="space-y-4">
            {categoryStats.map((cs, i) => (
              <div key={cs.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-sm font-medium" style={{ color: 'hsl(var(--navy-deep))' }}>{cs.category}</span>
                  <span className="font-body text-xs font-semibold" style={{ color: 'hsl(var(--navy)/0.5)' }}>{cs.count} post{cs.count !== 1 ? 's' : ''}</span>
                </div>
                <Progress
                  percent={cs.percentage}
                  showInfo={false}
                  strokeColor={catColors[i % catColors.length]}
                  trailColor="hsl(var(--navy)/0.04)"
                  size="small"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Posts */}
        <Card
          className="shadow-sm rounded-xl border lg:col-span-2"
          styles={{ header: { borderBottom: '1px solid hsl(var(--navy)/0.06)', padding: '16px 20px' }, body: { padding: 0 } }}
          style={{ borderColor: 'hsl(var(--navy)/0.08)' }}
          title={
            <span className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>
              <CalendarOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
              Recent Posts
            </span>
          }
          extra={
            <button
              onClick={() => router.push('/admin/blog/manage')}
              className="text-xs font-medium hover:underline transition-colors"
              style={{ color: 'hsl(var(--orange))' }}
            >
              View All →
            </button>
          }
        >
          <Table
            columns={recentColumns}
            dataSource={recentPosts.map((p, i) => ({ ...p, key: p.slug || i }))}
            pagination={false}
            size="small"
            scroll={{ x: 500 }}
          />
        </Card>
      </div>

      {/* Tags Cloud */}
      <Card
        className="shadow-sm rounded-xl border"
        styles={{ header: { borderBottom: '1px solid hsl(var(--navy)/0.06)', padding: '16px 20px' }, body: { padding: '16px 20px' } }}
        style={{ borderColor: 'hsl(var(--navy)/0.08)' }}
        title={
          <span className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>
            Popular Tags
          </span>
        }
      >
        <div className="flex flex-wrap gap-2">
          {[...new Set(posts.flatMap((p) => p.tags || []))].map((tag) => {
            const count = posts.filter((p) => p.tags?.includes(tag)).length;
            return (
              <Tag key={tag} className="rounded-full px-3 py-0.5 text-xs font-medium border" style={{ borderColor: 'hsl(var(--navy)/0.1)', color: 'hsl(var(--navy)/0.65)' }}>
                #{tag} <span className="ml-1 text-[10px] font-semibold" style={{ color: 'hsl(var(--orange))' }}>({count})</span>
              </Tag>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

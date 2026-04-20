import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Badge, Typography, Tabs, Tooltip, Spin, Empty, Timeline, Progress } from 'antd';
import {
  InboxOutlined, TeamOutlined, AlertOutlined, ClockCircleOutlined,
  CheckCircleOutlined, ExclamationCircleOutlined, UserOutlined,
  ArrowUpOutlined, WarningOutlined, ThunderboltOutlined,
  FieldTimeOutlined, SafetyCertificateOutlined, FireOutlined,
  EyeOutlined, SyncOutlined
} from '@ant-design/icons';
import { format, formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useInquiryDashboard } from '@/domains/inquiry';
import type {
  StaffPerformance, CriticalCaseItem, InquiryActivityItem,
  DashboardRecentInquiry, DashboardDayItem
} from '@/domains/inquiry';

const { Text, Title } = Typography;

// ===== Helpers =====
function formatMinutes(minutes: number, t: any): string {
  if (minutes === 0) return t('admin.inquiryDashboard.time.na');
  if (minutes < 60) return t('admin.inquiryDashboard.time.minutes', { count: minutes });
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h < 24) return m > 0 ? t('admin.inquiryDashboard.time.hoursMins', { h, m }) : t('admin.inquiryDashboard.time.hours', { count: h });
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return rh > 0 ? t('admin.inquiryDashboard.time.daysHours', { d, h: rh }) : t('admin.inquiryDashboard.time.days', { count: d });
}

function getLoadStatus(load: number, t: any): { label: string; color: string } {
  if (load === 0) return { label: t('admin.inquiryDashboard.loadStatus.free'), color: '#52c41a' };
  if (load <= 5) return { label: t('admin.inquiryDashboard.loadStatus.normal'), color: '#1890ff' };
  if (load <= 10) return { label: t('admin.inquiryDashboard.loadStatus.busy'), color: '#faad14' };
  return { label: t('admin.inquiryDashboard.loadStatus.overloaded'), color: '#ff4d4f' };
}

function getActionLabel(action: string, t: any): { text: string; color: string } {
  const map: Record<string, { text: string; color: string }> = {
    created: { text: t('admin.inquiryDashboard.actions.created'), color: '#1890ff' },
    assigned: { text: t('admin.inquiryDashboard.actions.assigned'), color: '#722ed1' },
    accepted: { text: t('admin.inquiryDashboard.actions.accepted'), color: '#52c41a' },
    rejected: { text: t('admin.inquiryDashboard.actions.rejected'), color: '#ff4d4f' },
    status_changed: { text: t('admin.inquiryDashboard.actions.status_changed'), color: '#fa8c16' },
    note_updated: { text: t('admin.inquiryDashboard.actions.note_updated'), color: '#8c8c8c' },
    resolved: { text: t('admin.inquiryDashboard.actions.resolved'), color: '#52c41a' },
    closed: { text: t('admin.inquiryDashboard.actions.closed'), color: '#595959' },
    unassigned: { text: t('admin.inquiryDashboard.actions.unassigned'), color: '#faad14' },
  };
  return map[action] || { text: action, color: '#8c8c8c' };
}

// ===== Mini Bar Chart (CSS-only) =====
function MiniBarChart({ data, maxHeight = 80, t }: { data: DashboardDayItem[]; maxHeight?: number; t: any }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.created, d.resolved)), 1);
  return (
    <div className="flex items-end justify-between w-full relative border-b border-gray-100 pb-2">
      {data.map((d, i) => {
        const createdH = (d.created / maxVal) * maxHeight;
        const resolvedH = (d.resolved / maxVal) * maxHeight;
        const dayLabel = format(new Date(d.date), 'dd/MM');
        return (
          <Tooltip key={i} title={t('admin.inquiryDashboard.tooltip.barChart', { day: dayLabel, created: d.created, resolved: d.resolved })}>
            <div className="flex flex-col items-center flex-1 group cursor-pointer hover:bg-gray-50/50 rounded-lg pt-2 transition-colors">
              <div className="flex items-end gap-[2px] sm:gap-1 justify-center w-full" style={{ height: maxHeight }}>
                <div
                  className="w-2.5 sm:w-3.5 rounded-t-[2px] transition-all duration-300 group-hover:brightness-110 shadow-sm"
                  style={{ height: Math.max(createdH, 2), backgroundColor: 'hsl(var(--orange))' }}
                />
                <div
                  className="w-2.5 sm:w-3.5 rounded-t-[2px] transition-all duration-300 group-hover:brightness-110 shadow-sm"
                  style={{ height: Math.max(resolvedH, 2), backgroundColor: '#52c41a' }}
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-2 pb-1 font-medium">{dayLabel}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

// ===== KPI Card =====
function KPICard({
  title, value, icon, color, bgColor, highlight
}: {
  title: string; value: number | string; icon: React.ReactNode;
  color: string; bgColor: string; highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${highlight ? 'ring-2 ring-red-200 animate-pulse-slow' : ''}`}
      style={{ borderColor: `${color}20`, backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: `${color}99` }}>
          {title}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold font-display" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function InquiryDashboard() {
  const { t } = useTranslation();
  const { data, isLoading } = useInquiryDashboard();
  const [critTab, setCritTab] = useState('unassigned');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" description={t('admin.inquiryDashboard.loading')} />
      </div>
    );
  }

  if (!data) {
    return <Empty description={t('admin.inquiryDashboard.loadError')} />;
  }

  const { summary, byCategory, byStatus, byDay, staffPerformance, criticalCases, recentActivity, recentInquiries, responseMetrics } = data;

  const maxCategoryCount = Math.max(...byCategory.map(c => c.count), 1);

  const critCounts = {
    unassigned: criticalCases.unassigned.length,
    waitingAccept: criticalCases.waitingAccept.length,
    overdue: criticalCases.overdue.length,
    stale: criticalCases.stale.length,
  };
  const totalCritical = critCounts.unassigned + critCounts.waitingAccept + critCounts.overdue + critCounts.stale;

  // ===== Staff Performance Columns =====
  const staffColumns = [
    {
      title: t('admin.inquiryDashboard.staffColumns.staff'),
      key: 'name',
      render: (_: unknown, r: StaffPerformance) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: getLoadStatus(r.currentLoad, t).color }}>
            {r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-sm">{r.name}</div>
            <div className="text-[10px] text-gray-400">{r.role}</div>
          </div>
        </div>
      ),
    },
    { title: t('admin.inquiryDashboard.staffColumns.assigned'), dataIndex: 'assigned', key: 'assigned', align: 'center' as const, width: 80 },
    { title: t('admin.inquiryDashboard.staffColumns.inProgress'), dataIndex: 'inProgress', key: 'inProgress', align: 'center' as const, width: 90 },
    { title: t('admin.inquiryDashboard.staffColumns.resolved'), dataIndex: 'resolved', key: 'resolved', align: 'center' as const, width: 80 },
    {
      title: t('admin.inquiryDashboard.staffColumns.overdue'), dataIndex: 'overdue', key: 'overdue', align: 'center' as const, width: 80,
      render: (v: number) => v > 0 ? <span className="text-red-500 font-bold">{v}</span> : <span className="text-gray-300">0</span>,
    },
    {
      title: t('admin.inquiryDashboard.staffColumns.frt'),
      key: 'frt',
      align: 'center' as const,
      width: 90,
      render: (_: unknown, r: StaffPerformance) => (
        <span className={r.avgFirstResponseMinutes > 60 ? 'text-orange-500 font-semibold' : 'text-gray-600'}>
          {formatMinutes(r.avgFirstResponseMinutes, t)}
        </span>
      ),
    },
    {
      title: t('admin.inquiryDashboard.staffColumns.rate'),
      key: 'rate',
      align: 'center' as const,
      width: 90,
      render: (_: unknown, r: StaffPerformance) => (
        <Progress
          type="circle"
          size={36}
          percent={r.completionRate}
          strokeColor={r.completionRate >= 80 ? '#52c41a' : r.completionRate >= 50 ? '#faad14' : '#ff4d4f'}
          format={(p) => <span className="text-[10px] font-bold">{p}%</span>}
        />
      ),
    },
    {
      title: t('admin.inquiryDashboard.staffColumns.status'),
      key: 'status',
      align: 'center' as const,
      width: 100,
      render: (_: unknown, r: StaffPerformance) => {
        const s = getLoadStatus(r.currentLoad, t);
        return (
          <Tag color={s.color} className="border-0 rounded-full px-2 shadow-sm font-medium text-xs" style={{ color: '#fff', backgroundColor: s.color }}>
            {s.label}
          </Tag>
        );
      },
    },
  ];

  // ===== Critical Case Table =====
  const critData = criticalCases[critTab as keyof typeof criticalCases] || [];
  const critColumns = [
    {
      title: t('admin.inquiryDashboard.criticalColumns.id'),
      key: 'id',
      width: 70,
      render: (_: unknown, r: CriticalCaseItem) => (
        <span className="font-mono text-xs text-gray-500">...{r._id.slice(-6)}</span>
      ),
    },
    {
      title: t('admin.inquiryDashboard.criticalColumns.customer'),
      key: 'name',
      render: (_: unknown, r: CriticalCaseItem) => (
        <div>
          <div className="font-medium text-sm">{r.name}</div>
          <div className="text-xs text-gray-400 truncate max-w-[150px]">{r.company}</div>
        </div>
      ),
    },
    {
      title: t('admin.inquiryDashboard.criticalColumns.subject'),
      key: 'subject',
      render: (_: unknown, r: CriticalCaseItem) => (
        <span className="text-sm line-clamp-1">{r.subject}</span>
      ),
    },
    {
      title: t('admin.inquiryDashboard.criticalColumns.time'),
      key: 'time',
      width: 120,
      render: (_: unknown, r: CriticalCaseItem) => {
        const ts = r.createdAt || r.assignedAt || r.updatedAt;
        return ts ? (
          <Tooltip title={format(new Date(ts), 'PPpp')}>
            <span className="text-xs text-red-500 font-medium">
              {formatDistanceToNow(new Date(ts), { addSuffix: true })}
            </span>
          </Tooltip>
        ) : <span className="text-xs text-gray-400">{t('admin.inquiryDashboard.time.na')}</span>;
      },
    },
    {
      title: t('admin.inquiryDashboard.criticalColumns.assignedTo'),
      key: 'assignedTo',
      width: 100,
      render: (_: unknown, r: CriticalCaseItem) => (
        r.assignedTo ? (
          <span className="text-xs font-medium text-blue-600">{r.assignedTo}</span>
        ) : <span className="text-xs text-gray-400 italic">{t('admin.inquiryDashboard.criticalColumns.unassigned')}</span>
      ),
    },
  ];

  // ===== Recent Inquiry Columns =====
  const recentCols = [
    {
      title: t('admin.inquiryDashboard.recentColumns.date'),
      key: 'date',
      width: 90,
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <span className="text-xs text-gray-500">{format(new Date(r.createdAt), 'dd/MM HH:mm')}</span>
      ),
    },
    {
      title: t('admin.inquiryDashboard.recentColumns.customer'),
      key: 'name',
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <div>
          <div className="font-medium text-sm">{r.name}</div>
          <div className="text-[10px] text-gray-400">{r.company}</div>
        </div>
      ),
    },
    {
      title: t('admin.inquiryDashboard.recentColumns.status'),
      key: 'status',
      width: 100,
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <Tag className="rounded-full border-0 capitalize text-xs font-medium shadow-sm">{r.status}</Tag>
      ),
    },
    {
      title: t('admin.inquiryDashboard.recentColumns.assigned'),
      key: 'assigned',
      width: 100,
      render: (_: unknown, r: DashboardRecentInquiry) => (
        r.assignedTo ? (
          <span className="text-xs text-blue-600">{r.assignedTo}</span>
        ) : <span className="text-xs text-gray-400">—</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-body max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 tracking-tight" style={{ color: 'hsl(var(--navy-deep))' }}>
            <InboxOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
            {t('admin.inquiryDashboard.header.title')}
          </h2>
          <p className="text-sm text-gray-500 m-0 mt-1">
            {t('admin.inquiryDashboard.header.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <SyncOutlined spin className="text-green-500" />
          <span>{t('admin.inquiryDashboard.header.updating')}</span>
        </div>
      </div>

      {/* ===== BLOCK 1: KPI CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <KPICard title={t('admin.inquiryDashboard.kpi.total')} value={summary.total} icon={<InboxOutlined />} color="hsl(var(--navy-deep))" bgColor="hsl(var(--navy-deep) / 0.03)" />
        <KPICard title={t('admin.inquiryDashboard.kpi.newToday')} value={summary.newToday} icon={<ArrowUpOutlined />} color="hsl(var(--orange))" bgColor="hsl(var(--orange) / 0.05)" />
        <KPICard title={t('admin.inquiryDashboard.kpi.unassigned')} value={summary.unassigned} icon={<ExclamationCircleOutlined />} color="#faad14" bgColor="#fffbe6" highlight={summary.unassigned > 0} />
        <KPICard title={t('admin.inquiryDashboard.kpi.waitingAccept')} value={summary.waitingAccept} icon={<ClockCircleOutlined />} color="#722ed1" bgColor="#f9f0ff" />
        <KPICard title={t('admin.inquiryDashboard.kpi.inProgress')} value={summary.inProgress} icon={<SyncOutlined />} color="#1890ff" bgColor="#e6f4ff" />
        <KPICard title={t('admin.inquiryDashboard.kpi.resolved')} value={summary.resolved} icon={<CheckCircleOutlined />} color="#52c41a" bgColor="#f6ffed" />
        <KPICard title={t('admin.inquiryDashboard.kpi.overdue')} value={summary.overdue} icon={<FireOutlined />} color="#ff4d4f" bgColor="#fff1f0" highlight={summary.overdue > 0} />
      </div>

      {/* ===== BLOCK 2: CHARTS + RESPONSE METRICS ===== */}
      <Row gutter={[16, 16]}>
        {/* Inquiries by Day */}
        <Col xs={24} lg={10}>
          <Card
            title={<span className="font-display font-medium text-navy-deep">{t('admin.inquiryDashboard.charts.trend7Days')}</span>}
            variant="borderless" className="shadow-sm h-full"
            extra={
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: 'hsl(var(--orange))' }} /> {t('admin.inquiryDashboard.charts.new')}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block bg-green-500" /> {t('admin.inquiryDashboard.charts.resolved')}</span>
              </div>
            }
          >
            <div className="mt-4">
              <MiniBarChart data={byDay} maxHeight={120} t={t} />
            </div>
          </Card>
        </Col>

        {/* Response Metrics */}
        <Col xs={24} sm={12} lg={7}>
          <Card title={<span className="font-display font-medium text-navy-deep">{t('admin.inquiryDashboard.charts.responseMetrics')}</span>} variant="borderless" className="shadow-sm h-full">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><ThunderboltOutlined /> {t('admin.inquiryDashboard.charts.frtAvg')}</span>
                  <span className="font-bold text-navy-deep">{formatMinutes(responseMetrics.avgFRTMinutes, t)}</span>
                </div>
                <Progress percent={Math.min(100, responseMetrics.avgFRTMinutes > 0 ? Math.round((60 / responseMetrics.avgFRTMinutes) * 100) : 100)} showInfo={false} strokeColor="#1890ff" size="small" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><FieldTimeOutlined /> {t('admin.inquiryDashboard.charts.handlingAvg')}</span>
                  <span className="font-bold text-navy-deep">{formatMinutes(responseMetrics.avgHandlingMinutes, t)}</span>
                </div>
                <Progress percent={Math.min(100, responseMetrics.avgHandlingMinutes > 0 ? Math.round((480 / responseMetrics.avgHandlingMinutes) * 100) : 100)} showInfo={false} strokeColor="#faad14" size="small" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><SafetyCertificateOutlined /> {t('admin.inquiryDashboard.charts.slaCompliance')}</span>
                  <span className="font-bold" style={{ color: responseMetrics.slaCompliance >= 90 ? '#52c41a' : responseMetrics.slaCompliance >= 70 ? '#faad14' : '#ff4d4f' }}>
                    {responseMetrics.slaCompliance}%
                  </span>
                </div>
                <Progress
                  percent={responseMetrics.slaCompliance}
                  showInfo={false}
                  strokeColor={responseMetrics.slaCompliance >= 90 ? '#52c41a' : responseMetrics.slaCompliance >= 70 ? '#faad14' : '#ff4d4f'}
                  size="small"
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* By Category + By Status */}
        <Col xs={24} sm={12} lg={7}>
          <Card title={<span className="font-display font-medium text-navy-deep">{t('admin.inquiryDashboard.charts.distribution')}</span>} variant="borderless" className="shadow-sm h-full">
            <div className="mb-4">
              <Text className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">{t('admin.inquiryDashboard.charts.byCategory')}</Text>
              {byCategory.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-600 w-20 truncate">{c.label}</span>
                  <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(c.count / maxCategoryCount) * 100}%`,
                        backgroundColor: `hsl(${(i * 47 + 200) % 360}, 60%, 55%)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{c.count}</span>
                </div>
              ))}
            </div>
            <div>
              <Text className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">{t('admin.inquiryDashboard.charts.byStatus')}</Text>
              {byStatus.map((s, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-600 w-20 truncate">{s.label}</span>
                  <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${summary.total > 0 ? (s.count / summary.total) * 100 : 0}%`,
                        backgroundColor: s.color !== 'default' ? s.color : '#94a3b8',
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">{s.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ===== BLOCK 3: STAFF PERFORMANCE ===== */}
      <Card
        title={
          <span className="font-display font-medium text-lg" style={{ color: 'hsl(var(--navy-deep))' }}>
            <TeamOutlined className="mr-2 text-blue-500" />
            {t('admin.inquiryDashboard.blocks.staffPerformance')}
          </span>
        }
        variant="borderless"
        className="shadow-sm"
      >
        <Table
          columns={staffColumns}
          dataSource={staffPerformance}
          rowKey="userId"
          pagination={false}
          size="middle"
          scroll={{ x: 700 }}
          rowClassName={(record) => {
            if (record.currentLoad > 10) return 'bg-red-50/50';
            if (record.currentLoad === 0 && record.assigned > 0) return 'bg-green-50/30';
            return '';
          }}
          locale={{ emptyText: <Empty description={t('admin.inquiryDashboard.blocks.noStaff')} /> }}
        />
      </Card>

      {/* ===== BLOCK 4: CRITICAL CASES ===== */}
      <Card
        title={
          <span className="font-display font-medium text-lg" style={{ color: 'hsl(var(--navy-deep))' }}>
            <AlertOutlined className="mr-2 text-red-500" />
            {t('admin.inquiryDashboard.blocks.criticalCases')}
            {totalCritical > 0 && (
              <Badge count={totalCritical} className="ml-2" style={{ backgroundColor: '#ff4d4f' }} />
            )}
          </span>
        }
        variant="borderless"
        className="shadow-sm"
        styles={{ body: { padding: 0 } }}
      >
        <div className="p-4 pb-0">
          <Tabs
            activeKey={critTab}
            onChange={setCritTab}
            size="small"
            items={[
              {
                key: 'unassigned',
                label: <span>{t('admin.inquiryDashboard.tabs.unassigned')} {critCounts.unassigned > 0 && <Badge count={critCounts.unassigned} size="small" style={{ backgroundColor: '#faad14' }} />}</span>,
              },
              {
                key: 'waitingAccept',
                label: <span>{t('admin.inquiryDashboard.tabs.waitingAccept')} {critCounts.waitingAccept > 0 && <Badge count={critCounts.waitingAccept} size="small" style={{ backgroundColor: '#722ed1' }} />}</span>,
              },
              {
                key: 'overdue',
                label: <span>{t('admin.inquiryDashboard.tabs.overdue')} {critCounts.overdue > 0 && <Badge count={critCounts.overdue} size="small" style={{ backgroundColor: '#ff4d4f' }} />}</span>,
              },
              {
                key: 'stale',
                label: <span>{t('admin.inquiryDashboard.tabs.stale')} {critCounts.stale > 0 && <Badge count={critCounts.stale} size="small" style={{ backgroundColor: '#8c8c8c' }} />}</span>,
              },
            ]}
          />
        </div>
        <Table
          columns={critColumns}
          dataSource={critData}
          rowKey="_id"
          pagination={false}
          size="small"
          scroll={{ x: 600 }}
          locale={{ emptyText: <Empty description={t('admin.inquiryDashboard.blocks.noCriticalCases')} image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        />
      </Card>

      {/* ===== BLOCK 5 + 6: ACTIVITY FEED + RECENT INQUIRIES ===== */}
      <Row gutter={[16, 16]}>
        {/* Activity Feed */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <span className="font-display font-medium text-lg" style={{ color: 'hsl(var(--navy-deep))' }}>
                <ClockCircleOutlined className="mr-2 text-purple-500" />
                {t('admin.inquiryDashboard.blocks.recentActivity')}
              </span>
            }
            variant="borderless"
            className="shadow-sm"
            styles={{ body: { maxHeight: 420, overflowY: 'auto' } }}
          >
            {recentActivity.length === 0 ? (
              <Empty description={t('admin.inquiryDashboard.blocks.noActivity')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <Timeline
                items={recentActivity.map((a: InquiryActivityItem) => {
                  const { text, color } = getActionLabel(a.action, t);
                  return {
                    color,
                    content: (
                      <div className="text-sm py-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag color={color} className="border-0 rounded text-[10px] px-1.5 py-0 m-0">{text}</Tag>
                          <span className="font-medium">{a.performedByName}</span>
                          {a.toValue && (
                            <span className="text-gray-500">
                              → <span className="font-medium text-blue-600">{a.toValue}</span>
                            </span>
                          )}
                          {a.fromValue && a.action === 'status_changed' && (
                            <span className="text-gray-400 text-xs">
                              ({a.fromValue} → {a.toValue})
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Inquiry <span className="font-mono">...{a.inquiryId.slice(-6)}</span>
                          {a.customerName && a.customerName !== 'N/A' && ` — ${a.customerName}`}
                          {' · '}
                          {format(new Date(a.createdAt), 'HH:mm dd/MM')}
                        </div>
                      </div>
                    ),
                  };
                })}
              />
            )}
          </Card>
        </Col>

        {/* Recent Inquiries */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <span className="font-display font-medium text-lg" style={{ color: 'hsl(var(--navy-deep))' }}>
                <InboxOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
                {t('admin.inquiryDashboard.blocks.recentInquiries')}
              </span>
            }
            variant="borderless"
            className="shadow-sm"
            styles={{ body: { padding: 0 } }}
          >
            <Table
              columns={recentCols}
              dataSource={recentInquiries}
              rowKey="_id"
              pagination={false}
              size="small"
              scroll={{ x: 500, y: 360 }}
              locale={{ emptyText: <Empty description={t('admin.inquiryDashboard.blocks.noRecentInquiries')} image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

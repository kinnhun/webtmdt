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
import { useInquiryDashboard } from '@/domains/inquiry';
import type {
  StaffPerformance, CriticalCaseItem, InquiryActivityItem,
  DashboardRecentInquiry, DashboardDayItem
} from '@/domains/inquiry';

const { Text, Title } = Typography;

// ===== Helpers =====
function formatMinutes(minutes: number): string {
  if (minutes === 0) return 'N/A';
  if (minutes < 60) return `${minutes} phút`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h < 24) return m > 0 ? `${h}h ${m}m` : `${h} giờ`;
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return rh > 0 ? `${d}d ${rh}h` : `${d} ngày`;
}

function getLoadStatus(load: number): { label: string; color: string } {
  if (load === 0) return { label: 'Rảnh', color: '#52c41a' };
  if (load <= 5) return { label: 'Bình thường', color: '#1890ff' };
  if (load <= 10) return { label: 'Bận', color: '#faad14' };
  return { label: 'Quá tải', color: '#ff4d4f' };
}

function getActionLabel(action: string): { text: string; color: string } {
  const map: Record<string, { text: string; color: string }> = {
    created: { text: 'Inquiry mới', color: '#1890ff' },
    assigned: { text: 'Đã phân công', color: '#722ed1' },
    accepted: { text: 'Đã nhận', color: '#52c41a' },
    rejected: { text: 'Từ chối', color: '#ff4d4f' },
    status_changed: { text: 'Đổi trạng thái', color: '#fa8c16' },
    note_updated: { text: 'Cập nhật ghi chú', color: '#8c8c8c' },
    resolved: { text: 'Hoàn tất', color: '#52c41a' },
    closed: { text: 'Đã đóng', color: '#595959' },
    unassigned: { text: 'Gỡ phân công', color: '#faad14' },
  };
  return map[action] || { text: action, color: '#8c8c8c' };
}

// ===== Mini Bar Chart (CSS-only) =====
function MiniBarChart({ data, maxHeight = 80 }: { data: DashboardDayItem[]; maxHeight?: number }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.created, d.resolved)), 1);
  return (
    <div className="flex items-end gap-1.5 w-full" style={{ height: maxHeight }}>
      {data.map((d, i) => {
        const createdH = (d.created / maxVal) * maxHeight;
        const resolvedH = (d.resolved / maxVal) * maxHeight;
        const dayLabel = format(new Date(d.date), 'dd/MM');
        return (
          <Tooltip key={i} title={`${dayLabel}: ${d.created} mới, ${d.resolved} xong`}>
            <div className="flex-1 flex items-end gap-px">
              <div
                className="flex-1 rounded-t-sm transition-all duration-300"
                style={{ height: Math.max(createdH, 2), backgroundColor: 'hsl(var(--orange))' }}
              />
              <div
                className="flex-1 rounded-t-sm transition-all duration-300"
                style={{ height: Math.max(resolvedH, 2), backgroundColor: '#52c41a' }}
              />
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
  const { data, isLoading } = useInquiryDashboard();
  const [critTab, setCritTab] = useState('unassigned');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" tip="Đang tải dashboard..." />
      </div>
    );
  }

  if (!data) {
    return <Empty description="Không thể tải dữ liệu dashboard" />;
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
      title: 'Nhân viên',
      key: 'name',
      render: (_: unknown, r: StaffPerformance) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: getLoadStatus(r.currentLoad).color }}>
            {r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-sm">{r.name}</div>
            <div className="text-[10px] text-gray-400">{r.role}</div>
          </div>
        </div>
      ),
    },
    { title: 'Được giao', dataIndex: 'assigned', key: 'assigned', align: 'center' as const, width: 80 },
    { title: 'Đang xử lý', dataIndex: 'inProgress', key: 'inProgress', align: 'center' as const, width: 90 },
    { title: 'Hoàn tất', dataIndex: 'resolved', key: 'resolved', align: 'center' as const, width: 80 },
    {
      title: 'Quá hạn', dataIndex: 'overdue', key: 'overdue', align: 'center' as const, width: 80,
      render: (v: number) => v > 0 ? <span className="text-red-500 font-bold">{v}</span> : <span className="text-gray-300">0</span>,
    },
    {
      title: 'FRT TB',
      key: 'frt',
      align: 'center' as const,
      width: 90,
      render: (_: unknown, r: StaffPerformance) => (
        <span className={r.avgFirstResponseMinutes > 60 ? 'text-orange-500 font-semibold' : 'text-gray-600'}>
          {formatMinutes(r.avgFirstResponseMinutes)}
        </span>
      ),
    },
    {
      title: 'Tỷ lệ',
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
      title: 'Trạng thái',
      key: 'status',
      align: 'center' as const,
      width: 100,
      render: (_: unknown, r: StaffPerformance) => {
        const s = getLoadStatus(r.currentLoad);
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
      title: 'ID',
      key: 'id',
      width: 70,
      render: (_: unknown, r: CriticalCaseItem) => (
        <span className="font-mono text-xs text-gray-500">...{r._id.slice(-6)}</span>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'name',
      render: (_: unknown, r: CriticalCaseItem) => (
        <div>
          <div className="font-medium text-sm">{r.name}</div>
          <div className="text-xs text-gray-400 truncate max-w-[150px]">{r.company}</div>
        </div>
      ),
    },
    {
      title: 'Chủ đề',
      key: 'subject',
      render: (_: unknown, r: CriticalCaseItem) => (
        <span className="text-sm line-clamp-1">{r.subject}</span>
      ),
    },
    {
      title: 'Thời gian',
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
        ) : <span className="text-xs text-gray-400">N/A</span>;
      },
    },
    {
      title: 'Phụ trách',
      key: 'assignedTo',
      width: 100,
      render: (_: unknown, r: CriticalCaseItem) => (
        r.assignedTo ? (
          <span className="text-xs font-medium text-blue-600">{r.assignedTo}</span>
        ) : <span className="text-xs text-gray-400 italic">Chưa phân công</span>
      ),
    },
  ];

  // ===== Recent Inquiry Columns =====
  const recentCols = [
    {
      title: 'Ngày',
      key: 'date',
      width: 90,
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <span className="text-xs text-gray-500">{format(new Date(r.createdAt), 'dd/MM HH:mm')}</span>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'name',
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <div>
          <div className="font-medium text-sm">{r.name}</div>
          <div className="text-[10px] text-gray-400">{r.company}</div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 100,
      render: (_: unknown, r: DashboardRecentInquiry) => (
        <Tag className="rounded-full border-0 capitalize text-xs font-medium shadow-sm">{r.status}</Tag>
      ),
    },
    {
      title: 'Phụ trách',
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
            Inquiries Dashboard
          </h2>
          <p className="text-sm text-gray-500 m-0 mt-1">
            Tổng quan toàn bộ inquiries & hiệu suất chăm sóc khách hàng
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <SyncOutlined spin className="text-green-500" />
          <span>Tự động cập nhật mỗi 60s</span>
        </div>
      </div>

      {/* ===== BLOCK 1: KPI CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <KPICard title="Tổng" value={summary.total} icon={<InboxOutlined />} color="hsl(var(--navy-deep))" bgColor="hsl(var(--navy-deep) / 0.03)" />
        <KPICard title="Mới hôm nay" value={summary.newToday} icon={<ArrowUpOutlined />} color="hsl(var(--orange))" bgColor="hsl(var(--orange) / 0.05)" />
        <KPICard title="Chưa phân công" value={summary.unassigned} icon={<ExclamationCircleOutlined />} color="#faad14" bgColor="#fffbe6" highlight={summary.unassigned > 0} />
        <KPICard title="Chờ nhận" value={summary.waitingAccept} icon={<ClockCircleOutlined />} color="#722ed1" bgColor="#f9f0ff" />
        <KPICard title="Đang xử lý" value={summary.inProgress} icon={<SyncOutlined />} color="#1890ff" bgColor="#e6f4ff" />
        <KPICard title="Hoàn tất" value={summary.resolved} icon={<CheckCircleOutlined />} color="#52c41a" bgColor="#f6ffed" />
        <KPICard title="Quá SLA" value={summary.overdue} icon={<FireOutlined />} color="#ff4d4f" bgColor="#fff1f0" highlight={summary.overdue > 0} />
      </div>

      {/* ===== BLOCK 2: CHARTS + RESPONSE METRICS ===== */}
      <Row gutter={[16, 16]}>
        {/* Inquiries by Day */}
        <Col xs={24} lg={10}>
          <Card
            title={<span className="font-display font-medium text-navy-deep">Xu hướng 7 ngày</span>}
            variant="borderless" className="shadow-sm h-full"
            extra={
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: 'hsl(var(--orange))' }} /> Mới</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block bg-green-500" /> Xong</span>
              </div>
            }
          >
            <MiniBarChart data={byDay} maxHeight={120} />
            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              {byDay.map((d, i) => (
                <span key={i} className="flex-1 text-center">{format(new Date(d.date), 'dd/MM')}</span>
              ))}
            </div>
          </Card>
        </Col>

        {/* Response Metrics */}
        <Col xs={24} sm={12} lg={7}>
          <Card title={<span className="font-display font-medium text-navy-deep">Hiệu suất phản hồi</span>} variant="borderless" className="shadow-sm h-full">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><ThunderboltOutlined /> First Response Time TB</span>
                  <span className="font-bold text-navy-deep">{formatMinutes(responseMetrics.avgFRTMinutes)}</span>
                </div>
                <Progress percent={Math.min(100, responseMetrics.avgFRTMinutes > 0 ? Math.round((60 / responseMetrics.avgFRTMinutes) * 100) : 100)} showInfo={false} strokeColor="#1890ff" size="small" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><FieldTimeOutlined /> Handling Time TB</span>
                  <span className="font-bold text-navy-deep">{formatMinutes(responseMetrics.avgHandlingMinutes)}</span>
                </div>
                <Progress percent={Math.min(100, responseMetrics.avgHandlingMinutes > 0 ? Math.round((480 / responseMetrics.avgHandlingMinutes) * 100) : 100)} showInfo={false} strokeColor="#faad14" size="small" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 flex items-center gap-1"><SafetyCertificateOutlined /> SLA Compliance</span>
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
          <Card title={<span className="font-display font-medium text-navy-deep">Phân bổ</span>} variant="borderless" className="shadow-sm h-full">
            <div className="mb-4">
              <Text className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">Theo category</Text>
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
              <Text className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">Theo status</Text>
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
            Hiệu suất nhân viên
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
          locale={{ emptyText: <Empty description="Chưa có nhân viên nào được giao inquiry" /> }}
        />
      </Card>

      {/* ===== BLOCK 4: CRITICAL CASES ===== */}
      <Card
        title={
          <span className="font-display font-medium text-lg" style={{ color: 'hsl(var(--navy-deep))' }}>
            <AlertOutlined className="mr-2 text-red-500" />
            Inquiry cần chú ý
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
                label: <span>Chưa phân công {critCounts.unassigned > 0 && <Badge count={critCounts.unassigned} size="small" style={{ backgroundColor: '#faad14' }} />}</span>,
              },
              {
                key: 'waitingAccept',
                label: <span>Chờ nhận {critCounts.waitingAccept > 0 && <Badge count={critCounts.waitingAccept} size="small" style={{ backgroundColor: '#722ed1' }} />}</span>,
              },
              {
                key: 'overdue',
                label: <span>Quá SLA {critCounts.overdue > 0 && <Badge count={critCounts.overdue} size="small" style={{ backgroundColor: '#ff4d4f' }} />}</span>,
              },
              {
                key: 'stale',
                label: <span>Không cập nhật {critCounts.stale > 0 && <Badge count={critCounts.stale} size="small" style={{ backgroundColor: '#8c8c8c' }} />}</span>,
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
          locale={{ emptyText: <Empty description="Không có trường hợp cần chú ý" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
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
                Hoạt động gần đây
              </span>
            }
            variant="borderless"
            className="shadow-sm"
            styles={{ body: { maxHeight: 420, overflowY: 'auto' } }}
          >
            {recentActivity.length === 0 ? (
              <Empty description="Chưa có hoạt động nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <Timeline
                items={recentActivity.map((a: InquiryActivityItem) => {
                  const { text, color } = getActionLabel(a.action);
                  return {
                    color,
                    children: (
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
                Inquiry mới nhất
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
              scroll={{ y: 360 }}
              locale={{ emptyText: <Empty description="Chưa có inquiry" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

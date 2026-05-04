import { useState } from 'react'
import { FileSearch, CheckCircle, Clock, AlertTriangle, Eye, Download } from 'lucide-react'

const auditLogs = [
  { id: 'AUD20240001', time: '2024-03-22 14:30:25', user: '张伟', action: '登录系统', module: '系统', ip: '192.168.1.100', status: '成功' },
  { id: 'AUD20240002', time: '2024-03-22 14:32:18', user: '张伟', action: '查看报告', module: '报告管理', ip: '192.168.1.100', status: '成功', detail: '报告号: R202400156' },
  { id: 'AUD20240003', time: '2024-03-22 14:35:42', user: '李娜', action: '修改报告', module: '报告管理', ip: '192.168.1.105', status: '成功', detail: '报告号: R202400152' },
  { id: 'AUD20240004', time: '2024-03-22 14:40:15', user: '王强', action: '导出数据', module: '数据导出', ip: '192.168.1.110', status: '警告', detail: '批量导出 50 条记录' },
  { id: 'AUD20240005', time: '2024-03-22 14:45:33', user: '刘芳', action: '删除数据', module: '标本管理', ip: '192.168.1.115', status: '失败', detail: '无权限操作' },
  { id: 'AUD20240006', time: '2024-03-22 15:00:00', user: '陈明', action: '审核报告', module: '报告管理', ip: '192.168.1.120', status: '成功', detail: '报告号: R202400148' },
  { id: 'AUD20240007', time: '2024-03-22 15:15:22', user: '张伟', action: '系统设置', module: '系统管理', ip: '192.168.1.100', status: '成功', detail: '修改质控参数' },
  { id: 'AUD20240008', time: '2024-03-22 15:30:45', user: '系统', action: '自动备份', module: '系统', ip: 'localhost', status: '成功', detail: '备份完成，耗时 120秒' },
]

const sensitiveOperations = [
  { id: 1, operation: '报告修改', count: 15, riskyCount: 2, lastTime: '2024-03-22 14:35' },
  { id: 2, operation: '数据导出', count: 28, riskyCount: 5, lastTime: '2024-03-22 14:40' },
  { id: 3, operation: '权限变更', count: 3, riskyCount: 1, lastTime: '2024-03-21 10:00' },
  { id: 4, operation: '报告删除', count: 2, riskyCount: 2, lastTime: '2024-03-20 16:20' },
  { id: 5, operation: '越权访问', count: 5, riskyCount: 5, lastTime: '2024-03-22 09:15' },
]

export default function AuditPage() {
  const [dateRange, setDateRange] = useState('today')
  const [moduleFilter, setModuleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>审计管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#fff', color: '#333', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Download size={16} /> 导出审计日志
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <FileSearch size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>今日日志</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>1,258</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>正常操作</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>1,180</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={18} style={{ color: '#d97706' }} />
            <span style={{ color: '#666', fontSize: 13 }}>风险操作</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>68</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#dc2626' }} />
            <span style={{ color: '#666', fontSize: 13 }}>失败操作</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>10</div>
        </div>
      </div>

      {/* 敏感操作统计 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>敏感操作统计</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {sensitiveOperations.map(op => (
            <div key={op.id} style={{ background: '#f8fafc', borderRadius: 8, padding: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{op.operation}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{op.count}</span>
                  <span style={{ fontSize: 12, color: '#666' }}> 次</span>
                </div>
                <div style={{ padding: '2px 8px', background: op.riskyCount > 0 ? '#fef3c7' : '#dcfce7', color: op.riskyCount > 0 ? '#d97706' : '#166534', borderRadius: 10, fontSize: 11 }}>
                  {op.riskyCount} 风险
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#666' }}>最近: {op.lastTime}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 审计日志列表 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>审计日志</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
            >
              <option value="today">今日</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
            </select>
            <select 
              value={moduleFilter} 
              onChange={(e) => setModuleFilter(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
            >
              <option value="all">全部模块</option>
              <option value="系统">系统</option>
              <option value="报告管理">报告管理</option>
              <option value="标本管理">标本管理</option>
              <option value="数据导出">数据导出</option>
              <option value="系统管理">系统管理</option>
            </select>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
            >
              <option value="all">全部状态</option>
              <option value="成功">成功</option>
              <option value="警告">警告</option>
              <option value="失败">失败</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>日志ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>时间</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>用户</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>模块</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>IP地址</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>详情</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 8px', fontSize: 12, fontFamily: 'monospace', color: '#64748b' }}>{log.id}</td>
                <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{log.time}</td>
                <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{log.user}</td>
                <td style={{ padding: '12px 8px', fontSize: 13 }}>{log.action}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>
                  <span style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: 4, fontSize: 11 }}>{log.module}</span>
                </td>
                <td style={{ padding: '12px 8px', fontSize: 12, fontFamily: 'monospace', color: '#666' }}>{log.ip}</td>
                <td style={{ padding: '12px 8px', fontSize: 13 }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 4,
                    padding: '4px 10px', 
                    borderRadius: 12, 
                    fontSize: 12, 
                    background: log.status === '成功' ? '#dcfce7' : log.status === '警告' ? '#fef3c7' : '#fee2e2', 
                    color: log.status === '成功' ? '#166534' : log.status === '警告' ? '#d97706' : '#dc2626' 
                  }}>
                    {log.status === '成功' && <CheckCircle size={12} />}
                    {log.status === '警告' && <AlertTriangle size={12} />}
                    {log.status === '失败' && <Clock size={12} />}
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: '12px 8px', fontSize: 12, color: '#666', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.detail || '-'}</td>
                <td style={{ padding: '12px 8px', fontSize: 13 }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                    <Eye size={12} /> 查看
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

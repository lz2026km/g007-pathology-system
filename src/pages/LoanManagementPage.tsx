import { useState } from 'react'
import { Search, Plus, Download } from 'lucide-react'

const mockLoans = [
  { id: 'LN202605001', patient: '张伟民', specimen: '胃窦活检', doctor: '李消化', dept: '消化内科', loanDate: '2026-05-01', returnDate: '2026-05-15', status: 'active', purpose: '疑难病例讨论', borrower: '王磊' },
  { id: 'LN202605002', patient: '李秀英', specimen: '乳腺穿刺', doctor: '张乳腺', dept: '乳腺外科', loanDate: '2026-05-02', returnDate: '2026-05-16', status: 'active', purpose: 'MDT会诊', borrower: '刘病理' },
  { id: 'LN202604015', patient: '赵强力', specimen: '肺叶切除', doctor: '王胸外', dept: '胸外科', loanDate: '2026-04-15', returnDate: '2026-04-29', status: 'returned', purpose: '科研项目', borrower: '陈研究' },
  { id: 'LN202604008', patient: '孙晓丽', specimen: '宫颈刮片', doctor: '赵妇科', dept: '妇科', loanDate: '2026-04-08', returnDate: '2026-04-22', status: 'returned', purpose: '教学读片', borrower: '医学生小王' },
  { id: 'LN202603020', patient: '周国平', specimen: '结肠镜活检', doctor: '李消化', dept: '消化内科', loanDate: '2026-03-20', returnDate: '2026-04-03', status: 'overdue', purpose: '基因检测', borrower: '实验室' },
  { id: 'LN202603012', patient: '吴美丽', specimen: '甲状腺全切', doctor: '张甲外', dept: '甲状腺外科', loanDate: '2026-03-12', returnDate: '2026-03-26', status: 'returned', purpose: '二次会诊', borrower: '外院专家' },
]

const statusMap: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: '#2563eb', bg: '#dbeafe', label: '借阅中' },
  returned: { color: '#16a34a', bg: '#dcfce7', label: '已归还' },
  overdue: { color: '#dc2626', bg: '#fee2e2', label: '已逾期' },
}

export default function LoanManagementPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockLoans.filter(l => {
    const matchSearch = l.id.includes(search) || l.patient.includes(search) || l.specimen.includes(search)
    const matchFilter = filter === 'all' || l.status === filter
    return matchSearch && matchFilter
  })

  const stats = {
    total: mockLoans.length,
    active: mockLoans.filter(l => l.status === 'active').length,
    returned: mockLoans.filter(l => l.status === 'returned').length,
    overdue: mockLoans.filter(l => l.status === 'overdue').length,
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>借阅管理</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>病理切片/蜡块/报告借阅全流程管理</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
          <Plus size={16} /> 新增借阅
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: '总借阅数', value: stats.total, color: '#1e3a5f' },
          { label: '当前借出', value: stats.active, color: '#2563eb' },
          { label: '已归还', value: stats.returned, color: '#16a34a' },
          { label: '逾期未还', value: stats.overdue, color: '#dc2626' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, color: '#64748b' }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 搜索过滤 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 240, background: '#f1f5f9', borderRadius: 6, padding: '6px 12px' }}>
            <Search size={16} color="#64748b" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索借阅单号/患者姓名/标本类型" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 14 }} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 14 }}>
            <option value="all">全部状态</option>
            <option value="active">借阅中</option>
            <option value="returned">已归还</option>
            <option value="overdue">已逾期</option>
          </select>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13 }}>
            <Download size={14} /> 导出
          </button>
        </div>
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {['借阅单号', '患者', '标本类型', '借阅医生', '科室', '借阅日期', '应还日期', '状态', '用途', '操作'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => {
              const s = statusMap[l.status]
              return (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', color: '#2563eb', fontWeight: 500 }}>{l.id}</td>
                  <td style={{ padding: '10px 12px' }}>{l.patient}</td>
                  <td style={{ padding: '10px 12px' }}>{l.specimen}</td>
                  <td style={{ padding: '10px 12px' }}>{l.borrower}</td>
                  <td style={{ padding: '10px 12px' }}>{l.dept}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{l.loanDate}</td>
                  <td style={{ padding: '10px 12px', color: l.status === 'overdue' ? '#dc2626' : '#64748b' }}>{l.returnDate}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{l.purpose}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                    {l.status === 'active' && <button style={{ padding: '4px 8px', border: '1px solid #bbf7d0', borderRadius: 4, background: '#f0fdf4', color: '#16a34a', cursor: 'pointer', fontSize: 12 }}>归还</button>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

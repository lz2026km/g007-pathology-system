import { useState } from 'react'
import { Upload, Download } from 'lucide-react'

const mockReports = [
  { id: 'DR202605001', month: '2026-05', hospital: '东华区第一医院', totalCases: 1245, frozen: 38, ihc: 156, molecular: 42, reportRate: 98.2, submitDate: '2026-05-04', status: 'submitted' },
  { id: 'DR202604001', month: '2026-04', hospital: '东华区第一医院', totalCases: 3180, frozen: 112, ihc: 423, molecular: 98, reportRate: 99.1, submitDate: '2026-04-30', status: 'approved' },
  { id: 'DR202604002', month: '2026-04', hospital: '南山区中心医院', totalCases: 2156, frozen: 78, ihc: 289, molecular: 65, reportRate: 97.8, submitDate: '2026-04-29', status: 'approved' },
  { id: 'DR202603001', month: '2026-03', hospital: '东华区第一医院', totalCases: 3050, frozen: 105, ihc: 410, molecular: 92, reportRate: 99.3, submitDate: '2026-03-31', status: 'approved' },
  { id: 'DR202603002', month: '2026-03', hospital: '西城区人民医院', totalCases: 1892, frozen: 65, ihc: 234, molecular: 48, reportRate: 96.5, submitDate: '2026-03-30', status: 'approved' },
]

const statusMap: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: '#64748b', bg: '#f1f5f9', label: '草稿' },
  submitted: { color: '#2563eb', bg: '#dbeafe', label: '已提交' },
  approved: { color: '#16a34a', bg: '#dcfce7', label: '已审核' },
  rejected: { color: '#dc2626', bg: '#fee2e2', label: '已驳回' },
}

export default function DataReportPage() {
  const [year, setYear] = useState('2026')

  const currentYearReports = mockReports.filter(r => r.month.startsWith(year))
  const totalCases = currentYearReports.reduce((sum, r) => sum + r.totalCases, 0)

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>数据上报</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>病理质量控制数据上报与统计分析</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
          <Upload size={16} /> 新增上报
        </button>
      </div>

      {/* 年份选择 + 统计 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['2024', '2025', '2026'].map(y => (
            <button key={y} onClick={() => setYear(y)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, background: year === y ? '#1e3a5f' : '#f1f5f9', color: year === y ? '#fff' : '#64748b' }}>{y}年</button>
          ))}
        </div>
        <div style={{ marginLeft: 16, display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#64748b' }}>上报数量：<strong style={{ color: '#1e3a5f' }}>{currentYearReports.length}</strong> 条</span>
          <span style={{ fontSize: 13, color: '#64748b' }}>病理总量：<strong style={{ color: '#1e3a5f' }}>{totalCases.toLocaleString()}</strong> 例</span>
        </div>
      </div>

      {/* 月度统计图 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1e3a5f', margin: '0 0 16px' }}>{year}年月度上报趋势</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
          {['1月', '2月', '3月', '4月', '5月'].map((m, i) => {
            const monthData = currentYearReports.find(r => r.month === `2026-${String(i + 1).padStart(2, '0')}`)
            const height = monthData ? Math.max(20, (monthData.totalCases / 4000) * 100) : 8
            return (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', background: '#F97316', borderRadius: '4px 4px 0 0', height: `${height}%`, minHeight: monthData ? 20 : 8 }} title={monthData ? `${monthData.totalCases}例` : '暂无数据'} />
                <span style={{ fontSize: 12, color: '#64748b' }}>{m}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {['报表编号', '月份', '医疗机构', '病理总量', '术中冰冻', '免疫组化', '分子病理', '报告及时率', '提交日期', '状态', '操作'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentYearReports.map(r => {
              const s = statusMap[r.status]
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', color: '#2563eb', fontWeight: 500 }}>{r.id}</td>
                  <td style={{ padding: '10px 12px' }}>{r.month}</td>
                  <td style={{ padding: '10px 12px' }}>{r.hospital}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e3a5f' }}>{r.totalCases.toLocaleString()}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.frozen}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.ihc}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.molecular}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ color: r.reportRate >= 98 ? '#16a34a' : '#d97706', fontWeight: 500 }}>{r.reportRate}%</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.submitDate}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 12, marginRight: 4 }}>查看</button>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 12 }}><Download size={12} /></button>
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

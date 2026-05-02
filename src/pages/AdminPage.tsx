import { useState } from 'react'
import { specimens, systemStats } from '../data/initialData'

export default function AdminPage() {
  const [period, setPeriod] = useState('month')
  const [showDetail, setShowDetail] = useState<string | null>(null)

  const months = ['2025-04', '2025-03', '2025-02', '2025-01', '2024-12']
  const types = ['手术标本', '常规活检', '细胞学', '冰冻切片', '免疫组化', '分子病理']

  const statCards = [
    { label: '本月样本数', value: systemStats.todayCases * 8, color: '#1e40af', suffix: '' },
    { label: '本月报告数', value: systemStats.todayCases * 7, color: '#16a34a', suffix: '' },
    { label: '平均TAT', value: systemStats.avgTurnaround, color: '#d97706', suffix: 'h' },
    { label: '冰冻准点率', value: Math.round(systemStats.frozenOnTime / systemStats.frozenToday * 100) || 95, color: '#0891b2', suffix: '%' },
  ]

  const typeData = types.map(t => ({
    name: t,
    value: specimens.filter(s => s.specimenType === t).length
  }))
  const maxType = Math.max(...typeData.map(t => t.value))

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>统计报表</h2>

      {/* 顶部统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {statCards.map(card => (
          <div key={card.label} style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#666', fontSize: 13 }}>{card.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: card.color }}>{card.value}{card.suffix}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* 左侧：月度趋势 */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>月度样本量趋势</h3>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12 }}>
              <option value="month">近6月</option>
              <option value="year">近12月</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160 }}>
            {months.map((m, i) => {
              const h = 40 + Math.random() * 100
              return (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: h, background: i === 0 ? '#1e40af' : '#dbeafe', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
                  <span style={{ fontSize: 11, color: '#64748b' }}>{m.slice(5)}月</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 右侧：标本类型分布 */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>标本类型分布</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {typeData.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 64, fontSize: 12, color: '#64748b' }}>{t.name}</span>
                <div style={{ flex: 1, height: 20, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(t.value / maxType) * 100}%`, background: '#1e40af', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                    <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{t.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部：月度明细 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>月度统计明细</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              {['月份', '标本数', '报告数', '冰冻数', 'IHC数', '分子数', '平均TAT', '质控分', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((m) => {
              const base = 800 + Math.floor(Math.random() * 200)
              const reports = Math.floor(base * 0.95)
              return (
                <tr key={m} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{m}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{base}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{reports}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{Math.floor(base * 0.08)}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{Math.floor(base * 0.2)}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{Math.floor(base * 0.1)}</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>{(38 + Math.random() * 10).toFixed(1)}h</td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: '#dcfce7', color: '#166534' }}>{(93 + Math.random() * 4).toFixed(1)}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 14 }}>
                    <button onClick={() => setShowDetail(m)} style={{ padding: '2px 8px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>详情</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showDetail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{showDetail} 月度统计详情</h3>
              <button onClick={() => setShowDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['月份', showDetail], ['标本总数', '1,025'],
                ['常规活检', '512'], ['手术标本', '286'],
                ['冰冻切片', '48'], ['细胞学', '98'],
                ['免疫组化', '156'], ['分子病理', '67'],
                ['会诊数', '28'], ['区域协作', '12'],
                ['平均TAT', '41.2h'], ['质控评分', '94.5'],
              ].map(([l, v]) => (
                <div key={l}><div style={{ color: '#94a3b8', fontSize: 12 }}>{l}</div><div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>{v}</div></div>
              ))}
            </div>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={() => setShowDetail(null)} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

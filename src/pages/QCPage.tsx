import { useState } from 'react'
import { qcRecords, QCRecord } from '../data/initialData'

export default function QCPage() {
  const [monthFilter, setMonthFilter] = useState('')
  const [detail, setDetail] = useState<QCRecord | null>(null)

  const filtered = monthFilter ? qcRecords.filter(r => r.month === monthFilter) : qcRecords

  const avgScore = (qcRecords.reduce((s, r) => s + r.qcScore, 0) / qcRecords.length).toFixed(1)
  const avgSat = (qcRecords.reduce((s, r) => s + r.satisfactoryRate, 0) / qcRecords.length).toFixed(1)
  const totalIssues = qcRecords.reduce((s, r) => s + r.issues.length, 0)

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>质量控制</h2>

      {/* 统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>质控记录</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>{qcRecords.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>平均质控分</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{avgScore}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>平均满意率</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{avgSat}%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>异常问题</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: totalIssues > 0 ? '#dc2626' : '#16a34a' }}>{totalIssues}</div>
        </div>
      </div>

      {/* 筛选 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部月份</option>
            {qcRecords.map(r => <option key={r.month} value={r.month}>{r.month}</option>)}
          </select>
          {monthFilter && (
            <button onClick={() => setMonthFilter('')} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>清空</button>
          )}
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['月份', '总例数', '完成', '冰冻', 'IHC', '分子', '平均TAT(h)', '冰冻时间(min)', '满意率(%)', '质控分', '上报状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 12px', color: '#475569', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 12px', fontSize: 14, fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{r.month}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.totalCases}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.completedCases}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.frozenCases}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.ihcCases}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.molecularCases}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.avgTurnaroundHours}h</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: r.frozenTurnaroundMinutes <= 26 ? '#dcfce7' : '#fef3c7', color: r.frozenTurnaroundMinutes <= 26 ? '#166534' : '#d97706' }}>{r.frozenTurnaroundMinutes}</span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{r.satisfactoryRate}%</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: r.qcScore >= 95 ? '#dcfce7' : r.qcScore >= 90 ? '#dbeafe' : '#fee2e2', color: r.qcScore >= 95 ? '#166534' : r.qcScore >= 90 ? '#1e40af' : '#dc2626' }}>{r.qcScore}</span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: r.reportedToRegional ? '#dcfce7' : '#fef3c7', color: r.reportedToRegional ? '#166534' : '#d97706' }}>{r.reportedToRegional ? `已上报 ${r.reportedDate}` : '未上报'}</span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <button onClick={() => setDetail(r)} style={{ padding: '4px 10px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 560, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{detail.month} 质控详情</h3>
              <button onClick={() => setDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                ['总例数', detail.totalCases], ['完成例数', detail.completedCases],
                ['冰冻例数', detail.frozenCases], ['IHC例数', detail.ihcCases],
                ['分子例数', detail.molecularCases], ['平均TAT', `${detail.avgTurnaroundHours}h`],
                ['冰冻时间', `${detail.frozenTurnaroundMinutes}min`], ['满意率', `${detail.satisfactoryRate}%`], ['质控分', detail.qcScore],
              ].map(([l, v]) => (
                <div key={l} style={{ padding: 12, background: '#f8fafc', borderRadius: 8 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{l}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
            {detail.issues.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#64748b', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>异常问题</div>
                {detail.issues.map((issue, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: '#fef2f2', borderRadius: 6, color: '#dc2626', fontSize: 13, marginBottom: 6 }}>⚠ {issue}</div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <button onClick={() => setDetail(null)} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

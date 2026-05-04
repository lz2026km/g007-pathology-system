import { useState } from 'react'
import { molecularTests, MolecularTest } from '../data/initialData'

// 统计卡片
function StatCard({ label, value, color, icon }: { label: string; value: number | string; color: string; icon: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}` }}>
      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{icon}</div>
    </div>
  )
}

export default function MolecularPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [resultFilter, setResultFilter] = useState('')
  const [detail, setDetail] = useState<MolecularTest | null>(null)

  const filtered = molecularTests.filter(m => {
    const matchText = !searchText ||
      m.specimenId.includes(searchText) ||
      m.patientName.includes(searchText) ||
      m.gene.includes(searchText)
    const matchType = !typeFilter || m.testType === typeFilter
    const matchResult = !resultFilter || m.result === resultFilter
    return matchText && matchType && matchResult
  })

  // 统计数据
  const totalTests = molecularTests.length
  const positiveCount = molecularTests.filter(m => m.result === '阳性' || m.result === '突变' || m.result === '异常').length
  const negativeCount = molecularTests.filter(m => m.result === '阴性' || m.result === '野生型').length
  const pendingCount = molecularTests.filter(m => m.result === '待测').length

  // 检测类型统计
  const typeStats: Record<string, number> = {}
  molecularTests.forEach(m => {
    typeStats[m.testType] = (typeStats[m.testType] || 0) + 1
  })

  // 基因统计
  const geneStats: Record<string, number> = {}
  molecularTests.forEach(m => {
    geneStats[m.gene] = (geneStats[m.gene] || 0) + 1
  })
  const topGenes = Object.entries(geneStats).sort((a, b) => b[1] - a[1]).slice(0, 8)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#1e293b' }}>分子病理</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ padding: '8px 16px', background: 'rgba(249,115,22,0.1)', color: '#F97316', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>分子病理检测管理</span>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="总检测数" value={totalTests} color="#F97316" icon="🧬 分子病理检测" />
        <StatCard label="阳性/突变" value={positiveCount} color="#dc2626" icon="🔴 检测阳性" />
        <StatCard label="阴性/野生型" value={negativeCount} color="#16a34a" icon="🟢 检测阴性" />
        <StatCard label="待测" value={pendingCount} color="#d97706" icon="⏳ 等待检测" />
      </div>

      {/* 基因和类型统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* 基因排行榜 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>热门检测基因</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {topGenes.map(([gene, count]) => (
              <div key={gene} style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.05))', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 20, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, color: '#F97316' }}>{gene}</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>{count}次</span>
              </div>
            ))}
          </div>
        </div>

        {/* 检测类型分布 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>检测类型分布</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} style={{ background: '#f8fafc', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#F97316' }}>{count}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 筛选 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="搜索病理号/患者/基因..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 260, fontSize: 14, outline: 'none' }} onFocus={e => e.target.style.borderColor = '#F97316'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部类型</option>
            <option value="FISH">FISH</option>
            <option value="PCR">PCR</option>
            <option value="NGS">NGS</option>
            <option value="基因突变检测">基因突变检测</option>
            <option value="融合基因检测">融合基因检测</option>
            <option value="染色体核型">染色体核型</option>
          </select>
          <select value={resultFilter} onChange={e => setResultFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部结果</option>
            <option value="阳性">阳性</option>
            <option value="阴性">阴性</option>
            <option value="突变">突变</option>
            <option value="野生型">野生型</option>
            <option value="待测">待测</option>
            <option value="异常">异常</option>
          </select>
          {(searchText || typeFilter || resultFilter) && (
            <button onClick={() => { setSearchText(''); setTypeFilter(''); setResultFilter('') }} style={{ padding: '10px 20px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>清空</button>
          )}
          <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>共 {filtered.length} 条记录</span>
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['病理号', '患者', '检测类型', '基因', '结果', '报告时间', '诊断医生', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🧬</div>
                暂无分子检测记录
              </td></tr>
            ) : filtered.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace', color: '#F97316', fontWeight: 500 }}>{m.specimenId}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{m.patientName}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>
                  <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: 4, fontSize: 12 }}>{m.testType}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#7c3aed' }}>{m.gene}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>
                  <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: m.result === '阳性' || m.result === '突变' || m.result === '异常' ? '#fee2e2' : m.result === '阴性' || m.result === '野生型' ? '#dcfce7' : '#fef3c7', color: m.result === '阳性' || m.result === '突变' || m.result === '异常' ? '#dc2626' : m.result === '阴性' || m.result === '野生型' ? '#166534' : '#d97706' }}>{m.result}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{m.reportTime}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{m.pathologist}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>
                  <button onClick={() => setDetail(m)} style={{ padding: '6px 14px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, boxShadow: '0 2px 4px rgba(249,115,22,0.2)' }}>详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>分子检测详情</h3>
              <button onClick={() => setDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                ['病理号', detail.specimenId],
                ['患者', detail.patientName],
                ['检测类型', detail.testType],
                ['基因', detail.gene],
                ['结果', detail.result],
                ['报告时间', detail.reportTime],
                ['诊断医生', detail.pathologist],
              ].map(([l, v]) => (
                <div key={l} style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{l}</div>
                  <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: 16, background: 'linear-gradient(135deg, rgba(249,115,22,0.05), rgba(124,58,237,0.05))', borderRadius: 12, border: '1px solid rgba(249,115,22,0.1)' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>详细信息</div>
              <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.7 }}>{detail.detail}</div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button onClick={() => setDetail(null)} style={{ padding: '10px 32px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

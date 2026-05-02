import { useState } from 'react'
import { molecularTests, MolecularTest } from '../data/initialData'

export default function MolecularPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [detail, setDetail] = useState<MolecularTest | null>(null)

  const filtered = molecularTests.filter(m => {
    const matchText = !searchText ||
      m.specimenId.includes(searchText) ||
      m.patientName.includes(searchText) ||
      m.gene.includes(searchText)
    const matchType = !typeFilter || m.testType === typeFilter
    return matchText && matchType
  })

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>分子病理</h2>

      {/* 统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>总检测数</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>{molecularTests.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>阳性</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{molecularTests.filter(m => m.result === '阳性' || m.result === '突变').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>阴性</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{molecularTests.filter(m => m.result === '阴性' || m.result === '野生型').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待测</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{molecularTests.filter(m => m.result === '待测').length}</div>
        </div>
      </div>

      {/* 筛选 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input type="text" placeholder="搜索病理号/患者/基因..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }} />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部类型</option>
            <option value="FISH">FISH</option>
            <option value="PCR">PCR</option>
            <option value="NGS">NGS</option>
            <option value="基因突变检测">基因突变检测</option>
            <option value="融合基因检测">融合基因检测</option>
            <option value="染色体核型">染色体核型</option>
          </select>
          {(searchText || typeFilter) && (
            <button onClick={() => { setSearchText(''); setTypeFilter('') }} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>清空</button>
          )}
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['病理号', '患者', '检测类型', '基因', '结果', '报告时间', '诊断医生', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无分子检测记录</td></tr>
            ) : filtered.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontFamily: 'monospace', color: '#1e40af' }}>{m.specimenId}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>{m.patientName}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{m.testType}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: '#7c3aed' }}>{m.gene}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 11, background: m.result === '阳性' || m.result === '突变' ? '#fee2e2' : m.result === '阴性' || m.result === '野生型' ? '#dcfce7' : '#fef3c7', color: m.result === '阳性' || m.result === '突变' ? '#dc2626' : m.result === '阴性' || m.result === '野生型' ? '#166534' : '#d97706' }}>{m.result}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{m.reportTime}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{m.pathologist}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>
                  <button onClick={() => setDetail(m)} style={{ padding: '4px 10px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>分子检测详情</h3>
              <button onClick={() => setDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['病理号', detail.specimenId], ['患者', detail.patientName], ['检测类型', detail.testType], ['基因', detail.gene], ['结果', detail.result], ['报告时间', detail.reportTime], ['诊断医生', detail.pathologist]].map(([l, v]) => (
                <div key={l}><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{l}</div><div style={{ color: '#1e293b', fontSize: 14 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>详细信息</div>
              <div style={{ color: '#374151', fontSize: 13, lineHeight: 1.6 }}>{detail.detail}</div>
            </div>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={() => setDetail(null)} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

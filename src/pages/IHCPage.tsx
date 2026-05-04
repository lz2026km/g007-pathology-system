import { useState } from 'react'
import { ihcReports, IHCReport, IHCMarker } from '../data/initialData'

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

// 新增组化弹窗
function AddIHCModal({ onClose, onAdd }: { onClose: () => void; onAdd: (r: IHCReport) => void }) {
  const [form, setForm] = useState({
    specimenId: `BX${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(ihcReports.length + 1).padStart(3, '0')}`,
    patientName: '',
    clinicalDiagnosis: '',
    pathologist: '',
    reportTime: new Date().toLocaleString('zh-CN'),
  })
  const [markers, setMarkers] = useState<IHCMarker[]>([{ marker: '', result: '阳性', intensity: 1, percentage: 0, location: '细胞核' }])

  const handleMarkerChange = (i: number, field: keyof IHCMarker, value: string | number) => {
    const updated = [...markers]
    updated[i] = { ...updated[i], [field]: value }
    setMarkers(updated)
  }

  const addMarker = () => setMarkers([...markers, { marker: '', result: '阳性', intensity: 1, percentage: 0, location: '细胞核' }])
  const removeMarker = (i: number) => setMarkers(markers.filter((_, idx) => idx !== i))

  const handleSubmit = () => {
    if (!form.patientName || !form.specimenId) return
    onAdd({ id: `IHC${Date.now()}`, ...form, markers, status: '已完成' })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 600, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>新增组化报告</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            ['病理号', form.specimenId, 'specimenId'],
            ['患者姓名', form.patientName, 'patientName'],
            ['临床诊断', form.clinicalDiagnosis, 'clinicalDiagnosis'],
            ['诊断医生', form.pathologist, 'pathologist'],
          ].map(([label, value, key]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ color: '#64748b', fontSize: 12, marginBottom: 4, display: 'block' }}>{label}</label>
              <input value={value as string} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ color: '#64748b', fontSize: 12 }}>标记物</label>
            <button onClick={addMarker} style={{ padding: '4px 12px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>+ 添加标记物</button>
          </div>
          {markers.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 80px 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input value={m.marker} onChange={e => handleMarkerChange(i, 'marker', e.target.value)} placeholder="如 ER, PR, HER2" style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }} />
              <select value={m.result} onChange={e => handleMarkerChange(i, 'result', e.target.value)} style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }}>
                <option>阳性</option><option>阴性</option><option>可疑</option><option>无法判读</option>
              </select>
              <select value={m.intensity} onChange={e => handleMarkerChange(i, 'intensity', Number(e.target.value))} style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }}>
                <option value={0}>-</option><option value={1}>★</option><option value={2}>★★</option><option value={3}>★★★</option>
              </select>
              <input type="number" value={m.percentage} onChange={e => handleMarkerChange(i, 'percentage', Number(e.target.value))} placeholder="%" style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }} />
              <select value={m.location} onChange={e => handleMarkerChange(i, 'location', e.target.value)} style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }}>
                <option>细胞核</option><option>细胞质</option><option>细胞膜</option><option>间质</option>
              </select>
              {markers.length > 1 && <button onClick={() => removeMarker(i)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 18 }}>×</button>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>保存</button>
        </div>
      </div>
    </div>
  )
}

export default function IHCPage() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [reports, setReports] = useState<IHCReport[]>(ihcReports)
  const [filtered, setFiltered] = useState<IHCReport[]>(ihcReports)

  const doQuery = () => {
    const result = reports.filter(r => {
      const matchText = !searchText || r.specimenId.includes(searchText) || r.patientName.includes(searchText)
      const matchStatus = !statusFilter || r.status === statusFilter
      return matchText && matchStatus
    })
    setFiltered(result)
  }

  const handleAdd = (r: IHCReport) => {
    const updated = [r, ...reports]
    setReports(updated)
    setFiltered(updated)
  }

  // 统计数据
  const totalReports = reports.length
  const positiveCount = reports.filter(r => r.markers.some(m => m.result === '阳性')).length
  const negativeCount = reports.filter(r => r.markers.every(m => m.result === '阴性')).length
  const avgMarkers = (reports.reduce((acc, r) => acc + r.markers.length, 0) / reports.length).toFixed(1)

  // 常见标记物统计
  const markerStats: Record<string, { positive: number; total: number }> = {}
  reports.forEach(r => {
    r.markers.forEach(m => {
      if (!markerStats[m.marker]) markerStats[m.marker] = { positive: 0, total: 0 }
      markerStats[m.marker].total++
      if (m.result === '阳性') markerStats[m.marker].positive++
    })
  })
  const topMarkers = Object.entries(markerStats).sort((a, b) => b[1].total - a[1].total).slice(0, 6)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#1e293b' }}>免疫组化</h2>
        <button onClick={() => setShowAdd(true)} style={{ padding: '10px 24px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, boxShadow: '0 2px 8px rgba(249,115,22,0.3)' }}>+ 新增组化</button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="总报告数" value={totalReports} color="#F97316" icon="📋 免疫组化报告" />
        <StatCard label="阳性病例" value={positiveCount} color="#16a34a" icon="✅ 检测阳性" />
        <StatCard label="阴性病例" value={negativeCount} color="#dc2626" icon="❌ 检测阴性" />
        <StatCard label="平均标记物" value={avgMarkers} color="#7c3aed" icon="🧪 每例平均" />
      </div>

      {/* 标记物统计 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>常用标记物阳性率</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {topMarkers.map(([marker, stats]) => {
            const rate = stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0
            return (
              <div key={marker} style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{marker}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{stats.positive}/{stats.total}</span>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${rate}%`, height: '100%', background: rate >= 70 ? '#16a34a' : rate >= 40 ? '#F97316' : '#dc2626', borderRadius: 4, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{rate}% 阳性率</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="搜索病理号/患者..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 240, fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#F97316'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部状态</option>
            <option value="已完成">已完成</option>
            <option value="制片中">制片中</option>
          </select>
          <button onClick={doQuery} style={{ padding: '10px 24px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>查询</button>
          {(searchText || statusFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter(''); setFiltered(reports) }} style={{ padding: '10px 24px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>清空</button>
          )}
          <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>共 {filtered.length} 条记录</span>
        </div>
      </div>

      {/* 报告列表 */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: 60, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <div>暂无数据</div>
          </div>
        )}
        {filtered.map(r => (
          <div key={r.id} style={{ padding: 20, borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'monospace', color: '#F97316', fontWeight: 600, fontSize: 14, background: 'rgba(249,115,22,0.1)', padding: '4px 10px', borderRadius: 6 }}>{r.specimenId}</span>
                  <span style={{ fontWeight: 600, fontSize: 16, color: '#1e293b' }}>{r.patientName}</span>
                  <span style={{ color: '#64748b', fontSize: 13, background: '#f1f5f9', padding: '4px 10px', borderRadius: 4 }}>{r.clinicalDiagnosis}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 12 }}>报告时间：{r.reportTime} | 诊断医生：{r.pathologist}</div>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: '#dcfce7', color: '#166534' }}>{r.status}</span>
            </div>
            {/* 标记物表格 */}
            <div style={{ background: '#f8fafc', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12 }}>标记物</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12 }}>结果</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12 }}>强度</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12 }}>阳性率</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 12 }}>定位</th>
                  </tr>
                </thead>
                <tbody>
                  {r.markers.map((m, i) => (
                    <tr key={i} style={{ borderBottom: i < r.markers.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 600, color: '#F97316' }}>{m.marker}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500,
                          background: m.result === '阳性' ? '#dcfce7' : m.result === '阴性' ? '#fee2e2' : '#fef3c7',
                          color: m.result === '阳性' ? '#166534' : m.result === '阴性' ? '#dc2626' : '#d97706'
                        }}>{m.result}</span>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#374151' }}>{m.intensity === 0 ? '-' : '★'.repeat(m.intensity)}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ background: '#e2e8f0', borderRadius: 4, width: 60, height: 6, overflow: 'hidden' }}>
                            <div style={{ width: `${m.percentage}%`, height: '100%', background: m.percentage >= 50 ? '#16a34a' : '#F97316', borderRadius: 4 }} />
                          </div>
                          <span style={{ color: '#64748b', fontSize: 12 }}>{m.percentage}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#64748b', fontSize: 12 }}>{m.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddIHCModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}

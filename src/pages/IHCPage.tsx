import { useState } from 'react'
import { ihcReports, IHCReport, IHCMarker } from '../data/initialData'

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
            <button onClick={addMarker} style={{ padding: '4px 12px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>+ 添加标记物</button>
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
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>保存</button>
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

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>免疫组化</h2>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input type="text" placeholder="搜索病理号/患者..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 220 }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部状态</option>
            <option value="已完成">已完成</option>
            <option value="制片中">制片中</option>
          </select>
          <button onClick={doQuery} style={{ padding: '8px 20px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>查询</button>
          <button onClick={() => setShowAdd(true)} style={{ padding: '8px 20px', background: '#fff', color: '#1e40af', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer' }}>+ 新增组化</button>
        </div>
      </div>

      {/* 报告列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>暂无数据</div>
        )}
        {filtered.map(r => (
          <div key={r.id} style={{ padding: 20, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{r.specimenId}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{r.patientName}</span>
                  <span style={{ color: '#64748b', fontSize: 13 }}>{r.clinicalDiagnosis}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>报告时间：{r.reportTime} | 诊断医生：{r.pathologist}</div>
              </div>
              <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, background: '#dcfce7', color: '#166534' }}>{r.status}</span>
            </div>
            {/* 标记物表格 */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>标记物</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>结果</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>强度</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>阳性率</th>
                  <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>定位</th>
                </tr>
              </thead>
              <tbody>
                {r.markers.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 12px', fontWeight: 600, color: '#1e40af' }}>{m.marker}</td>
                    <td style={{ padding: '6px 12px' }}>
                      <span style={{
                        padding: '1px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500,
                        background: m.result === '阳性' ? '#dcfce7' : m.result === '阴性' ? '#fee2e2' : '#fef3c7',
                        color: m.result === '阳性' ? '#166534' : m.result === '阴性' ? '#dc2626' : '#d97706'
                      }}>{m.result}</span>
                    </td>
                    <td style={{ padding: '6px 12px', color: '#374151' }}>{m.intensity === 0 ? '-' : '★'.repeat(m.intensity)}</td>
                    <td style={{ padding: '6px 12px', color: '#374151' }}>{m.percentage}%</td>
                    <td style={{ padding: '6px 12px', color: '#64748b' }}>{m.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {showAdd && <AddIHCModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}

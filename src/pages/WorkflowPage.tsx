import { useState } from 'react'
import { initialSamples, Specimen } from '../data/initialData'

// 详情弹窗
function DetailModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 560, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>标本详情</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            ['病理号', specimen.specimenId], ['患者姓名', specimen.patientName],
            ['性别/年龄', `${specimen.gender} / ${specimen.age}岁`], ['标本类型', specimen.specimenType],
            ['取材部位', specimen.specimenSource], ['临床诊断', specimen.clinicalDiagnosis],
            ['科室', specimen.department], ['接诊医生', specimen.doctor],
            ['采集时间', specimen.collectTime], ['接收时间', specimen.receiveTime],
            ['优先级', specimen.priority], ['状态', specimen.status],
          ].map(([label, value]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

// 追踪弹窗 - 显示工作流进度
function TrackModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
  const stages = ['待接收', '已接收', '制片中', '已切片', '阅片中', '审核中', '已完成']
  const currentIdx = stages.indexOf(specimen.status)
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>工作流追踪</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ marginBottom: 16, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>标本</div>
          <div style={{ fontFamily: 'monospace', color: '#1e40af', fontWeight: 600 }}>{specimen.specimenId}</div>
          <div style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>{specimen.patientName} | {specimen.specimenType}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {stages.map((stage, idx) => {
            const isDone = idx < currentIdx
            const isCurrent = idx === currentIdx
            const isPending = idx > currentIdx
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: idx < stages.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone ? '#16a34a' : isCurrent ? '#1e40af' : '#e2e8f0',
                  color: isDone || isCurrent ? '#fff' : '#94a3b8', fontSize: 12, fontWeight: 600,
                  flexShrink: 0
                }}>
                  {isDone ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: isCurrent ? 600 : 400, color: isPending ? '#94a3b8' : '#1e293b' }}>{stage}</div>
                  {isCurrent && <div style={{ fontSize: 11, color: '#1e40af', marginTop: 2 }}>当前阶段</div>}
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

export default function WorkflowPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [detailS, setDetailS] = useState<Specimen | null>(null)
  const [trackS, setTrackS] = useState<Specimen | null>(null)

  const filtered = initialSamples.filter(s => {
    const matchText = !searchText || s.specimenId.includes(searchText) || s.patientName.includes(searchText)
    const matchType = !typeFilter || s.specimenType === typeFilter
    const matchStatus = !statusFilter || s.status === statusFilter
    return matchText && matchType && matchStatus
  })

  const stageCounts = {
    '待接收': initialSamples.filter(s => s.status === '待接收').length,
    '制片中': initialSamples.filter(s => s.status === '制片中').length,
    '已切片': initialSamples.filter(s => s.status === '已切片').length,
    '阅片中': initialSamples.filter(s => s.status === '阅片中').length,
    '已完成': initialSamples.filter(s => s.status === '已完成').length,
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>工作流管理</h2>

      {/* 工作流看板 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
        {(['待接收', '制片中', '已切片', '阅片中', '已完成'] as const).map(stage => (
          <div key={stage} style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '3px solid #1e40af' }}>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{stage}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1e40af' }}>{stageCounts[stage]}</div>
          </div>
        ))}
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input type="text" placeholder="搜索病理号/患者名..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 220 }} />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部类型</option>
            <option value="常规活检">常规活检</option>
            <option value="手术标本">手术标本</option>
            <option value="细胞学">细胞学</option>
            <option value="冰冻切片">冰冻切片</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部状态</option>
            <option value="待接收">待接收</option>
            <option value="已接收">已接收</option>
            <option value="制片中">制片中</option>
            <option value="已切片">已切片</option>
            <option value="阅片中">阅片中</option>
            <option value="已完成">已完成</option>
          </select>
          {(searchText || typeFilter || statusFilter) && (
            <button onClick={() => { setSearchText(''); setTypeFilter(''); setStatusFilter('') }} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>重置</button>
          )}
        </div>
        {(searchText || typeFilter || statusFilter) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>筛选结果：共 {filtered.length} 条</div>
        )}
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              {['病理号', '患者姓名', '标本类型', '取材部位', '临床诊断', '科室', '接诊医生', '采集时间', '当前状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无匹配的记录</td></tr>
            ) : filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 8px', fontSize: 14, fontFamily: 'monospace', color: '#1e40af' }}>{s.specimenId}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.patientName}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.specimenType}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.specimenSource}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.clinicalDiagnosis}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.department}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.doctor}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.collectTime}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: s.status === '已完成' ? '#dcfce7' : s.status === '制片中' ? '#dbeafe' : '#fef3c7', color: s.status === '已完成' ? '#166534' : s.status === '制片中' ? '#1e40af' : '#d97706' }}>{s.status}</span>
                </td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>
                  <button onClick={() => setDetailS(s)} style={{ padding: '4px 10px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                  <button onClick={() => setTrackS(s)} style={{ padding: '4px 10px', background: '#fff', color: '#1e40af', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>追踪</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailS && <DetailModal specimen={detailS} onClose={() => setDetailS(null)} />}
      {trackS && <TrackModal specimen={trackS} onClose={() => setTrackS(null)} />}
    </div>
  )
}

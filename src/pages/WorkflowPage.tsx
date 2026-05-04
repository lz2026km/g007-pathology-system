import { useState } from 'react'
import { initialSamples, Specimen } from '../data/initialData'

// 详情弹窗
function DetailModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 560, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>标本详情</h3>
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
            <div key={label} style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '10px 32px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>关闭</button>
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
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>工作流追踪</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ marginBottom: 20, padding: 16, background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.02))', borderRadius: 12, border: '1px solid rgba(249,115,22,0.15)' }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>标本信息</div>
          <div style={{ fontFamily: 'monospace', color: '#F97316', fontWeight: 600, fontSize: 15 }}>{specimen.specimenId}</div>
          <div style={{ fontSize: 14, color: '#374151', marginTop: 6 }}>{specimen.patientName} · {specimen.specimenType} · {specimen.specimenSource}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {stages.map((stage, idx) => {
            const isDone = idx < currentIdx
            const isCurrent = idx === currentIdx
            const isPending = idx > currentIdx
            return (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: idx < stages.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone ? '#16a34a' : isCurrent ? '#F97316' : '#e2e8f0',
                  color: isDone || isCurrent ? '#fff' : '#94a3b8', fontSize: 14, fontWeight: 600,
                  flexShrink: 0, boxShadow: isCurrent ? '0 4px 12px rgba(249,115,22,0.3)' : 'none'
                }}>
                  {isDone ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: isCurrent ? 600 : 500, color: isPending ? '#94a3b8' : '#1e293b' }}>{stage}</div>
                  {isCurrent && <div style={{ fontSize: 11, color: '#F97316', marginTop: 2, fontWeight: 500 }}>● 当前阶段</div>}
                </div>
                {isDone && <div style={{ fontSize: 12, color: '#16a34a' }}>已完成</div>}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '10px 32px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

export default function WorkflowPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [detailS, setDetailS] = useState<Specimen | null>(null)
  const [trackS, setTrackS] = useState<Specimen | null>(null)

  const filtered = initialSamples.filter(s => {
    const matchText = !searchText || s.specimenId.includes(searchText) || s.patientName.includes(searchText)
    const matchType = !typeFilter || s.specimenType === typeFilter
    const matchStatus = !statusFilter || s.status === statusFilter
    const matchPriority = !priorityFilter || s.priority === priorityFilter
    return matchText && matchType && matchStatus && matchPriority
  })

  const stageCounts = {
    '待接收': initialSamples.filter(s => s.status === '待接收').length,
    '已接收': initialSamples.filter(s => s.status === '已接收').length,
    '制片中': initialSamples.filter(s => s.status === '制片中').length,
    '已切片': initialSamples.filter(s => s.status === '已切片').length,
    '阅片中': initialSamples.filter(s => s.status === '阅片中').length,
    '已完成': initialSamples.filter(s => s.status === '已完成').length,
  }

  // 类型分布
  const typeDistribution: Record<string, number> = {}
  initialSamples.forEach(s => {
    typeDistribution[s.specimenType] = (typeDistribution[s.specimenType] || 0) + 1
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#1e293b' }}>工作流管理</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ padding: '8px 16px', background: 'rgba(249,115,22,0.1)', color: '#F97316', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>标本流转管理</span>
        </div>
      </div>

      {/* 工作流看板 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
        {([
          ['待接收', stageCounts['待接收'], '#64748b'],
          ['已接收', stageCounts['已接收'], '#3b82f6'],
          ['制片中', stageCounts['制片中'], '#F97316'],
          ['已切片', stageCounts['已切片'], '#8b5cf6'],
          ['阅片中', stageCounts['阅片中'], '#d97706'],
          ['已完成', stageCounts['已完成'], '#16a34a'],
        ] as const).map(([stage, count, color]) => (
          <div key={stage} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `3px solid ${color}` }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>{stage}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color }}>{count}</div>
          </div>
        ))}
      </div>

      {/* 类型分布 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>标本类型分布</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(typeDistribution).map(([type, count]) => (
            <div key={type} style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>{type}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#F97316' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="搜索病理号/患者名..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 220, fontSize: 14, outline: 'none' }} onFocus={e => e.target.style.borderColor = '#F97316'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部类型</option>
            <option value="常规活检">常规活检</option>
            <option value="手术标本">手术标本</option>
            <option value="细胞学">细胞学</option>
            <option value="冰冻切片">冰冻切片</option>
            <option value="免疫组化">免疫组化</option>
            <option value="分子病理">分子病理</option>
            <option value="骨髓活检">骨髓活检</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部状态</option>
            <option value="待接收">待接收</option>
            <option value="已接收">已接收</option>
            <option value="制片中">制片中</option>
            <option value="已切片">已切片</option>
            <option value="阅片中">阅片中</option>
            <option value="已完成">已完成</option>
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部优先级</option>
            <option value="普通">普通</option>
            <option value="紧急">紧急</option>
            <option value="冰冻">冰冻</option>
          </select>
          {(searchText || typeFilter || statusFilter || priorityFilter) && (
            <button onClick={() => { setSearchText(''); setTypeFilter(''); setStatusFilter(''); setPriorityFilter('') }} style={{ padding: '10px 20px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>重置</button>
          )}
          <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>筛选结果：共 {filtered.length} 条</span>
        </div>
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['病理号', '患者姓名', '标本类型', '取材部位', '临床诊断', '科室', '接诊医生', '采集时间', '当前状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 12px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                暂无匹配的记录
              </td></tr>
            ) : filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: '14px 12px', fontSize: 14, fontFamily: 'monospace', color: '#F97316', fontWeight: 500 }}>{s.specimenId}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{s.patientName}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b' }}>
                  <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>{s.specimenType}</span>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b' }}>{s.specimenSource}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.clinicalDiagnosis}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b' }}>{s.department}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b' }}>{s.doctor}</td>
                <td style={{ padding: '14px 12px', fontSize: 14, color: '#64748b' }}>{s.collectTime}</td>
                <td style={{ padding: '14px 12px', fontSize: 14 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, background: s.status === '已完成' ? '#dcfce7' : s.status === '制片中' ? 'rgba(249,115,22,0.1)' : s.priority === '冰冻' ? '#dbeafe' : '#fef3c7', color: s.status === '已完成' ? '#166534' : s.status === '制片中' ? '#F97316' : s.priority === '冰冻' ? '#1e40af' : '#d97706' }}>{s.status}</span>
                    {s.priority === '紧急' && <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, background: '#fee2e2', color: '#dc2626', fontWeight: 600 }}>急</span>}
                    {s.priority === '冰冻' && <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, background: '#dbeafe', color: '#1e40af', fontWeight: 600 }}>冰</span>}
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 14 }}>
                  <button onClick={() => setDetailS(s)} style={{ padding: '6px 12px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, marginRight: 6 }}>详情</button>
                  <button onClick={() => setTrackS(s)} style={{ padding: '6px 12px', background: '#fff', color: '#F97316', border: '1px solid #F97316', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>追踪</button>
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

import { useState } from 'react'
import { frozenCases, FrozenCase } from '../data/initialData'

export default function FrozenPage() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [detail, setDetail] = useState<FrozenCase | null>(null)

  const filtered = frozenCases.filter(c => {
    const matchText = !searchText ||
      c.patientName.includes(searchText) ||
      c.specimenSource.includes(searchText) ||
      c.diagnosis.includes(searchText)
    const matchStatus = !statusFilter || c.status === statusFilter
    return matchText && matchStatus
  })

  const today = frozenCases.filter(c => c.status === '已完成').length
  const onTime = frozenCases.filter(c => c.elapsedMinutes <= c.turnaroundTarget).length

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>冰冻切片</h2>

      {/* 统计 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>今日冰冻</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>{frozenCases.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已完成</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{today}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>准时代出</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{onTime}/{today}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>超时</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{today - onTime}</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input type="text" placeholder="搜索患者/诊断..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 220 }} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部状态</option>
            <option value="已完成">已完成</option>
            <option value="进行中">进行中</option>
            <option value="超时">超时</option>
          </select>
          {(searchText || statusFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter('') }} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>清空</button>
          )}
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['患者', '性别/年龄', '手术类型', '取材部位', '术者', '接收时间', '切片时间', '诊断时间', '耗时(min)', '诊断', '结果', '病理医生', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 12px', color: '#475569', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={13} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无冰冻记录</td></tr>
            ) : filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 12px', fontSize: 14, fontWeight: 500 }}>{c.patientName}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.gender} / {c.age}岁</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.surgeryType}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.specimenSource}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.surgeon}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.receiveTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.sliceTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.diagnosisTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 14, fontFamily: 'monospace' }}>{c.elapsedMinutes}</td>
                <td style={{ padding: '12px 12px', fontSize: 14, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.diagnosis}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 11, background: c.result === '恶性' ? '#fee2e2' : '#dcfce7', color: c.result === '恶性' ? '#dc2626' : '#166534' }}>{c.result}</span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>{c.pathologist}</td>
                <td style={{ padding: '12px 12px', fontSize: 14 }}>
                  <button onClick={() => setDetail(c)} style={{ padding: '4px 10px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>冰冻详情</h3>
              <button onClick={() => setDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['患者', detail.patientName], ['性别/年龄', `${detail.gender}/${detail.age}岁`], ['手术', detail.surgeryType], ['取材', detail.specimenSource], ['术者', detail.surgeon], ['状态', detail.status], ['接收', detail.receiveTime], ['切片', detail.sliceTime], ['诊断', detail.diagnosisTime], ['耗时', `${detail.elapsedMinutes}分钟`], ['诊断', detail.diagnosis], ['结果', detail.result], ['医生', detail.pathologist], ['目标', `${detail.turnaroundTarget}分钟内`]].map(([l, v]) => (
                <div key={l}><div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{l}</div><div style={{ color: '#1e293b', fontSize: 14 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={() => setDetail(null)} style={{ padding: '8px 24px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

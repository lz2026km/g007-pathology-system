import { regionalHospitals } from '../data/initialData'

export default function RegionalPage() {
  // 计算统计数据
  const totalHospitals = regionalHospitals.length
  const onlineHospitals = regionalHospitals.filter(h => h.online).length
  const totalSubmitted = regionalHospitals.reduce((sum, h) => sum + h.casesSubmitted, 0)
  const totalReported = regionalHospitals.reduce((sum, h) => sum + h.casesReported, 0)
  const totalPending = regionalHospitals.reduce((sum, h) => sum + h.pendingCases, 0)
  const avgTurnaround = (regionalHospitals.reduce((sum, h) => sum + h.avgTurnaroundHours, 0) / totalHospitals).toFixed(1)

  // 按等级分组
  const hospitalsByLevel = regionalHospitals.reduce((acc, h) => {
    if (!acc[h.level]) acc[h.level] = []
    acc[h.level].push(h)
    return acc
  }, {} as Record<string, typeof regionalHospitals>)

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>区域病理数据中心</h2>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>接入医院</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{totalHospitals}</div>
          <div style={{ color: '#22c55e', fontSize: 12 }}>在线 {onlineHospitals}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>累计提交</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{totalSubmitted.toLocaleString()}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>累计报告</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{totalReported.toLocaleString()}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>待处理</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b' }}>{totalPending}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>平均 turnaround</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{avgTurnaround}h</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#64748b', fontSize: 13 }}>完成率</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#22c55e' }}>{((totalReported / totalSubmitted) * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* 医院列表 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>接入医院</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {regionalHospitals.map(h => (
            <div key={h.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{h.name}</span>
                  <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, background: '#f1f5f9', color: '#64748b' }}>{h.level}</span>
                </div>
                <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: h.online ? '#dcfce7' : '#fee2e2', color: h.online ? '#166534' : '#dc2626' }}>{h.online ? '在线' : '离线'}</span>
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>{h.address}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12, color: '#64748b' }}>
                <div>待处理：<span style={{ color: h.pendingCases > 0 ? '#f59e0b' : '#22c55e', fontWeight: 500 }}>{h.pendingCases}</span></div>
                <div>平均：<span style={{ fontWeight: 500 }}>{h.avgTurnaroundHours}h</span></div>
                <div>已提交：<span style={{ fontWeight: 500 }}>{h.casesSubmitted}</span></div>
                <div>已报告：<span style={{ fontWeight: 500 }}>{h.casesReported}</span></div>
              </div>
              {h.lastSubmitTime && (
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>最后提交：{h.lastSubmitTime}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 等级分布 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>医院等级分布</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {Object.entries(hospitalsByLevel).map(([level, hospitals]) => (
            <div key={level} style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{level}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>{hospitals.length} 家</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                在线 {hospitals.filter(h => h.online).length} | 离线 {hospitals.filter(h => !h.online).length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

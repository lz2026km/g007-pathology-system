import { systemStats, initialSamples, pathologyReports } from '../data/initialData'

export default function HomePage() {
  const recentSpecimens = initialSamples.slice(0, 6)
  const recentReports = pathologyReports.slice(0, 5)

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>病理科工作台</h2>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #1e40af' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>今日标本</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#1e40af' }}>{systemStats.todayCases}</div>
          <div style={{ color: '#16a34a', fontSize: 12, marginTop: 4 }}>↑ 待处理 {initialSamples.filter(s => s.status !== '已完成').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>今日报告</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#0891b2' }}>{systemStats.pendingReports}</div>
          <div style={{ color: '#d97706', fontSize: 12, marginTop: 4 }}>待审核</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>冰冻今日</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#7c3aed' }}>{systemStats.frozenToday}</div>
          <div style={{ color: '#16a34a', fontSize: 12, marginTop: 4 }}>全部准时代出 ({systemStats.frozenOnTime}/{systemStats.frozenToday})</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>会诊待处理</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#dc2626' }}>{systemStats.pendingConsultations}</div>
          <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>区域待报 {systemStats.regionalPending}</div>
        </div>
      </div>

      {/* 近期标本 & 报告 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* 近期标本 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>近期标本</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>病理号</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>患者</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>类型</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {recentSpecimens.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 0', fontSize: 13, fontFamily: 'monospace', color: '#1e40af' }}>{s.specimenId.slice(-6)}</td>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>{s.patientName}</td>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>{s.specimenType}</td>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: s.status === '已完成' ? '#dcfce7' : '#f1f5f9', color: s.status === '已完成' ? '#166534' : '#64748b' }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 近期报告 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>近期报告</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>报告号</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>患者</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>诊断</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#64748b', fontSize: 12 }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 0', fontSize: 13, fontFamily: 'monospace', color: '#1e40af' }}>{r.reportId.slice(-6)}</td>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>{r.patientName}</td>
                  <td style={{ padding: '10px 0', fontSize: 12, color: '#374151', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.diagnosis}</td>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: r.status === '已审核' ? '#dcfce7' : '#fef3c7', color: r.status === '已审核' ? '#166534' : '#d97706' }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 质控指标 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>质控指标</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <div>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>平均Turnaround Time</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1e40af' }}>{systemStats.avgTurnaround}</div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>本月质控评分</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#16a34a' }}>{systemStats.qcScore}</div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>冰冻及时率</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#7c3aed' }}>100%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

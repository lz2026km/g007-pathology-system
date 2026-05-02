import { systemStats, initialSamples, initialReports } from '../data/initialData'

export default function Dashboard() {
  const pendingSamples = initialSamples.filter(s => s.status !== '已完成').length
  const pendingReports = initialReports.filter(r => r.status !== '已发布').length

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>首页</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>今日接收样本</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1a237e' }}>{systemStats.todaySamples}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>待处理样本</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#f57c00' }}>{pendingSamples}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>待审核报告</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#c62828' }}>{pendingReports}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>今日完成</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2e7d32' }}>{systemStats.completedToday}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>近期样本</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>样本ID</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>类型</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {initialSamples.slice(0, 5).map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{s.id}</td>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{s.sampleType}</td>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>待审核报告</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>报告ID</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>诊断</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666', fontSize: 13 }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {initialReports.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{r.id}</td>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{r.diagnosis}</td>
                  <td style={{ padding: '8px 0', fontSize: 14 }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

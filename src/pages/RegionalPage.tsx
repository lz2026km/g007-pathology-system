import { initialReports } from '../data/initialData'

export default function Reporting() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>报告管理</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="搜索报告..."
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }}
          />
          <button style={{ padding: '8px 16px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            新增报告
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>报告ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>患者ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>样本ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>诊断</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>病理医师</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>日期</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>状态</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {initialReports.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.id}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.patientId}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.sampleId}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.diagnosis}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.pathologist}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.date}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{r.status}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>
                  <button style={{ padding: '4px 8px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

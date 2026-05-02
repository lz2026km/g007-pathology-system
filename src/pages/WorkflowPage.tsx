import { initialSamples } from '../data/initialData'

export default function SampleReception() {
  const pendingSamples = initialSamples.filter(s => s.status === '待处理' || s.status === '已接收')

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>样本接收</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="搜索样本..."
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }}
          />
          <button style={{ padding: '8px 16px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            新增接收
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>样本ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>患者ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>样本类型</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>接收日期</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>状态</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>存放位置</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {pendingSamples.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.id}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.patientId}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.sampleType}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.receivedDate}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.status}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{s.location}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>
                  <button style={{ padding: '4px 8px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>接收</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

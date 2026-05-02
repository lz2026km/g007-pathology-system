import { initialStainBatches } from '../data/initialData'

export default function Staining() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>染色</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="搜索批次..."
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }}
          />
          <button style={{ padding: '8px 16px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            新增染色批次
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>批次ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>染色类型</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>日期</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作员</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>状态</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {initialStainBatches.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{b.id}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{b.stainType}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{b.date}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{b.operator}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{b.status}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>
                  <button style={{ padding: '4px 8px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

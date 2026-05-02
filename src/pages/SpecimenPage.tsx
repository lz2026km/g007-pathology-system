import { initialPatients } from '../data/initialData'

export default function PatientManagement() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>患者管理</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="搜索患者..."
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }}
          />
          <button style={{ padding: '8px 16px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            新增患者
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>患者ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>姓名</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>性别</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>年龄</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>身份证号</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>电话</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>地址</th>
            </tr>
          </thead>
          <tbody>
            {initialPatients.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.id}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.name}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.gender}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.age}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.idCard}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.phone}</td>
                <td style={{ padding: '12px 8px', fontSize: 14 }}>{p.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Sectioning() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>切片</h2>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="搜索样本..."
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 240 }}
          />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>样本ID</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>样本类型</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>蜡块数量</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>切片数量</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>状态</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无待切片样本</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

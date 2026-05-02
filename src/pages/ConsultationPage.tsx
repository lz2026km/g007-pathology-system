export default function QualityControl() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>质量控制</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>今日染色批次</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1a237e' }}>5</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>合格率</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2e7d32' }}>98%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 14 }}>异常批次</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#c62828' }}>0</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>质控记录</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>日期</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>类型</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>结果</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: 13, fontWeight: 500 }}>操作员</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无质控记录</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

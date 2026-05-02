export default function Settings() {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>系统设置</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>设置分类</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['基本信息', '用户管理', '角色权限', '系统参数', '数据备份'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '10px 12px',
                  borderRadius: 4,
                  background: i === 0 ? '#e8eaf6' : 'transparent',
                  color: i === 0 ? '#1a237e' : '#333',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>基本信息</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: '#666', fontSize: 13 }}>医院名称</label>
              <input
                type="text"
                defaultValue="XX医院病理科"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: '#666', fontSize: 13 }}>科室名称</label>
              <input
                type="text"
                defaultValue="病理科"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: '#666', fontSize: 13 }}>联系电话</label>
              <input
                type="text"
                defaultValue="010-12345678"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: '#666', fontSize: 13 }}>地址</label>
              <input
                type="text"
                defaultValue="北京市朝阳区"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
              />
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <button style={{ padding: '8px 24px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('基本信息')
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    hospitalName: '上海市第一人民医院病理科',
    deptName: '病理科',
    phone: '021-12345678',
    address: '上海市虹口区武进路85号',
    pathologyCode: '31000001',
    director: '张建国',
    pathologistCount: '12',
    reportTurnaround: '48',
    frozenTime: '30',
    consultationTime: '24',
    criticalValueNotice: '021-12345678',
    regionEnabled: 'true',
    autoBackup: 'true',
  })

  const tabs = ['基本信息', '用户管理', '角色权限', '系统参数', '数据备份']
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  const field = (label: string, key: string, type = 'text') => (
    <div>
      <label style={{ display: 'block', marginBottom: 4, color: '#666', fontSize: 13 }}>{label}</label>
      <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }} />
    </div>
  )

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>系统设置</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>设置分类</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tabs.map((item) => (
              <div key={item} onClick={() => setActiveTab(item)} style={{
                padding: '10px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 14,
                background: activeTab === item ? '#e8eaf6' : 'transparent',
                color: activeTab === item ? '#1a237e' : '#333', fontWeight: activeTab === item ? 600 : 400,
              }}>{item}</div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{activeTab}</h3>
          {activeTab === '基本信息' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {field('医院名称', 'hospitalName')}
                {field('科室名称', 'deptName')}
                {field('联系电话', 'phone')}
                {field('地址', 'address')}
                {field('病理编码', 'pathologyCode')}
                {field('科室主任', 'director')}
                {field('病理医生数', 'pathologistCount', 'number')}
              </div>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={handleSave} style={{ padding: '8px 24px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>
                  保存设置
                </button>
                {saved && <span style={{ color: '#16a34a', fontSize: 13 }}>✓ 保存成功</span>}
              </div>
            </div>
          )}
          {activeTab === '系统参数' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {field('报告TAT目标(h)', 'reportTurnaround', 'number')}
                {field('冰冻切片时限(min)', 'frozenTime', 'number')}
                {field('会诊响应时限(h)', 'consultationTime', 'number')}
                {field('危急值通知电话', 'criticalValueNotice')}
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> 启用区域病理协作
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 8 }}>
                  <input type="checkbox" defaultChecked /> 启用自动备份
                </label>
              </div>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={handleSave} style={{ padding: '8px 24px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>
                  保存参数
                </button>
                {saved && <span style={{ color: '#16a34a', fontSize: 13 }}>✓ 保存成功</span>}
              </div>
            </div>
          )}
          {activeTab === '用户管理' && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              用户管理功能（待实现）
            </div>
          )}
          {activeTab === '角色权限' && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              角色权限功能（待实现）
            </div>
          )}
          {activeTab === '数据备份' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b' }}>上次备份</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>2025-05-02 03:00</div>
                </div>
                <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b' }}>备份状态</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#16a34a', marginTop: 4 }}>正常</div>
                </div>
              </div>
              <button onClick={handleSave} style={{ padding: '8px 24px', background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>
                立即备份
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

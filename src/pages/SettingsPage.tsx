import { useState } from 'react'

// 报告模板类型
interface ReportTemplate {
  id: number
  name: string
  type: string
  scene: string
  isDefault: boolean
}

// 危急值配置类型
interface CriticalValue {
  id: number
  item: string
  range: string
  level: string
  notify: string
}

// 用户角色类型
interface UserRole {
  id: number
  name: string
  permissions: string
  status: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('基础设置')
  const [saved, setSaved] = useState(false)

  // 基础设置表单
  const [basicForm, setBasicForm] = useState({
    systemName: '病理信息管理系统',
    hospitalName: '上海市第一人民医院病理科',
    printTitle: '上海市第一人民医院病理科',
    printSubtitle: '病理检查报告单',
    frozenTime: '30',
    reportTime: '48',
    ihcTime: '72',
  })

  // 报告模板数据
  const [templates] = useState<ReportTemplate[]>([
    { id: 1, name: '常规活检报告模板', type: '标准模板', scene: '常规活检', isDefault: true },
    { id: 2, name: '手术标本报告模板', type: '标准模板', scene: '手术标本', isDefault: false },
    { id: 3, name: '冰冻切片快速模板', type: '快速模板', scene: '冰冻切片', isDefault: false },
    { id: 4, name: '细胞学检查模板', type: '标准模板', scene: '细胞学', isDefault: false },
    { id: 5, name: '免疫组化报告模板', type: '专用模板', scene: '免疫组化', isDefault: false },
  ])

  // 危急值配置数据
  const [criticalValues] = useState<CriticalValue[]>([
    { id: 1, item: '冰冻阳性', range: '阳性', level: '紧急', notify: '电话+短信' },
    { id: 2, item: '术中冰冻延期', range: '>60min', level: '警告', notify: '电话' },
    { id: 3, item: '组织取材不合格', range: '-', level: '警告', notify: '短信' },
    { id: 4, item: '免疫组化质控异常', range: '质控失败', level: '紧急', notify: '电话+短信' },
    { id: 5, item: '报告延迟预警', range: '>48h', level: '提醒', notify: '系统通知' },
  ])

  // 用户角色数据
  const [userRoles] = useState<UserRole[]>([
    { id: 1, name: '系统管理员', permissions: '全部功能', status: '启用' },
    { id: 2, name: '主任医师', permissions: '报告审核、统计查看', status: '启用' },
    { id: 3, name: '主治医师', permissions: '报告书写、提交', status: '启用' },
    { id: 4, name: '住院医师', permissions: '接收任务、取材记录', status: '启用' },
    { id: 5, name: '技术员', permissions: '制片、录入', status: '启用' },
    { id: 6, name: '录入员', permissions: '录入、打印', status: '禁用' },
  ])

  const tabs = ['基础设置', '报告模板', '危急值配置', '用户权限']

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSetDefault = (id: number) => {
    console.log('设置默认模板:', id)
  }

  const handlePreview = (id: number) => {
    console.log('预览模板:', id)
  }

  const handleEdit = (id: number) => {
    console.log('编辑模板:', id)
  }

  const getLevelStyle = (level: string) => {
    switch (level) {
      case '紧急': return { background: '#fef2f2', color: '#dc2626' }
      case '警告': return { background: '#fefce8', color: '#ca8a04' }
      case '提醒': return { background: '#f0fdf4', color: '#16a34a' }
      default: return { background: '#f1f5f9', color: '#64748b' }
    }
  }

  const getStatusStyle = (status: string) => {
    return status === '启用'
      ? { background: '#dcfce7', color: '#166534' }
      : { background: '#fee2e2', color: '#991b1b' }
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>系统管理</h2>

      {/* Tab 切换 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '2px solid #e2e8f0' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? '#1e40af' : '#64748b',
              borderBottom: activeTab === tab ? '2px solid #1e40af' : '2px solid transparent',
              marginBottom: -2,
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 基础设置 */}
      {activeTab === '基础设置' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: '#1e293b' }}>基础设置</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>系统名称</label>
              <input
                type="text"
                value={basicForm.systemName}
                onChange={e => setBasicForm({ ...basicForm, systemName: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>医院名称</label>
              <input
                type="text"
                value={basicForm.hospitalName}
                onChange={e => setBasicForm({ ...basicForm, hospitalName: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>打印标题</label>
              <input
                type="text"
                value={basicForm.printTitle}
                onChange={e => setBasicForm({ ...basicForm, printTitle: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>打印副标题</label>
              <input
                type="text"
                value={basicForm.printSubtitle}
                onChange={e => setBasicForm({ ...basicForm, printSubtitle: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>Logo上传</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 11 }}>
                  Logo
                </div>
                <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 13, color: '#64748b' }}>
                  上传图片
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>打印设置</label>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={basicForm.frozenTime}
                    onChange={e => setBasicForm({ ...basicForm, frozenTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
                    placeholder="冰冻(min)"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={basicForm.reportTime}
                    onChange={e => setBasicForm({ ...basicForm, reportTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
                    placeholder="报告(h)"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={basicForm.ihcTime}
                    onChange={e => setBasicForm({ ...basicForm, ihcTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }}
                    placeholder="IHC(h)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={handleSave} style={{ padding: '10px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>
              保存设置
            </button>
            {saved && <span style={{ color: '#16a34a', fontSize: 13 }}>✓ 保存成功</span>}
          </div>
        </div>
      )}

      {/* 报告模板 */}
      {activeTab === '报告模板' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>报告模板管理</h3>
            <button style={{ padding: '8px 16px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
              + 新增模板
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                {['模板名称', '类型', '适用场景', '默认', '操作'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{t.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>{t.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>{t.scene}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    {t.isDefault && (
                      <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: '#dcfce7', color: '#166534' }}>默认</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(t.id)} style={{ padding: '4px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#64748b' }}>编辑</button>
                      <button onClick={() => handlePreview(t.id)} style={{ padding: '4px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#64748b' }}>预览</button>
                      {!t.isDefault && (
                        <button onClick={() => handleSetDefault(t.id)} style={{ padding: '4px 12px', background: '#fff', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#1e40af' }}>设为默认</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 危急值配置 */}
      {activeTab === '危急值配置' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>危急值项目管理</h3>
            <button style={{ padding: '8px 16px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
              + 添加项目
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                {['项目名称', '数值范围', '提示级别', '通知方式', '操作'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criticalValues.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{c.item}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b', fontFamily: 'monospace' }}>{c.range}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 10, fontSize: 12, ...getLevelStyle(c.level) }}>{c.level}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>{c.notify}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '4px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#64748b' }}>编辑</button>
                      <button style={{ padding: '4px 12px', background: '#fff', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#dc2626' }}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 用户权限 */}
      {activeTab === '用户权限' && (
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>用户角色管理</h3>
            <button style={{ padding: '8px 16px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
              + 添加角色
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                {['角色名称', '功能权限', '状态', '操作'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRoles.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>{r.permissions}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 10, fontSize: 12, ...getStatusStyle(r.status) }}>{r.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '4px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#64748b' }}>编辑</button>
                      <button style={{ padding: '4px 12px', background: '#fff', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 12, color: '#dc2626' }}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

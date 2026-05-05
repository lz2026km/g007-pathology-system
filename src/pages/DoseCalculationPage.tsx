import { useState } from 'react'

// 18F-FDG剂量计算记录
export interface DoseRecord {
  id: string; patientId: string; patientName: string; gender: '男' | '女'; age: number
  weight: number; height: number; bmi: number; dose: number; injectionTime: string
  scanTime: string; halfLife: number; status: '待注射' | '已注射' | '已完成'; technician: string
}

// 10条模拟数据
const mockData: DoseRecord[] = [
  { id: '1', patientId: 'PET2026050101', patientName: '张伟', gender: '男', age: 58, weight: 72, height: 175, bmi: 23.5, dose: 324, injectionTime: '09:30', scanTime: '10:00', halfLife: 95, status: '已完成', technician: '李娜' },
  { id: '2', patientId: 'PET2026050102', patientName: '王芳', gender: '女', age: 45, weight: 55, height: 162, bmi: 21.0, dose: 248, injectionTime: '09:45', scanTime: '10:15', halfLife: 92, status: '已完成', technician: '李娜' },
  { id: '3', patientId: 'PET2026050103', patientName: '李强', gender: '男', age: 62, weight: 85, height: 180, bmi: 26.2, dose: 383, injectionTime: '10:00', scanTime: '10:30', halfLife: 88, status: '已注射', technician: '张华' },
  { id: '4', patientId: 'PET2026050104', patientName: '刘洋', gender: '男', age: 35, weight: 68, height: 170, bmi: 23.5, dose: 306, injectionTime: '10:15', scanTime: '10:45', halfLife: 85, status: '待注射', technician: '张华' },
  { id: '5', patientId: 'PET2026050105', patientName: '陈静', gender: '女', age: 52, weight: 60, height: 158, bmi: 24.0, dose: 270, injectionTime: '10:30', scanTime: '11:00', halfLife: 82, status: '待注射', technician: '王丽' },
  { id: '6', patientId: 'PET2026050106', patientName: '赵磊', gender: '男', age: 48, weight: 78, height: 172, bmi: 26.4, dose: 351, injectionTime: '11:00', scanTime: '11:30', halfLife: 78, status: '待注射', technician: '王丽' },
  { id: '7', patientId: 'PET2026050107', patientName: '孙梅', gender: '女', age: 40, weight: 52, height: 160, bmi: 20.3, dose: 234, injectionTime: '11:15', scanTime: '11:45', halfLife: 75, status: '待注射', technician: '李娜' },
  { id: '8', patientId: 'PET2026050108', patientName: '周涛', gender: '男', age: 55, weight: 82, height: 178, bmi: 25.9, dose: 369, injectionTime: '11:30', scanTime: '12:00', halfLife: 72, status: '待注射', technician: '张华' },
  { id: '9', patientId: 'PET2026050109', patientName: '吴婷', gender: '女', age: 38, weight: 48, height: 155, bmi: 20.0, dose: 216, injectionTime: '12:00', scanTime: '12:30', halfLife: 68, status: '待注射', technician: '王丽' },
  { id: '10', patientId: 'PET2026050110', patientName: '郑凯', gender: '男', age: 65, weight: 90, height: 182, bmi: 27.2, dose: 405, injectionTime: '12:15', scanTime: '12:45', halfLife: 65, status: '待注射', technician: '李娜' },
]

// 计算剂量 (MBq) = 体重(kg) × 4.5 MBq/kg
const calculateDose = (weight: number): number => Math.round(weight * 4.5)

export default function DoseCalculationPage() {
  const [records] = useState<DoseRecord[]>(mockData)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [detail, setDetail] = useState<DoseRecord | null>(null)
  const [manualWeight, setManualWeight] = useState('')
  const [calculatedDose, setCalculatedDose] = useState<number | null>(null)

  const filtered = records.filter(r => {
    const matchText = !searchText || r.patientId.includes(searchText) || r.patientName.includes(searchText)
    const matchStatus = !statusFilter || r.status === statusFilter
    return matchText && matchStatus
  })

  const handleCalculate = () => {
    const w = parseFloat(manualWeight)
    if (w && w > 0) setCalculatedDose(calculateDose(w))
  }

  const completedCount = records.filter(r => r.status === '已完成').length
  const injectionCount = records.filter(r => r.status === '已注射').length
  const pendingCount = records.filter(r => r.status === '待注射').length
  const totalDose = records.reduce((sum, r) => sum + r.dose, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#1e293b' }}>个体剂量计算</h2>
        <span style={{ padding: '8px 16px', background: 'rgba(30,64,175,0.1)', color: '#1e40af', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
          🧪 ¹⁸F-FDG PET/CT剂量管理
        </span>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #1e40af' }}>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>📊 总检查人数</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>{records.length}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Calculator</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>✅ 已完成</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{completedCount}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Activity</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #d97706' }}>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>💉 已注射</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{injectionCount}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Clock</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>⏳ 待注射</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{pendingCount}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>AlertCircle</div>
        </div>
      </div>

      {/* 剂量计算器 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>🧮 快速剂量计算</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: 12, color: '#64748b', marginBottom: 4, display: 'block' }}>体重 (kg)</label>
            <input type="number" value={manualWeight} onChange={e => setManualWeight(e.target.value)} placeholder="例如: 70"
              style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 140, fontSize: 14, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#1e40af'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <button onClick={handleCalculate}
            style={{ padding: '10px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            计算剂量
          </button>
          {calculatedDose !== null && (
            <div style={{ padding: '10px 20px', background: 'rgba(30,64,175,0.1)', borderRadius: 8, border: '1px solid rgba(30,64,175,0.2)' }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>推荐剂量: </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#1e40af' }}>{calculatedDose}</span>
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 4 }}>MBq</span>
            </div>
          )}
          <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 12 }}>
            剂量系数: 4.5 MBq/kg | 今日总剂量: <strong style={{ color: '#1e40af' }}>{totalDose}</strong> MBq
          </span>
        </div>
      </div>

      {/* 筛选 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input type="text" placeholder="搜索患者ID/姓名..." value={searchText} onChange={e => setSearchText(e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 240, fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#1e40af'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', cursor: 'pointer' }}>
            <option value="">全部状态</option>
            <option value="待注射">待注射</option>
            <option value="已注射">已注射</option>
            <option value="已完成">已完成</option>
          </select>
          {(searchText || statusFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter('') }}
              style={{ padding: '10px 20px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              清空
            </button>
          )}
          <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>共 {filtered.length} 条记录</span>
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['患者ID', '姓名', '性别', '年龄', '体重(kg)', '剂量(MBq)', '注射时间', '状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{r.patientId}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{r.patientName}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{r.gender}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{r.age}岁</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{r.weight}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#1e40af' }}>{r.dose}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#64748b' }}>{r.injectionTime}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                    background: r.status === '已完成' ? '#dcfce7' : r.status === '已注射' ? '#fef3c7' : '#fee2e2',
                    color: r.status === '已完成' ? '#166534' : r.status === '已注射' ? '#d97706' : '#dc2626'
                  }}>{r.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => setDetail(r)}
                    style={{ padding: '6px 14px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                    详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 详情弹窗 */}
      {detail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>剂量详情</h3>
              <button onClick={() => setDetail(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['患者ID', detail.patientId], ['姓名', detail.patientName], ['性别', detail.gender], ['年龄', `${detail.age}岁`],
                ['体重', `${detail.weight} kg`], ['身高', `${detail.height} cm`], ['BMI', detail.bmi.toFixed(1)],
                ['注射剂量', `${detail.dose} MBq`], ['注射时间', detail.injectionTime], ['扫描时间', detail.scanTime],
                ['半衰期残余', `${detail.halfLife} min`], ['状态', detail.status],
              ].map(([l, v]) => (
                <div key={l} style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{l}</div>
                  <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: 16, background: 'rgba(30,64,175,0.05)', borderRadius: 12, border: '1px solid rgba(30,64,175,0.1)' }}>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>💡 计算说明</div>
              <div style={{ color: '#374151', fontSize: 13, lineHeight: 1.7 }}>
                ¹⁸F-FDG剂量 = 体重 × 4.5 MBq/kg<br />本次剂量根据体重 {detail.weight}kg 计算得出
              </div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button onClick={() => setDetail(null)}
                style={{ padding: '10px 32px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

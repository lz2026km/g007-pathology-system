import { useState } from 'react'
import { initialSamples, Specimen } from '../data/initialData'

// 详情弹窗
function DetailModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, width: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>标本详情</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1
          }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            ['病理号', specimen.specimenId],
            ['患者姓名', specimen.patientName],
            ['性别/年龄', `${specimen.gender} / ${specimen.age}岁`],
            ['标本类型', specimen.specimenType],
            ['取材部位', specimen.specimenSource],
            ['临床诊断', specimen.clinicalDiagnosis],
            ['科室', specimen.department],
            ['接诊医生', specimen.doctor],
            ['采集时间', specimen.collectTime],
            ['接收时间', specimen.receiveTime],
            ['优先级', specimen.priority],
            ['状态', specimen.status],
          ].map(([label, value]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <button onClick={onClose} style={{
              padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14
            }}>关闭</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 条码弹窗
function BarcodeModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
  const barcodeStr = `*${specimen.specimenId}*`
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, width: 400,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>条码打印</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1
          }}>×</button>
        </div>
        <div style={{
          background: '#fff', border: '2px solid #000', padding: '20px 40px',
          display: 'inline-block', margin: '16px 0', fontFamily: 'monospace', fontSize: 20, letterSpacing: 4
        }}>
          {barcodeStr}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>{specimen.specimenId}</div>
        <div style={{ marginTop: 20 }}>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14
          }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

// 新增标本弹窗
function AddSpecimenModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: Specimen) => void }) {
  const [form, setForm] = useState({
    specimenId: `P${Date.now().toString().slice(-8)}`,
    patientId: `PT${Date.now().toString().slice(-6)}`,
    patientName: '', gender: '男' as const, age: 0, specimenType: '常规活检',
    specimenSource: '', clinicalDiagnosis: '', department: '', doctor: '',
    collectTime: '', receiveTime: new Date().toLocaleString('zh-CN'), priority: '普通', status: '待接收', reportTime: ''
  })
  const handleSubmit = () => {
    if (!form.patientName || !form.age) return
    onAdd({ ...form, id: `S${Date.now().toString().slice(-6)}` } as Specimen)
    onClose()
  }
  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</label>
      {type === 'select' ? (
        <select value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
          {key === 'gender' && <><option value="男">男</option><option value="女">女</option></>}
          {key === 'specimenType' && <>
            <option value="常规活检">常规活检</option><option value="手术标本">手术标本</option>
            <option value="细胞学">细胞学</option><option value="冰冻切片">冰冻切片</option>
            <option value="免疫组化">免疫组化</option><option value="分子病理">分子病理</option>
            <option value="骨髓活检">骨髓活检</option>
          </>}
          {key === 'priority' && <>
            <option value="普通">普通</option><option value="紧急">紧急</option><option value="冰冻">冰冻</option>
          </>}
          {key === 'status' && <>
            <option value="待接收">待接收</option><option value="已接收">已接收</option>
            <option value="制片中">制片中</option><option value="已切片">已切片</option>
            <option value="审核中">审核中</option><option value="已完成">已完成</option>
          </>}
        </select>
      ) : (
        <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }} />
      )}
    </div>
  )
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, width: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>新增标本</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {field('病理号 *', 'specimenId')}
          {field('患者姓名 *', 'patientName', 'text', '请输入姓名')}
          {field('性别', 'gender', 'select')}
          {field('年龄 *', 'age', 'number', '请输入年龄')}
          {field('标本类型', 'specimenType', 'select')}
          {field('取材部位', 'specimenSource', 'text', '请输入取材部位')}
          {field('临床诊断', 'clinicalDiagnosis', 'text', '请输入临床诊断')}
          {field('科室', 'department', 'text', '请输入科室')}
          {field('接诊医生', 'doctor', 'text', '请输入医生姓名')}
          {field('采集时间', 'collectTime', 'datetime-local')}
          {field('优先级', 'priority', 'select')}
          {field('状态', 'status', 'select')}
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>确认添加</button>
        </div>
      </div>
    </div>
  )
}

export default function SpecimenPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [detailSpecimen, setDetailSpecimen] = useState<Specimen | null>(null)
  const [barcodeSpecimen, setBarcodeSpecimen] = useState<Specimen | null>(null)
  const [specimens, setSpecimens] = useState<Specimen[]>(initialSamples)

  const filtered = specimens.filter(s => {
    const matchText = !searchText ||
      s.specimenId.toLowerCase().includes(searchText.toLowerCase()) ||
      s.patientName.toLowerCase().includes(searchText.toLowerCase())
    const matchType = !typeFilter || s.specimenType === typeFilter
    const matchStatus = !statusFilter || s.status === statusFilter
    return matchText && matchType && matchStatus
  })

  const handleAdd = (s: Specimen) => {
    setSpecimens(prev => [s, ...prev])
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>标本管理</h2>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>今日标本</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>{specimens.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待处理</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{specimens.filter(s => s.status === '待接收' || s.status === '已接收').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>制片中</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{specimens.filter(s => s.status === '制片中' || s.status === '已切片').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已完成</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{specimens.filter(s => s.status === '已完成').length}</div>
        </div>
      </div>

      {/* 操作栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="搜索病理号/患者姓名..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 220 }}
            />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
              <option value="">全部类型</option>
              <option value="常规活检">常规活检</option>
              <option value="手术标本">手术标本</option>
              <option value="细胞学">细胞学</option>
              <option value="冰冻切片">冰冻切片</option>
              <option value="免疫组化">免疫组化</option>
              <option value="分子病理">分子病理</option>
              <option value="骨髓活检">骨髓活检</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
              <option value="">全部状态</option>
              <option value="待接收">待接收</option>
              <option value="已接收">已接收</option>
              <option value="制片中">制片中</option>
              <option value="已切片">已切片</option>
              <option value="审核中">审核中</option>
              <option value="已完成">已完成</option>
            </select>
            {(searchText || typeFilter || statusFilter) && (
              <button onClick={() => { setSearchText(''); setTypeFilter(''); setStatusFilter('') }}
                style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
                清空筛选
              </button>
            )}
          </div>
          <button onClick={() => setShowAdd(true)} style={{ padding: '8px 20px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>
            + 新增标本
          </button>
        </div>
        {(searchText || typeFilter || statusFilter) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
            筛选结果：共 {filtered.length} 条 / 总计 {specimens.length} 条
          </div>
        )}
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['病理号', '患者姓名', '性别/年龄', '标本类型', '取材部位', '临床诊断', '科室', '接诊医生', '采集时间', '优先级', '状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={12} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无匹配的标本记录</td></tr>
            ) : filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{s.specimenId}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>{s.patientName}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.gender} / {s.age}岁</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.specimenType}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.specimenSource}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.clinicalDiagnosis}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.department}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.doctor}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>{s.collectTime}</td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500,
                    background: s.priority === '冰冻' ? '#fee2e2' : s.priority === '紧急' ? '#fef3c7' : '#f1f5f9',
                    color: s.priority === '冰冻' ? '#dc2626' : s.priority === '紧急' ? '#d97706' : '#64748b'
                  }}>{s.priority}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 14 }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500,
                    background: s.status === '已完成' ? '#dcfce7' : s.status === '制片中' ? '#dbeafe' : s.status === '审核中' ? '#fef3c7' : '#f1f5f9',
                    color: s.status === '已完成' ? '#166534' : s.status === '制片中' ? '#1e40af' : s.status === '审核中' ? '#d97706' : '#64748b'
                  }}>{s.status}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 14, whiteSpace: 'nowrap' }}>
                  <button onClick={() => setDetailSpecimen(s)} style={{ padding: '4px 10px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                  <button onClick={() => setBarcodeSpecimen(s)} style={{ padding: '4px 10px', background: '#fff', color: '#1e40af', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>条码</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && <AddSpecimenModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {detailSpecimen && <DetailModal specimen={detailSpecimen} onClose={() => setDetailSpecimen(null)} />}
      {barcodeSpecimen && <BarcodeModal specimen={barcodeSpecimen} onClose={() => setBarcodeSpecimen(null)} />}
    </div>
  )
}

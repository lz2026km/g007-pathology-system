import { useState } from 'react'
import { initialSamples, Specimen } from '../data/initialData'

const ORANGE = '#F97316'
const ORANGE_LIGHT = '#fff7ed'
const ORANGE_BORDER = '#fed7aa'

// 状态颜色
const statusColor = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    '待接收': { bg: '#fef3c7', color: '#d97706' },
    '已接收': { bg: '#ffedd5', color: '#ea580c' },
    '制片中': { bg: '#dbeafe', color: '#2563eb' },
    '已切片': { bg: '#e0e7ff', color: '#4f46e5' },
    '阅片中': { bg: '#fce7f3', color: '#db2777' },
    '已诊断': { bg: '#f3e8ff', color: '#9333ea' },
    '审核中': { bg: '#fef3c7', color: '#d97706' },
    '已完成': { bg: '#dcfce7', color: '#16a34a' },
    '已打印': { bg: '#d1fae5', color: '#059669' },
  }
  return map[s] || { bg: '#f1f5f9', color: '#64748b' }
}

// 优先级颜色
const priorityColor = (p: string) => {
  if (p === '冰冻') return { bg: '#fee2e2', color: '#dc2626' }
  if (p === '紧急') return { bg: '#fef3c7', color: '#d97706' }
  return { bg: '#f1f5f9', color: '#64748b' }
}

// 流程步骤配置
const WORKFLOW_STEPS = ['待接收', '已接收', '制片中', '已切片', '阅片中', '已诊断', '审核中', '已完成']

// 工作流步骤条
function WorkflowStepper({ currentStatus }: { currentStatus: string }) {
  const currentIndex = WORKFLOW_STEPS.indexOf(currentStatus)
  if (currentIndex === -1) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 8 }}>
      {WORKFLOW_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex
        const isCurrent = i === currentIndex
        const isLast = i === WORKFLOW_STEPS.length - 1
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: isCompleted ? ORANGE : isCurrent ? ORANGE : '#e2e8f0',
                color: isCompleted || isCurrent ? '#fff' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600,
                border: isCurrent ? `2px solid ${ORANGE}` : 'none',
                boxShadow: isCurrent ? `0 0 0 3px ${ORANGE_BORDER}` : 'none',
              }}>
                {isCompleted ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 10, color: isCurrent ? ORANGE : '#94a3b8', marginTop: 2, whiteSpace: 'nowrap' }}>{step}</div>
            </div>
            {!isLast && (
              <div style={{
                width: 32, height: 2,
                background: i < currentIndex ? ORANGE : '#e2e8f0',
                margin: '0 2px', marginBottom: 18,
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// 详情弹窗
function DetailModal({ specimen, onClose, onUpdate }: { specimen: Specimen; onClose: () => void; onUpdate: (id: string, status: string) => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'workflow'>('info')
  const currentIndex = WORKFLOW_STEPS.indexOf(specimen.status)

  const nextStatus = currentIndex >= 0 && currentIndex < WORKFLOW_STEPS.length - 1
    ? WORKFLOW_STEPS[currentIndex + 1]
    : null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 0, width: 680,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>标本详情</h3>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{specimen.specimenId}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {nextStatus && (
              <button
                onClick={() => { onUpdate(specimen.id, nextStatus); onClose() }}
                style={{ padding: '6px 16px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                推进至 {nextStatus}
              </button>
            )}
            <button onClick={onClose} style={{
              background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1
            }}>×</button>
          </div>
        </div>

        {/* 标签页 */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 24px' }}>
          {[['info', '基本信息'], ['workflow', '流程跟踪']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: activeTab === key ? 600 : 400,
                color: activeTab === key ? ORANGE : '#64748b',
                borderBottom: activeTab === key ? `2px solid ${ORANGE}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 内容 */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {activeTab === 'info' ? (
            <>
              {/* 状态栏 */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <span style={{ ...priorityColor(specimen.priority), padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>{specimen.priority}</span>
                <span style={{ ...statusColor(specimen.status), padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>{specimen.status}</span>
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
                  ['报告时间', specimen.reportTime || '-'],
                ].map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 16 }}>标本处理流程</div>
                <WorkflowStepper currentStatus={specimen.status} />
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>预计完成时间</div>
                <div style={{ background: ORANGE_LIGHT, borderRadius: 8, padding: 12, borderLeft: `4px solid ${ORANGE}` }}>
                  <div style={{ fontSize: 13, color: '#1e293b' }}>
                    {specimen.specimenType === '冰冻切片' ? '30分钟内' :
                     specimen.specimenType === '常规活检' ? '3个工作日' :
                     specimen.specimenType === '手术标本' ? '5个工作日' : '7个工作日'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14
          }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

// 条码弹窗
function BarcodeModal({ specimen, onClose }: { specimen: Specimen; onClose: () => void }) {
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
          background: '#fff', border: `3px solid ${ORANGE}`, padding: '24px 40px',
          display: 'inline-block', margin: '16px 0', fontFamily: 'monospace', fontSize: 22, letterSpacing: 4, fontWeight: 700, color: '#1e293b'
        }}>
          {specimen.specimenId}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>{specimen.patientName} | {specimen.specimenType}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{specimen.specimenSource}</div>
        <div style={{ marginTop: 20 }}>
          <button onClick={onClose} style={{
            padding: '8px 24px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14
          }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

// 新增标本弹窗
function AddSpecimenModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: Specimen) => void }) {
  const [form, setForm] = useState({
    specimenId: `BX${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(Date.now()).slice(-6)}`,
    patientId: `PT${Date.now().toString().slice(-6)}`,
    patientName: '', gender: '男' as const, age: 0, specimenType: '常规活检' as const,
    specimenSource: '', clinicalDiagnosis: '', department: '', doctor: '',
    collectTime: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-'),
    receiveTime: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-'),
    priority: '普通' as const, status: '待接收' as const, reportTime: ''
  })

  const handleSubmit = () => {
    if (!form.patientName || !form.age) return
    onAdd({ ...form, id: `S${Date.now().toString().slice(-6)}` } as Specimen)
    onClose()
  }

  const field = (label: string, key: string, type = 'text') => (
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
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }} />
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
        background: '#fff', borderRadius: 12, padding: 32, width: 600,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>新增标本</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {field('病理号', 'specimenId')}
          {field('患者姓名 *', 'patientName')}
          {field('性别', 'gender', 'select')}
          {field('年龄 *', 'age', 'number')}
          {field('标本类型', 'specimenType', 'select')}
          {field('取材部位', 'specimenSource')}
          {field('临床诊断', 'clinicalDiagnosis')}
          {field('科室', 'department')}
          {field('接诊医生', 'doctor')}
          {field('采集时间', 'collectTime')}
          {field('优先级', 'priority', 'select')}
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>确认添加</button>
        </div>
      </div>
    </div>
  )
}

// 批量接收确认弹窗
function BatchReceiveModal({ count, onClose, onConfirm }: { count: number; onClose: () => void; onConfirm: () => void }) {
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
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>批量接收标本</h3>
        <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: 14 }}>确认接收 {count} 个待接收标本？</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={() => { onConfirm(); onClose() }} style={{ padding: '8px 24px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>确认接收</button>
        </div>
      </div>
    </div>
  )
}

export default function SpecimenPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [detailSpecimen, setDetailSpecimen] = useState<Specimen | null>(null)
  const [barcodeSpecimen, setBarcodeSpecimen] = useState<Specimen | null>(null)
  const [specimens, setSpecimens] = useState<Specimen[]>(initialSamples)
  const [showBatchReceive, setShowBatchReceive] = useState(false)

  const pendingReceive = specimens.filter(s => s.status === '待接收').length

  const filtered = specimens.filter(s => {
    const matchText = !searchText ||
      s.specimenId.toLowerCase().includes(searchText.toLowerCase()) ||
      s.patientName.toLowerCase().includes(searchText.toLowerCase())
    const matchType = !typeFilter || s.specimenType === typeFilter
    const matchStatus = !statusFilter || s.status === statusFilter
    const matchPriority = !priorityFilter || s.priority === priorityFilter
    return matchText && matchType && matchStatus && matchPriority
  })

  const handleAdd = (s: Specimen) => {
    setSpecimens(prev => [s, ...prev])
  }

  const handleUpdate = (id: string, status: string) => {
    setSpecimens(prev => prev.map(s => s.id === id ? { ...s, status: status as Specimen['status'] } : s))
  }

  const handleBatchReceive = () => {
    setSpecimens(prev => prev.map(s =>
      s.status === '待接收' ? { ...s, status: '已接收' as const, receiveTime: new Date().toLocaleString('zh-CN') } : s
    ))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 4, height: 24, background: ORANGE, borderRadius: 2 }} />
          标本管理
        </h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {pendingReceive > 0 && (
            <button
              onClick={() => setShowBatchReceive(true)}
              style={{ padding: '8px 20px', background: '#fff', color: ORANGE, border: `1px solid ${ORANGE}`, borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontSize: 14 }}
            >
              批量接收 ({pendingReceive})
            </button>
          )}
          <button
            onClick={() => setShowAdd(true)}
            style={{ padding: '8px 20px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontSize: 14 }}
          >
            + 新增标本
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ color: '#666', fontSize: 13 }}>今日标本</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{specimens.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待接收</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{specimens.filter(s => s.status === '待接收').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>制片中</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{specimens.filter(s => s.status === '制片中' || s.status === '已切片').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>审核中</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{specimens.filter(s => s.status === '审核中').length}</div>
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
              style={{ padding: '8px 12px', border: `1px solid ${ORANGE_BORDER}`, borderRadius: 6, width: 220, fontSize: 13, outline: 'none' }}
            />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
              <option value="">全部类型</option>
              <option value="常规活检">常规活检</option>
              <option value="手术标本">手术标本</option>
              <option value="细胞学">细胞学</option>
              <option value="冰冻切片">冰冻切片</option>
              <option value="免疫组化">免疫组化</option>
              <option value="分子病理">分子病理</option>
              <option value="骨髓活检">骨髓活检</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
              <option value="">全部状态</option>
              <option value="待接收">待接收</option>
              <option value="已接收">已接收</option>
              <option value="制片中">制片中</option>
              <option value="已切片">已切片</option>
              <option value="审核中">审核中</option>
              <option value="已完成">已完成</option>
            </select>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
              <option value="">全部优先级</option>
              <option value="普通">普通</option>
              <option value="紧急">紧急</option>
              <option value="冰冻">冰冻</option>
            </select>
            {(searchText || typeFilter || statusFilter || priorityFilter) && (
              <button onClick={() => { setSearchText(''); setTypeFilter(''); setStatusFilter(''); setPriorityFilter(''); }}
                style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                清空筛选
              </button>
            )}
          </div>
        </div>
        {(searchText || typeFilter || statusFilter || priorityFilter) && (
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
              {['病理号', '患者姓名', '性别/年龄', '标本类型', '取材部位', '科室', '采集时间', '优先级', '状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: '#475569', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={10} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无匹配的标本记录</td></tr>
            ) : filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', background: s.status === '待接收' ? '#fffbf0' : 'transparent' }}>
                <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'monospace', color: ORANGE, fontWeight: 600 }}>{s.specimenId}</td>
                <td style={{ padding: '12px 14px', fontSize: 14, fontWeight: 500 }}>{s.patientName}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{s.gender} / {s.age}岁</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{s.specimenType}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.specimenSource}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{s.department}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{s.collectTime}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>
                  <span style={{ ...priorityColor(s.priority), padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500 }}>{s.priority}</span>
                </td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>
                  <span style={{ ...statusColor(s.status), padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500 }}>{s.status}</span>
                </td>
                <td style={{ padding: '12px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>
                  <button onClick={() => setDetailSpecimen(s)} style={{ padding: '4px 10px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                  <button onClick={() => setBarcodeSpecimen(s)} style={{ padding: '4px 10px', background: '#fff', color: ORANGE, border: `1px solid ${ORANGE}`, borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>条码</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && <AddSpecimenModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {detailSpecimen && <DetailModal specimen={detailSpecimen} onClose={() => setDetailSpecimen(null)} onUpdate={handleUpdate} />}
      {barcodeSpecimen && <BarcodeModal specimen={barcodeSpecimen} onClose={() => setBarcodeSpecimen(null)} />}
      {showBatchReceive && <BatchReceiveModal count={pendingReceive} onClose={() => setShowBatchReceive(false)} onConfirm={handleBatchReceive} />}
    </div>
  )
}

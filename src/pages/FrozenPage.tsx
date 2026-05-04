import { useState } from 'react'
import { frozenCases, FrozenCase } from '../data/initialData'

const ORANGE = '#F97316'
const ORANGE_BORDER = '#fed7aa'

// 状态颜色
const statusColor = (s: string) => {
  if (s === '已完成') return { bg: '#dcfce7', color: '#16a34a' }
  if (s === '进行中') return { bg: '#fef3c7', color: '#d97706' }
  if (s === '超时') return { bg: '#fee2e2', color: '#dc2626' }
  return { bg: '#f1f5f9', color: '#64748b' }
}

// 结果颜色
const resultColor = (r: string) => {
  if (r === '恶性') return { bg: '#fee2e2', color: '#dc2626' }
  if (r === '良性') return { bg: '#dcfce7', color: '#16a34a' }
  if (r === '交界性') return { bg: '#fef3c7', color: '#d97706' }
  return { bg: '#e2e8f0', color: '#64748b' }
}

// 时间线组件
function TimelineItem({ time, label, done, isLast }: { time: string; label: string; done: boolean; isLast: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: done ? ORANGE : '#e2e8f0',
          border: `2px solid ${done ? ORANGE : '#e2e8f0'}`,
          zIndex: 1,
        }} />
        {!isLast && (
          <div style={{
            width: 2, flex: 1, minHeight: 40,
            background: done ? ORANGE : '#e2e8f0',
            marginTop: 2,
          }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 20 }}>
        <div style={{ fontSize: 12, color: done ? '#1e293b' : '#94a3b8', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 13, color: done ? '#64748b' : '#cbd5e1', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  )
}

// 详情弹窗
function DetailModal({ frozen, onClose }: { frozen: FrozenCase; onClose: () => void }) {
  const steps = [
    { label: '接收标本', time: frozen.receiveTime, done: true },
    { label: '冰冻切片', time: frozen.sliceTime, done: true },
    { label: '术中诊断', time: frozen.diagnosisTime, done: true },
  ]

  const isOnTime = frozen.elapsedMinutes <= frozen.turnaroundTarget

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 0, width: 600,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ORANGE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              ❄️
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>冰冻切片详情</h3>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{frozen.patientName} | {frozen.specimenSource}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1
          }}>×</button>
        </div>

        {/* 结果高亮 */}
        <div style={{
          background: frozen.result === '恶性' ? '#fef2f2' : '#f0fdf4',
          padding: '16px 24px', borderBottom: '1px solid #e2e8f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>术中诊断结果</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: frozen.result === '恶性' ? '#dc2626' : '#16a34a' }}>
              {frozen.result}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>诊断耗时</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: isOnTime ? '#16a34a' : '#dc2626' }}>
              {frozen.elapsedMinutes} 分钟
            </div>
            <div style={{ fontSize: 11, color: isOnTime ? '#16a34a' : '#dc2626' }}>
              {isOnTime ? '✓ 按时完成' : '⚠ 超时'}
            </div>
          </div>
        </div>

        {/* 内容 */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* 左侧 - 基本信息 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>基本信息</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['患者姓名', frozen.patientName],
                ['性别/年龄', `${frozen.gender} / ${frozen.age}岁`],
                ['手术类型', frozen.surgeryType],
                ['取材部位', frozen.specimenSource],
                ['术者', frozen.surgeon],
                ['病理医生', frozen.pathologist],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{l}</div>
                  <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧 - 时间线 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>处理时间线</div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
              {steps.map((step, i) => (
                <TimelineItem
                  key={step.label}
                  time={step.time}
                  label={step.label}
                  done={step.done}
                  isLast={i === steps.length - 1}
                />
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px dashed #e2e8f0' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>目标时间</div>
                  <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{frozen.turnaroundTarget} 分钟内</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>状态</div>
                  <span style={{
                    padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500,
                    background: statusColor(frozen.status).bg, color: statusColor(frozen.status).color
                  }}>
                    {frozen.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>冰冻诊断</div>
              <div style={{
                background: '#fef3c7', borderRadius: 8, padding: 12,
                borderLeft: `4px solid ${ORANGE}`, fontSize: 14, color: '#92400e', lineHeight: 1.6
              }}>
                {frozen.diagnosis}
              </div>
            </div>
          </div>
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

// 新增冰冻弹窗
function AddFrozenModal({ onClose, onAdd }: { onClose: () => void; onAdd: (f: FrozenCase) => void }) {
  const [form, setForm] = useState({
    patientName: '', gender: '男' as const, age: 0, surgeryType: '', specimenSource: '', surgeon: '',
    receiveTime: new Date().toLocaleString('zh-CN'), sliceTime: '', diagnosisTime: '',
    diagnosis: '', result: '良性' as FrozenCase['result'], pathologist: ''
  })
  const [elapsedMinutes] = useState(30)
  const [turnaroundTarget] = useState(30)

  const handleSubmit = () => {
    if (!form.patientName || !form.diagnosis) return
    onAdd({
      ...form, id: `F${Date.now().toString().slice(-6)}`,
      elapsedMinutes, status: '已完成' as const, turnaroundTarget
    })
    onClose()
  }

  const field = (label: string, key: string, type = 'text') => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</label>
      {type === 'select' ? (
        <select value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
          {key === 'gender' && <><option value="男">男</option><option value="女">女</option></>}
          {key === 'result' && <>
            <option value="良性">良性</option><option value="恶性">恶性</option>
            <option value="交界性">交界性</option><option value="无法确定">无法确定</option>
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
        background: '#fff', borderRadius: 12, padding: 32, width: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>新增冰冻切片</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {field('患者姓名 *', 'patientName')}
          {field('性别', 'gender', 'select')}
          {field('年龄', 'age', 'number')}
          {field('手术类型', 'surgeryType')}
          {field('取材部位', 'specimenSource')}
          {field('术者', 'surgeon')}
          {field('接收时间', 'receiveTime')}
          {field('切片时间', 'sliceTime')}
          {field('诊断时间', 'diagnosisTime')}
          {field('冰冻诊断 *', 'diagnosis')}
          {field('诊断结果', 'result', 'select')}
          {field('病理医生', 'pathologist')}
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>确认添加</button>
        </div>
      </div>
    </div>
  )
}

export default function FrozenPage() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [resultFilter, setResultFilter] = useState('')
  const [detail, setDetail] = useState<FrozenCase | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [frozenList, setFrozenList] = useState<FrozenCase[]>(frozenCases)

  const filtered = frozenList.filter(c => {
    const matchText = !searchText ||
      c.patientName.includes(searchText) ||
      c.specimenSource.includes(searchText) ||
      c.diagnosis.includes(searchText)
    const matchStatus = !statusFilter || c.status === statusFilter
    const matchResult = !resultFilter || c.result === resultFilter
    return matchText && matchStatus && matchResult
  })

  const completedCount = frozenList.filter(c => c.status === '已完成').length
  const onTimeCount = frozenList.filter(c => c.status === '已完成' && c.elapsedMinutes <= c.turnaroundTarget).length
  const avgMinutes = frozenList.filter(c => c.status === '已完成').length > 0
    ? Math.round(frozenList.filter(c => c.status === '已完成').reduce((sum, c) => sum + c.elapsedMinutes, 0) / frozenList.filter(c => c.status === '已完成').length)
    : 0

  const handleAdd = (f: FrozenCase) => {
    setFrozenList(prev => [f, ...prev])
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 4, height: 24, background: ORANGE, borderRadius: 2 }} />
          冰冻切片
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          style={{ padding: '8px 20px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontSize: 14 }}
        >
          + 新增冰冻
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ color: '#666', fontSize: 13 }}>今日冰冻</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{frozenList.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已完成</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{completedCount}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>准时代出</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{onTimeCount}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>平均 {avgMinutes} 分钟</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>超时</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{completedCount - onTimeCount}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>准时率</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: completedCount > 0 && onTimeCount / completedCount >= 0.9 ? '#16a34a' : '#d97706' }}>
            {completedCount > 0 ? Math.round(onTimeCount / completedCount * 100) : 0}%
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="搜索患者/部位/诊断..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ padding: '8px 12px', border: `1px solid ${ORANGE_BORDER}`, borderRadius: 6, width: 220, fontSize: 13, outline: 'none' }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
            <option value="">全部状态</option>
            <option value="已完成">已完成</option>
            <option value="进行中">进行中</option>
          </select>
          <select value={resultFilter} onChange={e => setResultFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
            <option value="">全部结果</option>
            <option value="恶性">恶性</option>
            <option value="良性">良性</option>
            <option value="交界性">交界性</option>
            <option value="无法确定">无法确定</option>
          </select>
          {(searchText || statusFilter || resultFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter(''); setResultFilter('') }} style={{
              padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 6, cursor: 'pointer', fontSize: 13
            }}>清空</button>
          )}
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['患者', '性别/年龄', '手术类型', '取材部位', '术者', '接收时间', '切片时间', '诊断时间', '耗时', '诊断', '结果', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 12px', color: '#475569', fontSize: 12, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={12} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无冰冻记录</td></tr>
            ) : filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 12px', fontSize: 14, fontWeight: 500 }}>{c.patientName}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.gender} / {c.age}岁</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.surgeryType}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.specimenSource}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.surgeon}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.receiveTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.sliceTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>{c.diagnosisTime}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>
                  <span style={{
                    fontFamily: 'monospace', fontWeight: 600,
                    color: c.elapsedMinutes <= c.turnaroundTarget ? '#16a34a' : '#dc2626'
                  }}>
                    {c.elapsedMinutes}m
                  </span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 12, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.diagnosis}</td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>
                  <span style={{ ...resultColor(c.result), padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500 }}>{c.result}</span>
                </td>
                <td style={{ padding: '12px 12px', fontSize: 13 }}>
                  <button onClick={() => setDetail(c)} style={{
                    padding: '4px 10px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12
                  }}>详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detail && <DetailModal frozen={detail} onClose={() => setDetail(null)} />}
      {showAdd && <AddFrozenModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  )
}

// @ts-nocheck
// G007 全院病理系统 - 远程会诊管理页面
import { useState } from 'react'
import {
  Radio, Search, CheckCircle, Clock, AlertCircle,
  User, FileText, Microscope, Calendar, Users,
  MapPin, Heart, Check, X, Upload, Printer, Send,
  ChevronRight, RefreshCw, Image, MessageSquare, Eye,
  Stethoscope, Activity
} from 'lucide-react'
import { consultationRequests } from '../data/initialData'
import type { ConsultationRequest } from '../data/initialData'

const PRIMARY = '#1e3a5f'
const PRIMARY_LIGHT = '#2d5a8e'
const ACCENT = '#3b82f6'
const SUCCESS = '#059669'
const WARNING = '#d97706'
const DANGER = '#dc2626'
const GRAY = '#64748b'
const LIGHT_BG = '#f8fafc'
const BORDER = '#e2e8f0'
const WHITE = '#ffffff'

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  '待分配': { bg: '#fef3c7', color: '#d97706', label: '待分配' },
  '阅片中': { bg: '#dbeafe', color: '#2563eb', label: '阅片中' },
  '已完成': { bg: '#d1fae5', color: '#059669', label: '已完成' },
}

const EXPERT_COLORS: Record<string, string> = {
  '李敏': '#7c3aed',
  '张建国': '#2563eb',
  '王丽华': '#059669',
  '陈志强': '#dc2626',
  '刘明辉': '#d97706',
}

export default function ConsultationPage() {
  const [filter, setFilter] = useState<string>('全部')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string>(consultationRequests[0]?.id || '')

  const filters = ['全部', '待分配', '阅片中', '已完成']

  const filtered = consultationRequests.filter(c => {
    const matchFilter = filter === '全部' || c.status === filter
    const matchSearch = !search ||
      c.patientName.includes(search) ||
      c.id.includes(search) ||
      c.requestingHospital.includes(search)
    return matchFilter && matchSearch
  })

  const selected = consultationRequests.find(c => c.id === selectedId)

  const statCards = [
    {
      label: '全部会诊',
      value: consultationRequests.length,
      icon: <Radio size={18} color={ACCENT} />,
      bg: '#eff6ff',
    },
    {
      label: '待分配',
      value: consultationRequests.filter(c => c.status === '待分配').length,
      icon: <Clock size={18} color={WARNING} />,
      bg: '#fef3c7',
    },
    {
      label: '阅片中',
      value: consultationRequests.filter(c => c.status === '阅片中').length,
      icon: <Eye size={18} color={ACCENT} />,
      bg: '#dbeafe',
    },
    {
      label: '已完成',
      value: consultationRequests.filter(c => c.status === '已完成').length,
      icon: <CheckCircle size={18} color={SUCCESS} />,
      bg: '#d1fae5',
    },
  ]

  const getExpertColor = (expert: string) => {
    return EXPERT_COLORS[expert] || ACCENT
  }

  return (
    <div style={{ padding: 24, maxWidth: 1600, margin: '0 auto', background: '#f1f5f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: PRIMARY, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: PRIMARY, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Microscope size={18} color='#fff' />
          </div>
          远程会诊管理
          <span style={{ fontSize: 12, fontWeight: 400, color: GRAY, marginLeft: 8 }}>Remote Consultation</span>
        </h1>
        <p style={{ fontSize: 13, color: GRAY, margin: 0 }}>病理远程会诊 · 疑难病例讨论 · 专家意见</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {statCards.map(card => (
          <div key={card.label} style={{ background: WHITE, borderRadius: 10, padding: '14px 16px', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: PRIMARY }}>{card.value}</div>
              <div style={{ fontSize: 12, color: GRAY }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 16, alignItems: 'start' }}>
        {/* Left Panel - Consultation List */}
        <div style={{ background: WHITE, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {/* Search */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: LIGHT_BG }}>
            <div style={{ background: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Search size={14} color={GRAY} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索患者姓名、会诊单号、医院..."
                style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', color: PRIMARY }}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {filters.map(f => {
              const count = f === '全部' ? consultationRequests.length : consultationRequests.filter(c => c.status === f).length
              const isActive = filter === f
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 16,
                    border: isActive ? 'none' : `1px solid ${BORDER}`,
                    background: isActive ? PRIMARY : WHITE,
                    color: isActive ? WHITE : GRAY,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  {f}
                  <span style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                    color: isActive ? WHITE : GRAY,
                    borderRadius: 10,
                    padding: '1px 6px',
                    fontSize: 11,
                  }}>{count}</span>
                </button>
              )
            })}
          </div>

          {/* List */}
          <div style={{ maxHeight: 600, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: GRAY }}>
                <AlertCircle size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                <div style={{ fontSize: 13 }}>暂无会诊记录</div>
              </div>
            ) : filtered.map((c, idx) => {
              const sc = STATUS_CONFIG[c.status] || STATUS_CONFIG['待分配']
              const isSelected = selectedId === c.id
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    padding: '14px 16px',
                    borderBottom: `1px solid ${BORDER}`,
                    cursor: 'pointer',
                    background: isSelected ? '#eff6ff' : idx % 2 === 0 ? WHITE : '#fafbfc',
                    borderLeft: isSelected ? `3px solid ${ACCENT}` : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = '#f0f7ff' }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = idx % 2 === 0 ? WHITE : '#fafbfc' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: PRIMARY }}>{c.patientName}</span>
                      <span style={{ fontSize: 11, color: GRAY }}>{c.gender}{c.age}岁</span>
                    </div>
                    <span style={{ padding: '2px 10px', background: sc.bg, color: sc.color, borderRadius: 10, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {sc.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ padding: '1px 8px', background: '#eff6ff', color: ACCENT, borderRadius: 4, fontSize: 11 }}>{c.specimenType}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    <div>
                      <div style={{ fontSize: 10, color: GRAY }}>申请医院</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{c.requestingHospital.length > 12 ? c.requestingHospital.slice(0, 12) + '...' : c.requestingHospital}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: GRAY }}>负责专家</div>
                      <div style={{ fontSize: 12, color: '#334155' }}>{c.assignedExpert || '待分配'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: GRAY }}>提交时间</div>
                      <div style={{ fontSize: 12, color: '#334155' }}>{c.submitTime.split(' ')[0]}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: GRAY }}>切片数量</div>
                      <div style={{ fontSize: 12, color: '#334155' }}>{c.submittedImages}张</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: GRAY, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FileText size={11} /> {c.originalDiagnosis.length > 25 ? c.originalDiagnosis.slice(0, 25) + '…' : c.originalDiagnosis}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel - Consultation Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!selected ? (
            <div style={{ background: WHITE, borderRadius: 12, padding: 60, textAlign: 'center', border: `1px solid ${BORDER}` }}>
              <AlertCircle size={48} color={GRAY} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div style={{ fontSize: 15, color: GRAY }}>请从左侧选择一个会诊记录查看详情</div>
            </div>
          ) : (
            <>
              {/* Header Info Card */}
              <div style={{ background: WHITE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: PRIMARY, margin: 0 }}>{selected.patientName}</h2>
                      <span style={{ fontSize: 12, color: GRAY }}>{selected.gender} {selected.age}岁</span>
                      <span style={{ padding: '2px 10px', background: STATUS_CONFIG[selected.status]?.bg, color: STATUS_CONFIG[selected.status]?.color, borderRadius: 10, fontSize: 12, fontWeight: 700 }}>
                        {STATUS_CONFIG[selected.status]?.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: GRAY }}>会诊单号：{selected.id}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ padding: '6px 14px', background: '#f0f7ff', color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Upload size={13} />补充资料
                    </button>
                    <button style={{ padding: '6px 14px', background: '#f0f7ff', color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Printer size={13} />打印会诊单
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {[
                    { label: '会诊单号', value: selected.id, icon: <FileText size={14} color={GRAY} /> },
                    { label: '提交时间', value: selected.submitTime, icon: <Calendar size={14} color={GRAY} /> },
                    { label: '标本类型', value: selected.specimenType, icon: <Microscope size={14} color={GRAY} /> },
                    { label: '负责专家', value: selected.assignedExpert || '待分配', icon: <Users size={14} color={GRAY} /> },
                  ].map(item => (
                    <div key={item.label} style={{ background: LIGHT_BG, borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                        {item.icon}
                        <span style={{ fontSize: 11, color: GRAY }}>{item.label}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: PRIMARY }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                {selected.turnaroundHours && (
                  <div style={{ marginTop: 12, padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} color={SUCCESS} />
                    <span style={{ fontSize: 12, color: SUCCESS }}> turnaround time: {selected.turnaroundHours} hours</span>
                  </div>
                )}
              </div>

              {/* Patient & Request Info */}
              <div style={{ background: WHITE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Stethoscope size={16} color={ACCENT} />会诊申请信息
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>申请医院 & 医生</div>
                    <div style={{ background: LIGHT_BG, borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, marginBottom: 6 }}>{selected.requestingHospital}</div>
                      <div style={{ fontSize: 12, color: GRAY }}>申请医生：{selected.requestingDoctor}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>标本信息</div>
                    <div style={{ background: LIGHT_BG, borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, marginBottom: 6 }}>{selected.specimenType}</div>
                      <div style={{ fontSize: 12, color: GRAY }}>切片数量：{selected.submittedImages}张</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical History & Diagnosis */}
              <div style={{ background: WHITE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Activity size={16} color={ACCENT} />临床信息
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: LIGHT_BG, borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 6 }}>临床病史</div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{selected.clinicalHistory}</div>
                  </div>
                  <div style={{ background: LIGHT_BG, borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 6 }}>原始诊断</div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{selected.originalDiagnosis}</div>
                  </div>
                  <div style={{ background: '#fffbeb', borderRadius: 8, padding: '12px 14px', borderLeft: '3px solid #f59e0b' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#b45309', marginBottom: 6 }}>会诊问题</div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{selected.consultationQuestion}</div>
                  </div>
                </div>
              </div>

              {/* Expert Opinion */}
              {selected.expertOpinion && (
                <div style={{ background: WHITE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: PRIMARY, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={16} color={SUCCESS} />专家意见
                  </h3>
                  <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '12px 14px', borderLeft: '3px solid #059669' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: getExpertColor(selected.assignedExpert || ''), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>
                          {selected.assignedExpert?.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: PRIMARY }}>{selected.assignedExpert}</div>
                          <div style={{ fontSize: 11, color: GRAY }}>会诊专家</div>
                        </div>
                      </div>
                      {selected.completeTime && (
                        <div style={{ fontSize: 11, color: GRAY }}>
                          完成时间：{selected.completeTime}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                      {selected.expertOpinion}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ background: WHITE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  {selected.status === '待分配' && (
                    <>
                      <button style={{ padding: '8px 20px', background: SUCCESS, color: WHITE, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={15} />接受会诊
                      </button>
                      <button style={{ padding: '8px 20px', background: WHITE, color: DANGER, border: `1px solid ${DANGER}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <X size={15} />拒绝会诊
                      </button>
                    </>
                  )}
                  <button style={{ padding: '8px 20px', background: PRIMARY, color: WHITE, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Send size={15} />提交会诊意见
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

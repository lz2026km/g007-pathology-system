import { useState } from 'react'
import { Search, Clock, Activity, Send, User, FileImage, Sparkles, CheckCircle2 } from 'lucide-react'

const ORANGE = '#F97316'

// 会诊记录数据类型
interface FrozenConsultation {
  id: string
  hospital: string
  patientName: string
  patientAge: number
  cancerType: string
  uploadTime: string
  urgency: '普通' | '紧急' | '加急'
  status: '待会诊' | '会诊中' | '已完成'
  diagnosis?: string
  aiSuggestion?: string
  expertOpinion?: string
  responseTime?: string
  completeTime?: string
}

// 模拟会诊数据
const mockConsultations: FrozenConsultation[] = [
  // 待会诊（3条）
  {
    id: 'RC001',
    hospital: '南山区中心医院',
    patientName: '陈某某',
    patientAge: 52,
    cancerType: '乳腺肿块',
    uploadTime: '2026-05-04 08:30',
    urgency: '紧急',
    status: '待会诊',
    aiSuggestion: '倾向恶性，建议术中冰冻确诊',
  },
  {
    id: 'RC002',
    hospital: '西城区人民医院',
    patientName: '张某某',
    patientAge: 45,
    cancerType: '卵巢囊肿',
    uploadTime: '2026-05-04 09:15',
    urgency: '普通',
    status: '待会诊',
    aiSuggestion: '交界性肿瘤可能性大',
  },
  {
    id: 'RC003',
    hospital: '东城区妇幼保健院',
    patientName: '李某某',
    patientAge: 38,
    cancerType: '宫颈赘生物',
    uploadTime: '2026-05-04 10:00',
    urgency: '加急',
    status: '会诊中',
    aiSuggestion: 'CIN III不除外，建议快速冰冻',
  },
  // 已完成（3条）
  {
    id: 'RC004',
    hospital: '北山区第一医院',
    patientName: '王某某',
    patientAge: 61,
    cancerType: '肺结节',
    uploadTime: '2026-05-03 14:20',
    urgency: '紧急',
    status: '已完成',
    diagnosis: '肺腺癌',
    aiSuggestion: '恶性证据明确',
    expertOpinion: '同意AI分析，冰冻切片可见异型腺体，确诊肺腺癌。建议常规病理进一步明确分期。',
    responseTime: '25分钟',
    completeTime: '2026-05-03 14:45',
  },
  {
    id: 'RC005',
    hospital: '滨海市中心医院',
    patientName: '赵某某',
    patientAge: 55,
    cancerType: '胃溃疡',
    uploadTime: '2026-05-03 11:00',
    urgency: '普通',
    status: '已完成',
    diagnosis: '胃腺癌',
    aiSuggestion: '恶性溃疡可能',
    expertOpinion: '冰冻切片见异型腺体侵及肌层，符合胃腺癌。切缘未见癌累及。',
    responseTime: '38分钟',
    completeTime: '2026-05-03 11:38',
  },
  {
    id: 'RC006',
    hospital: '开发区医院',
    patientName: '周某某',
    patientAge: 42,
    cancerType: '甲状腺结节',
    uploadTime: '2026-05-02 16:30',
    urgency: '普通',
    status: '已完成',
    diagnosis: '结节性甲状腺肿',
    aiSuggestion: '良性可能性大',
    expertOpinion: '冰冻切片为滤泡性结节，符合结节性甲状腺肿。无需扩大切除范围。',
    responseTime: '42分钟',
    completeTime: '2026-05-02 17:12',
  },
]

// 统计数据
const thisMonthCount = 28
const avgResponseTime = '32分钟'
const completionRate = 96.4

// 获取紧急程度样式
function getUrgencyStyle(urgency: string) {
  if (urgency === '紧急') return { color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' }
  if (urgency === '加急') return { color: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' }
  return { color: '#64748b', bg: '#f1f5f9', border: '#e2e8f0' }
}

// 获取状态样式
function getStatusStyle(status: string) {
  if (status === '已完成') return { color: '#16a34a', bg: '#dcfce7' }
  if (status === '会诊中') return { color: '#0891b2', bg: '#e0f2fe' }
  if (status === '待会诊') return { color: '#d97706', bg: '#fef3c7' }
  return { color: '#64748b', bg: '#f1f5f9' }
}

export default function RegionalFrozenPage() {
  const [selectedId, setSelectedId] = useState<string | null>('RC001')
  const [searchText, setSearchText] = useState('')
  const [feedbackText, setFeedbackText] = useState('')

  // 过滤待会诊和会诊中
  const pendingConsultations = mockConsultations.filter(c => c.status !== '已完成')
  // 已完成
  const completedConsultations = mockConsultations.filter(c => c.status === '已完成')
  // 选中的会诊
  const selectedConsultation = mockConsultations.find(c => c.id === selectedId)

  // 过滤
  const filteredPending = pendingConsultations.filter(c =>
    c.hospital.includes(searchText) || c.patientName.includes(searchText) || c.cancerType.includes(searchText)
  )

  return (
    <div style={{ padding: 24 }}>
      {/* 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ORANGE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileImage size={20} color={ORANGE} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1e293b' }}>区域冰冻会诊</h2>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>远程冰冻切片会诊平台</p>
        </div>
      </div>

      {/* 顶部统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={16} color={ORANGE} />
            <span style={{ fontSize: 13, color: '#64748b' }}>本月会诊数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{thisMonthCount}</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>较上月 +5</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={16} color="#0891b2" />
            <span style={{ fontSize: 13, color: '#64748b' }}>平均响应时间</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{avgResponseTime}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>目标 ≤30分钟</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span style={{ fontSize: 13, color: '#64748b' }}>完成率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{completionRate}%</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>本月完成 27/28</div>
        </div>
      </div>

      {/* 中部布局：左侧待会诊 + 右侧会诊工作区 */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, marginBottom: 24 }}>
        {/* 左侧待会诊列表 */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: 520 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600, color: '#1e293b' }}>待会诊列表</h3>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="搜索医院/患者/癌种..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 7, paddingBottom: 7, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredPending.map(c => {
              const urgencyStyle = getUrgencyStyle(c.urgency)
              const statusStyle = getStatusStyle(c.status)
              const isSelected = c.id === selectedId
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    background: isSelected ? `${ORANGE}10` : '#fff',
                    borderLeft: isSelected ? `3px solid ${ORANGE}` : '3px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{c.hospital}</span>
                    <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 10, fontWeight: 600, background: urgencyStyle.bg, color: urgencyStyle.color, border: `1px solid ${urgencyStyle.border}` }}>
                      {c.urgency}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: '#475569' }}>{c.patientName} | {c.patientAge}岁</span>
                    <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 10, fontWeight: 500, background: statusStyle.bg, color: statusStyle.color }}>{c.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    <span style={{ marginRight: 12 }}>{c.cancerType}</span>
                    <span>上传：{c.uploadTime}</span>
                  </div>
                </div>
              )
            })}
            {filteredPending.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: 13 }}>暂无待会诊记录</div>
            )}
          </div>
        </div>

        {/* 右侧会诊工作区 */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {selectedConsultation ? (
            <div style={{ padding: 24 }}>
              {/* 头部信息 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>{selectedConsultation.patientName}</h3>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{selectedConsultation.patientAge}岁</span>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, ...getUrgencyStyle(selectedConsultation.urgency) }}>{selectedConsultation.urgency}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>
                    <span style={{ marginRight: 16 }}>{selectedConsultation.hospital}</span>
                    <span style={{ marginRight: 16 }}>|</span>
                    <span>{selectedConsultation.cancerType}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>上传时间</div>
                  <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{selectedConsultation.uploadTime}</div>
                </div>
              </div>

              {/* 切片图像区域 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <FileImage size={16} color={ORANGE} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>切片数字图像</span>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: 40, textAlign: 'center', border: '1px dashed #e2e8f0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: `${ORANGE}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileImage size={32} color={ORANGE} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>切片图像加载中</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>请在右侧查看高分辨率图像</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <span style={{ padding: '4px 12px', borderRadius: 4, fontSize: 11, background: '#fee2e2', color: '#dc2626' }}>20x</span>
                      <span style={{ padding: '4px 12px', borderRadius: 4, fontSize: 11, background: '#e0f2fe', color: '#0891b2' }}>40x</span>
                      <span style={{ padding: '4px 12px', borderRadius: 4, fontSize: 11, background: '#fef3c7', color: '#d97706' }}>100x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI辅助建议 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Sparkles size={16} color="#7c3aed" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>AI辅助建议</span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500, background: '#ede9fe', color: '#7c3aed' }}>参考</span>
                </div>
                <div style={{ padding: 14, borderRadius: 8, background: '#faf5ff', border: '1px solid #e9d5ff' }}>
                  <div style={{ fontSize: 13, color: '#7c3aed', fontWeight: 500, marginBottom: 4 }}>{selectedConsultation.aiSuggestion}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>AI分析，仅供参考</div>
                </div>
              </div>

              {/* 专家手写意见 */}
              {selectedConsultation.status === '已完成' ? (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <User size={16} color="#0891b2" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>专家意见</span>
                  </div>
                  <div style={{ padding: 14, borderRadius: 8, background: '#f0fdfa', border: '1px solid #99f6e4' }}>
                    <div style={{ fontSize: 13, color: '#0f766e', fontWeight: 500, marginBottom: 6 }}>{selectedConsultation.expertOpinion}</div>
                    {selectedConsultation.diagnosis && (
                      <div style={{ marginTop: 8, padding: '6px 10px', background: '#dcfce7', borderRadius: 4, display: 'inline-block' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#16a34a' }}>冰冻诊断：{selectedConsultation.diagnosis}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <User size={16} color="#0891b2" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>专家意见</span>
                  </div>
                  <textarea
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder="请输入专家会诊意见..."
                    rows={4}
                    style={{ width: '100%', padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, resize: 'none', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                    <button style={{ padding: '8px 16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
                      保存草稿
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                      <Send size={14} />
                      发送反馈
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: 80, textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ marginBottom: 12 }}>
                <FileImage size={48} color="#cbd5e1" style={{ margin: '0 auto' }} />
              </div>
              <div style={{ fontSize: 14 }}>请选择一条待会诊记录</div>
            </div>
          )}
        </div>
      </div>

      {/* 底部已完成会诊历史 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} color="#16a34a" />
            已完成会诊历史
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>申请医院</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>患者</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>癌种</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>冰冻诊断</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>响应时间</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>上传时间</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>完成时间</th>
              </tr>
            </thead>
            <tbody>
              {completedConsultations.map((c, idx) => (
                  <tr key={c.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{c.hospital}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{c.patientName}</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.patientAge}岁</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{c.cancerType}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, background: '#dcfce7', color: '#16a34a' }}>{c.diagnosis}</span>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <Clock size={12} color="#0891b2" />
                        <span style={{ color: '#0891b2', fontWeight: 500 }}>{c.responseTime}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#64748b' }}>{c.uploadTime}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#64748b' }}>{c.completeTime}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

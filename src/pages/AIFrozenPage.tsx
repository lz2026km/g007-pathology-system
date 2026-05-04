import { useState, useEffect } from 'react'
import { Clock, AlertTriangle, Activity, Plus, Search, FileText, CheckCircle, XCircle, User, Stethoscope } from 'lucide-react'

const ORANGE = '#F97316'
const ORANGE_LIGHT = '#fff7ed'
const ORANGE_BORDER = '#fed7aa'

// 冰冻申请数据
interface FrozenApplication {
  id: string
  patientName: string
  department: string
  applyTime: string
  cancerType: string
  aiSuggestion: string
  status: '待诊断' | '诊断中' | '已完成'
  result?: string
  riskLevel?: '高' | '中' | '低'
}

const mockApplications: FrozenApplication[] = [
  {
    id: 'FR20260504001',
    patientName: '张伟',
    department: '胃肠外科',
    applyTime: '2026-05-04 14:30',
    cancerType: '胃癌',
    aiSuggestion: '低分化腺癌，建议术中冰冻确认切缘',
    status: '待诊断',
    riskLevel: '高'
  },
  {
    id: 'FR20260504002',
    patientName: '李娜',
    department: '乳腺外科',
    applyTime: '2026-05-04 14:45',
    cancerType: '乳腺癌',
    aiSuggestion: '浸润性导管癌，建议前哨淋巴结活检',
    status: '诊断中',
    riskLevel: '高'
  },
  {
    id: 'FR20260504003',
    patientName: '王强',
    department: '胸外科',
    applyTime: '2026-05-04 15:00',
    cancerType: '肺癌',
    aiSuggestion: '肺腺癌可能性大，建议冰冻确认',
    status: '待诊断',
    riskLevel: '中'
  },
  {
    id: 'FR20260504004',
    patientName: '陈静',
    department: '甲状腺外科',
    applyTime: '2026-05-04 15:15',
    cancerType: '甲状腺癌',
    aiSuggestion: '乳头状癌，建议快速冰冻确认',
    status: '已完成',
    result: '恶性',
    riskLevel: '高'
  },
  {
    id: 'FR20260504005',
    patientName: '刘洋',
    department: '胃肠外科',
    applyTime: '2026-05-04 15:30',
    cancerType: '胃癌',
    aiSuggestion: '中分化腺癌，建议确认淋巴结转移',
    status: '待诊断',
    riskLevel: '中'
  },
  {
    id: 'FR20260504006',
    patientName: '赵敏',
    department: '妇科',
    applyTime: '2026-05-04 15:45',
    cancerType: '卵巢癌',
    aiSuggestion: '浆液性囊腺癌，建议冰冻分期',
    status: '已完成',
    result: '恶性',
    riskLevel: '高'
  }
]

// 冰冻统计
interface FrozenStats {
  totalCount: number
  qualifiedCount: number
  delayedCount: number
}

const mockStats: FrozenStats = {
  totalCount: 156,
  qualifiedCount: 148,
  delayedCount: 8
}

// 快速报告模板
const reportTemplates = [
  { name: '恶性模板', content: '术中冰冻切片检查：（部位）示恶性肿瘤，符合【癌】形态学特征。' },
  { name: '良性模板', content: '术中冰冻切片检查：（部位）未见恶性肿瘤证据，良性病变。' },
  { name: '交界性模板', content: '术中冰冻切片检查：（部位）见交界性肿瘤，建议待常规石蜡明确。' }
]

export default function AIFrozenPage() {
  const [applications] = useState<FrozenApplication[]>(mockApplications)
  const [selectedApp, setSelectedApp] = useState<FrozenApplication | null>(null)
  const [countdown, setCountdown] = useState(30 * 60) // 30分钟倒计时
  const [doctorNote, setDoctorNote] = useState('')
  const [, setActiveTemplate] = useState<string>('')
  const [searchKeyword, setSearchKeyword] = useState('')

  // 模拟倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          return 30 * 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progressPercent = (countdown / (30 * 60)) * 100

  const getRiskColor = (level?: string) => {
    if (level === '高') return '#dc2626'
    if (level === '中') return '#d97706'
    return '#16a34a'
  }

  const getStatusStyle = (status: string) => {
    if (status === '已完成') return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' }
    if (status === '诊断中') return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' }
    return { bg: ORANGE_LIGHT, color: ORANGE, border: ORANGE_BORDER }
  }

  const filteredApps = applications.filter(app =>
    app.patientName.includes(searchKeyword) ||
    app.cancerType.includes(searchKeyword) ||
    app.department.includes(searchKeyword)
  )

  const handleSelectApp = (app: FrozenApplication) => {
    setSelectedApp(app)
    setDoctorNote('')
    setActiveTemplate('')
  }

  const handleApplyTemplate = (template: typeof reportTemplates[0]) => {
    setActiveTemplate(template.content)
    setDoctorNote(template.content)
  }

  return (
    <div style={{ padding: 24, background: '#f8fafc', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: `${ORANGE}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Snowflake size={24} color={ORANGE} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b' }}>AI冰冻快诊</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>术中冰冻快速诊断辅助系统</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            padding: '8px 16px', background: '#fff', borderRadius: 8,
            border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <Activity size={18} color={ORANGE} />
            <span style={{ fontSize: 13, color: '#64748b' }}>AI辅助诊断</span>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 8px rgba(34,197,94,0.5)'
            }} />
          </div>
        </div>
      </div>

      {/* 倒计时器区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fff 100%)',
        borderRadius: 16, padding: 24, marginBottom: 24,
        border: `2px solid ${ORANGE_BORDER}`, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(90deg, ${ORANGE}08 0%, transparent 100%)`
        }} />
        
        {/* 进度条背景 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
          background: '#e2e8f0', borderRadius: '0 0 14px 14px', overflow: 'hidden'
        }}>
          <div style={{
            height: '100%', width: `${progressPercent}%`, borderRadius: '0 0 14px 14px',
            background: `linear-gradient(90deg, ${ORANGE} 0%, #fb923c 100%)`,
            transition: 'width 1s linear'
          }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 16, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(249,115,22,0.2)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: ORANGE, lineHeight: 1 }}>
                  {formatTime(countdown)}
                </div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>剩余时间</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>当前诊断倒计时</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b' }}>
                {selectedApp ? selectedApp.patientName : '请选择患者'}
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>
                {selectedApp ? `${selectedApp.department} - ${selectedApp.cancerType}` : '等待选择冰冻申请'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              padding: '12px 20px', background: '#fff', borderRadius: 10,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: ORANGE }}>{applications.filter(a => a.status === '待诊断').length}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>待诊断</div>
            </div>
            <div style={{
              padding: '12px 20px', background: '#fff', borderRadius: 10,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#d97706' }}>{applications.filter(a => a.status === '诊断中').length}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>诊断中</div>
            </div>
            <div style={{
              padding: '12px 20px', background: '#fff', borderRadius: 10,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#16a34a' }}>{applications.filter(a => a.status === '已完成').length}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>已完成</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* 左侧：申请列表 */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Stethoscope size={20} color={ORANGE} />
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>冰冻申请列表</h2>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="搜索患者/癌种..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{
                  padding: '8px 12px 8px 36px', borderRadius: 8, border: '1px solid #e2e8f0',
                  fontSize: 13, outline: 'none', width: 180
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredApps.map(app => {
              const statusStyle = getStatusStyle(app.status)
              return (
                <div
                  key={app.id}
                  onClick={() => handleSelectApp(app)}
                  style={{
                    padding: 16, borderRadius: 12, cursor: 'pointer',
                    border: `2px solid ${selectedApp?.id === app.id ? ORANGE : '#e2e8f0'}`,
                    background: selectedApp?.id === app.id ? ORANGE_LIGHT : '#fff',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, background: `${ORANGE}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <User size={18} color={ORANGE} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>{app.patientName}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{app.id}</div>
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`
                    }}>
                      {app.status}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>科室:</span>
                      <span style={{ fontSize: 12, color: '#1e293b', fontWeight: 500 }}>{app.department}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>申请:</span>
                      <span style={{ fontSize: 12, color: '#1e293b', fontWeight: 500 }}>{app.applyTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>癌种:</span>
                      <span style={{ fontSize: 12, color: '#1e293b', fontWeight: 500 }}>{app.cancerType}</span>
                    </div>
                    {app.riskLevel && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>风险:</span>
                        <span style={{ fontSize: 12, color: getRiskColor(app.riskLevel), fontWeight: 600 }}>{app.riskLevel}风险</span>
                      </div>
                    )}
                  </div>

                  <div style={{
                    marginTop: 10, padding: 10, background: '#f8fafc', borderRadius: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <AlertTriangle size={14} color={ORANGE} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{app.aiSuggestion}</span>
                    </div>
                  </div>

                  {app.result && (
                    <div style={{
                      marginTop: 10, padding: '8px 12px', borderRadius: 8,
                      background: app.result === '恶性' ? '#fef2f2' : '#f0fdf4',
                      display: 'flex', alignItems: 'center', gap: 8
                    }}>
                      {app.result === '恶性' ? (
                        <XCircle size={16} color="#dc2626" />
                      ) : (
                        <CheckCircle size={16} color="#16a34a" />
                      )}
                      <span style={{
                        fontSize: 13, fontWeight: 600,
                        color: app.result === '恶性' ? '#dc2626' : '#16a34a'
                      }}>
                        诊断结果: {app.result}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 右侧：AI辅助诊断面板 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* AI分析结果 */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: 1
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: `${ORANGE}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Activity size={18} color={ORANGE} />
              </div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>AI辅助诊断</h2>
              <div style={{
                marginLeft: 'auto', padding: '4px 10px', background: `${ORANGE}15`,
                borderRadius: 20, fontSize: 11, color: ORANGE, fontWeight: 500
              }}>
                AI分析中
              </div>
            </div>

            {selectedApp ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={{
                    padding: 16, background: '#f8fafc', borderRadius: 12,
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>预估癌种</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{selectedApp.cancerType}</div>
                  </div>
                  <div style={{
                    padding: 16, background: selectedApp.riskLevel === '高' ? '#fef2f2' : selectedApp.riskLevel === '中' ? '#fef3c7' : '#f0fdf4',
                    borderRadius: 12,
                    border: `1px solid ${selectedApp.riskLevel === '高' ? '#fecaca' : selectedApp.riskLevel === '中' ? '#fde68a' : '#bbf7d0'}`
                  }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>恶性风险评级</div>
                    <div style={{
                      fontSize: 18, fontWeight: 700,
                      color: selectedApp.riskLevel === '高' ? '#dc2626' : selectedApp.riskLevel === '中' ? '#d97706' : '#16a34a'
                    }}>
                      {selectedApp.riskLevel === '高' ? '高风险' : selectedApp.riskLevel === '中' ? '中风险' : '低风险'}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: 16, background: '#f8fafc', borderRadius: 12,
                  border: '1px solid #e2e8f0', marginBottom: 16
                }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>AI分析建议</div>
                  <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                    {selectedApp.aiSuggestion}
                  </div>
                </div>

                <div style={{
                  padding: 16, background: `${ORANGE}08`, borderRadius: 12,
                  border: `1px solid ${ORANGE_BORDER}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <AlertTriangle size={16} color={ORANGE} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: ORANGE }}>诊断要点</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#64748b', lineHeight: 1.8 }}>
                    <li>注意观察细胞异型性及核分裂象</li>
                    <li>确认切缘是否有肿瘤累及</li>
                    <li>评估淋巴结转移情况</li>
                    <li>结合术中大体标本所见</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{
                padding: 40, textAlign: 'center', color: '#94a3b8'
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 14 }}>请从左侧选择一位患者</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>开始AI辅助诊断</div>
              </div>
            )}
          </div>

          {/* 病理医生手写输入 */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
            }}>
              <FileText size={18} color={ORANGE} />
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>病理医生诊断</h2>
            </div>

            <textarea
              value={doctorNote}
              onChange={e => setDoctorNote(e.target.value)}
              placeholder="请输入术中冰冻诊断意见..."
              disabled={!selectedApp || selectedApp.status === '已完成'}
              style={{
                width: '100%', minHeight: 120, padding: 12, borderRadius: 10,
                border: '1px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none', lineHeight: 1.6,
                background: !selectedApp || selectedApp.status === '已完成' ? '#f8fafc' : '#fff'
              }}
            />

            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>快速报告模板</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {reportTemplates.map(template => (
                  <button
                    key={template.name}
                    onClick={() => handleApplyTemplate(template)}
                    disabled={!selectedApp || selectedApp.status === '已完成'}
                    style={{
                      padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                      background: '#fff', fontSize: 12, color: '#64748b', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      opacity: !selectedApp || selectedApp.status === '已完成' ? 0.5 : 1
                    }}
                  >
                    <Plus size={12} />
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedApp && selectedApp.status !== '已完成' && (
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button
                  style={{
                    flex: 1, padding: '12px 24px', borderRadius: 10, border: 'none',
                    background: ORANGE, color: '#fff', fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                >
                  <CheckCircle size={16} />
                  提交诊断
                </button>
                <button
                  style={{
                    padding: '12px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
                    background: '#fff', fontSize: 14, color: '#64748b', cursor: 'pointer'
                  }}
                >
                  保存草稿
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部：冰冻符合率统计 */}
      <div style={{
        background: '#fff', borderRadius: 16, padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
        }}>
          <Activity size={20} color={ORANGE} />
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>本月冰冻符合率统计</h2>
          <div style={{
            marginLeft: 'auto', padding: '4px 12px', background: `${ORANGE}15`,
            borderRadius: 20, fontSize: 12, color: ORANGE, fontWeight: 500
          }}>
            2026年5月
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <div style={{
            padding: 24, background: '#f8fafc', borderRadius: 12,
            border: '1px solid #e2e8f0', textAlign: 'center'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: `${ORANGE}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Snowflake size={28} color={ORANGE} />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#1e293b' }}>{mockStats.totalCount}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>本月冰冻总数</div>
          </div>

          <div style={{
            padding: 24, background: '#f8fafc', borderRadius: 12,
            border: '1px solid #e2e8f0', textAlign: 'center'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: '#dcfce7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <CheckCircle size={28} color="#16a34a" />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a' }}>{mockStats.qualifiedCount}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>符合例数</div>
          </div>

          <div style={{
            padding: 24, background: '#f8fafc', borderRadius: 12,
            border: '1px solid #e2e8f0', textAlign: 'center'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: '#fef3c7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#d97706' }}>
                {((mockStats.qualifiedCount / mockStats.totalCount) * 100).toFixed(1)}%
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>冰冻符合率</div>
          </div>

          <div style={{
            padding: 24, background: '#f8fafc', borderRadius: 12,
            border: '1px solid #e2e8f0', textAlign: 'center'
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: '#fee2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Clock size={28} color="#dc2626" />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#dc2626' }}>{mockStats.delayedCount}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>延迟报告数</div>
          </div>
        </div>

        {/* 符合率趋势图表（简化版） */}
        <div style={{ marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>近7日冰冻诊断趋势</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 120 }}>
            {[
              { day: '周一', count: 18, rate: 95.2 },
              { day: '周二', count: 22, rate: 96.8 },
              { day: '周三', count: 15, rate: 94.5 },
              { day: '周四', count: 20, rate: 97.1 },
              { day: '周五', count: 25, rate: 95.8 },
              { day: '周六', count: 12, rate: 93.3 },
              { day: '周日', count: 8, rate: 92.0 }
            ].map((item, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: '100%', height: `${(item.count / 25) * 80}px`,
                  background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE}80 100%)`,
                  borderRadius: '6px 6px 0 0', minHeight: 20
                }} />
                <div style={{ fontSize: 11, color: '#64748b' }}>{item.day}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{item.count}例</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 雪花图标组件
function Snowflake({ size = 24, color = '#F97316' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    </svg>
  )
}

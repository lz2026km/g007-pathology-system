import { useState } from 'react'
import { Search, Plus, Edit3, CheckCircle2, AlertTriangle, Clock, FileText, Users, TrendingUp, X } from 'lucide-react'

const ORANGE = '#F97316'

// PDCA问题数据类型
interface PDCAIssue {
  id: string
  problem: string
  discoveredAt: string
  responsible: string
  planCompleteDate: string
  status: '进行中' | '已完成' | '已关闭'
  category: string
}

// PDCA执行记录
interface PDCADoRecord {
  id: string
  issueId: string
  measure: string
  executor: string
  executeTime: string
}

// PDCA检查结果
interface PDCACheckResult {
  id: string
  issueId: string
  checkMethod: string
  result: string
  isQualified: boolean
  checkDate: string
}

// PDCA改进措施
interface PDCAActRecord {
  id: string
  issueId: string
  permanentMeasure: string
  standardizationDoc: string
  promotionScope: string
  actDate: string
}

// 完整的PDCA案例
interface PDCACase {
  issue: PDCAIssue
  doRecords: PDCADoRecord[]
  checkResults: PDCACheckResult[]
  actRecords: PDCAActRecord[]
}

// 模拟PDCA案例数据
const mockPDCACases: PDCACase[] = [
  {
    issue: { id: 'P001', problem: '术中冰冻切片质量不稳定，部分切片模糊影响诊断', discoveredAt: '2026-03-15', responsible: '张伟', planCompleteDate: '2026-04-30', status: '已完成', category: '切片质量' },
    doRecords: [
      { id: 'D001', issueId: 'P001', measure: '更换新品牌载玻片，严格操作规程', executor: '李娜', executeTime: '2026-03-20' },
      { id: 'D002', issueId: 'P001', measure: '对技术员进行冰冻切片操作培训', executor: '王丽', executeTime: '2026-03-25' },
      { id: 'D003', issueId: 'P001', measure: '建立切片质量每日检查机制', executor: '张伟', executeTime: '2026-04-01' },
    ],
    checkResults: [
      { id: 'C001', issueId: 'P001', checkMethod: '随机抽查20张冰冻切片', result: '优：18张，良：2张，无差片', isQualified: true, checkDate: '2026-04-28' },
    ],
    actRecords: [
      { id: 'A001', issueId: 'P001', permanentMeasure: '制定《冰冻切片质量标准操作规程》', standardizationDoc: 'SOP-QC-2026-015', promotionScope: '全科室推广' , actDate: '2026-05-01'},
    ],
  },
  {
    issue: { id: 'P002', problem: '病理报告发出平均TAT超过24小时目标', discoveredAt: '2026-03-20', responsible: '刘芳', planCompleteDate: '2026-05-15', status: '进行中', category: '报告时效' },
    doRecords: [
      { id: 'D004', issueId: 'P002', measure: '分析TAT超时环节，发现制片环节延误', executor: '刘芳', executeTime: '2026-03-25' },
      { id: 'D005', issueId: 'P002', measure: '增设下午批次制片，减少等待时间', executor: '李娜', executeTime: '2026-04-01' },
    ],
    checkResults: [
      { id: 'C002', issueId: 'P002', checkMethod: '统计4月份TAT数据', result: '平均TAT从26.5h降至22.3h，仍未达标', isQualified: false, checkDate: '2026-05-05' },
    ],
    actRecords: [],
  },
  {
    issue: { id: 'P003', problem: '术中冰冻与术后石蜡符合率下降至88%', discoveredAt: '2026-02-10', responsible: '陈明', planCompleteDate: '2026-03-31', status: '已完成', category: '冰冻符合率' },
    doRecords: [
      { id: 'D006', issueId: 'P003', measure: '回顾分析不符合案例，发现术中取材代表性不足', executor: '陈明', executeTime: '2026-02-15' },
      { id: 'D007', issueId: 'P003', measure: '与外科沟通增加冰冻取材数量', executor: '王主任', executeTime: '2026-02-20' },
    ],
    checkResults: [
      { id: 'C003', issueId: 'P003', checkMethod: '统计3月份冰冻与石蜡对比', result: '符合率提升至94.5%，达标', isQualified: true, checkDate: '2026-04-05' },
    ],
    actRecords: [
      { id: 'A002', issueId: 'P003', permanentMeasure: '建立冰冻-石蜡符合率月度监控机制', standardizationDoc: 'SOP-QC-2026-012', promotionScope: '与外科联席会议推广', actDate: '2026-04-10' },
    ],
  },
  {
    issue: { id: 'P004', problem: '免疫组化染色出现假阳性，影响判读', discoveredAt: '2026-04-05', responsible: '赵丽', planCompleteDate: '2026-05-20', status: '进行中', category: '免疫组化' },
    doRecords: [
      { id: 'D008', issueId: 'P004', measure: '排查一抗稀释比例和孵育时间', executor: '赵丽', executeTime: '2026-04-10' },
      { id: 'D009', issueId: 'P004', measure: '设置阳性阴性对照实验', executor: '李娜', executeTime: '2026-04-15' },
    ],
    checkResults: [
      { id: 'C004', issueId: 'P004', checkMethod: '重复10例染色实验', result: '3例仍存在弱假阳性', isQualified: false, checkDate: '2026-04-25' },
    ],
    actRecords: [],
  },
  {
    issue: { id: 'P005', problem: '标本交接记录不完整，存在安全隐患', discoveredAt: '2026-01-20', responsible: '周杰', planCompleteDate: '2026-02-28', status: '已关闭', category: '流程管理' },
    doRecords: [
      { id: 'D010', issueId: 'P005', measure: '设计标本交接电子记录表', executor: '周杰', executeTime: '2026-01-25' },
      { id: 'D011', issueId: 'P005', measure: '全科室培训电子交接流程', executor: '王丽', executeTime: '2026-02-05' },
    ],
    checkResults: [
      { id: 'C005', issueId: 'P005', checkMethod: '抽查2月份交接记录完整率', result: '完整率100%', isQualified: true, checkDate: '2026-03-01' },
    ],
    actRecords: [
      { id: 'A003', issueId: 'P005', permanentMeasure: '标本交接必须使用电子系统，记录完整率纳入绩效考核', standardizationDoc: 'SOP-QC-2026-008', promotionScope: '全院推广' , actDate: '2026-03-05'},
    ],
  },
]

type TabKey = 'plan' | 'do' | 'check' | 'act'

// 状态样式
function getIssueStatusStyle(status: string) {
  if (status === '已完成') return { color: '#16a34a', bg: '#dcfce7' }
  if (status === '进行中') return { color: '#d97706', bg: '#fef3c7' }
  if (status === '已关闭') return { color: '#64748b', bg: '#f1f5f9' }
  return { color: '#64748b', bg: '#f1f5f9' }
}

// 类别颜色
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    '切片质量': '#0891b2',
    '报告时效': '#7c3aed',
    '冰冻符合率': '#059669',
    '免疫组化': '#dc2626',
    '流程管理': '#d97706',
  }
  return colors[category] || '#64748b'
}

export default function PDCAPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('plan')
  const [searchText, setSearchText] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newIssue, setNewIssue] = useState({ problem: '', responsible: '', planCompleteDate: '', category: '切片质量' })

  // 统计数据
  const discoveredCount = 5
  const improvedCount = 3
  const monitoringCount = 2

  // 过滤案例
  const filteredCases = mockPDCACases.filter(c => {
    const matchSearch = c.issue.problem.includes(searchText) || c.issue.responsible.includes(searchText)
    return matchSearch
  })

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'plan', label: 'Plan 计划' },
    { key: 'do', label: 'Do 执行' },
    { key: 'check', label: 'Check 检查' },
    { key: 'act', label: 'Act 改进' },
  ]

  const handleAddIssue = () => {
    if (!newIssue.problem || !newIssue.responsible || !newIssue.planCompleteDate) return
    // 实际应用中这里会调用API
    alert('问题已添加：' + newIssue.problem)
    setShowAddModal(false)
    setNewIssue({ problem: '', responsible: '', planCompleteDate: '', category: '切片质量' })
  }

  return (
    <div style={{ padding: 24 }}>
      {/* 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ORANGE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} color={ORANGE} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1e293b' }}>PDCA 质量改进</h2>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>持续质量改进循环管理</p>
          </div>
        </div>
      </div>

      {/* 顶部统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={16} color={ORANGE} />
            <span style={{ fontSize: 13, color: '#64748b' }}>本月发现问题</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{discoveredCount}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>5个类别问题</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span style={{ fontSize: 13, color: '#64748b' }}>已改进数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{improvedCount}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>措施已固化</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={16} color="#0891b2" />
            <span style={{ fontSize: 13, color: '#64748b' }}>持续监控</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{monitoringCount}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>进行中问题</div>
        </div>
      </div>

      {/* Tab切换 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '14px 24px',
                fontSize: 14,
                fontWeight: 500,
                border: 'none',
                background: activeTab === tab.key ? '#fff' : 'transparent',
                color: activeTab === tab.key ? ORANGE : '#64748b',
                cursor: 'pointer',
                borderBottom: activeTab === tab.key ? `2px solid ${ORANGE}` : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: 20 }}>
          {/* Plan标签页 */}
          {activeTab === 'plan' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="搜索问题..."
                      value={searchText}
                      onChange={e => setSearchText(e.target.value)}
                      style={{ paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', width: 240 }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  <Plus size={16} />
                  新增问题
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0' }}>问题描述</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>类别</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>发现时间</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>责任人</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>计划完成</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c, idx) => {
                    const statusStyle = getIssueStatusStyle(c.issue.status)
                    const categoryColor = getCategoryColor(c.issue.category)
                    return (
                      <tr key={c.issue.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', maxWidth: 280 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Edit3 size={14} color={ORANGE} />
                            <span style={{ fontWeight: 500 }}>{c.issue.problem}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, background: `${categoryColor}15`, color: categoryColor }}>{c.issue.category}</span>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#64748b' }}>{c.issue.discoveredAt}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <Users size={14} color="#94a3b8" />
                            <span>{c.issue.responsible}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#64748b' }}>{c.issue.planCompleteDate}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 500, background: statusStyle.bg, color: statusStyle.color }}>{c.issue.status}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Do标签页 */}
          {activeTab === 'do' && (
            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 600, color: '#475569' }}>执行记录</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mockPDCACases.flatMap(c => c.doRecords.map(r => ({ ...r, issue: c.issue }))).map((record) => (
                  <div key={record.id} style={{ padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${ORANGE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: ORANGE }}>{record.id.slice(1)}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{record.measure}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>对应问题：{record.issue.problem.substring(0, 20)}...</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 12 }}>
                          <Users size={12} />
                          <span>{record.executor}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{record.executeTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Check标签页 */}
          {activeTab === 'check' && (
            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 600, color: '#475569' }}>检查结果</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mockPDCACases.flatMap(c => c.checkResults.map(r => ({ ...r, issue: c.issue }))).map((check) => (
                  <div key={check.id} style={{ padding: 16, borderRadius: 8, border: `1px solid ${check.isQualified ? '#86efac' : '#fca5a5'}`, background: check.isQualified ? '#f0fdf4' : '#fef2f2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {check.isQualified ? <CheckCircle2 size={18} color="#16a34a" /> : <AlertTriangle size={18} color="#dc2626" />}
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{check.result}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>对应问题：{check.issue.problem.substring(0, 25)}...</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: check.isQualified ? '#16a34a' : '#dc2626', fontSize: 12, fontWeight: 500 }}>
                          {check.isQualified ? '符合预期' : '未达标'}
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{check.checkDate}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginLeft: 26 }}>检查方式：{check.checkMethod}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Act标签页 */}
          {activeTab === 'act' && (
            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 600, color: '#475569' }}>改进措施固化记录</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mockPDCACases.flatMap(c => c.actRecords.map(r => ({ ...r, issue: c.issue }))).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>暂无改进措施记录</div>
                ) : (
                  mockPDCACases.flatMap(c => c.actRecords.map(r => ({ ...r, issue: c.issue }))).map((act) => (
                    <div key={act.id} style={{ padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <FileText size={16} color={ORANGE} />
                            <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{act.permanentMeasure}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>对应问题：{act.issue.problem.substring(0, 30)}...</div>
                          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                            <div style={{ fontSize: 12, color: '#64748b' }}>
                              <span style={{ fontWeight: 500 }}>标准化文件：</span>
                              <span style={{ color: ORANGE, fontFamily: 'monospace' }}>{act.standardizationDoc}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>
                              <span style={{ fontWeight: 500 }}>推广范围：</span>
                              <span style={{ color: '#0891b2' }}>{act.promotionScope}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: 11, color: '#94a3b8' }}>
                          固化日期<br />
                          <span style={{ color: '#64748b', fontWeight: 500 }}>{act.actDate}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 新增问题弹窗 */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>新增PDCA问题</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <X size={20} color="#64748b" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 6 }}>问题描述 *</label>
                <textarea
                  value={newIssue.problem}
                  onChange={e => setNewIssue({ ...newIssue, problem: e.target.value })}
                  placeholder="请描述发现的问题..."
                  rows={3}
                  style={{ width: '100%', padding: 10, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, resize: 'none', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 6 }}>责任人 *</label>
                  <input
                    type="text"
                    value={newIssue.responsible}
                    onChange={e => setNewIssue({ ...newIssue, responsible: e.target.value })}
                    placeholder="请输入责任人"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 6 }}>计划完成日期 *</label>
                  <input
                    type="date"
                    value={newIssue.planCompleteDate}
                    onChange={e => setNewIssue({ ...newIssue, planCompleteDate: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#475569', marginBottom: 6 }}>问题类别</label>
                <select
                  value={newIssue.category}
                  onChange={e => setNewIssue({ ...newIssue, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', cursor: 'pointer' }}
                >
                  <option value="切片质量">切片质量</option>
                  <option value="报告时效">报告时效</option>
                  <option value="冰冻符合率">冰冻符合率</option>
                  <option value="免疫组化">免疫组化</option>
                  <option value="流程管理">流程管理</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: '8px 16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}
              >
                取消
              </button>
              <button
                onClick={handleAddIssue}
                style={{ padding: '8px 16px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

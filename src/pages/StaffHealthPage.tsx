import { useState } from 'react'
import { Users, Shield, AlertTriangle, Calendar, FileText, Activity, CheckCircle } from 'lucide-react'

interface DoseRecord {
  year: number
  quarter: string
  dose: number // mSv
  limit: number
}

interface StaffMember {
  id: number
  name: string
  department: string
  position: string
  entryDate: string
  doseHistory: DoseRecord[]
  totalCumulative: number
  lastCheckDate: string
  status: 'normal' | 'warning' | 'overdue'
}

const DOSE_LIMIT = 50 // mSv/year, national standard
const QUARTER_LIMIT = 12.5 // mSv/quarter

const generateDoseData = (): StaffMember[] => {
  const departments = ['放射科', '核医学科', '介入中心', '放疗科', '影像科']
  const positions = ['技师', '医师', '护士', '物理师', '工程师']
  const names = [
    '张伟', '李娜', '王强', '刘芳', '陈刚', '杨玲', '赵磊', '黄敏', '周杰', '吴婷',
    '徐明', '孙丽', '马超', '朱红', '胡平'
  ]

  return names.map((name, idx) => {
    const yearDoses = [Math.random() * 45, Math.random() * 45, Math.random() * 45]
    const cumulative = yearDoses.reduce((a, b) => a + b, 0)
    const maxDose = Math.max(...yearDoses)

    let status: 'normal' | 'warning' | 'overdue' = 'normal'
    if (maxDose > DOSE_LIMIT) status = 'overdue'
    else if (maxDose > QUARTER_LIMIT * 3) status = 'warning'

    const doseHistory: DoseRecord[] = []
    const years = [2024, 2025, 2026]
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

    years.forEach((year, yIdx) => {
      quarters.forEach(quarter => {
        const baseDose = yearDoses[yIdx] / 4
        const variance = (Math.random() - 0.5) * 5
        doseHistory.push({
          year,
          quarter,
          dose: Math.max(0, baseDose + variance),
          limit: QUARTER_LIMIT
        })
      })
    })

    return {
      id: idx + 1,
      name,
      department: departments[idx % departments.length],
      position: positions[idx % positions.length],
      entryDate: `${2018 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
      doseHistory,
      totalCumulative: cumulative,
      lastCheckDate: '2026-03-15',
      status
    }
  })
}

const staffData = generateDoseData()

const warningStaff = staffData.filter(s => s.status === 'warning' || s.status === 'overdue')
const normalStaff = staffData.filter(s => s.status === 'normal')

export default function StaffHealthPage() {
  const [selectedYear, setSelectedYear] = useState<string>('2026')
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null)
  const [showWarningOnly, setShowWarningOnly] = useState(false)

  const displayedStaff = showWarningOnly ? warningStaff : staffData
  const selected = selectedStaff ? staffData.find(s => s.id === selectedStaff) : null

  const getStatusColor = (status: string) => {
    if (status === 'overdue') return '#ef4444'
    if (status === 'warning') return '#F97316'
    return '#16a34a'
  }

  const getStatusText = (status: string) => {
    if (status === 'overdue') return '超剂量'
    if (status === 'warning') return '预警'
    return '正常'
  }

  const getDoseBarWidth = (dose: number, max: number = 50) => {
    return Math.min((dose / max) * 100, 100)
  }

  const renderDoseChart = (history: DoseRecord[]) => {
    const yearFiltered = history.filter(h => h.year.toString() === selectedYear)
    return (
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
        {yearFiltered.map((record, idx) => {
          const height = (record.dose / QUARTER_LIMIT) * 40
          const isOver = record.dose > record.limit
          return (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: Math.max(height, 4),
                  background: isOver ? '#ef4444' : record.dose > QUARTER_LIMIT * 0.8 ? '#F97316' : '#16a34a',
                  borderRadius: 4,
                  transition: 'height 0.3s ease',
                  position: 'relative'
                }}
              >
                {isOver && (
                  <AlertTriangle size={10} style={{ position: 'absolute', top: 2, right: 2, color: '#fff' }} />
                )}
              </div>
              <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{record.quarter}</div>
              <div style={{ fontSize: 10, fontWeight: 500, color: isOver ? '#ef4444' : '#333' }}>
                {record.dose.toFixed(1)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>职业人员健康档案</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#fef2f2', borderRadius: 20, border: '1px solid #fecaca' }}>
            <AlertTriangle size={14} style={{ color: '#ef4444' }} />
            <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 500 }}>
              {warningStaff.length} 人需要关注
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setShowWarningOnly(!showWarningOnly)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: showWarningOnly ? '#fef2f2' : '#fff',
              color: showWarningOnly ? '#ef4444' : '#333',
              border: `1px solid ${showWarningOnly ? '#fecaca' : '#e2e8f0'}`,
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            <Shield size={16} />
            {showWarningOnly ? '显示全部' : '仅看预警'}
          </button>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', minWidth: 120 }}
          >
            <option value="2024">2024年</option>
            <option value="2025">2025年</option>
            <option value="2026">2026年</option>
          </select>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#fff', color: '#333', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <FileText size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* 统计概览 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Users size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>职业人员总数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{staffData.length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>在册管理人员</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>剂量正常</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{normalStaff.length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>年剂量 &lt; 50mSv</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>剂量预警</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>{warningStaff.filter(s => s.status === 'warning').length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>季剂量偏高</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={18} style={{ color: '#ef4444' }} />
            <span style={{ color: '#666', fontSize: 13 }}>超剂量</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{warningStaff.filter(s => s.status === 'overdue').length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>需立即处理</div>
        </div>
      </div>

      {/* 剂量限值说明 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 24, border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Shield size={16} style={{ color: '#0891b2' }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>剂量限值标准 (GBZ 128-2016)</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: '#16a34a', borderRadius: 2 }} />
            <span style={{ fontSize: 13, color: '#666' }}>有效剂量 &lt; 50mSv/年</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: '#F97316', borderRadius: 2 }} />
            <span style={{ fontSize: 13, color: '#666' }}>季度剂量 &gt; 12.5mSv 预警</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: 2 }} />
            <span style={{ fontSize: 13, color: '#666' }}>超年度剂量限值立即处理</span>
          </div>
        </div>
      </div>

      {/* 主区域：人员卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {displayedStaff.map((staff) => (
          <div
            key={staff.id}
            onClick={() => setSelectedStaff(staff.id)}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              border: selectedStaff === staff.id ? '2px solid #0891b2' : '1px solid transparent',
              opacity: selectedStaff && selectedStaff !== staff.id ? 0.6 : 1
            }}
          >
            {/* 人员头部 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: getStatusColor(staff.status),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 18,
                fontWeight: 600
              }}>
                {staff.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{staff.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{staff.position} · {staff.department}</div>
              </div>
              <div style={{
                padding: '4px 8px',
                background: getStatusColor(staff.status) + '20',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                {staff.status === 'overdue' ? (
                  <AlertTriangle size={12} style={{ color: getStatusColor(staff.status) }} />
                ) : staff.status === 'warning' ? (
                  <AlertTriangle size={12} style={{ color: getStatusColor(staff.status) }} />
                ) : (
                  <CheckCircle size={12} style={{ color: getStatusColor(staff.status) }} />
                )}
                <span style={{ fontSize: 11, fontWeight: 500, color: getStatusColor(staff.status) }}>
                  {getStatusText(staff.status)}
                </span>
              </div>
            </div>

            {/* 基本信息 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16, fontSize: 12 }}>
              <div style={{ color: '#666' }}>
                <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                入职: {staff.entryDate}
              </div>
              <div style={{ color: '#666' }}>
                <FileText size={12} style={{ display: 'inline', marginRight: 4 }} />
                累计: {staff.totalCumulative.toFixed(1)}mSv
              </div>
            </div>

            {/* 年度剂量图表 */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#666' }}>{selectedYear}年季度剂量</span>
                <span style={{ fontSize: 11, color: '#999' }}>限值: {QUARTER_LIMIT}mSv/季</span>
              </div>
              {renderDoseChart(staff.doseHistory)}
            </div>

            {/* 累计剂量进度条 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#666' }}>3年累计剂量</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: staff.totalCumulative > DOSE_LIMIT ? '#ef4444' : '#333' }}>
                  {staff.totalCumulative.toFixed(1)} / {DOSE_LIMIT * 3}mSv
                </span>
              </div>
              <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${getDoseBarWidth(staff.totalCumulative, DOSE_LIMIT * 3)}%`,
                    height: '100%',
                    background: staff.totalCumulative > DOSE_LIMIT * 3 ? '#ef4444' : staff.totalCumulative > DOSE_LIMIT * 2 ? '#F97316' : '#16a34a',
                    borderRadius: 4,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部：详细数据表格 */}
      {selected && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <FileText size={18} style={{ color: '#0891b2' }} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>{selected.name} - 剂量详情</span>
            <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>单位: mSv</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 500, color: '#666' }}>年份</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>Q1</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>Q2</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>Q3</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>Q4</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>年累计</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 500, color: '#666' }}>状态</th>
                </tr>
              </thead>
              <tbody>
                {[2024, 2025, 2026].map(year => {
                  const yearData = selected.doseHistory.filter(h => h.year === year)
                  const yearTotal = yearData.reduce((sum, h) => sum + h.dose, 0)
                  const isOver = yearTotal > DOSE_LIMIT
                  return (
                    <tr key={year} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500 }}>{year}</td>
                      {yearData.map((q, idx) => (
                        <td key={idx} style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <span style={{
                            color: q.dose > q.limit ? '#ef4444' : q.dose > q.limit * 0.8 ? '#F97316' : '#333',
                            fontWeight: q.dose > q.limit ? 600 : 400
                          }}>
                            {q.dose.toFixed(2)}
                          </span>
                        </td>
                      ))}
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: isOver ? '#ef4444' : '#333' }}>
                        {yearTotal.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {isOver ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#ef4444', fontWeight: 500 }}>
                            <AlertTriangle size={14} /> 超剂量
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#16a34a' }}>
                            <CheckCircle size={14} /> 正常
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f0fdf4', borderTop: '2px solid #16a34a' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>3年累计</td>
                  <td colSpan={4} />
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontSize: 16, color: '#16a34a' }}>
                    {selected.totalCumulative.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {selected.totalCumulative > DOSE_LIMIT * 3 ? (
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>需复查</span>
                    ) : (
                      <span style={{ color: '#16a34a', fontWeight: 500 }}>符合标准</span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{ marginTop: 20, padding: 16, background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <AlertTriangle size={16} style={{ color: '#ef4444' }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#991b1b' }}>处理建议</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#991b1b', fontSize: 13, lineHeight: 1.8 }}>
              <li>立即安排职业健康检查</li>
              <li>调离放射性工作场所一周以上</li>
              <li>填写《放射工作人员职业健康管理登记表》</li>
              <li>上报科室负责人和辐射安全管理部门</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

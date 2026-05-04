import { useState } from 'react'
import { FileText, Clock, TrendingUp, Award, Microscope, Activity, AlertCircle, BarChart3 } from 'lucide-react'

interface Doctor {
  id: number
  name: string
  title: string
  department: string
  monthlyData: {
    month: string
    slices: number
    reports: number
    positiveRate: number
    avgReportTime: number
    frozenConsultation: number
    completionRate: number
    overtimeRate: number
  }
}

interface DoctorRanking {
  doctor: string
  reports: number
  slices: number
  positiveRate: number
  score: number
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: '张明远',
    title: '主任医师',
    department: '病理诊断科',
    monthlyData: {
      month: '2024-03',
      slices: 428,
      reports: 386,
      positiveRate: 23.5,
      avgReportTime: 2.3,
      frozenConsultation: 18,
      completionRate: 96,
      overtimeRate: 4
    }
  },
  {
    id: 2,
    name: '王秀芬',
    title: '副主任医师',
    department: '病理诊断科',
    monthlyData: {
      month: '2024-03',
      slices: 395,
      reports: 352,
      positiveRate: 21.8,
      avgReportTime: 2.1,
      frozenConsultation: 22,
      completionRate: 98,
      overtimeRate: 2
    }
  },
  {
    id: 3,
    name: '李志刚',
    title: '主治医师',
    department: '细胞病理室',
    monthlyData: {
      month: '2024-03',
      slices: 312,
      reports: 278,
      positiveRate: 18.2,
      avgReportTime: 1.8,
      frozenConsultation: 8,
      completionRate: 94,
      overtimeRate: 6
    }
  },
  {
    id: 4,
    name: '赵小燕',
    title: '住院医师',
    department: '病理诊断科',
    monthlyData: {
      month: '2024-03',
      slices: 256,
      reports: 224,
      positiveRate: 15.6,
      avgReportTime: 2.6,
      frozenConsultation: 5,
      completionRate: 89,
      overtimeRate: 11
    }
  },
  {
    id: 5,
    name: '刘国庆',
    title: '主任医师',
    department: '分子病理室',
    monthlyData: {
      month: '2024-03',
      slices: 186,
      reports: 168,
      positiveRate: 28.4,
      avgReportTime: 3.2,
      frozenConsultation: 12,
      completionRate: 92,
      overtimeRate: 8
    }
  },
  {
    id: 6,
    name: '陈晓梅',
    title: '主治医师',
    department: '病理技术室',
    monthlyData: {
      month: '2024-03',
      slices: 520,
      reports: 0,
      positiveRate: 0,
      avgReportTime: 0,
      frozenConsultation: 0,
      completionRate: 100,
      overtimeRate: 0
    }
  },
]

const departmentRanking: DoctorRanking[] = [
  { doctor: '陈晓梅', reports: 520, slices: 520, positiveRate: 0, score: 98 },
  { doctor: '张明远', reports: 386, slices: 428, positiveRate: 23.5, score: 95 },
  { doctor: '王秀芬', reports: 352, slices: 395, positiveRate: 21.8, score: 92 },
  { doctor: '李志刚', reports: 278, slices: 312, positiveRate: 18.2, score: 88 },
  { doctor: '刘国庆', reports: 168, slices: 186, positiveRate: 28.4, score: 85 },
  { doctor: '赵小燕', reports: 224, slices: 256, positiveRate: 15.6, score: 82 },
]

const doctorOptions = doctors.map(d => ({ value: d.id.toString(), label: d.name }))
const monthOptions = [
  { value: '2024-03', label: '2024年3月' },
  { value: '2024-02', label: '2024年2月' },
  { value: '2024-01', label: '2024年1月' },
]

export default function WorkloadPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-03')

  const selectedDoctorData = selectedDoctor === 'all' ? null : doctors.find(d => d.id.toString() === selectedDoctor)

  const getCompletionColor = (rate: number) => {
    if (rate >= 95) return '#16a34a'
    if (rate >= 85) return '#F97316'
    return '#ef4444'
  }

  const getOvertimeColor = (rate: number) => {
    if (rate <= 5) return '#16a34a'
    if (rate <= 10) return '#F97316'
    return '#ef4444'
  }

  const renderRingChart = (value: number, max: number, color: string, size: number = 80) => {
    const percentage = (value / max) * 100
    const radius = 32
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg viewBox="0 0 80 80" style={{ width: size, height: size, transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 14, fontWeight: 600, color }}>
          {value}%
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>医师工作量统计</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', minWidth: 140 }}
          >
            <option value="all">全部医生</option>
            {doctorOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', minWidth: 120 }}
          >
            {monthOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#fff', color: '#333', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <BarChart3 size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* 月度总览 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Microscope size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>总切片数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>2,097</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>本月完成</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <FileText size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>总报告数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>1,408</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>诊断报告</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <TrendingUp size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>平均阳性率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>21.5%</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>较上月 +1.2%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>平均报告时效</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>2.4h</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>按时完成率 94%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={18} style={{ color: '#ef4444' }} />
            <span style={{ color: '#666', fontSize: 13 }}>冰冻会诊数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>65</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>术中急会诊</div>
        </div>
      </div>

      {/* 主区域：医生卡片网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: selectedDoctorData?.id === doctor.id ? '2px solid #F97316' : '1px solid transparent',
              opacity: selectedDoctor === 'all' || selectedDoctorData?.id === doctor.id ? 1 : 0.5
            }}
          >
            {/* 医生头部 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 600 }}>
                {doctor.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{doctor.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{doctor.title} · {doctor.department}</div>
              </div>
              {doctor.monthlyData.reports >= 350 && (
                <Award size={20} style={{ color: '#F97316', marginLeft: 'auto' }} />
              )}
            </div>

            {/* 统计数据 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>切片数量</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>{doctor.monthlyData.slices}</div>
              </div>
              <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>报告数量</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>{doctor.monthlyData.reports || '-'}</div>
              </div>
              <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>阳性率</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: doctor.monthlyData.positiveRate > 20 ? '#16a34a' : '#666' }}>
                  {doctor.monthlyData.positiveRate > 0 ? doctor.monthlyData.positiveRate + '%' : '-'}
                </div>
              </div>
              <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>平均时效</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>
                  {doctor.monthlyData.avgReportTime > 0 ? doctor.monthlyData.avgReportTime + 'h' : '-'}
                </div>
              </div>
            </div>

            {/* 冰冻会诊 */}
            <div style={{ background: '#fff7ed', padding: 12, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={14} style={{ color: '#F97316' }} />
                <span style={{ fontSize: 13, color: '#666' }}>冰冻会诊</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#F97316', marginLeft: 'auto' }}>{doctor.monthlyData.frozenConsultation}</span>
              </div>
            </div>

            {/* 环形进度图 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                {renderRingChart(doctor.monthlyData.completionRate, 100, getCompletionColor(doctor.monthlyData.completionRate))}
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>完成度</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                {renderRingChart(doctor.monthlyData.overtimeRate, 100, getOvertimeColor(doctor.monthlyData.overtimeRate))}
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>超时率</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部：科室横向排名柱状图 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <BarChart3 size={18} style={{ color: '#F97316' }} />
          <span style={{ fontSize: 16, fontWeight: 500 }}>科室工作量排名</span>
          <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>{selectedMonth}</span>
        </div>

        {/* 排名柱状图 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {departmentRanking.map((item, idx) => {
            const maxReports = 520
            const barWidth = (item.reports / maxReports) * 100
            return (
              <div key={item.doctor} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, textAlign: 'center' }}>
                  {idx < 3 ? (
                    <Award size={18} style={{ color: idx === 0 ? '#F97316' : idx === 1 ? '#64748b' : '#d97706' }} />
                  ) : (
                    <span style={{ fontSize: 12, color: '#666' }}>{idx + 1}</span>
                  )}
                </div>
                <div style={{ width: 80, fontSize: 13 }}>{item.doctor}</div>
                <div style={{ flex: 1, height: 28, background: '#f3f4f6', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      background: idx === 0 ? '#F97316' : idx === 1 ? '#7c3aed' : '#0891b2',
                      borderRadius: 6,
                      transition: 'width 0.3s ease'
                    }}
                  />
                  <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 500 }}>
                    {item.reports}份
                  </div>
                </div>
                <div style={{ width: 60, fontSize: 12, color: '#666', textAlign: 'right' }}>阳性{item.positiveRate > 0 ? item.positiveRate + '%' : '-'}</div>
                <div style={{ width: 50, fontSize: 12, fontWeight: 500, color: '#F97316', textAlign: 'right' }}>评分 {item.score}</div>
              </div>
            )
          })}
        </div>

        {/* 统计说明 */}
        <div style={{ marginTop: 20, padding: 16, background: '#f9fafb', borderRadius: 8, display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#F97316' }}>1,408</div>
            <div style={{ fontSize: 12, color: '#666' }}>本月总报告</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#7c3aed' }}>6</div>
            <div style={{ fontSize: 12, color: '#666' }}>参与医生</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#0891b2' }}>94%</div>
            <div style={{ fontSize: 12, color: '#666' }}>按时完成率</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#16a34a' }}>2.4h</div>
            <div style={{ fontSize: 12, color: '#666' }}>平均报告时效</div>
          </div>
        </div>
      </div>
    </div>
  )
}

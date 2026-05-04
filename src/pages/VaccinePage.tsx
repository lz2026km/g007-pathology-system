import { useState } from 'react'
import { Syringe, ShieldCheck, AlertTriangle, Clock, User, Phone, Calendar, MapPin, FileText, Activity } from 'lucide-react'

interface VaccineRecord {
  id: number
  name: string
  age: number
  phone: string
  vaccineType: '二价' | '四价' | '九价'
  vaccineName: string
  doseDate: string
  batchNumber: string
  nurse: string
  institution: string
}

interface DoseTracking {
  patientId: number
  patientName: string
  vaccineType: '二价' | '四价' | '九价'
  doses: {
    doseNumber: 1 | 2 | 3
    date: string
    institution: string
    batchNumber: string
  }[]
}

interface AdverseReaction {
  id: number
  patientName: string
  age: number
  reactionType: string
  occurTime: string
  description: string
  handling: string
  reportStatus: '已上报' | '待上报' | '已处理'
}

const vaccineStats = {
  monthlyInoculation: 156,
  fullyCompleted: 89,
  pendingQuadri: 24,
  adverseReactions: 3
}

const vaccineRecords: VaccineRecord[] = [
  { id: 1, name: '王美琳', age: 26, phone: '138****7823', vaccineType: '九价', vaccineName: '九价HPV疫苗（酿酒酵母）', doseDate: '2024-03-15', batchNumber: 'L202403012', nurse: '张晓燕', institution: '市第一人民医院' },
  { id: 2, name: '李晓婷', age: 24, phone: '139****6654', vaccineType: '九价', vaccineName: '九价HPV疫苗（酿酒酵母）', doseDate: '2024-03-14', batchNumber: 'L202403011', nurse: '张晓燕', institution: '市妇幼保健院' },
  { id: 3, name: '张文静', age: 32, phone: '136****8876', vaccineType: '四价', vaccineName: '四价HPV疫苗（酿酒酵母）', doseDate: '2024-03-14', batchNumber: 'L202403008', nurse: '李秀英', institution: '市第一人民医院' },
  { id: 4, name: '刘丽华', age: 28, phone: '137****2234', vaccineType: '九价', vaccineName: '九价HPV疫苗（酿酒酵母）', doseDate: '2024-03-13', batchNumber: 'L202403011', nurse: '王桂兰', institution: '市第一人民医院' },
  { id: 5, name: '陈思琪', age: 22, phone: '135****9987', vaccineType: '二价', vaccineName: '二价HPV疫苗（大肠杆菌）', doseDate: '2024-03-12', batchNumber: 'L202403005', nurse: '张晓燕', institution: '市社区卫生中心' },
  { id: 6, name: '赵雅婷', age: 30, phone: '158****1234', vaccineType: '四价', vaccineName: '四价HPV疫苗（酿酒酵母）', doseDate: '2024-03-11', batchNumber: 'L202403006', nurse: '李秀英', institution: '市妇幼保健院' },
  { id: 7, name: '孙雪晴', age: 25, phone: '159****5678', vaccineType: '九价', vaccineName: '九价HPV疫苗（酿酒酵母）', doseDate: '2024-03-10', batchNumber: 'L202403009', nurse: '王桂兰', institution: '市第一人民医院' },
  { id: 8, name: '周梦瑶', age: 27, phone: '188****4321', vaccineType: '二价', vaccineName: '二价HPV疫苗（大肠杆菌）', doseDate: '2024-03-09', batchNumber: 'L202403002', nurse: '张晓燕', institution: '市社区卫生中心' },
]

const doseTracking: DoseTracking[] = [
  {
    patientId: 1,
    patientName: '王美琳',
    vaccineType: '九价',
    doses: [
      { doseNumber: 1, date: '2024-01-15', institution: '市第一人民医院', batchNumber: 'L202401001' },
      { doseNumber: 2, date: '2024-03-15', institution: '市第一人民医院', batchNumber: 'L202403012' },
      { doseNumber: 3, date: '', institution: '', batchNumber: '' },
    ]
  },
  {
    patientId: 2,
    patientName: '李晓婷',
    vaccineType: '九价',
    doses: [
      { doseNumber: 1, date: '2024-01-14', institution: '市妇幼保健院', batchNumber: 'L202401002' },
      { doseNumber: 2, date: '2024-03-14', institution: '市妇幼保健院', batchNumber: 'L202403011' },
      { doseNumber: 3, date: '', institution: '', batchNumber: '' },
    ]
  },
  {
    patientId: 3,
    patientName: '张文静',
    vaccineType: '四价',
    doses: [
      { doseNumber: 1, date: '2024-02-10', institution: '市第一人民医院', batchNumber: 'L202402003' },
      { doseNumber: 2, date: '2024-03-14', institution: '市第一人民医院', batchNumber: 'L202403008' },
      { doseNumber: 3, date: '', institution: '', batchNumber: '' },
    ]
  },
  {
    patientId: 4,
    patientName: '陈思琪',
    vaccineType: '二价',
    doses: [
      { doseNumber: 1, date: '2024-01-20', institution: '市社区卫生中心', batchNumber: 'L202401005' },
      { doseNumber: 2, date: '2024-02-20', institution: '市社区卫生中心', batchNumber: 'L202402006' },
      { doseNumber: 3, date: '2024-03-12', institution: '市社区卫生中心', batchNumber: 'L202403005' },
    ]
  },
]

const adverseReactions: AdverseReaction[] = [
  { id: 1, patientName: '刘丽华', age: 28, reactionType: '注射部位红肿', occurTime: '2024-03-13 14:30', description: '接种后30分钟出现注射部位局部红肿，直径约3cm，伴轻微疼痛', handling: '局部冷敷，观察2小时后逐渐缓解', reportStatus: '已上报' },
  { id: 2, patientName: '赵雅婷', age: 30, reactionType: '发热', occurTime: '2024-03-11 20:15', description: '接种后6小时出现低热，体温37.8°C，伴乏力', handling: '多饮水，物理降温，次日体温恢复正常', reportStatus: '已处理' },
  { id: 3, patientName: '孙雪晴', age: 25, reactionType: '过敏性皮疹', occurTime: '2024-03-10 10:45', description: '接种后2小时全身出现散在红色斑丘疹，伴瘙痒', handling: '抗过敏治疗后症状缓解，需进一步随访', reportStatus: '待上报' },
]

export default function VaccinePage() {
  const [activeTab, setActiveTab] = useState<'registration' | 'tracking' | 'reaction' | 'report'>('registration')
  const [selectedPatient, setSelectedPatient] = useState<DoseTracking | null>(null)

  const getVaccineTypeColor = (type: string) => {
    switch (type) {
      case '九价': return '#7c3aed'
      case '四价': return '#0891b2'
      case '二价': return '#16a34a'
      default: return '#666'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已上报':
        return { bg: '#dcfce7', color: '#16a34a' }
      case '待上报':
        return { bg: '#fef3c7', color: '#d97706' }
      case '已处理':
        return { bg: '#dbeafe', color: '#2563eb' }
      default:
        return { bg: '#f3f4f6', color: '#666' }
    }
  }

  return (
    <div>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>HPV疫苗管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Syringe size={16} /> 新增接种
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#fff', color: '#333', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <FileText size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Syringe size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>本月接种</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>{vaccineStats.monthlyInoculation}</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>较上月 +12%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ShieldCheck size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>全程完成</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>{vaccineStats.fullyCompleted}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>九价全程接种</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>待种二四价</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{vaccineStats.pendingQuadri}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>待接种后续剂次</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={18} style={{ color: '#ef4444' }} />
            <span style={{ color: '#666', fontSize: 13 }}>异常反应</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{vaccineStats.adverseReactions}</div>
          <div style={{ fontSize: 12, color: '#d97706', marginTop: 4 }}>本月累计</div>
        </div>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 4, borderRadius: 8, width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('registration')}
          style={{ padding: '8px 20px', background: activeTab === 'registration' ? '#F97316' : 'transparent', color: activeTab === 'registration' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          接种登记
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          style={{ padding: '8px 20px', background: activeTab === 'tracking' ? '#F97316' : 'transparent', color: activeTab === 'tracking' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          剂次追踪
        </button>
        <button
          onClick={() => setActiveTab('reaction')}
          style={{ padding: '8px 20px', background: activeTab === 'reaction' ? '#F97316' : 'transparent', color: activeTab === 'reaction' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          异常反应
        </button>
        <button
          onClick={() => setActiveTab('report')}
          style={{ padding: '8px 20px', background: activeTab === 'report' ? '#F97316' : 'transparent', color: activeTab === 'report' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          统计报表
        </button>
      </div>

      {/* 接种登记 */}
      {activeTab === 'registration' && (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#666' }}>共 {vaccineRecords.length} 条记录</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="搜索姓名/电话..."
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', width: 180 }}
              />
              <select style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                <option value="">全部疫苗</option>
                <option value="九价">九价</option>
                <option value="四价">四价</option>
                <option value="二价">二价</option>
              </select>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>姓名</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>年龄</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>电话</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>疫苗种类</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>接种日期</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>批号</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>接种护士</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {vaccineRecords.map((record, idx) => (
                <tr key={record.id} style={{ borderBottom: idx < vaccineRecords.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <User size={16} style={{ color: '#9ca3af' }} />
                      {record.name}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.age}岁</td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Phone size={14} style={{ color: '#9ca3af' }} />
                      {record.phone}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, background: getVaccineTypeColor(record.vaccineType) + '20', color: getVaccineTypeColor(record.vaccineType) }}>
                      {record.vaccineType}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} style={{ color: '#9ca3af' }} />
                      {record.doseDate}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace' }}>{record.batchNumber}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.nurse}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <button style={{ padding: '4px 8px', background: '#f3f4f6', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#666' }}>查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 剂次追踪 */}
      {activeTab === 'tracking' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* 左侧：患者列表 */}
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>接种者列表</span>
            </div>
            <div style={{ maxHeight: 500, overflow: 'auto' }}>
              {doseTracking.map((patient) => (
                <div
                  key={patient.patientId}
                  onClick={() => setSelectedPatient(patient)}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    background: selectedPatient?.patientId === patient.patientId ? '#fff7ed' : '#fff',
                    borderLeft: selectedPatient?.patientId === patient.patientId ? '3px solid #F97316' : '3px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{patient.patientName}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: getVaccineTypeColor(patient.vaccineType) + '20', color: getVaccineTypeColor(patient.vaccineType) }}>
                      {patient.vaccineType}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666' }}>
                    <span>已完成 {patient.doses.filter(d => d.date).length}/3 剂</span>
                    <span style={{ color: patient.doses[2].date ? '#16a34a' : '#d97706' }}>
                      {patient.doses[2].date ? '✓ 全程完成' : '进行中'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：剂次详情 */}
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>剂次详情</span>
            </div>
            {selectedPatient ? (
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
                  <User size={32} style={{ color: '#9ca3af' }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>{selectedPatient.patientName}</div>
                    <div style={{ fontSize: 13, color: '#666' }}>疫苗类型：{selectedPatient.vaccineType}</div>
                  </div>
                </div>

                {/* 时间轴 */}
                <div style={{ position: 'relative' }}>
                  {selectedPatient.doses.map((dose, idx) => (
                    <div key={dose.doseNumber} style={{ display: 'flex', gap: 16, marginBottom: idx < selectedPatient.doses.length - 1 ? 24 : 0 }}>
                      {/* 时间轴线 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: dose.date ? '#F97316' : '#e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {dose.doseNumber}
                        </div>
                        {idx < selectedPatient.doses.length - 1 && (
                          <div style={{ width: 2, height: 40, background: dose.date ? '#F97316' : '#e5e7eb', marginTop: 8 }} />
                        )}
                      </div>

                      {/* 详情 */}
                      <div style={{ flex: 1, paddingBottom: idx < selectedPatient.doses.length - 1 ? 0 : 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                          第{dose.doseNumber}剂 {dose.date ? '' : '(待接种)'}
                        </div>
                        {dose.date ? (
                          <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8, fontSize: 13 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                              <Calendar size={14} style={{ color: '#9ca3af' }} />
                              <span>{dose.date}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                              <MapPin size={14} style={{ color: '#9ca3af' }} />
                              <span>{dose.institution}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <FileText size={14} style={{ color: '#9ca3af' }} />
                              <span style={{ fontFamily: 'monospace' }}>{dose.batchNumber}</span>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: 12, background: '#fef3c7', borderRadius: 8, fontSize: 13, color: '#d97706' }}>
                            计划接种时间：待安排
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>
                <Activity size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
                <div>请选择一位接种者查看详情</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 异常反应 */}
      {activeTab === 'reaction' && (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#666' }}>共 {adverseReactions.length} 条记录</span>
            <button style={{ padding: '6px 12px', background: '#fef3c7', color: '#d97706', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
              新增上报
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>患者</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>反应类型</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>发生时间</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>处理结果</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>上报状态</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {adverseReactions.map((reaction, idx) => {
                const badge = getStatusBadge(reaction.reportStatus)
                return (
                  <tr key={reaction.id} style={{ borderBottom: idx < adverseReactions.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 14 }}>{reaction.patientName}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{reaction.age}岁</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <AlertTriangle size={14} style={{ color: '#ef4444' }} />
                        <span style={{ fontSize: 14 }}>{reaction.reactionType}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={14} style={{ color: '#9ca3af' }} />
                        {reaction.occurTime}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#666', maxWidth: 250 }}>{reaction.handling}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: badge.bg, color: badge.color }}>
                        {reaction.reportStatus}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button style={{ padding: '4px 8px', background: '#f3f4f6', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#666' }}>详情</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 统计报表 */}
      {activeTab === 'report' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>九价接种占比</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                  <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#7c3aed" strokeWidth="4" strokeDasharray="60 100" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 14, fontWeight: 600 }}>62%</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#7c3aed' }}>97人</div>
                  <div style={{ fontSize: 12, color: '#666' }}>本月接种</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>四价接种占比</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                  <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#0891b2" strokeWidth="4" strokeDasharray="25 100" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 14, fontWeight: 600 }}>25%</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#0891b2' }}>39人</div>
                  <div style={{ fontSize: 12, color: '#666' }}>本月接种</div>
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>二价接种占比</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                  <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="13 100" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 14, fontWeight: 600 }}>13%</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#16a34a' }}>20人</div>
                  <div style={{ fontSize: 12, color: '#666' }}>本月接种</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>年度接种趋势</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 180, paddingTop: 20 }}>
              {['1月', '2月', '3月', '4月', '5月', '6月'].map((month, idx) => {
                const heights = [60, 75, 85, 70, 90, 100]
                return (
                  <div key={month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 40, height: heights[idx], background: '#F97316', borderRadius: '4px 4px 0 0', minHeight: 20 }} />
                    <span style={{ fontSize: 12, color: '#666' }}>{month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Syringe, CheckCircle, Clock, User, ShieldCheck, Package, Building2, Calendar, Hash } from 'lucide-react'

interface InjectionRecord {
  id: number
  patientName: string
  gender: '男' | '女'
  age: number
  phone: string
  vaccineName: string
  manufacturer: string
  batchNumber: string
  doseNumber: 1 | 2 | 3
  injectionSite: '左上臂' | '右上臂' | '左大腿' | '右大腿'
  injectionDate: string
  nurse: string
  institution: string
  nextDoseDate: string
  status: '已完成' | '待接种' | '已取消'
}

const INJECTION_COLOR = '#1e40af'

const injectionRecords: InjectionRecord[] = [
  { id: 1, patientName: '张伟', gender: '男', age: 35, phone: '138****1234', vaccineName: '乙肝疫苗（CHO）', manufacturer: '华药生物', batchNumber: 'HB202401001', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-01-15 09:30', nurse: '李护士', institution: '市中心医院', nextDoseDate: '2024-02-15', status: '已完成' },
  { id: 2, patientName: '王丽', gender: '女', age: 28, phone: '139****5678', vaccineName: '乙肝疫苗（CHO）', manufacturer: '华药生物', batchNumber: 'HB202401002', doseNumber: 1, injectionSite: '右上臂', injectionDate: '2024-01-16 10:00', nurse: '王护士', institution: '市妇幼保健院', nextDoseDate: '2024-02-16', status: '已完成' },
  { id: 3, patientName: '李明', gender: '男', age: 42, phone: '136****9012', vaccineName: '狂犬疫苗（Vero）', manufacturer: '辽宁成大', batchNumber: 'RA202401005', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-01-17 14:20', nurse: '张护士', institution: '市疾控中心', nextDoseDate: '2024-01-20', status: '已完成' },
  { id: 4, patientName: '赵敏', gender: '女', age: 31, phone: '137****3456', vaccineName: '狂犬疫苗（Vero）', manufacturer: '辽宁成大', batchNumber: 'RA202401006', doseNumber: 2, injectionSite: '右上臂', injectionDate: '2024-01-20 09:00', nurse: '张护士', institution: '市疾控中心', nextDoseDate: '2024-01-24', status: '已完成' },
  { id: 5, patientName: '孙强', gender: '男', age: 55, phone: '135****7890', vaccineName: '流感疫苗（四价）', manufacturer: '上海生物', batchNumber: 'FL202401010', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-01-18 11:30', nurse: '刘护士', institution: '社区卫生服务中心', nextDoseDate: '', status: '已完成' },
  { id: 6, patientName: '周婷', gender: '女', age: 26, phone: '158****2345', vaccineName: 'HPV疫苗（九价）', manufacturer: '默沙东', batchNumber: 'HPV202401015', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-01-19 15:00', nurse: '陈护士', institution: '市第一医院', nextDoseDate: '2024-03-19', status: '已完成' },
  { id: 7, patientName: '吴昊', gender: '男', age: 48, phone: '159****6789', vaccineName: '肺炎疫苗（23价）', manufacturer: '成都生物', batchNumber: 'PN202401020', doseNumber: 1, injectionSite: '右上臂', injectionDate: '2024-01-20 08:30', nurse: '赵护士', institution: '市中心医院', nextDoseDate: '', status: '已完成' },
  { id: 8, patientName: '郑雪', gender: '女', age: 33, phone: '186****0123', vaccineName: 'HPV疫苗（九价）', manufacturer: '默沙东', batchNumber: 'HPV202401016', doseNumber: 2, injectionSite: '左上臂', injectionDate: '2024-03-19 10:30', nurse: '陈护士', institution: '市第一医院', nextDoseDate: '2024-07-19', status: '已完成' },
  { id: 9, patientName: '黄磊', gender: '男', age: 38, phone: '187****4567', vaccineName: '乙肝疫苗（酿酒酵母）', manufacturer: '康泰生物', batchNumber: 'HB202401025', doseNumber: 2, injectionSite: '右上臂', injectionDate: '2024-02-15 14:00', nurse: '李护士', institution: '市中心医院', nextDoseDate: '2024-08-15', status: '已完成' },
  { id: 10, patientName: '林志', gender: '男', age: 29, phone: '188****8901', vaccineName: '狂犬疫苗（Vero）', manufacturer: '辽宁成大', batchNumber: 'RA202401030', doseNumber: 3, injectionSite: '左上臂', injectionDate: '2024-01-24 16:00', nurse: '张护士', institution: '市疾控中心', nextDoseDate: '', status: '已完成' },
  { id: 11, patientName: '杨洋', gender: '女', age: 24, phone: '189****2345', vaccineName: 'HPV疫苗（九价）', manufacturer: '默沙东', batchNumber: 'HPV202401035', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-03-01 09:00', nurse: '王护士', institution: '市妇幼保健院', nextDoseDate: '2024-05-01', status: '已完成' },
  { id: 12, patientName: '徐峰', gender: '男', age: 45, phone: '180****6789', vaccineName: '流感疫苗（四价）', manufacturer: '北京科兴', batchNumber: 'FL202401040', doseNumber: 1, injectionSite: '右上臂', injectionDate: '2024-02-10 11:00', nurse: '刘护士', institution: '社区卫生服务中心', nextDoseDate: '', status: '已完成' },
  { id: 13, patientName: '马超', gender: '男', age: 52, phone: '181****3456', vaccineName: '肺炎疫苗（23价）', manufacturer: '成都生物', batchNumber: 'PN202401045', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-02-20 10:00', nurse: '赵护士', institution: '市中心医院', nextDoseDate: '', status: '已完成' },
  { id: 14, patientName: '胡静', gender: '女', age: 30, phone: '182****7890', vaccineName: '乙肝疫苗（CHO）', manufacturer: '华药生物', batchNumber: 'HB202401050', doseNumber: 3, injectionSite: '右上臂', injectionDate: '2024-03-15 14:30', nurse: '李护士', institution: '市疾控中心', nextDoseDate: '', status: '已完成' },
  { id: 15, patientName: '罗浩', gender: '男', age: 22, phone: '183****1234', vaccineName: '流脑疫苗（A+C）', manufacturer: '兰州生物', batchNumber: 'MC202401055', doseNumber: 1, injectionSite: '左上臂', injectionDate: '2024-03-10 08:00', nurse: '王护士', institution: '市妇幼保健院', nextDoseDate: '2024-09-10', status: '已完成' },
]

function TraceChain({ record }: { record: InjectionRecord }) {
  const chain = [
    { step: '生产出厂', icon: Package, desc: record.manufacturer, done: true },
    { step: '冷链运输', icon: ShieldCheck, desc: '全程2-8℃冷链', done: true },
    { step: '机构入库', icon: Building2, desc: record.institution, done: true },
    { step: '护士接种', icon: Syringe, desc: `${record.nurse} | ${record.injectionSite}`, done: true },
    { step: '观察离院', icon: CheckCircle, desc: '30分钟观察无异常', done: true },
  ]

  return (
    <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>追溯链</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {chain.map((item, idx) => (
          <div key={item.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: INJECTION_COLOR,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
              <item.icon size={16} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#1e293b', marginTop: 6 }}>{item.step}</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, textAlign: 'center', maxWidth: 80 }}>{item.desc}</div>
            {idx < chain.length - 1 && (
              <div style={{ position: 'absolute', top: 18, left: '50%', width: '100%', height: 2, background: INJECTION_COLOR, zIndex: -1 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InjectionTrackingPage() {
  const [searchText, setSearchText] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<InjectionRecord | null>(null)

  const filtered = injectionRecords.filter(r =>
    !searchText || r.patientName.includes(searchText) || r.phone.includes(searchText) || r.batchNumber.includes(searchText)
  )

  const completedCount = injectionRecords.filter(r => r.status === '已完成').length
  const totalDoses = injectionRecords.reduce((sum, r) => sum + r.doseNumber, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 4, height: 24, background: INJECTION_COLOR, borderRadius: 2 }} />
          注射追踪记录
        </h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ padding: '8px 16px', background: INJECTION_COLOR, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Syringe size={16} /> 新增记录
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${INJECTION_COLOR}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Syringe size={18} style={{ color: INJECTION_COLOR }} />
            <span style={{ color: '#666', fontSize: 13 }}>本月接种</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: INJECTION_COLOR }}>{injectionRecords.length}</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>累计剂次 {totalDoses}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>已完成</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{completedCount}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>全程接种</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>待接种</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>
            {injectionRecords.filter(r => r.status === '待接种').length}
          </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>下一剂待安排</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ShieldCheck size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>全程追溯</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>100%</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>批号可查</div>
        </div>
      </div>

      {/* 列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: '#666' }}>共 {filtered.length} 条记录</span>
          <input
            type="text"
            placeholder="搜索姓名/电话/批号..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ padding: '6px 12px', border: `1px solid ${INJECTION_COLOR}40`, borderRadius: 6, fontSize: 13, outline: 'none', width: 200 }}
          />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['姓名', '性别/年龄', '电话', '疫苗名称', '批号', '剂次', '接种日期', '接种机构', '下一剂', '操作'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((record, idx) => (
              <tr
                key={record.id}
                style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', background: selectedRecord?.id === record.id ? '#eff6ff' : '#fff' }}
                onClick={() => setSelectedRecord(record)}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <User size={16} style={{ color: '#9ca3af' }} />
                    {record.patientName}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.gender}/{record.age}岁</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.phone}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.vaccineName}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontFamily: 'monospace' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Hash size={12} style={{ color: '#9ca3af' }} />
                    {record.batchNumber}
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: INJECTION_COLOR + '20', color: INJECTION_COLOR }}>
                    第{record.doseNumber}剂
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={12} style={{ color: '#9ca3af' }} />
                    {record.injectionDate.split(' ')[0]}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{record.institution}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: record.nextDoseDate ? '#d97706' : '#16a34a' }}>
                  {record.nextDoseDate || '—'}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <button style={{ padding: '4px 8px', background: INJECTION_COLOR, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>追溯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 追溯链 */}
      {selectedRecord && (
        <div style={{ marginTop: 24 }}>
          <TraceChain record={selectedRecord} />
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { FileText, Clock, User, Microscope, Activity, CheckCircle, AlertCircle, Calendar, Stethoscope, ClipboardList } from 'lucide-react'

interface DeathCertificate {
  id: string
  patientName: string
  patientAge: number
  gender: '男' | '女'
  deathTime: string
  deathLocation: string
  deathCause: string
  icdCode: string
  treatingDoctor: string
  issueDate: string
  status: '已签发' | '待签发' | '已作废'
}

interface AutopsyApplication {
  id: string
  patientName: string
  patientAge: number
  gender: '男' | '女'
  department: string
  applyingDoctor: string
  applyingTime: string
  reason: string
  status: '待审批' | '已批准' | '已拒绝' | '已完成'
  approvalInfo?: {
    approver: string
    approvalTime: string
    comment: string
  }
}

interface AutopsyRecord {
  id: string
  caseNumber: string
  patientName: string
  autopsyDate: string
  autopsyPhysician: string
  grossExamination: {
    bodyWeight: string
    bodyHeight: string
    externalFindings: string
    internalFindings: {
      system: string
      findings: string
    }[]
  }
  histologicalExamination: {
    organ: string
    description: string
    diagnosis: string
  }[]
  pathologicalDiagnosis: string
  causeOfDeath: string
  deathMechanism: string
  reportDate: string
}

const deathCertificates: DeathCertificate[] = [
  {
    id: 'DC20240001',
    patientName: '王建国',
    patientAge: 68,
    gender: '男',
    deathTime: '2024-03-15 08:30',
    deathLocation: '市第一人民医院ICU',
    deathCause: '急性心肌梗死',
    icdCode: 'I21.9',
    treatingDoctor: '李明华',
    issueDate: '2024-03-15 10:00',
    status: '已签发'
  },
  {
    id: 'DC20240002',
    patientName: '张秀英',
    patientAge: 75,
    gender: '女',
    deathTime: '2024-03-14 22:15',
    deathLocation: '市第一人民医院肿瘤科',
    deathCause: '肺癌伴多处转移',
    icdCode: 'C34.9',
    treatingDoctor: '王秀芬',
    issueDate: '2024-03-15 09:30',
    status: '已签发'
  },
  {
    id: 'DC20240003',
    patientName: '李志强',
    patientAge: 82,
    gender: '男',
    deathTime: '2024-03-13 16:45',
    deathLocation: '市第一人民医院神经内科',
    deathCause: '脑出血',
    icdCode: 'I61.9',
    treatingDoctor: '张志远',
    issueDate: '2024-03-14 14:00',
    status: '已签发'
  },
  {
    id: 'DC20240004',
    patientName: '刘秀兰',
    patientAge: 63,
    gender: '女',
    deathTime: '2024-03-12 11:20',
    deathLocation: '家中',
    deathCause: '猝死（死因不明）',
    icdCode: 'R96.0',
    treatingDoctor: '赵小燕',
    issueDate: '',
    status: '待签发'
  },
]

const autopsyApplications: AutopsyApplication[] = [
  {
    id: 'AA20240001',
    patientName: '王建国',
    patientAge: 68,
    gender: '男',
    department: '心内科',
    applyingDoctor: '李明华',
    applyingTime: '2024-03-15 09:00',
    reason: '患者死因疑似急性心肌梗死，需明确病理诊断',
    status: '已完成'
  },
  {
    id: 'AA20240002',
    patientName: '李志强',
    patientAge: 82,
    gender: '男',
    department: '神经内科',
    applyingDoctor: '张志远',
    applyingTime: '2024-03-13 18:00',
    reason: '脑出血病因不明，需尸检明确是高血压性脑出血还是血管畸形破裂',
    status: '已完成'
  },
  {
    id: 'AA20240003',
    patientName: '刘秀兰',
    patientAge: 63,
    gender: '女',
    department: '急诊科',
    applyingDoctor: '陈晓明',
    applyingTime: '2024-03-12 14:00',
    reason: '在家中猝死，死因不明，需尸检明确死因',
    status: '待审批',
    approvalInfo: {
      approver: '',
      approvalTime: '',
      comment: ''
    }
  },
]

const autopsyRecords: AutopsyRecord[] = [
  {
    id: 'AR20240001',
    caseNumber: 'AUT-2024-001',
    patientName: '王建国',
    autopsyDate: '2024-03-16 09:00',
    autopsyPhysician: '张明远',
    grossExamination: {
      bodyWeight: '75kg',
      bodyHeight: '172cm',
      externalFindings: '老年男性，发育正常，营养良好。尸僵已形成，存在于四肢各大关节。尸斑存在于背侧未受压部位，呈暗紫红色，指压不退色。皮肤黏膜苍白，无黄染。头部无畸形，双侧瞳孔散大，直径约6mm，等大等圆。颈部无异常。胸廓对称。心尖搏动消失。腹部膨隆，肝脾未触及。四肢无畸形。',
      internalFindings: [
        { system: '心血管系统', findings: '心脏重380g，左心室壁厚1.4cm，右心室壁厚0.3cm。心脏表面可见陈旧性心肌梗死灶，位于左室前壁，约3×2cm大小，局部可见纤维瘢痕组织。冠脉粥样硬化，左前降支狭窄约70%。主动脉可见粥样硬化斑块。' },
        { system: '呼吸系统', findings: '双肺共重950g，左肺上叶可见肺气肿改变。肺泡壁变薄，破裂融合形成肺大疱。支气管黏膜充血水肿，管腔内可见黏稠分泌物。' },
        { system: '消化系统', findings: '肝重1400g，表面光滑，质软。脾重180g，被膜完整，切面暗红。胃黏膜充血水肿，可见点状出血。胰腺可见局灶性脂肪坏死。' },
        { system: '中枢神经系统', findings: '脑重1350g，脑膜光滑，脑回扁平，脑沟变浅。大脑切面灰质、白质分界清楚，基底节区可见腔隙性脑梗死灶，约0.3×0.2cm。脑干、小脑未见异常。' },
      ]
    },
    histologicalExamination: [
      { organ: '心脏', description: '左心室前壁可见陈旧性心肌梗死区，心肌纤维被纤维组织取代，心肌细胞萎缩消失，伴有纤维瘢痕形成。梗死区边缘可见肉芽组织。冠脉内膜增厚，纤维斑块形成，管腔狭窄约70%。', diagnosis: '陈旧性心肌梗死，冠心病' },
      { organ: '肺', description: '肺泡壁变薄，肺泡腔扩大，肺大疱形成。肺泡壁毛细血管充血，肺泡腔内可见水肿液。支气管黏膜上皮脱落，固有层充血水肿。', diagnosis: '肺气肿，肺水肿' },
      { organ: '肝', description: '肝小叶结构正常，肝细胞索排列整齐，肝细胞轻度脂肪变性，可见个别气球样变细胞。汇管区未见明显炎症细胞浸润。', diagnosis: '轻度脂肪肝' },
      { organ: '脑', description: '大脑基底节区可见多个小灶性腔隙性脑梗死，神经细胞脱失，胶质细胞增生。大脑皮层神经细胞轻度变性。小脑蒲肯野细胞数量正常。', diagnosis: '腔隙性脑梗死' },
    ],
    pathologicalDiagnosis: '1. 冠心病，陈旧性心肌梗死（左室前壁）\n2. 心脏扩大\n3. 肺气肿\n4. 腔隙性脑梗死\n5. 轻度脂肪肝',
    causeOfDeath: '急性心肌梗死导致心力衰竭',
    deathMechanism: '患者有陈旧性心肌梗死病史，本次因急性心肌梗死发作导致心功能衰竭死亡',
    reportDate: '2024-03-20'
  },
  {
    id: 'AR20240002',
    caseNumber: 'AUT-2024-002',
    patientName: '李志强',
    autopsyDate: '2024-03-14 14:00',
    autopsyPhysician: '王秀芬',
    grossExamination: {
      bodyWeight: '68kg',
      bodyHeight: '168cm',
      externalFindings: '老年男性，发育正常，营养中等。尸僵已形成，存在于四肢各大关节。尸斑存在于背侧，呈暗紫红色。皮肤黏膜苍白，无黄染及出血点。头部无畸形，双侧瞳孔散大，直径约5mm。颈部无异常。胸廓对称。腹部无异常。四肢无畸形。',
      internalFindings: [
        { system: '中枢神经系统', findings: '脑重1420g，脑膜光滑，无出血。脑表面可见广泛性蛛网膜下腔出血，主要位于颅底和大脑表面。脑回扁平，脑沟变浅，脑疝形成。右侧小脑扁桃体疝，脑干受压变形。脑底动脉环可见动脉粥样硬化。' },
        { system: '心血管系统', findings: '心脏重350g，左心室壁厚1.5cm。心肌质软，暗红色。主动脉可见粥样硬化斑块形成，腹主动脉可见溃疡型斑块。心脏传导系统未见异常。' },
        { system: '呼吸系统', findings: '双肺共重850g，肺淤血水肿，表面可见点状出血。肺泡壁毛细血管扩张充血，肺泡腔内可见粉红色水肿液。' },
        { system: '其他', findings: '肝重1200g，表面光滑，质软。脾重150g，被膜完整。肾共重280g，皮质厚度正常，皮髓质分界清楚。' },
      ]
    },
    histologicalExamination: [
      { organ: '脑', description: '蛛网膜下腔可见大量红细胞及纤维素渗出，血管周围可见炎性细胞浸润。脑实质血管扩张充血，神经细胞轻度变性，脑组织水肿明显。小脑扁桃体可见出血性梗死。', diagnosis: '蛛网膜下腔出血，脑疝形成' },
      { organ: '心脏', description: '心肌纤维排列整齐，心肌细胞未见明显变性坏死。冠脉内膜纤维性增厚，可见胆固醇结晶沉积，管腔狭窄约50%。', diagnosis: '冠心病（中度）' },
      { organ: '肺', description: '肺泡壁毛细血管扩张充血，肺泡腔内充满粉红色水肿液，伴有少量炎症细胞浸润。肺泡上皮细胞脱落。', diagnosis: '肺淤血水肿' },
      { organ: '肾', description: '肾小球毛细血管丛基底膜增厚，肾小管上皮细胞轻度颗粒变性，间质血管充血。', diagnosis: '肾小管轻度变性' },
    ],
    pathologicalDiagnosis: '1. 蛛网膜下腔出血（颅底动脉瘤破裂）\n2. 脑疝（小脑扁桃体疝）\n3. 脑水肿\n4. 肺淤血水肿\n5. 冠心病',
    causeOfDeath: '颅底动脉瘤破裂导致蛛网膜下腔出血，脑疝形成致死',
    deathMechanism: '患者颅底动脉瘤破裂导致急性蛛网膜下腔出血，出血量较大形成脑疝，压迫脑干导致死亡',
    reportDate: '2024-03-18'
  },
]

export default function AutopsyPage() {
  const [activeTab, setActiveTab] = useState<'certificate' | 'application' | 'record'>('certificate')
  const [selectedRecord, setSelectedRecord] = useState<AutopsyRecord | null>(autopsyRecords[0])

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已签发':
      case '已完成':
      case '已批准':
        return { bg: '#dcfce7', color: '#16a34a' }
      case '待签发':
      case '待审批':
        return { bg: '#fef3c7', color: '#d97706' }
      case '已作废':
      case '已拒绝':
        return { bg: '#fee2e2', color: '#ef4444' }
      default:
        return { bg: '#f3f4f6', color: '#666' }
    }
  }

  return (
    <div>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>死亡与尸检管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {activeTab === 'certificate' && (
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
              <FileText size={16} /> 新增死亡证明
            </button>
          )}
          {activeTab === 'application' && (
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
              <ClipboardList size={16} /> 新增尸检申请
            </button>
          )}
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <FileText size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>死亡证明</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>{deathCertificates.length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>本月开具</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ClipboardList size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>尸检申请</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{autopsyApplications.length}</div>
          <div style={{ fontSize: 12, color: '#d97706', marginTop: 4 }}>待审批 1 项</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Microscope size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>尸检记录</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>{autopsyRecords.length}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>已完成</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>完成率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>100%</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>申请完成率</div>
        </div>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 4, borderRadius: 8, width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('certificate')}
          style={{ padding: '8px 20px', background: activeTab === 'certificate' ? '#F97316' : 'transparent', color: activeTab === 'certificate' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          死亡证明
        </button>
        <button
          onClick={() => setActiveTab('application')}
          style={{ padding: '8px 20px', background: activeTab === 'application' ? '#F97316' : 'transparent', color: activeTab === 'application' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          尸检申请
        </button>
        <button
          onClick={() => setActiveTab('record')}
          style={{ padding: '8px 20px', background: activeTab === 'record' ? '#F97316' : 'transparent', color: activeTab === 'record' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          尸检记录
        </button>
      </div>

      {/* 死亡证明 */}
      {activeTab === 'certificate' && (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#666' }}>共 {deathCertificates.length} 条记录</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="搜索患者姓名..."
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', width: 180 }}
              />
              <select style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                <option value="">全部状态</option>
                <option value="已签发">已签发</option>
                <option value="待签发">待签发</option>
                <option value="已作废">已作废</option>
              </select>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>死亡编号</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>患者</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>死亡时间</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>死亡原因</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>ICD编码</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>经治医生</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>签发日期</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>状态</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {deathCertificates.map((cert, idx) => {
                const badge = getStatusStyle(cert.status)
                return (
                  <tr key={cert.id} style={{ borderBottom: idx < deathCertificates.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace' }}>{cert.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <User size={14} style={{ color: '#9ca3af' }} />
                        <span style={{ fontSize: 14 }}>{cert.patientName}</span>
                        <span style={{ fontSize: 12, color: '#666' }}>{cert.patientAge}岁/{cert.gender}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={14} style={{ color: '#9ca3af' }} />
                        {cert.deathTime}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, color: '#333' }}>{cert.deathCause}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace', color: '#666' }}>{cert.icdCode}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Stethoscope size={14} style={{ color: '#9ca3af' }} />
                        {cert.treatingDoctor}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      {cert.issueDate ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Calendar size={14} style={{ color: '#9ca3af' }} />
                          {cert.issueDate}
                        </div>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: badge.bg, color: badge.color }}>
                        {cert.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button style={{ padding: '4px 8px', background: '#f3f4f6', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#666' }}>查看</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 尸检申请 */}
      {activeTab === 'application' && (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#666' }}>共 {autopsyApplications.length} 条记录</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="搜索患者姓名..."
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', width: 180 }}
              />
              <select style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                <option value="">全部状态</option>
                <option value="待审批">待审批</option>
                <option value="已批准">已批准</option>
                <option value="已拒绝">已拒绝</option>
                <option value="已完成">已完成</option>
              </select>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请号</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>患者</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>科室</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请医生</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请时间</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请事由</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>状态</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {autopsyApplications.map((app, idx) => {
                const badge = getStatusStyle(app.status)
                return (
                  <tr key={app.id} style={{ borderBottom: idx < autopsyApplications.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontFamily: 'monospace' }}>{app.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <User size={14} style={{ color: '#9ca3af' }} />
                        <span style={{ fontSize: 14 }}>{app.patientName}</span>
                        <span style={{ fontSize: 12, color: '#666' }}>{app.patientAge}岁/{app.gender}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>{app.department}</td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Stethoscope size={14} style={{ color: '#9ca3af' }} />
                        {app.applyingDoctor}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={14} style={{ color: '#9ca3af' }} />
                        {app.applyingTime}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#666', maxWidth: 200 }}>{app.reason}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: badge.bg, color: badge.color }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {app.status === '待审批' ? (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                          <button style={{ padding: '4px 10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>批准</button>
                          <button style={{ padding: '4px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>拒绝</button>
                        </div>
                      ) : (
                        <button style={{ padding: '4px 8px', background: '#f3f4f6', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#666' }}>查看</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 尸检记录 */}
      {activeTab === 'record' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16 }}>
          {/* 左侧：记录列表 */}
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>尸检记录列表</span>
            </div>
            <div style={{ maxHeight: 520, overflow: 'auto' }}>
              {autopsyRecords.map((record) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    background: selectedRecord?.id === record.id ? '#fff7ed' : '#fff',
                    borderLeft: selectedRecord?.id === record.id ? '3px solid #F97316' : '3px solid transparent'
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{record.patientName}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Clock size={12} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 12, color: '#666' }}>{record.autopsyDate}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    <Microscope size={12} style={{ display: 'inline', marginRight: 4 }} />
                    病理医师：{record.autopsyPhysician}
                  </div>
                  <div style={{ fontSize: 11, color: '#F97316', marginTop: 4 }}>
                    病理诊断：{record.causeOfDeath.substring(0, 20)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：详细报告 */}
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>尸检报告详情</span>
            </div>
            {selectedRecord ? (
              <div style={{ padding: 20, maxHeight: 520, overflow: 'auto' }}>
                {/* 基本信息 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>病理号</div>
                    <div style={{ fontSize: 13, fontWeight: 500, fontFamily: 'monospace' }}>{selectedRecord.caseNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>患者姓名</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedRecord.patientName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>尸检日期</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedRecord.autopsyDate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>病理医师</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedRecord.autopsyPhysician}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>报告日期</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedRecord.reportDate}</div>
                  </div>
                </div>

                {/* 大体检查 */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <Activity size={14} style={{ color: '#F97316' }} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>大体检查</span>
                  </div>
                  <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
                      <strong>一般情况：</strong>体重 {selectedRecord.grossExamination.bodyWeight}，身高 {selectedRecord.grossExamination.bodyHeight}
                    </div>
                    <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
                      <strong>外观检查：</strong>{selectedRecord.grossExamination.externalFindings}
                    </div>
                  </div>
                  {selectedRecord.grossExamination.internalFindings.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: 8, padding: 10, background: '#f9fafb', borderRadius: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: '#7c3aed' }}>{item.system}</div>
                      <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>{item.findings}</div>
                    </div>
                  ))}
                </div>

                {/* 组织学检查 */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <Microscope size={14} style={{ color: '#F97316' }} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>组织学检查</span>
                  </div>
                  {selectedRecord.histologicalExamination.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: 8, padding: 12, background: '#f9fafb', borderRadius: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#0891b2' }}>{item.organ}</div>
                      <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 6 }}>{item.description}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: '#333' }}>诊断：{item.diagnosis}</div>
                    </div>
                  ))}
                </div>

                {/* 病理诊断 */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <ClipboardList size={14} style={{ color: '#F97316' }} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>病理诊断</span>
                  </div>
                  <pre style={{ fontSize: 12, color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap', background: '#fef3c7', padding: 12, borderRadius: 6 }}>
                    {selectedRecord.pathologicalDiagnosis}
                  </pre>
                </div>

                {/* 死因判定 */}
                <div style={{ padding: 16, background: '#fee2e2', borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <AlertCircle size={14} style={{ color: '#ef4444' }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#ef4444' }}>死因判定</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: '#991b1b' }}>{selectedRecord.causeOfDeath}</div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>{selectedRecord.deathMechanism}</div>
                </div>
              </div>
            ) : (
              <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>
                <Microscope size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
                <div>请选择一条记录查看详情</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { FlaskConical, FileText, Users, Clock, CheckCircle, AlertCircle, DollarSign, Microscope, BookOpen, ClipboardList } from 'lucide-react'

interface ResearchProject {
  id: number
  title: string
  leader: string
  department: string
  startDate: string
  endDate: string
  status: '进行中' | '待伦理审查' | '已结题' | '暂停'
  budget: number
  ethicsStatus: '已通过' | '待审查' | '未申请'
  specimens: number
  publications: number
  description: string
  protocol: string
  specimenUsage: { type: string, amount: number, date: string }[]
  achievements: { title: string, journal: string, year: number }[]
}

interface PendingApplication {
  id: number
  type: '伦理审查' | '标本使用'
  projectTitle: string
  applicant: string
  submitDate: string
  status: '待审批' | '已批准' | '已拒绝'
}

const projectStats = {
  total: 5,
  ongoing: 3,
  pendingEthics: 1,
  completed: 1
}

const projects: ResearchProject[] = [
  {
    id: 1,
    title: '胃癌早筛新型生物标志物研究',
    leader: '王建国',
    department: '消化内科',
    startDate: '2023-06-15',
    endDate: '2025-06-14',
    status: '进行中',
    budget: 800000,
    ethicsStatus: '已通过',
    specimens: 320,
    publications: 3,
    description: '通过收集胃癌高危人群血清样本，利用蛋白质组学技术筛选新型早期诊断生物标志物，建立胃癌早筛模型，提高早期胃癌检出率。',
    protocol: '1. 纳入标准：年龄40-70岁，胃镜检查前患者\n2. 排除标准：已确诊胃癌，既往胃切除手术史\n3. 样本采集：空腹静脉血5ml，离心后-80℃保存\n4. 检测方法：LC-MS/MS蛋白质组学分析\n5. 统计分析：ROC曲线评估诊断效能',
    specimenUsage: [
      { type: '血清', amount: 500, date: '2024-01-15' },
      { type: '血清', amount: 300, date: '2024-02-20' },
      { type: '组织', amount: 50, date: '2024-03-10' },
    ],
    achievements: [
      { title: 'Novel serum biomarkers for early detection of gastric cancer', journal: 'Journal of Proteomics', year: 2024 },
      { title: '胃癌早期诊断标志物研究进展', journal: '中华消化杂志', year: 2024 },
    ]
  },
  {
    id: 2,
    title: '乳腺癌AI辅助诊断系统开发',
    leader: '李明华',
    department: '病理科',
    startDate: '2023-09-01',
    endDate: '2025-08-31',
    status: '进行中',
    budget: 1200000,
    ethicsStatus: '已通过',
    specimens: 1250,
    publications: 5,
    description: '基于深度学习算法，开发乳腺癌病理切片AI辅助诊断系统，实现HER2、ER、PR等指标的自动判读，提高诊断效率和一致性。',
    protocol: '1. 数据收集：收集近5年乳腺癌手术标本H&E及IHC切片\n2. 图像标注：两位高年资病理医师独立标注\n3. 模型训练：使用ResNet-50作为基础网络\n4. 验证集：500张独立测试集\n5. 评估指标：准确率、敏感度、特异度',
    specimenUsage: [
      { type: 'HE切片', amount: 800, date: '2024-01-10' },
      { type: 'IHC切片', amount: 450, date: '2024-02-15' },
    ],
    achievements: [
      { title: 'Deep learning for HER2 scoring in breast cancer', journal: 'Nature Medicine', year: 2024 },
    ]
  },
  {
    id: 3,
    title: '肺结节良恶性预测模型构建',
    leader: '张志远',
    department: '胸外科',
    startDate: '2024-01-10',
    endDate: '2026-01-09',
    status: '待伦理审查',
    budget: 600000,
    ethicsStatus: '待审查',
    specimens: 150,
    publications: 0,
    description: '整合CT影像特征、临床参数及液体活检数据，构建肺结节良恶性多模态预测模型，指导临床决策。',
    protocol: '1. 回顾性收集肺结节手术患者临床资料\n2. 前瞻性验证模型效能\n3. 多中心外部验证\n4. 建立Nomogram预测图',
    specimenUsage: [
      { type: '血清', amount: 150, date: '2024-03-01' },
    ],
    achievements: []
  },
  {
    id: 4,
    title: '结直肠癌分子分型与预后关系研究',
    leader: '刘秀英',
    department: '肿瘤科',
    startDate: '2022-03-20',
    endDate: '2024-03-19',
    status: '已结题',
    budget: 500000,
    ethicsStatus: '已通过',
    specimens: 280,
    publications: 6,
    description: '基于NGS技术对结直肠癌进行分子分型，探索不同分子亚型与临床预后的相关性，为精准治疗提供依据。',
    protocol: '1. 收集手术切除标本及配对血液样本\n2. DNA提取与NGS测序\n3. MSI检测及突变分析\n4. 随访预后数据收集',
    specimenUsage: [
      { type: '组织DNA', amount: 280, date: '2022-06-15' },
      { type: '血液DNA', amount: 280, date: '2022-06-15' },
    ],
    achievements: [
      { title: 'Molecular subtypes of colorectal cancer', journal: 'Gastroenterology', year: 2023 },
      { title: '结直肠癌分子分型临床意义', journal: '中华肿瘤杂志', year: 2023 },
    ]
  },
  {
    id: 5,
    title: '甲状腺乳头状癌风险分层模型',
    leader: '陈晓峰',
    department: '内分泌科',
    startDate: '2024-02-01',
    endDate: '2026-01-31',
    status: '进行中',
    budget: 450000,
    ethicsStatus: '已通过',
    specimens: 200,
    publications: 1,
    description: '结合超声影像特征、BRAF基因突变及临床病理因素，构建甲状腺乳头状癌复发风险分层模型。',
    protocol: '1. 超声特征提取与标准化\n2. BRAF V600E突变检测\n3. 多因素回归分析\n4. 模型验证与优化',
    specimenUsage: [
      { type: '组织', amount: 200, date: '2024-02-15' },
    ],
    achievements: [
      { title: '甲状腺癌风险评估研究', journal: '中华内分泌外科杂志', year: 2024 },
    ]
  },
]

const pendingApplications: PendingApplication[] = [
  { id: 1, type: '伦理审查', projectTitle: '肺结节良恶性预测模型构建', applicant: '张志远', submitDate: '2024-03-10', status: '待审批' },
  { id: 2, type: '标本使用', projectTitle: '胃癌早筛新型生物标志物研究', applicant: '王建国', submitDate: '2024-03-12', status: '待审批' },
  { id: 3, type: '伦理审查', projectTitle: '甲状腺乳头状癌风险分层模型', applicant: '陈晓峰', submitDate: '2024-03-08', status: '已批准' },
  { id: 4, type: '标本使用', projectTitle: '乳腺癌AI辅助诊断系统开发', applicant: '李明华', submitDate: '2024-03-05', status: '已批准' },
]

export default function ResearchPage() {
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(projects[0])

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '进行中': return { bg: '#dbeafe', color: '#2563eb' }
      case '待伦理审查': return { bg: '#fef3c7', color: '#d97706' }
      case '已结题': return { bg: '#dcfce7', color: '#16a34a' }
      case '暂停': return { bg: '#fee2e2', color: '#ef4444' }
      default: return { bg: '#f3f4f6', color: '#666' }
    }
  }

  const getEthicsStyle = (status: string) => {
    switch (status) {
      case '已通过': return { bg: '#dcfce7', color: '#16a34a' }
      case '待审查': return { bg: '#fef3c7', color: '#d97706' }
      case '未申请': return { bg: '#fee2e2', color: '#ef4444' }
      default: return { bg: '#f3f4f6', color: '#666' }
    }
  }

  return (
    <div>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>科研项目管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <FileText size={16} /> 新增课题
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <FlaskConical size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>课题总数</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>{projectStats.total}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>在研 3 项</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #2563eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#2563eb' }} />
            <span style={{ color: '#666', fontSize: 13 }}>进行中</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{projectStats.ongoing}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>课题进展正常</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertCircle size={18} style={{ color: '#d97706' }} />
            <span style={{ color: '#666', fontSize: 13 }}>待伦理审查</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{projectStats.pendingEthics}</div>
          <div style={{ fontSize: 12, color: '#d97706', marginTop: 4 }}>需尽快处理</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>已结题</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{projectStats.completed}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>课题总数</div>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16, marginBottom: 16 }}>
        {/* 左侧：课题列表 */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>课题列表</span>
          </div>
          <div style={{ maxHeight: 380, overflow: 'auto' }}>
            {projects.map((project) => {
              const statusStyle = getStatusStyle(project.status)
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    background: selectedProject?.id === project.id ? '#fff7ed' : '#fff',
                    borderLeft: selectedProject?.id === project.id ? '3px solid #F97316' : '3px solid transparent'
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{project.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <Users size={12} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 12, color: '#666' }}>{project.leader} · {project.department}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#666' }}>经费: ¥{(project.budget / 10000).toFixed(0)}万</span>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: statusStyle.bg, color: statusStyle.color }}>
                      {project.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 右侧：课题详情 */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>课题详情</span>
          </div>
          {selectedProject ? (
            <div style={{ padding: 20, maxHeight: 380, overflow: 'auto' }}>
              {/* 基本信息 */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{selectedProject.title}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Users size={14} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 13, color: '#666' }}>负责人：{selectedProject.leader}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Microscope size={14} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 13, color: '#666' }}>科室：{selectedProject.department}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 13, color: '#666' }}>{selectedProject.startDate} 至 {selectedProject.endDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <DollarSign size={14} style={{ color: '#9ca3af' }} />
                    <span style={{ fontSize: 13, color: '#666' }}>经费：¥{selectedProject.budget.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: getStatusStyle(selectedProject.status).bg, color: getStatusStyle(selectedProject.status).color }}>
                    {selectedProject.status}
                  </span>
                  <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: getEthicsStyle(selectedProject.ethicsStatus).bg, color: getEthicsStyle(selectedProject.ethicsStatus).color }}>
                    伦理审查：{selectedProject.ethicsStatus}
                  </span>
                </div>
              </div>

              {/* 立项依据 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <FileText size={14} style={{ color: '#F97316' }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>立项依据</span>
                </div>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{selectedProject.description}</p>
              </div>

              {/* 研究方案 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <ClipboardList size={14} style={{ color: '#F97316' }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>研究方案</span>
                </div>
                <pre style={{ fontSize: 12, color: '#666', lineHeight: 1.8, whiteSpace: 'pre-wrap', background: '#f9fafb', padding: 12, borderRadius: 6 }}>
                  {selectedProject.protocol}
                </pre>
              </div>

              {/* 标本使用记录 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Microscope size={14} style={{ color: '#F97316' }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>标本使用记录</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {selectedProject.specimenUsage.map((usage, idx) => (
                    <div key={idx} style={{ flex: 1, background: '#f9fafb', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#F97316' }}>{usage.amount}</div>
                      <div style={{ fontSize: 11, color: '#666' }}>{usage.type}</div>
                      <div style={{ fontSize: 10, color: '#999' }}>{usage.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 成果发表 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <BookOpen size={14} style={{ color: '#F97316' }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>成果发表</span>
                </div>
                {selectedProject.achievements.length > 0 ? (
                  <div>
                    {selectedProject.achievements.map((pub, idx) => (
                      <div key={idx} style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6, marginBottom: 6, fontSize: 12 }}>
                        <div style={{ fontWeight: 500, marginBottom: 2 }}>{pub.title}</div>
                        <div style={{ color: '#666' }}>{pub.journal} · {pub.year}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: 20 }}>暂无发表成果</div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>
              <FlaskConical size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
              <div>请选择一个课题查看详情</div>
            </div>
          )}
        </div>
      </div>

      {/* 待审批申请 */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ClipboardList size={16} style={{ color: '#F97316' }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>待审批申请</span>
          </div>
          <button style={{ padding: '6px 12px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
            全部申请
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请类型</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>课题名称</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>申请人</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: '#666', fontWeight: 500 }}>提交日期</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>状态</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: '#666', fontWeight: 500 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((app, idx) => {
              const statusConfig = {
                '待审批': { bg: '#fef3c7', color: '#d97706' },
                '已批准': { bg: '#dcfce7', color: '#16a34a' },
                '已拒绝': { bg: '#fee2e2', color: '#ef4444' },
              }[app.status]
              return (
                <tr key={app.id} style={{ borderBottom: idx < pendingApplications.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: app.type === '伦理审查' ? '#dbeafe' : '#f3e8ff', color: app.type === '伦理审查' ? '#2563eb' : '#7c3aed' }}>
                      {app.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>{app.projectTitle}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14 }}>{app.applicant}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, color: '#666' }}>{app.submitDate}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: statusConfig.bg, color: statusConfig.color }}>
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
    </div>
  )
}

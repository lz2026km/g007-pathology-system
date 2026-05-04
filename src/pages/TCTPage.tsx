import { useState } from 'react'
import { Search, Activity, AlertTriangle, Clock, Plus, Filter } from 'lucide-react'

const ORANGE = '#F97316'

// TCT样本数据类型
interface TCTSample {
  id: string
  sampleNo: string
  patientName: string
  age: number
  doctor: string
  collectDate: string
  status: '待制片' | '制片中' | '待阅' | '已报告'
  tbsResult: 'NILM' | 'ASC-US' | 'LSIL' | 'HSIL' | 'SCC' | 'AGC' | 'AIS' | 'ADC'
  reportDate?: string
  gynecologyDoctor: string
}

// TBS分类数据
const tbsCategories = [
  { code: 'NILM', name: '未见上皮内病变', color: '#16a34a', bg: '#dcfce7', desc: '细胞学正常，无恶性特征' },
  { code: 'ASC-US', name: '不能明确意义的非典型鳞状细胞', color: '#d97706', bg: '#fef3c7', desc: '轻度核异常，意义不明确' },
  { code: 'LSIL', name: '低级别鳞状上皮内病变', color: '#ea580c', bg: '#ffedd5', desc: 'HPV感染相关，轻度病变' },
  { code: 'HSIL', name: '高级别鳞状上皮内病变', color: '#dc2626', bg: '#fee2e2', desc: '中重度瘤变，需阴道镜检查' },
  { code: 'SCC', name: '鳞状细胞癌', color: '#991b1b', bg: '#fee2e2', desc: '确诊鳞状细胞癌' },
  { code: 'AGC', name: '非典型腺细胞', color: '#7c3aed', bg: '#ede9fe', desc: '腺细胞异常，需进一步检查' },
  { code: 'AIS', name: '原位腺癌', color: '#6d28d9', bg: '#ede9fe', desc: '宫颈腺癌前驱病变' },
  { code: 'ADC', name: '腺癌', color: '#4c1d95', bg: '#ede9fe', desc: '确诊宫颈腺癌' },
]

// 模拟TCT数据
const mockTCTSamples: TCTSample[] = [
  { id: '1', sampleNo: 'TCT-2026-0501', patientName: '张丽华', age: 35, doctor: '李明', collectDate: '2026-05-01', status: '已报告', tbsResult: 'NILM', reportDate: '2026-05-02', gynecologyDoctor: '王芳' },
  { id: '2', sampleNo: 'TCT-2026-0502', patientName: '王秀英', age: 42, doctor: '李明', collectDate: '2026-05-01', status: '已报告', tbsResult: 'ASC-US', reportDate: '2026-05-02', gynecologyDoctor: '刘婷' },
  { id: '3', sampleNo: 'TCT-2026-0503', patientName: '李梅', age: 28, doctor: '张强', collectDate: '2026-05-02', status: '待阅', tbsResult: 'LSIL', gynecologyDoctor: '王芳' },
  { id: '4', sampleNo: 'TCT-2026-0504', patientName: '赵雪琴', age: 51, doctor: '张强', collectDate: '2026-05-02', status: '待制片', tbsResult: 'NILM', gynecologyDoctor: '刘婷' },
  { id: '5', sampleNo: 'TCT-2026-0505', patientName: '陈小红', age: 38, doctor: '李明', collectDate: '2026-05-02', status: '制片中', tbsResult: 'HSIL', gynecologyDoctor: '王芳' },
  { id: '6', sampleNo: 'TCT-2026-0506', patientName: '周丽', age: 45, doctor: '张强', collectDate: '2026-05-03', status: '已报告', tbsResult: 'NILM', reportDate: '2026-05-04', gynecologyDoctor: '刘婷' },
  { id: '7', sampleNo: 'TCT-2026-0507', patientName: '吴美玲', age: 33, doctor: '李明', collectDate: '2026-05-03', status: '待阅', tbsResult: 'ASC-US', gynecologyDoctor: '王芳' },
  { id: '8', sampleNo: 'TCT-2026-0508', patientName: '郑晓燕', age: 55, doctor: '张强', collectDate: '2026-05-04', status: '已报告', tbsResult: 'SCC', reportDate: '2026-05-05', gynecologyDoctor: '刘婷' },
  { id: '9', sampleNo: 'TCT-2026-0509', patientName: '孙雅琴', age: 29, doctor: '李明', collectDate: '2026-05-04', status: '待阅', tbsResult: 'NILM', gynecologyDoctor: '王芳' },
  { id: '10', sampleNo: 'TCT-2026-0510', patientName: '黄桂英', age: 47, doctor: '张强', collectDate: '2026-05-04', status: '已报告', tbsResult: 'AGC', reportDate: '2026-05-05', gynecologyDoctor: '刘婷' },
]

// 月度阴性率数据
const monthlyNegativeData = [
  { month: '2025-11', rate: 91.2 },
  { month: '2025-12', rate: 89.5 },
  { month: '2026-01', rate: 92.8 },
  { month: '2026-02', rate: 88.3 },
  { month: '2026-03', rate: 90.1 },
  { month: '2026-04', rate: 93.5 },
]

// 获取TBS样式
function getTBStyle(result: string) {
  const cat = tbsCategories.find(c => c.code === result)
  if (!cat) return { color: '#64748b', bg: '#f1f5f9' }
  return { color: cat.color, bg: cat.bg }
}

// 获取状态样式
function getStatusStyle(status: string) {
  if (status === '已报告') return { color: '#16a34a', bg: '#dcfce7' }
  if (status === '待阅') return { color: '#d97706', bg: '#fef3c7' }
  if (status === '制片中') return { color: '#0891b2', bg: '#e0f2fe' }
  if (status === '待制片') return { color: '#64748b', bg: '#f1f5f9' }
  return { color: '#64748b', bg: '#f1f5f9' }
}

export default function TCTPage() {
  const [searchText, setSearchText] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('全部')
  const [filterTBS, setFilterTBS] = useState<string>('全部')

  // 统计数据
  const todayMake = 12
  const pendingReview = 28
  const positiveRate = 8.5
  const unsatisfactoryRate = 2.1

  // 过滤数据
  const filteredSamples = mockTCTSamples.filter(s => {
    const matchSearch = s.sampleNo.includes(searchText) || s.patientName.includes(searchText)
    const matchStatus = filterStatus === '全部' || s.status === filterStatus
    const matchTBS = filterTBS === '全部' || s.tbsResult === filterTBS
    return matchSearch && matchStatus && matchTBS
  })

  // 计算阳性数
  const positiveCount = mockTCTSamples.filter(s => ['ASC-US', 'LSIL', 'HSIL', 'SCC', 'AGC', 'AIS', 'ADC'].includes(s.tbsResult)).length

  return (
    <div style={{ padding: 24 }}>
      {/* 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ORANGE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color={ORANGE} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#1e293b' }}>液基细胞学 TCT</h2>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>ThinPrep Cytology Test</p>
          </div>
        </div>
      </div>

      {/* 顶部统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Plus size={16} color={ORANGE} />
            <span style={{ fontSize: 13, color: '#64748b' }}>今日制片</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{todayMake}</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>较昨日 +3</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={16} color="#d97706" />
            <span style={{ fontSize: 13, color: '#64748b' }}>待阅样本</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{pendingReview}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>含高风险 3 例</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={16} color="#dc2626" />
            <span style={{ fontSize: 13, color: '#64748b' }}>阳性率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{positiveRate}%</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>阳性 {positiveCount} 例 / 总计 {mockTCTSamples.length}</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={16} color="#64748b" />
            <span style={{ fontSize: 13, color: '#64748b' }}>不满意率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#64748b' }}>{unsatisfactoryRate}%</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>标本量不足需重新采集</div>
        </div>
      </div>

      {/* 中部布局：左侧表格 + 右侧TBS说明 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, marginBottom: 24 }}>
        {/* TCT样本列表 */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {/* 搜索和筛选 */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="搜索样本号/患者姓名..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', cursor: 'pointer' }}>
              <option value="全部">全部状态</option>
              <option value="待制片">待制片</option>
              <option value="制片中">制片中</option>
              <option value="待阅">待阅</option>
              <option value="已报告">已报告</option>
            </select>
            <select value={filterTBS} onChange={e => setFilterTBS(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', cursor: 'pointer' }}>
              <option value="全部">全部TBS</option>
              {tbsCategories.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>

          {/* 表格 */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>样本号</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>患者</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>年龄</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>妇科医生</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>采样日期</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>制片状态</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>TBS结果</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>报告日期</th>
                </tr>
              </thead>
              <tbody>
                {filteredSamples.map((sample, idx) => {
                  const tbsStyle = getTBStyle(sample.tbsResult)
                  const statusStyle = getStatusStyle(sample.status)
                  return (
                    <tr key={sample.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontFamily: 'monospace', fontSize: 12, color: ORANGE }}>{sample.sampleNo}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{sample.patientName}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>{sample.age}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{sample.gynecologyDoctor}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12 }}>{sample.collectDate}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, background: statusStyle.bg, color: statusStyle.color }}>{sample.status}</span>
                      </td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, background: tbsStyle.bg, color: tbsStyle.color }}>{sample.tbsResult}</span>
                      </td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontSize: 12, color: '#64748b' }}>{sample.reportDate || '-'}</td>
                    </tr>
                  )
                })}
                {filteredSamples.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>暂无数据</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 右侧TBS分类说明 */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 20, height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color={ORANGE} />
            TBS分类说明
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tbsCategories.map(cat => (
              <div key={cat.code} style={{ padding: 10, borderRadius: 6, background: cat.bg, border: `1px solid ${cat.color}30` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.code}</span>
                  <span style={{ fontSize: 12, color: cat.color, fontWeight: 500 }}>{cat.name}</span>
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部阴性率统计图表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 20 }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={16} color={ORANGE} />
          月度阴性率趋势
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 180, padding: '0 20px' }}>
          {monthlyNegativeData.map((item, idx) => {
            const maxRate = 100
            const barHeight = (item.rate / maxRate) * 140
            return (
              <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: idx === monthlyNegativeData.length - 1 ? ORANGE : '#475569' }}>{item.rate}%</span>
                  <div style={{ width: '100%', height: barHeight, background: idx === monthlyNegativeData.length - 1 ? ORANGE : `${ORANGE}60`, borderRadius: '4px 4px 0 0', minHeight: 20, transition: 'height 0.3s' }} />
                </div>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.month.slice(5)}月</span>
              </div>
            )
          })}
        </div>
        {/* 平均线 */}
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 3, background: `${ORANGE}60`, borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: '#64748b' }}>月度阴性率</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 3, background: ORANGE, borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: '#64748b' }}>当前月</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { pathologyReports, PathologyReport } from '../data/initialData'

const ORANGE = '#F97316'
const ORANGE_BORDER = '#fed7aa'

// 状态颜色
const statusColor = (s: string) => {
  if (s === '已审核') return { bg: '#dcfce7', color: '#166534' }
  if (s === '待审核') return { bg: '#fef3c7', color: '#d97706' }
  if (s === '已打印') return { bg: '#dbeafe', color: '#2563eb' }
  if (s === '待书写') return { bg: '#f1f5f9', color: '#64748b' }
  return { bg: '#f1f5f9', color: '#64748b' }
}

// 报告详情弹窗
function ReportDetailModal({ report, onClose, onApprove }: { report: PathologyReport; onClose: () => void; onApprove?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'diagnosis' | 'markers'>('info')

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 0, width: 720, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>病理报告详情</h3>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{report.reportId} | {report.specimenId}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ ...statusColor(report.status), padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>{report.status}</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
          </div>
        </div>

        {/* 标签页 */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 24px' }}>
          {[['info', '报告信息'], ['diagnosis', '病理诊断'], ['markers', '免疫组化']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: activeTab === key ? 600 : 400,
                color: activeTab === key ? ORANGE : '#64748b',
                borderBottom: activeTab === key ? `2px solid ${ORANGE}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 内容 */}
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
          {activeTab === 'info' && (
            <>
              {/* 报告头部 */}
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {[
                    ['报告编号', report.reportId],
                    ['病理号', report.specimenId],
                    ['报告时间', report.reportTime],
                    ['患者姓名', report.patientName],
                    ['性别/年龄', `${report.gender} / ${report.age}岁`],
                    ['标本类型', report.specimenType],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ color: '#94a3b8', fontSize: 11 }}>{label}</div>
                      <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 基本信息 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 3, height: 14, background: ORANGE, borderRadius: 2 }} />
                  基本信息
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    ['取材部位', report.specimenSource],
                    ['临床诊断', report.clinicalDiagnosis],
                    ['病理医生', report.pathologist],
                    ['审核医生', report.审核医生],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                      <div style={{ color: '#374151', fontSize: 14 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 大体描述 */}
              {report.grossDescription && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 3, height: 14, background: ORANGE, borderRadius: 2 }} />
                    大体描述
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, color: '#374151', fontSize: 13, lineHeight: 1.7, borderLeft: `3px solid ${ORANGE_BORDER}` }}>{report.grossDescription}</div>
                </div>
              )}

              {/* 镜下描述 */}
              {report.microscopicDescription && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 3, height: 14, background: ORANGE, borderRadius: 2 }} />
                    镜下描述
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, color: '#374151', fontSize: 13, lineHeight: 1.7 }}>{report.microscopicDescription}</div>
                </div>
              )}

              {/* 标签 */}
              <div style={{ display: 'flex', gap: 8 }}>
                {report.isFrozen && <span style={{ padding: '4px 12px', background: '#fee2e2', color: '#dc2626', borderRadius: 16, fontSize: 12, fontWeight: 500 }}>❄️ 冰冻</span>}
                {report.isIHC && <span style={{ padding: '4px 12px', background: '#dbeafe', color: '#2563eb', borderRadius: 16, fontSize: 12, fontWeight: 500 }}>🔬 免疫组化</span>}
              </div>
            </>
          )}

          {activeTab === 'diagnosis' && (
            <div>
              {/* 病理诊断高亮 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 3, height: 14, background: ORANGE, borderRadius: 2 }} />
                  病理诊断
                </div>
                <div style={{ background: '#fef3c7', borderRadius: 12, padding: 16, borderLeft: `4px solid #d97706` }}>
                  <div style={{ color: '#92400e', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{report.diagnosis}</div>
                  {report.diagnosisCode && (
                    <div style={{ color: '#b45309', fontSize: 13, marginBottom: 4 }}>ICD-10: {report.diagnosisCode}</div>
                  )}
                </div>
              </div>

              {/* 诊断详情 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {report.tumorDifferentiation && (
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>分化程度</div>
                    <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{report.tumorDifferentiation}</div>
                  </div>
                )}
                {report.invasionDepth && (
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>浸润深度</div>
                    <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{report.invasionDepth}</div>
                  </div>
                )}
                {report.lymphNodeStatus && (
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>淋巴结状态</div>
                    <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{report.lymphNodeStatus}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'markers' && (
            <div>
              {report.biomarkers && Object.keys(report.biomarkers).length > 0 ? (
                <>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 3, height: 14, background: ORANGE, borderRadius: 2 }} />
                    免疫组化标记
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {Object.entries(report.biomarkers).map(([marker, result]) => {
                      const isPositive = result.includes('阳性') || result.includes('强阳性')
                      const isNegative = result.includes('阴性')
                      return (
                        <div key={marker} style={{
                          background: '#f8fafc', borderRadius: 8, padding: '12px 16px',
                          border: `1px solid ${isPositive ? '#86efac' : isNegative ? '#fca5a5' : '#e2e8f0'}`,
                          textAlign: 'center'
                        }}>
                          <div style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>{marker}</div>
                          <div style={{
                            color: isPositive ? '#16a34a' : isNegative ? '#dc2626' : '#475569',
                            fontSize: 14, fontWeight: 600
                          }}>{result}</div>
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
                  <div>暂无免疫组化标记数据</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          {report.status === '待审核' && onApprove && (
            <button
              onClick={() => { onApprove(report.id); onClose() }}
              style={{ padding: '8px 20px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
            >
              审核通过
            </button>
          )}
          <button style={{ padding: '8px 20px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>打印</button>
          <button style={{ padding: '8px 20px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>下载PDF</button>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>关闭</button>
        </div>
      </div>
    </div>
  )
}

// 打印预览弹窗
function PrintPreviewModal({ report, onClose }: { report: PathologyReport; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 0, width: 650, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>打印预览</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>

        {/* 报告内容 */}
        <div style={{ padding: 32, overflowY: 'auto', flex: 1, background: '#f8fafc' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 32, maxWidth: 600, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>病理检查报告单</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{report.reportId}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, fontSize: 13 }}>
              <div>患者: {report.patientName}  {report.gender} {report.age}岁</div>
              <div>标本: {report.specimenType}</div>
              <div>部位: {report.specimenSource}</div>
              <div>临床: {report.clinicalDiagnosis}</div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12, marginTop: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>大体描述</div>
              <div style={{ fontSize: 13, color: '#374151', marginBottom: 12 }}>{report.grossDescription || '-'}</div>

              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>镜下描述</div>
              <div style={{ fontSize: 13, color: '#374151', marginBottom: 12 }}>{report.microscopicDescription || '-'}</div>

              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, fontWeight: 600 }}>病理诊断</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', background: '#fef9c3', padding: 8, borderRadius: 4 }}>{report.diagnosis}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, fontSize: 12, color: '#64748b' }}>
              <div>病理医生: {report.pathologist}</div>
              <div>审核医生: {report.审核医生}</div>
              <div>{report.reportTime}</div>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>取消</button>
          <button style={{ padding: '8px 20px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }} onClick={() => window.print()}>确认打印</button>
        </div>
      </div>
    </div>
  )
}

export default function ReportPage() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [detailReport, setDetailReport] = useState<PathologyReport | null>(null)
  const [printReport, setPrintReport] = useState<PathologyReport | null>(null)
  const [reports, setReports] = useState<PathologyReport[]>(pathologyReports)

  const filtered = reports.filter(r => {
    const matchText = !searchText ||
      r.reportId.toLowerCase().includes(searchText.toLowerCase()) ||
      r.specimenId.toLowerCase().includes(searchText.toLowerCase()) ||
      r.patientName.includes(searchText) ||
      r.diagnosis.includes(searchText)
    const matchStatus = !statusFilter || r.status === statusFilter
    const matchType = !typeFilter || r.specimenType === typeFilter
    return matchText && matchStatus && matchType
  })

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: '已审核' } : r))
  }

  const todayCount = reports.filter(r => r.reportTime && r.reportTime.startsWith('2025-05-03')).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 4, height: 24, background: ORANGE, borderRadius: 2 }} />
          病理报告管理
        </h2>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          今日报告: <span style={{ fontWeight: 600, color: ORANGE }}>{todayCount}</span> 份
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ color: '#666', fontSize: 13 }}>报告总数</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: ORANGE }}>{reports.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待书写</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#64748b' }}>{reports.filter(r => r.status === '待书写').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待审核</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{reports.filter(r => r.status === '待审核').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已审核</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{reports.filter(r => r.status === '已审核').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已打印</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{reports.filter(r => r.status === '已打印').length}</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="搜索报告号/病理号/患者/诊断..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ padding: '8px 12px', border: `1px solid ${ORANGE_BORDER}`, borderRadius: 6, width: 280, fontSize: 13, outline: 'none' }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
            <option value="">全部状态</option>
            <option value="待书写">待书写</option>
            <option value="待审核">待审核</option>
            <option value="已审核">已审核</option>
            <option value="已打印">已打印</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
            <option value="">全部类型</option>
            <option value="手术标本">手术标本</option>
            <option value="常规活检">常规活检</option>
            <option value="细胞学">细胞学</option>
            <option value="冰冻切片">冰冻切片</option>
            <option value="骨髓活检">骨髓活检</option>
          </select>
          {(searchText || statusFilter || typeFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter(''); setTypeFilter('') }} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>清空筛选</button>
          )}
        </div>
        {(searchText || statusFilter || typeFilter) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>筛选结果：共 {filtered.length} 条 / 总计 {reports.length} 条</div>
        )}
      </div>

      {/* 报告列表 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['报告号', '病理号', '患者', '性别/年龄', '标本类型', '取材部位', '临床诊断', '病理诊断', '医生', '审核', '报告时间', '状态', '操作'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: '#475569', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={13} style={{ padding: '40px 0', textAlign: 'center', color: '#999' }}>暂无匹配的病理报告</td></tr>
            ) : filtered.map(r => {
              const sc = statusColor(r.status)
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9', background: r.status === '待审核' ? '#fffbf0' : 'transparent' }}>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'monospace', color: ORANGE, fontWeight: 600 }}>{r.reportId}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'monospace', color: '#64748b' }}>{r.specimenId}</td>
                  <td style={{ padding: '12px 14px', fontSize: 14, fontWeight: 500 }}>{r.patientName}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{r.gender} / {r.age}岁</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{r.specimenType}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.specimenSource}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#64748b' }}>{r.clinicalDiagnosis}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1e293b', fontWeight: 500 }}>{r.diagnosis}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{r.pathologist}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{r.审核医生}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{r.reportTime}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500, background: sc.bg, color: sc.color }}>{r.status}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>
                    <button onClick={() => setDetailReport(r)} style={{ padding: '4px 10px', background: ORANGE, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                    {r.status === '待审核' && (
                      <button onClick={() => handleApprove(r.id)} style={{ padding: '4px 10px', background: '#fff', color: '#16a34a', border: '1px solid #16a34a', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>审核</button>
                    )}
                    {r.status === '已审核' && (
                      <button onClick={() => setPrintReport(r)} style={{ padding: '4px 10px', background: '#fff', color: '#2563eb', border: '1px solid #2563eb', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>打印</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {detailReport && <ReportDetailModal report={detailReport} onClose={() => setDetailReport(null)} onApprove={handleApprove} />}
      {printReport && <PrintPreviewModal report={printReport} onClose={() => setPrintReport(null)} />}
    </div>
  )
}

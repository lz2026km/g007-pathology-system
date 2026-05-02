import { useState } from 'react'
import { pathologyReports, PathologyReport } from '../data/initialData'

// 报告详情弹窗
function ReportDetailModal({ report, onClose }: { report: PathologyReport; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 640, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>病理报告详情</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>

        {/* 报告头部 */}
        <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              ['报告编号', report.reportId],
              ['病理号', report.specimenId],
              ['报告时间', report.reportTime],
              ['患者姓名', report.patientName],
              ['性别/年龄', `${report.gender} / ${report.age}岁`],
              ['报告状态', report.status],
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
          <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>基本信息</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['标本类型', report.specimenType],
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
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>大体描述</div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, color: '#374151', fontSize: 13, lineHeight: 1.7 }}>{report.grossDescription}</div>
          </div>
        )}

        {/* 镜下描述 */}
        {report.microscopicDescription && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>镜下描述</div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, color: '#374151', fontSize: 13, lineHeight: 1.7 }}>{report.microscopicDescription}</div>
          </div>
        )}

        {/* 病理诊断 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>病理诊断</div>
          <div style={{ background: '#fef3c7', borderRadius: 8, padding: 12, borderLeft: '4px solid #d97706' }}>
            <div style={{ color: '#92400e', fontSize: 15, fontWeight: 600 }}>{report.diagnosis}</div>
            {report.diagnosisCode && <div style={{ color: '#b45309', fontSize: 12, marginTop: 4 }}>ICD-10: {report.diagnosisCode}</div>}
            {report.tumorDifferentiation && <div style={{ color: '#b45309', fontSize: 12, marginTop: 2 }}>分化程度: {report.tumorDifferentiation}</div>}
            {report.invasionDepth && <div style={{ color: '#b45309', fontSize: 12, marginTop: 2 }}>浸润深度: {report.invasionDepth}</div>}
            {report.lymphNodeStatus && <div style={{ color: '#b45309', fontSize: 12, marginTop: 2 }}>淋巴结: {report.lymphNodeStatus}</div>}
          </div>
        </div>

        {/* 标记物 */}
        {report.biomarkers && Object.keys(report.biomarkers).length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>免疫组化标记</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {Object.entries(report.biomarkers).map(([marker, result]) => (
                <div key={marker} style={{ background: '#f8fafc', borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}>
                  <div style={{ color: '#64748b', fontSize: 11 }}>{marker}</div>
                  <div style={{ color: '#1e293b', fontSize: 13, fontWeight: 600, marginTop: 2 }}>{result}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 标签 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {report.isFrozen && <span style={{ padding: '2px 10px', background: '#fee2e2', color: '#dc2626', borderRadius: 12, fontSize: 12 }}>冰冻</span>}
          {report.isIHC && <span style={{ padding: '2px 10px', background: '#dbeafe', color: '#1e40af', borderRadius: 12, fontSize: 12 }}>免疫组化</span>}
        </div>

        <div style={{ marginTop: 20, textAlign: 'right', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button style={{ padding: '8px 20px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>打印</button>
          <button style={{ padding: '8px 20px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>下载PDF</button>
          <button onClick={onClose} style={{ padding: '8px 20px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>关闭</button>
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

  const filtered = pathologyReports.filter(r => {
    const matchText = !searchText ||
      r.reportId.toLowerCase().includes(searchText.toLowerCase()) ||
      r.specimenId.toLowerCase().includes(searchText.toLowerCase()) ||
      r.patientName.includes(searchText) ||
      r.diagnosis.includes(searchText)
    const matchStatus = !statusFilter || r.status === statusFilter
    const matchType = !typeFilter || r.specimenType === typeFilter
    return matchText && matchStatus && matchType
  })

  const statusColor = (s: string) => {
    if (s === '已审核') return { bg: '#dcfce7', color: '#166534' }
    if (s === '待审核') return { bg: '#fef3c7', color: '#d97706' }
    if (s === '已打印') return { bg: '#dbeafe', color: '#1e40af' }
    return { bg: '#f1f5f9', color: '#64748b' }
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>病理报告管理</h2>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>报告总数</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>{pathologyReports.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>待审核</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{pathologyReports.filter(r => r.status === '待审核').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已审核</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{pathologyReports.filter(r => r.status === '已审核').length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>已打印</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>{pathologyReports.filter(r => r.status === '已打印').length}</div>
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
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 280 }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部状态</option>
            <option value="待书写">待书写</option>
            <option value="待审核">待审核</option>
            <option value="已审核">已审核</option>
            <option value="已打印">已打印</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部类型</option>
            <option value="手术标本">手术标本</option>
            <option value="常规活检">常规活检</option>
            <option value="细胞学">细胞学</option>
            <option value="冰冻切片">冰冻切片</option>
            <option value="骨髓活检">骨髓活检</option>
          </select>
          {(searchText || statusFilter || typeFilter) && (
            <button onClick={() => { setSearchText(''); setStatusFilter(''); setTypeFilter('') }} style={{ padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>清空筛选</button>
          )}
        </div>
        {(searchText || statusFilter || typeFilter) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>筛选结果：共 {filtered.length} 条 / 总计 {pathologyReports.length} 条</div>
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
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: 'monospace', color: '#1e40af', fontWeight: 500 }}>{r.reportId}</td>
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
                    <button onClick={() => setDetailReport(r)} style={{ padding: '4px 10px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>详情</button>
                    {r.status === '待审核' && <button style={{ padding: '4px 10px', background: '#fff', color: '#16a34a', border: '1px solid #16a34a', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>审核</button>}
                    {r.status === '已审核' && <button style={{ padding: '4px 10px', background: '#fff', color: '#0891b2', border: '1px solid #0891b2', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>打印</button>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {detailReport && <ReportDetailModal report={detailReport} onClose={() => setDetailReport(null)} />}
    </div>
  )
}

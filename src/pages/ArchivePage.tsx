import { useState } from 'react'
import { Search, Download, Upload, FileText, Calendar, User } from 'lucide-react'

const archiveData = [
  { id: 'A20240001', patientName: '张伟', archiveDate: '2024-01-15', department: '胃肠外科', years: 10, status: '已完成' },
  { id: 'A20240002', patientName: '李娜', archiveDate: '2024-01-18', department: '乳腺外科', years: 8, status: '已完成' },
  { id: 'A20240003', patientName: '王强', archiveDate: '2024-02-20', department: '胸外科', years: 6, status: '处理中' },
  { id: 'A20240004', patientName: '刘芳', archiveDate: '2024-03-10', department: '妇产科', years: 5, status: '已完成' },
  { id: 'A20240005', patientName: '陈明', archiveDate: '2024-04-05', department: '骨科', years: 3, status: '处理中' },
]

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const filteredData = archiveData.filter(item =>
    item.patientName.includes(searchTerm) || 
    item.id.includes(searchTerm) ||
    item.department.includes(searchTerm)
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>档案管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Upload size={16} /> 批量导入
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Download size={16} /> 批量导出
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>总档案数</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>12,856</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>本月新增</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>328</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>借阅中</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>45</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>逾期未还</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>12</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
            <input
              type="text"
              placeholder="搜索档案号、患者姓名、科室..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14 }}
            />
          </div>
          <select style={{ padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14 }}>
            <option>全部年份</option>
            <option>近1年</option>
            <option>近3年</option>
            <option>近5年</option>
            <option>5年以上</option>
          </select>
          <select style={{ padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14 }}>
            <option>全部科室</option>
            <option>胃肠外科</option>
            <option>乳腺外科</option>
            <option>胸外科</option>
            <option>妇产科</option>
            <option>骨科</option>
          </select>
          <div style={{ display: 'flex', gap: 4 }}>
            <button 
              onClick={() => setViewMode('table')}
              style={{ padding: '8px 12px', background: viewMode === 'table' ? '#F97316' : '#f1f5f9', color: viewMode === 'table' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              表格
            </button>
            <button 
              onClick={() => setViewMode('card')}
              style={{ padding: '8px 12px', background: viewMode === 'card' ? '#F97316' : '#f1f5f9', color: viewMode === 'card' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              卡片
            </button>
          </div>
        </div>

        {/* 表格视图 */}
        {viewMode === 'table' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>档案号</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>患者姓名</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>归档日期</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>来源科室</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>保管年限</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontFamily: 'monospace', color: '#F97316' }}>{item.id}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{item.patientName}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={14} style={{ color: '#666' }} /> {item.archiveDate}
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{item.department}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{item.years}年</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: item.status === '已完成' ? '#dcfce7' : '#fef3c7', color: item.status === '已完成' ? '#166534' : '#d97706' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ padding: '4px 8px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: 4 }}>查看</button>
                    <button style={{ padding: '4px 8px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer' }}>借阅</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 卡片视图 */}
        {viewMode === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filteredData.map(item => (
              <div key={item.id} style={{ background: '#f8fafc', borderRadius: 8, padding: 16, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={18} style={{ color: '#F97316' }} />
                    <span style={{ fontFamily: 'monospace', color: '#F97316', fontWeight: 600 }}>{item.id}</span>
                  </div>
                  <span style={{ padding: '2px 8px', borderRadius: 10, fontSize: 11, background: item.status === '已完成' ? '#dcfce7' : '#fef3c7', color: item.status === '已完成' ? '#166534' : '#d97706' }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <User size={14} style={{ color: '#666' }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{item.patientName}</span>
                </div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>科室: {item.department}</div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>归档: {item.archiveDate}</div>
                <div style={{ fontSize: 13, color: '#666' }}>保管: {item.years}年</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button style={{ flex: 1, padding: '6px 12px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>查看</button>
                  <button style={{ flex: 1, padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>借阅</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { AlertCircle, CheckCircle, Clock, Settings, Activity } from 'lucide-react'

const equipmentData = [
  { id: 'EQ001', name: '徕卡脱水机', model: 'Leica ASP300S', location: '制片室1', status: '运行中', utilization: 92, lastMaintenance: '2024-03-15', nextMaintenance: '2024-06-15' },
  { id: 'EQ002', name: '徕卡切片机', model: 'Leica RM2245', location: '制片室2', status: '运行中', utilization: 88, lastMaintenance: '2024-02-20', nextMaintenance: '2024-05-20' },
  { id: 'EQ003', name: '樱花染色机', model: 'Sakura Prisma', location: '染色室', status: '维护中', utilization: 0, lastMaintenance: '2024-04-01', nextMaintenance: '2024-04-10' },
  { id: 'EQ004', name: '免疫组化仪', model: 'Dako Omnis', location: '免疫组化室', status: '运行中', utilization: 76, lastMaintenance: '2024-03-01', nextMaintenance: '2024-06-01' },
  { id: 'EQ005', name: '分子检测仪', model: 'Roche Cobas z480', location: '分子室', status: '运行中', utilization: 65, lastMaintenance: '2024-02-15', nextMaintenance: '2024-05-15' },
  { id: 'EQ006', name: '显微镜', model: 'Olympus BX53', location: '诊断室1', status: '运行中', utilization: 95, lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10' },
]

const maintenanceRecords = [
  { date: '2024-04-01', equipment: '樱花染色机', type: '故障维修', technician: '张工', cost: 3500, result: '已修复' },
  { date: '2024-03-15', equipment: '徕卡脱水机', type: '例行保养', technician: '李工', cost: 800, result: '正常' },
  { date: '2024-02-20', equipment: '徕卡切片机', type: '例行保养', technician: '张工', cost: 600, result: '正常' },
]

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'maintenance' | 'consumables'>('monitor')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '运行中': return <CheckCircle size={16} style={{ color: '#16a34a' }} />
      case '维护中': return <AlertCircle size={16} style={{ color: '#d97706' }} />
      case '故障': return <AlertCircle size={16} style={{ color: '#dc2626' }} />
      default: return <Clock size={16} style={{ color: '#666' }} />
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>设备管理</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
          <Settings size={16} /> 设备登记
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>正常运行</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>4</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertCircle size={18} style={{ color: '#d97706' }} />
            <span style={{ color: '#666', fontSize: 13 }}>维护中</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>1</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={18} style={{ color: '#dc2626' }} />
            <span style={{ color: '#666', fontSize: 13 }}>故障停机</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>0</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Clock size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>本周待保养</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>2</div>
        </div>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 4, borderRadius: 8, width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('monitor')}
          style={{ padding: '8px 20px', background: activeTab === 'monitor' ? '#F97316' : 'transparent', color: activeTab === 'monitor' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          设备监控
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          style={{ padding: '8px 20px', background: activeTab === 'maintenance' ? '#F97316' : 'transparent', color: activeTab === 'maintenance' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          保养记录
        </button>
        <button
          onClick={() => setActiveTab('consumables')}
          style={{ padding: '8px 20px', background: activeTab === 'consumables' ? '#F97316' : 'transparent', color: activeTab === 'consumables' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          耗材管理
        </button>
      </div>

      {/* 设备监控 */}
      {activeTab === 'monitor' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>设备编号</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>设备名称</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>型号</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>位置</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>利用率</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>最近保养</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>下次保养</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontFamily: 'monospace', color: '#F97316' }}>{item.id}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{item.name}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, color: '#666' }}>{item.model}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{item.location}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${item.utilization}%`, height: '100%', background: item.utilization > 80 ? '#16a34a' : item.utilization > 50 ? '#d97706' : '#dc2626', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#666' }}>{item.utilization}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{item.lastMaintenance}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, color: '#d97706' }}>{item.nextMaintenance}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 保养记录 */}
      {activeTab === 'maintenance' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>日期</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>设备名称</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>保养类型</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>技术员</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>费用</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>结果</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((record, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{record.date}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{record.equipment}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{record.type}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{record.technician}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>¥{record.cost.toLocaleString()}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: '#dcfce7', color: '#166534' }}>{record.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 耗材管理 */}
      {activeTab === 'consumables' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { name: '病理切片', stock: 500, min: 200, unit: '片' },
              { name: '盖玻片', stock: 1000, min: 500, unit: '盒' },
              { name: '染色液套装', stock: 20, min: 10, unit: '套' },
              { name: '免疫组化试剂', stock: 15, min: 10, unit: '盒' },
              { name: '脱水液', stock: 8, min: 5, unit: '桶' },
              { name: '包埋石蜡', stock: 25, min: 10, unit: '块' },
            ].map((item, index) => (
              <div key={index} style={{ background: '#f8fafc', borderRadius: 8, padding: 16, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{item.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#666' }}>库存: <span style={{ fontWeight: 600, color: item.stock < item.min ? '#dc2626' : '#16a34a' }}>{item.stock}{item.unit}</span></span>
                  <span style={{ fontSize: 12, color: '#666' }}>最低: {item.min}{item.unit}</span>
                </div>
                <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(item.stock / (item.min * 3)) * 100}%`, height: '100%', background: item.stock < item.min ? '#dc2626' : '#16a34a', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { AlertTriangle, Bell, Phone, MessageSquare, CheckCircle, FileText, PlayCircle } from 'lucide-react'

const emergencyPlans = [
  { id: 1, name: '设备故障应急预案', level: '二级', triggerCondition: '主要设备故障导致工作中断', lastTest: '2024-02-15', status: '已启用' },
  { id: 2, name: '系统故障应急预案', level: '一级', triggerCondition: '信息系统完全宕机', lastTest: '2024-01-20', status: '已启用' },
  { id: 3, name: '自然灾害应急预案', level: '一级', triggerCondition: '地震、洪水等自然灾害', lastTest: '2023-12-10', status: '已启用' },
  { id: 4, name: '生物安全应急预案', level: '二级', triggerCondition: '实验室感染或泄漏', lastTest: '2024-03-01', status: '已启用' },
  { id: 5, name: '消防应急预案', level: '一级', triggerCondition: '火灾预警', lastTest: '2024-02-28', status: '已启用' },
]

const emergencyRecords = [
  { id: 'EM2024001', time: '2024-03-22 09:15', type: '设备故障', title: '樱花染色机突发故障', reporter: '王强', status: '已处理', duration: '2小时30分' },
  { id: 'EM2024002', time: '2024-03-18 14:20', type: '系统故障', title: '报告系统响应缓慢', reporter: '李娜', status: '已处理', duration: '45分' },
  { id: 'EM2024003', time: '2024-03-10 16:45', type: '其他', title: '停电导致设备停机', reporter: '张伟', status: '已处理', duration: '1小时15分' },
]

const notifications = [
  { id: 1, title: '设备保养提醒', content: '徕卡切片机计划保养将在 3 天后到期', time: '2024-03-22 10:00', read: false, type: 'warning' },
  { id: 2, title: '系统更新通知', content: '病理系统将于本周六 22:00 进行版本更新', time: '2024-03-21 15:00', read: true, type: 'info' },
  { id: 3, title: '冰冻病例预警', content: '今日冰冻病例已达 8 例，请注意安排', time: '2024-03-22 08:30', read: false, type: 'urgent' },
]

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'records' | 'notifications'>('plans')

  const getLevelColor = (level: string) => {
    switch (level) {
      case '一级': return '#dc2626'
      case '二级': return '#d97706'
      case '三级': return '#16a34a'
      default: return '#666'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>应急管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <AlertTriangle size={16} /> 发起应急
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <FileText size={16} /> 新建预案
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <FileText size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>应急预案</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>8</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>一级预案 3 个</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={18} style={{ color: '#dc2626' }} />
            <span style={{ color: '#666', fontSize: 13 }}>本月应急</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>3</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>已处理 3 起</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Bell size={18} style={{ color: '#d97706' }} />
            <span style={{ color: '#666', fontSize: 13 }}>待处理预警</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>5</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>紧急 2 个</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>演练完成率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>92%</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>本季度已完成</div>
        </div>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 4, borderRadius: 8, width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('plans')}
          style={{ padding: '8px 20px', background: activeTab === 'plans' ? '#F97316' : 'transparent', color: activeTab === 'plans' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          应急预案
        </button>
        <button
          onClick={() => setActiveTab('records')}
          style={{ padding: '8px 20px', background: activeTab === 'records' ? '#F97316' : 'transparent', color: activeTab === 'records' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          应急记录
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          style={{ padding: '8px 20px', background: activeTab === 'notifications' ? '#F97316' : 'transparent', color: activeTab === 'notifications' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          预警通知
          {notifications.filter(n => !n.read).length > 0 && (
            <span style={{ marginLeft: 6, padding: '2px 6px', background: '#dc2626', color: '#fff', borderRadius: 10, fontSize: 11 }}>
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
      </div>

      {/* 应急预案 */}
      {activeTab === 'plans' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>预案名称</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>等级</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>触发条件</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>上次演练</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {emergencyPlans.map(plan => (
                <tr key={plan.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{plan.name}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: 12, 
                      fontSize: 12, 
                      fontWeight: 600,
                      background: `${getLevelColor(plan.level)}15`, 
                      color: getLevelColor(plan.level) 
                    }}>
                      {plan.level}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 12, color: '#666', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{plan.triggerCondition}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{plan.lastTest}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: '#dcfce7', color: '#166534' }}>{plan.status}</span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 4 }}>
                      <PlayCircle size={12} /> 演练
                    </button>
                    <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 应急记录 */}
      {activeTab === 'records' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>记录编号</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>时间</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>类型</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>事件标题</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>报告人</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>持续时间</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {emergencyRecords.map(record => (
                <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 12, fontFamily: 'monospace', color: '#F97316' }}>{record.id}</td>
                  <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{record.time}</td>
                  <td style={{ padding: '12px 8px', fontSize: 12 }}>
                    <span style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: 4, fontSize: 11 }}>{record.type}</span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{record.title}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{record.reporter}</td>
                  <td style={{ padding: '12px 8px', fontSize: 12, color: '#666' }}>{record.duration}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: '#dcfce7', color: '#166534' }}>
                      <CheckCircle size={10} style={{ marginRight: 4 }} />
                      {record.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 预警通知 */}
      {activeTab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 16, 
                background: notification.read ? '#fff' : '#fff9f0', 
                borderRadius: 12, 
                padding: 16, 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: notification.read ? '1px solid #e2e8f0' : '1px solid #F97316',
              }}
            >
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: notification.type === 'urgent' ? '#dc2626' : notification.type === 'warning' ? '#d97706' : '#0891b2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0
              }}>
                {notification.type === 'urgent' ? <AlertTriangle size={18} /> : notification.type === 'warning' ? <Bell size={18} /> : <MessageSquare size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{notification.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {!notification.read && (
                      <span style={{ padding: '2px 8px', background: '#dc2626', color: '#fff', borderRadius: 10, fontSize: 10 }}>未读</span>
                    )}
                    <span style={{ fontSize: 12, color: '#666' }}>{notification.time}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#666' }}>{notification.content}</div>
              </div>
              <button style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' }}>
                {notification.read ? '查看' : '标记已读'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 紧急联系人 */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1e293b' }}>紧急联系人</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { name: '设备维修', phone: '138-0000-1001', available: '24小时' },
            { name: '系统运维', phone: '138-0000-1002', available: '24小时' },
            { name: '安全保卫', phone: '138-0000-1003', available: '24小时' },
            { name: '科室主任', phone: '138-0000-1004', available: '工作日' },
          ].map((contact, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 40, height: 40, background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Phone size={16} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{contact.name}</div>
                <div style={{ fontSize: 12, color: '#F97316', fontWeight: 600 }}>{contact.phone}</div>
                <div style={{ fontSize: 11, color: '#666' }}>{contact.available}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Search, Plus, AlertCircle, TrendingDown } from 'lucide-react'

const mockConsumables = [
  { id: 'CM202605001', name: '病理切片盒（100片装）', category: '切片耗材', spec: '100片/盒', unit: '盒', stock: 45, minStock: 20, price: 128, supplier: '华西病理器材', lastOrder: '2026-04-15', status: 'normal' },
  { id: 'CM202605002', name: '盖玻片（24×50mm）', category: '玻片耗材', spec: '50片/盒', unit: '盒', stock: 8, minStock: 15, price: 36, supplier: '上海汇中器械', lastOrder: '2026-04-20', status: 'low' },
  { id: 'CM202605003', name: '福尔马林溶液（10L装）', category: '固定液', spec: '10L/桶', unit: '桶', stock: 22, minStock: 10, price: 85, supplier: '北京病理试剂', lastOrder: '2026-04-10', status: 'normal' },
  { id: 'CM202605004', name: '免疫组化笔（PAP笔）', category: 'IHC耗材', spec: '支', unit: '支', stock: 3, minStock: 10, price: 56, supplier: '广州病理科技', lastOrder: '2026-03-25', status: 'critical' },
  { id: 'CM202605005', name: '二甲苯（分析纯）', category: '脱蜡液', spec: '2.5L/瓶', unit: '瓶', stock: 18, minStock: 12, price: 45, supplier: '天津化工试剂', lastOrder: '2026-04-05', status: 'normal' },
  { id: 'CM202605006', name: 'EDTA抗原修复液', category: 'IHC耗材', spec: '100mL/瓶', unit: '瓶', stock: 6, minStock: 8, price: 120, supplier: '深圳病理试剂', lastOrder: '2026-04-18', status: 'low' },
  { id: 'CM202605007', name: '苏木精染液', category: '染色液', spec: '500mL/瓶', unit: '瓶', stock: 9, minStock: 5, price: 78, supplier: '华西病理器材', lastOrder: '2026-04-12', status: 'normal' },
  { id: 'CM202605008', name: '伊红染液（醇溶性）', category: '染色液', spec: '500mL/瓶', unit: '瓶', stock: 2, minStock: 5, price: 68, supplier: '华西病理器材', lastOrder: '2026-04-12', status: 'critical' },
]

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  normal: { color: '#16a34a', bg: '#dcfce7', label: '库存正常' },
  low: { color: '#d97706', bg: '#fef3c7', label: '库存偏低' },
  critical: { color: '#dc2626', bg: '#fee2e2', label: '需立即补货' },
}

const categories = ['全部', '切片耗材', '玻片耗材', '固定液', 'IHC耗材', '脱蜡液', '染色液']

export default function ConsumablesPage() {
  const [category, setCategory] = useState('全部')
  const [search, setSearch] = useState('')

  const filtered = mockConsumables.filter(c => {
    const matchCat = category === '全部' || c.category === category
    const matchSearch = c.name.includes(search) || c.id.includes(search)
    return matchCat && matchSearch
  })

  const criticalCount = mockConsumables.filter(c => c.status === 'critical').length
  const lowCount = mockConsumables.filter(c => c.status === 'low').length

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>耗材管理</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>病理实验室耗材库存与采购管理</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
          <Plus size={16} /> 新增入库
        </button>
      </div>

      {/* 警告栏 */}
      {(criticalCount > 0 || lowCount > 0) && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {criticalCount > 0 && (
            <div style={{ flex: 1, padding: 12, background: '#fee2e2', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={18} color="#dc2626" />
              <span style={{ color: '#dc2626', fontSize: 13, fontWeight: 500 }}>紧急：{criticalCount}种耗材库存告急，请立即补货</span>
            </div>
          )}
          {lowCount > 0 && (
            <div style={{ flex: 1, padding: 12, background: '#fef3c7', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingDown size={18} color="#d97706" />
              <span style={{ color: '#d97706', fontSize: 13, fontWeight: 500 }}>提醒：{lowCount}种耗材库存偏低，建议采购</span>
            </div>
          )}
        </div>
      )}

      {/* 分类标签 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '4px 12px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 13, background: category === cat ? '#F97316' : '#f1f5f9', color: category === cat ? '#fff' : '#64748b' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* 搜索 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', borderRadius: 6, padding: '6px 12px', maxWidth: 360 }}>
          <Search size={16} color="#64748b" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索耗材名称/编号" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 14 }} />
        </div>
      </div>

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {['编号', '耗材名称', '分类', '规格', '单位', '库存', '最低库存', '单价(元)', '供应商', '最近采购', '状态', '操作'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const s = statusConfig[item.status]
              const isLow = item.stock < item.minStock
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: item.status === 'critical' ? '#fff5f5' : 'transparent' }}>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 500, color: '#1e3a5f' }}>{item.name}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.spec}</td>
                  <td style={{ padding: '10px 12px' }}>{item.unit}</td>
                  <td style={{ padding: '10px 12px', color: isLow ? '#dc2626' : '#1e3a5f', fontWeight: isLow ? 600 : 400 }}>{item.stock}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.minStock}</td>
                  <td style={{ padding: '10px 12px' }}>¥{item.price}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.supplier}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.lastOrder}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 12, marginRight: 4 }}>入库</button>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 12 }}>采购</button>
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

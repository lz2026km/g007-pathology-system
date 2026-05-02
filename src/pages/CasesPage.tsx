import { useState } from 'react'
import { initialInventory, TeachingCase } from '../data/initialData'

// 病例详情弹窗
function CaseDetailModal({ caseItem, onClose, onDownload }: { caseItem: TeachingCase; onClose: () => void; onDownload: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, width: 640,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>病例详情</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1
          }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            ['病例编号', caseItem.caseId],
            ['诊断', caseItem.diagnosis],
            ['器官', caseItem.organ],
            ['难度', caseItem.difficulty],
            ['患者', `${caseItem.patientName}，${caseItem.gender}，${caseItem.age}岁`],
            ['切片数', `${caseItem.slides}张`],
            ['诊断码', caseItem.diagnosisCode],
            ['分类', caseItem.diseaseCategory],
          ].map(([label, value]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#1e293b', fontSize: 14, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>关键要点</div>
          {caseItem.keyPoints.map((p, i) => <div key={i} style={{ color: '#1e293b', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>讨论</div>
          <div style={{ color: '#1e293b', fontSize: 13, lineHeight: 1.6 }}>{caseItem.discussion}</div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>标签</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {caseItem.tags.map(tag => (
              <span key={tag} style={{ padding: '2px 10px', background: '#f1f5f9', borderRadius: 12, fontSize: 12, color: '#64748b' }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>关闭</button>
          <button onClick={onDownload} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>下载病例</button>
        </div>
      </div>
    </div>
  )
}

// 新增病例弹窗
function AddCaseModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: TeachingCase) => void }) {
  const [form, setForm] = useState({
    caseId: `TC${Date.now().toString().slice(-8)}`,
    patientName: '', gender: '男' as const, age: 0, diagnosis: '',
    diagnosisCode: '', organ: '肺', diseaseCategory: '肿瘤',
    difficulty: '基础' as const, slides: 1, keyPoints: [''],
    discussion: '', author: '系统管理员', tags: ['']
  })
  const handleSubmit = () => {
    if (!form.patientName || !form.diagnosis) return
    onAdd({
      ...form, id: `TC${Date.now().toString().slice(-6)}`,
      images: [], createdAt: new Date().toLocaleString('zh-CN'), views: 0, downloads: 0
    } as TeachingCase)
    onClose()
  }
  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</label>
      {type === 'select' ? (
        <select value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
          {key === 'gender' && <><option value="男">男</option><option value="女">女</option></>}
          {key === 'organ' && <><option value="肺">肺</option><option value="乳腺">乳腺</option><option value="胃">胃</option><option value="肾脏">肾脏</option><option value="脑">脑</option><option value="淋巴结">淋巴结</option><option value="肝脏">肝脏</option><option value="结肠">结肠</option></>}
          {key === 'difficulty' && <><option value="基础">基础</option><option value="进阶">进阶</option><option value="疑难">疑难</option><option value="罕见">罕见</option></>}
          {key === 'diseaseCategory' && <><option value="肿瘤">肿瘤</option><option value="炎症">炎症</option><option value="感染">感染</option><option value="先天畸形">先天畸形</option><option value="其他">其他</option></>}
        </select>
      ) : (
        <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }} />
      )}
    </div>
  )
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, width: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>新增病例</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {field('病例编号 *', 'caseId')}
          {field('患者姓名 *', 'patientName', 'text', '请输入姓名')}
          {field('性别', 'gender', 'select')}
          {field('年龄 *', 'age', 'number', '请输入年龄')}
          {field('诊断 *', 'diagnosis', 'text', '请输入诊断')}
          {field('诊断码', 'diagnosisCode', 'text', 'ICD-10')}
          {field('器官', 'organ', 'select')}
          {field('疾病分类', 'diseaseCategory', 'select')}
          {field('难度', 'difficulty', 'select')}
          {field('切片数', 'slides', 'number')}
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 24px', border: '1px solid #ddd', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>取消</button>
          <button onClick={handleSubmit} style={{ padding: '8px 24px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>确认添加</button>
        </div>
      </div>
    </div>
  )
}

export default function CasesPage() {
  const [searchText, setSearchText] = useState('')
  const [organFilter, setOrganFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [detailCase, setDetailCase] = useState<TeachingCase | null>(null)
  const [cases, setCases] = useState<TeachingCase[]>(initialInventory)

  const filtered = cases.filter(c => {
    const matchText = !searchText ||
      c.diagnosis.toLowerCase().includes(searchText.toLowerCase()) ||
      c.caseId.toLowerCase().includes(searchText.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchText.toLowerCase())
    const matchOrgan = !organFilter || c.organ === organFilter
    const matchDifficulty = !difficultyFilter || c.difficulty === difficultyFilter
    return matchText && matchOrgan && matchDifficulty
  })

  const handleAdd = (c: TeachingCase) => {
    setCases(prev => [c, ...prev])
  }

  const handleView = (c: TeachingCase) => {
    setCases(prev => prev.map(x => x.id === c.id ? { ...x, views: x.views + 1 } : x))
    setDetailCase(c)
  }

  const handleDownload = (c: TeachingCase) => {
    setCases(prev => prev.map(x => x.id === c.id ? { ...x, downloads: x.downloads + 1 } : x))
    alert(`正在下载病例: ${c.caseId}\n${c.diagnosis}`)
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>典型病例库</h2>

      {/* 筛选 */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input type="text" placeholder="搜索病例/诊断..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, width: 220 }} />
          <select value={organFilter} onChange={e => setOrganFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部器官</option>
            <option value="肺">肺</option>
            <option value="乳腺">乳腺</option>
            <option value="胃">胃</option>
            <option value="肾脏">肾脏</option>
            <option value="脑">脑</option>
            <option value="淋巴结">淋巴结</option>
          </select>
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}>
            <option value="">全部难度</option>
            <option value="基础">基础</option>
            <option value="进阶">进阶</option>
            <option value="疑难">疑难</option>
            <option value="罕见">罕见</option>
          </select>
          <button onClick={() => { setSearchText(''); setOrganFilter(''); setDifficultyFilter('') }} style={{ padding: '8px 20px', background: '#fff', color: '#64748b', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer' }}>重置</button>
          <button onClick={() => setShowAdd(true)} style={{ padding: '8px 20px', background: '#fff', color: '#1e40af', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer' }}>新增病例</button>
        </div>
        {(searchText || organFilter || difficultyFilter) && (
          <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
            筛选结果：共 {filtered.length} 条 / 总计 {cases.length} 条
          </div>
        )}
      </div>

      {/* 病例卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: '#999' }}>暂无匹配的病例</div>
        ) : filtered.map(c => (
          <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: `3px solid ${c.difficulty === '疑难' ? '#dc2626' : c.difficulty === '罕见' ? '#7c3aed' : '#1e40af'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'monospace', color: '#1e40af', fontSize: 13 }}>{c.caseId}</span>
              <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 500,
                background: c.difficulty === '疑难' ? '#fee2e2' : c.difficulty === '罕见' ? '#f3e8ff' : '#dbeafe',
                color: c.difficulty === '疑难' ? '#dc2626' : c.difficulty === '罕见' ? '#7c3aed' : '#1e40af'
              }}>{c.difficulty}</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#1e293b' }}>{c.diagnosis}</h3>
            <div style={{ display: 'flex', gap: 16, color: '#64748b', fontSize: 13, marginBottom: 12 }}>
              <span>{c.organ}</span>
              <span>|</span>
              <span>{c.patientName}，{c.gender}，{c.age}岁</span>
              <span>|</span>
              <span>切片 {c.slides}张</span>
            </div>
            <div style={{ fontSize: 13, color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>
              {c.keyPoints.slice(0, 2).map((p, i) => <div key={i}>• {p}</div>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>
                <span style={{ marginRight: 16 }}>👁 {c.views}</span>
                <span>⬇ {c.downloads}</span>
              </div>
              <div>
                <button onClick={() => handleView(c)} style={{ padding: '4px 12px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 8 }}>查看</button>
                <button onClick={() => handleDownload(c)} style={{ padding: '4px 12px', background: '#fff', color: '#1e40af', border: '1px solid #1e40af', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>下载</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddCaseModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {detailCase && <CaseDetailModal caseItem={detailCase} onClose={() => setDetailCase(null)} onDownload={() => handleDownload(detailCase)} />}
    </div>
  )
}

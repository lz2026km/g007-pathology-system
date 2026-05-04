import { useState } from 'react'
import { Microscope, Search, ZoomIn, Download, Share2, Star } from 'lucide-react'

const mockSlides = [
  { id: 'DS202605001', caseId: 'C2026-00512', patient: '张伟民', organ: '胃窦', disease: '低分化腺癌', stain: 'HE', magnification: '20×', scanDate: '2026-05-03', pathologist: '刘病理', tags: ['胃癌', '教学片'], featured: true },
  { id: 'DS202605002', caseId: 'C2026-00508', patient: '李秀英', organ: '乳腺', disease: '浸润性导管癌Ⅱ级', stain: 'HE+IHC(ER)', magnification: '40×', scanDate: '2026-05-02', pathologist: '王病理', tags: ['乳腺癌', '会诊片'], featured: false },
  { id: 'DS202605003', caseId: 'C2026-00489', patient: '赵强力', organ: '肺', disease: '腺癌', stain: 'HE', magnification: '20×', scanDate: '2026-04-28', pathologist: '刘病理', tags: ['肺癌', '科研片'], featured: true },
  { id: 'DS202605004', caseId: 'C2026-00476', patient: '孙晓丽', organ: '宫颈', disease: 'CINⅡ级', stain: 'HE', magnification: '10×', scanDate: '2026-04-25', pathologist: '张病理', tags: ['宫颈上皮内瘤变'], featured: false },
  { id: 'DS202605005', caseId: 'C2026-00465', patient: '周国平', organ: '结肠', disease: '管状腺瘤', stain: 'HE', magnification: '10×', scanDate: '2026-04-20', pathologist: '王病理', tags: ['结直肠腺瘤', '典型病例'], featured: false },
  { id: 'DS202605006', caseId: 'C2026-00452', patient: '吴美丽', organ: '甲状腺', disease: '乳头状癌', stain: 'HE+IHC(TTF-1)', magnification: '40×', scanDate: '2026-04-18', pathologist: '刘病理', tags: ['甲状腺癌', '教学片'], featured: true },
]

const stainTypes = ['全部', 'HE', 'IHC', 'HE+IHC', 'PAS', 'Masson']

export default function DigitalSlidePage() {
  const [search, setSearch] = useState('')
  const [stain, setStain] = useState('全部')
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null)

  const filtered = mockSlides.filter(s => {
    const matchSearch = s.patient.includes(search) || s.disease.includes(search) || s.caseId.includes(search)
    const matchStain = stain === '全部' || s.stain.includes(stain)
    return matchSearch && matchStain
  })

  const selected = mockSlides.find(s => s.id === selectedSlide)

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>数字切片库</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>全切片数字化扫描与在线阅览，支持40×超高倍放大</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 14 }}>
            <Share2 size={16} /> 共享
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Microscope size={16} /> 上传扫描
          </button>
        </div>
      </div>

      {/* 搜索 + 过滤 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', borderRadius: 6, padding: '6px 12px', flex: 1, minWidth: 240 }}>
          <Search size={16} color="#64748b" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索患者/病种/切片号" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 14 }} />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {stainTypes.map(s => (
            <button key={s} onClick={() => setStain(s)} style={{ padding: '4px 10px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 12, background: stain === s ? '#F97316' : '#f1f5f9', color: stain === s ? '#fff' : '#64748b' }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* 切片网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(slide => (
            <div key={slide.id} onClick={() => setSelectedSlide(slide.id)} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', border: selectedSlide === slide.id ? '2px solid #F97316' : '2px solid transparent', transition: 'all 0.2s' }}>
              {/* 模拟切片图像区域 */}
              <div style={{ height: 140, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Microscope size={40} color="#94a3b8" />
                {slide.featured && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#F97316', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Star size={10} /> 精选
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ZoomIn size={10} /> {slide.magnification}
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#2563eb', fontWeight: 500 }}>{slide.id}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{slide.stain}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1e3a5f', marginBottom: 4 }}>{slide.patient} · {slide.organ}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{slide.disease}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {slide.tags.map(tag => (
                    <span key={tag} style={{ padding: '1px 6px', background: '#f1f5f9', borderRadius: 4, fontSize: 10, color: '#64748b' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 详情面板 */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 20, height: 'fit-content' }}>
          {selected ? (
            <>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e3a5f', marginBottom: 16 }}>切片详情</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['切片编号', selected.id],
                  ['病例号', selected.caseId],
                  ['患者姓名', selected.patient],
                  ['取材部位', selected.organ],
                  ['病理诊断', selected.disease],
                  ['染色方式', selected.stain],
                  ['放大倍率', selected.magnification],
                  ['扫描日期', selected.scanDate],
                  ['阅片医生', selected.pathologist],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 13, color: '#64748b', minWidth: 70 }}>{label}</span>
                    <span style={{ fontSize: 13, color: '#1e3a5f', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {selected.tags.map(tag => (
                    <span key={tag} style={{ padding: '2px 8px', background: '#fff7ed', borderRadius: 4, fontSize: 12, color: '#F97316' }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                  <ZoomIn size={14} /> 打开阅片机
                </button>
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13 }}>
                  <Download size={14} /> 下载原始文件
                </button>
                <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13 }}>
                  <Share2 size={14} /> 分享给同事
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <Microscope size={40} style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 13 }}>点击左侧切片查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

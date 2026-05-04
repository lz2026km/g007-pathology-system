import { useState } from 'react'
import { Plus, Camera, Search, ChevronDown, ChevronUp, ArrowUpRight, Type, Ruler, Edit3, Trash2, Download, Image as ImageIcon } from 'lucide-react'

const ORANGE = '#F97316'
const ORANGE_LIGHT = '#fff7ed'

// 摄影记录
interface PhotoRecord {
  id: string
  caseId: string
  patientName: string
  specimenPart: string
  photoTime: string
  photoCount: number
  doctor: string
  photos: {
    id: string
    url: string
    description: string
  }[]
}

const mockPhotoRecords: PhotoRecord[] = [
  {
    id: 'SP20260504001',
    caseId: 'CASE2026001',
    patientName: '张伟',
    specimenPart: '胃部',
    photoTime: '2026-05-04 09:30',
    photoCount: 6,
    doctor: '王建国',
    photos: [
      { id: 'p1', url: '/specimen/gastric_1.jpg', description: '胃大部切除标本' },
      { id: 'p2', url: '/specimen/gastric_2.jpg', description: '肿瘤外观' },
      { id: 'p3', url: '/specimen/gastric_3.jpg', description: '切缘' },
      { id: 'p4', url: '/specimen/gastric_4.jpg', description: '黏膜面' },
      { id: 'p5', url: '/specimen/gastric_5.jpg', description: '浆膜面' },
      { id: 'p6', url: '/specimen/gastric_6.jpg', description: '淋巴结' }
    ]
  },
  {
    id: 'SP20260504002',
    caseId: 'CASE2026002',
    patientName: '李娜',
    specimenPart: '乳腺',
    photoTime: '2026-05-04 10:45',
    photoCount: 4,
    doctor: '刘晓燕',
    photos: [
      { id: 'p1', url: '/specimen/breast_1.jpg', description: '乳腺改良根治标本' },
      { id: 'p2', url: '/specimen/breast_2.jpg', description: '肿瘤区域' },
      { id: 'p3', url: '/specimen/breast_3.jpg', description: '乳头乳晕' },
      { id: 'p4', url: '/specimen/breast_4.jpg', description: '腋窝淋巴结' }
    ]
  },
  {
    id: 'SP20260504003',
    caseId: 'CASE2026003',
    patientName: '王强',
    specimenPart: '肺',
    photoTime: '2026-05-04 11:20',
    photoCount: 5,
    doctor: '陈德明',
    photos: [
      { id: 'p1', url: '/specimen/lung_1.jpg', description: '肺叶切除标本' },
      { id: 'p2', url: '/specimen/lung_2.jpg', description: '肿瘤位置' },
      { id: 'p3', url: '/specimen/lung_3.jpg', description: '支气管切缘' },
      { id: 'p4', url: '/specimen/lung_4.jpg', description: '胸膜' },
      { id: 'p5', url: '/specimen/lung_5.jpg', description: '肺门淋巴结' }
    ]
  },
  {
    id: 'SP20260504004',
    caseId: 'CASE2026004',
    patientName: '赵敏',
    specimenPart: '结肠',
    photoTime: '2026-05-04 13:15',
    photoCount: 4,
    doctor: '王建国',
    photos: [
      { id: 'p1', url: '/specimen/colon_1.jpg', description: '结肠切除标本' },
      { id: 'p2', url: '/specimen/colon_2.jpg', description: '肿瘤外观' },
      { id: 'p3', url: '/specimen/colon_3.jpg', description: '肠系膜' },
      { id: 'p4', url: '/specimen/colon_4.jpg', description: '切缘' }
    ]
  },
  {
    id: 'SP20260504005',
    caseId: 'CASE2026005',
    patientName: '陈静',
    specimenPart: '甲状腺',
    photoTime: '2026-05-04 14:00',
    photoCount: 3,
    doctor: '李秀英',
    photos: [
      { id: 'p1', url: '/specimen/thyroid_1.jpg', description: '甲状腺全切标本' },
      { id: 'p2', url: '/specimen/thyroid_2.jpg', description: '结节位置' },
      { id: 'p3', url: '/specimen/thyroid_3.jpg', description: '喉返神经' }
    ]
  },
  {
    id: 'SP20260504006',
    caseId: 'CASE2026006',
    patientName: '刘洋',
    specimenPart: '肝脏',
    photoTime: '2026-05-04 14:30',
    photoCount: 4,
    doctor: '张伟东',
    photos: [
      { id: 'p1', url: '/specimen/liver_1.jpg', description: '肝叶切除标本' },
      { id: 'p2', url: '/specimen/liver_2.jpg', description: '肿瘤区域' },
      { id: 'p3', url: '/specimen/liver_3.jpg', description: '切缘' },
      { id: 'p4', url: '/specimen/liver_4.jpg', description: ' Glisson系统' }
    ]
  },
  {
    id: 'SP20260504007',
    caseId: 'CASE2026007',
    patientName: '孙丽',
    specimenPart: '卵巢',
    photoTime: '2026-05-04 15:10',
    photoCount: 3,
    doctor: '王芳',
    photos: [
      { id: 'p1', url: '/specimen/ovary_1.jpg', description: '卵巢肿瘤标本' },
      { id: 'p2', url: '/specimen/ovary_2.jpg', description: '肿瘤外观' },
      { id: 'p3', url: '/specimen/ovary_3.jpg', description: '输卵管' }
    ]
  },
  {
    id: 'SP20260504008',
    caseId: 'CASE2026008',
    patientName: '周磊',
    specimenPart: '皮肤',
    photoTime: '2026-05-04 15:45',
    photoCount: 2,
    doctor: '刘晓燕',
    photos: [
      { id: 'p1', url: '/specimen/skin_1.jpg', description: '皮肤切除标本' },
      { id: 'p2', url: '/specimen/skin_2.jpg', description: '病变区域' }
    ]
  }
]

// 标注工具类型
type AnnotationTool = 'arrow' | 'text' | 'measure' | null

export default function SpecimenPhotoPage() {
  const [records] = useState<PhotoRecord[]>(mockPhotoRecords)
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeAnnotationTool, setActiveAnnotationTool] = useState<AnnotationTool>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const filteredRecords = records.filter(r =>
    r.patientName.includes(searchKeyword) ||
    r.caseId.includes(searchKeyword) ||
    r.specimenPart.includes(searchKeyword) ||
    r.doctor.includes(searchKeyword)
  )

  const handleToggleExpand = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId)
  }

  const handleNewRecord = () => {
    alert('新增摄影记录（模拟）')
  }

  const getPartColor = (part: string) => {
    const colorMap: Record<string, string> = {
      '胃部': '#f97316',
      '乳腺': '#ec4899',
      '肺': '#3b82f6',
      '结肠': '#22c55e',
      '甲状腺': '#8b5cf6',
      '肝脏': '#eab308',
      '卵巢': '#f43f5e',
      '皮肤': '#a78bfa'
    }
    return colorMap[part] || ORANGE
  }

  // 模拟标本图片
  const renderMockSpecimenImage = (record: PhotoRecord, _photoId: string) => {
    const colors: Record<string, string[]> = {
      '胃部': ['#8B4513', '#CD853F', '#DEB887', '#F5DEB3'],
      '乳腺': ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493'],
      '肺': ['#FFA07A', '#FF7F50', '#FF6347', '#FF4500'],
      '结肠': ['#228B22', '#32CD32', '#90EE90', '#98FB98'],
      '甲状腺': ['#9370DB', '#8A2BE2', '#9400D3', '#BA55D3'],
      '肝脏': ['#8B0000', '#A52A2A', '#CD5C5C', '#F08080'],
      '卵巢': ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50'],
      '皮肤': ['#D2B48C', '#DEB887', '#F5DEB3', '#FAEBD7']
    }
    const partColors = colors[record.specimenPart] || ['#888', '#666', '#444', '#333']
    
    return (
      <div style={{
        width: '100%', paddingTop: '75%', borderRadius: 8, position: 'relative',
        background: `linear-gradient(135deg, ${partColors[0]} 0%, ${partColors[1]} 50%, ${partColors[2]} 100%)`,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '40%', height: '40%', borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${partColors[2]} 0%, ${partColors[0]} 100%)`,
          opacity: 0.9
        }} />
        <div style={{
          position: 'absolute', bottom: 8, left: 8, right: 8,
          padding: '4px 8px', background: 'rgba(0,0,0,0.6)',
          borderRadius: 4, fontSize: 10, color: '#fff'
        }}>
          {record.specimenPart}标本
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 24, background: '#f8fafc', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: `${ORANGE}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Camera size={24} color={ORANGE} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b' }}>标本摄影采集</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>手术标本摄影存档与标注系统</p>
          </div>
        </div>
        <button
          onClick={handleNewRecord}
          style={{
            padding: '10px 20px', borderRadius: 10, border: 'none',
            background: ORANGE, color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Plus size={16} />
          新增摄影记录
        </button>
      </div>

      {/* 搜索栏 */}
      <div style={{
        background: '#fff', borderRadius: 16, padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 24
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="搜索病例号/患者/部位/医生..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{
                width: '100%', padding: '12px 12px 12px 42px', borderRadius: 10,
                border: '1px solid #e2e8f0', fontSize: 14, outline: 'none'
              }}
            />
          </div>
          <div style={{
            padding: '12px 20px', background: '#f8fafc', borderRadius: 10,
            fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <ImageIcon size={16} color="#94a3b8" />
            共 {filteredRecords.length} 条记录
          </div>
        </div>
      </div>

      {/* 摄影记录列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredRecords.map(record => {
          const isExpanded = expandedRecord === record.id
          const partColor = getPartColor(record.specimenPart)
          
          return (
            <div
              key={record.id}
              style={{
                background: '#fff', borderRadius: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden'
              }}
            >
              {/* 记录头部 */}
              <div
                style={{
                  padding: 20, cursor: 'pointer',
                  borderLeft: `4px solid ${partColor}`
                }}
                onClick={() => handleToggleExpand(record.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `${partColor}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Camera size={24} color={partColor} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>
                          {record.patientName}
                        </span>
                        <span style={{
                          padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                          background: `${partColor}15`, color: partColor
                        }}>
                          {record.specimenPart}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                        <span style={{ fontSize: 13, color: '#64748b' }}>{record.caseId}</span>
                        <span style={{ fontSize: 13, color: '#94a3b8' }}>|</span>
                        <span style={{ fontSize: 13, color: '#64748b' }}>{record.doctor}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: '#64748b' }}>摄影时间</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1e293b', marginTop: 2 }}>
                        {record.photoTime}
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 16px', borderRadius: 10,
                      background: '#f8fafc', display: 'flex', alignItems: 'center', gap: 6
                    }}>
                      <Camera size={14} color="#64748b" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>
                        {record.photoCount}
                      </span>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>张</span>
                    </div>
                    <button style={{
                      width: 36, height: 36, borderRadius: 10, border: '1px solid #e2e8f0',
                      background: '#fff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isExpanded ? (
                        <ChevronUp size={18} color="#64748b" />
                      ) : (
                        <ChevronDown size={18} color="#64748b" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 展开的标本图片网格 */}
              {isExpanded && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  {/* 标注工具栏 */}
                  <div style={{
                    display: 'flex', gap: 12, padding: '16px 0',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <span style={{ fontSize: 13, color: '#64748b', alignSelf: 'center' }}>标注工具:</span>
                    <button
                      onClick={() => setActiveAnnotationTool(activeAnnotationTool === 'arrow' ? null : 'arrow')}
                      style={{
                        padding: '8px 14px', borderRadius: 8, border: `1px solid ${activeAnnotationTool === 'arrow' ? ORANGE : '#e2e8f0'}`,
                        background: activeAnnotationTool === 'arrow' ? ORANGE_LIGHT : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: activeAnnotationTool === 'arrow' ? ORANGE : '#64748b'
                      }}
                    >
                      <ArrowUpRight size={14} />
                      箭头
                    </button>
                    <button
                      onClick={() => setActiveAnnotationTool(activeAnnotationTool === 'text' ? null : 'text')}
                      style={{
                        padding: '8px 14px', borderRadius: 8, border: `1px solid ${activeAnnotationTool === 'text' ? ORANGE : '#e2e8f0'}`,
                        background: activeAnnotationTool === 'text' ? ORANGE_LIGHT : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: activeAnnotationTool === 'text' ? ORANGE : '#64748b'
                      }}
                    >
                      <Type size={14} />
                      文字
                    </button>
                    <button
                      onClick={() => setActiveAnnotationTool(activeAnnotationTool === 'measure' ? null : 'measure')}
                      style={{
                        padding: '8px 14px', borderRadius: 8, border: `1px solid ${activeAnnotationTool === 'measure' ? ORANGE : '#e2e8f0'}`,
                        background: activeAnnotationTool === 'measure' ? ORANGE_LIGHT : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: activeAnnotationTool === 'measure' ? ORANGE : '#64748b'
                      }}
                    >
                      <Ruler size={14} />
                      测量
                    </button>
                    <div style={{ flex: 1 }} />
                    <button
                      style={{
                        padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: '#64748b'
                      }}
                    >
                      <Download size={14} />
                      下载全部
                    </button>
                  </div>

                  {/* 图片网格 */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16
                  }}>
                    {record.photos.map(photo => (
                      <div
                        key={photo.id}
                        style={{
                          borderRadius: 12, overflow: 'hidden',
                          border: `2px solid ${selectedPhoto === photo.id ? ORANGE : 'transparent'}`,
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                        onClick={() => setSelectedPhoto(photo.id)}
                      >
                        {renderMockSpecimenImage(record, photo.id)}
                        <div style={{ padding: 12, background: '#f8fafc' }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', marginBottom: 4 }}>
                            {photo.description}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              style={{
                                padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0',
                                background: '#fff', cursor: 'pointer', fontSize: 11, color: '#64748b',
                                display: 'flex', alignItems: 'center', gap: 4
                              }}
                            >
                              <Edit3 size={10} />
                              标注
                            </button>
                            <button
                              style={{
                                padding: '4px 10px', borderRadius: 6, border: '1px solid #fee2e2',
                                background: '#fff', cursor: 'pointer', fontSize: 11, color: '#dc2626',
                                display: 'flex', alignItems: 'center', gap: 4
                              }}
                            >
                              <Trash2 size={10} />
                              删除
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 操作按钮 */}
                  <div style={{
                    display: 'flex', gap: 12, marginTop: 16, justifyContent: 'flex-end'
                  }}>
                    <button
                      style={{
                        padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
                        background: '#fff', fontSize: 13, color: '#64748b',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                      }}
                    >
                      <Camera size={14} />
                      追加摄影
                    </button>
                    <button
                      style={{
                        padding: '10px 20px', borderRadius: 10, border: 'none',
                        background: ORANGE, fontSize: 13, fontWeight: 600, color: '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                      }}
                    >
                      <ImageIcon size={14} />
                      生成报告
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 统计信息 */}
      <div style={{
        marginTop: 24, padding: 20, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>本月摄影统计</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: ORANGE }}>156</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>总记录数</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#ec4899' }}>428</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>总照片数</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>12</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>胃部</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#ec4899' }}>18</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>乳腺</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>15</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>肺部</div>
          </div>
        </div>
      </div>
    </div>
  )
}

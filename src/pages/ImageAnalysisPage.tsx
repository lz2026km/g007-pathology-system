import { useState } from 'react'
import { Upload, Image as ImageIcon, Ruler, Activity, Calculator, Microscope, Download, FileText, Search, ZoomIn, ZoomOut, Move, Grid3X3 } from 'lucide-react'

const ORANGE = '#F97316'
const ORANGE_LIGHT = '#fff7ed'
const ORANGE_BORDER = '#fed7aa'

// 切片分析记录
interface SlideAnalysis {
  id: string
  caseId: string
  patientName: string
  slideType: string
  stainType: string
  analysisTime: string
  status: '待分析' | '分析中' | '已完成'
  results?: {
    area?: number
    positiveRate?: number
    mitosisCount?: number
    iodValue?: number
    aiDiagnosis: string
  }
}

const mockSlideAnalyses: SlideAnalysis[] = [
  {
    id: 'SA20260504001',
    caseId: 'CASE2026001',
    patientName: '张伟',
    slideType: '胃癌HE染色',
    stainType: 'HE',
    analysisTime: '2026-05-04 10:30',
    status: '已完成',
    results: {
      area: 2456.8,
      positiveRate: 68.5,
      mitosisCount: 12,
      iodValue: 15234.6,
      aiDiagnosis: '低分化腺癌，肿瘤细胞占比约68%，核分裂象活跃'
    }
  },
  {
    id: 'SA20260504002',
    caseId: 'CASE2026002',
    patientName: '李娜',
    slideType: '乳腺癌IHC',
    stainType: 'IHC',
    analysisTime: '2026-05-04 11:45',
    status: '已完成',
    results: {
      area: 1823.4,
      positiveRate: 45.2,
      mitosisCount: 5,
      iodValue: 8765.2,
      aiDiagnosis: 'ER阳性乳腺癌，阳性率约45%，建议结合临床分期'
    }
  },
  {
    id: 'SA20260504003',
    caseId: 'CASE2026003',
    patientName: '王强',
    slideType: '肺癌细胞学',
    stainType: '巴氏',
    analysisTime: '2026-05-04 14:20',
    status: '分析中',
    results: {
      area: 3201.5,
      positiveRate: 82.3,
      mitosisCount: 18,
      iodValue: 23456.8,
      aiDiagnosis: '肺腺癌细胞学特征明显，恶性指征较高'
    }
  }
]

// 分析工具
interface AnalysisTool {
  id: string
  name: string
  icon: typeof Ruler
  description: string
}

const analysisTools: AnalysisTool[] = [
  { id: 'area', name: '面积测量', icon: Ruler, description: '测量选中区域的面积大小' },
  { id: 'positive', name: '阳性率计算', icon: Activity, description: '计算阳性细胞占比' },
  { id: 'mitosis', name: '核分裂计数', icon: Microscope, description: '自动计数核分裂象' },
  { id: 'iod', name: 'IOD测量', icon: Calculator, description: '测量积分光密度值' }
]

export default function ImageAnalysisPage() {
  const [analyses] = useState<SlideAnalysis[]>(mockSlideAnalyses)
  const [selectedAnalysis, setSelectedAnalysis] = useState<SlideAnalysis | null>(analyses[0])
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const filteredAnalyses = analyses.filter(a =>
    a.patientName.includes(searchKeyword) ||
    a.slideType.includes(searchKeyword) ||
    a.caseId.includes(searchKeyword)
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // 模拟上传
    alert('切片图像上传功能（模拟）')
  }

  const handleUpload = () => {
    alert('上传切片图像（模拟）')
  }

  const getStatusStyle = (status: string) => {
    if (status === '已完成') return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' }
    if (status === '分析中') return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' }
    return { bg: ORANGE_LIGHT, color: ORANGE, border: ORANGE_BORDER }
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
            <ImageIcon size={24} color={ORANGE} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b' }}>病理图像分析</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>数字化病理切片智能分析系统</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleUpload}
            style={{
              padding: '10px 20px', borderRadius: 10, border: 'none',
              background: ORANGE, color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Upload size={16} />
            上传切片
          </button>
          <button
            style={{
              padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
              background: '#fff', fontSize: 14, color: '#64748b',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <FileText size={16} />
            历史记录
          </button>
        </div>
      </div>

      {/* 上传区域 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: 32, borderRadius: 16, marginBottom: 24,
          border: `2px dashed ${isDragging ? ORANGE : '#e2e8f0'}`,
          background: isDragging ? ORANGE_LIGHT : '#fff',
          textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s'
        }}
        onClick={handleUpload}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 16, background: `${ORANGE}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <Upload size={32} color={ORANGE} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
          拖拽上传切片图像
        </div>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          支持 .tif, .jpg, .png 格式，可单选或多选上传
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>
          或点击选择文件
        </div>
      </div>

      {/* 主内容区域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* 左侧：图像显示区 */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Microscope size={20} color={ORANGE} />
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>切片图像</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* 缩放控制 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => setZoom(Math.max(25, zoom - 25))}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#fff', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <ZoomOut size={16} color="#64748b" />
                </button>
                <span style={{ fontSize: 13, color: '#64748b', minWidth: 50, textAlign: 'center' }}>{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
                    background: '#fff', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <ZoomIn size={16} color="#64748b" />
                </button>
              </div>
              <button
                onClick={() => setShowGrid(!showGrid)}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
                  background: showGrid ? `${ORANGE}15` : '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Grid3X3 size={16} color={showGrid ? ORANGE : '#64748b'} />
              </button>
              <button
                style={{
                  width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
                  background: '#fff', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Move size={16} color="#64748b" />
              </button>
            </div>
          </div>

          {/* 模拟病理图像区域 */}
          <div style={{
            position: 'relative', borderRadius: 12, overflow: 'hidden',
            background: '#1a1a1a', aspectRatio: '16/10',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {/* 模拟彩色病理图像 */}
            <div style={{
              width: '90%', height: '90%', borderRadius: 8, position: 'relative',
              background: 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DEB887 50%, #F5DEB3 75%, #8B4513 100%)',
              transform: `scale(${zoom / 100})`, transition: 'transform 0.2s',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
              {/* 模拟组织结构 */}
              <div style={{
                position: 'absolute', top: '20%', left: '15%', right: '20%', bottom: '30%',
                background: 'radial-gradient(ellipse at center, #A0522D 0%, #8B4513 50%, #654321 100%)',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                opacity: 0.9
              }} />
              <div style={{
                position: 'absolute', top: '35%', left: '25%', width: '30%', height: '25%',
                background: 'radial-gradient(ellipse, #DEB887 0%, #D2691E 100%)',
                borderRadius: '50%',
                opacity: 0.8
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '55%', width: '25%', height: '20%',
                background: 'radial-gradient(ellipse, #F5DEB3 0%, #CD853F 100%)',
                borderRadius: '40% 60% 55% 45% / 55% 40% 60% 50%',
                opacity: 0.85
              }} />
              {/* 细胞核染色 */}
              <div style={{
                position: 'absolute', top: '25%', left: '30%', width: 8, height: 8,
                background: '#2F1810', borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', top: '40%', left: '45%', width: 6, height: 6,
                background: '#3D2410', borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', top: '55%', left: '35%', width: 7, height: 7,
                background: '#2F1810', borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', top: '45%', left: '60%', width: 5, height: 5,
                background: '#3D2410', borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', top: '60%', left: '50%', width: 6, height: 6,
                background: '#2F1810', borderRadius: '50%'
              }} />

              {/* 网格 */}
              {showGrid && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(#fff2 1px, transparent 1px), linear-gradient(90deg, #fff2 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              )}
            </div>

            {/* 图像信息 */}
            <div style={{
              position: 'absolute', bottom: 12, left: 12,
              padding: '6px 12px', background: 'rgba(0,0,0,0.7)',
              borderRadius: 6, display: 'flex', gap: 16
            }}>
              <span style={{ fontSize: 11, color: '#fff' }}>
                {selectedAnalysis?.slideType || '胃癌HE染色'}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>
                40x 放大
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>
                2048 x 1536 px
              </span>
            </div>
          </div>

          {/* 已选切片列表 */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>当前分析切片</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
              {analyses.map(analysis => {
                const statusStyle = getStatusStyle(analysis.status)
                return (
                  <div
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    style={{
                      minWidth: 160, padding: 12, borderRadius: 10, cursor: 'pointer',
                      border: `2px solid ${selectedAnalysis?.id === analysis.id ? ORANGE : '#e2e8f0'}`,
                      background: selectedAnalysis?.id === analysis.id ? ORANGE_LIGHT : '#fff'
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>
                      {analysis.slideType}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{analysis.caseId}</div>
                    <div style={{
                      marginTop: 8, padding: '2px 8px', borderRadius: 10,
                      fontSize: 10, fontWeight: 500, display: 'inline-block',
                      background: statusStyle.bg, color: statusStyle.color
                    }}>
                      {analysis.status}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 右侧：分析工具面板 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* 分析工具 */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
            }}>
              <Ruler size={18} color={ORANGE} />
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>分析工具</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {analysisTools.map(tool => {
                const Icon = tool.icon
                const isActive = activeTool === tool.id
                return (
                  <div
                    key={tool.id}
                    onClick={() => setActiveTool(isActive ? null : tool.id)}
                    style={{
                      padding: 14, borderRadius: 12, cursor: 'pointer',
                      border: `2px solid ${isActive ? ORANGE : '#e2e8f0'}`,
                      background: isActive ? ORANGE_LIGHT : '#fff',
                      display: 'flex', alignItems: 'center', gap: 12
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: isActive ? `${ORANGE}20` : '#f8fafc',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon size={20} color={isActive ? ORANGE : '#64748b'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{tool.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{tool.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 工具提示 */}
            {activeTool && (
              <div style={{
                marginTop: 16, padding: 12, background: `${ORANGE}10`,
                borderRadius: 10, border: `1px solid ${ORANGE_BORDER}`
              }}>
                <div style={{ fontSize: 12, color: ORANGE, fontWeight: 500 }}>
                  {activeTool === 'area' && '提示：在图像上点击拖拽选择测量区域'}
                  {activeTool === 'positive' && '提示：使用画笔工具涂抹阳性区域'}
                  {activeTool === 'mitosis' && '提示：点击标记核分裂象位置'}
                  {activeTool === 'iod' && '提示：框选测量区域自动计算IOD值'}
                </div>
              </div>
            )}
          </div>

          {/* 切片记录搜索 */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
            }}>
              <Search size={18} color={ORANGE} />
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>分析记录</h2>
            </div>

            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type="text"
                placeholder="搜索切片记录..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10,
                  border: '1px solid #e2e8f0', fontSize: 13, outline: 'none'
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredAnalyses.map(analysis => {
                const statusStyle = getStatusStyle(analysis.status)
                return (
                  <div
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    style={{
                      padding: 12, borderRadius: 10, cursor: 'pointer',
                      border: `1px solid ${selectedAnalysis?.id === analysis.id ? ORANGE : '#e2e8f0'}`,
                      background: selectedAnalysis?.id === analysis.id ? ORANGE_LIGHT : '#fff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{analysis.patientName}</span>
                      <span style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 500,
                        background: statusStyle.bg, color: statusStyle.color
                      }}>
                        {analysis.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{analysis.slideType}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{analysis.caseId}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 下方：分析结果报告 */}
      <div style={{
        background: '#fff', borderRadius: 16, padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: 24
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={20} color={ORANGE} />
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>分析结果报告</h2>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={{
                padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
                background: '#fff', fontSize: 13, color: '#64748b',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <FileText size={14} />
              导出报告
            </button>
            <button
              style={{
                padding: '10px 20px', borderRadius: 10, border: 'none',
                background: ORANGE, color: '#fff', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              <Download size={14} />
              导出PDF
            </button>
          </div>
        </div>

        {selectedAnalysis?.results ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <div style={{
              padding: 20, background: '#f8fafc', borderRadius: 12,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: `${ORANGE}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Ruler size={24} color={ORANGE} />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>
                {selectedAnalysis.results.area?.toFixed(1)}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>面积 (μm²)</div>
            </div>

            <div style={{
              padding: 20, background: '#f8fafc', borderRadius: 12,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: '#dcfce7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Activity size={24} color="#16a34a" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#16a34a' }}>
                {selectedAnalysis.results.positiveRate?.toFixed(1)}%
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>阳性率</div>
            </div>

            <div style={{
              padding: 20, background: '#f8fafc', borderRadius: 12,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: '#fef3c7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Microscope size={24} color="#d97706" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#d97706' }}>
                {selectedAnalysis.results.mitosisCount}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>核分裂计数</div>
            </div>

            <div style={{
              padding: 20, background: '#f8fafc', borderRadius: 12,
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: '#ede9fe',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Calculator size={24} color="#7c3aed" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#7c3aed' }}>
                {selectedAnalysis.results.iodValue?.toFixed(1)}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>IOD值</div>
            </div>
          </div>
        ) : (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
            <div style={{ fontSize: 14 }}>暂无分析结果</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>请选择或上传切片进行分析</div>
          </div>
        )}

        {selectedAnalysis?.results?.aiDiagnosis && (
          <div style={{
            marginTop: 20, padding: 20, background: `${ORANGE}08`,
            borderRadius: 12, border: `1px solid ${ORANGE_BORDER}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: `${ORANGE}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ImageIcon size={16} color={ORANGE} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: ORANGE }}>AI智能诊断建议</span>
            </div>
            <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.7 }}>
              {selectedAnalysis.results.aiDiagnosis}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

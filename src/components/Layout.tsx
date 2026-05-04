import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, TestTube, GitBranch, FileText, Zap, ShieldCheck, Microscope, Dna, Building2, Users, BookOpen, BarChart3, Settings, Archive, Monitor, GraduationCap, ClipboardList, AlertTriangle, FolderOpen, Package, FileBarChart, Microscope as MicroSlide, Brain, Scan, Camera, RefreshCw, Cloud, Syringe, Beaker, TrendingUp, HeartPulse, Circle } from 'lucide-react'
import { useState } from 'react'

// F1-F12 快捷键功能映射
const KEYBOARD_SHORTCUTS = [
  { key: 'F1', label: '帮助', icon: '❓', action: 'showHelp' },
  { key: 'F2', label: '语音', icon: '🎤', action: 'voiceInput' },
  { key: 'F3', label: '刷新', icon: '🔄', action: 'refresh' },
  { key: 'F4', label: '模板', icon: '📋', action: 'template' },
  { key: 'F5', label: '填充', icon: '✏️', action: 'autoFill' },
  { key: 'F6', label: '保存', icon: '💾', action: 'save' },
  { key: 'F7', label: '提交', icon: '📤', action: 'submit' },
  { key: 'F8', label: '时限', icon: '⏱️', action: 'timeLimit' },
  { key: 'F9', label: '完整度', icon: '📊', action: 'completeness' },
  { key: 'F10', label: '历史', icon: '📜', action: 'history' },
  { key: 'F11', label: '打印', icon: '🖨️', action: 'print' },
  { key: 'F12', label: '设置', icon: '⚙️', action: 'settings' },
]

const navItems = [
  { path: '/g007', label: '首页', icon: Home },
  { path: '/g007/specimen', label: '标本管理', icon: TestTube },
  { path: '/g007/workflow', label: '工作流管理', icon: GitBranch },
  { path: '/g007/report', label: '病理报告', icon: FileText },
  { path: '/g007/frozen', label: '术中冰冻', icon: Zap },
  { path: '/g007/ai-frozen', label: 'AI冰冻快诊', icon: Brain },
  { path: '/g007/image-analysis', label: '图像分析', icon: Scan },
  { path: '/g007/specimen-photo', label: '标本摄影', icon: Camera },
  { path: '/g007/qc', label: '质控管理', icon: ShieldCheck },
  { path: '/g007/pdca', label: 'PDCA改进', icon: RefreshCw },
  { path: '/g007/ihc', label: '免疫组化', icon: Microscope },
  { path: '/g007/tct', label: 'TCT细胞学', icon: Circle },
  { path: '/g007/molecular', label: '分子病理', icon: Dna },
  { path: '/g007/regional', label: '区域病理', icon: Building2 },
  { path: '/g007/regional-frozen', label: '区域冰冻会诊', icon: Cloud },
  { path: '/g007/consultation', label: '会诊管理', icon: Users },
  { path: '/g007/cases', label: '典型病例库', icon: BookOpen },
  { path: '/g007/vaccine', label: 'HPV疫苗', icon: Syringe },
  { path: '/g007/research', label: '科研项目', icon: Beaker },
  { path: '/g007/workload', label: '医师工作量', icon: TrendingUp },
  { path: '/g007/archive', label: '档案管理', icon: Archive },
  { path: '/g007/autopsy', label: '死亡尸检', icon: HeartPulse },
  { path: '/g007/equipment', label: '设备管理', icon: Monitor },
  { path: '/g007/training', label: '培训管理', icon: GraduationCap },
  { path: '/g007/audit', label: '审计管理', icon: ClipboardList },
  { path: '/g007/emergency', label: '应急管理', icon: AlertTriangle },
  { path: '/g007/loan', label: '借阅管理', icon: FolderOpen },
  { path: '/g007/consumables', label: '耗材管理', icon: Package },
  { path: '/g007/data-report', label: '数据上报', icon: FileBarChart },
  { path: '/g007/digital-slide', label: '数字切片', icon: MicroSlide },
  { path: '/g007/statistics', label: '统计分析', icon: BarChart3 },
  { path: '/g007/admin', label: '系统管理', icon: Settings },
]

export default function Layout() {
  const location = useLocation()
  const [showToolbar, setShowToolbar] = useState(true)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleShortcut = (action: string) => {
    switch (action) {
      case 'showHelp': alert('帮助文档：\nF1-帮助 | F2-语音输入 | F3-刷新\nF4-模板选择 | F5-自动填充 | F6-保存\nF7-提交报告 | F8-时限设置 | F9-完整度检查\nF10-历史记录 | F11-打印 | F12-系统设置'); break
      case 'voiceInput': alert('语音输入模式已开启'); break
      case 'refresh': window.location.reload(); break
      case 'template': alert('模板选择面板'); break
      case 'autoFill': alert('自动填充功能'); break
      case 'save': alert('报告已保存'); break
      case 'submit': alert('报告已提交'); break
      case 'timeLimit': alert('时限设置面板'); break
      case 'completeness': alert('完整度检查：98%'); break
      case 'history': alert('历史记录'); break
      case 'print': window.print(); break
      case 'settings': alert('系统设置'); break
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#1e3a5f', color: '#fff', padding: '16px 0', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 16 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>全院病理系统</h1>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>G007 · v0.3.0 · 病理专家</div>
        </div>
        <nav>
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setActiveTooltip(item.path)}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 20px',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                  background: isActive ? 'rgba(249,115,22,0.25)' : 'transparent',
                  borderLeft: isActive ? '3px solid #F97316' : '3px solid transparent',
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'all 0.15s',
                  position: 'relative',
                }}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
                {activeTooltip === item.path && (
                  <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8, background: '#1e3a5f', color: '#fff', padding: '6px 10px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main style={{ marginLeft: 220, flex: 1, background: '#f8fafc', minHeight: '100vh' }}>
        {showToolbar && (
          <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 4, position: 'sticky', top: 0, zIndex: 50 }}>
            {KEYBOARD_SHORTCUTS.map(shortcut => (
              <button
                key={shortcut.key}
                onClick={() => handleShortcut(shortcut.action)}
                title={shortcut.label}
                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', borderRadius: 4, fontSize: 12 }}
              >
                <span>{shortcut.icon}</span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{shortcut.key}</span>
              </button>
            ))}
            <div style={{ marginLeft: 'auto' }}>
              <button onClick={() => setShowToolbar(false)} style={{ padding: '4px 8px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>隐藏工具栏</button>
            </div>
          </div>
        )}
        {!showToolbar && (
          <button onClick={() => setShowToolbar(true)} style={{ position: 'fixed', bottom: 20, right: 20, width: 40, height: 40, borderRadius: '50%', background: '#1e3a5f', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', zIndex: 100 }}>☰</button>
        )}
        <Outlet />
      </main>
    </div>
  )
}

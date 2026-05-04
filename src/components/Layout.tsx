import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, TestTube, GitBranch, FileText, Zap, ShieldCheck, Microscope, Dna, Building2, Users, BookOpen, BarChart3, Settings, Archive, Monitor, GraduationCap, ClipboardList, AlertTriangle, FolderOpen, Package, FileBarChart, Microscope as MicroSlide } from 'lucide-react'
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
  { path: '/g007/qc', label: '质控管理', icon: ShieldCheck },
  { path: '/g007/ihc', label: '免疫组化', icon: Microscope },
  { path: '/g007/molecular', label: '分子病理', icon: Dna },
  { path: '/g007/regional', label: '区域病理', icon: Building2 },
  { path: '/g007/consultation', label: '会诊管理', icon: Users },
  { path: '/g007/cases', label: '典型病例库', icon: BookOpen },
  { path: '/g007/archive', label: '档案管理', icon: Archive },
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
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>G007 · v0.2.0 · 病理专家</div>
        </div>
        <nav>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path !== '/g007' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 20px',
                  margin: '2px 0',
                  borderLeft: isActive ? '4px solid #4ade80' : '4px solid transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)',
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main style={{ marginLeft: 220, flex: 1, background: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* F1-F12 快捷键工具栏 - 深蓝背景白字≥16px */}
        {showToolbar && (
          <div style={{
            background: '#1e3a5f',
            borderBottom: '2px solid #0f172a',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 4,
            flexShrink: 0,
            overflowX: 'auto',
          }}>
            {KEYBOARD_SHORTCUTS.map(shortcut => (
              <div key={shortcut.key} style={{ position: 'relative' }}>
                <button
                  onClick={() => handleShortcut(shortcut.action)}
                  onMouseEnter={() => { setActiveTooltip(shortcut.key); }}
                  onMouseLeave={() => { setActiveTooltip(null); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>{shortcut.key}</span>
                  <span style={{ fontSize: 18 }}>{shortcut.icon}</span>
                  <span>{shortcut.label}</span>
                </button>
                {/* 工具提示 */}
                {activeTooltip === shortcut.key && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: 4,
                    padding: '6px 10px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontSize: 12,
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}>
                    {shortcut.key} - {shortcut.label}
                  </div>
                )}
              </div>
            ))}
            {/* 关闭工具栏按钮 */}
            <button
              onClick={() => setShowToolbar(false)}
              style={{
                marginLeft: 'auto',
                padding: '6px 10px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>
        )}
        {/* 未显示工具栏时的恢复按钮 */}
        {!showToolbar && (
          <div style={{
            background: '#1e3a5f',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <button
              onClick={() => setShowToolbar(true)}
              style={{
                padding: '4px 12px',
                background: '#2d4a6f',
                border: 'none',
                borderRadius: 4,
                color: '#ffffff',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              显示快捷工具栏
            </button>
          </div>
        )}
        <div style={{ flex: 1, padding: 24 }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

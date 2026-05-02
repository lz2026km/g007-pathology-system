import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, TestTube, GitBranch, FileText, Zap, ShieldCheck, Microscope, Dna, Building2, Users, BookOpen, BarChart3, Settings } from 'lucide-react'

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
  { path: '/g007/statistics', label: '统计分析', icon: BarChart3 },
  { path: '/g007/admin', label: '系统管理', icon: Settings },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#1e3a5f', color: '#fff', padding: '16px 0', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 16 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>全院病理系统</h1>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>G007 · v0.1.0</div>
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
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 14,
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main style={{ marginLeft: 220, flex: 1, background: '#f5f7fa', padding: 24, minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SpecimenPage from './pages/SpecimenPage'
import WorkflowPage from './pages/WorkflowPage'
import ReportPage from './pages/ReportPage'
import FrozenPage from './pages/FrozenPage'
import QCPage from './pages/QCPage'
import IHCPage from './pages/IHCPage'
import MolecularPage from './pages/MolecularPage'
import RegionalPage from './pages/RegionalPage'
import ConsultationPage from './pages/ConsultationPage'
import CasesPage from './pages/CasesPage'
import StatisticsPage from './pages/StatisticsPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/g007" replace />} />
          <Route path="g007" element={<HomePage />} />
          <Route path="g007/specimen" element={<SpecimenPage />} />
          <Route path="g007/workflow" element={<WorkflowPage />} />
          <Route path="g007/report" element={<ReportPage />} />
          <Route path="g007/frozen" element={<FrozenPage />} />
          <Route path="g007/qc" element={<QCPage />} />
          <Route path="g007/ihc" element={<IHCPage />} />
          <Route path="g007/molecular" element={<MolecularPage />} />
          <Route path="g007/regional" element={<RegionalPage />} />
          <Route path="g007/consultation" element={<ConsultationPage />} />
          <Route path="g007/cases" element={<CasesPage />} />
          <Route path="g007/statistics" element={<StatisticsPage />} />
          <Route path="g007/admin" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

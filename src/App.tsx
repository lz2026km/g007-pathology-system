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
import ArchivePage from './pages/ArchivePage'
import EquipmentPage from './pages/EquipmentPage'
import TrainingPage from './pages/TrainingPage'
import AuditPage from './pages/AuditPage'
import EmergencyPage from './pages/EmergencyPage'
import LoanManagementPage from './pages/LoanManagementPage'
import ConsumablesPage from './pages/ConsumablesPage'
import DataReportPage from './pages/DataReportPage'
import DigitalSlidePage from './pages/DigitalSlidePage'
import AIFrozenPage from './pages/AIFrozenPage'
import ImageAnalysisPage from './pages/ImageAnalysisPage'
import SpecimenPhotoPage from './pages/SpecimenPhotoPage'
import TCTPage from './pages/TCTPage'
import PDCAPage from './pages/PDCAPage'
import RegionalFrozenPage from './pages/RegionalFrozenPage'
import VaccinePage from './pages/VaccinePage'
import ResearchPage from './pages/ResearchPage'
import WorkloadPage from './pages/WorkloadPage'
import AutopsyPage from './pages/AutopsyPage'

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
          <Route path="g007/ai-frozen" element={<AIFrozenPage />} />
          <Route path="g007/image-analysis" element={<ImageAnalysisPage />} />
          <Route path="g007/specimen-photo" element={<SpecimenPhotoPage />} />
          <Route path="g007/qc" element={<QCPage />} />
          <Route path="g007/pdca" element={<PDCAPage />} />
          <Route path="g007/ihc" element={<IHCPage />} />
          <Route path="g007/tct" element={<TCTPage />} />
          <Route path="g007/molecular" element={<MolecularPage />} />
          <Route path="g007/regional" element={<RegionalPage />} />
          <Route path="g007/regional-frozen" element={<RegionalFrozenPage />} />
          <Route path="g007/consultation" element={<ConsultationPage />} />
          <Route path="g007/cases" element={<CasesPage />} />
          <Route path="g007/vaccine" element={<VaccinePage />} />
          <Route path="g007/research" element={<ResearchPage />} />
          <Route path="g007/workload" element={<WorkloadPage />} />
          <Route path="g007/archive" element={<ArchivePage />} />
          <Route path="g007/autopsy" element={<AutopsyPage />} />
          <Route path="g007/equipment" element={<EquipmentPage />} />
          <Route path="g007/training" element={<TrainingPage />} />
          <Route path="g007/audit" element={<AuditPage />} />
          <Route path="g007/emergency" element={<EmergencyPage />} />
          <Route path="g007/loan" element={<LoanManagementPage />} />
          <Route path="g007/consumables" element={<ConsumablesPage />} />
          <Route path="g007/data-report" element={<DataReportPage />} />
          <Route path="g007/digital-slide" element={<DigitalSlidePage />} />
          <Route path="g007/statistics" element={<StatisticsPage />} />
          <Route path="g007/admin" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

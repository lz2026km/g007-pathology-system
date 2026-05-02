// G007 病理系统 - 初始数据

export interface Patient {
  id: string
  name: string
  gender: '男' | '女'
  age: number
  idCard: string
  phone: string
  address: string
}

export interface Sample {
  id: string
  patientId: string
  sampleType: string
  receivedDate: string
  status: '待处理' | '已接收' | '已取材' | '已包埋' | '已切片' | '已染色' | '诊断中' | '已完成'
  location: string
}

export interface TestReport {
  id: string
  patientId: string
  sampleId: string
  diagnosis: string
  pathologist: string
  date: string
  status: '草稿' | '待审核' | '已发布'
}

export interface StainBatch {
  id: string
  stainType: string
  date: string
  operator: string
  status: '正常' | '异常'
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  expirationDate: string
  location: string
}

export const initialPatients: Patient[] = [
  { id: 'P001', name: '张三', gender: '男', age: 45, idCard: '110101197801234567', phone: '13800138001', address: '北京市朝阳区' },
  { id: 'P002', name: '李四', gender: '女', age: 38, idCard: '110101198601234568', phone: '13800138002', address: '北京市海淀区' },
  { id: 'P003', name: '王五', gender: '男', age: 62, idCard: '110101196201234569', phone: '13800138003', address: '北京市西城区' },
]

export const initialSamples: Sample[] = [
  { id: 'S001', patientId: 'P001', sampleType: '胃镜活检', receivedDate: '2026-05-01', status: '待处理', location: 'A-01-01' },
  { id: 'S002', patientId: 'P002', sampleType: '结肠镜活检', receivedDate: '2026-05-01', status: '已接收', location: 'A-01-02' },
  { id: 'S003', patientId: 'P003', sampleType: '手术切除标本', receivedDate: '2026-04-30', status: '已切片', location: 'A-02-01' },
]

export const initialReports: TestReport[] = [
  { id: 'R001', patientId: 'P001', sampleId: 'S001', diagnosis: '慢性浅表性胃炎', pathologist: 'Dr. Wang', date: '2026-05-02', status: '草稿' },
]

export const initialStainBatches: StainBatch[] = [
  { id: 'ST001', stainType: 'HE染色', date: '2026-05-02', operator: '技术员A', status: '正常' },
  { id: 'ST002', stainType: 'PAS染色', date: '2026-05-02', operator: '技术员B', status: '正常' },
]

export const initialInventory: InventoryItem[] = [
  { id: 'I001', name: '福尔马林溶液', category: '固定液', quantity: 50, unit: 'L', expirationDate: '2027-01-01', location: '试剂柜-1' },
  { id: 'I002', name: '脱水乙醇', category: '脱水剂', quantity: 100, unit: 'L', expirationDate: '2026-12-01', location: '试剂柜-1' },
  { id: 'I003', name: '二甲苯', category: '透明剂', quantity: 40, unit: 'L', expirationDate: '2026-09-01', location: '试剂柜-2' },
  { id: 'I004', name: '石蜡', category: '包埋剂', quantity: 20, unit: 'kg', expirationDate: '2027-06-01', location: '材料柜-1' },
]

export const systemStats = {
  todaySamples: 12,
  pendingReports: 5,
  completedToday: 8,
  criticalCases: 2,
}

// G007 全院病理系统 - 完整模拟数据
export interface Patient {
  id: string;
  name: string;
  gender: '男' | '女';
  age: number;
  idCard: string;
  phone: string;
  address: string;
  department: string;
  ward: string;
  bed: string;
}

export interface Specimen {
  id: string;
  specimenId: string; // 病理号 BX202605020001
  patientId: string;
  patientName: string;
  gender: '男' | '女';
  age: number;
  specimenType: '常规活检' | '手术标本' | '细胞学' | '冰冻切片' | '免疫组化' | '分子病理' | '骨髓活检';
  specimenSource: string; // 取材部位
  clinicalDiagnosis: string;
  department: string;
  doctor: string;
  collectTime: string;
  receiveTime: string;
  status: '待接收' | '已接收' | '制片中' | '已切片' | '阅片中' | '已诊断' | '审核中' | '已完成' | '已打印';
  priority: '普通' | '紧急' | '冰冻';
  reportTime?: string;
}

export interface PathologyReport {
  id: string;
  reportId: string; // BL202605020001
  specimenId: string;
  patientName: string;
  gender: '男' | '女';
  age: number;
  specimenType: string;
  specimenSource: string;
  clinicalDiagnosis: string;
  grossDescription: string; // 大体描述
  microscopicDescription: string; // 镜下描述
  diagnosis: string; // 病理诊断
  diagnosisCode: string; // ICD-10
  tumorDifferentiation?: '高分化' | '中分化' | '低分化' | '未分化';
  invasionDepth?: string;
  lymphNodeStatus?: string;
  biomarkers?: Record<string, string>;
  pathologist: string;
  审核医生: string;
  reportTime: string;
  status: '待书写' | '待审核' | '已审核' | '已打印';
  isFrozen: boolean;
  isIHC: boolean;
}

export interface FrozenCase {
  id: string;
  patientName: string;
  gender: '男' | '女';
  age: number;
  surgeryType: string; // 手术类型
  surgeon: string;
  specimenSource: string;
  receiveTime: string;
  sliceTime: string;
  diagnosisTime: string;
  diagnosis: string;
  result: '恶性' | '良性' | '交界性' | '无法确定';
  elapsedMinutes: number;
  status: '冰冻中' | '已完成';
  pathologist: string;
  turnaroundTarget: number; // 目标30分钟
}

export interface QCRecord {
  id: string;
  month: string;
  totalCases: number;
  completedCases: number;
  frozenCases: number;
  ihcCases: number;
  molecularCases: number;
  avgTurnaroundHours: number; // 平均 turnaround time
  frozenTurnaroundMinutes: number;
  satisfactoryRate: number; // 切片优良率 %
  qcScore: number; // 质控评分
  issues: string[];
  reportedToRegional: boolean;
  reportedDate?: string;
}

export interface IHCMarker {
  marker: string; // ER, PR, HER2, Ki-67...
  result: '阳性' | '阴性' | '可疑' | '无法判读';
  intensity: 0 | 1 | 2 | 3;
  percentage: number; // 阳性百分比
  location: '细胞核' | '细胞质' | '细胞膜' | '间质';
}

export interface IHCReport {
  id: string;
  specimenId: string;
  patientName: string;
  clinicalDiagnosis: string;
  markers: IHCMarker[];
  pathologist: string;
  reportTime: string;
  status: '已完成';
}

export interface MolecularTest {
  id: string;
  specimenId: string;
  patientName: string;
  testType: 'FISH' | 'PCR' | 'NGS' | '基因突变检测' | '融合基因检测' | '染色体核型';
  gene: string;
  result: '阳性' | '阴性' | '突变' | '野生型' | '待测' | '异常';
  detail: string;
  pathologist: string;
  reportTime: string;
}

export interface RegionalHospital {
  id: string;
  name: string;
  level: '三甲' | '三乙' | '二甲' | '二乙';
  address: string;
  casesSubmitted: number;
  casesReported: number;
  avgTurnaroundHours: number;
  pendingCases: number;
  online: boolean;
  lastSubmitTime?: string;
}

export interface ConsultationRequest {
  id: string;
  requestingHospital: string;
  requestingDoctor: string;
  patientName: string;
  gender: '男' | '女';
  age: number;
  specimenType: string;
  clinicalHistory: string;
  originalDiagnosis: string;
  consultationQuestion: string;
  submittedImages: number; // 切片图片数量
  requestedExpert?: string;
  status: '待分配' | '阅片中' | '已完成';
  assignedExpert?: string;
  expertOpinion?: string;
  turnaroundHours?: number;
  submitTime: string;
  completeTime?: string;
}

export interface TeachingCase {
  id: string;
  caseId: string;
  patientName: string;
  gender: '男' | '女';
  age: number;
  diagnosis: string;
  diagnosisCode: string;
  organ: string;
  diseaseCategory: string;
  difficulty: '基础' | '进阶' | '疑难' | '罕见';
  slides: number;
  images: string[];
  keyPoints: string[];
  discussion: string;
  author: string;
  createdAt: string;
  tags: string[];
  views: number;
  downloads: number;
}

export interface ReagentInventory {
  id: string;
  reagentCode: string;
  reagentName: string;
  category: '抗体' | '染色液' | '固定液' | '脱水剂' | '包埋剂' | '切片耗材' | '分子病理试剂' | '其他';
  specification: string;
  manufacturer: string;
  lotNumber: string;
  expiryDate: string;
  stockQuantity: number;
  unit: string;
  location: string;
  status: '正常' | '临期' | '过期' | '库存不足';
  lastReagentDate?: string;
  lastReagentQuantity?: number;
}

export interface BorrowRecord {
  id: string;
  recordId: string; // 借阅编号JY20260503001
  specimenId: string; // 病理号
  patientName: string;
  slidesNo: string; // 切片号
  borrower: string; // 借阅人
  department: string;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  purpose: string; // 借阅用途
  status: '借出' | '已归还' | '超期' | '遗失';
  approver: string; // 审批人
  remarks?: string;
}

// ========== 模拟数据 ==========

export const patients: Patient[] = [
  { id: 'P001', name: '张伟', gender: '男', age: 58, idCard: '310101196801011234', phone: '13812340001', address: '上海市浦东新区', department: '胸外科', ward: '胸外一病区', bed: '12床' },
  { id: 'P002', name: '李娜', gender: '女', age: 45, idCard: '310101198101023456', phone: '13812340002', address: '上海市徐汇区', department: '乳腺外科', ward: '乳腺外科', bed: '3床' },
  { id: 'P003', name: '王芳', gender: '女', age: 52, idCard: '310101197401011234', phone: '13812340003', address: '上海市静安区', department: '消化内科', ward: '消化内科', bed: '8床' },
  { id: 'P004', name: '刘强', gender: '男', age: 67, idCard: '310101195901011234', phone: '13812340004', address: '上海市杨浦区', department: '胃肠外科', ward: '胃肠外科', bed: '15床' },
  { id: 'P005', name: '陈静', gender: '女', age: 38, idCard: '310101198801011234', phone: '13812340005', address: '上海市长宁区', department: '妇科', ward: '妇科一病区', bed: '6床' },
  { id: 'P006', name: '赵军', gender: '男', age: 72, idCard: '310101195401011234', phone: '13812340006', address: '上海市虹口区', department: '泌尿外科', ward: '泌尿外科', bed: '20床' },
  { id: 'P007', name: '周婷', gender: '女', age: 33, idCard: '310101199301011234', phone: '13812340007', address: '上海市闵行区', department: '皮肤科', ward: '皮肤科', bed: '2床' },
  { id: 'P008', name: '吴磊', gender: '男', age: 55, idCard: '310101197101011234', phone: '13812340008', address: '上海市普陀区', department: '骨科', ward: '骨科', bed: '9床' },
  { id: 'P009', name: '孙燕', gender: '女', age: 61, idCard: '310101196501011234', phone: '13812340009', address: '上海市黄浦区', department: '呼吸内科', ward: '呼吸内科', bed: '11床' },
  { id: 'P010', name: '郑明', gender: '男', age: 48, idCard: '310101197801011234', phone: '13812340010', address: '上海市嘉定区', department: '肝胆外科', ward: '肝胆外科', bed: '4床' },
  { id: 'P011', name: '黄丽', gender: '女', age: 42, idCard: '310101198401011234', phone: '13812340011', address: '上海市宝山区', department: '肿瘤内科', ward: '肿瘤内科', bed: '7床' },
  { id: 'P012', name: '徐鹏', gender: '男', age: 63, idCard: '310101196301011234', phone: '13812340012', address: '上海市松江区', department: '心内科', ward: '心内科', bed: '18床' },
  { id: 'P013', name: '马超', gender: '男', age: 29, idCard: '310101199701011234', phone: '13812340013', address: '上海市青浦区', department: '急诊科', ward: '急诊观察', bed: '1床' },
  { id: 'P014', name: '林梅', gender: '女', age: 56, idCard: '310101197001011234', phone: '13812340014', address: '上海市奉贤区', department: '内分泌科', ward: '内分泌科', bed: '5床' },
  { id: 'P015', name: '高峰', gender: '男', age: 71, idCard: '310101195501011234', phone: '13812340015', address: '上海市崇明区', department: '神经外科', ward: '神外一病区', bed: '13床' },
  { id: 'P016', name: '田华', gender: '女', age: 35, idCard: '310101199101011234', phone: '13812340016', address: '上海市浦东新区', department: '妇科', ward: '妇科二病区', bed: '8床' },
  { id: 'P017', name: '周建平', gender: '男', age: 62, idCard: '310101196401011234', phone: '13812340017', address: '上海市徐汇区', department: '胸外科', ward: '胸外二病区', bed: '5床' },
  { id: 'P018', name: '吴秀英', gender: '女', age: 48, idCard: '310101197801011234', phone: '13812340018', address: '上海市静安区', department: '消化内科', ward: '消化内科', bed: '12床' },
  { id: 'P019', name: '马立军', gender: '男', age: 55, idCard: '310101197101011234', phone: '13812340019', address: '上海市杨浦区', department: '骨科', ward: '骨科', bed: '6床' },
  { id: 'P020', name: '王秀芬', gender: '女', age: 41, idCard: '310101198501011234', phone: '13812340020', address: '上海市长宁区', department: '乳腺外科', ward: '乳腺外科', bed: '10床' },
  { id: 'P021', name: '李天山', gender: '男', age: 68, idCard: '310101195801011234', phone: '13812340021', address: '上海市虹口区', department: '呼吸内科', ward: '呼吸内科', bed: '14床' },
  { id: 'P022', name: '陈美娟', gender: '女', age: 39, idCard: '310101198701011234', phone: '13812340022', address: '上海市闵行区', department: '妇科', ward: '妇科一病区', bed: '3床' },
  { id: 'P023', name: '赵志刚', gender: '男', age: 52, idCard: '310101197401011234', phone: '13812340023', address: '上海市普陀区', department: '泌尿外科', ward: '泌尿外科', bed: '7床' },
  { id: 'P024', name: '孙丽华', gender: '女', age: 44, idCard: '310101198201011234', phone: '13812340024', address: '上海市黄浦区', department: '皮肤科', ward: '皮肤科', bed: '4床' },
  { id: 'P025', name: '杨大海', gender: '男', age: 73, idCard: '310101195301011234', phone: '13812340025', address: '上海市嘉定区', department: '神经内科', ward: '神内二病区', bed: '11床' },
  { id: 'P026', name: '郑小丽', gender: '女', age: 31, idCard: '310101199501011234', phone: '13812340026', address: '上海市宝山区', department: '血液科', ward: '血液科', bed: '2床' },
  { id: 'P027', name: '钱文华', gender: '男', age: 59, idCard: '310101196701011234', phone: '13812340027', address: '上海市松江区', department: '肝胆外科', ward: '肝胆外科', bed: '9床' },
  { id: 'P028', name: '周志明', gender: '男', age: 64, idCard: '310101196201011234', phone: '13812340028', address: '上海市青浦区', department: '心内科', ward: '心内科', bed: '16床' },
  { id: 'P029', name: '吴晓东', gender: '男', age: 47, idCard: '310101197901011234', phone: '13812340029', address: '上海市奉贤区', department: '胃肠外科', ward: '胃肠外科', bed: '5床' },
  { id: 'P030', name: '郑美丽', gender: '女', age: 54, idCard: '310101197201011234', phone: '13812340030', address: '上海市崇明区', department: '肿瘤内科', ward: '肿瘤内科', bed: '8床' },
  { id: 'P031', name: '冯志强', gender: '男', age: 45, idCard: '310101198101011234', phone: '13812340031', address: '上海市浦东新区', department: '胸外科', ward: '胸外一病区', bed: '3床' },
  { id: 'P032', name: '曹雪梅', gender: '女', age: 36, idCard: '310101199001011234', phone: '13812340032', address: '上海市徐汇区', department: '内分泌科', ward: '内分泌科', bed: '7床' },
  { id: 'P033', name: '丁建新', gender: '男', age: 60, idCard: '310101196601011234', phone: '13812340033', address: '上海市静安区', department: '骨科', ward: '骨科', bed: '12床' },
  { id: 'P034', name: '孙佳欣', gender: '女', age: 28, idCard: '310101199801011234', phone: '13812340034', address: '上海市杨浦区', department: '妇科', ward: '妇科三病区', bed: '5床' },
  { id: 'P035', name: '徐志强', gender: '男', age: 65, idCard: '310101196101011234', phone: '13812340035', address: '上海市长宁区', department: '泌尿外科', ward: '泌尿外科', bed: '10床' },
  { id: 'P036', name: '韩丽娜', gender: '女', age: 50, idCard: '310101197601011234', phone: '13812340036', address: '上海市虹口区', department: '乳腺外科', ward: '乳腺外科', bed: '6床' },
  { id: 'P037', name: '黄志勇', gender: '男', age: 57, idCard: '310101196901011234', phone: '13812340037', address: '上海市闵行区', department: '消化内科', ward: '消化内科', bed: '15床' },
  { id: 'P038', name: '周艳艳', gender: '女', age: 43, idCard: '310101198301011234', phone: '13812340038', address: '上海市普陀区', department: '皮肤科', ward: '皮肤科', bed: '3床' },
  { id: 'P039', name: '吴海涛', gender: '男', age: 70, idCard: '310101195601011234', phone: '13812340039', address: '上海市黄浦区', department: '神经内科', ward: '神内一病区', bed: '9床' },
  { id: 'P040', name: '刘凤英', gender: '女', age: 46, idCard: '310101198001011234', phone: '13812340040', address: '上海市嘉定区', department: '血液科', ward: '血液科', bed: '4床' },
  { id: 'P041', name: '陈国栋', gender: '男', age: 53, idCard: '310101197301011234', phone: '13812340041', address: '上海市宝山区', department: '心内科', ward: '心内科', bed: '13床' },
  { id: 'P042', name: '林晓晓', gender: '女', age: 32, idCard: '310101199401011234', phone: '13812340042', address: '上海市松江区', department: '急诊科', ward: '急诊观察', bed: '2床' },
  { id: 'P043', name: '赵新建', gender: '男', age: 66, idCard: '310101196001011234', phone: '13812340043', address: '上海市青浦区', department: '胸外科', ward: '胸外二病区', bed: '8床' },
  { id: 'P044', name: '马琳娜', gender: '女', age: 49, idCard: '310101197701011234', phone: '13812340044', address: '上海市奉贤区', department: '肿瘤内科', ward: '肿瘤内科', bed: '11床' },
  { id: 'P045', name: '刘海波', gender: '男', age: 58, idCard: '310101196801011234', phone: '13812340045', address: '上海市崇明区', department: '肝胆外科', ward: '肝胆外科', bed: '6床' },
  { id: 'P046', name: '邓秀英', gender: '女', age: 37, idCard: '310101198901011234', phone: '13812340046', address: '上海市浦东新区', department: '妇科', ward: '妇科一病区', bed: '9床' },
  { id: 'P047', name: '姜志远', gender: '男', age: 61, idCard: '310101196501011234', phone: '13812340047', address: '上海市徐汇区', department: '骨科', ward: '骨科', bed: '14床' },
  { id: 'P048', name: '段丽华', gender: '女', age: 40, idCard: '310101198601011234', phone: '13812340048', address: '上海市静安区', department: '乳腺外科', ward: '乳腺外科', bed: '7床' },
  { id: 'P049', name: '贾志明', gender: '男', age: 69, idCard: '310101195701011234', phone: '13812340049', address: '上海市杨浦区', department: '泌尿外科', ward: '泌尿外科', bed: '4床' },
  { id: 'P050', name: '龚晓燕', gender: '女', age: 34, idCard: '310101199201011234', phone: '13812340050', address: '上海市长宁区', department: '呼吸内科', ward: '呼吸内科', bed: '5床' },
];

export const specimens: Specimen[] = [
  { id: 'S001', specimenId: 'BX202605020001', patientId: 'P001', patientName: '张伟', gender: '男', age: 58, specimenType: '手术标本', specimenSource: '右下肺叶', clinicalDiagnosis: '右肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-05-02 08:30', receiveTime: '2025-05-02 09:15', status: '已完成', priority: '普通', reportTime: '2025-05-03 14:20' },
  { id: 'S002', specimenId: 'BX202605020002', patientId: 'P002', patientName: '李娜', gender: '女', age: 45, specimenType: '常规活检', specimenSource: '左侧乳腺肿块', clinicalDiagnosis: '左乳肿块待查', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-02 10:00', receiveTime: '2025-05-02 10:45', status: '审核中', priority: '紧急' },
  { id: 'S003', specimenId: 'BX202605020003', patientId: 'P003', patientName: '王芳', gender: '女', age: 52, specimenType: '常规活检', specimenSource: '胃窦粘膜', clinicalDiagnosis: '胃窦溃疡', department: '消化内科', doctor: '张建华', collectTime: '2025-05-02 09:00', receiveTime: '2025-05-02 09:30', status: '阅片中', priority: '普通' },
  { id: 'S004', specimenId: 'BX202605020004', patientId: 'P004', patientName: '刘强', gender: '男', age: 67, specimenType: '手术标本', specimenSource: '直肠肿块', clinicalDiagnosis: '直肠癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-05-02 07:45', receiveTime: '2025-05-02 08:30', status: '制片中', priority: '普通' },
  { id: 'S005', specimenId: 'BX202605020005', patientId: 'P005', patientName: '陈静', gender: '女', age: 38, specimenType: '常规活检', specimenSource: '宫颈组织', clinicalDiagnosis: '宫颈赘生物', department: '妇科', doctor: '刘雅琴', collectTime: '2025-05-02 11:00', receiveTime: '2025-05-02 11:30', status: '已接收', priority: '普通' },
  { id: 'S006', specimenId: 'BX202605020006', patientId: 'P006', patientName: '赵军', gender: '男', age: 72, specimenType: '手术标本', specimenSource: '右肾', clinicalDiagnosis: '右肾肿瘤', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-02 08:00', receiveTime: '2025-05-02 08:40', status: '已完成', priority: '普通', reportTime: '2025-05-03 10:00' },
  { id: 'S007', specimenId: 'BX202605020007', patientId: 'P007', patientName: '周婷', gender: '女', age: 33, specimenType: '常规活检', specimenSource: '背部皮肤', clinicalDiagnosis: '皮肤肿块', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-05-02 14:00', receiveTime: '2025-05-02 14:20', status: '待接收', priority: '普通' },
  { id: 'S008', specimenId: 'BX202605020008', patientId: 'P008', patientName: '吴磊', gender: '男', age: 55, specimenType: '手术标本', specimenSource: '左股骨肿块', clinicalDiagnosis: '骨肿瘤待查', department: '骨科', doctor: '周大伟', collectTime: '2025-05-02 07:30', receiveTime: '2025-05-02 08:00', status: '已完成', priority: '紧急', reportTime: '2025-05-02 16:30' },
  { id: 'S009', specimenId: 'BX202605020009', patientId: 'P009', patientName: '孙燕', gender: '女', age: 61, specimenType: '细胞学', specimenSource: '胸腔积液', clinicalDiagnosis: '胸腔积液查因', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-05-02 09:30', receiveTime: '2025-05-02 10:00', status: '已切片', priority: '紧急' },
  { id: 'S010', specimenId: 'BX202605020010', patientId: 'P010', patientName: '郑明', gender: '男', age: 48, specimenType: '手术标本', specimenSource: '肝右叶', clinicalDiagnosis: '肝占位', department: '肝胆外科', doctor: '马立军', collectTime: '2025-05-02 08:15', receiveTime: '2025-05-02 09:00', status: '已完成', priority: '普通', reportTime: '2025-05-03 09:00' },
  { id: 'S011', specimenId: 'BX202605020011', patientId: 'P011', patientName: '黄丽', gender: '女', age: 42, specimenType: '免疫组化', specimenSource: '右乳肿块', clinicalDiagnosis: '右乳浸润性癌', department: '肿瘤内科', doctor: '王秀芬', collectTime: '2025-05-01 10:00', receiveTime: '2025-05-01 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-02 15:00' },
  { id: 'S012', specimenId: 'BX202605020012', patientId: 'P012', patientName: '徐鹏', gender: '男', age: 63, specimenType: '冰冻切片', specimenSource: '右心房肿物', clinicalDiagnosis: '心脏占位待查', department: '心内科', doctor: '刘德明', collectTime: '2025-05-02 15:30', receiveTime: '2025-05-02 15:35', status: '已完成', priority: '冰冻', reportTime: '2025-05-02 16:05' },
  { id: 'S013', specimenId: 'BX202605020013', patientId: 'P013', patientName: '马超', gender: '男', age: 29, specimenType: '细胞学', specimenSource: '颈部淋巴结', clinicalDiagnosis: '淋巴结肿大', department: '急诊科', doctor: '张志伟', collectTime: '2025-05-02 16:00', receiveTime: '2025-05-02 16:20', status: '已接收', priority: '紧急' },
  { id: 'S014', specimenId: 'BX202605020014', patientId: 'P014', patientName: '林梅', gender: '女', age: 56, specimenType: '常规活检', specimenSource: '甲状腺左叶', clinicalDiagnosis: '甲状腺结节', department: '内分泌科', doctor: '陈美华', collectTime: '2025-05-02 10:30', receiveTime: '2025-05-02 11:00', status: '制片中', priority: '普通' },
  { id: 'S015', specimenId: 'BX202605020015', patientId: 'P015', patientName: '高峰', gender: '男', age: 71, specimenType: '手术标本', specimenSource: '右额叶脑组织', clinicalDiagnosis: '脑肿瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-05-02 07:00', receiveTime: '2025-05-02 07:30', status: '已完成', priority: '紧急', reportTime: '2025-05-02 14:00' },
  { id: 'S016', specimenId: 'BX202605030016', patientId: 'P016', patientName: '田华', gender: '女', age: 35, specimenType: '常规活检', specimenSource: '宫腔赘生物', clinicalDiagnosis: '子宫内膜息肉待查', department: '妇科', doctor: '李雅琴', collectTime: '2025-05-03 09:00', receiveTime: '2025-05-03 09:30', status: '已接收', priority: '普通' },
  { id: 'S017', specimenId: 'BX202605030017', patientId: 'P017', patientName: '周建平', gender: '男', age: 62, specimenType: '手术标本', specimenSource: '左上肺叶', clinicalDiagnosis: '左肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-05-03 08:00', receiveTime: '2025-05-03 08:40', status: '制片中', priority: '紧急' },
  { id: 'S018', specimenId: 'BX202605030018', patientId: 'P018', patientName: '吴秀英', gender: '女', age: 48, specimenType: '常规活检', specimenSource: '胃体粘膜', clinicalDiagnosis: '胃溃疡性质待查', department: '消化内科', doctor: '张建华', collectTime: '2025-05-03 10:00', receiveTime: '2025-05-03 10:30', status: '阅片中', priority: '普通' },
  { id: 'S019', specimenId: 'BX202605030019', patientId: 'P019', patientName: '马立军', gender: '男', age: 55, specimenType: '手术标本', specimenSource: '右膝肿块', clinicalDiagnosis: '骨肿瘤待查', department: '骨科', doctor: '周大伟', collectTime: '2025-05-03 07:30', receiveTime: '2025-05-03 08:00', status: '已切片', priority: '普通' },
  { id: 'S020', specimenId: 'BX202605030020', patientId: 'P020', patientName: '王秀芬', gender: '女', age: 41, specimenType: '常规活检', specimenSource: '右乳肿块', clinicalDiagnosis: '右乳肿块BI-RADS 4A', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-03 11:00', receiveTime: '2025-05-03 11:30', status: '已接收', priority: '紧急' },
  { id: 'S021', specimenId: 'BX202605030021', patientId: 'P021', patientName: '李天山', gender: '男', age: 68, specimenType: '细胞学', specimenSource: '痰液', clinicalDiagnosis: '右下肺占位', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-05-03 08:30', receiveTime: '2025-05-03 09:00', status: '制片中', priority: '紧急' },
  { id: 'S022', specimenId: 'BX202605030022', patientId: 'P022', patientName: '陈美娟', gender: '女', age: 39, specimenType: '常规活检', specimenSource: '宫颈活检', clinicalDiagnosis: 'CIN待排', department: '妇科', doctor: '刘雅琴', collectTime: '2025-05-03 14:00', receiveTime: '2025-05-03 14:20', status: '已接收', priority: '普通' },
  { id: 'S023', specimenId: 'BX202605030023', patientId: 'P023', patientName: '赵志刚', gender: '男', age: 52, specimenType: '手术标本', specimenSource: '前列腺', clinicalDiagnosis: '前列腺癌', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-03 08:15', receiveTime: '2025-05-03 08:45', status: '制片中', priority: '普通' },
  { id: 'S024', specimenId: 'BX202605030024', patientId: 'P024', patientName: '孙丽华', gender: '女', age: 44, specimenType: '常规活检', specimenSource: '左小腿皮肤', clinicalDiagnosis: '皮肤黑痣增大', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-05-03 15:00', receiveTime: '2025-05-03 15:20', status: '待接收', priority: '普通' },
  { id: 'S025', specimenId: 'BX202605030025', patientId: 'P025', patientName: '杨大海', gender: '男', age: 73, specimenType: '手术标本', specimenSource: '左颞叶脑组织', clinicalDiagnosis: '脑肿瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-05-03 07:00', receiveTime: '2025-05-03 07:30', status: '已切片', priority: '紧急' },
  { id: 'S026', specimenId: 'BX202605030026', patientId: 'P026', patientName: '郑小丽', gender: '女', age: 31, specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '全血细胞减少待查', department: '血液科', doctor: '陈建新', collectTime: '2025-05-03 10:00', receiveTime: '2025-05-03 10:20', status: '制片中', priority: '紧急' },
  { id: 'S027', specimenId: 'BX202605030027', patientId: 'P027', patientName: '钱文华', gender: '男', age: 59, specimenType: '手术标本', specimenSource: '肝左叶', clinicalDiagnosis: '肝血管瘤', department: '肝胆外科', doctor: '马立军', collectTime: '2025-05-03 08:00', receiveTime: '2025-05-03 08:30', status: '已完成', priority: '普通', reportTime: '2025-05-04 10:00' },
  { id: 'S028', specimenId: 'BX202605030028', patientId: 'P028', patientName: '周志明', gender: '男', age: 64, specimenType: '常规活检', specimenSource: '右心房肿物穿刺', clinicalDiagnosis: '心脏占位待查', department: '心内科', doctor: '刘德明', collectTime: '2025-05-03 14:00', receiveTime: '2025-05-03 14:20', status: '已接收', priority: '冰冻' },
  { id: 'S029', specimenId: 'BX202605030029', patientId: 'P029', patientName: '吴晓东', gender: '男', age: 47, specimenType: '手术标本', specimenSource: '横结肠肿块', clinicalDiagnosis: '结肠癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-05-03 07:30', receiveTime: '2025-05-03 08:00', status: '制片中', priority: '普通' },
  { id: 'S030', specimenId: 'BX202605030030', patientId: 'P030', patientName: '郑美丽', gender: '女', age: 54, specimenType: '免疫组化', specimenSource: '左乳肿块', clinicalDiagnosis: '左乳浸润性癌术后', department: '肿瘤内科', doctor: '王秀芬', collectTime: '2025-05-02 10:00', receiveTime: '2025-05-02 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-03 14:00' },
  { id: 'S031', specimenId: 'BX202605030031', patientId: 'P031', patientName: '冯志强', gender: '男', age: 45, specimenType: '常规活检', specimenSource: '右下肺穿刺', clinicalDiagnosis: '右下肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-05-03 15:00', receiveTime: '2025-05-03 15:30', status: '待接收', priority: '紧急' },
  { id: 'S032', specimenId: 'BX202605030032', patientId: 'P032', patientName: '曹雪梅', gender: '女', age: 36, specimenType: '常规活检', specimenSource: '甲状腺右叶', clinicalDiagnosis: '甲状腺结节TI-RADS 4类', department: '内分泌科', doctor: '陈美华', collectTime: '2025-05-03 11:00', receiveTime: '2025-05-03 11:30', status: '已接收', priority: '普通' },
  { id: 'S033', specimenId: 'BX202605030033', patientId: 'P033', patientName: '丁建新', gender: '男', age: 60, specimenType: '手术标本', specimenSource: '胸椎肿块', clinicalDiagnosis: '胸椎肿瘤', department: '骨科', doctor: '周大伟', collectTime: '2025-05-03 07:00', receiveTime: '2025-05-03 07:30', status: '制片中', priority: '紧急' },
  { id: 'S034', specimenId: 'BX202605030034', patientId: 'P034', patientName: '孙佳欣', gender: '女', age: 28, specimenType: '常规活检', specimenSource: '卵巢囊肿壁', clinicalDiagnosis: '卵巢囊肿', department: '妇科', doctor: '李雅琴', collectTime: '2025-05-03 14:00', receiveTime: '2025-05-03 14:20', status: '已切片', priority: '普通' },
  { id: 'S035', specimenId: 'BX202605030035', patientId: 'P035', patientName: '徐志强', gender: '男', age: 65, specimenType: '手术标本', specimenSource: '右肾', clinicalDiagnosis: '右肾肿瘤', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-03 08:00', receiveTime: '2025-05-03 08:30', status: '已完成', priority: '普通', reportTime: '2025-05-04 11:00' },
  { id: 'S036', specimenId: 'BX202605030036', patientId: 'P036', patientName: '韩丽娜', gender: '女', age: 50, specimenType: '常规活检', specimenSource: '左腋窝淋巴结', clinicalDiagnosis: '左腋窝淋巴结肿大', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-03 10:00', receiveTime: '2025-05-03 10:30', status: '阅片中', priority: '紧急' },
  { id: 'S037', specimenId: 'BX202605030037', patientId: 'P037', patientName: '黄志勇', gender: '男', age: 57, specimenType: '常规活检', specimenSource: '食管粘膜', clinicalDiagnosis: '食管溃疡', department: '消化内科', doctor: '张建华', collectTime: '2025-05-03 09:00', receiveTime: '2025-05-03 09:30', status: '已接收', priority: '普通' },
  { id: 'S038', specimenId: 'BX202605030038', patientId: 'P038', patientName: '周艳艳', gender: '女', age: 43, specimenType: '常规活检', specimenSource: '背部皮肤活检', clinicalDiagnosis: '皮肤溃疡', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-05-03 15:00', receiveTime: '2025-05-03 15:20', status: '待接收', priority: '普通' },
  { id: 'S039', specimenId: 'BX202605030039', patientId: 'P039', patientName: '吴海涛', gender: '男', age: 70, specimenType: '手术标本', specimenSource: '左顶叶脑组织', clinicalDiagnosis: '脑肿瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-05-03 07:00', receiveTime: '2025-05-03 07:30', status: '制片中', priority: '紧急' },
  { id: 'S040', specimenId: 'BX202605030040', patientId: 'P040', patientName: '刘凤英', gender: '女', age: 46, specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '贫血原因待查', department: '血液科', doctor: '陈建新', collectTime: '2025-05-03 10:00', receiveTime: '2025-05-03 10:20', status: '已接收', priority: '普通' },
  { id: 'S041', specimenId: 'BX202605030041', patientId: 'P041', patientName: '陈国栋', gender: '男', age: 53, specimenType: '常规活检', specimenSource: '心包活检', clinicalDiagnosis: '心包增厚待查', department: '心内科', doctor: '刘德明', collectTime: '2025-05-03 14:00', receiveTime: '2025-05-03 14:20', status: '已切片', priority: '普通' },
  { id: 'S042', specimenId: 'BX202605030042', patientId: 'P042', patientName: '林晓晓', gender: '女', age: 32, specimenType: '细胞学', specimenSource: '腹腔积液', clinicalDiagnosis: '腹腔积液查因', department: '急诊科', doctor: '张志伟', collectTime: '2025-05-03 16:00', receiveTime: '2025-05-03 16:20', status: '已接收', priority: '紧急' },
  { id: 'S043', specimenId: 'BX202605030043', patientId: 'P043', patientName: '赵新建', gender: '男', age: 66, specimenType: '冰冻切片', specimenSource: '右肺结节', clinicalDiagnosis: '右肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-05-03 09:00', receiveTime: '2025-05-03 09:10', status: '已完成', priority: '冰冻', reportTime: '2025-05-03 09:40' },
  { id: 'S044', specimenId: 'BX202605030044', patientId: 'P044', patientName: '马琳娜', gender: '女', age: 49, specimenType: '免疫组化', specimenSource: '右乳肿块', clinicalDiagnosis: '右乳浸润性癌', department: '肿瘤内科', doctor: '王秀芬', collectTime: '2025-05-02 10:00', receiveTime: '2025-05-02 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-03 16:00' },
  { id: 'S045', specimenId: 'BX202605030045', patientId: 'P045', patientName: '刘海波', gender: '男', age: 58, specimenType: '手术标本', specimenSource: '胆囊', clinicalDiagnosis: '胆囊占位', department: '肝胆外科', doctor: '马立军', collectTime: '2025-05-03 08:00', receiveTime: '2025-05-03 08:30', status: '制片中', priority: '普通' },
  { id: 'S046', specimenId: 'BX202605030046', patientId: 'P046', patientName: '邓秀英', gender: '女', age: 37, specimenType: '常规活检', specimenSource: '子宫内膜', clinicalDiagnosis: '异常子宫出血', department: '妇科', doctor: '李雅琴', collectTime: '2025-05-03 11:00', receiveTime: '2025-05-03 11:20', status: '已接收', priority: '普通' },
  { id: 'S047', specimenId: 'BX202605030047', patientId: 'P047', patientName: '姜志远', gender: '男', age: 61, specimenType: '手术标本', specimenSource: '左肩胛骨肿块', clinicalDiagnosis: '骨肿瘤待查', department: '骨科', doctor: '周大伟', collectTime: '2025-05-03 07:30', receiveTime: '2025-05-03 08:00', status: '已完成', priority: '普通', reportTime: '2025-05-03 14:00' },
  { id: 'S048', specimenId: 'BX202605030048', patientId: 'P048', patientName: '段丽华', gender: '女', age: 40, specimenType: '常规活检', specimenSource: '右乳', clinicalDiagnosis: '右乳肿块BI-RADS 4B', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-03 14:00', receiveTime: '2025-05-03 14:30', status: '阅片中', priority: '紧急' },
  { id: 'S049', specimenId: 'BX202605030049', patientId: 'P049', patientName: '贾志明', gender: '男', age: 69, specimenType: '手术标本', specimenSource: '膀胱肿物', clinicalDiagnosis: '膀胱癌', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-03 08:00', receiveTime: '2025-05-03 08:30', status: '制片中', priority: '普通' },
  { id: 'S050', specimenId: 'BX202605030050', patientId: 'P050', patientName: '龚晓燕', gender: '女', age: 34, specimenType: '细胞学', specimenSource: '肺泡灌洗液', clinicalDiagnosis: '肺部感染待查', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-05-03 10:00', receiveTime: '2025-05-03 10:20', status: '已切片', priority: '普通' },
  { id: 'S051', specimenId: 'BX202604280051', patientId: 'P001', patientName: '张伟', gender: '男', age: 58, specimenType: '分子病理', specimenSource: '右下肺叶', clinicalDiagnosis: '右肺腺癌术后', department: '胸外科', doctor: '李明华', collectTime: '2025-04-28 08:00', receiveTime: '2025-04-28 08:30', status: '已完成', priority: '普通', reportTime: '2025-04-29 12:00' },
  { id: 'S052', specimenId: 'BX202604280052', patientId: 'P002', patientName: '李娜', gender: '女', age: 45, specimenType: '分子病理', specimenSource: '左乳肿块', clinicalDiagnosis: '左乳浸润性癌', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-04-28 10:00', receiveTime: '2025-04-28 10:30', status: '已完成', priority: '紧急', reportTime: '2025-04-29 15:00' },
  { id: 'S053', specimenId: 'BX202604280053', patientId: 'P003', patientName: '王芳', gender: '女', age: 52, specimenType: '手术标本', specimenSource: '胃窦', clinicalDiagnosis: '胃腺癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-04-28 07:30', receiveTime: '2025-04-28 08:00', status: '已完成', priority: '普通', reportTime: '2025-04-29 14:00' },
  { id: 'S054', specimenId: 'BX202604280054', patientId: 'P004', patientName: '刘强', gender: '男', age: 67, specimenType: '手术标本', specimenSource: '直肠', clinicalDiagnosis: '直肠腺癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-04-28 07:00', receiveTime: '2025-04-28 07:30', status: '已完成', priority: '普通', reportTime: '2025-04-29 10:00' },
  { id: 'S055', specimenId: 'BX202604280055', patientId: 'P005', patientName: '陈静', gender: '女', age: 38, specimenType: '常规活检', specimenSource: '宫颈赘生物', clinicalDiagnosis: '宫颈息肉', department: '妇科', doctor: '刘雅琴', collectTime: '2025-04-28 14:00', receiveTime: '2025-04-28 14:20', status: '已完成', priority: '普通', reportTime: '2025-04-29 09:00' },
  { id: 'S056', specimenId: 'BX202604280056', patientId: 'P006', patientName: '赵军', gender: '男', age: 72, specimenType: '免疫组化', specimenSource: '右肾肿块', clinicalDiagnosis: '右肾肿瘤', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-04-27 10:00', receiveTime: '2025-04-27 10:30', status: '已完成', priority: '普通', reportTime: '2025-04-28 15:00' },
  { id: 'S057', specimenId: 'BX202604280057', patientId: 'P007', patientName: '周婷', gender: '女', age: 33, specimenType: '常规活检', specimenSource: '皮肤肿块', clinicalDiagnosis: '皮肤纤维瘤', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-04-28 15:00', receiveTime: '2025-04-28 15:20', status: '已完成', priority: '普通', reportTime: '2025-04-29 10:30' },
  { id: 'S058', specimenId: 'BX202604280058', patientId: 'P008', patientName: '吴磊', gender: '男', age: 55, specimenType: '冰冻切片', specimenSource: '左股骨肿物', clinicalDiagnosis: '骨肿瘤待查', department: '骨科', doctor: '周大伟', collectTime: '2025-04-28 08:00', receiveTime: '2025-04-28 08:10', status: '已完成', priority: '冰冻', reportTime: '2025-04-28 08:40' },
  { id: 'S059', specimenId: 'BX202604280059', patientId: 'P009', patientName: '孙燕', gender: '女', age: 61, specimenType: '细胞学', specimenSource: '胸腔积液', clinicalDiagnosis: '肺腺癌伴胸腔转移', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-04-28 09:00', receiveTime: '2025-04-28 09:20', status: '已完成', priority: '紧急', reportTime: '2025-04-28 14:00' },
  { id: 'S060', specimenId: 'BX202604280060', patientId: 'P010', patientName: '郑明', gender: '男', age: 48, specimenType: '分子病理', specimenSource: '肝右叶', clinicalDiagnosis: '肝细胞癌', department: '肝胆外科', doctor: '马立军', collectTime: '2025-04-27 08:00', receiveTime: '2025-04-27 08:30', status: '已完成', priority: '普通', reportTime: '2025-04-28 12:00' },
  { id: 'S061', specimenId: 'BX202604280061', patientId: 'P011', patientName: '黄丽', gender: '女', age: 42, specimenType: '手术标本', specimenSource: '右乳改良根治标本', clinicalDiagnosis: '右乳浸润性癌', department: '乳腺外科', doctor: '王秀芬', collectTime: '2025-04-27 07:30', receiveTime: '2025-04-27 08:00', status: '已完成', priority: '紧急', reportTime: '2025-04-28 14:00' },
  { id: 'S062', specimenId: 'BX202604280062', patientId: 'P012', patientName: '徐鹏', gender: '男', age: 63, specimenType: '手术标本', specimenSource: '心脏粘液瘤', clinicalDiagnosis: '心脏粘液瘤', department: '心外科', doctor: '刘德明', collectTime: '2025-04-28 07:00', receiveTime: '2025-04-28 07:30', status: '已完成', priority: '紧急', reportTime: '2025-04-28 12:00' },
  { id: 'S063', specimenId: 'BX202604280063', patientId: 'P013', patientName: '马超', gender: '男', age: 29, specimenType: '常规活检', specimenSource: '颈部淋巴结', clinicalDiagnosis: '淋巴结肿大待查', department: '血液科', doctor: '陈建新', collectTime: '2025-04-28 10:00', receiveTime: '2025-04-28 10:20', status: '已完成', priority: '紧急', reportTime: '2025-04-29 09:00' },
  { id: 'S064', specimenId: 'BX202604280064', patientId: 'P014', patientName: '林梅', gender: '女', age: 56, specimenType: '常规活检', specimenSource: '甲状腺右叶', clinicalDiagnosis: '甲状腺乳头状癌待排', department: '内分泌科', doctor: '陈美华', collectTime: '2025-04-28 11:00', receiveTime: '2025-04-28 11:30', status: '已完成', priority: '普通', reportTime: '2025-04-29 10:00' },
  { id: 'S065', specimenId: 'BX202604280065', patientId: 'P015', patientName: '高峰', gender: '男', age: 71, specimenType: '免疫组化', specimenSource: '脑组织', clinicalDiagnosis: '脑胶质母细胞瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-04-27 10:00', receiveTime: '2025-04-27 10:30', status: '已完成', priority: '紧急', reportTime: '2025-04-28 14:00' },
  { id: 'S066', specimenId: 'BX202604290066', patientId: 'P016', patientName: '田华', gender: '女', age: 35, specimenType: '常规活检', specimenSource: '子宫内膜', clinicalDiagnosis: '子宫内膜增厚', department: '妇科', doctor: '李雅琴', collectTime: '2025-04-29 09:00', receiveTime: '2025-04-29 09:20', status: '已完成', priority: '普通', reportTime: '2025-04-30 10:00' },
  { id: 'S067', specimenId: 'BX202604290067', patientId: 'P017', patientName: '周建平', gender: '男', age: 62, specimenType: '常规活检', specimenSource: '左肺穿刺', clinicalDiagnosis: '左肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-04-29 14:00', receiveTime: '2025-04-29 14:30', status: '已完成', priority: '紧急', reportTime: '2025-04-30 11:00' },
  { id: 'S068', specimenId: 'BX202604290068', patientId: 'P018', patientName: '吴秀英', gender: '女', age: 48, specimenType: '手术标本', specimenSource: '胃大部分切除', clinicalDiagnosis: '胃窦癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-04-29 07:30', receiveTime: '2025-04-29 08:00', status: '已完成', priority: '普通', reportTime: '2025-04-30 14:00' },
  { id: 'S069', specimenId: 'BX202604290069', patientId: 'P019', patientName: '马立军', gender: '男', age: 55, specimenType: '手术标本', specimenSource: '左膝肿物', clinicalDiagnosis: '左膝骨巨细胞瘤', department: '骨科', doctor: '周大伟', collectTime: '2025-04-29 07:00', receiveTime: '2025-04-29 07:30', status: '已完成', priority: '普通', reportTime: '2025-04-30 10:00' },
  { id: 'S070', specimenId: 'BX202604290070', patientId: 'P020', patientName: '王秀芬', gender: '女', age: 41, specimenType: '手术标本', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-04-29 07:00', receiveTime: '2025-04-29 07:30', status: '已完成', priority: '紧急', reportTime: '2025-04-30 12:00' },
  { id: 'S071', specimenId: 'BX202604290071', patientId: 'P021', patientName: '李天山', gender: '男', age: 68, specimenType: '分子病理', specimenSource: '右下肺', clinicalDiagnosis: '右肺腺癌', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-04-28 08:00', receiveTime: '2025-04-28 08:30', status: '已完成', priority: '紧急', reportTime: '2025-04-29 16:00' },
  { id: 'S072', specimenId: 'BX202604290072', patientId: 'P022', patientName: '陈美娟', gender: '女', age: 39, specimenType: '免疫组化', specimenSource: '宫颈', clinicalDiagnosis: '宫颈鳞癌', department: '妇科', doctor: '刘雅琴', collectTime: '2025-04-28 10:00', receiveTime: '2025-04-28 10:30', status: '已完成', priority: '紧急', reportTime: '2025-04-29 15:00' },
  { id: 'S073', specimenId: 'BX202604290073', patientId: 'P023', patientName: '赵志刚', gender: '男', age: 52, specimenType: '常规活检', specimenSource: '前列腺穿刺', clinicalDiagnosis: '前列腺癌待排', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-04-29 14:00', receiveTime: '2025-04-29 14:20', status: '已完成', priority: '普通', reportTime: '2025-04-30 10:00' },
  { id: 'S074', specimenId: 'BX202604290074', patientId: 'P024', patientName: '孙丽华', gender: '女', age: 44, specimenType: '常规活检', specimenSource: '右小腿皮肤', clinicalDiagnosis: '皮肤恶性黑色素瘤待排', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-04-29 15:00', receiveTime: '2025-04-29 15:20', status: '已完成', priority: '紧急', reportTime: '2025-04-30 11:00' },
  { id: 'S075', specimenId: 'BX202604290075', patientId: 'P025', patientName: '杨大海', gender: '男', age: 73, specimenType: '手术标本', specimenSource: '右颞叶脑组织', clinicalDiagnosis: '右颞叶胶质母细胞瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-04-29 07:00', receiveTime: '2025-04-29 07:30', status: '已完成', priority: '紧急', reportTime: '2025-04-30 12:00' },
  { id: 'S076', specimenId: 'BX202604290076', patientId: 'P026', patientName: '郑小丽', gender: '女', age: 31, specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '全血细胞减少', department: '血液科', doctor: '陈建新', collectTime: '2025-04-29 10:00', receiveTime: '2025-04-29 10:20', status: '已完成', priority: '紧急', reportTime: '2025-04-30 14:00' },
  { id: 'S077', specimenId: 'BX202604290077', patientId: 'P027', patientName: '钱文华', gender: '男', age: 59, specimenType: '冰冻切片', specimenSource: '肝左叶', clinicalDiagnosis: '肝占位', department: '肝胆外科', doctor: '马立军', collectTime: '2025-04-29 08:00', receiveTime: '2025-04-29 08:10', status: '已完成', priority: '冰冻', reportTime: '2025-04-29 08:40' },
  { id: 'S078', specimenId: 'BX202604290078', patientId: 'P028', patientName: '周志明', gender: '男', age: 64, specimenType: '手术标本', specimenSource: '心脏粘液瘤', clinicalDiagnosis: '心脏占位', department: '心外科', doctor: '刘德明', collectTime: '2025-04-29 07:00', receiveTime: '2025-04-29 07:30', status: '已完成', priority: '紧急', reportTime: '2025-04-29 12:00' },
  { id: 'S079', specimenId: 'BX202604290079', patientId: 'P029', patientName: '吴晓东', gender: '男', age: 47, specimenType: '常规活检', specimenSource: '结肠镜活检', clinicalDiagnosis: '结肠癌待排', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-04-29 11:00', receiveTime: '2025-04-29 11:30', status: '已完成', priority: '普通', reportTime: '2025-04-30 10:00' },
  { id: 'S080', specimenId: 'BX202604290080', patientId: 'P030', patientName: '郑美丽', gender: '女', age: 54, specimenType: '手术标本', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌', department: '乳腺外科', doctor: '王秀芬', collectTime: '2025-04-29 07:30', receiveTime: '2025-04-29 08:00', status: '已完成', priority: '紧急', reportTime: '2025-04-30 11:00' },
  { id: 'S081', specimenId: 'BX202604300081', patientId: 'P031', patientName: '冯志强', gender: '男', age: 45, specimenType: '冰冻切片', specimenSource: '右下肺', clinicalDiagnosis: '右肺占位', department: '胸外科', doctor: '李明华', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:10', status: '已完成', priority: '冰冻', reportTime: '2025-04-30 08:40' },
  { id: 'S082', specimenId: 'BX202604300082', patientId: 'P032', patientName: '曹雪梅', gender: '女', age: 36, specimenType: '常规活检', specimenSource: '甲状腺', clinicalDiagnosis: '甲状腺乳头状癌', department: '内分泌科', doctor: '陈美华', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 11:00' },
  { id: 'S083', specimenId: 'BX202604300083', patientId: 'P033', patientName: '丁建新', gender: '男', age: 60, specimenType: '手术标本', specimenSource: '胸椎', clinicalDiagnosis: '胸椎转移瘤', department: '骨科', doctor: '周大伟', collectTime: '2025-04-30 07:00', receiveTime: '2025-04-30 07:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 10:00' },
  { id: 'S084', specimenId: 'BX202604300084', patientId: 'P034', patientName: '孙佳欣', gender: '女', age: 28, specimenType: '常规活检', specimenSource: '右卵巢', clinicalDiagnosis: '卵巢畸胎瘤', department: '妇科', doctor: '李雅琴', collectTime: '2025-04-30 14:00', receiveTime: '2025-04-30 14:20', status: '已完成', priority: '普通', reportTime: '2025-05-01 10:30' },
  { id: 'S085', specimenId: 'BX202604300085', patientId: 'P035', patientName: '徐志强', gender: '男', age: 65, specimenType: '免疫组化', specimenSource: '右肾', clinicalDiagnosis: '右肾透明细胞癌', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-04-29 10:00', receiveTime: '2025-04-29 10:30', status: '已完成', priority: '普通', reportTime: '2025-04-30 15:00' },
  { id: 'S086', specimenId: 'BX202604300086', patientId: 'P036', patientName: '韩丽娜', gender: '女', age: 50, specimenType: '分子病理', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-04-29 08:00', receiveTime: '2025-04-29 08:30', status: '已完成', priority: '紧急', reportTime: '2025-04-30 16:00' },
  { id: 'S087', specimenId: 'BX202604300087', patientId: 'P037', patientName: '黄志勇', gender: '男', age: 57, specimenType: '手术标本', specimenSource: '食管', clinicalDiagnosis: '食管鳞状细胞癌', department: '胸外科', doctor: '李明华', collectTime: '2025-04-30 07:30', receiveTime: '2025-04-30 08:00', status: '已完成', priority: '普通', reportTime: '2025-05-01 14:00' },
  { id: 'S088', specimenId: 'BX202604300088', patientId: 'P038', patientName: '周艳艳', gender: '女', age: 43, specimenType: '常规活检', specimenSource: '皮肤', clinicalDiagnosis: '皮肤鳞状细胞癌', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-04-30 15:00', receiveTime: '2025-04-30 15:20', status: '已完成', priority: '普通', reportTime: '2025-05-01 11:00' },
  { id: 'S089', specimenId: 'BX202604300089', patientId: 'P039', patientName: '吴海涛', gender: '男', age: 70, specimenType: '免疫组化', specimenSource: '脑组织', clinicalDiagnosis: '左顶叶星形细胞瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-04-29 10:00', receiveTime: '2025-04-29 10:30', status: '已完成', priority: '普通', reportTime: '2025-04-30 14:00' },
  { id: 'S090', specimenId: 'BX202604300090', patientId: 'P040', patientName: '刘凤英', gender: '女', age: 46, specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '骨髓增生异常综合征', department: '血液科', doctor: '陈建新', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:20', status: '已完成', priority: '紧急', reportTime: '2025-05-01 15:00' },
  { id: 'S091', specimenId: 'BX202605010091', patientId: 'P041', patientName: '陈国栋', gender: '男', age: 53, specimenType: '细胞学', specimenSource: '心包积液', clinicalDiagnosis: '心包积液查因', department: '心内科', doctor: '刘德明', collectTime: '2025-05-01 14:00', receiveTime: '2025-05-01 14:20', status: '已完成', priority: '紧急', reportTime: '2025-05-01 17:00' },
  { id: 'S092', specimenId: 'BX202605010092', patientId: 'P042', patientName: '林晓晓', gender: '女', age: 32, specimenType: '常规活检', specimenSource: '腹腔肿物', clinicalDiagnosis: '腹腔占位', department: '急诊科', doctor: '张志伟', collectTime: '2025-05-01 16:00', receiveTime: '2025-05-01 16:20', status: '已完成', priority: '紧急', reportTime: '2025-05-02 11:00' },
  { id: 'S093', specimenId: 'BX202605010093', patientId: 'P043', patientName: '赵新建', gender: '男', age: 66, specimenType: '手术标本', specimenSource: '右肺上叶', clinicalDiagnosis: '右肺鳞状细胞癌', department: '胸外科', doctor: '李明华', collectTime: '2025-05-01 07:30', receiveTime: '2025-05-01 08:00', status: '已完成', priority: '普通', reportTime: '2025-05-02 14:00' },
  { id: 'S094', specimenId: 'BX202605010094', patientId: 'P044', patientName: '马琳娜', gender: '女', age: 49, specimenType: '常规活检', specimenSource: '右乳', clinicalDiagnosis: '右乳浸润性癌', department: '乳腺外科', doctor: '王秀芬', collectTime: '2025-05-01 10:00', receiveTime: '2025-05-01 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-02 12:00' },
  { id: 'S095', specimenId: 'BX202605010095', patientId: 'P045', patientName: '刘海波', gender: '男', age: 58, specimenType: '手术标本', specimenSource: '胆总管', clinicalDiagnosis: '胆管癌', department: '肝胆外科', doctor: '马立军', collectTime: '2025-05-01 07:00', receiveTime: '2025-05-01 07:30', status: '已完成', priority: '普通', reportTime: '2025-05-02 13:00' },
  { id: 'S096', specimenId: 'BX202605010096', patientId: 'P046', patientName: '邓秀英', gender: '女', age: 37, specimenType: '常规活检', specimenSource: '宫颈', clinicalDiagnosis: '宫颈赘生物', department: '妇科', doctor: '李雅琴', collectTime: '2025-05-01 11:00', receiveTime: '2025-05-01 11:20', status: '已完成', priority: '普通', reportTime: '2025-05-02 10:00' },
  { id: 'S097', specimenId: 'BX202605010097', patientId: 'P047', patientName: '姜志远', gender: '男', age: 61, specimenType: '分子病理', specimenSource: '左肩胛骨', clinicalDiagnosis: '左肩胛骨肉瘤', department: '骨科', doctor: '周大伟', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 16:00' },
  { id: 'S098', specimenId: 'BX202605010098', patientId: 'P048', patientName: '段丽华', gender: '女', age: 40, specimenType: '手术标本', specimenSource: '右乳', clinicalDiagnosis: '右乳导管内癌', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-01 07:30', receiveTime: '2025-05-01 08:00', status: '已完成', priority: '紧急', reportTime: '2025-05-02 11:00' },
  { id: 'S099', specimenId: 'BX202605010099', patientId: 'P049', patientName: '贾志明', gender: '男', age: 69, specimenType: '冰冻切片', specimenSource: '膀胱肿物', clinicalDiagnosis: '膀胱占位', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-01 08:00', receiveTime: '2025-05-01 08:10', status: '已完成', priority: '冰冻', reportTime: '2025-05-01 08:40' },
  { id: 'S100', specimenId: 'BX202605010100', patientId: 'P050', patientName: '龚晓燕', gender: '女', age: 34, specimenType: '常规活检', specimenSource: '支气管镜活检', clinicalDiagnosis: '右下肺不张', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-05-01 10:00', receiveTime: '2025-05-01 10:30', status: '已完成', priority: '普通', reportTime: '2025-05-02 10:00' },
  { id: 'S101', specimenId: 'BX202605010101', patientId: 'P001', patientName: '张伟', gender: '男', age: 58, specimenType: '常规活检', specimenSource: '肺门淋巴结', clinicalDiagnosis: '肺癌术后复查', department: '胸外科', doctor: '李明华', collectTime: '2025-05-01 09:00', receiveTime: '2025-05-01 09:20', status: '已完成', priority: '普通', reportTime: '2025-05-02 11:00' },
  { id: 'S102', specimenId: 'BX202605010102', patientId: 'P002', patientName: '李娜', gender: '女', age: 45, specimenType: '常规活检', specimenSource: '左乳', clinicalDiagnosis: '左乳癌术后复发待查', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-05-01 11:00', receiveTime: '2025-05-01 11:30', status: '已完成', priority: '紧急', reportTime: '2025-05-02 14:00' },
  { id: 'S103', specimenId: 'BX202605010103', patientId: 'P003', patientName: '王芳', gender: '女', age: 52, specimenType: '免疫组化', specimenSource: '胃窦', clinicalDiagnosis: '胃腺癌', department: '消化内科', doctor: '张建华', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 16:00' },
  { id: 'S104', specimenId: 'BX202605010104', patientId: 'P004', patientName: '刘强', gender: '男', age: 67, specimenType: '分子病理', specimenSource: '直肠', clinicalDiagnosis: '直肠腺癌', department: '胃肠外科', doctor: '陈志勇', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 15:00' },
  { id: 'S105', specimenId: 'BX202605010105', patientId: 'P005', patientName: '陈静', gender: '女', age: 38, specimenType: '手术标本', specimenSource: '子宫及双附件', clinicalDiagnosis: '子宫肌瘤', department: '妇科', doctor: '刘雅琴', collectTime: '2025-05-01 07:30', receiveTime: '2025-05-01 08:00', status: '已完成', priority: '普通', reportTime: '2025-05-02 10:00' },
  { id: 'S106', specimenId: 'BX202605010106', patientId: 'P006', patientName: '赵军', gender: '男', age: 72, specimenType: '常规活检', specimenSource: '左肾穿刺', clinicalDiagnosis: '左肾肿瘤', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-01 14:00', receiveTime: '2025-05-01 14:20', status: '已完成', priority: '普通', reportTime: '2025-05-02 11:00' },
  { id: 'S107', specimenId: 'BX202605010107', patientId: 'P007', patientName: '周婷', gender: '女', age: 33, specimenType: '手术标本', specimenSource: '背部肿物', clinicalDiagnosis: '皮肤纤维肉瘤', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-05-01 15:00', receiveTime: '2025-05-01 15:20', status: '已完成', priority: '普通', reportTime: '2025-05-02 14:00' },
  { id: 'S108', specimenId: 'BX202605010108', patientId: 'P008', patientName: '吴磊', gender: '男', age: 55, specimenType: '常规活检', specimenSource: '左股骨', clinicalDiagnosis: '骨巨细胞瘤复发', department: '骨科', doctor: '周大伟', collectTime: '2025-05-01 10:00', receiveTime: '2025-05-01 10:30', status: '已完成', priority: '普通', reportTime: '2025-05-02 11:30' },
  { id: 'S109', specimenId: 'BX202605010109', patientId: 'P009', patientName: '孙燕', gender: '女', age: 61, specimenType: '分子病理', specimenSource: '胸腔积液细胞块', clinicalDiagnosis: '肺腺癌伴胸膜转移', department: '呼吸内科', doctor: '李雪梅', collectTime: '2025-04-30 09:00', receiveTime: '2025-04-30 09:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 14:00' },
  { id: 'S110', specimenId: 'BX202605010110', patientId: 'P010', patientName: '郑明', gender: '男', age: 48, specimenType: '免疫组化', specimenSource: '肝右叶', clinicalDiagnosis: '肝细胞癌', department: '肝胆外科', doctor: '马立军', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 15:00' },
  { id: 'S111', specimenId: 'BX202605010111', patientId: 'P011', patientName: '黄丽', gender: '女', age: 42, specimenType: '常规活检', specimenSource: '右乳', clinicalDiagnosis: '右乳癌术后皮肤转移', department: '肿瘤内科', doctor: '王秀芬', collectTime: '2025-05-01 11:00', receiveTime: '2025-05-01 11:30', status: '已完成', priority: '紧急', reportTime: '2025-05-02 13:00' },
  { id: 'S112', specimenId: 'BX202605010112', patientId: 'P012', patientName: '徐鹏', gender: '男', age: 63, specimenType: '细胞学', specimenSource: '心包积液', clinicalDiagnosis: '心包积液查因', department: '心内科', doctor: '刘德明', collectTime: '2025-05-01 15:00', receiveTime: '2025-05-01 15:20', status: '已完成', priority: '紧急', reportTime: '2025-05-01 17:30' },
  { id: 'S113', specimenId: 'BX202605010113', patientId: 'P013', patientName: '马超', gender: '男', age: 29, specimenType: '分子病理', specimenSource: '颈部淋巴结', clinicalDiagnosis: '弥漫大B细胞淋巴瘤', department: '血液科', doctor: '陈建新', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 16:00' },
  { id: 'S114', specimenId: 'BX202605010114', patientId: 'P014', patientName: '林梅', gender: '女', age: 56, specimenType: '手术标本', specimenSource: '甲状腺全切', clinicalDiagnosis: '甲状腺乳头状癌', department: '内分泌科', doctor: '陈美华', collectTime: '2025-05-01 07:30', receiveTime: '2025-05-01 08:00', status: '已完成', priority: '普通', reportTime: '2025-05-02 10:00' },
  { id: 'S115', specimenId: 'BX202605010115', patientId: 'P015', patientName: '高峰', gender: '男', age: 71, specimenType: '常规活检', specimenSource: '脑组织立体定向', clinicalDiagnosis: '脑肿瘤复发', department: '神经外科', doctor: '王志强', collectTime: '2025-05-01 14:00', receiveTime: '2025-05-01 14:20', status: '已完成', priority: '紧急', reportTime: '2025-05-02 12:00' },
  { id: 'S116', specimenId: 'BX202605020116', patientId: 'P016', patientName: '田华', gender: '女', age: 35, specimenType: '手术标本', specimenSource: '腹腔镜下子宫切除', clinicalDiagnosis: '子宫腺肌症', department: '妇科', doctor: '李雅琴', collectTime: '2025-05-02 09:00', receiveTime: '2025-05-02 09:30', status: '已完成', priority: '普通', reportTime: '2025-05-03 10:00' },
  { id: 'S117', specimenId: 'BX202605020117', patientId: 'P017', patientName: '周建平', gender: '男', age: 62, specimenType: '分子病理', specimenSource: '左肺', clinicalDiagnosis: '左肺腺癌', department: '胸外科', doctor: '李明华', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 15:00' },
  { id: 'S118', specimenId: 'BX202605020118', patientId: 'P018', patientName: '吴秀英', gender: '女', age: 48, specimenType: '分子病理', specimenSource: '胃', clinicalDiagnosis: '胃腺癌', department: '消化内科', doctor: '张建华', collectTime: '2025-04-30 09:00', receiveTime: '2025-04-30 09:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 16:00' },
  { id: 'S119', specimenId: 'BX202605020119', patientId: 'P019', patientName: '马立军', gender: '男', age: 55, specimenType: '免疫组化', specimenSource: '左膝', clinicalDiagnosis: '左膝骨巨细胞瘤', department: '骨科', doctor: '周大伟', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:30', status: '已完成', priority: '普通', reportTime: '2025-05-01 14:00' },
  { id: 'S120', specimenId: 'BX202605020120', patientId: 'P020', patientName: '王秀芬', gender: '女', age: 41, specimenType: '分子病理', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌', department: '乳腺外科', doctor: '王秀英', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 15:00' },
  { id: 'S121', specimenId: 'BX202605020121', patientId: 'P021', patientName: '李天山', gender: '男', age: 68, specimenType: '手术标本', specimenSource: '右下肺叶切除', clinicalDiagnosis: '右下肺腺癌', department: '胸外科', doctor: '李雪梅', collectTime: '2025-05-02 07:30', receiveTime: '2025-05-02 08:00', status: '已完成', priority: '紧急', reportTime: '2025-05-03 12:00' },
  { id: 'S122', specimenId: 'BX202605020122', patientId: 'P022', patientName: '陈美娟', gender: '女', age: 39, specimenType: '分子病理', specimenSource: '宫颈', clinicalDiagnosis: '宫颈鳞状细胞癌', department: '妇科', doctor: '刘雅琴', collectTime: '2025-04-30 10:00', receiveTime: '2025-04-30 10:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 16:00' },
  { id: 'S123', specimenId: 'BX202605020123', patientId: 'P023', patientName: '赵志刚', gender: '男', age: 52, specimenType: '手术标本', specimenSource: '前列腺癌根治术', clinicalDiagnosis: '前列腺癌', department: '泌尿外科', doctor: '孙建平', collectTime: '2025-05-02 07:00', receiveTime: '2025-05-02 07:30', status: '已完成', priority: '普通', reportTime: '2025-05-03 11:00' },
  { id: 'S124', specimenId: 'BX202605020124', patientId: 'P024', patientName: '孙丽华', gender: '女', age: 44, specimenType: '手术标本', specimenSource: '右小腿扩大切除', clinicalDiagnosis: '皮肤恶性黑色素瘤', department: '皮肤科', doctor: '赵晓燕', collectTime: '2025-05-02 08:00', receiveTime: '2025-05-02 08:20', status: '已完成', priority: '紧急', reportTime: '2025-05-03 10:00' },
  { id: 'S125', specimenId: 'BX202605020125', patientId: 'P025', patientName: '杨大海', gender: '男', age: 73, specimenType: '分子病理', specimenSource: '脑组织', clinicalDiagnosis: '右颞叶胶质母细胞瘤', department: '神经外科', doctor: '王志强', collectTime: '2025-04-30 08:00', receiveTime: '2025-04-30 08:30', status: '已完成', priority: '紧急', reportTime: '2025-05-01 15:00' },
];

export const pathologyReports: PathologyReport[] = [
  {
    id: 'R001', reportId: 'BL202605020001', specimenId: 'BX202605020001', patientName: '张伟', gender: '男', age: 58,
    specimenType: '手术标本', specimenSource: '右下肺叶', clinicalDiagnosis: '右肺占位',
    grossDescription: '右下肺叶切除标本，大小约8×6×4cm，距切缘2cm见一肿块，大小约3.5×3×2.5cm，界不清，切面灰白质硬。',
    microscopicDescription: '瘤细胞排列成巢状、条索状，细胞异型性明显，核分裂象易见（约10个/10HPF），可见病理性核分裂。瘤组织侵及脏层胸膜，未累及支气管切缘。支气管旁淋巴结（0/3）未见癌转移。',
    diagnosis: '右肺浸润性腺癌（腺泡型为主），侵及脏层胸膜（PL1），未见脉管神经侵犯',
    diagnosisCode: 'C34.901', tumorDifferentiation: '中分化', invasionDepth: '脏层胸膜', lymphNodeStatus: '0/3阴性',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-03 14:20', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R002', reportId: 'BL202605020002', specimenId: 'BX202605020002', patientName: '李娜', gender: '女', age: 45,
    specimenType: '常规活检', specimenSource: '左侧乳腺肿块', clinicalDiagnosis: '左乳肿块待查',
    grossDescription: '灰白灰红色穿刺组织3条，长0.8-1.2cm，直径0.1cm。',
    microscopicDescription: '纤维间质中见异型腺体浸润性生长，细胞呈柱状，核级中-高级，伴坏死。',
    diagnosis: '左乳浸润性癌，非特殊类型（II级），建议免疫组化进一步分型',
    diagnosisCode: 'C50.901', tumorDifferentiation: '中分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 18:00', status: '待审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R003', reportId: 'BL202605020003', specimenId: 'BX202605020006', patientName: '赵军', gender: '男', age: 72,
    specimenType: '手术标本', specimenSource: '右肾', clinicalDiagnosis: '右肾肿瘤',
    grossDescription: '右肾根治性切除标本，大小11×7×5cm，肾上级见一肿块，大小6×5×4.5cm，界清有包膜，切面金黄色伴出血坏死。',
    microscopicDescription: '瘤细胞呈透明细胞样，胞浆丰富透明，核小圆形，WHO/ISUP分级II级，未见肾窦及肾周脂肪组织侵犯，切缘阴性。',
    diagnosis: '右肾透明细胞癌（WHO/ISUP II级），未见明确包膜外侵犯，切缘阴性',
    diagnosisCode: 'C64.901', tumorDifferentiation: '高分化', invasionDepth: '无包膜外侵犯',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-03 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R004', reportId: 'BL202605020004', specimenId: 'BX202605020008', patientName: '吴磊', gender: '男', age: 55,
    specimenType: '手术标本', specimenSource: '左股骨肿块', clinicalDiagnosis: '骨肿瘤待查',
    grossDescription: '左股骨肿物切除标本，大小4×3×2.5cm，切面灰白灰红，质中，边界不清。',
    microscopicDescription: '肿瘤细胞呈梭形，交织束状排列，细胞异型性轻-中度，核分裂象少见（约2个/50HPF），未见坏死，伴反应性骨形成。',
    diagnosis: '左股骨骨巨细胞瘤（I级），建议随访',
    diagnosisCode: 'C40.252', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '李敏', reportTime: '2025-05-02 16:30', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R005', reportId: 'BL202605020005', specimenId: 'BX202605020010', patientName: '郑明', gender: '男', age: 48,
    specimenType: '手术标本', specimenSource: '肝右叶', clinicalDiagnosis: '肝占位',
    grossDescription: '肝右叶部分切除标本，大小9×7×4cm，距切缘1.5cm见一直径4cm肿块，界清无包膜，切面灰白实性。',
    microscopicDescription: '瘤细胞呈多角形，胞浆丰富嗜酸性，排列成梁索状，核大深染，可见假腺样结构，伴胆小管增生。',
    diagnosis: '肝细胞癌（中分化），伴微血管侵犯（MVI-M1），切缘未见癌残留',
    diagnosisCode: 'C22.001', tumorDifferentiation: '中分化', invasionDepth: '微血管侵犯',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-05-03 09:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R006', reportId: 'BL202605020006', specimenId: 'BX202605020015', patientName: '高峰', gender: '男', age: 71,
    specimenType: '手术标本', specimenSource: '脑组织', clinicalDiagnosis: '脑肿瘤',
    grossDescription: '右额叶脑组织一块，大小3×2.5×1.5cm，灰白灰红，质中。',
    microscopicDescription: '肿瘤细胞呈弥漫性生长，细胞小而密集，核深染，伴广泛坏死，血管内皮增生明显。',
    diagnosis: '右额叶胶质母细胞瘤（WHO IV级），IDH野生型',
    diagnosisCode: 'C71.101', tumorDifferentiation: '未分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-02 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R007', reportId: 'BL202605020007', specimenId: 'BX202605020011', patientName: '黄丽', gender: '女', age: 42,
    specimenType: '免疫组化', specimenSource: '右乳肿块', clinicalDiagnosis: '右乳浸润性癌',
    grossDescription: '右乳改良根治标本，大小22×18×5cm，乳头内侧距乳头3cm见一肿块，大小2.8×2.5×2cm，界不清呈星芒状。',
    microscopicDescription: '肿瘤细胞排列成巢状、条索状，伴纤维间质反应，细胞异型性明显。',
    diagnosis: '右乳浸润性癌，非特殊类型（III级），伴导管原位癌（约20%）',
    diagnosisCode: 'C50.902', tumorDifferentiation: '低分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 15:00', status: '已审核', isFrozen: false, isIHC: true,
    biomarkers: { ER: '强阳性(90%)', PR: '阳性(60%)', HER2: '阴性(0)', Ki67: '35%' }
  },
  {
    id: 'R008', reportId: 'BL202605020008', specimenId: 'BX202605030017', patientName: '周建平', gender: '男', age: 62,
    specimenType: '手术标本', specimenSource: '左上肺叶', clinicalDiagnosis: '左肺占位',
    grossDescription: '左上肺叶切除标本，大小12×8×5cm，距支气管切缘1.5cm见一肿块，大小4×3.5×3cm，界不清，切面灰白。',
    microscopicDescription: '瘤细胞排列成条索状、腺样，细胞异型性明显，核分裂象易见（约8个/10HPF），可见肿瘤坏死。',
    diagnosis: '左上肺浸润性腺癌（贴壁生长型为主），未累及支气管切缘',
    diagnosisCode: 'C34.102', tumorDifferentiation: '高分化', invasionDepth: '未累及胸膜',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-03 15:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R009', reportId: 'BL202605020009', specimenId: 'BX202605030019', patientName: '马立军', gender: '男', age: 55,
    specimenType: '手术标本', specimenSource: '右膝肿块', clinicalDiagnosis: '骨肿瘤待查',
    grossDescription: '右膝肿物切除标本，大小5×4×3cm，切面灰红灰黄，质软，边界尚清。',
    microscopicDescription: '肿瘤细胞呈梭形，伴散在多核巨细胞，细胞异型性不明显，未见病理性核分裂，间质富含血管。',
    diagnosis: '右膝海绵状血管瘤，伴继发性改变',
    diagnosisCode: 'D18.001', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-05-03 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R010', reportId: 'BL202605020010', specimenId: 'BX202605030027', patientName: '钱文华', gender: '男', age: 59,
    specimenType: '手术标本', specimenSource: '肝左叶', clinicalDiagnosis: '肝血管瘤',
    grossDescription: '肝左叶部分切除标本，大小7×5×4cm，切面呈蜂窝状，血窦样，边界清楚。',
    microscopicDescription: '瘤组织由大量扩张的血窦组成，窦壁薄，内衬单层扁平内皮细胞，间隔纤细纤维组织。',
    diagnosis: '肝海绵状血管瘤',
    diagnosisCode: 'D18.003', tumorDifferentiation: '高分化',
    pathologist: '张建国', 审核医生: '刘明辉', reportTime: '2025-05-04 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R011', reportId: 'BL202605030011', specimenId: 'BX202605030035', patientName: '徐志强', gender: '男', age: 65,
    specimenType: '手术标本', specimenSource: '右肾', clinicalDiagnosis: '右肾肿瘤',
    grossDescription: '右肾根治性切除标本，大小10×7×5cm，肾下极见一肿块，大小4.5×4×3.5cm，界清，切面金黄色。',
    microscopicDescription: '瘤细胞胞浆丰富呈颗粒状或透明状，排列成巢团状，细胞核圆形，WHO/ISUP分级I级，未见包膜外侵犯。',
    diagnosis: '右肾嫌色细胞癌（WHO/ISUP I级），未累及肾周脂肪及肾窦，切缘阴性',
    diagnosisCode: 'C64.902', tumorDifferentiation: '高分化', invasionDepth: '无包膜外侵犯',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-04 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R012', reportId: 'BL202605020012', specimenId: 'BX202605030043', patientName: '赵新建', gender: '男', age: 66,
    specimenType: '冰冻切片', specimenSource: '右肺结节', clinicalDiagnosis: '右肺占位',
    grossDescription: '楔形肺切除标本，大小6×4×2cm，距切缘0.5cm见一直径2cm结节，灰白色，质硬。',
    microscopicDescription: '瘤细胞排列成巢状，细胞呈多角形，胞浆嗜酸性，核异型性明显，鳞状上皮样分化。',
    diagnosis: '右肺周围型鳞状细胞癌（中分化），冰冻切片与术后石蜡一致',
    diagnosisCode: 'C34.101', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-03 09:40', status: '已审核', isFrozen: true, isIHC: false
  },
  {
    id: 'R013', reportId: 'BL202605020013', specimenId: 'BX202605010093', patientName: '赵新建', gender: '男', age: 66,
    specimenType: '手术标本', specimenSource: '右肺上叶', clinicalDiagnosis: '右肺鳞状细胞癌',
    grossDescription: '右肺上叶切除标本，大小15×10×6cm，支气管切缘光滑，肺门淋巴结可扪及。',
    microscopicDescription: '瘤细胞排列成巢状或条索状，伴角化和细胞间桥，细胞异型性明显，局部可见坏死。肺门淋巴结（0/5）未见癌转移。',
    diagnosis: '右肺上叶鳞状细胞癌（II级），未累及支气管切缘，肺门淋巴结（0/5）阴性',
    diagnosisCode: 'C34.101', tumorDifferentiation: '中分化', invasionDepth: '未累及胸膜', lymphNodeStatus: '0/5阴性',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-02 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R014', reportId: 'BL202605020014', specimenId: 'BX202605010098', patientName: '段丽华', gender: '女', age: 40,
    specimenType: '手术标本', specimenSource: '右乳', clinicalDiagnosis: '右乳导管内癌',
    grossDescription: '右乳改良根治标本，大小20×16×4cm，乳头内侧见一直径2.5cm灰白区，质硬，边界不清。',
    microscopicDescription: '导管内癌呈实性、筛状及粉刺样生长，细胞异型性明显，伴显著坏死。未见明确间质浸润。',
    diagnosis: '右乳导管内癌（高核级），伴广泛导管内癌成分（约80%）',
    diagnosisCode: 'D05.101', tumorDifferentiation: '低分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R015', reportId: 'BL202605020015', specimenId: 'BX202605010094', patientName: '马琳娜', gender: '女', age: 49,
    specimenType: '常规活检', specimenSource: '右乳', clinicalDiagnosis: '右乳浸润性癌',
    grossDescription: '灰白组织3条，长1.0-1.5cm，直径0.15cm。',
    microscopicDescription: '纤维间质中见异型腺体浸润，细胞呈柱状，核高级别，伴中央坏死。',
    diagnosis: '右乳浸润性癌，非特殊类型（III级），建议免疫组化及分子检测',
    diagnosisCode: 'C50.902', tumorDifferentiation: '低分化',
    pathologist: '王丽华', 审核医生: '张建国', reportTime: '2025-05-02 12:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R016', reportId: 'BL202605020016', specimenId: 'BX202605010095', patientName: '刘海波', gender: '男', age: 58,
    specimenType: '手术标本', specimenSource: '胆总管', clinicalDiagnosis: '胆管癌',
    grossDescription: '胆总管一段，长5cm，直径1.5cm，管壁增厚达0.5cm，切面灰白实性，质硬。',
    microscopicDescription: '瘤细胞排列成腺管样，细胞呈柱状，核异型性明显，伴丰富纤维间质，浸润至管壁全层。',
    diagnosis: '胆总管腺癌（高分化），浸润至管壁全层，脉管内见癌栓',
    diagnosisCode: 'C24.001', tumorDifferentiation: '高分化', invasionDepth: '全层浸润',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-02 13:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R017', reportId: 'BL202605020017', specimenId: 'BX202605010097', patientName: '姜志远', gender: '男', age: 61,
    specimenType: '手术标本', specimenSource: '左肩胛骨肿块', clinicalDiagnosis: '左肩胛骨肉瘤',
    grossDescription: '左肩胛骨肿物切除标本，大小8×6×5cm，切面灰红鱼肉样，伴出血坏死。',
    microscopicDescription: '肿瘤细胞呈梭形，异型性显著，核分裂象易见，伴病理性核分裂。肿瘤性成骨样基质形成，少量软骨分化。',
    diagnosis: '左肩胛骨高级别骨肉瘤（混合型），建议术前新辅助化疗',
    diagnosisCode: 'C40.001', tumorDifferentiation: '未分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-05-01 16:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R018', reportId: 'BL202605020018', specimenId: 'BX202605010099', patientName: '贾志明', gender: '男', age: 69,
    specimenType: '冰冻切片', specimenSource: '膀胱肿物', clinicalDiagnosis: '膀胱占位',
    grossDescription: 'TURBT标本，灰白灰红色碎片状组织，共约2×1.5×0.5cm。',
    microscopicDescription: '瘤细胞排列成乳头状，细胞层次增多，核异型性明显，伴核分裂象。',
    diagnosis: '膀胱低级别乳头状尿路上皮癌，侵犯固有层',
    diagnosisCode: 'C67.901', tumorDifferentiation: '中分化',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-05-01 08:40', status: '已审核', isFrozen: true, isIHC: false
  },
  {
    id: 'R019', reportId: 'BL202605020019', specimenId: 'BX202605010100', patientName: '龚晓燕', gender: '女', age: 34,
    specimenType: '常规活检', specimenSource: '支气管镜活检', clinicalDiagnosis: '右下肺不张',
    grossDescription: '灰白色组织3块，大小约0.3×0.2×0.2cm。',
    microscopicDescription: '肺泡结构破坏，肺泡腔内充满粉染渗出物，伴淋巴细胞浸润。支气管壁淋巴细胞浸润。',
    diagnosis: '右下肺慢性炎症，肺泡蛋白沉积待排除',
    diagnosisCode: 'J18.901', tumorDifferentiation: undefined,
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-02 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R020', reportId: 'BL202605020020', specimenId: 'BX202605010102', patientName: '李娜', gender: '女', age: 45,
    specimenType: '常规活检', specimenSource: '左乳', clinicalDiagnosis: '左乳癌术后复发待查',
    grossDescription: '灰白灰红色穿刺组织2条，长0.8-1.0cm，直径0.1cm。',
    microscopicDescription: '纤维组织中见腺癌浸润，形态与前次病理相似，符合乳腺癌复发。',
    diagnosis: '左乳浸润性癌复发，结合病史符合前次乳腺癌复发转移',
    diagnosisCode: 'C50.901', tumorDifferentiation: '中分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R021', reportId: 'BL202605020021', specimenId: 'BX202605010103', patientName: '王芳', gender: '女', age: 52,
    specimenType: '常规活检', specimenSource: '胃窦', clinicalDiagnosis: '胃溃疡',
    grossDescription: '灰白组织4块，大小约0.3-0.5cm。',
    microscopicDescription: '胃粘膜腺体伴轻度非典型增生，间质淋巴细胞浸润，幽门螺旋杆菌阳性。',
    diagnosis: '胃窦粘膜慢性浅表性胃炎，伴轻度肠上皮化生',
    diagnosisCode: 'K29.501', tumorDifferentiation: undefined,
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-05-01 16:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R022', reportId: 'BL202605020022', specimenId: 'BX202605010104', patientName: '刘强', gender: '男', age: 67,
    specimenType: '手术标本', specimenSource: '直肠', clinicalDiagnosis: '直肠腺癌',
    grossDescription: '直肠癌根治切除标本，距肿瘤下缘2cm离断，肿块大小5×4×3cm，绕肠壁3/4周。',
    microscopicDescription: '瘤细胞排列成腺管状，细胞异型性明显，浸润至深肌层，脉管内见癌栓。环切缘阴性。',
    diagnosis: '直肠中分化腺癌，浸润至深肌层，脉管侵犯（+），未见神经侵犯',
    diagnosisCode: 'C20.001', tumorDifferentiation: '中分化', invasionDepth: '深肌层',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R023', reportId: 'BL202605020023', specimenId: 'BX202605010106', patientName: '赵军', gender: '男', age: 72,
    specimenType: '常规活检', specimenSource: '左肾穿刺', clinicalDiagnosis: '左肾肿瘤',
    grossDescription: '灰白色穿刺组织2条，长1.0-1.2cm，直径0.15cm。',
    microscopicDescription: '穿刺组织中见透明细胞增生，细胞胞浆透明，核级低，未见明显异型性。',
    diagnosis: '左肾透明细胞腺瘤，建议随访',
    diagnosisCode: 'D41.001', tumorDifferentiation: '高分化',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-02 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R024', reportId: 'BL202605020024', specimenId: 'BX202605010107', patientName: '周婷', gender: '女', age: 33,
    specimenType: '手术标本', specimenSource: '背部肿物', clinicalDiagnosis: '皮肤纤维肉瘤',
    grossDescription: '背部肿物切除标本，大小4×3×2cm，切面灰白编织样，质韧。',
    microscopicDescription: '肿瘤细胞呈梭形，交织束状排列，细胞异型性轻，核分裂象少见（约1个/50HPF），边缘规则。',
    diagnosis: '背部韧带样型纤维瘤病（ desmoid型），建议扩大根治',
    diagnosisCode: 'D48.101', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-05-02 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R025', reportId: 'BL202605020025', specimenId: 'BX202605010108', patientName: '吴磊', gender: '男', age: 55,
    specimenType: '常规活检', specimenSource: '左股骨', clinicalDiagnosis: '骨巨细胞瘤复发',
    grossDescription: '灰红组织2块，大小约0.5×0.4×0.3cm。',
    microscopicDescription: '纤维组织中见增生的多核巨细胞，细胞分布均匀，未见明显异型性。',
    diagnosis: '左股骨骨巨细胞瘤复发，伴纤维骨性病变',
    diagnosisCode: 'C40.252', tumorDifferentiation: '中分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-05-02 11:30', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R026', reportId: 'BL202605020026', specimenId: 'BX202605010110', patientName: '郑明', gender: '男', age: 48,
    specimenType: '免疫组化', specimenSource: '肝右叶', clinicalDiagnosis: '肝细胞癌',
    grossDescription: '肝右叶部分切除标本，大小10×8×5cm，切面见一肿块直径5cm，灰黄色，边界清楚。',
    microscopicDescription: '瘤细胞排列成梁索状，胞浆嗜碱性，核深染，可见腺泡样结构，伴脂肪变。',
    diagnosis: '肝细胞癌（中分化），伴脂肪变性',
    diagnosisCode: 'C22.001', tumorDifferentiation: '中分化', invasionDepth: '无门脉侵犯',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R027', reportId: 'BL202605020027', specimenId: 'BX202605010111', patientName: '黄丽', gender: '女', age: 42,
    specimenType: '常规活检', specimenSource: '右乳', clinicalDiagnosis: '右乳癌术后皮肤转移',
    grossDescription: '灰白灰红色皮肤组织一块，大小1×0.8×0.3cm。',
    microscopicDescription: '皮肤真皮层见腺癌浸润，形态与乳腺原发癌一致。',
    diagnosis: '右乳浸润性癌皮肤转移',
    diagnosisCode: 'C50.902', tumorDifferentiation: '低分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 13:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R028', reportId: 'BL202605020028', specimenId: 'BX202605010113', patientName: '马超', gender: '男', age: 29,
    specimenType: '常规活检', specimenSource: '颈部淋巴结', clinicalDiagnosis: '弥漫大B细胞淋巴瘤',
    grossDescription: '灰白淋巴结一枚，大小2×1.5×1cm，包膜完整。',
    microscopicDescription: '淋巴结结构破坏，弥漫浸润大B细胞，细胞CD20+，CD10-，BCL6+，MUM1+，伴坏死。',
    diagnosis: '颈部淋巴结弥漫大B细胞淋巴瘤（非生发中心型），建议化疗',
    diagnosisCode: 'C83.301', tumorDifferentiation: '未分化',
    pathologist: '刘明辉', 审核医生: '李敏', reportTime: '2025-05-01 16:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R029', reportId: 'BL202605020029', specimenId: 'BX202605010114', patientName: '林梅', gender: '女', age: 56,
    specimenType: '手术标本', specimenSource: '甲状腺全切', clinicalDiagnosis: '甲状腺乳头状癌',
    grossDescription: '甲状腺双侧切除标本，大小左侧4×3×2cm，右侧5×3×2cm，右侧见一直径1.2cm灰白结节。',
    microscopicDescription: '瘤细胞呈乳头状排列，细胞核呈毛玻璃样，可见核沟及核内包涵体，间质纤维化。',
    diagnosis: '右侧甲状腺乳头状癌（经典型），未见明确包膜外侵犯，中央区淋巴结（1/5）见癌转移',
    diagnosisCode: 'C73.001', tumorDifferentiation: '中分化', invasionDepth: '无包膜外侵犯', lymphNodeStatus: '1/5阳性',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-02 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R030', reportId: 'BL202605020030', specimenId: 'BX202605010115', patientName: '高峰', gender: '男', age: 71,
    specimenType: '常规活检', specimenSource: '脑组织立体定向', clinicalDiagnosis: '脑肿瘤复发',
    grossDescription: '灰白组织2块，大小约0.5×0.4×0.3cm。',
    microscopicDescription: '星形胶质细胞增生活跃，伴细胞密度增加，核异型性明显，符合高级别胶质瘤复发。',
    diagnosis: '左额叶胶质母细胞瘤复发（WHO IV级），建议同步放化疗',
    diagnosisCode: 'C71.101', tumorDifferentiation: '未分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-02 12:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R031', reportId: 'BL202605020031', specimenId: 'BX202605020116', patientName: '田华', gender: '女', age: 35,
    specimenType: '手术标本', specimenSource: '腹腔镜下子宫切除', clinicalDiagnosis: '子宫腺肌症',
    grossDescription: '子宫切除标本，大小8×6×4cm，肌层增厚达3cm，肌壁间见多个灰白小结节。',
    microscopicDescription: '子宫肌层见异位子宫内膜腺体及间质，伴平滑肌增生，腺体分泌期改变。',
    diagnosis: '子宫腺肌症，伴子宫内膜单纯性增生',
    diagnosisCode: 'N80.001', tumorDifferentiation: undefined,
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-03 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R032', reportId: 'BL202605020032', specimenId: 'BX202605020121', patientName: '李天山', gender: '男', age: 68,
    specimenType: '手术标本', specimenSource: '右下肺叶切除', clinicalDiagnosis: '右下肺腺癌',
    grossDescription: '右下肺叶切除标本，大小10×7×5cm，距切缘2cm见肿块3.5×3×2.5cm，灰白色，边界不清。',
    microscopicDescription: '瘤细胞沿肺泡壁生长，伴腺样分化，细胞异型性轻-中度，未见明确间质浸润。',
    diagnosis: '右下肺腺癌（贴壁生长型为主），未见明确间质浸润，建议免疫组化进一步评估',
    diagnosisCode: 'C34.301', tumorDifferentiation: '高分化',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-03 12:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R033', reportId: 'BL202605020033', specimenId: 'BX202605020123', patientName: '赵志刚', gender: '男', age: 52,
    specimenType: '手术标本', specimenSource: '前列腺癌根治术', clinicalDiagnosis: '前列腺癌',
    grossDescription: '前列腺根治切除标本，大小4×3.5×3cm，右侧叶见一灰白结节直径1.5cm。',
    microscopicDescription: '瘤细胞排列成腺样，细胞核深染，伴肾小球样结构， Gleason评分4+4=8分，未见精囊侵犯。',
    diagnosis: '前列腺腺癌，Gleason评分8分（4+4），未累及精囊及膀胱颈切缘',
    diagnosisCode: 'C61.901', tumorDifferentiation: '低分化', invasionDepth: '未累及前列腺被膜外',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-05-03 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R034', reportId: 'BL202605020034', specimenId: 'BX202605020124', patientName: '孙丽华', gender: '女', age: 44,
    specimenType: '手术标本', specimenSource: '右小腿扩大切除', clinicalDiagnosis: '皮肤恶性黑色素瘤',
    grossDescription: '右小腿皮肤切除标本，大小6×4×1.5cm，皮肤表面见一黑褐色肿块1.5×1.2×0.8cm。',
    microscopicDescription: '瘤细胞呈巢状分布，胞浆黑色素丰富，核大深染，伴溃疡形成， Breslow深度4.5mm。',
    diagnosis: '右小腿皮肤恶性黑色素瘤（Breslow厚度4.5mm），溃疡形成， Clark分级V级',
    diagnosisCode: 'C43.701', tumorDifferentiation: '未分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-05-03 10:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R035', reportId: 'BL202605020035', specimenId: 'BX202604280053', patientName: '王芳', gender: '女', age: 52,
    specimenType: '手术标本', specimenSource: '胃窦', clinicalDiagnosis: '胃腺癌',
    grossDescription: '胃大部分切除标本，小弯长12cm，大弯长18cm，胃窦部见一溃疡型肿块4×3×1.5cm。',
    microscopicDescription: '瘤细胞排列成腺管状，浸润至浆膜层，伴神经侵犯，淋巴结（2/8）见癌转移。',
    diagnosis: '胃窦腺癌（低分化），浸润至浆膜层，伴神经侵犯，淋巴结转移（2/8）',
    diagnosisCode: 'C16.901', tumorDifferentiation: '低分化', invasionDepth: '浆膜层', lymphNodeStatus: '2/8阳性',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-04-29 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R036', reportId: 'BL202605020036', specimenId: 'BX202604280054', patientName: '刘强', gender: '男', age: 67,
    specimenType: '手术标本', specimenSource: '直肠', clinicalDiagnosis: '直肠腺癌',
    grossDescription: '直肠前切除标本，距肿瘤下缘2.5cm离断，肿块5.5×4×3.5cm，绕肠壁约3/4周。',
    microscopicDescription: '瘤细胞排列成腺管状，部分粘液分泌丰富，浸润至外膜脂肪组织，脉管内见癌栓。',
    diagnosis: '直肠中-低分化腺癌，伴粘液腺癌成分，浸润至外膜，脉管癌栓（+）',
    diagnosisCode: 'C20.001', tumorDifferentiation: '低分化', invasionDepth: '外膜', lymphNodeStatus: '3/12阳性',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-04-29 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R037', reportId: 'BL202605020037', specimenId: 'BX202604280057', patientName: '周婷', gender: '女', age: 33,
    specimenType: '常规活检', specimenSource: '皮肤肿块', clinicalDiagnosis: '皮肤纤维瘤',
    grossDescription: '灰白结节一枚，大小1.5×1×0.8cm，边界清楚。',
    microscopicDescription: '纤维组织增生活跃，伴少量成纤维细胞，排列较规则，未见明显异型性。',
    diagnosis: '皮肤纤维瘤（硬纤维瘤）',
    diagnosisCode: 'D21.901', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-04-29 10:30', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R038', reportId: 'BL202605020038', specimenId: 'BX202604280059', patientName: '孙燕', gender: '女', age: 61,
    specimenType: '细胞学', specimenSource: '胸腔积液', clinicalDiagnosis: '肺腺癌伴胸腔转移',
    grossDescription: '胸腔积液沉渣包埋，灰褐色组织2块，大小0.3×0.2×0.2cm。',
    microscopicDescription: '细胞块切片见腺癌细胞，细胞呈腺样排列，TTF-1+，Napsin A+。',
    diagnosis: '胸腔积液腺癌细胞，结合免疫组化符合肺腺癌转移',
    diagnosisCode: 'C34.901', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-28 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R039', reportId: 'BL202605020039', specimenId: 'BX202604280061', patientName: '黄丽', gender: '女', age: 42,
    specimenType: '手术标本', specimenSource: '右乳改良根治标本', clinicalDiagnosis: '右乳浸润性癌',
    grossDescription: '右乳改良根治标本，大小22×18×5cm，乳头后方见肿块3×2.5×2cm，边界不清。',
    microscopicDescription: '肿瘤细胞排列成巢状、条索状，伴大量纤维间质，细胞异型性明显。',
    diagnosis: '右乳浸润性癌，非特殊类型（III级），伴导管原位癌（约15%）',
    diagnosisCode: 'C50.902', tumorDifferentiation: '低分化', lymphNodeStatus: '3/15阳性',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-28 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R040', reportId: 'BL202605020040', specimenId: 'BX202604280062', patientName: '徐鹏', gender: '男', age: 63,
    specimenType: '手术标本', specimenSource: '心脏粘液瘤', clinicalDiagnosis: '心脏粘液瘤',
    grossDescription: '心脏肿物，大小4×3×2.5cm，表面呈分叶状，切面灰黄粘液样，质软。',
    microscopicDescription: '瘤组织由粘液样基质和散在星芒状细胞组成，伴小血管增生，未见明显细胞异型性。',
    diagnosis: '左心房粘液瘤，良性',
    diagnosisCode: 'D15.101', tumorDifferentiation: '高分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-28 12:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R041', reportId: 'BL202605020041', specimenId: 'BX202604280063', patientName: '马超', gender: '男', age: 29,
    specimenType: '常规活检', specimenSource: '颈部淋巴结', clinicalDiagnosis: '淋巴结肿大待查',
    grossDescription: '灰白淋巴结2枚，大小1.5×1×0.8cm和1.2×0.8×0.6cm。',
    microscopicDescription: '淋巴结结构破坏，弥漫分布中等大小淋巴样细胞，核分裂象易见，伴星空现象。',
    diagnosis: '颈部淋巴结经典型霍奇金淋巴瘤（混合细胞亚型），建议化疗',
    diagnosisCode: 'C81.001', tumorDifferentiation: '未分化',
    pathologist: '刘明辉', 审核医生: '李敏', reportTime: '2025-04-29 09:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R042', reportId: 'BL202605020042', specimenId: 'BX202604280064', patientName: '林梅', gender: '女', age: 56,
    specimenType: '常规活检', specimenSource: '甲状腺右叶', clinicalDiagnosis: '甲状腺乳头状癌待排',
    grossDescription: '灰白组织2条，长0.6-1.0cm，直径0.15cm。',
    microscopicDescription: '滤泡上皮细胞呈乳头状增生，细胞核毛玻璃样，核沟可见。',
    diagnosis: '甲状腺乳头状癌（微小癌），建议手术',
    diagnosisCode: 'C73.001', tumorDifferentiation: '中分化',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-04-29 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R043', reportId: 'BL202605020043', specimenId: 'BX202604280069', patientName: '马立军', gender: '男', age: 55,
    specimenType: '手术标本', specimenSource: '左膝肿物', clinicalDiagnosis: '左膝骨巨细胞瘤',
    grossDescription: '左膝肿物切除，大小5×4×3.5cm，切面灰红灰黄，质软。',
    microscopicDescription: '肿瘤由均匀分布的单核细胞和散在多核巨细胞组成，单核细胞无明显异型性。',
    diagnosis: '左膝骨巨细胞瘤（I级），建议定期随访',
    diagnosisCode: 'C40.252', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-04-30 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R044', reportId: 'BL202605020044', specimenId: 'BX202604280070', patientName: '王秀芬', gender: '女', age: 41,
    specimenType: '手术标本', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌',
    grossDescription: '左乳改良根治标本，大小20×16×4cm，外上象限见肿块2.8×2.5×2cm。',
    microscopicDescription: '肿瘤细胞排列成巢状、腺样，细胞异型性明显，伴导管原位癌成分。',
    diagnosis: '左乳浸润性癌，非特殊类型（II级），伴导管原位癌（约10%）',
    diagnosisCode: 'C50.902', tumorDifferentiation: '中分化', lymphNodeStatus: '1/12阳性',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-30 12:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R045', reportId: 'BL202605020045', specimenId: 'BX202604280073', patientName: '赵志刚', gender: '男', age: 52,
    specimenType: '常规活检', specimenSource: '前列腺穿刺', clinicalDiagnosis: '前列腺癌待排',
    grossDescription: '灰白组织6条，长1.0-1.5cm，直径0.15cm。',
    microscopicDescription: '穿刺组织中见腺癌结构，细胞核大深染，Gleason评分3+4=7分。',
    diagnosis: '前列腺腺癌，Gleason评分7分（3+4），建议根治手术',
    diagnosisCode: 'C61.901', tumorDifferentiation: '中分化',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-04-30 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R046', reportId: 'BL202605020046', specimenId: 'BX202604280074', patientName: '孙丽华', gender: '女', age: 44,
    specimenType: '常规活检', specimenSource: '右小腿皮肤', clinicalDiagnosis: '皮肤恶性黑色素瘤待排',
    grossDescription: '皮肤及皮下组织一块，1.5×1×0.5cm，见一色素沉着区0.8×0.6cm。',
    microscopicDescription: '表皮基底层黑色素细胞增生活跃，细胞异型性明显，黑色素沉着。',
    diagnosis: '右小腿皮肤原位黑色素瘤，建议扩大切除',
    diagnosisCode: 'D03.701', tumorDifferentiation: '中分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-04-30 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R047', reportId: 'BL202605020047', specimenId: 'BX202604280075', patientName: '杨大海', gender: '男', age: 73,
    specimenType: '手术标本', specimenSource: '右颞叶脑组织', clinicalDiagnosis: '右颞叶胶质母细胞瘤',
    grossDescription: '右颞叶脑组织，大小4×3×2.5cm，灰白色，边界不清，质软。',
    microscopicDescription: '肿瘤细胞密度高，伴广泛坏死，血管内皮增生，核异型性明显。',
    diagnosis: '右颞叶胶质母细胞瘤（WHO IV级），IDH野生型',
    diagnosisCode: 'C71.201', tumorDifferentiation: '未分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-30 12:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R048', reportId: 'BL202605020048', specimenId: 'BX202604280076', patientName: '郑小丽', gender: '女', age: 31,
    specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '全血细胞减少',
    grossDescription: '灰红色骨髓组织一条，长1.5cm，直径0.2cm。',
    microscopicDescription: '骨髓增生活跃，粒红比例倒置，巨核细胞可见，伴轻度网状纤维增生。',
    diagnosis: '骨髓增生性病变，建议结合临床及基因检测进一步诊断',
    diagnosisCode: 'D47.101', tumorDifferentiation: undefined,
    pathologist: '刘明辉', 审核医生: '李敏', reportTime: '2025-04-30 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R049', reportId: 'BL202605020049', specimenId: 'BX202604280079', patientName: '吴晓东', gender: '男', age: 47,
    specimenType: '常规活检', specimenSource: '结肠镜活检', clinicalDiagnosis: '结肠癌待排',
    grossDescription: '灰白组织4块，大小约0.3-0.5cm。',
    microscopicDescription: '腺上皮异型增生，腺体排列紊乱，核分裂象增多，伴粘液分泌。',
    diagnosis: '结肠粘膜腺上皮高级别上皮内瘤变，癌变待排除',
    diagnosisCode: 'D01.101', tumorDifferentiation: '低分化',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-04-30 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R050', reportId: 'BL202605020050', specimenId: 'BX202604280080', patientName: '郑美丽', gender: '女', age: 54,
    specimenType: '手术标本', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌',
    grossDescription: '左乳改良根治标本，大小21×17×5cm，外上象限见肿块3.2×2.8×2cm。',
    microscopicDescription: '肿瘤细胞排列成巢状，伴大量淋巴细胞浸润，细胞异型性明显。',
    diagnosis: '左乳浸润性癌（非特殊类型III级），伴髓样特征，淋巴结（0/14）未见转移',
    diagnosisCode: 'C50.902', tumorDifferentiation: '低分化', lymphNodeStatus: '0/14阴性',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-30 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R051', reportId: 'BL202605020051', specimenId: 'BX202604280068', patientName: '吴秀英', gender: '女', age: 48,
    specimenType: '手术标本', specimenSource: '胃大部分切除', clinicalDiagnosis: '胃窦癌',
    grossDescription: '胃大部分切除标本，小弯10cm，大弯16cm，胃窦部见溃疡型肿块3.5×3×1.2cm。',
    microscopicDescription: '瘤细胞排列成腺管状，浸润至肌层，伴神经侵犯，淋巴结（1/6）转移。',
    diagnosis: '胃窦腺癌（中分化），浸润至肌层，淋巴结转移（1/6）',
    diagnosisCode: 'C16.901', tumorDifferentiation: '中分化', invasionDepth: '肌层', lymphNodeStatus: '1/6阳性',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-04-30 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R052', reportId: 'BL202605020052', specimenId: 'BX202604290066', patientName: '田华', gender: '女', age: 35,
    specimenType: '常规活检', specimenSource: '子宫内膜', clinicalDiagnosis: '子宫内膜增厚',
    grossDescription: '灰红组织3块，大小约0.5×0.4×0.2cm。',
    microscopicDescription: '子宫内膜呈分泌期改变，腺体规则，间质致密，未见明显异常。',
    diagnosis: '分泌期子宫内膜，形态正常',
    diagnosisCode: 'N84.101', tumorDifferentiation: undefined,
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-30 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R053', reportId: 'BL202605020053', specimenId: 'BX202604290067', patientName: '周建平', gender: '男', age: 62,
    specimenType: '常规活检', specimenSource: '左肺穿刺', clinicalDiagnosis: '左肺占位',
    grossDescription: '灰白组织2条，长0.8-1.2cm，直径0.15cm。',
    microscopicDescription: '肺泡上皮异性增生，细胞呈腺样排列，核深染，符合腺癌。',
    diagnosis: '左肺腺癌，建议手术治疗',
    diagnosisCode: 'C34.102', tumorDifferentiation: '中分化',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-04-30 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R054', reportId: 'BL202605020054', specimenId: 'BX202604290072', patientName: '陈美娟', gender: '女', age: 39,
    specimenType: '免疫组化', specimenSource: '宫颈', clinicalDiagnosis: '宫颈鳞癌',
    grossDescription: '宫颈活检组织，灰白灰红色，共约0.8×0.5×0.3cm。',
    microscopicDescription: '鳞状上皮全层异型增生，伴异常角化，基底膜突破。',
    diagnosis: '宫颈鳞状细胞癌（浸润型），建议根治手术',
    diagnosisCode: 'C53.901', tumorDifferentiation: '中分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-29 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R055', reportId: 'BL202605020055', specimenId: 'BX202604290074', patientName: '孙丽华', gender: '女', age: 44,
    specimenType: '常规活检', specimenSource: '右小腿皮肤', clinicalDiagnosis: '皮肤恶性黑色素瘤待排',
    grossDescription: '椭圆形皮肤一块，1.2×0.8cm，中心见0.5×0.4cm色素沉着。',
    microscopicDescription: '黑色素瘤细胞垂直生长，表皮内雀麦样播散，深度达真皮层。',
    diagnosis: '皮肤恶性黑色素瘤（垂直生长相），建议扩大切除',
    diagnosisCode: 'C43.701', tumorDifferentiation: '未分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-04-30 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R056', reportId: 'BL202605020056', specimenId: 'BX202604290077', patientName: '钱文华', gender: '男', age: 59,
    specimenType: '冰冻切片', specimenSource: '肝左叶', clinicalDiagnosis: '肝占位',
    grossDescription: '楔形肝切除标本，大小6×5×3cm，切面见一直径2.5cm灰白结节。',
    microscopicDescription: '肝细胞排列成梁索状，细胞异型性轻-中度，伴脂肪变性。',
    diagnosis: '肝细胞性肝癌（高分化），冰冻与石蜡一致',
    diagnosisCode: 'C22.001', tumorDifferentiation: '高分化',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-04-29 08:40', status: '已审核', isFrozen: true, isIHC: false
  },
  {
    id: 'R057', reportId: 'BL202605020057', specimenId: 'BX202604290078', patientName: '周志明', gender: '男', age: 64,
    specimenType: '手术标本', specimenSource: '心脏粘液瘤', clinicalDiagnosis: '心脏占位',
    grossDescription: '心脏肿物切除，大小3.5×2.5×2cm，表面分叶状，切面粘液样。',
    microscopicDescription: '粘液样基质中见星芒状细胞散在，血管壁薄，细胞无明显异型。',
    diagnosis: '左心房粘液瘤，良性',
    diagnosisCode: 'D15.101', tumorDifferentiation: '高分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-29 12:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R058', reportId: 'BL202605020058', specimenId: 'BX202604290080', patientName: '郑美丽', gender: '女', age: 54,
    specimenType: '手术标本', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌',
    grossDescription: '左乳改良根治标本，大小20×16×4.5cm，外上象限肿块2.5×2×1.8cm。',
    microscopicDescription: '肿瘤细胞排列成巢状，伴间质淋巴细胞浸润，细胞异型性明显。',
    diagnosis: '左乳浸润性癌，非特殊类型（II级），伴髓样特征',
    diagnosisCode: 'C50.902', tumorDifferentiation: '中分化', lymphNodeStatus: '2/13阳性',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-04-30 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R059', reportId: 'BL202605020059', specimenId: 'BX202604300081', patientName: '冯志强', gender: '男', age: 45,
    specimenType: '冰冻切片', specimenSource: '右下肺', clinicalDiagnosis: '右肺占位',
    grossDescription: '楔形切除肺组织，大小5×4×2cm，见一直径1.8cm灰白结节。',
    microscopicDescription: '瘤细胞排列成腺泡样，细胞异型性明显，伴纤维间质反应。',
    diagnosis: '右下肺腺癌，冰冻切片与石蜡一致',
    diagnosisCode: 'C34.301', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-30 08:40', status: '已审核', isFrozen: true, isIHC: false
  },
  {
    id: 'R060', reportId: 'BL202605020060', specimenId: 'BX202604300082', patientName: '曹雪梅', gender: '女', age: 36,
    specimenType: '常规活检', specimenSource: '甲状腺', clinicalDiagnosis: '甲状腺乳头状癌',
    grossDescription: '灰白组织2条，长0.8-1.0cm，直径0.12cm。',
    microscopicDescription: '滤泡上皮乳头状增生，细胞核毛玻璃样，核沟及核内包涵体可见。',
    diagnosis: '甲状腺乳头状癌，建议手术切除',
    diagnosisCode: 'C73.001', tumorDifferentiation: '中分化',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-05-01 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R061', reportId: 'BL202605020061', specimenId: 'BX202604300083', patientName: '丁建新', gender: '男', age: 60,
    specimenType: '手术标本', specimenSource: '胸椎', clinicalDiagnosis: '胸椎转移瘤',
    grossDescription: '骨组织一块，3×2×1.5cm，灰白灰红，质脆。',
    microscopicDescription: '骨组织中见腺癌转移，免疫组化支持肺来源。',
    diagnosis: '胸椎转移性腺癌，结合病史及免疫组化符合肺腺癌转移',
    diagnosisCode: 'C79.501', tumorDifferentiation: '低分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-05-01 10:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R062', reportId: 'BL202605020062', specimenId: 'BX202604300084', patientName: '孙佳欣', gender: '女', age: 28,
    specimenType: '常规活检', specimenSource: '右卵巢', clinicalDiagnosis: '卵巢畸胎瘤',
    grossDescription: '囊性肿物一个，大小6×5×4cm，内含油脂及毛发。',
    microscopicDescription: '囊壁见皮肤及皮肤附属器，伴成熟脑组织，符合成熟囊性畸胎瘤。',
    diagnosis: '右卵巢成熟囊性畸胎瘤（良性）',
    diagnosisCode: 'D27.001', tumorDifferentiation: '高分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-01 10:30', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R063', reportId: 'BL202605020063', specimenId: 'BX202604300085', patientName: '徐志强', gender: '男', age: 65,
    specimenType: '免疫组化', specimenSource: '右肾', clinicalDiagnosis: '右肾透明细胞癌',
    grossDescription: '右肾根治标本，肾上级肿块4×3.5×3cm，切面金黄色。',
    microscopicDescription: '瘤细胞胞浆透明，排列成腺样，核级低，CD10+，CAIX+。',
    diagnosis: '右肾透明细胞癌（WHO/ISUP II级）',
    diagnosisCode: 'C64.901', tumorDifferentiation: '高分化',
    pathologist: '陈志强', 审核医生: '张建国', reportTime: '2025-04-30 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R064', reportId: 'BL202605020064', specimenId: 'BX202604300087', patientName: '黄志勇', gender: '男', age: 57,
    specimenType: '手术标本', specimenSource: '食管', clinicalDiagnosis: '食管鳞状细胞癌',
    grossDescription: '食管部分切除，长8cm，周径3cm，中段见溃疡型肿块3×2×1cm。',
    microscopicDescription: '鳞状上皮全层癌变，细胞异型性明显，浸润至粘膜下层。',
    diagnosis: '食管鳞状细胞癌（低分化），浸润至粘膜下层',
    diagnosisCode: 'C15.901', tumorDifferentiation: '低分化', invasionDepth: '粘膜下层',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-01 14:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R065', reportId: 'BL202605020065', specimenId: 'BX202604300088', patientName: '周艳艳', gender: '女', age: 43,
    specimenType: '常规活检', specimenSource: '皮肤', clinicalDiagnosis: '皮肤鳞状细胞癌',
    grossDescription: '皮肤肿物切除，1.2×1×0.6cm，表面破溃。',
    microscopicDescription: '鳞状细胞呈巢状生长，细胞异型性明显，伴角珠形成。',
    diagnosis: '皮肤高分化鳞状细胞癌，建议扩大切除',
    diagnosisCode: 'C44.701', tumorDifferentiation: '高分化',
    pathologist: '刘明辉', 审核医生: '王丽华', reportTime: '2025-05-01 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R066', reportId: 'BL202605020066', specimenId: 'BX202604300089', patientName: '吴海涛', gender: '男', age: 70,
    specimenType: '免疫组化', specimenSource: '脑组织', clinicalDiagnosis: '左顶叶星形细胞瘤',
    grossDescription: '脑组织一块，2.5×2×1.5cm，灰白色，边界不清。',
    microscopicDescription: '星形细胞增生活跃，伴核异型性，符合弥漫性星形细胞瘤。',
    diagnosis: '左顶叶弥漫性星形细胞瘤（WHO II级），IDH突变型',
    diagnosisCode: 'C71.301', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-04-30 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R067', reportId: 'BL202605020067', specimenId: 'BX202604300090', patientName: '刘凤英', gender: '女', age: 46,
    specimenType: '骨髓活检', specimenSource: '髂骨骨髓', clinicalDiagnosis: '骨髓增生异常综合征',
    grossDescription: '骨髓组织一条，长1.2cm，直径0.2cm。',
    microscopicDescription: '骨髓三系增生，伴病态造血，原始细胞增多（约8%）。',
    diagnosis: '骨髓增生异常综合征（MDS-EB1），建议积极治疗',
    diagnosisCode: 'D46.901', tumorDifferentiation: '低分化',
    pathologist: '刘明辉', 审核医生: '李敏', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R068', reportId: 'BL202605020068', specimenId: 'BX202605010091', patientName: '陈国栋', gender: '男', age: 53,
    specimenType: '细胞学', specimenSource: '心包积液', clinicalDiagnosis: '心包积液查因',
    grossDescription: '血性心包积液沉渣，灰红色小块。',
    microscopicDescription: '沉渣切片见腺癌细胞，免疫组化支持肺癌转移。',
    diagnosis: '心包积液腺癌细胞，结合临床及免疫组化符合肺腺癌心包转移',
    diagnosisCode: 'C34.901', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-01 17:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R069', reportId: 'BL202605020069', specimenId: 'BX202605010092', patientName: '林晓晓', gender: '女', age: 32,
    specimenType: '常规活检', specimenSource: '腹腔肿物', clinicalDiagnosis: '腹腔占位',
    grossDescription: '灰白组织2块，大小约0.5×0.4×0.3cm。',
    microscopicDescription: '纤维组织中见腺癌细胞浸润，伴粘液分泌。',
    diagnosis: '腹腔转移性腺癌，原发灶可能来源于消化道',
    diagnosisCode: 'C78.601', tumorDifferentiation: '低分化',
    pathologist: '陈志强', 审核医生: '刘明辉', reportTime: '2025-05-02 11:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R070', reportId: 'BL202605020070', specimenId: 'BX202605010096', patientName: '邓秀英', gender: '女', age: 37,
    specimenType: '常规活检', specimenSource: '宫颈', clinicalDiagnosis: '宫颈赘生物',
    grossDescription: '灰红赘生物一枚，大小0.8×0.5×0.3cm。',
    microscopicDescription: '宫颈粘膜息肉，腺体囊性扩张，间质水肿，慢性炎细胞浸润。',
    diagnosis: '宫颈粘膜息肉，伴慢性炎',
    diagnosisCode: 'N84.001', tumorDifferentiation: undefined,
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R071', reportId: 'BL202605020071', specimenId: 'BX202605010101', patientName: '张伟', gender: '男', age: 58,
    specimenType: '常规活检', specimenSource: '肺门淋巴结', clinicalDiagnosis: '肺癌术后复查',
    grossDescription: '灰白淋巴结1枚，大小1.2×0.8×0.6cm。',
    microscopicDescription: '淋巴结中未见癌转移，淋巴组织反应性增生。',
    diagnosis: '肺门淋巴结未见癌转移（0/1），建议定期随访',
    diagnosisCode: 'Z85.101', tumorDifferentiation: undefined,
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-02 11:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R072', reportId: 'BL202605020072', specimenId: 'BX202605010105', patientName: '陈静', gender: '女', age: 38,
    specimenType: '手术标本', specimenSource: '子宫及双附件', clinicalDiagnosis: '子宫肌瘤',
    grossDescription: '子宫切除标本，大小8×6×4cm，肌层内见多个灰白结节，直径0.5-2cm。',
    microscopicDescription: '平滑肌细胞呈编织状排列，细胞核杆状，未见明显异型性。',
    diagnosis: '子宫多发性平滑肌瘤，良性',
    diagnosisCode: 'D25.901', tumorDifferentiation: '高分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-02 10:00', status: '已审核', isFrozen: false, isIHC: false
  },
  {
    id: 'R073', reportId: 'BL202605020073', specimenId: 'BX202605010109', patientName: '孙燕', gender: '女', age: 61,
    specimenType: '分子病理', specimenSource: '胸腔积液细胞块', clinicalDiagnosis: '肺腺癌伴胸膜转移',
    grossDescription: '胸腔积液细胞块，灰红组织1块，大小0.4×0.3×0.2cm。',
    microscopicDescription: '细胞块中见腺癌细胞，TTF-1+，Napsin A+，支持肺腺癌。',
    diagnosis: '胸腔积液转移性肺腺癌，建议基因检测指导靶向治疗',
    diagnosisCode: 'C34.901', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-01 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R074', reportId: 'BL202605020074', specimenId: 'BX202605010112', patientName: '徐鹏', gender: '男', age: 63,
    specimenType: '细胞学', specimenSource: '心包积液', clinicalDiagnosis: '心包积液查因',
    grossDescription: '血性心包积液，沉渣包埋制片。',
    microscopicDescription: '见散在腺癌细胞，细胞异型性明显。',
    diagnosis: '心包积液腺癌细胞，考虑转移性腺癌',
    diagnosisCode: 'C79.801', tumorDifferentiation: '中分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-01 17:30', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R075', reportId: 'BL202605020075', specimenId: 'BX202605020117', patientName: '周建平', gender: '男', age: 62,
    specimenType: '分子病理', specimenSource: '左肺', clinicalDiagnosis: '左肺腺癌',
    grossDescription: '左肺穿刺组织，灰白组织2条，长0.8-1.0cm。',
    microscopicDescription: '腺癌细胞，免疫组化TTF-1+，Napsin A+。',
    diagnosis: '左肺腺癌，建议分子检测指导靶向治疗',
    diagnosisCode: 'C34.102', tumorDifferentiation: '中分化',
    pathologist: '张建国', 审核医生: '李敏', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R076', reportId: 'BL202605020076', specimenId: 'BX202605020118', patientName: '吴秀英', gender: '女', age: 48,
    specimenType: '分子病理', specimenSource: '胃', clinicalDiagnosis: '胃腺癌',
    grossDescription: '胃窦活检组织，灰白4块。',
    microscopicDescription: '腺癌组织，伴粘液分泌，HER2（1+）。',
    diagnosis: '胃窦腺癌（中-低分化），建议加做HER2 FISH检测',
    diagnosisCode: 'C16.901', tumorDifferentiation: '低分化',
    pathologist: '张建国', 审核医生: '陈志强', reportTime: '2025-05-01 16:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R077', reportId: 'BL202605020077', specimenId: 'BX202605020119', patientName: '马立军', gender: '男', age: 55,
    specimenType: '免疫组化', specimenSource: '左膝', clinicalDiagnosis: '左膝骨巨细胞瘤',
    grossDescription: '左膝刮除标本，灰红组织约2×1.5×1cm。',
    microscopicDescription: '单核细胞及多核巨细胞混合，CD68+，S100-，符合骨巨细胞瘤。',
    diagnosis: '左膝骨巨细胞瘤（I级），建议定期复查',
    diagnosisCode: 'C40.252', tumorDifferentiation: '中分化',
    pathologist: '刘明辉', 审核医生: '陈志强', reportTime: '2025-05-01 14:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R078', reportId: 'BL202605020078', specimenId: 'BX202605020120', patientName: '王秀芬', gender: '女', age: 41,
    specimenType: '分子病理', specimenSource: '左乳', clinicalDiagnosis: '左乳浸润性癌',
    grossDescription: '左乳穿刺组织，灰白2条。',
    microscopicDescription: '浸润性癌，ER+，PR+，HER2（2+），建议FISH检测。',
    diagnosis: '左乳浸润性癌，ER阳性，PR阳性，HER2待定',
    diagnosisCode: 'C50.902', tumorDifferentiation: '中分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R079', reportId: 'BL202605020079', specimenId: 'BX202605020122', patientName: '陈美娟', gender: '女', age: 39,
    specimenType: '分子病理', specimenSource: '宫颈', clinicalDiagnosis: '宫颈鳞状细胞癌',
    grossDescription: '宫颈活检，灰白组织3块。',
    microscopicDescription: '鳞状细胞癌，p16强阳性，伴角化。',
    diagnosis: '宫颈鳞状细胞癌（中分化），建议根治性手术',
    diagnosisCode: 'C53.901', tumorDifferentiation: '中分化',
    pathologist: '王丽华', 审核医生: '李敏', reportTime: '2025-05-01 16:00', status: '已审核', isFrozen: false, isIHC: true
  },
  {
    id: 'R080', reportId: 'BL202605020080', specimenId: 'BX202605020125', patientName: '杨大海', gender: '男', age: 73,
    specimenType: '分子病理', specimenSource: '脑组织', clinicalDiagnosis: '右颞叶胶质母细胞瘤',
    grossDescription: '脑组织，灰白灰红，大小2×1.5×1cm。',
    microscopicDescription: '胶质母细胞瘤，IDH野生型，TERT启动子突变阳性。',
    diagnosis: '右颞叶胶质母细胞瘤（WHO IV级），IDH野生型，TERT突变型',
    diagnosisCode: 'C71.201', tumorDifferentiation: '未分化',
    pathologist: '李敏', 审核医生: '张建国', reportTime: '2025-05-01 15:00', status: '已审核', isFrozen: false, isIHC: true
  },
];

export const frozenCases: FrozenCase[] = [
  { id: 'F001', patientName: '徐鹏', gender: '男', age: 63, surgeryType: '心脏肿瘤切除术', surgeon: '刘德明', specimenSource: '右心房肿物', receiveTime: '2025-05-02 15:35', sliceTime: '2025-05-02 15:50', diagnosisTime: '2025-05-02 16:05', diagnosis: '右心房血管肉瘤', result: '恶性', elapsedMinutes: 30, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F002', patientName: '张伟', gender: '男', age: 58, surgeryType: '右肺叶切除术', surgeon: '李明华', specimenSource: '右肺结节', receiveTime: '2025-05-02 09:20', sliceTime: '2025-05-02 09:35', diagnosisTime: '2025-05-02 09:48', diagnosis: '右下肺浸润性腺癌', result: '恶性', elapsedMinutes: 28, status: '已完成', pathologist: '张建国', turnaroundTarget: 30 },
  { id: 'F003', patientName: '王芳', gender: '女', age: 52, surgeryType: '腹腔镜探查术', surgeon: '陈志勇', specimenSource: '大网膜结节', receiveTime: '2025-05-01 14:10', sliceTime: '2025-05-01 14:25', diagnosisTime: '2025-05-01 14:38', diagnosis: '大网膜转移性腺癌', result: '恶性', elapsedMinutes: 28, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F004', patientName: '陈静', gender: '女', age: 38, surgeryType: '腹腔镜子宫全切术', surgeon: '刘雅琴', specimenSource: '子宫肿物', receiveTime: '2025-05-01 11:00', sliceTime: '2025-05-01 11:15', diagnosisTime: '2025-05-01 11:32', diagnosis: '子宫平滑肌瘤', result: '良性', elapsedMinutes: 32, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F005', patientName: '赵新建', gender: '男', age: 66, surgeryType: '右肺上叶切除术', surgeon: '李明华', specimenSource: '右肺结节', receiveTime: '2025-05-03 09:05', sliceTime: '2025-05-03 09:20', diagnosisTime: '2025-05-03 09:40', diagnosis: '右下肺鳞状细胞癌', result: '恶性', elapsedMinutes: 35, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F006', patientName: '贾志明', gender: '男', age: 69, surgeryType: '经尿道膀胱肿瘤切除术', surgeon: '孙建平', specimenSource: '膀胱肿物', receiveTime: '2025-05-01 08:05', sliceTime: '2025-05-01 08:18', diagnosisTime: '2025-05-01 08:40', diagnosis: '膀胱低级别乳头状癌', result: '恶性', elapsedMinutes: 35, status: '已完成', pathologist: '陈志强', turnaroundTarget: 30 },
  { id: 'F007', patientName: '钱文华', gender: '男', age: 59, surgeryType: '左肝部分切除术', surgeon: '马立军', specimenSource: '肝左叶肿物', receiveTime: '2025-04-29 08:05', sliceTime: '2025-04-29 08:20', diagnosisTime: '2025-04-29 08:40', diagnosis: '肝细胞癌', result: '恶性', elapsedMinutes: 35, status: '已完成', pathologist: '张建国', turnaroundTarget: 30 },
  { id: 'F008', patientName: '冯志强', gender: '男', age: 45, surgeryType: '右肺下叶切除术', surgeon: '李明华', specimenSource: '右下肺结节', receiveTime: '2025-04-30 08:05', sliceTime: '2025-04-30 08:20', diagnosisTime: '2025-04-30 08:40', diagnosis: '右下肺腺癌', result: '恶性', elapsedMinutes: 35, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F009', patientName: '吴磊', gender: '男', age: 55, surgeryType: '左股骨肿瘤切除术', surgeon: '周大伟', specimenSource: '左股骨肿物', receiveTime: '2025-04-28 08:05', sliceTime: '2025-04-28 08:18', diagnosisTime: '2025-04-28 08:40', diagnosis: '骨巨细胞瘤', result: '良性', elapsedMinutes: 35, status: '已完成', pathologist: '刘明辉', turnaroundTarget: 30 },
  { id: 'F010', patientName: '马超', gender: '男', age: 29, surgeryType: '腹腔镜探查术', surgeon: '陈志勇', specimenSource: '腹腔肿物', receiveTime: '2025-04-28 14:30', sliceTime: '2025-04-28 14:45', diagnosisTime: '2025-04-28 15:08', diagnosis: '小肠间质瘤可能大', result: '交界性', elapsedMinutes: 38, status: '已完成', pathologist: '刘明辉', turnaroundTarget: 30 },
  { id: 'F011', patientName: '高峰', gender: '男', age: 71, surgeryType: '脑肿瘤切除术', surgeon: '王志强', specimenSource: '右额叶脑组织', receiveTime: '2025-04-28 09:00', sliceTime: '2025-04-28 09:15', diagnosisTime: '2025-04-28 09:45', diagnosis: '高级别胶质瘤', result: '恶性', elapsedMinutes: 45, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F012', patientName: '李天山', gender: '男', age: 68, surgeryType: '右肺中下叶切除术', surgeon: '李雪梅', specimenSource: '右肺肿物', receiveTime: '2025-04-29 09:30', sliceTime: '2025-04-29 09:45', diagnosisTime: '2025-04-29 10:12', diagnosis: '右肺腺癌', result: '恶性', elapsedMinutes: 42, status: '已完成', pathologist: '张建国', turnaroundTarget: 30 },
  { id: 'F013', patientName: '郑明', gender: '男', age: 48, surgeryType: '左肝部分切除术', surgeon: '马立军', specimenSource: '肝右叶肿物', receiveTime: '2025-04-30 10:00', sliceTime: '2025-04-30 10:15', diagnosisTime: '2025-04-30 10:38', diagnosis: '肝血管瘤', result: '良性', elapsedMinutes: 38, status: '已完成', pathologist: '张建国', turnaroundTarget: 30 },
  { id: 'F014', patientName: '徐志强', gender: '男', age: 65, surgeryType: '右肾部分切除术', surgeon: '孙建平', specimenSource: '右肾肿物', receiveTime: '2025-05-01 09:30', sliceTime: '2025-05-01 09:45', diagnosisTime: '2025-05-01 10:08', diagnosis: '右肾癌待定', result: '无法确定', elapsedMinutes: 38, status: '已完成', pathologist: '陈志强', turnaroundTarget: 30 },
  { id: 'F015', patientName: '姜志远', gender: '男', age: 61, surgeryType: '左肩胛骨肿瘤切除术', surgeon: '周大伟', specimenSource: '左肩胛骨肿物', receiveTime: '2025-05-01 08:30', sliceTime: '2025-05-01 08:45', diagnosisTime: '2025-05-01 09:20', diagnosis: '骨肉瘤', result: '恶性', elapsedMinutes: 50, status: '已完成', pathologist: '刘明辉', turnaroundTarget: 30 },
  { id: 'F016', patientName: '丁建新', gender: '男', age: 60, surgeryType: '胸椎肿瘤切除术', surgeon: '王志强', specimenSource: '胸椎肿物', receiveTime: '2025-04-29 10:00', sliceTime: '2025-04-29 10:15', diagnosisTime: '2025-04-29 10:55', diagnosis: '胸椎转移瘤', result: '恶性', elapsedMinutes: 55, status: '已完成', pathologist: '刘明辉', turnaroundTarget: 30 },
  { id: 'F017', patientName: '王秀芬', gender: '女', age: 41, surgeryType: '左乳改良根治术', surgeon: '王秀英', specimenSource: '左乳肿物', receiveTime: '2025-04-30 07:45', sliceTime: '2025-04-30 08:00', diagnosisTime: '2025-04-30 08:25', diagnosis: '左乳浸润性癌', result: '恶性', elapsedMinutes: 40, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F018', patientName: '黄丽', gender: '女', age: 42, surgeryType: '右乳改良根治术', surgeon: '王秀芬', specimenSource: '右乳肿物', receiveTime: '2025-04-28 08:00', sliceTime: '2025-04-28 08:15', diagnosisTime: '2025-04-28 08:42', diagnosis: '右乳浸润性癌', result: '恶性', elapsedMinutes: 42, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F019', patientName: '郑美丽', gender: '女', age: 54, surgeryType: '左乳改良根治术', surgeon: '王秀芬', specimenSource: '左乳肿物', receiveTime: '2025-04-29 07:30', sliceTime: '2025-04-29 07:45', diagnosisTime: '2025-04-29 08:12', diagnosis: '左乳浸润性癌', result: '恶性', elapsedMinutes: 42, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F020', patientName: '马琳娜', gender: '女', age: 49, surgeryType: '右乳保乳术', surgeon: '王秀芬', specimenSource: '右乳肿物', receiveTime: '2025-05-01 08:00', sliceTime: '2025-05-01 08:15', diagnosisTime: '2025-05-01 08:40', diagnosis: '右乳导管内癌', result: '恶性', elapsedMinutes: 40, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F021', patientName: '陈美娟', gender: '女', age: 39, surgeryType: '腹腔镜广泛子宫切除术', surgeon: '刘雅琴', specimenSource: '宫颈肿物', receiveTime: '2025-04-29 09:00', sliceTime: '2025-04-29 09:15', diagnosisTime: '2025-04-29 09:40', diagnosis: '宫颈鳞癌', result: '恶性', elapsedMinutes: 40, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F022', patientName: '刘强', gender: '男', age: 67, surgeryType: '直肠癌根治术', surgeon: '陈志勇', specimenSource: '直肠肿物', receiveTime: '2025-04-30 08:30', sliceTime: '2025-04-30 08:45', diagnosisTime: '2025-04-30 09:10', diagnosis: '直肠腺癌', result: '恶性', elapsedMinutes: 40, status: '已完成', pathologist: '陈志强', turnaroundTarget: 30 },
  { id: 'F023', patientName: '孙燕', gender: '女', age: 61, surgeryType: '胸腔镜下胸膜活检术', surgeon: '李雪梅', specimenSource: '胸膜结节', receiveTime: '2025-04-28 10:00', sliceTime: '2025-04-28 10:15', diagnosisTime: '2025-04-28 10:42', diagnosis: '胸膜转移性腺癌', result: '恶性', elapsedMinutes: 42, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F024', patientName: '杨大海', gender: '男', age: 73, surgeryType: '脑肿瘤切除术', surgeon: '王志强', specimenSource: '右颞叶脑组织', receiveTime: '2025-04-29 08:30', sliceTime: '2025-04-29 08:45', diagnosisTime: '2025-04-29 09:20', diagnosis: '胶质母细胞瘤', result: '恶性', elapsedMinutes: 50, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F025', patientName: '赵军', gender: '男', age: 72, surgeryType: '右肾根治性切除术', surgeon: '孙建平', specimenSource: '右肾肿物', receiveTime: '2025-04-29 08:00', sliceTime: '2025-04-29 08:15', diagnosisTime: '2025-04-29 08:40', diagnosis: '右肾透明细胞癌', result: '恶性', elapsedMinutes: 40, status: '已完成', pathologist: '陈志强', turnaroundTarget: 30 },
  { id: 'F026', patientName: '李娜', gender: '女', age: 45, surgeryType: '左乳保乳术', surgeon: '王秀英', specimenSource: '左乳肿物', receiveTime: '2025-04-30 09:00', sliceTime: '2025-04-30 09:15', diagnosisTime: '2025-04-30 09:42', diagnosis: '左乳浸润性癌', result: '恶性', elapsedMinutes: 42, status: '已完成', pathologist: '王丽华', turnaroundTarget: 30 },
  { id: 'F027', patientName: '马立军', gender: '男', age: 55, surgeryType: '左膝关节镜检术', surgeon: '周大伟', specimenSource: '左膝肿物', receiveTime: '2025-04-28 09:00', sliceTime: '2025-04-28 09:15', diagnosisTime: '2025-04-28 09:40', diagnosis: '左膝血管瘤', result: '良性', elapsedMinutes: 40, status: '已完成', pathologist: '刘明辉', turnaroundTarget: 30 },
  { id: 'F028', patientName: '钱文华', gender: '男', age: 59, surgeryType: '肝血管瘤切除术', surgeon: '马立军', specimenSource: '肝左叶肿物', receiveTime: '2025-05-03 09:00', sliceTime: '2025-05-03 09:15', diagnosisTime: '2025-05-03 09:40', diagnosis: '肝海绵状血管瘤', result: '良性', elapsedMinutes: 40, status: '已完成', pathologist: '张建国', turnaroundTarget: 30 },
  { id: 'F029', patientName: '徐鹏', gender: '男', age: 63, surgeryType: '心脏粘液瘤切除术', surgeon: '刘德明', specimenSource: '左心房肿物', receiveTime: '2025-04-28 07:30', sliceTime: '2025-04-28 07:45', diagnosisTime: '2025-04-28 08:10', diagnosis: '左心房粘液瘤', result: '良性', elapsedMinutes: 40, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
  { id: 'F030', patientName: '周志明', gender: '男', age: 64, surgeryType: '心脏肿瘤切除术', surgeon: '刘德明', specimenSource: '心脏占位', receiveTime: '2025-04-29 07:30', sliceTime: '2025-04-29 07:45', diagnosisTime: '2025-04-29 08:12', diagnosis: '心脏粘液瘤', result: '良性', elapsedMinutes: 42, status: '已完成', pathologist: '李敏', turnaroundTarget: 30 },
];

export const qcRecords: QCRecord[] = [
  { id: 'Q001', month: '2025-04', totalCases: 892, completedCases: 885, frozenCases: 48, ihcCases: 156, molecularCases: 67, avgTurnaroundHours: 42.5, frozenTurnaroundMinutes: 26, satisfactoryRate: 97.2, qcScore: 94.5, issues: ['2例切片脱片', '1例免疫组化染色不均'], reportedToRegional: true, reportedDate: '2025-05-05' },
  { id: 'Q002', month: '2025-03', totalCases: 856, completedCases: 850, frozenCases: 45, ihcCases: 148, molecularCases: 62, avgTurnaroundHours: 40.2, frozenTurnaroundMinutes: 25, satisfactoryRate: 97.8, qcScore: 95.2, issues: ['3例报告延迟超过72小时'], reportedToRegional: true, reportedDate: '2025-04-05' },
  { id: 'Q003', month: '2025-02', totalCases: 720, completedCases: 718, frozenCases: 38, ihcCases: 125, molecularCases: 55, avgTurnaroundHours: 38.8, frozenTurnaroundMinutes: 24, satisfactoryRate: 98.1, qcScore: 96.0, issues: [], reportedToRegional: true, reportedDate: '2025-03-05' },
  { id: 'Q004', month: '2025-01', totalCases: 910, completedCases: 905, frozenCases: 52, ihcCases: 162, molecularCases: 70, avgTurnaroundHours: 44.1, frozenTurnaroundMinutes: 27, satisfactoryRate: 96.5, qcScore: 93.8, issues: ['冰冻切片优良率偏低', '免疫组化对比度不足'], reportedToRegional: true, reportedDate: '2025-02-05' },
  { id: 'Q005', month: '2024-12', totalCases: 876, completedCases: 870, frozenCases: 46, ihcCases: 152, molecularCases: 65, avgTurnaroundHours: 41.3, frozenTurnaroundMinutes: 25, satisfactoryRate: 97.5, qcScore: 94.8, issues: ['1例标本标识错误'], reportedToRegional: true, reportedDate: '2025-01-05' },
  { id: 'Q006', month: '2024-11', totalCases: 845, completedCases: 840, frozenCases: 44, ihcCases: 145, molecularCases: 60, avgTurnaroundHours: 39.6, frozenTurnaroundMinutes: 24, satisfactoryRate: 97.9, qcScore: 95.5, issues: [], reportedToRegional: true, reportedDate: '2024-12-05' },
  { id: 'Q007', month: '2024-10', totalCases: 820, completedCases: 815, frozenCases: 42, ihcCases: 138, molecularCases: 58, avgTurnaroundHours: 38.2, frozenTurnaroundMinutes: 24, satisfactoryRate: 98.2, qcScore: 96.2, issues: [], reportedToRegional: true, reportedDate: '2024-11-05' },
  { id: 'Q008', month: '2024-09', totalCases: 798, completedCases: 792, frozenCases: 40, ihcCases: 130, molecularCases: 55, avgTurnaroundHours: 37.5, frozenTurnaroundMinutes: 23, satisfactoryRate: 98.0, qcScore: 95.8, issues: ['2例分子检测延误'], reportedToRegional: true, reportedDate: '2024-10-05' },
  { id: 'Q009', month: '2024-08', totalCases: 780, completedCases: 775, frozenCases: 38, ihcCases: 125, molecularCases: 52, avgTurnaroundHours: 36.8, frozenTurnaroundMinutes: 23, satisfactoryRate: 98.3, qcScore: 96.5, issues: [], reportedToRegional: true, reportedDate: '2024-09-05' },
  { id: 'Q010', month: '2024-07', totalCases: 765, completedCases: 760, frozenCases: 36, ihcCases: 120, molecularCases: 50, avgTurnaroundHours: 36.2, frozenTurnaroundMinutes: 22, satisfactoryRate: 98.5, qcScore: 96.8, issues: [], reportedToRegional: true, reportedDate: '2024-08-05' },
  { id: 'Q011', month: '2024-06', totalCases: 752, completedCases: 748, frozenCases: 35, ihcCases: 118, molecularCases: 48, avgTurnaroundHours: 35.8, frozenTurnaroundMinutes: 22, satisfactoryRate: 98.4, qcScore: 96.6, issues: [], reportedToRegional: true, reportedDate: '2024-07-05' },
  { id: 'Q012', month: '2024-05', totalCases: 740, completedCases: 736, frozenCases: 34, ihcCases: 115, molecularCases: 46, avgTurnaroundHours: 35.5, frozenTurnaroundMinutes: 22, satisfactoryRate: 98.6, qcScore: 97.0, issues: [], reportedToRegional: true, reportedDate: '2024-06-05' },
];

export const ihcReports: IHCReport[] = [
  {
    id: 'I001', specimenId: 'BX202605020011', patientName: '黄丽', clinicalDiagnosis: '右乳浸润性癌',
    markers: [
      { marker: 'ER', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'PR', result: '阳性', intensity: 2, percentage: 60, location: '细胞核' },
      { marker: 'HER2', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 35, location: '细胞核' },
      { marker: 'E-cadherin', result: '阳性', intensity: 3, percentage: 100, location: '细胞膜' },
      { marker: 'P120', result: '阳性', intensity: 3, percentage: 100, location: '细胞膜' },
    ],
    pathologist: '王丽华', reportTime: '2025-05-02 15:00', status: '已完成'
  },
  {
    id: 'I002', specimenId: 'BX202605010023', patientName: '周建平', clinicalDiagnosis: '胃腺癌',
    markers: [
      { marker: 'HER2', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 65, location: '细胞核' },
      { marker: 'CEA', result: '阳性', intensity: 2, percentage: 80, location: '细胞质' },
      { marker: 'CDX2', result: '阳性', intensity: 3, percentage: 95, location: '细胞核' },
    ],
    pathologist: '张建国', reportTime: '2025-05-01 16:30', status: '已完成'
  },
  {
    id: 'I003', specimenId: 'BX202605010018', patientName: '马超', clinicalDiagnosis: '淋巴结转移性癌原发灶不明',
    markers: [
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 100, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 2, percentage: 85, location: '细胞质' },
    ],
    pathologist: '李敏', reportTime: '2025-05-01 14:00', status: '已完成'
  },
  {
    id: 'I004', specimenId: 'BX202604280065', patientName: '高峰', clinicalDiagnosis: '脑胶质母细胞瘤',
    markers: [
      { marker: 'GFAP', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'IDH1', result: '阴性', intensity: 0, percentage: 0, location: '细胞核' },
      { marker: 'ATRX', result: '阳性', intensity: 3, percentage: 95, location: '细胞核' },
      { marker: 'MGMT', result: '阳性', intensity: 2, percentage: 40, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 60, location: '细胞核' },
    ],
    pathologist: '李敏', reportTime: '2025-04-28 14:00', status: '已完成'
  },
  {
    id: 'I005', specimenId: 'BX202605020014', patientName: '林梅', clinicalDiagnosis: '甲状腺乳头状癌',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 95, location: '细胞核' },
      { marker: 'TG', result: '阳性', intensity: 2, percentage: 80, location: '细胞质' },
      { marker: 'CK19', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'HBME-1', result: '阳性', intensity: 2, percentage: 85, location: '细胞膜' },
    ],
    pathologist: '陈志强', reportTime: '2025-04-29 10:00', status: '已完成'
  },
  {
    id: 'I006', specimenId: 'BX202605020044', patientName: '马琳娜', clinicalDiagnosis: '右乳浸润性癌',
    markers: [
      { marker: 'ER', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
      { marker: 'PR', result: '阳性', intensity: 2, percentage: 70, location: '细胞核' },
      { marker: 'HER2', result: '阳性', intensity: 2, percentage: 30, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 25, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-04-29 15:00', status: '已完成'
  },
  {
    id: 'I007', specimenId: 'BX202605020036', patientName: '韩丽娜', clinicalDiagnosis: '左腋窝淋巴结转移性癌',
    markers: [
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 100, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
      { marker: 'GCDFP-15', result: '阳性', intensity: 2, percentage: 75, location: '细胞质' },
      { marker: 'Mammaglobin', result: '阳性', intensity: 2, percentage: 60, location: '细胞质' },
    ],
    pathologist: '王丽华', reportTime: '2025-05-03 14:00', status: '已完成'
  },
  {
    id: 'I008', specimenId: 'BX202605020034', patientName: '孙丽华', clinicalDiagnosis: '皮肤恶性黑色素瘤',
    markers: [
      { marker: 'S-100', result: '阳性', intensity: 3, percentage: 100, location: '细胞核' },
      { marker: 'HMB-45', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'Melan-A', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'SOX10', result: '阳性', intensity: 3, percentage: 100, location: '细胞核' },
    ],
    pathologist: '刘明辉', reportTime: '2025-04-30 11:00', status: '已完成'
  },
  {
    id: 'I009', specimenId: 'BX202605020041', patientName: '马超', clinicalDiagnosis: '弥漫大B细胞淋巴瘤',
    markers: [
      { marker: 'CD20', result: '阳性', intensity: 3, percentage: 90, location: '细胞膜' },
      { marker: 'CD3', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'CD10', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'BCL6', result: '阳性', intensity: 3, percentage: 80, location: '细胞核' },
      { marker: 'MUM1', result: '阳性', intensity: 2, percentage: 70, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
    ],
    pathologist: '刘明辉', reportTime: '2025-05-01 16:00', status: '已完成'
  },
  {
    id: 'I010', specimenId: 'BX202605020063', patientName: '徐志强', clinicalDiagnosis: '右肾透明细胞癌',
    markers: [
      { marker: 'CD10', result: '阳性', intensity: 3, percentage: 95, location: '细胞膜' },
      { marker: 'CAIX', result: '阳性', intensity: 3, percentage: 90, location: '细胞膜' },
      { marker: 'Vimentin', result: '阳性', intensity: 2, percentage: 85, location: '细胞质' },
      { marker: 'EMA', result: '阳性', intensity: 2, percentage: 80, location: '细胞膜' },
      { marker: 'Hale', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
    ],
    pathologist: '陈志强', reportTime: '2025-04-30 15:00', status: '已完成'
  },
  {
    id: 'I011', specimenId: 'BX202605020054', patientName: '陈美娟', clinicalDiagnosis: '宫颈鳞癌',
    markers: [
      { marker: 'p16', result: '阳性', intensity: 3, percentage: 100, location: '细胞核' },
      { marker: 'CK5/6', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'p63', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 70, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-04-29 15:00', status: '已完成'
  },
  {
    id: 'I012', specimenId: 'BX202605020061', patientName: '丁建新', clinicalDiagnosis: '胸椎转移性腺癌',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 2, percentage: 75, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
    ],
    pathologist: '刘明辉', reportTime: '2025-05-01 10:00', status: '已完成'
  },
  {
    id: 'I013', specimenId: 'BX202605020068', patientName: '陈国栋', clinicalDiagnosis: '心包积液腺癌细胞',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 80, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 2, percentage: 70, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
    ],
    pathologist: '李敏', reportTime: '2025-05-01 17:00', status: '已完成'
  },
  {
    id: 'I014', specimenId: 'BX202605020078', patientName: '王秀芬', clinicalDiagnosis: '左乳浸润性癌',
    markers: [
      { marker: 'ER', result: '阳性', intensity: 3, percentage: 95, location: '细胞核' },
      { marker: 'PR', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
      { marker: 'HER2', result: '可疑', intensity: 2, percentage: 20, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 30, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-05-01 15:00', status: '已完成'
  },
  {
    id: 'I015', specimenId: 'BX202605020069', patientName: '林晓晓', clinicalDiagnosis: '腹腔转移性腺癌',
    markers: [
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'CK20', result: '阳性', intensity: 2, percentage: 70, location: '细胞质' },
      { marker: 'CDX2', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
      { marker: 'CA125', result: '阳性', intensity: 2, percentage: 60, location: '细胞质' },
    ],
    pathologist: '陈志强', reportTime: '2025-05-02 11:00', status: '已完成'
  },
  {
    id: 'I016', specimenId: 'BX202604280053', patientName: '王芳', clinicalDiagnosis: '胃腺癌',
    markers: [
      { marker: 'HER2', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 70, location: '细胞核' },
      { marker: 'CEA', result: '阳性', intensity: 2, percentage: 85, location: '细胞质' },
      { marker: 'CDX2', result: '阳性', intensity: 2, percentage: 75, location: '细胞核' },
    ],
    pathologist: '张建国', reportTime: '2025-04-29 14:00', status: '已完成'
  },
  {
    id: 'I017', specimenId: 'BX202604280059', patientName: '孙燕', clinicalDiagnosis: '胸腔积液转移性腺癌',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 3, percentage: 85, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
    ],
    pathologist: '李敏', reportTime: '2025-04-28 14:00', status: '已完成'
  },
  {
    id: 'I018', specimenId: 'BX202604280061', patientName: '黄丽', clinicalDiagnosis: '右乳浸润性癌',
    markers: [
      { marker: 'ER', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'PR', result: '阳性', intensity: 2, percentage: 60, location: '细胞核' },
      { marker: 'HER2', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 35, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-04-28 14:00', status: '已完成'
  },
  {
    id: 'I019', specimenId: 'BX202604280076', patientName: '郑小丽', clinicalDiagnosis: '全血细胞减少待查',
    markers: [
      { marker: 'CD34', result: '阳性', intensity: 2, percentage: 15, location: '细胞膜' },
      { marker: 'CD117', result: '阳性', intensity: 2, percentage: 20, location: '细胞膜' },
      { marker: 'CD61', result: '阳性', intensity: 2, percentage: 30, location: '细胞质' },
      { marker: 'MPO', result: '阳性', intensity: 3, percentage: 50, location: '细胞质' },
    ],
    pathologist: '刘明辉', reportTime: '2025-04-30 14:00', status: '已完成'
  },
  {
    id: 'I020', specimenId: 'BX202605020066', patientName: '吴海涛', clinicalDiagnosis: '左顶叶星形细胞瘤',
    markers: [
      { marker: 'GFAP', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'IDH1', result: '阳性', intensity: 2, percentage: 80, location: '细胞核' },
      { marker: 'ATRX', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'p53', result: '阳性', intensity: 2, percentage: 70, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 15, location: '细胞核' },
    ],
    pathologist: '李敏', reportTime: '2025-04-30 14:00', status: '已完成'
  },
  {
    id: 'I021', specimenId: 'BX202605020067', patientName: '刘凤英', clinicalDiagnosis: '骨髓增生异常综合征',
    markers: [
      { marker: 'CD34', result: '阳性', intensity: 2, percentage: 8, location: '细胞膜' },
      { marker: 'CD117', result: '阳性', intensity: 2, percentage: 12, location: '细胞膜' },
      { marker: 'MPO', result: '阳性', intensity: 3, percentage: 45, location: '细胞质' },
      { marker: 'CD42b', result: '阳性', intensity: 2, percentage: 25, location: '细胞膜' },
    ],
    pathologist: '刘明辉', reportTime: '2025-05-01 15:00', status: '已完成'
  },
  {
    id: 'I022', specimenId: 'BX202605020073', patientName: '孙燕', clinicalDiagnosis: '胸腔积液转移性肺腺癌',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 88, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 2, percentage: 80, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'CEA', result: '阳性', intensity: 2, percentage: 75, location: '细胞质' },
    ],
    pathologist: '李敏', reportTime: '2025-05-01 14:00', status: '已完成'
  },
  {
    id: 'I023', specimenId: 'BX202605020075', patientName: '周建平', clinicalDiagnosis: '左肺腺癌',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 92, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 3, percentage: 85, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 40, location: '细胞核' },
    ],
    pathologist: '张建国', reportTime: '2025-05-01 15:00', status: '已完成'
  },
  {
    id: 'I024', specimenId: 'BX202605020076', patientName: '吴秀英', clinicalDiagnosis: '胃腺癌',
    markers: [
      { marker: 'HER2', result: '可疑', intensity: 1, percentage: 15, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 65, location: '细胞核' },
      { marker: 'CEA', result: '阳性', intensity: 2, percentage: 80, location: '细胞质' },
      { marker: 'CDX2', result: '阳性', intensity: 2, percentage: 70, location: '细胞核' },
    ],
    pathologist: '张建国', reportTime: '2025-05-01 16:00', status: '已完成'
  },
  {
    id: 'I025', specimenId: 'BX202605020077', patientName: '马立军', clinicalDiagnosis: '左膝骨巨细胞瘤',
    markers: [
      { marker: 'CD68', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'S-100', result: '阴性', intensity: 0, percentage: 0, location: '细胞核' },
      { marker: 'SMA', result: '阳性', intensity: 2, percentage: 40, location: '细胞质' },
      { marker: 'Desmin', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
    ],
    pathologist: '刘明辉', reportTime: '2025-05-01 14:00', status: '已完成'
  },
  {
    id: 'I026', specimenId: 'BX202605020079', patientName: '陈美娟', clinicalDiagnosis: '宫颈鳞癌',
    markers: [
      { marker: 'p16', result: '阳性', intensity: 3, percentage: 100, location: '细胞核' },
      { marker: 'CK5/6', result: '阳性', intensity: 3, percentage: 95, location: '细胞质' },
      { marker: 'p63', result: '阳性', intensity: 3, percentage: 90, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 75, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-05-01 16:00', status: '已完成'
  },
  {
    id: 'I027', specimenId: 'BX202605020080', patientName: '杨大海', clinicalDiagnosis: '右颞叶胶质母细胞瘤',
    markers: [
      { marker: 'GFAP', result: '阳性', intensity: 3, percentage: 88, location: '细胞质' },
      { marker: 'IDH1', result: '阴性', intensity: 0, percentage: 0, location: '细胞核' },
      { marker: 'ATRX', result: '阳性', intensity: 3, percentage: 92, location: '细胞核' },
      { marker: 'TERT', result: '阳性', intensity: 3, percentage: 85, location: '细胞核' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 55, location: '细胞核' },
    ],
    pathologist: '李敏', reportTime: '2025-05-01 15:00', status: '已完成'
  },
  {
    id: 'I028', specimenId: 'BX202605020030', patientName: '郑美丽', clinicalDiagnosis: '左乳浸润性癌',
    markers: [
      { marker: 'ER', result: '阳性', intensity: 3, percentage: 88, location: '细胞核' },
      { marker: 'PR', result: '阳性', intensity: 2, percentage: 65, location: '细胞核' },
      { marker: 'HER2', result: '阴性', intensity: 0, percentage: 0, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 2, percentage: 40, location: '细胞核' },
    ],
    pathologist: '王丽华', reportTime: '2025-04-30 11:00', status: '已完成'
  },
  {
    id: 'I029', specimenId: 'BX202605020038', patientName: '吴秀英', clinicalDiagnosis: '胃窦腺癌术后复发',
    markers: [
      { marker: 'HER2', result: '阳性', intensity: 2, percentage: 25, location: '细胞膜' },
      { marker: 'Ki-67', result: '阳性', intensity: 3, percentage: 70, location: '细胞核' },
      { marker: 'CEA', result: '阳性', intensity: 3, percentage: 85, location: '细胞质' },
      { marker: 'CDX2', result: '阳性', intensity: 2, percentage: 75, location: '细胞核' },
    ],
    pathologist: '张建国', reportTime: '2025-05-02 14:00', status: '已完成'
  },
  {
    id: 'I030', specimenId: 'BX202605020074', patientName: '徐鹏', clinicalDiagnosis: '心包积液腺癌细胞',
    markers: [
      { marker: 'TTF-1', result: '阳性', intensity: 3, percentage: 82, location: '细胞核' },
      { marker: 'Napsin A', result: '阳性', intensity: 2, percentage: 72, location: '细胞质' },
      { marker: 'CK7', result: '阳性', intensity: 3, percentage: 90, location: '细胞质' },
      { marker: 'CK20', result: '阴性', intensity: 0, percentage: 0, location: '细胞质' },
    ],
    pathologist: '李敏', reportTime: '2025-05-01 17:30', status: '已完成'
  },
];

export const molecularTests: MolecularTest[] = [
  { id: 'M001', specimenId: 'BX202605010011', patientName: '黄丽', testType: 'FISH', gene: 'HER2', result: '阴性', detail: 'HER2基因拷贝数为2.1（<4.0），无扩增', pathologist: '王丽华', reportTime: '2025-05-02 17:00' },
  { id: 'M002', specimenId: 'BX202605010015', patientName: '张志远', testType: 'PCR', gene: 'EGFR', result: '突变', detail: 'EGFR L858R突变阳性', pathologist: '陈志强', reportTime: '2025-05-01 18:00' },
  { id: 'M003', specimenId: 'BX202605010008', patientName: '李天山', testType: 'NGS', gene: 'KRAS/NRAS/BRAF', result: '野生型', detail: 'KRAS外显子2/3/4野生型；NRAS外显子2/3/4野生型；BRAF V600E突变阴性', pathologist: '张建国', reportTime: '2025-05-01 15:30' },
  { id: 'M004', specimenId: 'BX202604280022', patientName: '王秀英', testType: '融合基因检测', gene: 'EML4-ALK', result: '阴性', detail: 'ALK融合基因阴性', pathologist: '李敏', reportTime: '2025-04-29 10:00' },
  { id: 'M005', specimenId: 'BX202604250019', patientName: '陈美娟', testType: 'PCR', gene: 'KRAS', result: '突变', detail: 'KRAS G12D突变阳性，提示靶向治疗耐药', pathologist: '王丽华', reportTime: '2025-04-26 11:00' },
  { id: 'M006', specimenId: 'BX202605010051', patientName: '张伟', testType: 'NGS', gene: 'EGFR/ALK/ROS1', result: '突变', detail: 'EGFR外显子19缺失突变（del E746_A750），对一代TKI敏感', pathologist: '张建国', reportTime: '2025-04-29 12:00' },
  { id: 'M007', specimenId: 'BX202605010052', patientName: '李娜', testType: 'FISH', gene: 'HER2', result: '阴性', detail: 'HER2/CEP17比值1.2（<2.0），无基因扩增', pathologist: '王丽华', reportTime: '2025-04-29 15:00' },
  { id: 'M008', specimenId: 'BX202605010071', patientName: '李天山', testType: 'PCR', gene: 'EGFR', result: '突变', detail: 'EGFR T790M突变阳性，提示一代TKI耐药', pathologist: '张建国', reportTime: '2025-05-01 16:00' },
  { id: 'M009', specimenId: 'BX202605010072', patientName: '陈美娟', testType: 'PCR', gene: 'KRAS', result: '野生型', detail: 'KRAS外显子2/3野生型，可考虑抗EGFR靶向治疗', pathologist: '王丽华', reportTime: '2025-05-01 16:00' },
  { id: 'M010', specimenId: 'BX202604280076', patientName: '郑小丽', testType: '染色体核型', gene: 'BCR-ABL', result: '阴性', detail: '费城染色体阴性，BCR-ABL融合基因阴性', pathologist: '刘明辉', reportTime: '2025-04-30 14:00' },
  { id: 'M011', specimenId: 'BX202605010104', patientName: '刘强', testType: 'PCR', gene: 'KRAS/NRAS', result: '野生型', detail: 'KRAS/NRAS全野生型，可使用抗EGFR单抗治疗', pathologist: '陈志强', reportTime: '2025-05-01 15:00' },
  { id: 'M012', specimenId: 'BX202605010109', patientName: '孙燕', testType: 'NGS', gene: 'EGFR/KRAS/ALK/ROS1/HER2', result: '突变', detail: 'EGFR L858R突变阳性，建议使用三代TKI', pathologist: '李敏', reportTime: '2025-05-01 14:00' },
  { id: 'M013', specimenId: 'BX202605010110', patientName: '郑明', testType: 'NGS', gene: 'TP53/CTNNB1/AXIN1', result: '突变', detail: 'TP53突变，CTNNB1突变，提示预后较差', pathologist: '张建国', reportTime: '2025-05-01 15:00' },
  { id: 'M014', specimenId: 'BX202605010113', patientName: '马超', testType: 'FISH', gene: 'MYC/BCL2/BCL6', result: '阳性', detail: 'MYC基因重排阳性，伴BCL2/BCL6重排，符合双重打击淋巴瘤', pathologist: '刘明辉', reportTime: '2025-05-01 16:00' },
  { id: 'M015', specimenId: 'BX202605010117', patientName: '周建平', testType: 'PCR', gene: 'EGFR', result: '突变', detail: 'EGFR 21外显子L858R突变，对一代TKI敏感', pathologist: '张建国', reportTime: '2025-05-01 15:00' },
  { id: 'M016', specimenId: 'BX202605010118', patientName: '吴秀英', testType: 'FISH', gene: 'HER2', result: '阴性', detail: 'HER2/CEP17比值0.9，无基因扩增', pathologist: '张建国', reportTime: '2025-05-01 16:00' },
  { id: 'M017', specimenId: 'BX202605010120', patientName: '王秀芬', testType: 'FISH', gene: 'HER2', result: '阳性', detail: 'HER2/CEP17比值2.8（≥2.0），存在基因扩增', pathologist: '王丽华', reportTime: '2025-05-01 15:00' },
  { id: 'M018', specimenId: 'BX202605010122', patientName: '陈美娟', testType: 'PCR', gene: 'HPV E6/E7 mRNA', result: '阳性', detail: 'HPV16 E6/E7 mRNA阳性，与宫颈癌发生密切相关', pathologist: '王丽华', reportTime: '2025-05-01 16:00' },
  { id: 'M019', specimenId: 'BX202605010125', patientName: '杨大海', testType: 'NGS', gene: 'IDH1/TERT/ATRX', result: '突变', detail: 'IDH1野生型，TERT启动子突变阳性，ATRX缺失，预后不良', pathologist: '李敏', reportTime: '2025-05-01 15:00' },
  { id: 'M020', specimenId: 'BX202605020060', patientName: '曹雪梅', testType: 'PCR', gene: 'BRAF', result: '突变', detail: 'BRAF V600E突变阳性，乳头状甲状腺癌常见突变', pathologist: '陈志强', reportTime: '2025-05-01 11:00' },
  { id: 'M021', specimenId: 'BX202605020068', patientName: '陈国栋', testType: 'NGS', gene: 'EGFR/ALK/ROS1', result: '突变', detail: 'EGFR 19外显子del突变，建议使用一代TKI', pathologist: '李敏', reportTime: '2025-05-01 17:00' },
  { id: 'M022', specimenId: 'BX202605020069', patientName: '林晓晓', testType: 'PCR', gene: 'KRAS/NRAS', result: '野生型', detail: 'KRAS/NRAS全野生型，来源于消化道可能性大', pathologist: '陈志强', reportTime: '2025-05-02 11:00' },
  { id: 'M023', specimenId: 'BX202605020073', patientName: '孙燕', testType: 'NGS', gene: 'EGFR/KRAS/ALK/HER2', result: '突变', detail: 'EGFR L858R+T790M双突变，建议三代TKI联合治疗', pathologist: '李敏', reportTime: '2025-05-01 14:00' },
  { id: 'M024', specimenId: 'BX202605020075', patientName: '周建平', testType: 'PCR', gene: 'EML4-ALK', result: '阴性', detail: 'ALK融合基因阴性，可考虑ROS1检测', pathologist: '张建国', reportTime: '2025-05-01 15:00' },
  { id: 'M025', specimenId: 'BX202605020078', patientName: '王秀芬', testType: 'FISH', gene: 'HER2', result: '阳性', detail: 'HER2 FISH阳性（比值2.5），建议抗HER2靶向治疗', pathologist: '王丽华', reportTime: '2025-05-01 15:00' },
  { id: 'M026', specimenId: 'BX202605020076', patientName: '吴秀英', testType: 'NGS', gene: 'KRAS/NRAS/BRAF/HER2', result: '突变', detail: 'KRAS G12C突变，提示对Sotorasib敏感', pathologist: '张建国', reportTime: '2025-05-01 16:00' },
  { id: 'M027', specimenId: 'BX202605020080', patientName: '杨大海', testType: 'NGS', gene: 'MGMT promoter', result: '突变', detail: 'MGMT启动子甲基化阳性，提示对替莫唑胺敏感', pathologist: '李敏', reportTime: '2025-05-01 15:00' },
  { id: 'M028', specimenId: 'BX202605020067', patientName: '刘凤英', testType: '染色体核型', gene: '全基因组', result: '异常', detail: '染色体核型分析示复杂核型，建议靶向测序', pathologist: '刘明辉', reportTime: '2025-05-01 15:00' },
  { id: 'M029', specimenId: 'BX202605020030', patientName: '郑美丽', testType: 'FISH', gene: 'HER2', result: '阴性', detail: 'HER2/CEP17比值1.0，无扩增，Luminal A型', pathologist: '王丽华', reportTime: '2025-04-30 11:00' },
  { id: 'M030', specimenId: 'BX202605020061', patientName: '丁建新', testType: 'PCR', gene: 'EGFR/ALK/ROS1', result: '阴性', detail: '驱动基因阴性，来源于消化道或其他系统待查', pathologist: '刘明辉', reportTime: '2025-05-01 10:00' },
];

export const regionalHospitals: RegionalHospital[] = [
  { id: 'RH001', name: '东华区第一医院', level: '三乙', address: '上海市浦东新区云锦路1500号', casesSubmitted: 1256, casesReported: 1240, avgTurnaroundHours: 48.5, pendingCases: 8, online: true, lastSubmitTime: '2025-05-02 14:30' },
  { id: 'RH002', name: '静安区第一医院', level: '二甲', address: '上海市闵行区新城大道170号', casesSubmitted: 892, casesReported: 885, avgTurnaroundHours: 52.3, pendingCases: 4, online: true, lastSubmitTime: '2025-05-02 11:00' },
  { id: 'RH003', name: '南汇区第一医院', level: '二甲', address: '上海市嘉定区港城支路88号', casesSubmitted: 756, casesReported: 756, avgTurnaroundHours: 45.0, pendingCases: 0, online: true, lastSubmitTime: '2025-05-01 16:00' },
  { id: 'RH004', name: '青浦区中西医结合医院', level: '二乙', address: '上海市宝山区翠湖路55号', casesSubmitted: 423, casesReported: 420, avgTurnaroundHours: 58.2, pendingCases: 2, online: false },
  { id: 'RH005', name: '崇明区第一医院', level: '二甲', address: '上海市松江区临港工业园路200号', casesSubmitted: 634, casesReported: 630, avgTurnaroundHours: 50.1, pendingCases: 3, online: true, lastSubmitTime: '2025-05-02 09:15' },
  { id: 'RH006', name: '金山区第一医院', level: '三乙', address: '上海市青浦区望海路888号', casesSubmitted: 1089, casesReported: 1075, avgTurnaroundHours: 46.8, pendingCases: 7, online: true, lastSubmitTime: '2025-05-02 13:45' },
  { id: 'RH007', name: '金山区第一医院', level: '二甲', address: '上海市奉贤区南桥镇海滨路66号', casesSubmitted: 545, casesReported: 540, avgTurnaroundHours: 53.5, pendingCases: 3, online: true, lastSubmitTime: '2025-05-01 10:30' },
  { id: 'RH008', name: '松江区医疗中心', level: '二乙', address: '上海市崇明区城桥镇东湖路33号', casesSubmitted: 312, casesReported: 308, avgTurnaroundHours: 62.0, pendingCases: 2, online: true, lastSubmitTime: '2025-05-01 15:00' },
  { id: 'RH009', name: '虹口区医疗中心', level: '二甲', address: '上海市徐汇区金融街288号', casesSubmitted: 678, casesReported: 672, avgTurnaroundHours: 48.0, pendingCases: 4, online: true, lastSubmitTime: '2025-05-02 08:00' },
  { id: 'RH010', name: '普陀区医疗中心', level: '二甲', address: '上海市长宁区科技园666号', casesSubmitted: 590, casesReported: 585, avgTurnaroundHours: 49.5, pendingCases: 3, online: true, lastSubmitTime: '2025-05-02 10:00' },
  { id: 'RH011', name: '闸北区医疗中心', level: '二甲', address: '上海市静安区文教路122号', casesSubmitted: 720, casesReported: 715, avgTurnaroundHours: 46.2, pendingCases: 3, online: true, lastSubmitTime: '2025-05-01 14:00' },
  { id: 'RH012', name: '杨浦区医疗中心', level: '二甲', address: '上海市普陀区工业路99号', casesSubmitted: 480, casesReported: 475, avgTurnaroundHours: 51.8, pendingCases: 3, online: true, lastSubmitTime: '2025-05-01 16:30' },
  { id: 'RH013', name: '卢湾区医疗中心', level: '二甲', address: '上海市虹口区新湾路77号', casesSubmitted: 520, casesReported: 515, avgTurnaroundHours: 50.5, pendingCases: 3, online: true, lastSubmitTime: '2025-05-02 09:30' },
  { id: 'RH014', name: '徐汇区医疗中心', level: '二甲', address: '上海市黄浦区中央商务区188号', casesSubmitted: 445, casesReported: 440, avgTurnaroundHours: 52.8, pendingCases: 3, online: false },
  { id: 'RH015', name: '长宁区医疗中心', level: '三乙', address: '上海市杨浦区滨江大道520号', casesSubmitted: 850, casesReported: 840, avgTurnaroundHours: 47.5, pendingCases: 5, online: true, lastSubmitTime: '2025-05-02 12:00' },
  { id: 'RH016', name: '闵行区医疗中心', level: '二甲', address: '上海市金山区开发区中心路1号', casesSubmitted: 380, casesReported: 375, avgTurnaroundHours: 55.2, pendingCases: 3, online: true, lastSubmitTime: '2025-05-01 11:00' },
  { id: 'RH017', name: '国家医学中心直属医院', level: '三甲', address: '上海市青浦区望海路888号', casesSubmitted: 1560, casesReported: 1555, avgTurnaroundHours: 38.0, pendingCases: 3, online: true, lastSubmitTime: '2025-05-02 16:00' },
  { id: 'RH018', name: '国家临床医学中心', level: '三甲', address: '上海市黄浦区创新路100号', casesSubmitted: 2100, casesReported: 2090, avgTurnaroundHours: 36.5, pendingCases: 5, online: true, lastSubmitTime: '2025-05-02 17:00' },
  { id: 'RH019', name: '国家医学中心第一医院', level: '三甲', address: '上海市虹口区医学路85号', casesSubmitted: 1850, casesReported: 1840, avgTurnaroundHours: 37.2, pendingCases: 6, online: true, lastSubmitTime: '2025-05-02 15:00' },
  { id: 'RH020', name: '国家医学中心分部', level: '三甲', address: '上海市黄浦区复兴路415号', casesSubmitted: 1680, casesReported: 1670, avgTurnaroundHours: 39.8, pendingCases: 5, online: true, lastSubmitTime: '2025-05-02 14:00' },
];

export const consultationRequests: ConsultationRequest[] = [
  {
    id: 'C001', requestingHospital: '东华区第一医院', requestingDoctor: '赵志刚', patientName: '钱文华', gender: '女', age: 55,
    specimenType: '胃窦活检', clinicalHistory: '反复上腹部不适半年，胃镜示胃窦溃疡',
    originalDiagnosis: '胃腺癌（低分化）', consultationQuestion: '请确认分化程度及HER2状态评估',
    submittedImages: 8, status: '已完成', assignedExpert: '李敏', turnaroundHours: 24,
    expertOpinion: '同意低分化诊断，HER2免疫组化建议补充，必要时FISH检测。',
    submitTime: '2025-05-01 10:00', completeTime: '2025-05-02 10:00'
  },
  {
    id: 'C002', requestingHospital: '静安区第一医院', requestingDoctor: '周丽华', patientName: '孙志明', gender: '男', age: 62,
    specimenType: '肺穿刺活检', clinicalHistory: '咳嗽伴痰中带血2月，CT示右上肺占位',
    originalDiagnosis: '倾向腺癌', consultationQuestion: '请进一步明确组织学分型及分子标志物',
    submittedImages: 6, status: '已完成', assignedExpert: '张建国', turnaroundHours: 18,
    expertOpinion: '可明确为肺腺癌，建议加做TTF-1、Napsin A及PD-L1免疫组化。',
    submitTime: '2025-05-01 15:30', completeTime: '2025-05-02 09:30'
  },
  {
    id: 'C003', requestingHospital: '南汇区第一医院', requestingDoctor: '吴晓东', patientName: '郑美丽', gender: '女', age: 45,
    specimenType: '乳腺穿刺', clinicalHistory: '左乳肿块，BI-RADS 4C',
    originalDiagnosis: '浸润性癌', consultationQuestion: '请确认分子分型',
    submittedImages: 5, status: '阅片中', assignedExpert: '王丽华',
    submitTime: '2025-05-02 09:00'
  },
  {
    id: 'C004', requestingHospital: '崇明区第一医院', requestingDoctor: '黄志强', patientName: '周大海', gender: '男', age: 58,
    specimenType: '直肠肿块', clinicalHistory: '便血3月，肠镜示直肠肿块',
    originalDiagnosis: '直肠腺癌', consultationQuestion: '请评估新辅助治疗效果及术后方案',
    submittedImages: 12, status: '待分配',
    submitTime: '2025-05-02 08:30'
  },
  {
    id: 'C005', requestingHospital: '金山区第一医院', requestingDoctor: '马立军', patientName: '马琳娜', gender: '女', age: 49,
    specimenType: '右乳穿刺', clinicalHistory: '右乳肿块，BI-RADS 5',
    originalDiagnosis: '右乳浸润性癌', consultationQuestion: '请确认分子分型及HER2状态',
    submittedImages: 6, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 20,
    expertOpinion: 'Luminal B型（HER2阴性），建议AC-T方案化疗。',
    submitTime: '2025-05-01 14:00', completeTime: '2025-05-02 10:00'
  },
  {
    id: 'C006', requestingHospital: '金山区第一医院', requestingDoctor: '陈志明', patientName: '刘凤英', gender: '女', age: 46,
    specimenType: '骨髓活检', clinicalHistory: '全血细胞减少2月',
    originalDiagnosis: '骨髓增生异常综合征', consultationQuestion: '请确认MDS类型及预后评估',
    submittedImages: 4, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 30,
    expertOpinion: '符合MDS-EB1，建议去甲基化治疗。',
    submitTime: '2025-05-01 09:00', completeTime: '2025-05-02 15:00'
  },
  {
    id: 'C007', requestingHospital: '青浦区中西医结合医院', requestingDoctor: '徐志远', patientName: '杨大海', gender: '男', age: 73,
    specimenType: '脑肿瘤活检', clinicalHistory: '头痛伴左侧肢体无力2周',
    originalDiagnosis: '高级别胶质瘤', consultationQuestion: '请确认WHO分级及分子分型',
    submittedImages: 8, status: '已完成', assignedExpert: '李敏', turnaroundHours: 25,
    expertOpinion: '胶质母细胞瘤，IDH野生型，WHO IV级，建议Stupp方案。',
    submitTime: '2025-04-30 16:00', completeTime: '2025-05-01 17:00'
  },
  {
    id: 'C008', requestingHospital: '虹口区医疗中心', requestingDoctor: '王秀英', patientName: '周建平', gender: '男', age: 62,
    specimenType: '左肺穿刺', clinicalHistory: '左上肺占位，吸烟史30年',
    originalDiagnosis: '左肺癌', consultationQuestion: '请确认组织学类型及驱动基因检测',
    submittedImages: 5, status: '已完成', assignedExpert: '张建国', turnaroundHours: 22,
    expertOpinion: '肺腺癌，EGFR L858R突变阳性，建议一代TKI治疗。',
    submitTime: '2025-05-01 11:00', completeTime: '2025-05-02 09:00'
  },
  {
    id: 'C009', requestingHospital: '长宁区医疗中心', requestingDoctor: '李志刚', patientName: '黄志勇', gender: '男', age: 57,
    specimenType: '食管活检', clinicalHistory: '进行性吞咽困难3月',
    originalDiagnosis: '食管鳞癌', consultationQuestion: '请确认分化程度及治疗方案',
    submittedImages: 6, status: '阅片中', assignedExpert: '张建国',
    submitTime: '2025-05-02 10:00'
  },
  {
    id: 'C010', requestingHospital: '普陀区医疗中心', requestingDoctor: '张志伟', patientName: '曹雪梅', gender: '女', age: 36,
    specimenType: '甲状腺穿刺', clinicalHistory: '甲状腺结节TI-RADS 4类',
    originalDiagnosis: '甲状腺乳头状癌待排', consultationQuestion: '请确认诊断及手术方案',
    submittedImages: 4, status: '已完成', assignedExpert: '陈志强', turnaroundHours: 16,
    expertOpinion: '符合乳头状癌，建议甲状腺全切+中央区淋巴结清扫。',
    submitTime: '2025-05-01 15:00', completeTime: '2025-05-02 07:00'
  },
  {
    id: 'C011', requestingHospital: '松江区医疗中心', requestingDoctor: '赵志明', patientName: '田华', gender: '女', age: 35,
    specimenType: '子宫内膜活检', clinicalHistory: '异常子宫出血1年',
    originalDiagnosis: '子宫内膜单纯性增生', consultationQuestion: '请排除癌变及进一步治疗建议',
    submittedImages: 3, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 18,
    expertOpinion: '单纯性增生伴息肉形成，定期随访即可。',
    submitTime: '2025-05-01 08:00', completeTime: '2025-05-02 02:00'
  },
  {
    id: 'C012', requestingHospital: '闵行区医疗中心', requestingDoctor: '周志刚', patientName: '贾志明', gender: '男', age: 69,
    specimenType: '膀胱活检', clinicalHistory: '无痛性血尿2月',
    originalDiagnosis: '膀胱乳头状肿瘤', consultationQuestion: '请确认分级及分期',
    submittedImages: 5, status: '待分配',
    submitTime: '2025-05-02 09:00'
  },
  {
    id: 'C013', requestingHospital: '闸北区医疗中心', requestingDoctor: '吴志明', patientName: '韩丽娜', gender: '女', age: 50,
    specimenType: '腋窝淋巴结穿刺', clinicalHistory: '左腋窝淋巴结肿大',
    originalDiagnosis: '淋巴结转移性癌', consultationQuestion: '请明确原发灶及分子分型',
    submittedImages: 6, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 24,
    expertOpinion: '支持乳腺来源，免疫组化符合三阴性乳腺癌，建议全面检查。',
    submitTime: '2025-04-30 14:00', completeTime: '2025-05-01 14:00'
  },
  {
    id: 'C014', requestingHospital: '杨浦区医疗中心', requestingDoctor: '孙志刚', patientName: '钱文华', gender: '男', age: 59,
    specimenType: '肝占位穿刺', clinicalHistory: '肝血管瘤复查增大',
    originalDiagnosis: '肝血管瘤', consultationQuestion: '请排除恶性可能',
    submittedImages: 4, status: '已完成', assignedExpert: '张建国', turnaroundHours: 15,
    expertOpinion: '典型的海绵状血管瘤影像学特征，良性病变。',
    submitTime: '2025-05-01 10:00', completeTime: '2025-05-01 17:00'
  },
  {
    id: 'C015', requestingHospital: '卢湾区医疗中心', requestingDoctor: '郑志刚', patientName: '陈国栋', gender: '男', age: 53,
    specimenType: '心包积液细胞学', clinicalHistory: '心包积液查因',
    originalDiagnosis: '腺癌细胞', consultationQuestion: '请明确来源及分期',
    submittedImages: 3, status: '已完成', assignedExpert: '李敏', turnaroundHours: 20,
    expertOpinion: '支持肺腺癌心包转移，建议完善胸部CT及基因检测。',
    submitTime: '2025-05-01 16:00', completeTime: '2025-05-02 12:00'
  },
  {
    id: 'C016', requestingHospital: '徐汇区医疗中心', requestingDoctor: '王志刚', patientName: '林晓晓', gender: '女', age: 32,
    specimenType: '腹腔肿物穿刺', clinicalHistory: '腹痛半月，腹腔占位',
    originalDiagnosis: '腹腔转移性腺癌', consultationQuestion: '请明确原发灶及治疗方案',
    submittedImages: 5, status: '待分配',
    submitTime: '2025-05-02 11:00'
  },
  {
    id: 'C017', requestingHospital: '国家医学中心直属医院', requestingDoctor: '李志明', patientName: '徐志强', gender: '男', age: 65,
    specimenType: '右肾穿刺', clinicalHistory: '右肾占位',
    originalDiagnosis: '肾癌', consultationQuestion: '请确认病理类型及分级',
    submittedImages: 4, status: '已完成', assignedExpert: '陈志强', turnaroundHours: 14,
    expertOpinion: '右肾嫌色细胞癌，WHO/ISUP I级，预后良好。',
    submitTime: '2025-05-01 09:00', completeTime: '2025-05-01 17:00'
  },
  {
    id: 'C018', requestingHospital: '国家临床医学中心', requestingDoctor: '张志华', patientName: '段丽华', gender: '女', age: 40,
    specimenType: '右乳穿刺', clinicalHistory: '右乳肿块BI-RADS 4B',
    originalDiagnosis: '右乳导管内癌', consultationQuestion: '请确认是否有浸润成分',
    submittedImages: 6, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 18,
    expertOpinion: '以导管内癌为主，伴微小浸润，建议改良根治术。',
    submitTime: '2025-05-01 14:00', completeTime: '2025-05-02 08:00'
  },
  {
    id: 'C019', requestingHospital: '国家医学中心第一医院', requestingDoctor: '赵志刚', patientName: '姜志远', gender: '男', age: 61,
    specimenType: '左肩胛骨肿物活检', clinicalHistory: '左肩胛骨疼痛2月',
    originalDiagnosis: '骨肉瘤', consultationQuestion: '请确认病理诊断及化疗方案',
    submittedImages: 7, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 22,
    expertOpinion: '高级别骨肉瘤，建议术前新辅助化疗+手术+辅助化疗。',
    submitTime: '2025-04-30 11:00', completeTime: '2025-05-01 09:00'
  },
  {
    id: 'C020', requestingHospital: '国家医学中心分部', requestingDoctor: '孙志刚', patientName: '龚晓燕', gender: '女', age: 34,
    specimenType: '支气管镜活检', clinicalHistory: '右下肺不张',
    originalDiagnosis: '肺炎', consultationQuestion: '请排除肿瘤可能',
    submittedImages: 4, status: '已完成', assignedExpert: '李敏', turnaroundHours: 12,
    expertOpinion: '慢性炎症，未见肿瘤证据，建议抗炎后复查。',
    submitTime: '2025-05-01 08:00', completeTime: '2025-05-01 16:00'
  },
  {
    id: 'C021', requestingHospital: '东华区第一医院', requestingDoctor: '马志刚', patientName: '邓秀英', gender: '女', age: 37,
    specimenType: '宫颈赘生物', clinicalHistory: '宫颈赘生物',
    originalDiagnosis: '宫颈息肉', consultationQuestion: '请排除恶性可能',
    submittedImages: 3, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 10,
    expertOpinion: '宫颈粘膜息肉，良性病变，伴慢性炎。',
    submitTime: '2025-05-02 10:00', completeTime: '2025-05-02 14:00'
  },
  {
    id: 'C022', requestingHospital: '静安区第一医院', requestingDoctor: '黄志刚', patientName: '冯志强', gender: '男', age: 45,
    specimenType: '右下肺穿刺', clinicalHistory: '右下肺占位',
    originalDiagnosis: '右下肺腺癌', consultationQuestion: '请确认分期及治疗方案',
    submittedImages: 5, status: '阅片中', assignedExpert: '张建国',
    submitTime: '2025-05-03 09:00'
  },
  {
    id: 'C023', requestingHospital: '南汇区第一医院', requestingDoctor: '徐志刚', patientName: '丁建新', gender: '男', age: 60,
    specimenType: '胸椎活检', clinicalHistory: '胸椎骨折伴疼痛',
    originalDiagnosis: '胸椎转移瘤', consultationQuestion: '请明确原发灶',
    submittedImages: 6, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 20,
    expertOpinion: '支持肺腺癌胸椎转移，建议完善胸部CT及PET-CT。',
    submitTime: '2025-05-01 15:00', completeTime: '2025-05-02 11:00'
  },
  {
    id: 'C024', requestingHospital: '崇明区第一医院', requestingDoctor: '王志刚', patientName: '孙佳欣', gender: '女', age: 28,
    specimenType: '卵巢囊肿壁', clinicalHistory: '卵巢囊肿',
    originalDiagnosis: '卵巢畸胎瘤', consultationQuestion: '请确认病理类型',
    submittedImages: 3, status: '已完成', assignedExpert: '王丽华', turnaroundHours: 8,
    expertOpinion: '成熟囊性畸胎瘤，良性病变。',
    submitTime: '2025-05-02 08:00', completeTime: '2025-05-02 12:00'
  },
  {
    id: 'C025', requestingHospital: '金山区第一医院', requestingDoctor: '李志刚', patientName: '赵志刚', gender: '男', age: 52,
    specimenType: '前列腺穿刺', clinicalHistory: '前列腺特异性抗原升高',
    originalDiagnosis: '前列腺癌待排', consultationQuestion: '请确认诊断及Gleason评分',
    submittedImages: 5, status: '待分配',
    submitTime: '2025-05-03 10:00'
  },
  {
    id: 'C026', requestingHospital: '金山区第一医院', requestingDoctor: '张志刚', patientName: '周志明', gender: '男', age: 64,
    specimenType: '心脏占位', clinicalHistory: '心脏占位待查',
    originalDiagnosis: '心脏粘液瘤', consultationQuestion: '请确认病理诊断',
    submittedImages: 4, status: '已完成', assignedExpert: '李敏', turnaroundHours: 15,
    expertOpinion: '心脏粘液瘤，良性病变，建议手术切除。',
    submitTime: '2025-04-30 09:00', completeTime: '2025-04-30 18:00'
  },
  {
    id: 'C027', requestingHospital: '青浦区中西医结合医院', requestingDoctor: '陈志刚', patientName: '吴磊', gender: '男', age: 55,
    specimenType: '左股骨活检', clinicalHistory: '左股骨肿物',
    originalDiagnosis: '骨巨细胞瘤复发', consultationQuestion: '请确认诊断及治疗方案',
    submittedImages: 5, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 18,
    expertOpinion: '骨巨细胞瘤复发，建议病灶刮除+骨水泥填充。',
    submitTime: '2025-05-01 10:00', completeTime: '2025-05-02 04:00'
  },
  {
    id: 'C028', requestingHospital: '虹口区医疗中心', requestingDoctor: '赵志刚', patientName: '马超', gender: '男', age: 29,
    specimenType: '颈部淋巴结', clinicalHistory: '颈部淋巴结肿大',
    originalDiagnosis: '淋巴瘤待排', consultationQuestion: '请确认淋巴瘤类型及分期',
    submittedImages: 6, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 24,
    expertOpinion: '经典型霍奇金淋巴瘤（混合细胞亚型），建议ABVD方案化疗。',
    submitTime: '2025-04-30 14:00', completeTime: '2025-05-01 14:00'
  },
  {
    id: 'C029', requestingHospital: '长宁区医疗中心', requestingDoctor: '周志刚', patientName: '孙丽华', gender: '女', age: 44,
    specimenType: '皮肤肿物', clinicalHistory: '右小腿皮肤黑痣增大',
    originalDiagnosis: '皮肤黑色素瘤', consultationQuestion: '请确认Breslow厚度及Clark分级',
    submittedImages: 5, status: '已完成', assignedExpert: '刘明辉', turnaroundHours: 16,
    expertOpinion: '皮肤恶性黑色素瘤，Breslow厚度4.5mm，建议扩大切除+前哨淋巴结活检。',
    submitTime: '2025-05-01 09:00', completeTime: '2025-05-02 01:00'
  },
  {
    id: 'C030', requestingHospital: '普陀区医疗中心', requestingDoctor: '吴志刚', patientName: '高峰', gender: '男', age: 71,
    specimenType: '脑组织活检', clinicalHistory: '脑肿瘤复发',
    originalDiagnosis: '胶质母细胞瘤复发', consultationQuestion: '请确认复发及进一步治疗建议',
    submittedImages: 8, status: '待分配',
    submitTime: '2025-05-03 08:00'
  },
];

export const teachingCases: TeachingCase[] = [
  {
    id: 'TC001', caseId: 'TC2025001', patientName: '张伟', gender: '男', age: 58, diagnosis: '右肺浸润性腺癌',
    diagnosisCode: 'C34.901', organ: '肺', diseaseCategory: '肺癌', difficulty: '进阶',
    slides: 12, images: ['2025-05-03-img1.jpg', '2025-05-03-img2.jpg', '2025-03-img3.jpg'],
    keyPoints: ['腺泡型腺癌的诊断要点', '胸膜侵犯的评估标准', '淋巴结分期规范'],
    discussion: '本例为老年男性，影像学发现右肺占位，术后病理确诊为浸润性腺癌（腺泡型为主）。讨论重点：1）腺癌的组织学亚型分类及预后意义；2）胸膜侵犯（PL1）的评估及TNM分期；3）淋巴结清扫的规范化。',
    author: '张建国', createdAt: '2025-05-03', tags: ['肺癌', '腺癌', '胸膜侵犯', '病例讨论'], views: 234, downloads: 45
  },
  {
    id: 'TC002', caseId: 'TC2025002', patientName: '李娜', gender: '女', age: 45, diagnosis: '左乳浸润性癌',
    diagnosisCode: 'C50.902', organ: '乳腺', diseaseCategory: '乳腺癌', difficulty: '进阶',
    slides: 8, images: ['2025-05-02-img1.jpg', '2025-05-02-img2.jpg'],
    keyPoints: ['乳腺癌组织学分级（Nottingham评分）', '分子分型（ER/PR/HER2/Ki-67）', '免疫组化结果判读标准'],
    discussion: '本例为中年女性乳腺癌，病理诊断为浸润性癌非特殊类型，Nottingham评分为6分（II级）。讨论重点：1）规范化免疫组化检测流程；2）分子分型对治疗方案的指导意义；3）HER2判读规范（ASCO/CAP指南）。',
    author: '王丽华', createdAt: '2025-05-02', tags: ['乳腺癌', '免疫组化', '分子分型', 'HER2'], views: 312, downloads: 67
  },
  {
    id: 'TC003', caseId: 'TC2025003', patientName: '赵军', gender: '男', age: 72, diagnosis: '右肾透明细胞癌',
    diagnosisCode: 'C64.901', organ: '肾脏', diseaseCategory: '肾癌', difficulty: '基础',
    slides: 6, images: ['2025-05-03-img1.jpg'],
    keyPoints: ['透明细胞癌的典型形态学特征', 'WHO/ISUP分级系统', '与嫌色细胞癌的鉴别诊断'],
    discussion: '本例为老年男性肾脏肿瘤，病理确诊为透明细胞癌，WHO/ISUP II级。讨论重点：1）透明细胞癌与嫌色细胞癌的形态学鉴别；2）WHO/ISUP分级系统的临床应用；3）肾癌TNM分期要点。',
    author: '陈志强', createdAt: '2025-05-03', tags: ['肾癌', '透明细胞癌', 'WHO分级', '泌尿系统'], views: 156, downloads: 28
  },
  {
    id: 'TC004', caseId: 'TC2025004', patientName: '高峰', gender: '男', age: 71, diagnosis: '右额叶胶质母细胞瘤',
    diagnosisCode: 'C71.101', organ: '脑', diseaseCategory: '胶质瘤', difficulty: '疑难',
    slides: 15, images: ['2025-05-02-img1.jpg', '2025-05-02-img2.jpg', '2025-05-02-img3.jpg'],
    keyPoints: ['胶质母细胞瘤的诊断标准', 'IDH野生型与突变型的预后差异', '分子标志物检测（TERT启动子、MGMT）'],
    discussion: '本例为老年男性脑肿瘤，病理确诊为胶质母细胞瘤，IDH野生型。讨论重点：1）星形细胞瘤与少突胶质细胞瘤的鉴别诊断；2）胶质母细胞瘤分子分型对治疗和预后的影响；3）MGMT启动子甲基化检测的临床意义。',
    author: '李敏', createdAt: '2025-05-02', tags: ['胶质母细胞瘤', 'IDH', '脑肿瘤', '分子病理', '疑难病例'], views: 445, downloads: 89
  },
  {
    id: 'TC005', caseId: 'TC2025005', patientName: '马超', gender: '男', age: 29, diagnosis: '淋巴结经典型霍奇金淋巴瘤',
    diagnosisCode: 'C81.001', organ: '淋巴结', diseaseCategory: '淋巴造血系统肿瘤', difficulty: '疑难',
    slides: 10, images: ['2025-05-02-img1.jpg', '2025-05-02-img2.jpg'],
    keyPoints: ['经典型霍奇金淋巴瘤的诊断要点', 'RS细胞及变异细胞的免疫表型', '与非霍奇金淋巴瘤的鉴别'],
    discussion: '本例为年轻男性，颈部淋巴结肿大，病理确诊为经典型霍奇金淋巴瘤（混合细胞亚型）。讨论重点：1）RS细胞的形态学特征和免疫表型（CD30+、CD15+、PAX5弱+）；2）与富于T细胞/组织细胞的大B细胞淋巴瘤的鉴别；3）分期及治疗方案选择。',
    author: '刘明辉', createdAt: '2025-05-02', tags: ['霍奇金淋巴瘤', 'RS细胞', '淋巴瘤', '疑难病例'], views: 278, downloads: 52
  },
  {
    id: 'TC006', caseId: 'TC2025006', patientName: '王芳', gender: '女', age: 52, diagnosis: '胃窦腺癌',
    diagnosisCode: 'C16.901', organ: '胃', diseaseCategory: '胃癌', difficulty: '进阶',
    slides: 9, images: ['2025-04-29-img1.jpg', '2025-04-29-img2.jpg'],
    keyPoints: ['胃腺癌的组织学分级', 'Lauren分型的临床意义', 'HER2检测指征及判读'],
    discussion: '本例为老年女性胃癌，病理确诊为胃窦腺癌，低分化。讨论重点：1）胃腺癌的规范化取材和报告；2）脉管癌栓和神经侵犯的评估；3）HER2检测的临床意义及阳性标准。',
    author: '张建国', createdAt: '2025-04-29', tags: ['胃癌', '腺癌', 'HER2', ' Lauren分型'], views: 198, downloads: 36
  },
  {
    id: 'TC007', caseId: 'TC2025007', patientName: '林梅', gender: '女', age: 56, diagnosis: '甲状腺乳头状癌',
    diagnosisCode: 'C73.001', organ: '甲状腺', diseaseCategory: '甲状腺癌', difficulty: '基础',
    slides: 7, images: ['2025-04-29-img1.jpg'],
    keyPoints: ['乳头状癌的细胞核特征', '乳头状癌亚型', 'BRAF V600E突变的临床意义'],
    discussion: '本例为中年女性甲状腺癌，病理确诊为乳头状癌。讨论重点：1）乳头状癌的典型细胞核特征（毛玻璃核、核沟、核内包涵体）；2）乳头状癌各亚型的预后意义；3）BRAF V600E突变检测对治疗和随访的指导价值。',
    author: '陈志强', createdAt: '2025-04-29', tags: ['甲状腺癌', '乳头状癌', 'BRAF', '细胞核特征'], views: 265, downloads: 48
  },
  {
    id: 'TC008', caseId: 'TC2025008', patientName: '刘强', gender: '男', age: 67, diagnosis: '直肠中分化腺癌',
    diagnosisCode: 'C20.001', organ: '直肠', diseaseCategory: '结直肠癌', difficulty: '进阶',
    slides: 11, images: ['2025-04-29-img1.jpg', '2025-04-29-img2.jpg'],
    keyPoints: ['直肠癌新辅助治疗后的病理评估', 'TME质量评估标准', '环周切缘（CRM）评估'],
    discussion: '本例为老年男性直肠癌，术前MRI评估cT3N+。讨论重点：1）新辅助治疗后的病理退缩评估（TRG分级）；2）全直肠系膜切除（TME）质量评估；3）环周切缘和远端切缘评估标准。',
    author: '陈志强', createdAt: '2025-04-29', tags: ['直肠癌', '新辅助治疗', 'TME', '环周切缘'], views: 189, downloads: 34
  },
  {
    id: 'TC009', caseId: 'TC2025009', patientName: '孙燕', gender: '女', age: 61, diagnosis: '胸腔积液转移性肺腺癌',
    diagnosisCode: 'C34.901', organ: '肺', diseaseCategory: '肺癌', difficulty: '疑难',
    slides: 8, images: ['2025-04-28-img1.jpg'],
    keyPoints: ['细胞学标本的免疫组化应用', '肺腺癌与胸膜间皮瘤的鉴别', '分子检测在胸水中的应用'],
    discussion: '本例为老年女性因胸腔积液送检，细胞学确诊为转移性肺腺癌。讨论重点：1）胸水细胞学诊断的局限性；2）免疫组化在鉴别诊断中的应用（TTF-1、Napsin A vs Calretinin、WT-1）；3）胸水样本分子检测的可行性和临床价值。',
    author: '李敏', createdAt: '2025-04-28', tags: ['肺癌', '胸腔积液', '细胞学', '分子检测'], views: 234, downloads: 42
  },
  {
    id: 'TC010', caseId: 'TC2025010', patientName: '郑美丽', gender: '女', age: 54, diagnosis: '左乳浸润性癌伴髓样特征',
    diagnosisCode: 'C50.902', organ: '乳腺', diseaseCategory: '乳腺癌', difficulty: '进阶',
    slides: 10, images: ['2025-04-30-img1.jpg', '2025-04-30-img2.jpg'],
    keyPoints: ['髓样癌的诊断标准', '乳腺癌分子分型（Luminal/HER2/TNBC）', '三阴性乳腺癌的治疗进展'],
    discussion: '本例为中年女性乳腺癌，病理符合髓样癌特征。讨论重点：1）髓样癌与非特殊类型浸润性癌的鉴别；2）三阴性乳腺癌的分子特征和预后；3）免疫检查点抑制剂在三阴性乳腺癌中的应用。',
    author: '王丽华', createdAt: '2025-04-30', tags: ['乳腺癌', '髓样癌', '三阴性', '免疫治疗'], views: 289, downloads: 56
  },
  {
    id: 'TC011', caseId: 'TC2025011', patientName: '黄丽', gender: '女', age: 42, diagnosis: '右乳浸润性癌（Luminal B型）',
    diagnosisCode: 'C50.902', organ: '乳腺', diseaseCategory: '乳腺癌', difficulty: '进阶',
    slides: 12, images: ['2025-05-02-img1.jpg', '2025-05-02-img2.jpg', '2025-02-img3.jpg'],
    keyPoints: ['Luminal型乳腺癌的分子特征', 'Ki-67指数的临床意义', '内分泌治疗敏感性预测'],
    discussion: '本例为年轻女性，免疫组化示ER 90%、PR 60%、HER2阴性、Ki-67 35%，为Luminal B型。讨论重点：1）Luminal A与Luminal B型的鉴别要点；2）Ki-67指数对化疗决策的影响；3）内分泌治疗方案选择（他莫昔芬 vs AI）。',
    author: '王丽华', createdAt: '2025-05-02', tags: ['乳腺癌', 'Luminal型', 'Ki-67', '内分泌治疗'], views: 356, downloads: 72
  },
  {
    id: 'TC012', caseId: 'TC2025012', patientName: '杨大海', gender: '男', age: 73, diagnosis: '右颞叶胶质母细胞瘤（IDH野生型）',
    diagnosisCode: 'C71.201', organ: '脑', diseaseCategory: '胶质瘤', difficulty: '疑难',
    slides: 14, images: ['2025-04-30-img1.jpg', '2025-04-30-img2.jpg'],
    keyPoints: ['胶质母细胞瘤的分子分型', 'TERT启动子突变的预后意义', 'MGMT启动子甲基化与替莫唑胺疗效'],
    discussion: '本例为老年男性，病理为IDH野生型胶质母细胞瘤，伴TERT启动子突变。讨论重点：1）2021 WHO CNS肿瘤分类的分子分型要求；2）TERT启动子突变、ATRX缺失与预后的关系；3）MGMT启动子甲基化检测的临床价值。',
    author: '李敏', createdAt: '2025-04-30', tags: ['胶质母细胞瘤', 'IDH野生型', 'TERT', 'MGMT'], views: 412, downloads: 85
  },
  {
    id: 'TC013', caseId: 'TC2025013', patientName: '马超', gender: '男', age: 29, diagnosis: '经典型霍奇金淋巴瘤（混合细胞亚型）',
    diagnosisCode: 'C81.001', organ: '淋巴结', diseaseCategory: '淋巴瘤', difficulty: '疑难',
    slides: 11, images: ['2025-05-01-img1.jpg', '2025-05-01-img2.jpg'],
    keyPoints: ['RS细胞的免疫表型特征', '霍奇金淋巴瘤亚型分类', '与弥漫大B细胞淋巴瘤的鉴别'],
    discussion: '本例为年轻男性，颈部淋巴结活检确诊为经典型霍奇金淋巴瘤，混合细胞亚型。讨论重点：1）RS细胞的免疫表型（CD30+、CD15+、PAX5弱+）；2）霍奇金淋巴瘤各亚型的流行病学和预后；3）ABVD方案的治疗效果评估。',
    author: '刘明辉', createdAt: '2025-05-01', tags: ['霍奇金淋巴瘤', 'RS细胞', 'CD30', 'ABVD'], views: 267, downloads: 48
  },
  {
    id: 'TC014', caseId: 'TC2025014', patientName: '丁建新', gender: '男', age: 60, diagnosis: '胸椎转移性腺癌（肺来源）',
    diagnosisCode: 'C79.501', organ: '骨', diseaseCategory: '转移性肿瘤', difficulty: '疑难',
    slides: 8, images: ['2025-05-01-img1.jpg'],
    keyPoints: ['转移性肿瘤的免疫组化溯源', 'TTF-1和Napsin A在肺癌诊断中的应用', '骨转移的临床处理'],
    discussion: '本例为老年男性胸椎病理性骨折，病理确诊为转移性腺癌。讨论重点：1）转移性肿瘤的免疫组化溯源原则；2）TTF-1和Napsin A在鉴别肺腺癌与其他腺癌中的应用；3）骨转移癌的治疗策略。',
    author: '刘明辉', createdAt: '2025-05-01', tags: ['转移性肿瘤', '免疫组化溯源', 'TTF-1', '骨转移'], views: 198, downloads: 35
  },
  {
    id: 'TC015', caseId: 'TC2025015', patientName: '周建平', gender: '男', age: 62, diagnosis: '左肺腺癌（EGFR L858R突变）',
    diagnosisCode: 'C34.102', organ: '肺', diseaseCategory: '肺癌', difficulty: '进阶',
    slides: 10, images: ['2025-04-30-img1.jpg', '2025-04-30-img2.jpg'],
    keyPoints: ['EGFR突变与TKI疗效的关系', 'L858R突变与19del的预后差异', 'T790M耐药突变的处理'],
    discussion: '本例为老年男性，分子检测示EGFR 21外显子L858R突变。讨论重点：1）EGFR突变在中国人群中的发生率；2）L858R突变患者对一代/二代/三代TKI的疗效差异；3）T790M耐药机制及三代TKI的治疗策略。',
    author: '张建国', createdAt: '2025-04-30', tags: ['肺癌', 'EGFR', 'L858R', '靶向治疗'], views: 345, downloads: 68
  },
  {
    id: 'TC016', caseId: 'TC2025016', patientName: '陈美娟', gender: '女', age: 39, diagnosis: '宫颈鳞状细胞癌',
    diagnosisCode: 'C53.901', organ: '宫颈', diseaseCategory: '宫颈癌', difficulty: '进阶',
    slides: 9, images: ['2025-04-29-img1.jpg'],
    keyPoints: ['宫颈鳞癌的HPV相关性', 'p16免疫组化作为HPV替代标记物', '宫颈癌分期与治疗方案'],
    discussion: '本例为年轻女性，病理确诊为宫颈鳞癌，p16强阳性。讨论重点：1）HPV与宫颈癌发生的关系；2）p16免疫组化作为HPV感染的替代标记物；3）早期宫颈癌的保留生育功能手术适应症。',
    author: '王丽华', createdAt: '2025-04-29', tags: ['宫颈癌', 'HPV', 'p16', '鳞癌'], views: 256, downloads: 47
  },
  {
    id: 'TC017', caseId: 'TC2025017', patientName: '徐志强', gender: '男', age: 65, diagnosis: '右肾嫌色细胞癌',
    diagnosisCode: 'C64.902', organ: '肾脏', diseaseCategory: '肾癌', difficulty: '基础',
    slides: 7, images: ['2025-04-30-img1.jpg'],
    keyPoints: ['嫌色细胞癌的形态学特征', '嫌色细胞癌与透明细胞癌的鉴别', '嫌色细胞癌的预后'],
    discussion: '本例为老年男性，病理确诊为嫌色细胞癌。讨论重点：1）嫌色细胞癌的典型形态学特征（胞浆透明/嗜酸性、草莓样核）；2）与透明细胞癌的鉴别要点；3）嫌色细胞癌的预后及随访策略。',
    author: '陈志强', createdAt: '2025-04-30', tags: ['肾癌', '嫌色细胞癌', '透明细胞癌', '鉴别诊断'], views: 178, downloads: 32
  },
  {
    id: 'TC018', caseId: 'TC2025018', patientName: '孙丽华', gender: '女', age: 44, diagnosis: '皮肤恶性黑色素瘤',
    diagnosisCode: 'C43.701', organ: '皮肤', diseaseCategory: '黑色素瘤', difficulty: '进阶',
    slides: 10, images: ['2025-04-30-img1.jpg', '2025-04-30-img2.jpg'],
    keyPoints: ['黑色素瘤的 Breslow厚度测量', 'Clark分级标准', '前哨淋巴结活检指征'],
    discussion: '本例为中年女性，病理示Breslow厚度4.5mm。讨论重点：1）Breslow厚度和Clark分级在黑色素瘤分期中的价值；2）前哨淋巴结活检的指征（厚度>1mm）；3）BRAF V600E突变检测与靶向治疗。',
    author: '刘明辉', createdAt: '2025-04-30', tags: ['黑色素瘤', 'Breslow厚度', 'Clark分级', '前哨淋巴结'], views: 298, downloads: 58
  },
  {
    id: 'TC019', caseId: 'TC2025019', patientName: '姜志远', gender: '男', age: 61, diagnosis: '左肩胛骨高级别骨肉瘤',
    diagnosisCode: 'C40.001', organ: '骨', diseaseCategory: '骨肿瘤', difficulty: '疑难',
    slides: 13, images: ['2025-05-01-img1.jpg', '2025-05-01-img2.jpg'],
    keyPoints: ['骨肉瘤的组织学亚型', '骨肉瘤的新辅助化疗方案', '骨肉瘤的分子标志物'],
    discussion: '本例为中年男性，病理确诊为高级别骨肉瘤。讨论重点：1）骨肉瘤的组织学亚型（骨母细胞型、软骨母细胞型、纤维母细胞型）；2）新辅助化疗（MAP方案）对保肢手术的影响；3）预后因素分析。',
    author: '刘明辉', createdAt: '2025-05-01', tags: ['骨肉瘤', '骨肿瘤', '新辅助化疗', '保肢手术'], views: 234, downloads: 45
  },
  {
    id: 'TC020', caseId: 'TC2025020', patientName: '吴磊', gender: '男', age: 55, diagnosis: '左股骨骨巨细胞瘤',
    diagnosisCode: 'C40.252', organ: '骨', diseaseCategory: '骨肿瘤', difficulty: '基础',
    slides: 6, images: ['2025-04-28-img1.jpg'],
    keyPoints: ['骨巨细胞瘤的发病机制', '骨巨细胞瘤的组织学特征', '复发风险评估'],
    discussion: '本例为中年男性，病理确诊为骨巨细胞瘤I级。讨论重点：1）骨巨细胞瘤的RANK/RANKL发病机制；2）组织学分级与复发风险的关系；3）刮除术+骨水泥填充的疗效评估。',
    author: '刘明辉', createdAt: '2025-04-28', tags: ['骨巨细胞瘤', 'RANKL', '刮除术', '骨水泥'], views: 156, downloads: 28
  },
  {
    id: 'TC021', caseId: 'TC2025021', patientName: '周婷', gender: '女', age: 33, diagnosis: '皮肤韧带样型纤维瘤病',
    diagnosisCode: 'D48.101', organ: '皮肤', diseaseCategory: '纤维母细胞肿瘤', difficulty: '疑难',
    slides: 7, images: ['2025-05-02-img1.jpg'],
    keyPoints: ['韧带样型纤维瘤病的临床特征', '纤维瘤病与纤维肉瘤的鉴别', '治疗策略（手术/药物/观察）'],
    discussion: '本例为年轻女性背部肿物，病理确诊为韧带样型纤维瘤病。讨论重点：1）纤维瘤病的临床和影像学特征；2）与低度恶性纤维肉瘤的鉴别；3）手术切缘与复发的关系。',
    author: '刘明辉', createdAt: '2025-05-02', tags: ['纤维瘤病', '韧带样型', '纤维肉瘤', '鉴别诊断'], views: 145, downloads: 25
  },
  {
    id: 'TC022', caseId: 'TC2025022', patientName: '郑小丽', gender: '女', age: 31, diagnosis: '骨髓增生异常综合征（MDS-EB1）',
    diagnosisCode: 'D46.901', organ: '骨髓', diseaseCategory: '髓系肿瘤', difficulty: '疑难',
    slides: 9, images: ['2025-04-30-img1.jpg'],
    keyPoints: ['MDS的WHO分类标准', '病态造血的形态学评估', 'MDS向AML转化的风险'],
    discussion: '本例为年轻女性全血细胞减少，骨髓活检确诊为MDS-EB1。讨论重点：1）MDS的WHO 2022分类更新；2）病态造血在红系、粒系、巨核系的形态学表现；3）IPSS-R评分系统与治疗决策。',
    author: '刘明辉', createdAt: '2025-04-30', tags: ['MDS', '病态造血', 'IPSS-R', '骨髓增生异常'], views: 267, downloads: 52
  },
  {
    id: 'TC023', caseId: 'TC2025023', patientName: '钱文华', gender: '男', age: 59, diagnosis: '肝海绵状血管瘤',
    diagnosisCode: 'D18.003', organ: '肝', diseaseCategory: '血管瘤', difficulty: '基础',
    slides: 5, images: ['2025-04-29-img1.jpg'],
    keyPoints: ['海绵状血管瘤的影像学特征', '血管瘤与血管肉瘤的鉴别', '手术指征与随访策略'],
    discussion: '本例为中年男性肝占位，病理确诊为海绵状血管瘤。讨论重点：1）海绵状血管瘤的大体和镜下特征；2）与肝血管肉瘤的鉴别要点；3）肝血管瘤的治疗指征（大小、症状、位置）。',
    author: '张建国', createdAt: '2025-04-29', tags: ['血管瘤', '肝脏', '鉴别诊断', '海绵状'], views: 134, downloads: 22
  },
  {
    id: 'TC024', caseId: 'TC2025024', patientName: '徐鹏', gender: '男', age: 63, diagnosis: '左心房粘液瘤',
    diagnosisCode: 'D15.101', organ: '心脏', diseaseCategory: '心脏肿瘤', difficulty: '基础',
    slides: 6, images: ['2025-04-28-img1.jpg'],
    keyPoints: ['心脏粘液瘤的典型部位', '粘液瘤的大体和镜下特征', '栓塞风险评估'],
    discussion: '本例为老年男性心脏占位，病理确诊为左心房粘液瘤。讨论重点：1）心脏粘液瘤的好发部位（左房）和临床表现；2）粘液瘤的大体特征（分叶状、粘液样）和组织学起源；3）栓塞并发症的预防。',
    author: '李敏', createdAt: '2025-04-28', tags: ['粘液瘤', '心脏肿瘤', '左心房', '栓塞'], views: 189, downloads: 34
  },
  {
    id: 'TC025', caseId: 'TC2025025', patientName: '陈静', gender: '女', age: 38, diagnosis: '宫颈粘膜息肉',
    diagnosisCode: 'N84.001', organ: '宫颈', diseaseCategory: '宫颈病变', difficulty: '基础',
    slides: 4, images: ['2025-04-29-img1.jpg'],
    keyPoints: ['宫颈息肉的病理学特征', '息肉与宫颈癌的鉴别', '随访策略'],
    discussion: '本例为年轻女性宫颈赘生物，病理为宫颈粘膜息肉。讨论重点：1）宫颈息肉的病因和临床表现；2）息肉与恶性病变的鉴别要点；3）宫颈息肉的随访和预防策略。',
    author: '王丽华', createdAt: '2025-04-29', tags: ['宫颈息肉', '宫颈病变', '鉴别诊断'], views: 98, downloads: 15
  },
  {
    id: 'TC026', caseId: 'TC2025026', patientName: '孙佳欣', gender: '女', age: 28, diagnosis: '右卵巢成熟囊性畸胎瘤',
    diagnosisCode: 'D27.001', organ: '卵巢', diseaseCategory: '卵巢肿瘤', difficulty: '基础',
    slides: 5, images: ['2025-05-01-img1.jpg'],
    keyPoints: ['畸胎瘤的组织学构成', '成熟与未成熟畸胎瘤的鉴别', '恶变风险评估'],
    discussion: '本例为年轻女性卵巢囊肿，病理确诊为成熟囊性畸胎瘤。讨论重点：1）成熟囊性畸胎瘤的组织学构成（外胚层为主）；2）未成熟畸胎瘤的诊断标准；3）成熟畸胎瘤恶变（鳞癌）的识别。',
    author: '王丽华', createdAt: '2025-05-01', tags: ['畸胎瘤', '卵巢肿瘤', '成熟畸胎瘤', '生殖细胞肿瘤'], views: 145, downloads: 26
  },
  {
    id: 'TC027', caseId: 'TC2025027', patientName: '田华', gender: '女', age: 35, diagnosis: '子宫腺肌症',
    diagnosisCode: 'N80.001', organ: '子宫', diseaseCategory: '子宫内膜异位症', difficulty: '基础',
    slides: 5, images: ['2025-04-30-img1.jpg'],
    keyPoints: ['子宫腺肌症的病理诊断标准', '腺肌症与肌瘤的鉴别', '临床病理联系'],
    discussion: '本例为年轻女性子宫切除标本，病理确诊为子宫腺肌症。讨论重点：1）子宫腺肌症的异位内膜诊断标准；2）与子宫平滑肌瘤的鉴别；3）临床症状与病理发现的对应关系。',
    author: '王丽华', createdAt: '2025-04-30', tags: ['腺肌症', '子宫', '子宫内膜异位症', '平滑肌瘤'], views: 123, downloads: 20
  },
  {
    id: 'TC028', caseId: 'TC2025028', patientName: '黄志勇', gender: '男', age: 57, diagnosis: '食管鳞状细胞癌',
    diagnosisCode: 'C15.901', organ: '食管', diseaseCategory: '食管癌', difficulty: '进阶',
    slides: 10, images: ['2025-05-01-img1.jpg', '2025-05-01-img2.jpg'],
    keyPoints: ['食管鳞癌的的组织学分级', '脉管侵犯和神经侵犯的评估', '新辅助治疗后的病理评估'],
    discussion: '本例为中年男性食管癌，病理确诊为鳞状细胞癌。讨论重点：1）食管鳞癌的组织学分级标准；2）脉管癌栓和神经侵犯的临床意义；3）新辅助放化疗后病理退缩评估。',
    author: '张建国', createdAt: '2025-05-01', tags: ['食管癌', '鳞状细胞癌', '新辅助治疗', '脉管侵犯'], views: 198, downloads: 38
  },
  {
    id: 'TC029', caseId: 'TC2025029', patientName: '周艳艳', gender: '女', age: 43, diagnosis: '皮肤高分化鳞状细胞癌',
    diagnosisCode: 'C44.701', organ: '皮肤', diseaseCategory: '皮肤癌', difficulty: '基础',
    slides: 6, images: ['2025-05-01-img1.jpg'],
    keyPoints: ['皮肤鳞癌与角化棘皮瘤的鉴别', '高危因素的识别（直径、厚度、位置）', '扩大切除的安全边缘'],
    discussion: '本例为中年女性面部皮肤肿物，病理确诊为高分化鳞癌。讨论重点：1）鳞癌与角化棘皮瘤的临床和病理鉴别；2）高危皮肤鳞癌的特征；3）Mohs显微外科手术的适应症。',
    author: '刘明辉', createdAt: '2025-05-01', tags: ['皮肤鳞癌', '角化棘皮瘤', 'Mohs手术', '高分化'], views: 156, downloads: 28
  },
  {
    id: 'TC030', caseId: 'TC2025030', patientName: '刘凤英', gender: '女', age: 46, diagnosis: '骨髓增生异常综合征（MDS）',
    diagnosisCode: 'D46.901', organ: '骨髓', diseaseCategory: '髓系肿瘤', difficulty: '疑难',
    slides: 8, images: ['2025-05-01-img1.jpg'],
    keyPoints: ['MDS的形态学诊断要点', '原始细胞计数与分类标准', 'MDS治疗选择（去甲基化/移植）'],
    discussion: '本例为中年女性全血细胞减少，骨髓确诊为MDS。讨论重点：1）MDS诊断中的形态学难点；2）环形铁粒幼细胞和病态造血的评估；3）去甲基化药物（阿扎胞苷/地西他滨）的应用。',
    author: '刘明辉', createdAt: '2025-05-01', tags: ['MDS', '骨髓增生异常', '去甲基化', '病态造血'], views: 234, downloads: 45
  },
];

export const reagentInventory: ReagentInventory[] = [
  { id: 'R001', reagentCode: 'IHC-ER-001', reagentName: 'ER（雌激素受体）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240115', expiryDate: '2025-06-30', stockQuantity: 15, unit: '支', location: '2°C冰箱A区-1层', status: '正常', lastReagentDate: '2025-01-15', lastReagentQuantity: 20 },
  { id: 'R002', reagentCode: 'IHC-PR-001', reagentName: 'PR（孕激素受体）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240116', expiryDate: '2025-06-30', stockQuantity: 12, unit: '支', location: '2°C冰箱A区-1层', status: '正常', lastReagentDate: '2025-01-15', lastReagentQuantity: 20 },
  { id: 'R003', reagentCode: 'IHC-HER2-001', reagentName: 'HER2兔抗人单克隆抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240118', expiryDate: '2025-07-15', stockQuantity: 18, unit: '支', location: '2°C冰箱A区-2层', status: '正常', lastReagentDate: '2025-01-18', lastReagentQuantity: 25 },
  { id: 'R004', reagentCode: 'IHC-Ki67-001', reagentName: 'Ki-67（MIB-1）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240120', expiryDate: '2025-07-20', stockQuantity: 20, unit: '支', location: '2°C冰箱A区-2层', status: '正常', lastReagentDate: '2025-01-20', lastReagentQuantity: 30 },
  { id: 'R005', reagentCode: 'IHC-TTF1-001', reagentName: 'TTF-1（甲状腺转录因子）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VN20240201', expiryDate: '2025-08-01', stockQuantity: 10, unit: '支', location: '2°C冰箱A区-3层', status: '正常', lastReagentDate: '2025-02-01', lastReagentQuantity: 15 },
  { id: 'R006', reagentCode: 'IHC-CD30-001', reagentName: 'CD30（Ber-H2）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240205', expiryDate: '2025-08-05', stockQuantity: 8, unit: '支', location: '2°C冰箱A区-3层', status: '正常', lastReagentDate: '2025-02-05', lastReagentQuantity: 12 },
  { id: 'R007', reagentCode: 'IHC-CD15-001', reagentName: 'CD15（LeuM1）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240208', expiryDate: '2025-08-08', stockQuantity: 6, unit: '支', location: '2°C冰箱A区-3层', status: '正常', lastReagentDate: '2025-02-08', lastReagentQuantity: 10 },
  { id: 'R008', reagentCode: 'IHC-PAX5-001', reagentName: 'PAX5兔抗人单克隆抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VN20240210', expiryDate: '2025-08-10', stockQuantity: 5, unit: '支', location: '2°C冰箱A区-4层', status: '正常', lastReagentDate: '2025-02-10', lastReagentQuantity: 10 },
  { id: 'R009', reagentCode: 'IHC-CD20-001', reagentName: 'CD20（L26）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240212', expiryDate: '2025-08-12', stockQuantity: 22, unit: '支', location: '2°C冰箱A区-4层', status: '正常', lastReagentDate: '2025-02-12', lastReagentQuantity: 30 },
  { id: 'R010', reagentCode: 'IHC-CD3-001', reagentName: 'CD3兔抗人多克隆抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240215', expiryDate: '2025-08-15', stockQuantity: 18, unit: '支', location: '2°C冰箱B区-1层', status: '正常', lastReagentDate: '2025-02-15', lastReagentQuantity: 25 },
  { id: 'R011', reagentCode: 'IHC-CK7-001', reagentName: 'CK7（OV-TL12/30）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240218', expiryDate: '2025-08-18', stockQuantity: 14, unit: '支', location: '2°C冰箱B区-1层', status: '正常', lastReagentDate: '2025-02-18', lastReagentQuantity: 20 },
  { id: 'R012', reagentCode: 'IHC-CK20-001', reagentName: 'CK20（KS20.8）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240220', expiryDate: '2025-08-20', stockQuantity: 12, unit: '支', location: '2°C冰箱B区-2层', status: '正常', lastReagentDate: '2025-02-20', lastReagentQuantity: 20 },
  { id: 'R013', reagentCode: 'IHC-CDX2-001', reagentName: 'CDX2（DAK-CDX2）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240222', expiryDate: '2025-08-22', stockQuantity: 10, unit: '支', location: '2°C冰箱B区-2层', status: '正常', lastReagentDate: '2025-02-22', lastReagentQuantity: 15 },
  { id: 'R014', reagentCode: 'IHC-GFAP-001', reagentName: 'GFAP（胶质纤维酸性蛋白）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240225', expiryDate: '2025-08-25', stockQuantity: 8, unit: '支', location: '2°C冰箱B区-3层', status: '正常', lastReagentDate: '2025-02-25', lastReagentQuantity: 12 },
  { id: 'R015', reagentCode: 'IHC-IDH1-001', reagentName: 'IDH1（R132H）突变蛋白抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VN20240301', expiryDate: '2025-09-01', stockQuantity: 6, unit: '支', location: '2°C冰箱B区-3层', status: '正常', lastReagentDate: '2025-03-01', lastReagentQuantity: 10 },
  { id: 'R016', reagentCode: 'IHC-S100-001', reagentName: 'S-100蛋白抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240305', expiryDate: '2025-09-05', stockQuantity: 16, unit: '支', location: '2°C冰箱B区-4层', status: '正常', lastReagentDate: '2025-03-05', lastReagentQuantity: 25 },
  { id: 'R017', reagentCode: 'IHC-HMB45-001', reagentName: 'HMB-45（黑色素瘤相关抗原）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240308', expiryDate: '2025-09-08', stockQuantity: 8, unit: '支', location: '2°C冰箱B区-4层', status: '正常', lastReagentDate: '2025-03-08', lastReagentQuantity: 12 },
  { id: 'R018', reagentCode: 'IHC-MelanA-001', reagentName: 'Melan-A（A103）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240310', expiryDate: '2025-09-10', stockQuantity: 7, unit: '支', location: '2°C冰箱C区-1层', status: '正常', lastReagentDate: '2025-03-10', lastReagentQuantity: 10 },
  { id: 'R019', reagentCode: 'IHC-MPO-001', reagentName: 'MPO（髓过氧化物酶）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240312', expiryDate: '2025-09-12', stockQuantity: 10, unit: '支', location: '2°C冰箱C区-1层', status: '正常', lastReagentDate: '2025-03-12', lastReagentQuantity: 15 },
  { id: 'R020', reagentCode: 'IHC-CD68-001', reagentName: 'CD68（PG-M1）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240315', expiryDate: '2025-09-15', stockQuantity: 12, unit: '支', location: '2°C冰箱C区-2层', status: '正常', lastReagentDate: '2025-03-15', lastReagentQuantity: 20 },
  { id: 'R021', reagentCode: 'STAIN-H&E-001', reagentName: '苏木素-伊红染色液套组', category: '染色液', specification: '500mL/瓶', manufacturer: 'Baso', lotNumber: 'BH20240301', expiryDate: '2025-05-01', stockQuantity: 8, unit: '套', location: '染色室-试剂柜1', status: '临期', lastReagentDate: '2025-03-01', lastReagentQuantity: 12 },
  { id: 'R022', reagentCode: 'STAIN-PAS-001', reagentName: 'PAS（过碘酸希夫）染色液', category: '染色液', specification: '100mL/瓶', manufacturer: 'Basolab', lotNumber: 'BP20240215', expiryDate: '2025-10-15', stockQuantity: 5, unit: '瓶', location: '染色室-试剂柜1', status: '正常', lastReagentDate: '2025-02-15', lastReagentQuantity: 8 },
  { id: 'R023', reagentCode: 'STAIN-MASSON-001', reagentName: 'Masson三色染色液', category: '染色液', specification: '100mL/套', manufacturer: 'Basolab', lotNumber: 'BM20240220', expiryDate: '2025-10-20', stockQuantity: 4, unit: '套', location: '染色室-试剂柜2', status: '正常', lastReagentDate: '2025-02-20', lastReagentQuantity: 6 },
  { id: 'R024', reagentCode: 'STAIN-AB-001', reagentName: '阿尔辛蓝-过碘酸雪夫染色液', category: '染色液', specification: '100mL/套', manufacturer: 'Basolab', lotNumber: 'BA20240225', expiryDate: '2025-10-25', stockQuantity: 3, unit: '套', location: '染色室-试剂柜2', status: '正常', lastReagentDate: '2025-02-25', lastReagentQuantity: 5 },
  { id: 'R025', reagentCode: 'FIX-BUFFER-001', reagentName: '10%中性福尔马林缓冲液', category: '固定液', specification: '4L/桶', manufacturer: 'Leica', lotNumber: 'LF20240110', expiryDate: '2026-01-10', stockQuantity: 20, unit: '桶', location: '固定室-储物柜', status: '正常', lastReagentDate: '2025-01-10', lastReagentQuantity: 30 },
  { id: 'R026', reagentCode: 'FIX-ethanol-001', reagentName: '无水乙醇（组织脱水用）', category: '脱水剂', specification: '2.5L/瓶', manufacturer: '国药集团', lotNumber: 'GE20240105', expiryDate: '2026-07-05', stockQuantity: 24, unit: '瓶', location: '脱水室-试剂柜', status: '正常', lastReagentDate: '2025-01-05', lastReagentQuantity: 36 },
  { id: 'R027', reagentCode: 'FIX-xylene-001', reagentName: '二甲苯（透明用）', category: '脱水剂', specification: '2.5L/瓶', manufacturer: '国药集团', lotNumber: 'GX20240108', expiryDate: '2026-07-08', stockQuantity: 18, unit: '瓶', location: '脱水室-试剂柜', status: '正常', lastReagentDate: '2025-01-08', lastReagentQuantity: 24 },
  { id: 'R028', reagentCode: 'EMB-paraffin-001', reagentName: '病理切片石蜡（熔点56-58°C）', category: '包埋剂', specification: '2.5kg/箱', manufacturer: 'Leica', lotNumber: 'LP20240201', expiryDate: '2027-02-01', stockQuantity: 15, unit: '箱', location: '包埋室-石蜡柜', status: '正常', lastReagentDate: '2025-02-01', lastReagentQuantity: 20 },
  { id: 'R029', reagentCode: 'EMB-paraffin-002', reagentName: '病理切片石蜡（熔点60-62°C）', category: '包埋剂', specification: '2.5kg/箱', manufacturer: 'Leica', lotNumber: 'LP20240205', expiryDate: '2027-02-05', stockQuantity: 12, unit: '箱', location: '包埋室-石蜡柜', status: '正常', lastReagentDate: '2025-02-05', lastReagentQuantity: 18 },
  { id: 'R030', reagentCode: 'SLICE-blade-001', reagentName: '一次性病理切片刀片（徕卡）', category: '切片耗材', specification: '50片/盒', manufacturer: 'Leica', lotNumber: 'LB20240301', expiryDate: '2028-03-01', stockQuantity: 25, unit: '盒', location: '切片室-刀片柜', status: '正常', lastReagentDate: '2025-03-01', lastReagentQuantity: 40 },
  { id: 'R031', reagentCode: 'SLICE-slanblade-001', reagentName: '一次性病理切片刀片（羽毛）', category: '切片耗材', specification: '50片/盒', manufacturer: 'Feather', lotNumber: 'LF20240305', expiryDate: '2028-03-05', stockQuantity: 20, unit: '盒', location: '切片室-刀片柜', status: '正常', lastReagentDate: '2025-03-05', lastReagentQuantity: 30 },
  { id: 'R032', reagentCode: 'SLIDE-glass-001', reagentName: '病理级显微镜载玻片', category: '切片耗材', specification: '100片/盒', manufacturer: 'SuperFrost', lotNumber: 'LS20240215', expiryDate: '2028-02-15', stockQuantity: 30, unit: '盒', location: '切片室-玻片柜', status: '正常', lastReagentDate: '2025-02-15', lastReagentQuantity: 50 },
  { id: 'R033', reagentCode: 'SLIDE-coverslip-001', reagentName: '病理级盖玻片', category: '切片耗材', specification: '100片/盒', manufacturer: 'Thermo', lotNumber: 'LC20240220', expiryDate: '2028-02-20', stockQuantity: 25, unit: '盒', location: '封片室-耗材柜', status: '正常', lastReagentDate: '2025-02-20', lastReagentQuantity: 40 },
  { id: 'R034', reagentCode: 'MOUNT-mounting-001', reagentName: '中性树胶封片液', category: '切片耗材', specification: '100mL/瓶', manufacturer: 'Basolab', lotNumber: 'LM20240210', expiryDate: '2025-10-10', stockQuantity: 10, unit: '瓶', location: '封片室-试剂柜', status: '正常', lastReagentDate: '2025-02-10', lastReagentQuantity: 15 },
  { id: 'R035', reagentCode: 'MOL-PCR-001', reagentName: 'EGFR基因突变检测试剂盒（PCR法）', category: '分子病理试剂', specification: '24测试/盒', manufacturer: 'AmoyDx', lotNumber: 'AE20240301', expiryDate: '2025-09-01', stockQuantity: 5, unit: '盒', location: '分子室-冷柜A', status: '正常', lastReagentDate: '2025-03-01', lastReagentQuantity: 8 },
  { id: 'R036', reagentCode: 'MOL-PCR-002', reagentName: 'KRAS基因突变检测试剂盒（PCR法）', category: '分子病理试剂', specification: '24测试/盒', manufacturer: 'AmoyDx', lotNumber: 'AK20240305', expiryDate: '2025-09-05', stockQuantity: 4, unit: '盒', location: '分子室-冷柜A', status: '正常', lastReagentDate: '2025-03-05', lastReagentQuantity: 6 },
  { id: 'R037', reagentCode: 'MOL-FISH-001', reagentName: 'HER2基因扩增检测试剂盒（FISH法）', category: '分子病理试剂', specification: '20测试/盒', manufacturer: 'ZytoVision', lotNumber: 'ZF20240215', expiryDate: '2025-08-15', stockQuantity: 3, unit: '盒', location: '分子室-冷柜B', status: '正常', lastReagentDate: '2025-02-15', lastReagentQuantity: 5 },
  { id: 'R038', reagentCode: 'MOL-NGS-001', reagentName: 'NGS肿瘤基因突变检测panel', category: '分子病理试剂', specification: '8测试/盒', manufacturer: 'Illumina', lotNumber: 'IN20240120', expiryDate: '2025-07-20', stockQuantity: 2, unit: '盒', location: '分子室-冷柜B', status: '正常', lastReagentDate: '2025-01-20', lastReagentQuantity: 4 },
  { id: 'R039', reagentCode: 'MOL-ALK-001', reagentName: 'EML4-ALK融合基因检测试剂盒（FISH法）', category: '分子病理试剂', specification: '20测试/盒', manufacturer: 'Abbot', lotNumber: 'ZA20240201', expiryDate: '2025-08-01', stockQuantity: 3, unit: '盒', location: '分子室-冷柜B', status: '正常', lastReagentDate: '2025-02-01', lastReagentQuantity: 5 },
  { id: 'R040', reagentCode: 'IHC-p16-001', reagentName: 'p16（E6H4）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VP20240310', expiryDate: '2025-09-10', stockQuantity: 8, unit: '支', location: '2°C冰箱C区-2层', status: '正常', lastReagentDate: '2025-03-10', lastReagentQuantity: 12 },
  { id: 'R041', reagentCode: 'IHC-CK5-6-001', reagentName: 'CK5/6（XM26）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VK20240312', expiryDate: '2025-09-12', stockQuantity: 6, unit: '支', location: '2°C冰箱C区-3层', status: '正常', lastReagentDate: '2025-03-12', lastReagentQuantity: 10 },
  { id: 'R042', reagentCode: 'IHC-p63-001', reagentName: 'p63（4A4）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VP20240315', expiryDate: '2025-09-15', stockQuantity: 7, unit: '支', location: '2°C冰箱C区-3层', status: '正常', lastReagentDate: '2025-03-15', lastReagentQuantity: 10 },
  { id: 'R043', reagentCode: 'IHC-NapsinA-001', reagentName: 'Napsin A（TMUAd02）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VN20240318', expiryDate: '2025-09-18', stockQuantity: 9, unit: '支', location: '2°C冰箱C区-4层', status: '正常', lastReagentDate: '2025-03-18', lastReagentQuantity: 15 },
  { id: 'R044', reagentCode: 'IHC-CEA-001', reagentName: 'CEA（II-7）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LC20240320', expiryDate: '2025-09-20', stockQuantity: 12, unit: '支', location: '2°C冰箱C区-4层', status: '正常', lastReagentDate: '2025-03-20', lastReagentQuantity: 18 },
  { id: 'R045', reagentCode: 'IHC-CA125-001', reagentName: 'CA125（OC125）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LC20240322', expiryDate: '2025-09-22', stockQuantity: 6, unit: '支', location: '2°C冰箱D区-1层', status: '正常', lastReagentDate: '2025-03-22', lastReagentQuantity: 10 },
  { id: 'R046', reagentCode: 'IHC-CAIX-001', reagentName: '碳酸酐酶IX（CAIX）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VC20240325', expiryDate: '2025-09-25', stockQuantity: 5, unit: '支', location: '2°C冰箱D区-1层', status: '正常', lastReagentDate: '2025-03-25', lastReagentQuantity: 8 },
  { id: 'R047', reagentCode: 'IHC-Vimentin-001', reagentName: 'Vimentin（V9）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LV20240328', expiryDate: '2025-09-28', stockQuantity: 14, unit: '支', location: '2°C冰箱D区-2层', status: '正常', lastReagentDate: '2025-03-28', lastReagentQuantity: 20 },
  { id: 'R048', reagentCode: 'IHC-EMA-001', reagentName: 'EMA（E29）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LE20240401', expiryDate: '2025-10-01', stockQuantity: 10, unit: '支', location: '2°C冰箱D区-2层', status: '正常', lastReagentDate: '2025-04-01', lastReagentQuantity: 15 },
  { id: 'R049', reagentCode: 'IHC-CD10-001', reagentName: 'CD10（56C6）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Novocastra', lotNumber: 'LN20240405', expiryDate: '2025-10-05', stockQuantity: 8, unit: '支', location: '2°C冰箱D区-3层', status: '正常', lastReagentDate: '2025-04-05', lastReagentQuantity: 12 },
  { id: 'R050', reagentCode: 'IHC-BCL2-001', reagentName: 'BCL-2（124）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LB20240408', expiryDate: '2025-10-08', stockQuantity: 7, unit: '支', location: '2°C冰箱D区-3层', status: '正常', lastReagentDate: '2025-04-08', lastReagentQuantity: 10 },
  { id: 'R051', reagentCode: 'IHC-BCL6-001', reagentName: 'BCL-6（PG-B6p）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LB20240410', expiryDate: '2025-10-10', stockQuantity: 6, unit: '支', location: '2°C冰箱D区-4层', status: '正常', lastReagentDate: '2025-04-10', lastReagentQuantity: 10 },
  { id: 'R052', reagentCode: 'IHC-MUM1-001', reagentName: 'MUM1（EUT-6）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LM20240412', expiryDate: '2025-10-12', stockQuantity: 5, unit: '支', location: '2°C冰箱D区-4层', status: '正常', lastReagentDate: '2025-04-12', lastReagentQuantity: 8 },
  { id: 'R053', reagentCode: 'IHC-MYC-001', reagentName: 'c-MYC（Y69）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VM20240415', expiryDate: '2025-10-15', stockQuantity: 4, unit: '支', location: '2°C冰箱E区-1层', status: '正常', lastReagentDate: '2025-04-15', lastReagentQuantity: 6 },
  { id: 'R054', reagentCode: 'IHC-ATRX-001', reagentName: 'ATRX（HPA001906）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Sigma', lotNumber: 'LA20240418', expiryDate: '2025-10-18', stockQuantity: 5, unit: '支', location: '2°C冰箱E区-1层', status: '正常', lastReagentDate: '2025-04-18', lastReagentQuantity: 8 },
  { id: 'R055', reagentCode: 'IHC-p53-001', reagentName: 'p53（DO-7）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LP20240420', expiryDate: '2025-10-20', stockQuantity: 12, unit: '支', location: '2°C冰箱E区-2层', status: '正常', lastReagentDate: '2025-04-20', lastReagentQuantity: 18 },
  { id: 'R056', reagentCode: 'IHC-SOX10-001', reagentName: 'SOX10（强阳性）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VS20240422', expiryDate: '2025-10-22', stockQuantity: 4, unit: '支', location: '2°C冰箱E区-2层', status: '正常', lastReagentDate: '2025-04-22', lastReagentQuantity: 6 },
  { id: 'R057', reagentCode: 'IHC-HER2-002', reagentName: 'HER2（4B5）兔抗人单克隆抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VH20240425', expiryDate: '2025-10-25', stockQuantity: 16, unit: '支', location: '2°C冰箱E区-3层', status: '正常', lastReagentDate: '2025-04-25', lastReagentQuantity: 25 },
  { id: 'R058', reagentCode: 'IHC-PDL1-001', reagentName: 'PD-L1（SP263）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VP20240428', expiryDate: '2025-10-28', stockQuantity: 8, unit: '支', location: '2°C冰箱E区-3层', status: '正常', lastReagentDate: '2025-04-28', lastReagentQuantity: 12 },
  { id: 'R059', reagentCode: 'IHC-PDL1-002', reagentName: 'PD-L1（22C3）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Dako', lotNumber: 'LP20240501', expiryDate: '2025-11-01', stockQuantity: 6, unit: '支', location: '2°C冰箱E区-4层', status: '正常', lastReagentDate: '2025-05-01', lastReagentQuantity: 10 },
  { id: 'R060', reagentCode: 'IHC-CK19-001', reagentName: 'CK19（A53-B/A2.26）抗体', category: '抗体', specification: '0.1mL/支', manufacturer: 'Ventana', lotNumber: 'VC20240505', expiryDate: '2025-11-05', stockQuantity: 10, unit: '支', location: '2°C冰箱E区-4层', status: '正常', lastReagentDate: '2025-05-05', lastReagentQuantity: 15 },
];

export const borrowRecords: BorrowRecord[] = [
  { id: 'B001', recordId: 'JY20260503001', specimenId: 'BX202605020001', patientName: '张伟', slidesNo: 'QP-2025-0502-001', borrower: '王海涛', department: '胸外科', borrowDate: '2025-05-03 14:00', expectedReturnDate: '2025-05-10 14:00', actualReturnDate: '2025-05-08 10:30', purpose: '会诊讨论', status: '已归还', approver: '张建国', remarks: '学术会议使用' },
  { id: 'B002', recordId: 'JY20260503002', specimenId: 'BX202605020002', patientName: '李娜', slidesNo: 'QP-2025-0502-002', borrower: '刘芳', department: '乳腺外科', borrowDate: '2025-05-03 09:00', expectedReturnDate: '2025-05-10 09:00', purpose: 'MDT讨论', status: '借出', approver: '王丽华' },
  { id: 'B003', recordId: 'JY20260502001', specimenId: 'BX202605020008', patientName: '吴磊', slidesNo: 'QP-2025-0502-008', borrower: '赵志明', department: '骨科', borrowDate: '2025-05-02 16:00', expectedReturnDate: '2025-05-09 16:00', actualReturnDate: '2025-05-09 14:00', purpose: '患者家属借阅', status: '已归还', approver: '刘明辉', remarks: '患者复印病历' },
  { id: 'B004', recordId: 'JY20260502002', specimenId: 'BX202605020015', patientName: '高峰', slidesNo: 'QP-2025-0502-015', borrower: '周主任', department: '神经外科', borrowDate: '2025-05-02 10:00', expectedReturnDate: '2025-05-09 10:00', purpose: '术中冰冻对比', status: '已归还', approver: '李敏' },
  { id: 'B005', recordId: 'JY20260501001', specimenId: 'BX202605010093', patientName: '赵新建', slidesNo: 'QP-2025-0501-093', borrower: '孙教授', department: '胸外科', borrowDate: '2025-05-01 15:00', expectedReturnDate: '2025-05-08 15:00', actualReturnDate: '2025-05-07 11:00', purpose: '科研课题', status: '已归还', approver: '张建国', remarks: '肺癌分子机制研究' },
  { id: 'B006', recordId: 'JY20260501002', specimenId: 'BX202605010061', patientName: '黄丽', slidesNo: 'QP-2025-0501-061', borrower: '陈医生', department: '肿瘤内科', borrowDate: '2025-05-01 08:30', expectedReturnDate: '2025-05-15 08:30', purpose: '免疫组化复查', status: '超期', approver: '王丽华', remarks: '需补充HER2检测' },
  { id: 'B007', recordId: 'JY20260430001', specimenId: 'BX202604300081', patientName: '冯志强', slidesNo: 'QP-2025-0430-081', borrower: '林主任', department: '胸外科', borrowDate: '2025-04-30 11:00', expectedReturnDate: '2025-05-07 11:00', actualReturnDate: '2025-05-06 16:00', purpose: '远程会诊', status: '已归还', approver: '李敏' },
  { id: 'B008', recordId: 'JY20260430002', specimenId: 'BX202604300082', patientName: '曹雪梅', slidesNo: 'QP-2025-0430-082', borrower: '张华', department: '内分泌科', borrowDate: '2025-04-30 14:00', expectedReturnDate: '2025-05-07 14:00', actualReturnDate: '2025-05-05 09:00', purpose: '院际会诊', status: '已归还', approver: '陈美华' },
  { id: 'B009', recordId: 'JY20260428001', specimenId: 'BX202604280065', patientName: '高峰', slidesNo: 'QP-2025-0428-065', borrower: '吴教授', department: '神经外科', borrowDate: '2025-04-28 10:00', expectedReturnDate: '2025-05-05 10:00', purpose: '学术交流', status: '遗失', approver: '王志强', remarks: '切片遗失，正在查找' },
  { id: 'B010', recordId: 'JY20260428002', specimenId: 'BX202604280058', patientName: '吴磊', slidesNo: 'QP-2025-0428-058', borrower: '黄医生', department: '骨科', borrowDate: '2025-04-28 15:00', expectedReturnDate: '2025-05-05 15:00', actualReturnDate: '2025-05-04 11:30', purpose: '教学读片', status: '已归还', approver: '刘明辉' },
  { id: 'B011', recordId: 'JY20260427001', specimenId: 'BX202604270056', patientName: '赵军', slidesNo: 'QP-2025-0427-056', borrower: '马主任', department: '泌尿外科', borrowDate: '2025-04-27 09:00', expectedReturnDate: '2025-05-04 09:00', actualReturnDate: '2025-05-03 14:00', purpose: '病理质控', status: '已归还', approver: '陈志强' },
  { id: 'B012', recordId: 'JY20260426001', specimenId: 'BX202604260051', patientName: '张伟', slidesNo: 'QP-2025-0426-051', borrower: '李教授', department: '胸外科', borrowDate: '2025-04-26 16:00', expectedReturnDate: '2025-05-03 16:00', actualReturnDate: '2025-05-02 10:00', purpose: '科研课题', status: '已归还', approver: '张建国', remarks: 'EGFR突变研究' },
  { id: 'B013', recordId: 'JY20260504001', specimenId: 'BX202605030017', patientName: '周建平', slidesNo: 'QP-2025-0503-017', borrower: '王医生', department: '胸外科', borrowDate: '2025-05-04 08:00', expectedReturnDate: '2025-05-11 08:00', purpose: '患者家属借阅', status: '借出', approver: '张建国' },
  { id: 'B014', recordId: 'JY20260504002', specimenId: 'BX202605030027', patientName: '钱文华', slidesNo: 'QP-2025-0503-027', borrower: '郑教授', department: '肝胆外科', borrowDate: '2025-05-04 10:00', expectedReturnDate: '2025-05-11 10:00', purpose: '会诊讨论', status: '借出', approver: '张建国' },
  { id: 'B015', recordId: 'JY20260504003', specimenId: 'BX202605030035', patientName: '徐志强', slidesNo: 'QP-2025-0503-035', borrower: '叶主任', department: '泌尿外科', borrowDate: '2025-05-04 14:00', expectedReturnDate: '2025-05-11 14:00', purpose: '学术会议', status: '借出', approver: '陈志强' },
];

export const statisticsData = {
  monthlyWorkload: [
    { month: '2025-01', cases: 910, reports: 898, frozen: 52, ihc: 162 },
    { month: '2025-02', cases: 720, reports: 712, frozen: 38, ihc: 125 },
    { month: '2025-03', cases: 856, reports: 848, frozen: 45, ihc: 148 },
    { month: '2025-04', cases: 892, reports: 880, frozen: 48, ihc: 156 },
  ],
  specimenTypeDistribution: [
    { type: '常规活检', count: 2456, percentage: 58.2 },
    { type: '手术标本', count: 1120, percentage: 26.5 },
    { type: '细胞学', count: 380, percentage: 9.0 },
    { type: '冰冻切片', count: 183, percentage: 4.3 },
    { type: '免疫组化', count: 82, percentage: 1.9 },
  ],
  turnaroundTime: [
    { type: '常规报告', avgHours: 42.5, target: 72 },
    { type: '冰冻切片', avgHours: 0.43, target: 0.5 },
    { type: '免疫组化', avgHours: 96, target: 120 },
    { type: '分子病理', avgHours: 168, target: 240 },
  ],
  pathologistWorkload: [
    { name: '张建国', cases: 1120, reports: 1085, avgHours: 38.2 },
    { name: '李敏', cases: 980, reports: 965, avgHours: 35.5 },
    { name: '王丽华', cases: 920, reports: 910, avgHours: 36.8 },
    { name: '陈志强', cases: 860, reports: 850, avgHours: 40.1 },
    { name: '刘明辉', cases: 780, reports: 772, avgHours: 42.3 },
  ],
};

export const systemStats = {
  todayCases: 50,
  pendingReports: 18,
  frozenToday: 5,
  frozenOnTime: 5,
  avgTurnaround: '38.2h',
  qcScore: '95.2',
  pendingConsultations: 6,
  regionalPending: 45,
};

// 兼容各页面引用的别名
export const initialPatients = patients;
export const initialSamples = specimens;
export const initialReports = pathologyReports;
export const initialStainBatches = ihcReports;
export const initialInventory = teachingCases;

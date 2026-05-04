import { useState } from 'react'
import { BookOpen, Users, Video, FileText, Clock, CheckCircle, PlayCircle, GraduationCap } from 'lucide-react'

const courses = [
  { id: 1, title: '病理标本取材规范', category: '基础培训', lecturer: '王主任', duration: '2小时', participants: 45, completed: 38, status: '进行中' },
  { id: 2, title: '免疫组化结果判读', category: '专业技能', lecturer: '李教授', duration: '3小时', participants: 32, completed: 32, status: '已完成' },
  { id: 3, title: '术中冰冻诊断要点', category: '专业技能', lecturer: '张主任', duration: '2.5小时', participants: 28, completed: 25, status: '进行中' },
  { id: 4, title: '分子病理检测技术', category: '前沿技术', lecturer: '刘教授', duration: '4小时', participants: 20, completed: 18, status: '已完成' },
  { id: 5, title: '病理质控标准解读', category: '质量管理', lecturer: '陈主任', duration: '1.5小时', participants: 50, completed: 0, status: '未开始' },
]

const exams = [
  { id: 1, title: '取材规范考核', type: '理论考核', totalScore: 100, passScore: 60, participants: 45, avgScore: 82, passRate: 93 },
  { id: 2, title: '免疫组化考核', type: '实操考核', totalScore: 100, passScore: 70, participants: 32, avgScore: 85, passRate: 96 },
  { id: 3, title: '冰冻诊断考核', type: '案例考核', totalScore: 100, passScore: 65, participants: 28, avgScore: 78, passRate: 89 },
]

const staffTraining = [
  { name: '张伟', role: '主治医师', coursesCompleted: 12, hoursTotal: 48, lastTraining: '2024-03-20' },
  { name: '李娜', role: '住院医师', coursesCompleted: 8, hoursTotal: 32, lastTraining: '2024-03-18' },
  { name: '王强', role: '技术员', coursesCompleted: 15, hoursTotal: 60, lastTraining: '2024-03-22' },
  { name: '刘芳', role: '技术员', coursesCompleted: 10, hoursTotal: 40, lastTraining: '2024-03-15' },
]

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'exams' | 'records'>('courses')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>培训管理</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <Video size={16} /> 创建课程
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#fff', color: '#333', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
            <FileText size={16} /> 创建考核
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <BookOpen size={18} style={{ color: '#F97316' }} />
            <span style={{ color: '#666', fontSize: 13 }}>在线课程</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#F97316' }}>28</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>本月新增 3 门</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0891b2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Users size={18} style={{ color: '#0891b2' }} />
            <span style={{ color: '#666', fontSize: 13 }}>培训人次</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#0891b2' }}>1,256</div>
          <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>本月 186 人次</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <GraduationCap size={18} style={{ color: '#7c3aed' }} />
            <span style={{ color: '#666', fontSize: 13 }}>培训时长</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>4,280h</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>人均 32 小时</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ color: '#666', fontSize: 13 }}>考核通过率</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>94%</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>较上月 +2%</div>
        </div>
      </div>

      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 4, borderRadius: 8, width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('courses')}
          style={{ padding: '8px 20px', background: activeTab === 'courses' ? '#F97316' : 'transparent', color: activeTab === 'courses' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          课程管理
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          style={{ padding: '8px 20px', background: activeTab === 'exams' ? '#F97316' : 'transparent', color: activeTab === 'exams' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          考核管理
        </button>
        <button
          onClick={() => setActiveTab('records')}
          style={{ padding: '8px 20px', background: activeTab === 'records' ? '#F97316' : 'transparent', color: activeTab === 'records' ? '#fff' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
        >
          培训记录
        </button>
      </div>

      {/* 课程管理 */}
      {activeTab === 'courses' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>课程名称</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>分类</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>讲师</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>时长</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>参与/完成</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>状态</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{course.title}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: '#f1f5f9', color: '#666' }}>{course.category}</span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{course.lecturer}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={14} style={{ color: '#666' }} /> {course.duration}
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ color: '#16a34a', fontWeight: 500 }}>{course.completed}</span>
                    <span style={{ color: '#666' }}>/{course.participants}</span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: course.status === '已完成' ? '#dcfce7' : course.status === '进行中' ? '#fef3c7' : '#f1f5f9', color: course.status === '已完成' ? '#166534' : course.status === '进行中' ? '#d97706' : '#666' }}>
                      {course.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#F97316', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                      <PlayCircle size={12} /> 学习
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 考核管理 */}
      {activeTab === 'exams' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>考核名称</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>考核类型</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>总分/及格</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>参与人数</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>平均分</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>通过率</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontSize: 12, fontWeight: 600 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => (
                <tr key={exam.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500 }}>{exam.title}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{exam.type}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{exam.totalScore}/{exam.passScore}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>{exam.participants}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13, fontWeight: 500, color: '#0891b2' }}>{exam.avgScore}</td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, background: exam.passRate >= 90 ? '#dcfce7' : '#fef3c7', color: exam.passRate >= 90 ? '#166534' : '#d97706' }}>
                      {exam.passRate}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 13 }}>
                    <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 培训记录 */}
      {activeTab === 'records' && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {staffTraining.map((staff, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ width: 48, height: 48, background: '#F97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 600 }}>
                  {staff.name.slice(0, 1)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{staff.name}</div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{staff.role}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                    <span>已完成 <span style={{ color: '#16a34a', fontWeight: 600 }}>{staff.coursesCompleted}</span> 门课程</span>
                    <span>累计 <span style={{ color: '#0891b2', fontWeight: 600 }}>{staff.hoursTotal}</span> 小时</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#666' }}>最近培训</div>
                  <div style={{ fontSize: 12, color: '#333' }}>{staff.lastTraining}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

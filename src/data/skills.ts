export interface Skill { name: string; desc: string }
export const skills: Record<string, Skill[]> = {
  Programming: [{ name: 'Python', desc: 'Primary language, used across ML, CV and backend work.' }, { name: 'SQL', desc: 'Querying data.' }, { name: 'JavaScript', desc: 'Front ends and Frappe scripts.' }, { name: 'HTML', desc: 'Web interfaces.' }, { name: 'CSS', desc: 'Styling.' }],
  'Data / ML': [{ name: 'Pandas', desc: 'Data handling in tracking and NLP projects.' }, { name: 'NumPy', desc: 'Numerical computing.' }, { name: 'Scikit-learn', desc: 'Random Forest in crop prediction.' }, { name: 'OpenCV', desc: 'Street people tracking.' }],
  Backend: [{ name: 'Flask', desc: 'Crop prediction API.' }, { name: 'FastAPI', desc: 'Python APIs.' }],
  Database: [{ name: 'MySQL', desc: 'Relational data.' }, { name: 'MongoDB', desc: 'Document data.' }],
  Development: [{ name: 'Git', desc: 'Version control.' }, { name: 'GitHub', desc: '20+ repositories.' }, { name: 'VS Code', desc: 'Editor.' }, { name: 'Linux', desc: 'Development environment.' }],
  'Computer Science': [{ name: 'DSA', desc: 'Algorithms and data structures.' }, { name: 'OOP', desc: 'Object-oriented design.' }, { name: 'System Design', desc: 'Designing systems.' }, { name: 'Scalable Systems', desc: 'Scalable architecture.' }],
}

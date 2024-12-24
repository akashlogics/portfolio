'use client'

import { motion } from 'framer-motion'

export default function Education() {
  const educationData = [
    {
      degree: 'B.Tech - Artificial Intelligence and Data Science',
      institution: 'Karpagam Institute of Technology, Coimbatore',
      date: 'Expected June 2026',
      details: 'CGPA: 7.6/10'
    },
    {
      degree: 'Computer Science',
      institution: 'Sri Vinayaga Vidhyalaya Senior Secondary School',
      date: 'June 2022',
      details: 'Marks: 77%'
    }
  ]

  return (
    <motion.section 
      id="education"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {educationData.map((edu, index) => (
        <motion.div 
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="font-semibold">{edu.degree}</h3>
          <p>{edu.institution}</p>
          <p>{edu.date}</p>
          <p>{edu.details}</p>
        </motion.div>
      ))}
    </motion.section>
  )
}


'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  const experienceData = [
    {
      title: 'Data Analyst Intern',
      company: 'Cognifyz',
      date: 'Aug 2024 - Present | Online',
      details: [
        'Collaborating on tasks related to mathematics, probability, and statistics.',
        'Applying libraries like Scikit-learn, TensorFlow, and OpenCV for data analysis and machine learning tasks.',
        'Completed 5 Kaggle dataset-based ML models.'
      ]
    },
    {
      title: 'Machine Learning Intern',
      company: 'Prodigy InfoTech',
      date: 'May 2024 - June 2024 | Online',
      details: [
        'Worked on machine learning model implementations using Python libraries.',
        'Participated in hackathons to enhance problem-solving skills.'
      ]
    },
    {
      title: 'Contributor',
      company: 'GirlScript Summer of Code',
      date: 'May 2024 - Aug 2024 | Online',
      details: [
        'Contributed to open-source projects, resolved issues, and added features.',
        'Earned 6 badges and 510 points for contributions to Postman-related projects.'
      ]
    },
    {
      title: 'Contributor',
      company: 'Devfolio Social Summer of Code',
      date: 'May 2024 - Aug 2024 | Online',
      details: [
        'Focused on contributing to Quira and Stack Overflow solutions.'
      ]
    }
  ]

  return (
    <motion.section 
      id="experience"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {experienceData.map((exp, index) => (
        <motion.div 
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="font-semibold">{exp.title}</h3>
          <p>{exp.company}</p>
          <p className="text-sm text-gray-600">{exp.date}</p>
          <ul className="list-disc list-inside mt-2">
            {exp.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.section>
  )
}


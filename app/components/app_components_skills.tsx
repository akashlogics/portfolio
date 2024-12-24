'use client'

import { motion } from 'framer-motion'

export default function Skills() {
  const skillsData = [
    { category: 'Machine Learning', skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras'] },
    { category: 'Data Analysis', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
    { category: 'Big Data', skills: ['Apache Spark', 'Hadoop'] },
    { category: 'Programming Languages', skills: ['Python', 'R', 'SQL'] },
    { category: 'Cloud Platforms', skills: ['AWS', 'Google Cloud Platform'] },
    { category: 'Version Control', skills: ['Git', 'GitHub'] },
    { category: 'Deep Learning', skills: ['Neural Networks', 'CNNs', 'RNNs', 'GANs'] },
    { category: 'Natural Language Processing', skills: ['NLTK', 'spaCy', 'Transformers'] },
    { category: 'Data Visualization', skills: ['Tableau', 'Power BI'] },
    { category: 'Statistical Analysis', skills: ['Hypothesis Testing', 'Regression Analysis', 'Time Series Analysis'] },
  ]

  return (
    <motion.section 
      id="skills"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsData.map((category, index) => (
          <motion.div 
            key={index}
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-semibold mb-2">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}


'use client'

import { motion } from 'framer-motion'

export default function AboutMe() {
  return (
    <motion.section 
      id="about-me"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-4">
          Hello! I'm Akash R, a passionate Data Scientist and Machine Learning Engineer in the making. I'm currently pursuing my B.Tech in Artificial Intelligence and Data Science at Karpagam Institute of Technology, Coimbatore, where I'm honing my skills in various aspects of AI, data analysis, and machine learning.
        </p>
        <p className="mb-4">
          My journey in tech has led me to specialize in machine learning model implementations, data analysis, and predictive modeling. I'm particularly interested in applying advanced AI and ML techniques to solve real-world problems, with a focus on areas such as natural language processing, computer vision, and predictive analytics.
        </p>
        <p>
          When I'm not immersed in data or training models, you can find me participating in hackathons, contributing to open-source projects, or exploring the latest advancements in AI and data science. I believe in the power of continuous learning and staying updated with cutting-edge technologies in this rapidly evolving field.
        </p>
      </motion.div>
    </motion.section>
  )
}


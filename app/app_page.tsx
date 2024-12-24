'use client'

import { motion } from 'framer-motion'
import Header from './components/header'
import AboutMe from './components/about-me'
import Education from './components/education'
import Experience from './components/experience'
import Projects from './components/projects'
import Skills from './components/skills'
import Achievements from './components/achievements'
import Connections from './components/connections'
import Footer from './components/footer'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AKASH R
        </motion.h1>
        <motion.h2
          className="text-2xl text-center mb-4 text-gray-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Data Scientist | Machine Learning Engineer
        </motion.h2>
        <motion.div 
          className="py-2 mb-6 flex justify-center items-center space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm">Phone: +919789465540 • Email: akashmtp2004@gmail.com</p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/in/akashr39t" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            <a href="https://github.com/akashlogics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
            <a href="https://leetcode.com/akashlogics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LeetCode</a>
          </div>
        </motion.div>
        <AboutMe />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Connections />
      </main>
      <Footer />
    </div>
  )
}


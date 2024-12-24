'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Code, Database, Award, BookOpen, HelpCircle, Bookmark } from 'lucide-react';

export default function Connections() {
  const connections = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/akashr39t', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/akashlogics', icon: Github },
    { name: 'LeetCode', url: 'https://leetcode.com/akashlogics', icon: Code },
    { name: 'Kaggle', url: 'https://www.kaggle.com/yourusername', icon: Database },
    { name: 'Unstop', url: 'https://unstop.com/yourusername', icon: Award },
    { name: 'Medium', url: 'https://medium.com/@yourusername', icon: BookOpen },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/youruserid', icon: HelpCircle },
    { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=youruserid', icon: Bookmark },
  ]

  return (
    <motion.section 
      id="connections"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Connect with Me</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {connections.map((connection, index) => (
          <motion.a
            key={connection.name}
            href={connection.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <connection.icon className="mr-2" />
            {connection.name}
          </motion.a>
        ))}
      </div>
    </motion.section>
  )
}


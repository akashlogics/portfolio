'use client'

import { motion } from 'framer-motion'

export default function Achievements() {
  const achievementsData = [
    '2nd Place • ByteWorks 2.0 Hackathon',
    'Participation • Pinnacle CIT Paper Presentation',
    'Participation • SIH\'23 Hackathon'
  ]

  return (
    <motion.section 
      id="achievements"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <ul className="space-y-2">
        {achievementsData.map((achievement, index) => (
          <motion.li 
            key={index}
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {achievement}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  )
}


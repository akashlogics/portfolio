'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      className="bg-blue-600 text-white py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Akash R. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}


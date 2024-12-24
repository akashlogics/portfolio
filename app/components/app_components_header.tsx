'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('text-yellow-300');
        } else {
          document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('text-yellow-300');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.header 
      className="bg-blue-600 text-white py-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold"
          whileHover={{ scale: 1.1 }}
        >
          PORTFOLIO
        </motion.div>
        <ul className="flex space-x-4">
          {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Connect'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <a 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="cursor-pointer"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}


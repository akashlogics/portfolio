'use client'

import { motion } from 'framer-motion'

export default function Projects() {
  const projectData = [
    {
      title: 'Sentiment Analysis on Social Media Data',
      description: 'NLP Project',
      details: [
        'Developed a machine learning model to analyze sentiment in social media posts',
        'Utilized Python, NLTK, and Scikit-learn for text processing and classification',
        'Achieved 85% accuracy in sentiment prediction on a test dataset'
      ]
    },
    {
      title: 'Customer Churn Prediction',
      description: 'Machine Learning Project',
      details: [
        'Built a predictive model to identify customers likely to churn',
        'Implemented feature engineering and ensemble methods using Python and Scikit-learn',
        'Improved customer retention strategies, potentially saving 15% in revenue'
      ]
    },
    {
      title: 'Image Classification with Deep Learning',
      description: 'Computer Vision Project',
      details: [
        'Developed a Convolutional Neural Network (CNN) for image classification',
        'Used TensorFlow and Keras to train the model on a large dataset',
        'Achieved 92% accuracy in classifying images across 10 different categories'
      ]
    },
    {
      title: 'Time Series Forecasting for Stock Prices',
      description: 'Data Analysis Project',
      details: [
        'Implemented ARIMA and LSTM models for stock price prediction',
        'Utilized Python, Pandas, and Statsmodels for data processing and modeling',
        'Achieved a Mean Absolute Percentage Error (MAPE) of 5.2% on test data'
      ]
    }
  ]

  return (
    <motion.section 
      id="projects"
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projectData.map((project, index) => (
        <motion.div 
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
          <ul className="list-disc list-inside mt-2">
            {project.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.section>
  )
}


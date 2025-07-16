import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import FormBuilder from './components/FormBuilder';
import TemplateSelector from './components/TemplateSelector';
import LivePreview from './components/LivePreview';
import { PortfolioData } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personal: {
      name: '',
      bio: '',
      github: '',
    },
    contact: {
      email: '',
      phone: '',
    },
    social: {
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    skills: [],
    experience: [],
    achievements: [],
    projects: [],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');
  const [activeStep, setActiveStep] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-accent-50'
    }`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20',
        }}
      />
      
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
            Portfolio Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create stunning, professional portfolios in minutes with our AI-powered generator
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Builder Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <FormBuilder
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
            
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </motion.div>

          {/* Live Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-8"
          >
            <LivePreview
              portfolioData={portfolioData}
              selectedTemplate={selectedTemplate}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
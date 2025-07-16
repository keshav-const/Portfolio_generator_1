import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { PortfolioData } from '../types';
import PortfolioPreview from './preview/PortfolioPreview';

interface LivePreviewProps {
  portfolioData: PortfolioData;
  selectedTemplate: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  portfolioData,
  selectedTemplate,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!portfolioData.personal.name || !portfolioData.contact.email) {
      toast.error('Please fill in your name and email before downloading');
      return;
    }

    setIsDownloading(true);
    try {
      // Check if server is running first
      const healthCheck = await fetch('https://portfolio-generator-1-pvg2.onrender.com/api/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioData: { personal: { name: 'test' }, contact: { email: 'test@test.com' } },
          template: 'minimalist',
        }),
      }).catch(() => null);

      if (!healthCheck) {
        toast.error('Server not running. Please start the server with "npm run server" in a new terminal.');
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('portfolioData', JSON.stringify(portfolioData));
      formData.append('template', selectedTemplate);
      
      // Add resume file if it exists
      if (portfolioData.resume) {
        formData.append('resume', portfolioData.resume);
      }

      const response = await fetch('https://portfolio-generator-1-pvg2.onrender.com/api/download', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${portfolioData.personal.name.replace(/\s+/g, '_')}_Portfolio.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Portfolio downloaded successfully!');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
        throw new Error(errorData.error || 'Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Cannot connect to server. Please run "npm run server" in a new terminal to start the backend server.');
      } else {
        toast.error('Failed to download portfolio. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call for preview generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Preview updated!');
    } catch (error) {
      toast.error('Failed to generate preview');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Live Preview
          </h3>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGeneratePreview}
            disabled={isGenerating}
            className="px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isGenerating ? 'Updating...' : 'Refresh'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg shadow-primary-500/25"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
          </motion.button>
        </div>
      </div>

      <div className="relative">
        {/* Fixed vertical scrolling by moving overflow properties to the scaled container */}
        <div className="aspect-[4/3] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner max-h-96">
          <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            <PortfolioPreview
              portfolioData={portfolioData}
              template={selectedTemplate}
            />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-gray-900/10 pointer-events-none rounded-xl" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {portfolioData.personal.name 
            ? `Preview for ${portfolioData.personal.name}'s Portfolio`
            : 'Fill in your details to see the preview'
          }
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Scroll to see more content • Download requires server: run "npm run server" in terminal
        </p>
      </div>
    </div>
  );
};

export default LivePreview;
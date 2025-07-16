import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Monitor, Zap, Moon, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and simple design focused on content',
    icon: Monitor,
    color: 'from-gray-400 to-gray-600',
    preview: 'bg-white border-2 border-gray-200',
  },
  {
    id: 'devfolio',
    name: 'DevFolio',
    description: 'Perfect for developers with code-focused layout',
    icon: Zap,
    color: 'from-green-400 to-blue-500',
    preview: 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200',
  },
  {
    id: 'creative',
    name: 'Creative Edge',
    description: 'Bold and artistic with vibrant colors',
    icon: Palette,
    color: 'from-purple-400 to-pink-500',
    preview: 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200',
  },
  {
    id: 'darkmode',
    name: 'Dark Mode',
    description: 'Sleek dark theme for modern professionals',
    icon: Moon,
    color: 'from-gray-700 to-gray-900',
    preview: 'bg-gray-900 border-2 border-gray-700',
  },
  {
    id: 'modern',
    name: 'Modern Pro',
    description: 'Professional layout with glassmorphism effects',
    icon: Sparkles,
    color: 'from-cyan-400 to-blue-500',
    preview: 'bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200',
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  return (
    <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Template
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select a design that represents your style and personality.
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/25'
                  : 'border-white/30 dark:border-gray-700/30 hover:border-primary-300 dark:hover:border-primary-600 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${template.color} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {template.description}
                  </p>
                </div>

                <div className={`w-16 h-12 rounded-lg ${template.preview} flex items-center justify-center shadow-inner`}>
                  <div className={`w-8 h-2 rounded-full bg-gradient-to-r ${template.color} opacity-60`} />
                </div>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
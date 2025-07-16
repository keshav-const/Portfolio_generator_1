import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Trash2, Briefcase, MapPin, Calendar } from 'lucide-react';
import { WorkExperience } from '../../types';

interface ExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const experienceSchema = yup.object({
  company: yup.string().required('Company name is required'),
  position: yup.string().required('Position is required'),
  duration: yup.string().required('Duration is required'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  location: yup.string(),
});

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>(data || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<WorkExperience, 'id'>>({
    resolver: yupResolver(experienceSchema),
    mode: 'onChange',
    defaultValues: {
      company: '',
      position: '',
      duration: '',
      description: '',
      location: '',
    },
  });

  const addExperience = (experienceData: Omit<WorkExperience, 'id'>) => {
    const newExperience: WorkExperience = {
      ...experienceData,
      id: Date.now().toString(),
    };
    
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    reset({
      company: '',
      position: '',
      duration: '',
      description: '',
      location: '',
    });
  };

  const removeExperience = (id: string) => {
    const updatedExperiences = experiences.filter(e => e.id !== id);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Work Experience
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Share your professional journey and accomplishments. This section is optional.
        </p>
      </div>

      {/* Existing Experiences */}
      <AnimatePresence>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {experience.position}
                  </h4>
                </div>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                  {experience.company}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeExperience(experience.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Experience Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30"
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Work Experience
        </h4>
        
        <form onSubmit={handleSubmit(addExperience)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('company')}
                type="text"
                placeholder="e.g., Google, Microsoft, Amazon"
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.company
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position/Role *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('position')}
                type="text"
                placeholder="e.g., Software Engineer, Frontend Developer"
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.position
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('duration')}
                type="text"
                placeholder="e.g., May 2025 - Present, 6 months"
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.duration
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location (Optional)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('location')}
                type="text"
                placeholder="e.g., Bengaluru, San Francisco / Remote"
                className="w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              {...register('description')}
              rows={4}
              placeholder="Describe your role, responsibilities, and key achievements..."
              className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                errors.description
                  ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-lg shadow-primary-500/25"
          >
            Add Experience
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceForm;
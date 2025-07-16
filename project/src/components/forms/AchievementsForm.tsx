import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Trash2, Trophy } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementsFormProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

const achievementSchema = yup.object({
  title: yup.string().required('Achievement title is required'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
});

const AchievementsForm: React.FC<AchievementsFormProps> = ({ data, onChange }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(data || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Achievement, 'id'>>({
    resolver: yupResolver(achievementSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const addAchievement = (achievementData: Omit<Achievement, 'id'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: Date.now().toString(),
    };
    
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    onChange(updatedAchievements);
    reset({
      title: '',
      description: '',
    });
  };

  const removeAchievement = (id: string) => {
    const updatedAchievements = achievements.filter(a => a.id !== id);
    setAchievements(updatedAchievements);
    onChange(updatedAchievements);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Achievements
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Highlight your accomplishments, awards, and recognitions. This section is optional.
        </p>
      </div>

      {/* Existing Achievements */}
      <AnimatePresence>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeAchievement(achievement.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Achievement Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30"
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Achievement
        </h4>
        
        <form onSubmit={handleSubmit(addAchievement)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Achievement Title *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('title')}
              type="text"
              placeholder="e.g., Winner of National Coding Competition"
              className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.title
                  ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              {...register('description')}
              rows={3}
              placeholder="Describe your achievement and its significance..."
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
            Add Achievement
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AchievementsForm;
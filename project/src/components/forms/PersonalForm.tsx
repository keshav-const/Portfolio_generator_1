import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PersonalInfo } from '../../types';

interface PersonalFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  bio: yup.string().required('Bio is required').min(10, 'Bio must be at least 10 characters'),
  github: yup.string().url('Please enter a valid GitHub URL').required('GitHub URL is required'),
});

const PersonalForm: React.FC<PersonalFormProps> = ({ data, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfo>({
    resolver: yupResolver(schema),
    defaultValues: data,
    mode: 'onChange',
  });

  // Watch for changes and update parent
  React.useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about yourself and what makes you unique.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            {...register('name')}
            type="text"
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.name
                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
            }`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio *
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            {...register('bio')}
            rows={4}
            placeholder="I'm a passionate developer who loves creating amazing user experiences..."
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
              errors.bio
                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
            }`}
          />
          {errors.bio && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.bio.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub URL *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            {...register('github')}
            type="url"
            placeholder="https://github.com/yourusername"
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.github
                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
            }`}
          />
          {errors.github && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.github.message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalForm;
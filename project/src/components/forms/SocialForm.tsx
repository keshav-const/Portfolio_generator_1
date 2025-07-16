import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { SocialInfo } from '../../types';

interface SocialFormProps {
  data: SocialInfo;
  onChange: (data: SocialInfo) => void;
}

const schema = yup.object({
  linkedin: yup.string().url('Please enter a valid LinkedIn URL'),
  twitter: yup.string().url('Please enter a valid Twitter URL'),
  instagram: yup.string().url('Please enter a valid Instagram URL'),
});

const SocialForm: React.FC<SocialFormProps> = ({ data, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SocialInfo>({
    resolver: yupResolver(schema),
    defaultValues: data,
    mode: 'onChange',
  });

  React.useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as SocialInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const socialPlatforms = [
    {
      name: 'linkedin',
      label: 'LinkedIn Profile',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/yourusername',
      color: 'text-blue-600',
    },
    {
      name: 'twitter',
      label: 'Twitter Profile',
      icon: Twitter,
      placeholder: 'https://twitter.com/yourusername',
      color: 'text-sky-500',
    },
    {
      name: 'instagram',
      label: 'Instagram Profile',
      icon: Instagram,
      placeholder: 'https://instagram.com/yourusername',
      color: 'text-pink-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Social Media Links
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your social media profiles to expand your online presence.
        </p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const fieldName = platform.name as keyof SocialInfo;
          
          return (
            <div key={platform.name}>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Icon className={`w-4 h-4 ${platform.color}`} />
                <span>{platform.label}</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register(fieldName)}
                type="url"
                placeholder={platform.placeholder}
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors[fieldName]
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors[fieldName] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {errors[fieldName]?.message}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialForm;
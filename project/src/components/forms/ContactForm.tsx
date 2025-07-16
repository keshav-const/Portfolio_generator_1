import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ContactInfo } from '../../types';

interface ContactFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
});

const ContactForm: React.FC<ContactFormProps> = ({ data, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactInfo>({
    resolver: yupResolver(schema),
    defaultValues: data,
    mode: 'onChange',
  });

  React.useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as ContactInfo);
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
          Contact Information
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          How can potential employers or clients reach you?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            {...register('email')}
            type="email"
            placeholder="john.doe@example.com"
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.email
                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            {...register('phone')}
            type="tel"
            placeholder="+919876543210"
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.phone
                ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
            }`}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
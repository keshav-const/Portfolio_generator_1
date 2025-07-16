import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Share2, FolderOpen, ChevronRight, ChevronLeft, Award, Briefcase } from 'lucide-react';
import { Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../types';
import PersonalForm from './forms/PersonalForm';
import ContactForm from './forms/ContactForm';
import SocialForm from './forms/SocialForm';
import SkillsForm from './forms/SkillsForm';
import ExperienceForm from './forms/ExperienceForm';
import AchievementsForm from './forms/AchievementsForm';
import ResumeForm from './forms/ResumeForm';
import ProjectsForm from './forms/ProjectsForm';

interface FormBuilderProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const steps = [
  { id: 0, title: 'Personal Info', icon: User, description: 'Basic information about you' },
  { id: 1, title: 'Contact', icon: Mail, description: 'How people can reach you' },
  { id: 2, title: 'Social Links', icon: Share2, description: 'Your social media presence' },
  { id: 3, title: 'Skills', icon: Award, description: 'Your technical expertise' },
  { id: 4, title: 'Experience', icon: Briefcase, description: 'Your work history (optional)' },
  { id: 5, title: 'Achievements', icon: Trophy, description: 'Your accomplishments (optional)' },
  { id: 6, title: 'Resume', icon: FileText, description: 'Upload your resume (optional)' },
  { id: 7, title: 'Projects', icon: FolderOpen, description: 'Showcase your work' },
];

const FormBuilder: React.FC<FormBuilderProps> = ({
  portfolioData,
  setPortfolioData,
  activeStep,
  setActiveStep,
}) => {
  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalForm
            data={portfolioData.personal}
            onChange={(personal) => setPortfolioData(prev => ({ ...prev, personal }))}
          />
        );
      case 1:
        return (
          <ContactForm
            data={portfolioData.contact}
            onChange={(contact) => setPortfolioData(prev => ({ ...prev, contact }))}
          />
        );
      case 2:
        return (
          <SocialForm
            data={portfolioData.social}
            onChange={(social) => setPortfolioData(prev => ({ ...prev, social }))}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={portfolioData.skills}
            onChange={(skills) => setPortfolioData(prev => ({ ...prev, skills }))}
          />
        );
      case 4:
        return (
          <ExperienceForm
            data={portfolioData.experience}
            onChange={(experience) => setPortfolioData(prev => ({ ...prev, experience }))}
          />
        );
      case 5:
        return (
          <AchievementsForm
            data={portfolioData.achievements}
            onChange={(achievements) => setPortfolioData(prev => ({ ...prev, achievements }))}
          />
        );
      case 6:
        return (
          <ResumeForm
            data={portfolioData.resume}
            onChange={(resume) => setPortfolioData(prev => ({ ...prev, resume }))}
          />
        );
      case 7:
        return (
          <ProjectsForm
            data={portfolioData.projects}
            onChange={(projects) => setPortfolioData(prev => ({ ...prev, projects }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
      {/* Step Indicator */}
      <div className="flex justify-between mb-8 overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <motion.div
              key={step.id}
              className="flex flex-col items-center min-w-0 flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`relative p-2 md:p-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : isCompleted
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary-500 opacity-30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <div className="text-center mt-2">
                <p className={`text-xs md:text-sm font-medium ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 hidden lg:block">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          disabled={activeStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeStep === 0
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          disabled={activeStep === steps.length - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            activeStep === steps.length - 1
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default FormBuilder;
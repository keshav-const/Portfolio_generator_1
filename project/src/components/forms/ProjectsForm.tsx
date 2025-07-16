import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const projectSchema = yup.object({
  name: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  repo: yup.string().url('Please enter a valid repository URL').required('Repository URL is required'),
  demo: yup.string().url('Please enter a valid demo URL'),
  technologies: yup.array().of(yup.string()).min(1, 'At least one technology is required'),
});

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [projects, setProjects] = useState<Project[]>(data || []);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Omit<Project, 'id'>>({
    resolver: yupResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      repo: '',
      demo: '',
      technologies: [],
    },
  });

  const watchedTechnologies = watch('technologies') || [];

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    onChange(updatedProjects);
    reset({
      name: '',
      description: '',
      repo: '',
      demo: '',
      technologies: [],
    });
    setTechInput('');
  };

  const removeProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    onChange(updatedProjects);
  };

  const addTechnology = () => {
    if (techInput.trim() && !watchedTechnologies.includes(techInput.trim())) {
      const newTechnologies = [...watchedTechnologies, techInput.trim()];
      setValue('technologies', newTechnologies);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechnologies = watchedTechnologies.filter(t => t !== tech);
    setValue('technologies', newTechnologies);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Projects
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Showcase your best work and what technologies you've used.
        </p>
      </div>

      {/* Existing Projects */}
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeProject(project.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Project Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30"
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Project
        </h4>
        
        <form onSubmit={handleSubmit(addProject)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Name *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('name')}
                type="text"
                placeholder="My Awesome Project"
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Repository URL *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                {...register('repo')}
                type="url"
                placeholder="https://github.com/user/project"
                className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.repo
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
                }`}
              />
              {errors.repo && (
                <p className="mt-1 text-sm text-red-500">{errors.repo.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Demo URL (Optional)
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('demo')}
              type="url"
              placeholder="https://myproject.com"
              className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.demo
                  ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500/20 focus:border-primary-500'
              }`}
            />
            {errors.demo && (
              <p className="mt-1 text-sm text-red-500">{errors.demo.message}</p>
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
              placeholder="A brief description of your project and what it does..."
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies Used *
            </label>
            <div className="flex space-x-2 mb-3">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                placeholder="React, TypeScript, Node.js..."
                className="flex-1 px-4 py-3 rounded-xl border backdrop-blur-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 border-gray-300 dark:border-gray-600 transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={addTechnology}
                className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {watchedTechnologies.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-accent-500 hover:text-accent-700 dark:hover:text-accent-200"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            {errors.technologies && (
              <p className="mt-1 text-sm text-red-500">{errors.technologies.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-lg shadow-primary-500/25"
          >
            Add Project
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsForm;
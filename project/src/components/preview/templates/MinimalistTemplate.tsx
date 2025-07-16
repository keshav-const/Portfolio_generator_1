import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, Linkedin, Twitter, Instagram, ExternalLink, Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface MinimalistTemplateProps {
  data: PortfolioData;
}

const skillIcons: { [key: string]: string } = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
  'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Adobe XD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
};

const getSkillIcon = (skillName: string) => {
  return skillIcons[skillName.trim()] || null;
};

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light mb-4"
          >
            {data?.personal?.name || 'Your Name'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {data?.personal?.bio || 'Your professional bio will appear here...'}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-6 mt-8"
          >
            {data?.contact?.email && (
              <a href={`mailto:${data.contact.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            )}
            {data?.contact?.phone && (
              <a href={`tel:${data.contact.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
            )}
            {data?.personal?.github && (
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            )}
            {data?.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {data?.resume && (
              <a href="#" onClick={(e) => { e.preventDefault(); toast.success('Resume download would work in the actual portfolio'); }} className="text-gray-600 hover:text-gray-900 transition-colors">
                <FileText className="w-6 h-6" />
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-light mb-12 text-center"
            >
              Skills & Expertise
            </motion.h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full"
                >
                  {getSkillIcon(skill.name) && (
                    <img 
                      src={getSkillIcon(skill.name)!} 
                      alt={skill.name}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-light mb-12 text-center"
            >
              Work Experience
            </motion.h2>
            
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-gray-300 pl-6 pb-8"
                >
                  <h3 className="text-xl font-medium mb-1">{exp.position}</h3>
                  <p className="text-gray-600 font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    {exp.duration}{exp.location ? ` • ${exp.location}` : ''}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {data?.achievements && data.achievements.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-light mb-12 text-center"
            >
              Achievements
            </motion.h2>
            
            <div className="space-y-8">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-yellow-300 pl-6 pb-8"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-xl font-medium">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-light mb-12 text-center"
          >
            Selected Work
          </motion.h2>
          
          <div className="space-y-12">
            {(data?.projects || []).length > 0 ? (data?.projects || []).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 pb-12 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-medium">{project.name}</h3>
                  <div className="flex space-x-4">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )) : (
              <div className="text-center text-gray-500 py-12">
                <p>Your projects will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalistTemplate;
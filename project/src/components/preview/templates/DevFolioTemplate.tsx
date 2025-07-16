import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, Linkedin, Twitter, ExternalLink, Code, Terminal, Briefcase, Award, Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface DevFolioTemplateProps {
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

const DevFolioTemplate: React.FC<DevFolioTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 text-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-green-500 rounded-lg">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <div className="font-mono text-green-600">
              <span className="text-gray-600">$</span> whoami
            </div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4 font-mono"
          >
            {data?.personal?.name || 'Developer'}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm mb-8 max-w-2xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div>
              <span className="text-blue-400">const</span> <span className="text-yellow-400">developer</span> = {'{'}
            </div>
            <div className="ml-4 text-green-400">
              name: <span className="text-orange-400">"{data?.personal?.name || 'Your Name'}"</span>,
            </div>
            <div className="ml-4 text-green-400">
              bio: <span className="text-orange-400">"{data?.personal?.bio || 'Your bio here...'}"</span>,
            </div>
            <div className="ml-4 text-green-400">
              skills: <span className="text-purple-400">[</span>
              {(data?.skills || []).slice(0, 3).map((skill, i) => (
                <span key={skill.id}>
                  <span className="text-orange-400">"{skill.name}"</span>
                  {i < Math.min(2, (data?.skills || []).length - 1) ? ', ' : ''}
                </span>
              ))}
              <span className="text-purple-400">]</span>
            </div>
            <div>{'}'}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {data?.contact?.email && (
              <a href={`mailto:${data.contact.email}`} className="flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors shadow-md">
                <Mail className="w-4 h-4 text-green-600" />
                <span className="font-medium">Email</span>
              </a>
            )}
            {data?.personal?.github && (
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors shadow-md">
                <Github className="w-4 h-4 text-gray-700" />
                <span className="font-medium">GitHub</span>
              </a>
            )}
            {data?.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors shadow-md">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span className="font-medium">LinkedIn</span>
              </a>
            )}
            {data?.resume && (
              <a href="#" onClick={(e) => { e.preventDefault(); }} className="flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors shadow-md">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="font-medium">Resume</span>
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Award className="w-8 h-8 text-green-600" />
              <h2 className="text-4xl font-bold">Skills</h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    {getSkillIcon(skill.name) && (
                      <img 
                        src={getSkillIcon(skill.name)!} 
                        alt={skill.name}
                        className="w-8 h-8"
                      />
                    )}
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <section className="py-20 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Experience</h2>
            </motion.div>
            
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.position}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {exp.duration}{exp.location ? ` • ${exp.location}` : ''}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {data?.achievements && data.achievements.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Trophy className="w-8 h-8 text-yellow-600" />
              <h2 className="text-4xl font-bold">Achievements</h2>
            </motion.div>
            
            <div className="space-y-6">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-12"
          >
            <Code className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold">Projects</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(data?.projects || []).length > 0 ? (data?.projects || []).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  <div className="flex space-x-2">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                <Code className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Your projects will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevFolioTemplate;
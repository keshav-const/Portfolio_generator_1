import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, Linkedin, Twitter, ExternalLink, Code2, Zap, Award, Briefcase, Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface DarkModeTemplateProps {
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

const DarkModeTemplate: React.FC<DarkModeTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-400 font-mono">// Developer Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">{data?.personal?.name || 'Developer'}</span>
            <span className="text-green-400 animate-pulse">_</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed"
          >
            {data?.personal?.bio || 'Building the future, one line of code at a time...'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {data?.contact?.email && (
              <a 
                href={`mailto:${data.contact.email}`} 
                className="group flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
              >
                <Mail className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </a>
            )}
            {data?.personal?.github && (
              <a 
                href={data.personal.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
              >
                <Github className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            )}
            {data?.social?.linkedin && (
              <a 
                href={data.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            )}
            {data?.resume && (
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); }}
                className="group flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/20"
              >
                <FileText className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                <span>Resume</span>
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <section className="relative z-10 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Award className="w-8 h-8 text-green-400" />
              <h2 className="text-4xl font-bold">Skills</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-xl blur-xl group-hover:from-green-400/20 group-hover:to-blue-400/20 transition-all duration-300" />
                  <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 group-hover:border-gray-600 transition-all duration-300 hover:shadow-2xl">
                    <div className="flex items-center space-x-3">
                      {getSkillIcon(skill.name) && (
                        <img 
                          src={getSkillIcon(skill.name)!} 
                          alt={skill.name}
                          className="w-8 h-8"
                        />
                      )}
                      <span className="text-white font-semibold group-hover:text-green-400 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <section className="relative z-10 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Briefcase className="w-8 h-8 text-blue-400" />
              <h2 className="text-4xl font-bold">Experience</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-400 to-transparent" />
            </motion.div>
            
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl blur-xl group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-300" />
                  <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 group-hover:border-gray-600 transition-all duration-300 hover:shadow-2xl">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {exp.position}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-1">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-4">
                      {exp.duration}{exp.location ? ` • ${exp.location}` : ''}
                    </p>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {data?.achievements && data.achievements.length > 0 && (
        <section className="relative z-10 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-12"
            >
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold">Achievements</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-400 to-transparent" />
            </motion.div>
            
            <div className="space-y-6">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl blur-xl group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-300" />
                  <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 group-hover:border-gray-600 transition-all duration-300 hover:shadow-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-12"
          >
            <Code2 className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl font-bold">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {(data?.projects || []).length > 0 ? (data?.projects || []).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-xl blur-xl group-hover:from-green-400/20 group-hover:to-blue-400/20 transition-all duration-300" />
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 group-hover:border-gray-600 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex space-x-2">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          techIndex % 3 === 0
                            ? 'bg-green-400/10 border-green-400/20 text-green-400'
                            : techIndex % 3 === 1
                            ? 'bg-blue-400/10 border-blue-400/20 text-blue-400'
                            : 'bg-purple-400/10 border-purple-400/20 text-purple-400'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center text-gray-500 py-16">
                <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-xl">Your projects will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DarkModeTemplate;
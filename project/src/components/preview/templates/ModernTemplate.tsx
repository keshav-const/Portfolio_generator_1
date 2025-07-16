import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, Linkedin, Twitter, ExternalLink, Sparkles, ArrowRight, Award, Briefcase, Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface ModernTemplateProps {
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

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 text-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-md bg-white/70 rounded-3xl p-12 shadow-2xl border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-cyan-600 font-semibold">Modern Professional</span>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              {data?.personal?.name || 'Professional'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mb-8 leading-relaxed"
            >
              {data?.personal?.bio || 'Crafting exceptional digital experiences with modern technology...'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {data?.contact?.email && (
                <a href={`mailto:${data.contact.email}`} className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Let's Connect</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              {data?.personal?.github && (
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 px-6 py-3 backdrop-blur-md bg-white/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/30">
                  <Github className="w-4 h-4 text-gray-700" />
                  <span className="font-medium text-gray-700">GitHub</span>
                </a>
              )}
              {data?.social?.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 px-6 py-3 backdrop-blur-md bg-white/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/30">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-700">LinkedIn</span>
                </a>
              )}
            </motion.div>
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
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-cyan-600" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Skills & Expertise
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Technologies and tools I work with
              </p>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-500" />
                  <div className="relative backdrop-blur-md bg-white/70 rounded-2xl p-6 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center space-x-4">
                      {getSkillIcon(skill.name) && (
                        <img 
                          src={getSkillIcon(skill.name)!} 
                          alt={skill.name}
                          className="w-10 h-10"
                        />
                      )}
                      <span className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
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
        <section className="py-20 bg-white/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Professional Journey
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                My career path and achievements
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-xl group-hover:from-blue-400/30 group-hover:to-indigo-400/30 transition-all duration-500" />
                  <div className="relative backdrop-blur-md bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg mb-1">{exp.company}</p>
                    <p className="text-gray-600 mb-4">
                      {exp.duration}{exp.location ? ` • ${exp.location}` : ''}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {data?.achievements && data.achievements.length > 0 && (
        <section className="py-20 bg-white/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Achievements
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Recognition and accomplishments
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl group-hover:from-yellow-400/30 group-hover:to-orange-400/30 transition-all duration-500" />
                  <div className="relative backdrop-blur-md bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center space-x-3 mb-4">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                  </div>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore my latest work and creative solutions
            </p>
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
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-500" />
                <div className="relative backdrop-blur-md bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-200 hover:scale-110 shadow-md"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110 shadow-md"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-4 py-2 text-sm font-medium rounded-xl shadow-sm ${
                          techIndex % 3 === 0
                            ? 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-700'
                            : techIndex % 3 === 1
                            ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                            : 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700'
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
                <div className="backdrop-blur-md bg-white/50 rounded-2xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-xl">Your amazing projects will be showcased here...</p>
                </div>
              </div>
            )}
            {data?.resume && (
              <a href="#" onClick={(e) => { e.preventDefault(); }} className="group flex items-center space-x-2 px-6 py-3 backdrop-blur-md bg-white/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/30">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="font-medium text-gray-700">Resume</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernTemplate;
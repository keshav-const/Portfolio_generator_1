import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, Linkedin, Twitter, Instagram, ExternalLink, Palette, Sparkles, Award, Briefcase, Trophy, FileText } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface CreativeTemplateProps {
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

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 text-gray-900 overflow-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 mb-8 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20"
          >
            <Palette className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-medium">Creative Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
          >
            {data?.personal?.name || 'Creative'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {data?.personal?.bio || 'A creative professional bringing ideas to life...'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center flex-wrap gap-4"
          >
            {data?.contact?.email && (
              <a href={`mailto:${data.contact.email}`} className="group flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <Mail className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Get in Touch</span>
              </a>
            )}
            {data?.personal?.github && (
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <Github className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Code</span>
              </a>
            )}
            {data?.social?.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <Linkedin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Connect</span>
              </a>
            )}
            {data?.resume && (
              <a href="#" onClick={(e) => { e.preventDefault(); }} className="group flex items-center space-x-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <FileText className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Resume</span>
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <section className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-16"
            >
              <Award className="w-8 h-8 text-purple-600" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center space-x-4">
                      {getSkillIcon(skill.name) && (
                        <img 
                          src={getSkillIcon(skill.name)!} 
                          alt={skill.name}
                          className="w-10 h-10"
                        />
                      )}
                      <span className="text-xl font-bold text-gray-900">{skill.name}</span>
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
        <section className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-16"
            >
              <Briefcase className="w-8 h-8 text-pink-600" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Experience
              </h2>
            </motion.div>
            
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-orange-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.position}</h3>
                    <p className="text-pink-600 font-semibold text-lg mb-1">{exp.company}</p>
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
        <section className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-16"
            >
              <Trophy className="w-8 h-8 text-yellow-600" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Achievements
              </h2>
            </motion.div>
            
            <div className="space-y-8">
              {data.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-2xl font-bold text-gray-900">{achievement.title}</h3>
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
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4 mb-16"
          >
            <Sparkles className="w-8 h-8 text-pink-600" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Work
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(data?.projects || []).length > 0 ? (data?.projects || []).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
                    <div className="flex space-x-3">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-100 rounded-lg transition-all duration-200 hover:scale-110"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          techIndex % 3 === 0
                            ? 'bg-purple-100 text-purple-700'
                            : techIndex % 3 === 1
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-orange-100 text-orange-700'
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
                <Sparkles className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                <p className="text-xl">Your creative projects will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeTemplate;
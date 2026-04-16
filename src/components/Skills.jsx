import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ icon, name, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white/10 p-6 rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-white/20 hover:-translate-y-2 border border-white/5 shadow-xl group"
  >
    <i className={`${icon} text-4xl text-orange mb-3 group-hover:scale-110 transition-transform`}></i>
    <p className="text-white font-medium text-center">{name}</p>
  </motion.div>
);

const Skills = () => {
  const frontendSkills = [
    { name: 'HTML5', icon: 'fab fa-html5' },
    { name: 'CSS3', icon: 'fab fa-css3-alt' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
    { name: 'Javascript', icon: 'fab fa-js' },
  ];

  const backendSkills = [
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'C#', icon: 'devicon-csharp-plain' },
    { name: 'Express.js', icon: 'devicon-express-original' },
    { name: 'MySQL', icon: 'devicon-mysql-plain-wordmark' },
    { name: 'ASP.NET MVC', icon: 'devicon-dot-net-plain' },
    { name: 'ASP.NET Web API', icon: 'fas fa-server' },
    { name: 'EF Core', icon: 'devicon-dotnetcore-plain' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-[#003F8F] to-[#005FD8] rounded-[2rem] mx-4 shadow-2xl relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-orange mx-auto rounded-full mb-8"></div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-orange mb-8 text-center uppercase tracking-widest">Frontend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {frontendSkills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-orange mb-8 text-center uppercase tracking-widest">Backend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {backendSkills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

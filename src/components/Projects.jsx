import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, tags, link, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.15 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full group"
  >
    <h3 className="text-2xl font-bold text-primary-blue mb-4 group-hover:text-orange transition-colors">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{description}</p>
    
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <span key={tag} className="bg-blue-50 text-secondary-blue px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {tag}
        </span>
      ))}
    </div>
    
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn-orange text-center w-full transform group-hover:scale-105 transition-transform"
    >
      View Project
    </a>
  </motion.div>
);

const Projects = () => {
  const projectList = [
    {
      title: 'Skill-Matrix',
      description: 'The Skill Matrix platform is a comprehensive web application designed to facilitate professional development and skill management. It serves as a tool for individuals and organizations to track, develop, and showcase a wide range of abilities with precision.',
      tags: ['ASP.NET MVC', 'EF Core', 'Bootstrap', 'JavaScript', 'PostgreSQL'],
      link: 'https://skill-qtxf.onrender.com'
    },
    {
      title: 'Hospital Management System (HMS) API',
      description: 'A back-end Hospital Management System (HMS) API, built with ASP.NET Core and C#. Designed to serve as the core data and business logic layer for administrative and operational needs. Robust, secure, and built with modern principles.',
      tags: ['Web API', 'MySQL', 'C#', '.NET Core'],
      link: 'https://github.com/Oriolowo-Mustapha/HospitalManagementSystem'
    },
    {
      title: 'Space-Invaders',
      description: 'A recreation of the classic arcade game, Space Invaders, developed using Python and the Pygame library. Features sprite management, event handling, collision detection, and score tracking.',
      tags: ['Python', 'Pygame'],
      link: 'https://github.com/Oriolowo-Mustapha/SPACE-INVADERS'
    },
    {
      title: 'Decentralized Lost & Found Matching Agent',
      description: 'An intelligent service leveraging Google Gemini AI and FEVM blockchain to automatically match lost and found items. Records verified matches permanently on-chain.',
      tags: ['JavaScript', 'HTML&CSS', 'FEVM', 'Gemini AI'],
      link: 'https://github.com/Oriolowo-Mustapha/Dl-F'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-blue mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projectList.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

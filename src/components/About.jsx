import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary-blue mb-4 relative inline-block"
          >
            About Me
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-secondary-blue to-orange rounded-full"></div>
          </motion.h2>
          <p className="text-lg text-gray-600 mt-6 font-light">Passionate Developer & Computer Science Student</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-secondary-blue/10 backdrop-blur-sm"
          >
            <p className="text-lg leading-relaxed text-gray-700">
              Hello! I'm <span className="highlight">Mustapha</span>, a passionate full-stack developer with <span className="highlight">three years of hands-on experience</span> in building modern, responsive web applications. I'm currently in my second year of Computer Science at the Federal University of Agriculture, Abeokuta (FUNAAB), where I'm deepening my understanding of core principles and algorithms.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-gradient-to-br from-secondary-blue to-primary-blue rounded-2xl text-white shadow-lg transition-transform hover:-translate-y-1">
                <span className="block text-3xl font-bold">3+</span>
                <span className="text-sm opacity-90">Years Experience</span>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-secondary-blue to-primary-blue rounded-2xl text-white shadow-lg transition-transform hover:-translate-y-1">
                <span className="block text-3xl font-bold">10+</span>
                <span className="text-sm opacity-90">Projects Completed</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-secondary-blue/10"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Computer Science Student</h3>
            <p className="text-primary-blue font-medium mb-4">Federal University of Agriculture, Abeokuta (FUNAAB)</p>
            <p className="text-gray-500 text-sm">2nd Year • 2024 - Present</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

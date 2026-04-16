import React from 'react';
import { ReactTyped } from "react-typed";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-white"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I'm 
        </h1>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-orange">Oriolowo Mustapha</span> 👋
        </h1>
        
        <p className="text-xl md:text-2xl font-light mb-8">
          <span className="text-orange font-semibold">
            <ReactTyped
              strings={['Fullstack Developer', 'Software Engineer', 'Problem Solver']}
              typeSpeed={50}
              backSpeed={50}
              loop
            />
          </span>
        </p>

        <a href="#projects" className="btn-orange text-lg">
          View My Work
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;

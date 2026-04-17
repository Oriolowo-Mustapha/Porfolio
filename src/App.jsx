import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactTyped } from 'react-typed'

const BentoCard = ({ children, className = "", delay = 0, id = "", onClick }) => (
  <motion.div
    id={id}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`bento-card ${className} ${onClick ? 'cursor-pointer' : ''}`}
  >
    {children}
  </motion.div>
)

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 shadow-2xl relative"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10">
            <i className="fas fa-times text-xl"></i>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-2">
              <span className="text-orange font-bold text-[10px] uppercase tracking-[0.2em]">Project Deep Dive</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-6">{project.title}</h2>
              
              <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
                <p>{project.longDescription || project.description}</p>
                
                {project.modules && (
                  <div className="space-y-4 pt-4">
                    <h4 className="text-white font-bold uppercase text-xs tracking-widest border-l-2 border-orange pl-3">Core Capabilities</h4>
                    {project.modules.map(m => (
                      <div key={m.title} className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800">
                        <h5 className="text-orange font-bold text-xs mb-2">{m.title}</h5>
                        <p className="text-[11px] opacity-80">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-orange/10">
                <h4 className="text-white font-bold text-sm mb-4">Links</h4>
                <div className="flex flex-col gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-orange text-white px-4 py-3 rounded-xl text-xs font-bold text-center hover:bg-orange/90 transition-all flex items-center justify-center gap-2">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                  {project.backendLink && (
                    <a href={project.backendLink} target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white border border-slate-700 px-4 py-3 rounded-xl text-xs font-bold text-center hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                      <i className="fab fa-github"></i> Backend
                    </a>
                  )}
                  {project.frontendLink && (
                    <a href={project.frontendLink} target="_blank" rel="noopener noreferrer" className="bg-slate-800 text-white border border-slate-700 px-4 py-3 rounded-xl text-xs font-bold text-center hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                      <i className="fab fa-github"></i> Frontend
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-slate-800/30 p-6 rounded-3xl border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-4">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(s => (
                    <span key={s} className="px-2 py-1 bg-slate-900 text-slate-500 rounded text-[9px] font-bold border border-slate-800 uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function App() {
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: 'AgroGuardian AI',
      category: 'AI · AGRICULTURE',
      description: 'Sophisticated AI-powered analytics engine for climate-smart agriculture and regenerative farming. Built with a TypeScript Node.js backend and a React/Vite frontend, it delivers AI-driven insights, weather risk analytics, and carbon-credit tracking to help farmers reduce risk and optimize decisions.',
      longDescription: 'AgroGuardian AI is an end-to-end solution for modern agriculture. The TypeScript backend orchestrates a multi-model AI engine (GPT + Gemini) with self-healing fallbacks and Zod-validated structured outputs. The React frontend provides a seamless 7-day weather risk analysis experience, featuring manual sync triggers, success/error notifications, and context-aware risk badges for drought, flood, and pests based on soil and irrigation data.',
      stack: ['TypeScript', 'Node.js', 'React', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Gemini AI', 'OpenAI', 'Prisma', 'React Query', 'Zustand', 'Zod', 'Cloudinary', 'JWT', 'Vite', 'Tailwind CSS'],
      link: 'https://agroguardian-frontend.vercel.app',
      backendLink: 'https://github.com/Adeyemiadigun/AgroGuardian_AI',
      frontendLink: 'https://github.com/Oriolowo-Mustapha/Agroguardian---Frontend',
      image: '/agroguardian.png',
      modules: [
        { title: 'Carbon Credit & AI Verification', desc: 'Calculates tons CO2e using dynamic formulas (Area × CarbonFactor × CropMultiplier). Uses AI vision verification to validate sustainable practice evidence photos.' },
        { title: 'Enhanced Climate Risk System', desc: 'Produces context-aware risk assessments for Drought, Flood, and Heat. Generates "precision windows" for planting, harvesting, and spraying based on rain/wind constraints.' },
        { title: 'AI-Vet & Livestock Health', desc: 'Vision-based diagnosis for cattle and poultry, providing species-specific biosecurity guidance, vaccination schedules, and automated breeding tracking.' },
        { title: 'Multi-model AI & Resilience', desc: 'Integrates multiple LLMs with self-healing fallbacks and JSON repair. Computes a 0–100 Resilience Score representing farm adaptation and diversity.' }
      ]
    },
    {
      title: 'VeriLens',
      category: 'AI · VERIFICATION',
      description: 'VeriLens is an AI-powered fake news detection and verification platform that helps users evaluate news content (text and optionally images) and classify it as Fake, Real, or Suspicious. It is built as a TypeScript Node.js/Express + MongoDB backend, paired with a lightweight web frontend (static HTML/Tailwind/vanilla JS).',
      longDescription: 'VeriLens focuses on "trustworthy information" by providing AI-driven news verification, image claim analysis, and credibility scoring (0–100) to indicate certainty. The platform offers a real-time verification flow, user accounts with analysis history, and a dedicated admin interface for user management and role promotion.',
      stack: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'Gemini AI', 'HTML', 'Tailwind CSS', 'Vanilla JavaScript'],
      link: 'https://verilens-frontend.pxxl.click',
      backendLink: 'https://github.com/Oriolowo-Mustapha/VeriLens',
      frontendLink: 'https://github.com/Oriolowo-Mustapha/VeriLens-Frontend',
      image: '/verilens.png',
      modules: [
        { title: 'AI News & Image Verification', desc: 'Analyzes news text and optional image uploads to provide a verdict (FAKE | REAL | SUSPICIOUS) with detailed reasoning.' },
        { title: 'Credibility Scoring', desc: 'Returns a confidence score from 0–100 based on AI analysis to help users gauge information certainty.' },
        { title: 'User Accounts & History', desc: 'Secure authentication system allowing users to track and review their past analysis records.' },
        { title: 'Admin Management', desc: 'Centralized dashboard for administrators to oversee platform users and manage account permissions.' }
      ]
    },
    {
      title: 'Gatepass System',
      category: 'SECURITY · ACCESS',
      description: 'A secure, role-based Gatepass Management REST API and frontend built with .NET 10 and Clean Architecture. It manages controlled organization access via unique QR codes, visitor tracking, and automated security workflows.',
      longDescription: 'Gatepass System is an enterprise-grade solution for managing organizational security and visitor movement. It features a modern, responsive UI built with Tailwind CSS and a robust .NET 10 backend. The system supports multi-role access (Administrator, Host, Security), real-time QR code verification via device cameras, and comprehensive reporting on visitor logs and overstay alerts.',
      stack: ['.NET 10', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'MediatR', 'CQRS', 'FluentValidation', 'Tailwind CSS', 'Vanilla JavaScript', 'QR Scanner'],
      link: 'https://gatepass-code-generator-system-fron.vercel.app',
      backendLink: 'https://github.com/Oriolowo-Mustapha/Gatepass-Code-Generator-System',
      frontendLink: 'https://github.com/Oriolowo-Mustapha/Gatepass-Code-Generator-System-Frontend',
      image: '/gatepass.png',
      modules: [
        { title: 'QR Code Generation & Scanning', desc: 'Automated QR code generation for approved requests with built-in camera scanning for instant security verification.' },
        { title: 'Visitor Tracking & Logs', desc: 'Real-time monitoring of visitor check-in/check-out status with automated movement tracking and daily log reporting.' },
        { title: 'Role-Based Security', desc: 'Granular access control for Admins, Hosts, and Security personnel, featuring JWT-based authentication and secure password recovery.' },
        { title: 'Clean Architecture', desc: 'Built with MediatR (CQRS) and Clean Architecture principles to ensure scalability, testability, and maintainable code structure.' }
      ]
    },
    {
      title: 'Skill-Matrix 2.0',
      category: 'EDTECH · AI',
      description: 'Skill-Matrix-2.0 is a robust C#/.NET backend Web API (currently in development, frontend pending) for an AI-powered skill assessment platform. It enables dynamic proficiency evaluation and personalized growth planning.',
      longDescription: 'Currently focused on the backend infrastructure, Skill-Matrix-2.0 leverages Clean (Onion) Architecture and AI to generate contextual assessments. It analyzes user performance to identify skill gaps and provides targeted learning recommendations. The system is designed for multi-role team management, with the frontend planned for a future phase.',
      stack: ['C#', '.NET', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'Clean Architecture', 'MassTransit', 'JWT', 'BCrypt.Net', 'AI Integration'],
      backendLink: 'https://github.com/Oriolowo-Mustapha/Skill-Matrix-2.0',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      modules: [
        { title: 'AI Assessment Engine (Backend)', desc: 'Core logic for dynamically generating test questions based on selected skills and proficiency levels.' },
        { title: 'Performance Analytics', desc: 'Backend processing of assessment results to identify weaknesses and track score trends over time.' },
        { title: 'Personalized Growth Logic', desc: 'Algorithmic generation of focus areas and targeted learning resource recommendations based on user gaps.' },
        { title: 'Multi-Role Auth & Management', desc: 'Secure backend implementation for Learner, Manager, and Admin roles with team oversight capabilities.' }
      ]
    },
    {
      title: 'Resumeefy Jobs Backend',
      category: 'JOBS · BACKEND',
      description: 'A scalable Node.js (Express) REST API for a job board platform, featuring JWT auth, role-based access, background processing with BullMQ, and Google OAuth.',
      longDescription: 'Built with clean architecture, this backend supports Admin, Employer, and Job Seeker workflows. It includes production-grade features like refresh token rotation, email verification, Swagger documentation, and robust security protections. Background tasks for emails and maintenance are handled asynchronously using BullMQ and Redis.',
      stack: ['Node.js', 'Express', 'MongoDB', 'BullMQ', 'Redis', 'JWT', 'Google OAuth', 'Swagger', 'Cloudinary'],
      link: 'https://resumeefy-jobs-backend-js.onrender.com/',
      backendLink: 'https://github.com/Resumeefy-Jobs/resumeefy-jobs-backend-js-',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
      modules: [
        { title: 'Multi-Role Marketplace', desc: 'Comprehensive workflows for Admins, Employers, and Job Seekers with dedicated dashboard logic.' },
        { title: 'Advanced Auth & RBAC', desc: 'Secure JWT implementation with refresh token rotation, Google OAuth, and granular role permissions.' },
        { title: 'Background Processing', desc: 'Reliable async task management using BullMQ and Redis for system notifications and maintenance.' },
        { title: 'Security & Documentation', desc: 'Hardened API with automated security middleware and full Swagger/OpenAPI documentation.' }
      ]
    },
    {
      title: 'FEVM Lost & Found Engine',
      category: 'BLOCKCHAIN · AI',
      description: 'A decentralized lost-and-found matching engine for the Filecoin EVM (FEVM). It uses Gemini AI for semantic and visual matching of items reported on-chain.',
      longDescription: 'This automated agent monitors FEVM smart contracts for LOST and FOUND reports, fetching images from IPFS to perform high-confidence (95%+) multi-modal analysis using Google Gemini. Confirmed matches are recorded back on-chain via signed transactions, creating a tamper-resistant, automated recovery system.',
      stack: ['Node.js', 'FEVM', 'Solidity', 'Gemini AI', 'Ethers.js', 'IPFS', 'Pinata', 'Express'],
      backendLink: 'https://github.com/Oriolowo-Mustapha/Dl-F',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      modules: [
        { title: 'AI Matching Agent', desc: 'Multi-modal engine using Gemini to perform semantic and visual analysis for high-confidence matching.' },
        { title: 'On-Chain Automation', desc: 'Watches FEVM smart contracts for events and automatically records verified matches back to the blockchain.' },
        { title: 'IPFS Integration', desc: 'Securely pins item images to IPFS via Pinata for decentralized storage and AI vision retrieval.' },
        { title: 'Smart Contract Layer', desc: 'Solidity-based registry on Filecoin EVM that handles tamper-resistant storage of reported items.' }
      ]
    }
  ];

  const handleOpenModal = (p) => {
    setSelectedProject(p);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Navigation */}
      <header className={`fixed top-0 left-0 w-full z-[100] p-6 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-slate-950/80 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-great-vibes text-3xl text-orange cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Apha</h1>
          <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#work" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex gap-4">
             <a href="/resume.pdf" download className="hidden sm:block px-6 py-2 border border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">Résumé</a>
             <a href="https://wa.me/2347031602720" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">Let's Talk</a>
          </div>
        </div>
      </header>

      <main className="pt-48 px-4 md:px-8 max-w-7xl mx-auto space-y-32 text-left">
        
        {/* Bento Dashboard Section */}
        <section id="home" className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          
          {/* Hero Card */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-center p-10 bg-slate-900/40 min-h-[450px]">
            <h1 className="text-white font-bold mb-4 tracking-tight text-5xl md:text-7xl uppercase">
              Hi, I'm <br />
              <span className="text-orange">Mustapha</span>
            </h1>
            <h2 className="text-lg md:text-xl font-bold mb-8 leading-tight text-slate-400 uppercase tracking-[0.2em]">
              Engineering Scalable Solutions <br />
              <span className="text-slate-600 font-medium">From Concept to Deployment</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light mb-8 leading-relaxed max-w-lg italic border-l border-orange/30 pl-4">
              I’m a <span className="text-white font-medium">Software Engineer</span> specializing in high-performance backends with <span className="text-orange">C#/.NET</span>, <span className="text-white">TypeScript</span>, and <span className="text-orange">Node.js</span>. Currently building the future of Agritech and seamless hiring platforms.
            </p>
            <div className="flex gap-4">
               <a href="#work" className="px-8 py-3 bg-orange text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg shadow-orange/20">Explore Work</a>
               <a href="/resume.pdf" download className="px-8 py-3 bg-slate-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-all">Resume</a>
            </div>
          </BentoCard>

          {/* About Card (Summary) */}
          <BentoCard className="md:col-span-2 md:row-span-1 p-8 bg-slate-900/20 border-orange/5">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Professional Summary</h3>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              Backend-focused <span className="text-white font-semibold">Software Engineer</span> with strong full-stack experience, building secure, scalable web applications and REST APIs with <span className="text-white">TypeScript/Node.js</span> and <span className="text-white">C# / ASP.NET Core</span>. Specialized in clean architectures and AI/LLM integrations.
            </p>
          </BentoCard>

          {/* Stack Card - Detailed Categorical View */}
          <BentoCard className="md:col-span-2 md:row-span-2 p-8">
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Technical Stack</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Languages */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-orange mb-3 font-bold opacity-70">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: 'TypeScript', i: 'devicon-typescript-plain' },
                    { n: 'C#', i: 'devicon-csharp-plain' },
                    { n: 'Python', i: 'fab fa-python' },
                    { n: 'SQL', i: 'fas fa-database' },
                    { n: 'JS', i: 'fab fa-js' }
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/40 rounded text-[9px] text-slate-300 border border-slate-700/50">
                      <i className={`${s.i} text-[10px] text-orange/70`}></i>{s.n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-blue-400 mb-3 font-bold opacity-70">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: 'React', i: 'fab fa-react' },
                    { n: 'Tailwind', i: 'devicon-tailwindcss-original' },
                    { n: 'Vite', i: 'devicon-vitejs-plain' },
                    { n: 'Query', i: 'fas fa-sync-alt' },
                    { n: 'Zustand', i: 'fas fa-box' }
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/5 rounded text-[9px] text-blue-300 border border-blue-500/10">
                      <i className={`${s.i} text-[10px] text-blue-400`}></i>{s.n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-green-400 mb-3 font-bold opacity-70">Backend</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: 'Node.js', i: 'fab fa-node-js' },
                    { n: 'ASP.NET', i: 'devicon-dotnetcore-plain' },
                    { n: 'Express', i: 'devicon-express-original' },
                    { n: 'EF Core', i: 'fas fa-network-wired' }
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-1.5 px-2 py-1 bg-green-500/5 rounded text-[9px] text-green-300 border border-green-500/10">
                      <i className={`${s.i} text-[10px] text-green-400`}></i>{s.n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-purple-400 mb-3 font-bold opacity-70">Databases</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: 'PostgreSQL', i: 'devicon-postgresql-plain' },
                    { n: 'MongoDB', i: 'devicon-mongodb-plain' },
                    { n: 'MySQL', i: 'devicon-mysql-plain' }
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/5 rounded text-[9px] text-purple-300 border border-purple-500/10">
                      <i className={`${s.i} text-[10px] text-purple-400`}></i>{s.n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center bg-orange/5 border-orange/10">
             <span className="text-3xl font-bold text-orange">3+</span>
             <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Years Exp</span>
          </BentoCard>

          {/* Status Card */}
          <BentoCard className="md:col-span-1 md:row-span-1 flex items-center justify-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
             <span className="text-[9px] text-white font-bold uppercase tracking-widest">Available</span>
          </BentoCard>

        </section>

        {/* Featured Projects Section */}
        <section id="work" className="py-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">Featured Projects</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Flagship builds spanning AI surveillance, security infrastructure, and organizational tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((p, index) => (
              <motion.div 
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-slate-900/40 rounded-[2rem] border border-slate-800 overflow-hidden hover:border-orange/30 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <span className="absolute top-6 left-6 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[9px] font-bold text-white border border-white/10 tracking-widest uppercase">{p.category}</span>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange transition-colors">{p.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6 line-clamp-3">{p.description}</p>
                  
                  {/* Tech Stack Tags on Main Cards */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.stack.slice(0, 5).map(s => (
                      <span key={s} className="text-[7px] px-2 py-0.5 bg-slate-800 text-slate-500 rounded font-bold border border-slate-700/50 uppercase tracking-tighter">{s}</span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    {p.link ? (
                      <a href={p.link} target="_blank" className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group/link">
                        Visit Site <i className="fas fa-arrow-right text-[8px] group-hover/link:translate-x-1 transition-transform"></i>
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Backend Only</span>
                    )}
                    <button onClick={() => handleOpenModal(p)} className="px-4 py-2 border border-slate-700 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">Detail</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
             <button onClick={() => setShowAll(true)} className="px-10 py-4 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">View All Works</button>
          </motion.div>
        </section>

        {/* Dedicated Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
               <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">Experience</h2>
               <div className="h-[1px] bg-slate-800 flex-grow"></div>
            </motion.div>
            <div className="space-y-12">
              {/* Resumeefy */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-10 border-l-2 border-slate-800"
              >
                <div className="absolute w-4 h-4 bg-orange rounded-full -left-[9px] top-1 shadow-[0_0_15px_rgba(245,158,11,0.4)]"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">Back End Developer</h4>
                    <p className="text-orange font-medium text-sm">Resumeefy • Contract • Remote</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-800 mt-2 md:mt-0">Dec 2025 — Present</span>
                </div>
                <ul className="text-[13px] text-slate-400 space-y-3 leading-relaxed list-disc ml-4 italic">
                  <li>Designed and built the Resumeefy Jobs Backend, managing the full lifecycle from the initial C# implementation to the current Node.js architecture.</li>
                  <li>Utilized Express and Prisma to optimize API performance and database management.</li>
                  <li>Implemented BullMQ for reliable message queuing in a fast-paced startup environment.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['JavaScript', 'Express.js', 'C#', 'ASP.NET Web API', 'GitHub', 'Git'].map(s => (
                    <span key={s} className="text-[9px] px-2.5 py-1 bg-slate-900 text-slate-500 rounded-md border border-slate-800 font-bold uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </motion.div>

              {/* HNG Tech */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-10 border-l-2 border-slate-800"
              >
                <div className="absolute w-4 h-4 bg-slate-700 rounded-full -left-[9px] top-1"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">Back End Developer</h4>
                    <p className="text-slate-400 font-medium text-sm">HNG Tech • Internship • Remote</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-800 mt-2 md:mt-0">Oct 2025 — Dec 2025</span>
                </div>
                <ul className="text-[13px] text-slate-400 space-y-3 leading-relaxed list-disc ml-4 italic">
                  <li>Designed, developed, and implemented RESTful API endpoints for core application services using C#/Node.js, specifically focusing on all CRUD operations.</li>
                  <li>Seamlessly integrated API logic with the underlying PostgreSQL or MongoDB database by utilizing the ORM and writing optimized queries.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['ASP.NET MVC', 'ASP.NET Web API', 'C#', 'Express.js', 'JavaScript'].map(s => (
                    <span key={s} className="text-[9px] px-2.5 py-1 bg-slate-900 text-slate-600 rounded-md border border-slate-800 font-bold uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
               <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">About Me</h2>
               <div className="h-[1px] bg-slate-800 flex-grow"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-slate-400 leading-relaxed text-sm">
                  Hello! I'm <span className="text-white font-semibold">Mustapha</span>, a <span className="text-white font-semibold">Software Engineer</span> dedicated to architecting robust, scalable systems that solve real-world challenges.
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  With three years of industry experience, I specialize in building high-performance backends using <span className="text-white">C#/.NET</span>, <span className="text-white">Node.js</span>, and <span className="text-white">TypeScript</span>. My approach is rooted in <span className="text-orange">Clean Architecture</span> and <span className="text-orange">CQRS</span>, ensuring that the systems I build aren't just functional, but maintainable and future-proof.
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  I am currently pursuing my degree in <span className="text-white font-semibold">Computer Science</span> at the <span className="text-orange">Federal University of Agriculture, Abeokuta (FUNAAB)</span>, a path that provides the theoretical depth to match my practical, hands-on expertise. I am particularly passionate about the intersection of software and <span className="text-white">AI integration</span>, constantly seeking ways to leverage emerging tech to optimize complex workflows.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800 hover:border-orange/20 transition-colors flex flex-col justify-center"
              >
                <div className="mb-8 text-center">
                  <h3 className="text-[10px] font-bold text-white mb-2 uppercase tracking-[0.2em]">Get In Touch</h3>
                  <p className="text-[11px] text-slate-500 italic">"Whether it's about a project, a tech stack deep-dive, or just to say hi—my digital door is always open."</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <a href="https://github.com/Oriolowo-Mustapha" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-orange/50 transition-all group">
                    <div className="flex items-center gap-3">
                      <i className="fab fa-github text-white text-lg"></i>
                      <span className="text-white text-xs font-bold uppercase tracking-widest">GitHub</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-500 text-[10px] group-hover:text-orange"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/oriolowo-mustapha-29b769394/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-orange/50 transition-all group">
                    <div className="flex items-center gap-3">
                      <i className="fab fa-linkedin text-white text-lg"></i>
                      <span className="text-white text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-500 text-[10px] group-hover:text-orange"></i>
                  </a>
                  <a href="https://x.com/Apha_Base" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-orange/50 transition-all group">
                    <div className="flex items-center gap-3">
                      <i className="fab fa-x-twitter text-white text-lg"></i>
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Twitter / X</span>
                    </div>
                    <i className="fas fa-external-link-alt text-slate-500 text-[10px] group-hover:text-orange"></i>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Social Connect Card */}
            <BentoCard className="md:col-span-1 p-8 bg-slate-900/40 border-slate-800">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Connect</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed mb-8">
                Ready to start a project? Or just want to say hi? Reach out through any of these platforms.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="https://wa.me/2347031602720" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-orange/50 transition-all group">
                  <i className="fab fa-whatsapp text-xl text-green-500 mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">WhatsApp</span>
                </a>
                <a href="https://www.linkedin.com/in/oriolowo-mustapha-29b769394/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-orange/50 transition-all group">
                  <i className="fab fa-linkedin-in text-xl text-blue-500 mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">LinkedIn</span>
                </a>
                <a href="https://x.com/Apha_Base" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-orange/50 transition-all group">
                  <i className="fab fa-x-twitter text-xl text-white mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">Twitter</span>
                </a>
                <a href="mailto:oriolowomustapha@gmail.com" className="flex flex-col items-center justify-center p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-orange/50 transition-all group">
                  <i className="fas fa-envelope text-xl text-orange mb-2 group-hover:scale-110 transition-transform"></i>
                  <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-white">Email</span>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-[10px] text-orange"></i>
                  </div>
                  <span className="text-[11px] text-slate-400">Nigeria, Remote</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <i className="fas fa-clock text-[10px] text-orange"></i>
                  </div>
                  <span className="text-[11px] text-slate-400">Available: Mon — Fri</span>
                </div>
              </div>
            </BentoCard>

            {/* Form Card */}
            <BentoCard className="md:col-span-2 p-10 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
              <div className="text-left mb-8">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-[0.2em] text-orange">Drop a Message</h3>
                <h2 className="text-3xl font-bold text-white">Let's build something exceptional together.</h2>
              </div>

              <form action="https://formspree.io/f/mldpwrky" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:border-orange transition-all"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    required 
                    className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:border-orange transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Project Description</label>
                  <textarea 
                    name="project_description" 
                    placeholder="Briefly describe your project goals and timeline..." 
                    rows="4" 
                    required 
                    className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:border-orange transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-4 bg-orange text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange/90 transition-all shadow-lg shadow-orange/20">
                    Send Message <i className="fas fa-paper-plane ml-2"></i>
                  </button>
                </div>
              </form>
            </BentoCard>

          </div>
        </section>

      </main>

      {/* Fullscreen My Works */}
      <AnimatePresence>
        {showAll && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-[200] bg-slate-950 overflow-y-auto p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-start mb-20 text-left">
                <div>
                  <h2 className="text-6xl font-bold text-white mb-4">My Works</h2>
                  <p className="text-slate-400 italic">Architecting scalable ecosystems through AI-driven intelligence and high-performance infrastructure.</p>
                </div>
                <button onClick={() => setShowAll(false)} className="p-4 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"><i className="fas fa-times text-2xl"></i></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {projects.map((p) => (
                  <div key={p.title} className="group flex flex-col bg-slate-900/40 rounded-[2rem] border border-slate-800 overflow-hidden hover:border-orange/30 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <span className="absolute top-6 left-6 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[9px] font-bold text-white border border-white/10 tracking-widest uppercase">{p.category}</span>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange transition-colors">{p.title}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-6 line-clamp-3">{p.description}</p>
                      
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.stack.slice(0, 5).map(s => (
                          <span key={s} className="text-[7px] px-2 py-0.5 bg-slate-800 text-slate-500 rounded font-bold border border-slate-700/50 uppercase tracking-tighter">{s}</span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        {p.link ? (
                          <a href={p.link} target="_blank" className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group/link">
                            Visit Site <i className="fas fa-arrow-right text-[8px] group-hover/link:translate-x-1 transition-transform"></i>
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Backend Only</span>
                        )}
                        <button onClick={() => handleOpenModal(p)} className="px-4 py-2 border border-slate-700 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">Detail</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 text-center border-t border-slate-900">
        <p className="text-slate-600 text-[10px] tracking-widest uppercase font-bold">
          &copy; {new Date().getFullYear()} Oriolowo Mustapha &bull; Engineering with Precision
        </p>
      </footer>
    </div>
  )
}

export default App

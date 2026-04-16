import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-primary-blue rounded-t-[3rem] mx-4 -mb-4 shadow-2xl-top text-white relative z-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Let's Work Together
        </motion.h2>
        <p className="text-orange text-lg mb-12 font-medium tracking-wide max-w-2xl mx-auto">
          I'm currently available for freelance work and full-time opportunities. If you have a project that needs some creative injection, let's talk.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-orange">Connect with me</h3>
              <p className="text-white/80 mb-6">
                Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/2347031602720" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/10 hover:bg-orange transition-all group" title="WhatsApp">
                  <i className="fab fa-whatsapp text-2xl group-hover:text-white"></i>
                </a>
                <a href="https://www.linkedin.com/in/oriolowo-mustapha-29b769394/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/10 hover:bg-orange transition-all group" title="LinkedIn">
                  <i className="fab fa-linkedin-in text-2xl group-hover:text-white"></i>
                </a>
                <a href="https://x.com/Apha_Base" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/10 hover:bg-orange transition-all group" title="X (Twitter)">
                  <i className="fab fa-x-twitter text-2xl group-hover:text-white"></i>
                </a>
                <a href="mailto:oriolowomustapha@gmail.com" className="p-4 rounded-2xl bg-white/10 hover:bg-orange transition-all group" title="Email">
                  <i className="fas fa-envelope text-2xl group-hover:text-white"></i>
                </a>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange transition-colors">
                  <i className="fas fa-envelope text-orange group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-white/60">Email me at</p>
                  <p className="font-medium">oriolowomustapha@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange transition-colors">
                  <i className="fab fa-github text-orange group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-white/60">Follow my work</p>
                  <p className="font-medium">github.com/Oriolowo-Mustapha</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            action="https://formspree.io/f/mldpwrky"
            method="POST"
            className="space-y-4 bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm"
          >
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium ml-2 text-white/80">Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-orange focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium ml-2 text-white/80">Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-orange focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium ml-2 text-white/80">Project Description</label>
              <textarea 
                name="project_description" 
                placeholder="Tell me about your project or just say hi..." 
                rows="4" 
                required 
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-orange focus:outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-orange w-full text-lg py-4 mt-2 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange/20">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

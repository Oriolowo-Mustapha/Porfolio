import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 py-4 ${
      scrolled 
        ? 'bg-gradient-to-r from-[#003F8F] via-[#005FD8] to-[#F59E0B] shadow-xl rounded-b-2xl' 
        : 'bg-gradient-to-r from-[#003F8F] via-[#005FD8] to-[#F59E0B] rounded-b-2xl'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="font-great-vibes text-3xl text-white font-semibold">
          Apha
        </a>
        
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white font-medium hover:text-orange transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button - simple version for now */}
        <div className="md:hidden text-white cursor-pointer">
           <i className="fas fa-bars text-2xl"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

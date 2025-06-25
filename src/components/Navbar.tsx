'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cyber-darker/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="font-cyber text-cyber-blue hover:text-cyber-pink transition-colors"
            >
              <span className="text-cyber-pink">&gt;</span> doomsd<span className="text-cyber-blue animate-electric">AI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="font-cyber text-sm text-cyber-blue hover:text-cyber-pink transition-colors relative group"
            >
              <span className="text-cyber-pink opacity-50 group-hover:opacity-100">&gt;</span> HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-pink transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="font-cyber text-sm text-cyber-blue hover:text-cyber-pink transition-colors relative group"
            >
              <span className="text-cyber-pink opacity-50 group-hover:opacity-100">&gt;</span> ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-pink transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border with gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50"></div>
    </nav>
  );
} 
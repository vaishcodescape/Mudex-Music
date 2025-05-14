import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Logo from './Logo';
import { Button } from './ui/button';

const Navbar = () => {
  useEffect(() => {
    gsap.from('.nav-item', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <nav className="fixed w-full z-50 px-6 py-4 backdrop-blur-lg bg-background/10 border-b border-border/20">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-12 h-12">
            <Logo />
          </div>
          <span className="text-2xl font-bold text-primary">Mudex</span>
        </Link>
        
        <div className="flex items-center space-x-8">
          <motion.a 
            href="#features"
            className="nav-item text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          
          <motion.a 
            href="#discover"
            className="nav-item text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover
          </motion.a>
          
          <Link to="/auth">
            <Button
              variant="glow"
              size="default"
              className="nav-item"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
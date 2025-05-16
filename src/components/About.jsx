import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaHeadphones, FaUserFriends, FaCode, FaGithub, FaMicrophone } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import Logo from './Logo';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const teamMembers = [
    {
      name: "Aditya Vaish",
      role: "Founder & Lead Developer",
      image: "https://avatars.githubusercontent.com/u/vaishcodescape",
      github: "https://github.com/vaishcodescape"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -10, 0],
              transition: { 
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                y: { 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }
              }
            }}
          >
            <Logo size={120} animated={true} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Mudex Music
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern music streaming platform built with passion for music lovers.
          </p>
        </motion.div>

        <motion.div 
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Story</h2>
            <div className="max-w-none">
              <p className="mb-4">
                Mudex Music was born from a simple idea: to create a music streaming platform that puts the user experience first. 
                We believe that music is a universal language that connects people across cultures, and our mission is to make 
                that connection as seamless and enjoyable as possible.
              </p>
              <p className="mb-4">
                Started in 2025 by Aditya Vaish, a passionate developer and entrepreneur, Mudex Music began as a personal project 
                to address the limitations of existing streaming platforms. Frustrated by clunky interfaces, limited discovery options, 
                and poor audio quality on other services, Aditya set out to build something better – a platform that truly understands 
                what music lovers want.
              </p>
              <p className="mb-4">
                The name "Mudex" combines "Music" and "Experience," reflecting our core mission: to create the most comprehensive and 
                accessible Experience of music in the world. Our team has grown from a solo project to a dedicated group of developers, 
                designers, and music industry professionals united by a shared passion for creating the ultimate music experience.
              </p>
              <p className="mb-4">
                What sets Mudex Music apart is our commitment to both technical excellence and artistic appreciation. We've built 
                our platform using cutting-edge web technologies like React, Framer Motion, and TailwindCSS, combined with a 
                sophisticated audio processing backend that ensures pristine sound quality across all devices. Every design decision 
                is made with both aesthetics and functionality in mind, creating an interface that's both beautiful and intuitive.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FaMusic className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Quality First</h3>
                </div>
                <p className="text-muted-foreground">
                  We believe in delivering the highest quality audio experience possible, with no compromises. Mudex Music supports lossless audio formats up to 24-bit/192kHz, ensuring you hear every detail as the artist intended.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FaUserFriends className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Driven</h3>
                </div>
                <p className="text-muted-foreground">
                  Our platform grows and evolves based on feedback from our community of music lovers. We regularly host listening sessions, feedback forums, and collaborate directly with users to shape the future of Mudex Music.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <MdSecurity className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Privacy Focused</h3>
                </div>
                <p className="text-muted-foreground">
                  We respect your privacy and are committed to protecting your personal data. Mudex Music employs end-to-end encryption, transparent data practices, and gives you complete control over your listening data and preferences.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FaCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Open Source</h3>
                </div>
                <p className="text-muted-foreground">
                  We believe in the power of open source and community collaboration to build better software. Our core platform is open source, and we actively contribute to the developer community through libraries, tools, and educational resources.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FaMicrophone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Elevating Underrated Artists</h3>
                </div>
                <p className="text-muted-foreground">
                  We're committed to giving small and independent artists the visibility they deserve. Our discovery algorithms are designed to spotlight emerging talent alongside established artists, creating opportunities for musicians at every stage of their career.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Technology</h2>
            <div className="max-w-none">
              <p className="mb-4">
                At Mudex Music, we've built our platform on a foundation of cutting-edge technologies that enable us to deliver an exceptional music streaming experience. Our architecture combines the best of modern web development with specialized audio processing capabilities:
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li>
                  <strong>Adaptive Streaming:</strong> Our proprietary streaming technology automatically adjusts to your network conditions, ensuring uninterrupted playback even with fluctuating connections.                  
                </li>
                <li>
                  <strong>Advanced Audio Processing:</strong> We've developed custom audio processing algorithms that optimize sound quality for any listening environment or device, from high-end headphones to smartphone speakers.
                </li>
                <li>
                  <strong>Intelligent Discovery:</strong> Our recommendation engine uses a combination of collaborative filtering, content analysis, and machine learning to help you discover new music that perfectly matches your taste.
                </li>
                <li>
                  <strong>Seamless Cross-Platform Experience:</strong> Currently available as a web app, with native mobile and desktop applications coming soon. Your experience, playlists, and preferences will synchronize perfectly across all platforms.
                </li>
                <li>
                  <strong>Real-time Collaboration:</strong> Our platform includes features for shared playlists, listening parties, and social discovery that help connect music lovers around the world.
                </li>
              </ul>
              <p>
                We're constantly pushing the boundaries of what's possible in music streaming technology, with regular updates and new features that enhance your listening experience.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-md text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://avatars.githubusercontent.com/u/0";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <FaGithub className="mr-1" /> GitHub
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center border-t border-border/50 pt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <a 
            href="https://github.com/vaishcodescape/Mudex-Music" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-background bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md shadow-primary/20"
          >
            <FaGithub className="mr-2 h-5 w-5" />
            <span>Visit Our GitHub</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

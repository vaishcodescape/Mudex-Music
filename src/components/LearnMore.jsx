import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeadphones, FaRocket, FaUsers, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';

const LearnMore = () => {
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sections = [
    {
      id: 'how-it-works',
      title: 'How It Works',
      icon: <FaHeadphones className="h-6 w-6 text-primary" />,
      content: (
        <>
          <p className="mb-4">
            Mudex Music uses advanced streaming technology to deliver high-quality audio directly to your device. 
            Our platform is built on a robust infrastructure that ensures minimal latency and maximum reliability.
          </p>
          <p className="mb-4">
            When you play a track on Mudex Music, our intelligent system analyzes your network conditions and 
            automatically adjusts the streaming quality to provide the best possible experience without interruptions.
          </p>
          <p>
            Our recommendation engine uses machine learning algorithms to analyze your listening habits and preferences, 
            allowing us to suggest new music that matches your taste with remarkable accuracy.
          </p>
        </>
      )
    },
    {
      id: 'technology',
      title: 'Our Technology',
      icon: <FaRocket className="h-6 w-6 text-primary" />,
      content: (
        <>
          <p className="mb-4">
            Mudex Music is built using cutting-edge web technologies that ensure a smooth and responsive user experience 
            across all devices. Our front-end is developed with React, providing a dynamic and interactive interface.
          </p>
          <p className="mb-4">
            We use advanced audio processing algorithms to ensure the highest quality sound reproduction, with support 
            for various audio formats and bitrates. Our adaptive streaming technology adjusts in real-time to your 
            network conditions.
          </p>
          <p>
            The platform is designed with a modern, responsive architecture that works beautifully on any device with a web browser. 
            Our web-first approach ensures you get the best experience now, while we develop native applications for mobile and desktop platforms.
          </p>
        </>
      )
    },
    {
      id: 'community',
      title: 'Our Community',
      icon: <FaUsers className="h-6 w-6 text-primary" />,
      content: (
        <>
          <p className="mb-4">
            Mudex Music is more than just a streaming platform; it's a vibrant community of music lovers who share 
            a passion for discovering and enjoying great music. Our community features allow you to connect with 
            friends, share playlists, and discover what others are listening to.
          </p>
          <p className="mb-4">
            We regularly organize virtual events, listening parties, and exclusive artist interviews that bring our 
            community together. These events provide unique opportunities to discover new music and connect with 
            like-minded individuals.
          </p>
          <p>
            Our user forums and feedback channels ensure that the community has a voice in shaping the future of 
            Mudex Music. Many of our most popular features were inspired by suggestions from our users.
          </p>
        </>
      )
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      icon: <FaQuestionCircle className="h-6 w-6 text-primary" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Is Mudex Music available on all devices?</h4>
            <p>
              Currently, Mudex Music is available as a web application accessible from any modern browser. 
              Native applications for iOS, Android, Windows, and macOS are under development and will be released soon. 
              Once released, your account and playlists will sync across all your devices automatically.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How much does Mudex Music cost?</h4>
            <p>
              Mudex Music offers a free tier with limited features and advertisements. Our premium subscription removes 
              ads, enables offline listening, and provides access to higher quality audio for a monthly fee.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I download music for offline listening?</h4>
            <p>
              Yes, premium subscribers can download tracks, albums, and playlists for offline listening on mobile and 
              desktop applications. Downloaded content is available for as long as your subscription is active.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How does Mudex Music support artists?</h4>
            <p>
              We believe in fair compensation for artists. A significant portion of our subscription revenue goes 
              directly to artists based on the number of streams their music receives on our platform. We're especially 
              committed to elevating underrated talent by giving small and independent artists the visibility and 
              opportunities they deserve through our discovery algorithms and featured artist programs.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div 
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Learn More
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the technology, community, and vision behind Mudex Music.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div 
              key={section.id}
              id={section.id}
              variants={fadeInUp}
              className={`flex flex-col md:flex-row gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="bg-primary/10 p-4 rounded-lg inline-flex mb-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                <div className="hidden md:block mt-4">
                  <Link 
                    to={index < sections.length - 1 ? `#${sections[index + 1].id}` : '/features'}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    {index < sections.length - 1 ? 'Next Section' : 'Explore Features'}
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="md:w-2/3 bg-card rounded-xl p-6 shadow-sm border border-border/50">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {section.content}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold mb-6">Ready to Experience Mudex Music?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/auth" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-background bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md shadow-primary/20"
            >
              Get Started
            </Link>
            <Link 
              to="/features" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-foreground bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LearnMore;

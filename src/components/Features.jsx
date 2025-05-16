import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMusic, 
  FaHeadphones, 
  FaMobileAlt, 
  FaCloudDownloadAlt, 
  FaUserFriends, 
  FaRegHeart, 
  FaRegClock,
  FaRegChartBar,
  FaMicrophone
} from 'react-icons/fa';
import { MdHighQuality, MdOfflineShare, MdOutlineRecommend } from 'react-icons/md';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const Features = () => {
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

  const features = [
    {
      icon: <MdHighQuality className="h-6 w-6 text-primary" />,
      title: "High-Quality Audio",
      description: "Experience music in crystal clear quality with our high-definition audio streaming technology."
    },
    {
      icon: <FaHeadphones className="h-6 w-6 text-primary" />,
      title: "Personalized Playlists",
      description: "Get playlists tailored to your taste based on your preferences and favorite genres."
    },
    {
      icon: <FaMobileAlt className="h-6 w-6 text-primary" />,
      title: "Cross-Platform Support",
      description: "Web version available now. Native mobile and desktop apps coming soon!"
    },
    {
      icon: <FaCloudDownloadAlt className="h-6 w-6 text-primary" />,
      title: "Offline Listening",
      description: "Download your favorite tracks and listen to them even when you're offline."
    },
    {
      icon: <FaUserFriends className="h-6 w-6 text-primary" />,
      title: "Social Sharing",
      description: "Share your favorite tracks and playlists with friends and discover what they're listening to."
    },
    {
      icon: <FaMicrophone className="h-6 w-6 text-primary" />,
      title: "Indie Artist Support",
      description: "We elevate underrated talent by giving small artists visibility and opportunities they deserve."
    },
    {
      icon: <MdOutlineRecommend className="h-6 w-6 text-primary" />,
      title: "Smart Recommendations",
      description: "Discover new music with our intelligent recommendation engine powered by AI."
    },
    {
      icon: <FaRegHeart className="h-6 w-6 text-primary" />,
      title: "Favorites Collection",
      description: "Save your favorite tracks, albums, and artists for quick access anytime."
    },
    {
      icon: <HiOutlineLightningBolt className="h-6 w-6 text-primary" />,
      title: "Fast Streaming",
      description: "Enjoy instant playback with our optimized streaming technology that adapts to your network conditions."
    },
    {
      icon: <FaMusic className="h-6 w-6 text-primary" />,
      title: "Exclusive Content",
      description: "Access exclusive tracks, albums, and artist interviews not available elsewhere."
    },
    {
      icon: <MdOfflineShare className="h-6 w-6 text-primary" />,
      title: "Ad-Free Experience",
      description: "Enjoy uninterrupted music without any ads or interruptions."
    },
    {
      icon: <FaRegChartBar className="h-6 w-6 text-primary" />,
      title: "Music Analytics",
      description: "Get insights into your listening habits with detailed statistics and trends."
    },
  ];

  return (
    <motion.div 
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes Mudex Music the perfect platform for your listening experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="bg-primary/10 p-3 rounded-lg inline-flex mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-card rounded-xl p-8 md:p-10 shadow-md border border-border/50 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Mudex Music?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of music lovers who have already discovered the Mudex difference.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/auth" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-background bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md shadow-primary/20"
            >
              Get Started
            </a>
            <a 
              href="/learn-more" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-foreground bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;

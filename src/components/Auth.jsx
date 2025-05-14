import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const SoundWave = () => {
  const [bars] = useState(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      initialHeight: Math.random() * 100,
    }))
  );

  return (
    <motion.div 
      className="absolute inset-x-0 bottom-0 h-24 flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-[2px] h-full">
        {bars.map((bar, index) => (
          <motion.div
            key={bar.id}
            className="w-1 bg-sky-400/30 rounded-full"
            animate={{
              height: [4, bar.initialHeight * 0.3, 4],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.02,
              repeatType: "reverse"
            }}
            style={{
              transformOrigin: "bottom"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = ({ isSignIn }) => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <div className="h-6 w-16 bg-sky-400/20 rounded mb-2" />
      <div className="h-12 bg-sky-400/20 rounded-lg w-full" />
    </motion.div>
    
    <AnimatePresence>
      {!isSignIn && (
        <motion.div
          initial={{ opacity: 0.5, height: 0 }}
          animate={{ opacity: [0.5, 0.3, 0.5], height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
        >
          <div className="h-6 w-20 bg-sky-400/20 rounded mb-2" />
          <div className="h-12 bg-sky-400/20 rounded-lg w-full" />
        </motion.div>
      )}
    </AnimatePresence>
    
    <motion.div 
      className="h-12 bg-sky-400/20 rounded-lg w-full"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
    />
    
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <motion.div 
          className="w-full h-[1px] bg-sky-400/20"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />
      </div>
    </div>
    
    <motion.div 
      className="h-12 bg-sky-400/20 rounded-lg w-full"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
    />
  </div>
);

const BackgroundAnimation = () => {
  const circles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    delay: i * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-purple-500/5 to-sky-500/5"
        animate={{
          background: [
            "linear-gradient(to right bottom, rgba(14, 165, 233, 0.05), rgba(168, 85, 247, 0.05), rgba(14, 165, 233, 0.05))",
            "linear-gradient(to right bottom, rgba(168, 85, 247, 0.05), rgba(14, 165, 233, 0.05), rgba(168, 85, 247, 0.05))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Animated circles */}
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            background: "linear-gradient(225deg, rgba(14, 165, 233, 0.07) 0%, rgba(56, 189, 248, 0.03) 100%)",
            filter: "blur(8px)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 360],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: circle.delay,
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

const ColorChangingHeading = () => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-6xl font-bold tracking-tight"
        style={{ textShadow: "0 0 20px rgba(56, 189, 248, 0.3)" }}
      >
        <motion.span
          className="inline-block"
          animate={{
            color: [
              "rgb(56, 189, 248)", // sky-400
              "rgb(139, 92, 246)", // violet-500
              "rgb(14, 165, 233)", // sky-600
              "rgb(56, 189, 248)", // back to sky-400
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Mudex
        </motion.span>{" "}
        <motion.span
          className="inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, rgb(56, 189, 248), rgb(139, 92, 246))",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Music
        </motion.span>
      </motion.h1>
      <motion.div
        className="mt-3 text-lg font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.span
          className="bg-gradient-to-r from-sky-400/60 via-violet-400/60 to-sky-400/60 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          Elevate the Underrated
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }
      
      if (!isSignIn && password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      console.log('Login successful:', { email, ...(isSignIn ? {} : { password }) });
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify({ email: 'google@example.com' }));
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background animation */}
      <BackgroundAnimation />
      
      {/* Sound wave animation */}
      <SoundWave />

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Color changing heading */}
        <ColorChangingHeading />

        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Logo />
        </motion.div>
        
        <motion.div
          className="bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-sky-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </motion.h2>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-6"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {formLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingSkeleton isSignIn={isSignIn} />
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <motion.div>
                  <label className="block text-sky-400 mb-2 font-medium" htmlFor="email">
                    Email
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 focus:outline-none transition-all duration-300"
                    required
                    disabled={loading}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {!isSignIn && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sky-400 mb-2 font-medium" htmlFor="password">
                        Password
                      </label>
                      <motion.input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 focus:outline-none transition-all duration-300"
                        required
                        disabled={loading}
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02, backgroundColor: 'rgb(56, 189, 248)' }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm tracking-wide shadow-lg shadow-sky-500/20"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Loading...
                    </motion.div>
                  ) : (
                    isSignIn ? 'Sign In' : 'Sign Up'
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900/50 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                >
                  <FcGoogle className="text-xl" />
                  <span>Google</span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.p className="mt-6 text-center text-gray-400">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <motion.button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sky-400 hover:text-sky-300 hover:underline transition-colors duration-300 font-medium"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Auth; 
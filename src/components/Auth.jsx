import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Label } from './ui/label';

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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Add your authentication logic here
      console.log('Authentication attempt with:', { email, password });
      // For now, just simulate success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden p-4">
      <BackgroundAnimation />
      <SoundWave />
      
      <div className="w-full max-w-md z-10">
        <ColorChangingHeading />
        
        <Card className="backdrop-blur-lg bg-card/30 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {isSignIn ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {isSignIn 
                ? 'Sign in to continue your musical journey' 
                : 'Join the community of music lovers'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full"
                variant="glow"
                disabled={loading}
              >
                {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-background/50"
                onClick={() => {/* Add Google sign in logic */}}
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Google
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Button
              variant="link"
              className="text-primary"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth; 
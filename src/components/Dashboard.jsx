import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { Button } from './ui/button';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showAuth={false} />
      
      <motion.div 
        className="container pt-32 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-primary mb-2">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground">
                Your personal music dashboard
              </p>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="font-medium"
              >
                Logout
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { title: 'Recent Plays', count: '24' },
              { title: 'Playlists', count: '12' },
              { title: 'Liked Songs', count: '348' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-3xl font-bold text-foreground">{item.count}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 p-6 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                'Added "Summer Vibes" to your playlist',
                'Liked "Dancing in the Moonlight"',
                'Created new playlist "Road Trip 2024"',
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-md bg-background/50 border border-border/50"
                >
                  <p className="text-muted-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 
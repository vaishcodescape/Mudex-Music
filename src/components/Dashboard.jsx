import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <motion.div 
      className="min-h-screen bg-black text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-blue-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
        <motion.p 
          className="text-gray-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to Mudex Music!
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Dashboard; 
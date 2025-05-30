"use client";
import { motion } from 'framer-motion';

export default function Community() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Community</h1>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

const Custom = () => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div>Hello</div>
    </motion.div>
  );
};

export default Custom;

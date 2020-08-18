import React from 'react';
import { motion } from 'framer-motion';

const Boxes = () => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div>Hello</div>
    </motion.div>
  );
};

export default Boxes;

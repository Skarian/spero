import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Layout = ({ children, maxWidth }) => (
  <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
    {children}
  </motion.div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

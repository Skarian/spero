import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

const Layout = ({ children, maxWidth }) => (
  // <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ type: 'spring', stiffness: 500, damping: 20, opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Container maxWidth="lg">{children}</Container>
  </motion.div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

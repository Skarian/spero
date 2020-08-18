import React from 'react';
import { Container } from '@material-ui/core';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
    <Container maxWidth="lg">{children}</Container>
  </motion.div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

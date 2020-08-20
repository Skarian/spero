import React from 'react';
import { Grid as GridBase, Typography, Chip } from '@material-ui/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const wireframes = false;

const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const Title = styled(Typography)`
  &.MuiTypography-h6 {
    font-weight: 700;
  }
`;
const Description = styled(Typography)`
  padding-top: 10px;
`;

const Card = styled(motion.div)`
  padding: 30px;
  background-color: #f0f5ff;
  border-radius: 25px;
  max-width: 400px;
  height: 330px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 1;
`;

const Image = styled(motion.img)`
  width: 275px;
  border-radius: 25px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const TagChip = styled(Chip)`
  &.MuiChip-root {
    font-weight: 600;
    background-color: #ffdd94;
    margin-right: 2.5px;
  }
  &.MuiChip-label {
  }
`;

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const ProductCard = ({ box, handleClick }) => {
  const { id, title, image, tags, description } = box;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variants={fadeInUp}>
      <Card
        onClick={() => {
          handleClick(id);
        }}
      >
        <Grid item>
          <Title align="center" variant="h6">
            {title}
          </Title>
        </Grid>
        <Grid container item justify="center">
          <Image
            src={image}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </Grid>
        <Grid container item justify="center">
          {tags.length > 0 ? tags.map((tag) => <TagChip size="small" label={tag} />) : null}
        </Grid>
        <Grid item>
          <Description variant="body2">{description}</Description>
        </Grid>
      </Card>
    </motion.div>
  );
};

ProductCard.propTypes = {
  box: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProductCard;

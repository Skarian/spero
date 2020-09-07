import React from 'react';
import { Grid as GridBase, Typography, Chip } from '@material-ui/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

const wireframes = false;

const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const Title = styled(Typography)`
  &.MuiTypography-h6 {
    font-weight: 700;
  }
`;

const Card = styled(motion.div)`
  padding: 30px;
  /* background-color: #f0f5ff; */
  border-radius: 25px;
  max-width: 400px;
  height: 350px;

  cursor: pointer;
  &:hover {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out;
  }
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const Image = styled(motion.img)`
  width: 100%;
  border-radius: 25px;
  padding-bottom: 25px;
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

const DynamicLink = styled.a`
  color: black;
  text-decoration: none;
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

const ProductCard = ({ box }) => {
  const router = useRouter();
  const { id, title, image, tags, handle } = box;
  const nextLinkProps = {
    as: {
      pathname: `/boxes/${handle}`,
      query: {
        handle,
      },
    },
    href: {
      pathname: '/[handle]',
      query: {
        handle,
      },
    },
  };

  return (
    // <DynamicLink href={`/boxes/${handle}`}>
    // <Link href={nextLinkProps.href} as={nextLinkProps.as}>
    <Link href="/boxes/[handle]" as={`/boxes/${handle}`}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05, borderRadius: '50px' }}
        variants={fadeInUp}
      >
        <Card>
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
            {tags.length > 0
              ? tags.map((tag) => <TagChip key={tag} size="small" label={tag} />)
              : null}
          </Grid>
        </Card>
      </motion.div>
    </Link>
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
};

export default ProductCard;

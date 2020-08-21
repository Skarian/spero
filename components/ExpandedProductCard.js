import React, { useState } from 'react';
import { Grid as GridBase } from '@material-ui/core';
import { motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { Down } from '../utils/breakpoints';
import PropTypes from 'prop-types';

const wireframes = false;

const Card = styled(motion.div)`
  width: 80vw;
  height: 70vh;
  position: fixed;
  top: 55%;
  left: 50%;
  margin-top: -35vh; /* Negative half of height. */
  margin-left: -40vw; /* Negative half of width. */
  z-index: 1300;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 52px -7px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: 0px 0px 52px -7px rgba(0, 0, 0, 0.51);
  box-shadow: 0px 0px 52px -7px rgba(0, 0, 0, 0.51);
  ${Down.sm`
  width: 95vw;
  height: 90vh;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -45vh; /* Negative half of height. */
  margin-left: -47.5vw; /* Negative half of width. */
`}
`;

const Grid = styled(GridBase)`
  height: 100%;
  border: ${wireframes ? '1px solid red' : 'none'};
`;

const Image = styled(GridBase)`
  background-color: white;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  padding: 20px;
  ${Down.sm`
  border-top-right-radius: 25px;
  border-bottom-left-radius: 0px;
`}
`;

const Description = styled(GridBase)`
  background-color: #ffdd94;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  ${Down.sm`
  border-top-right-radius: 0px;
  border-bottom-left-radius: 25px;
`}
`;

const CloseButton = styled(CloseIcon)`
  &.MuiSvgIcon-root {
    fill: gray;
    font-size: 3em;
    ${Down.md`
  font-size: 2em;
`}
    &:hover {
      fill: #c20114;
    }
  }
`;

const ExpandedProductCard = ({ box, open }) => {
  let a;
  return (
    <Card
      animate={{
        // y: 0,
        scale: 1,
        opacity: 1,
      }}
      initial={{
        // y: 60,
        opacity: 0.5,
        scale: 0,
      }}
      exit={{
        // opacity: 0,
        opacity: 0.5,
        scale: 0,
      }}
      key={box.id}
    >
      <Grid container>
        <Image item sm={6} md={6} xs={12}>
          <motion.div whileTap={{ y: 1 }}>
            <CloseButton
              onClick={() => {
                open('');
              }}
            />
          </motion.div>
        </Image>
        <Description item sm={6} md={6} xs={12}>
          Hello
        </Description>
      </Grid>
    </Card>
  );
};

ExpandedProductCard.propTypes = {
  box: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf.isRequired,
  }).isRequired,
  open: PropTypes.func.isRequired,
};

export default ExpandedProductCard;

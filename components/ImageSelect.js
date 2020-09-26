import styled, { css } from 'styled-components';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { motion } from 'framer-motion';
import { Grid as GridBase, Typography } from '@material-ui/core';
import { Up, Down } from '../utils/breakpoints';

const wireframes = false;

// Styled-Components
const PremadeBoxHero = styled(motion.div)`
  border-radius: 50px;
  border: ${wireframes ? '1px solid red' : 'none'};
  width: 80%;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  box-shadow: rgba(39, 39, 39, 0.1) 0px 0px 0px 1px inset;
  ${Down.md`
  padding-bottom: 25px;
  margin-bottom: 25px;
  width: 75%
`};
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
  &.selected {
    background-color: rgba(0, 128, 0, 0.3);
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
    border: 5px solid rgba(0, 128, 0, 1);
    border-style: dotted;
  }
`;
const Header = styled(Typography)`
  padding-top: 50px;
  padding-bottom: 20px;
  &.MuiTypography-h4 {
    font-weight: 1000;
  }
`;
const Description = styled(Typography)`
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;

  &.MuiTypography-body1 {
    font-weight: 800;
  }
`;
const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;

const Image = styled(motion.img)`
  height: 200px;
  width: auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  ${Down.lg`
  height: 200px
`}
  ${Down.lg`
  height: 175px
`}
`;

const CheckIconWrapper = styled(motion.div)`
  display: inline-flex;
`;

const ImageSelect = ({ isSelected, stateHandler, questionID, option, changeQuestion }) => {
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

  return (
    <Grid container item sm={12} md={4} justify="center">
      <PremadeBoxHero
        className={isSelected ? 'selected' : 'none'}
        onTouchStart={() => {
          stateHandler((prevState) => ({
            ...prevState,
            [questionID]: {
              selectedOptionContent: option.content,
              selectedOptionID: option.id,
            },
          }));
          setTimeout(() => {
            changeQuestion((prevProps) => ({
              ...prevProps,
              type: false,
              who: false,
              customBox: true,
            }));
          }, 1000);
        }}
        onClick={() => {
          stateHandler((prevState) => ({
            ...prevState,
            [questionID]: {
              selectedOptionContent: option.content,
              selectedOptionID: option.id,
            },
          }));
          setTimeout(() => {
            changeQuestion((prevProps) => ({
              ...prevProps,
              type: false,
              who: false,
              customBox: true,
            }));
          }, 1000);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={fadeInUp}
        color={option.color}
        layout
      >
        <Grid container item xs={12} direction="column" alignItems="center" alignContent="center">
          <Header variant="h4">
            {isSelected ? (
              <CheckIconWrapper initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircleOutlineIcon
                  fontSize="small"
                  style={{ fontSize: '0.9em', fill: 'rgba(0, 128, 0, 1)', marginRight: '10px' }}
                />
              </CheckIconWrapper>
            ) : null}
            {option.content}
          </Header>
          <Image
            src={option.image}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <Description variant="body1">{option.description}</Description>
        </Grid>
      </PremadeBoxHero>
    </Grid>
  );
};

export default ImageSelect;

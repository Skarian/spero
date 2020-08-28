import Head from 'next/head';
import { Grid as GridBase, Typography, Chip, Button as ButtonBase } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Title } from '../components/Elements';
import Box from '../assets/box.svg';
import SnackImage from '../assets/goldfish.svg';
import LetterImage from '../assets/letter.svg';
import { Down } from '../utils/breakpoints';

// Turns wireframes for grids on and off for debugging layout
const wireframes = false;

// Styled-Components
const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const LeftImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
  ${Down.md`
  height: 60%;
`}
`;
const RightImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
  ${Down.md`
  height: 40%;
`}
`;
const SnackImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 60%;
`;
const BoxImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 40%;
`;

const DescriptionGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 70vh;
  background-color: #f4f3f6;
  padding: 50px;
`;
const DescriptionCard = styled(motion.div)`
  position: relative;
`;
const ProductTitle = styled(Typography)`
  &.MuiTypography-h4 {
    font-weight: 700;
  }
  padding-bottom: 25px;
`;
const Description = styled(Typography)`
  &.MuiTypography-body1 {
    font-weight: 400;
  }
  padding-bottom: 25px;
`;
const TagChip = styled(Chip)`
  &.MuiChip-root {
    font-weight: 600;
    background-color: #ffdd94;
    margin-right: 15px;
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 5px;
  }
  &.MuiChip-label {
  }
`;
const TagContainer = styled.div`
  padding-bottom: 25px;
`;
const Price = styled(Typography)`
  &.MuiTypography-h5 {
    font-weight: 600;
  }
  padding-right: 15px;
`;
const ComparePrice = styled(Typography)`
  &.MuiTypography-h5 {
    font-weight: 300;
    text-decoration: line-through;
  }
`;
const BuyButton = styled(ButtonBase)`
  &.MuiButton-contained {
    background-color: #80f299;
    &:hover {
      background-color: #5dee7d;
    }
  }
  &.MuiButton-root {
    border-radius: 12px;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 25px;
    line-height: 29px;
  }
`;
const PriceContainer = styled.div`
  padding-bottom: 75px;
`;

const ImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 70vh;
  background-color: #b8e5ff;
  ${Down.md`
  height: 110vh;
`}
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
  width: 100%;
`;

const BoxIMG = styled(motion.img)`
  height: 80%;
  z-index: 100;
`;
const LetterIMG = styled(motion.img)`
  height: 80%;
`;

const SnackIMG = styled(motion.img)`
  position: absolute;
  height: 137px;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  ${(props) =>
    props.first &&
    css`
      top: 15%;
      right: 63%;
      ${Down.lg`
        right: 60%;
      `}
    `}
  ${(props) =>
    props.second &&
    css`
      top: 15%;
      right: 41%;
      ${Down.lg`
        right: 38%;
      `}
    `}
    ${(props) =>
    props.third &&
    css`
      top: 15%;
      right: 19%;
      ${Down.lg`
        right: 16%;
      `}
    `}
    ${(props) =>
    props.fourth &&
    css`
      top: 60%;
      right: 63%;
      ${Down.lg`
        right: 60%;
      `}
    `}
  ${(props) =>
    props.fifth &&
    css`
      top: 60%;
      right: 41%;
      ${Down.lg`
        right: 38%;
      `}
    `}
    ${(props) =>
    props.sixth &&
    css`
      top: 60%;
      right: 19%;
      ${Down.lg`
        right: 16%;
      `}
    `}
`;

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 300,
    opacity: 0,
    scale: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    rotate: 360,
    transition: {
      duration: 2,
      ease: easing,
      // repeat: Infinity,
    },
  },
};

const Home = () => {
  const imgArray = [
    { first: true, src: SnackImage },
    { second: true, src: SnackImage },
    { third: true, src: SnackImage },
    { fourth: true, src: SnackImage },
    { fifth: true, src: SnackImage },
    { sixth: true, src: SnackImage },
  ];
  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="../assets/favicon.ico" />
      </Head>
      <main>
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
          <Title align="center" variant="h3">
            The <mark>simplest</mark> way to send snacks. Period.
          </Title>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
            <Grid container alignItems="center">
              <ImageGrid container xs={12} md={8} justify="center" alignItems="center">
                <LeftImageGrid container item md={7} xs={12}>
                  <SnackImageGrid container item xs={12}>
                    <ImageCard variants={stagger}>
                      {imgArray.map((label) => (
                        <SnackIMG
                          key={label}
                          {...label}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          variants={fadeInUp}
                        />
                      ))}
                    </ImageCard>
                  </SnackImageGrid>
                  <BoxImageGrid
                    container
                    item
                    direction="row"
                    xs={12}
                    justify="center"
                    alignItems="center"
                  >
                    <BoxIMG
                      src={Box}
                      alt="carboard box"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                    />
                  </BoxImageGrid>
                </LeftImageGrid>
                <RightImageGrid container md={5} xs={12} alignItems="flex-start" justify="center">
                  <LetterIMG
                    src={LetterImage}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                  />
                </RightImageGrid>
              </ImageGrid>
              <DescriptionGrid container item md={4} xs={12} justify="center" alignItems="center">
                <DescriptionCard
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <ProductTitle variant="h4" align="left">
                    The "WFH" Care Package
                  </ProductTitle>
                  <Description variant="body1">
                    Delicious snacks plus a personal note makes the perfect pick-me-up
                  </Description>
                  <TagContainer>
                    <TagChip size="small" label="Free Shipping" />
                    <TagChip size="small" label="Healthy" />
                    <TagChip size="small" label="Energy Boost" />
                  </TagContainer>

                  <PriceContainer>
                    <Price display="inline" variant="h5">
                      $12.99
                    </Price>
                    <ComparePrice display="inline" variant="h5">
                      $30.00
                    </ComparePrice>
                  </PriceContainer>
                  <BuyButton variant="contained">Send Snacks</BuyButton>
                </DescriptionCard>
              </DescriptionGrid>
            </Grid>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;

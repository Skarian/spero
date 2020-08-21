import Head from 'next/head';
import { Grid as GridBase, Typography, Button as ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import CustomBoxImg from '../assets/Customers.png';
import PremadeBoxImg from '../assets/Employees.png';
import { Down } from '../utils/breakpoints';
import Layout from '../components/Layout';
import { Title } from '../components/Elements';

// Turns wireframes for grids on and off for debugging layout
const wireframes = false;

// Styled-Components
const PremadeBoxHero = styled(motion.div)`
  background-color: #ffdd94;
  border-radius: 50px;
  border: ${wireframes ? '1px solid red' : 'none'};
  width: 40vw;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  ${Down.md`
  width: 80vh;
  max-width: 500px;
`};
`;
const CustomBoxHero = styled(motion.div)`
  background-color: #f0eeeb;
  border-radius: 50px;
  border: ${wireframes ? '1px solid red' : 'none'};
  width: 40vw;
  padding-left: 40px;
  padding-right: 40px;
  cursor: pointer;
  ${Down.md`
  width: 80vh;
  max-width: 500px;
`}
`;
const Header = styled(Typography)`
  padding-top: 75px;
  padding-bottom: 20px;
  &.MuiTypography-h4 {
    font-weight: 1000;
  }
`;
const Description = styled(Typography)`
  padding-top: 20px;
  padding-bottom: 50px;
  color: #6e6348;

  &.MuiTypography-body1 {
    font-weight: 800;
  }
`;
const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;

const Image = styled(motion.img)`
  height: 300px;
  width: auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  margin-bottom: 50px;
  ${Down.lg`
  height: 200px
`}
  ${Down.lg`
  height: 175px
`}
`;

const Home = () => {
  const router = useRouter();

  // Animation - framer-motion
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

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="../assets/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Title align="center" variant="h3">
            Choose your path
          </Title>
          <motion.div variants={stagger}>
            <Grid container direction="row" spacing={4} alignItems="center">
              <Grid container item xs={12} md={6} justify="center">
                <PremadeBoxHero
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('boxes');
                  }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Header variant="h4">Snackify Boxes</Header>
                    <Description variant="body1">
                      Choose from our assortment of delicious packages
                    </Description>
                    <Image
                      src={PremadeBoxImg}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  </Grid>
                </PremadeBoxHero>
              </Grid>
              <Grid container item xs={12} md={6} justify="center">
                <CustomBoxHero
                  whileHover={{ scale: 1.05 }}
                  variants={fadeInUp}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('custom');
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Header variant="h4">Custom Boxes</Header>
                    <Description variant="body1">Design your own custom Snackify box!</Description>
                    <Image
                      src={CustomBoxImg}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  </Grid>
                </CustomBoxHero>
              </Grid>
            </Grid>
          </motion.div>
        </Layout>
        )
      </main>
    </div>
  );
};

export default Home;

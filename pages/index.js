import Head from 'next/head';
import { Grid as GridBase, Typography, Button as ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CustomBoxImg from '../assets/Customers.png';
import PremadeBoxImg from '../assets/Employees.png';
import { Down } from '../utils/breakpoints';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Home = () => {
  // Turns wireframes for grids on and off for debugging layout
  const wireframes = false;

  // Styled-Components
  const MainGrid = styled(GridBase)`
    border: ${wireframes ? '1px solid red' : 'none'};
  `;
  const PremadeBoxHero = styled(motion.div)`
    background-color: #ffdd94;
    border-radius: 10%;
    border: ${wireframes ? '1px solid red' : 'none'};
    width: 40vw;
    padding-left: 40px;
    padding-right: 40px;
    ${Down.md`
      width: 80vh;
      max-width: 500px;
    `};
  `;
  const CustomBoxHero = styled(motion.div)`
    background-color: #f0eeeb;
    border-radius: 10%;
    border: ${wireframes ? '1px solid red' : 'none'};
    width: 40vw;
    padding-left: 40px;
    padding-right: 40px;
    ${Down.md`
      width: 80vh;
      max-width: 500px;
    `}
  `;
  const Title = styled(Typography)`
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
  const InnerGrid = styled(GridBase)`
    border: ${wireframes ? '1px solid red' : 'none'};
    height: 100%;
    width: 80%;
  `;
  const BoxImage = styled(motion.img)`
    height: 300px;
    width: auto;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    ${Down.md`
      height: 200px
    `}
  `;
  const PillButtonGray = styled(ButtonBase)`
    &.MuiButton-contained {
      background-color: #f0eeeb;
      border-radius: 100px;
      margin-top: 50px;
      margin-bottom: 50px;
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    &.MuiButton-root {
      font-size: 1.5rem;
      font-weight: 700;
    }
  `;
  const PillButtonYellow = styled(ButtonBase)`
    &.MuiButton-contained {
      background-color: #6e6348;
      border-radius: 100px;
      margin-top: 50px;
      margin-bottom: 50px;
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
      color: white;
    }
    &.MuiButton-root {
      font-size: 1.5rem;
      font-weight: 700;
    }
  `;

  const router = useRouter();

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
          <motion.div variants={stagger}>
            <MainGrid container direction="row" spacing={4} alignItems="center">
              <Grid container item xs={12} md={6} justify="center">
                <PremadeBoxHero whileHover={{ scale: 1.05 }} variants={fadeInUp}>
                  <InnerGrid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Title variant="h4">Snackify Boxes</Title>
                    <Description variant="body1">
                      Choose from our assortment of delicious packages
                    </Description>
                    <BoxImage
                      src={PremadeBoxImg}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    <PillButtonGray
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('boxes');
                      }}
                    >
                      Yum Time!
                    </PillButtonGray>
                  </InnerGrid>
                </PremadeBoxHero>
              </Grid>
              <Grid container item xs={12} md={6} justify="center">
                <CustomBoxHero whileHover={{ scale: 1.05 }} variants={fadeInUp}>
                  <InnerGrid
                    container
                    item
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Title variant="h4">Custom Boxes</Title>
                    <Description variant="body1">Design your own custom Snackify box!</Description>
                    <BoxImage
                      src={CustomBoxImg}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    <PillButtonYellow
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('custom');
                      }}
                    >
                      Munch
                    </PillButtonYellow>
                  </InnerGrid>
                </CustomBoxHero>
              </Grid>
            </MainGrid>
          </motion.div>
        </Layout>
        )
      </main>
    </div>
  );
};

export default Home;

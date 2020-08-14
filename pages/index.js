import { useState } from 'react';
import Head from 'next/head';
import {
  Container, Grid as GridBase, Button as ButtonBase, LinearProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gql } from '@apollo/client';
import { OrderTypeQuestion, CustomBoxQuestion } from '../components/Questions';
import ProgressBar from '../components/ProgressBar';
import { Down } from '../utils/breakpoints';
import { initializeApollo } from '../utils/apolloClient';

const wireframes = false;

const MainGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
`;

const HeroUIGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 30%;
  ${Down.md`
  justify-content: center;
`}
`;

const ProgressGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 10%;

  ${Down.md`
  padding-left: 5vw;
  padding-right: 5vw;
`}
`;
const QuestionGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 30%;
`;

const Hero = styled.div`
  background-color: #f0f5ff;
  height: 80vh;
`;

const NextButton = styled(ButtonBase)`
  &.MuiButton-root {
    font-weight: 500;
  }
  &.MuiButton-containedPrimary {
    color: white;
  }
`;

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    type: true,
    customBox: false,
    customization: false,
    details: false,
  });
  const {
    type, customBox, customization, details,
  } = currentQuestion;

  const [selections, setSelections] = useState({
    one: {
      selectedOptionContent: '',
      selectedOptionID: 0,
    },
    two: {
      selectedOptionContent: '',
      selectedOptionID: 0,
    },
    three: {
      selectedOptionContent: '',
      selectedOptionID: 0,
    },
  });

  console.log(selections);
  console.log(currentQuestion);

  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero>
          <Container maxWidth="lg" style={{ height: '100%' }}>
            <MainGrid container item alignContent="center">
              <ProgressGrid container item>
                <ProgressBar value={10} />
              </ProgressGrid>
              <QuestionGrid container item>
                <AnimatePresence exitBeforeEnter initial={false}>
                  {type && (
                    <motion.div
                      initial={{ opacity: 0, x: 1000 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -1000 }}
                      key={1}
                    >
                      <OrderTypeQuestion questionID="one" stateHandler={setSelections} state={selections} />
                    </motion.div>
                  )}
                  {customBox && (
                    <motion.div
                      initial={{ opacity: 0, x: 1000 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -1000 }}
                      key={2}
                    >
                      <CustomBoxQuestion questionID="two" stateHandler={setSelections} state={selections} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </QuestionGrid>
              <HeroUIGrid container alignContent="center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <NextButton
                    variant="contained"
                    color="primary"
                    style={{ fontSize: '1.5rem' }}
                    onClick={() => {
                      setCurrentQuestion((prevProps) => ({
                        ...prevProps,
                        type: false,
                        customBox: true,
                      }));
                    }}
                  >
                    Next
                  </NextButton>
                </motion.div>
              </HeroUIGrid>
            </MainGrid>
          </Container>
        </Hero>
      </main>
    </div>
  );
};

const query = gql`
  query ShopInfo {
    shop {
      name
      primaryDomain {
        url
        host
      }
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query,
    // variables: allPostsQueryVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Home;

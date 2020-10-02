import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Grid as GridBase, Button as ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gql } from '@apollo/client';
import { OrderTypeQuestion, CustomBoxQuestion, WhoQuestion } from '../components/Questions';
import ProgressBar from '../components/ProgressBar';
import { Down } from '../utils/breakpoints';
import { initializeApollo } from '../utils/apolloClient';
import Layout from '../components/Layout';

const wireframes = false;

const MainGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
  ${Down.lg`
  padding-left: 5vw;
  padding-right: 5vw;
`};
`;

const HeroUIGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  padding-bottom: 5rem;
`;

const ProgressGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  padding-top: 5rem;
  ${Down.sm`
  padding-top: 1rem;
`}
`;
const QuestionGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  padding-bottom: 5rem;
`;

const Hero = styled.div`
  background-color: #f0f5ff;
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
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    who: true,
    type: false,
    customBox: false,
    customization: false,
    details: false,
  });

  const { type, customBox, customization, details, who } = currentQuestion;
  useEffect(() => {
    if (who) {
      setProgress(0);
    } else if (customBox) {
      setProgress(1);
    }
  }, [currentQuestion]);

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
        <title>Snackify, care packages for teams.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Hero>
            <Container maxWidth="lg" style={{ height: '100%' }}>
              <MainGrid container item alignContent="center">
                <ProgressGrid container item>
                  <ProgressBar stepNumber={progress} />
                </ProgressGrid>

                <QuestionGrid container item>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    {who && (
                      <Container maxWidth="lg" style={{ height: '100%' }}>
                        <motion.div
                          initial={{ opacity: 0, x: 1000 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -1000 }}
                          key={1}
                        >
                          <WhoQuestion
                            questionID="one"
                            stateHandler={setSelections}
                            state={selections}
                            changeQuestion={setCurrentQuestion}
                          />
                        </motion.div>
                      </Container>
                    )}
                    {type && (
                      <motion.div
                        initial={{ opacity: 0, x: 1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -1000 }}
                        key={3}
                      >
                        <OrderTypeQuestion
                          questionID="three"
                          stateHandler={setSelections}
                          state={selections}
                        />
                      </motion.div>
                    )}
                    {customBox && (
                      <motion.div
                        initial={{ opacity: 0, x: 1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -1000 }}
                        key={2}
                        style={{ width: '100%' }}
                      >
                        <CustomBoxQuestion
                          questionID="two"
                          stateHandler={setSelections}
                          state={selections}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </QuestionGrid>
                {/* <HeroUIGrid container alignContent="center" justify="center">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <NextButton
                      variant="contained"
                      color="primary"
                      style={{ fontSize: '1.5rem' }}
                      onClick={() => {
                        setCurrentQuestion((prevProps) => ({
                          ...prevProps,
                          type: false,
                          who: false,
                          customBox: true,
                        }));
                      }}
                    >
                      Next
                    </NextButton>
                  </motion.div>
                </HeroUIGrid> */}
              </MainGrid>
            </Container>
          </Hero>
        </Layout>
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

import Head from 'next/head';
import {
  Container,
  Grid as GridBase,
  Card,
  Button,
  CardContent,
  Typography as Text,
} from '@material-ui/core';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import Image from 'next/image';
import { Down } from '../utils/breakpoints';
import { initializeApollo } from '../utils/apolloClient';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';

const wireframes = false;

const MainGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 100%;
  ${Down.lg`
  padding-left: 5vw;
  padding-right: 5vw;
`};
`;

const Grid = styled(GridBase)``;

const Shop = () => {
  const [horizontal, setHorizontal] = useState(true);

  return (
    <div>
      <Head>
        <title>Snackify, care packages for teams.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Button
            onClick={() => {
              setHorizontal(!horizontal);
            }}
          >
            Change!
          </Button>
          <Grid container spacing={5}>
            {Array.from(Array(200), (e, i) => (
              <Grid container item key={i} xs={2} justify={horizontal ? 'center' : 'flex-start'}>
                <motion.div layout>
                  <Card>
                    <CardContent>
                      <Text align="center">{i}</Text>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
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
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Shop;

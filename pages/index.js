import Head from 'next/head';
import { Container, Grid as GridBase } from '@material-ui/core';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import Image from 'next/image';
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

const Home = () => {
  return (
    <div>
      <Head>
        <title>Snackify, care packages for teams.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div>
            <Container maxWidth="lg">
              <MainGrid container item alignContent="center">
                Hello
              </MainGrid>
            </Container>
          </div>
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

export default Home;

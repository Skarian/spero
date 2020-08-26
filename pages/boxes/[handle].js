import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { initializeApollo } from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import { Typography } from '@material-ui/core';

const BOX_QUERY = gql`
  query Boxes($handle: String!) {
    productByHandle(handle: $handle) {
      id
      description
      variants(first: 1) {
        edges {
          node {
            compareAtPriceV2 {
              amount
            }
            priceV2 {
              amount
            }
            image {
              originalSrc
            }
            availableForSale
          }
        }
      }
      title
      tags
    }
  }
`;

const BOX_HANDLES = gql`
  query BoxHandles {
    collectionByHandle(handle: "snackify-boxes") {
      id
      products(first: 100) {
        edges {
          node {
            handle
          }
        }
      }
    }
  }
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

const Box = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { loading, error, data } = useQuery(BOX_QUERY, {
    variables: { handle },
  });
  console.log(`loading: ${loading}`);
  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Typography variant="h1">Hello</Typography>
          {loading === false ? <h1>Loaded</h1> : null}
        </Layout>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: BOX_HANDLES,
  });

  const paths = data.collectionByHandle.products.edges.map((box) => ({
    params: {
      handle: box.node.handle,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { handle } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BOX_QUERY,
    variables: { handle },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Box;

import { useEffect } from 'react';
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
  let box;
  // if (loading === false) {
  //   console.log(data);
  //   box = {
  //     id: data.productByHandle.id,
  //     description: data.productByHandle.description,
  //     tags: data.productByHandle.tags,
  //     title: data.productByHandle.title,
  //     availableForSale: data.productByHandle.variants.edges[0].node.availableForSale,
  //     comparePrice: data.productByHandle.variants.edges[0].node.compareAtPriceV2.amount,
  //     price: data.productByHandle.variants.edges[0].node.priceV2.amount,
  //   };
  // }

  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout maxWidth="xl">
          {loading === false ? (
            <div>
              {/* <h1>The id is {box.id}</h1>
              <h1>The description is {box.description}</h1>
              <h1>The title is ${box.title}</h1>
              <h1>Is it available for sale? {box.availableForSale}</h1>
              <h1>The old price is ${box.comparePrice}</h1>
              <h1>The price is ${box.price}</h1> */}

              <h1>The id is {data.productByHandle.id}</h1>
              <h1>The description is {data.productByHandle.description}</h1>
              <h1>The title is ${data.productByHandle.title}</h1>
              <h1>
                Is it available for sale?{' '}
                {data.productByHandle.variants.edges[0].node.availableForSale}
              </h1>
              <h1>
                The old price is{' '}
                {data.productByHandle.variants.edges[0].node.compareAtPriceV2.amount}
              </h1>
              <h1>The price is {data.productByHandle.variants.edges[0].node.priceV2.amount}</h1>
            </div>
          ) : null}
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

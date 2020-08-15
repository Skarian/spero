import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../utils/apolloClient';
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Container } from '@material-ui/core';
import { motion } from 'framer-motion';

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
const PRODUCT_QUERY = gql`
  query ProductQuery {
    products(first: 10) {
      edges {
        node {
          variants(first: 10) {
            edges {
              node {
                id
                title
                compareAtPrice
                price
                image {
                  src
                  altText
                }
                product {
                  id
                }
              }
            }
          }
          description
        }
      }
    }
  }
`;

const Home = () => {
  const { isCartOpen, client, addProductToCart } = useContext(StoreContext);
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  console.log(data);

  let productObject;
  if (loading) {
    productObject = <h1>LOADING</h1>;
  } else {
    productObject = data.products.edges.map((product) => (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div style={{ border: '1px blue solid', margin: '8px' }}>
          <h1>{product.node.variants.edges[0].node.title}</h1>
          <h2>{product.node.description}</h2>
          <img
            src={product.node.variants.edges[0].node.image.src}
            style={{ width: '200px' }}
            alt="product"
          />
          <h1>${product.node.variants.edges[0].node.price}</h1>
          <button
            onClick={() => {
              addProductToCart(product.node.variants.edges[0].node.id);
            }}
          >
            Buy Now
          </button>
        </div>
      </motion.div>
    ));
  }
  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="sm">{productObject}</Container>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    PRODUCT_QUERY,
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

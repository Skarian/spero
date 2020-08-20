import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Container, Grid as GridBase, Typography, Chip, Paper } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreContext } from '../context/StoreContext';
import { initializeApollo } from '../utils/apolloClient';
import Cart from '../components/Cart';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { Down } from '../utils/breakpoints';

const wireframes = false;

const MainGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const TitleGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const ProductWrapperGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const ProductGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const Title = styled(Typography)`
  padding-bottom: 25px;
  &.MuiTypography-h3 {
    font-weight: 1000;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
`;
const ProductTitle = styled(Typography)`
  &.MuiTypography-h6 {
    font-weight: 700;
  }
`;
const ProductDescription = styled(Typography)`
  padding-top: 10px;
`;

const ProductCard = styled(motion.div)`
  padding: 30px;
  background-color: #f0f5ff;
  border-radius: 25px;
  max-width: 400px;
  height: 330px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 1;
`;

const ExpandedProductCard = styled(motion.div)`
  width: 80vw;
  height: 70vh;
  background-color: grey;
  position: fixed;
  /* width: 500px;
height: 200px; */
  top: 50%;
  left: 50%;
  margin-top: -30vh; /* Negative half of height. */
  margin-left: -40vw; /* Negative half of width. */
`;
const ProductImg = styled(motion.img)`
  width: 275px;
  border-radius: 25px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const TagChip = styled(Chip)`
  &.MuiChip-root {
    font-weight: 600;
    background-color: #ffdd94;
    margin-right: 2.5px;
  }
  &.MuiChip-label {
  }
`;

const BOXES_QUERY = gql`
  query Boxes {
    collectionByHandle(handle: "snackify-boxes") {
      id
      products(first: 100) {
        edges {
          node {
            title
            tags
            variants(first: 1) {
              edges {
                node {
                  id
                  image {
                    originalSrc
                  }
                  priceV2 {
                    amount
                  }
                  compareAtPriceV2 {
                    amount
                  }
                }
              }
            }
            description
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

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Boxes = () => {
  const { loading, error, data } = useQuery(BOXES_QUERY);
  const [expandedProduct, setExpandedProduct] = useState('');
  let boxData;
  if (loading === false) {
    boxData = data.collectionByHandle.products.edges.map((box) => ({
      title: box.node.title,
      description: box.node.description,
      tags: box.node.tags,
      id: box.node.variants.edges[0].node.id,
      image: box.node.variants.edges[0].node.image.originalSrc,
      price: box.node.variants.edges[0].node.priceV2.amount,
      comparePrice: box.node.variants.edges[0].node.compareAtPriceV2.amount,
    }));
    console.log(boxData);
  }

  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <MainGrid container justify="center">
            <TitleGrid item xs={12}>
              <Title align="center" variant="h3">
                Ready to Snack Boxes
              </Title>
            </TitleGrid>
            <Container maxWidth="lg">
              <motion.div variants={stagger}>
                <ProductWrapperGrid container spacing={3}>
                  {loading === false ? (
                    boxData.map((box) => (
                      <ProductGrid
                        key={box.id}
                        container
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        justify="space-around"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          variants={fadeInUp}
                        >
                          <ProductCard
                            onClick={() => {
                              setExpandedProduct(box.id);
                            }}
                          >
                            <ProductGrid item>
                              <ProductTitle align="center" variant="h6">
                                {box.title}
                              </ProductTitle>
                            </ProductGrid>
                            <ProductGrid container item justify="center">
                              <ProductImg
                                src={box.image}
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              />
                            </ProductGrid>
                            <ProductGrid container item justify="center">
                              {box.tags.length > 0
                                ? box.tags.map((tag) => <TagChip size="small" label={tag} />)
                                : null}
                            </ProductGrid>
                            <ProductGrid item>
                              <ProductDescription variant="body2">
                                {box.description}
                              </ProductDescription>
                            </ProductGrid>
                          </ProductCard>
                        </motion.div>
                        <AnimatePresence exitBeforeEnter>
                          {expandedProduct === box.id && (
                            <ExpandedProductCard
                              animate={{
                                y: 0,
                                opacity: 1,
                              }}
                              initial={{
                                y: 60,
                                opacity: 0,
                              }}
                              exit={{ opacity: 0 }}
                              key={box.id}
                            >
                              {box.title}
                              <button
                                type="button"
                                onClick={() => {
                                  setExpandedProduct();
                                }}
                              >
                                Close
                              </button>
                            </ExpandedProductCard>
                          )}
                        </AnimatePresence>
                      </ProductGrid>
                    ))
                  ) : (
                    <h1>Loading</h1>
                  )}
                </ProductWrapperGrid>
              </motion.div>
            </Container>
          </MainGrid>
        </Layout>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BOXES_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default Boxes;

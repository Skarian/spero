import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Container, Grid as GridBase } from '@material-ui/core';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { StoreContext } from '../context/StoreContext';
import { initializeApollo } from '../utils/apolloClient';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { Title } from '../components/Elements';

const wireframes = false;

const Body = styled.div`
  ${(props) =>
    props.open &&
    css`
      background: #e0e0e0;
      -webkit-transition: background-color 500ms linear;
      -ms-transition: background-color 500ms linear;
      transition: background-color 500ms linear;
    `}
`;

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
            handle
          }
        }
      }
    }
  }
`;

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Boxes = () => {
  const { loading, error, data } = useQuery(BOXES_QUERY);
  let boxData;
  if (loading === false) {
    boxData = data.collectionByHandle.products.edges.map((box) => ({
      title: box.node.title,
      description: box.node.description,
      handle: box.node.handle,
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
        <Body>
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
                          <ProductCard box={box} />
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
        </Body>
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

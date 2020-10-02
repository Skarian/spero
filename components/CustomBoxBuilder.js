import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Grid,
  CircularProgress,
  Fab as FabBase,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Title } from './Elements';
import SnackCard from './CustomBoxBuilder/SnackCard';
import { Down } from '../utils/breakpoints';
import EditIconBase from '@material-ui/icons/Edit';
import Stripes from '../public/images/stripes.png';
import ShoppingBar from '../components/CustomBoxBuilder/ShoppingBar';

const SNACK_QUERY = gql`
  query Snacks {
    collectionByHandle(handle: "snacks") {
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
                  available
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
            vendor
          }
        }
      }
    }
  }
`;

const CustomBoxBuilder = ({ options, stateHandler, state, questionID, changeQuestion }) => {
  const { loading, error, data } = useQuery(SNACK_QUERY);
  let boxData;
  if (loading === false) {
    boxData = data.collectionByHandle.products.edges.map((box) => ({
      title: box.node.title,
      description: box.node.description,
      handle: box.node.handle,
      vendor: box.node.vendor,
      tags: box.node.tags,
      id: box.node.variants.edges[0].node.id,
      image: box.node.variants.edges[0].node.image.originalSrc,
      price: box.node.variants.edges[0].node.priceV2.amount,
      available: box.node.variants.edges[0].node.available,
    }));
    console.log(boxData);
  }
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Drawer State Hook
  const [drawer, setDrawer] = useState(false);

  // Side Drawer
  const sideDrawer = (
    <div role="presentation" onClick={() => setDrawer(false)} onKeyDown={() => setDrawer(false)}>
      <div style={{ width: 500 }}>
        <h1>Hello</h1>
      </div>
    </div>
  );

  return (
    <motion.div style={{ width: '100%' }}>
      <Grid container item xs={12}>
        <ShoppingBar handleDrawer={setDrawer} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="space-between"
        alignItems="center"
        style={{ paddingBottom: '25px' }}
      >
        <Title variant="h4" style={{ paddingBottom: '0px' }}>
          Snacks
        </Title>
        <SwipeableDrawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          {sideDrawer}
        </SwipeableDrawer>
      </Grid>
      <motion.div variants={stagger}>
        <Grid container spacing={5}>
          {loading === false ? (
            boxData.map((box) => <SnackCard key={box.id} snack={box} />)
          ) : (
            <Grid container item xs={12} justify="center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CircularProgress size={100} />
              </motion.div>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </motion.div>
  );
};

// SingleSelectGroup.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   stateHandler: PropTypes.func.isRequired,
//   state: PropTypes.objectOf(PropTypes.number).isRequired,
// };

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SNACK_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default CustomBoxBuilder;

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Grid, Typography, Container } from '@material-ui/core';
import { Title } from './Elements';
import { gql, useQuery } from '@apollo/client';
import SnackCard from './CustomBoxBuilder/SnackCard';

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
  return (
    <motion.div>
      <Grid container item xs={12}>
        <Title variant="h4">Snacks</Title>
      </Grid>
      <motion.div variants={stagger}>
        <Grid container spacing={3}>
          {loading === false ? (
            boxData.map((box) => <SnackCard key={box.id} snack={box} />)
          ) : (
            <h1>Loading</h1>
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

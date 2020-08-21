import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '../../utils/apolloClient';
import Link from 'next/link';

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

const Box = () => {
  const router = useRouter();
  const { handle } = router.query;
  // const { loading, error, data } = useQuery(BOX_QUERY);
  const { loading, error, data } = useQuery(BOX_QUERY, {
    variables: { handle },
  });
  console.log(handle);
  if (loading === false) {
    console.log(data);
  }
  if (router.isFallback) {
    console.log('This is a fallback');
  }
  return (
    <div>
      {loading === false && (
        <div>
          <h1>{data.productByHandle.title}</h1>
          <h2>{data.productByHandle.description}</h2>
          <h3>{data.productByHandle.variants.edges[0].node.priceV2.amount}</h3>
        </div>
      )}
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
    fallback: true,
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

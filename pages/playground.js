import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Grid, Container } from '@material-ui/core';
import SnackCard from '../components/CustomBoxBuilder/SnackCard';

const ButtonWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 250px;
  background-color: grey;
  border-radius: 25px;
  align-items: center;
  padding: 25px;
`;

const Button = styled(motion.div)`
  height: 200px;
  width: 200px;
  background-color: orange;
  border-radius: 25px;
`;

const snack = {
  title: 'Blueberry + Pecans',
  description:
    'Naturally our sweetest flavor. Bursts of ripe blueberries, crunchy pecans, a hint of nutmeg and maple chocolate swirled together to create an exceptional bite. Ingredients: Dried Blueberries (Blueberries, Apple Juice Concentrate, Sunflower Oil), Maple Dark Chocolate (Cocoa Butter*, Cocoa Liquor*, Grade A Maple Syrup*), Pecans, Spices. *Organic',
  handle: 'blueberry-pecans',
  tags: ['GMO-Free', 'Vegan'],
  id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQ1OTUzMTgyOTM5OA==',
  image:
    'https://cdn.shopify.com/s/files/1/0462/1402/1270/products/sustainable-snacks-blueberry-pecan.png?v=1600947420',
  price: '6.99',
  available: true,
  vendor: 'Sustainable Snacks',
};

const Custom = () => {
  const [button, setButton] = useState(false);
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ButtonWrapper
            style={{ justifyContent: button ? 'flex-end' : 'flex-start' }}
            onClick={() => {
              setButton(!button);
            }}
          >
            <Button layout transition={{ duration: 0.5 }} />
          </ButtonWrapper>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
          <SnackCard snack={snack} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Custom;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIconBase from '@material-ui/icons/Edit';
import { Up, Down } from '../../utils/breakpoints';

const MainBar = styled.div`
  margin-top: 20px;
  height: auto;
  width: 100%;
  background: #587391;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 8px dashed #cadaf9;
`;

const Title = styled(Typography)`
  &.MuiTypography-h3 {
    font-weight: 750;
    color: #bde8ff;
  }
  ${Down.lg`
  display: none;
`}
`;

const SmallerTitle = styled(Typography)`
  &.MuiTypography-h4 {
    font-weight: 750;
    color: #bde8ff;
  }
  ${Up.lg`
    display: none;
  `}
  ${Down.md`
  display: none;
`}
`;

const SubtotalCard = styled.div`
  background: #9b9999;
  border-radius: 8px;
  width: 130px;
  height: 90px;
`;

const SubtotalCardText = styled(Typography)`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  &.MuiTypography-h6 {
    font-weight: 500;
    color: #fff;
  }
  &.MuiTypography-body1 {
    font-weight: 500;
    color: #ffadad;
  }
`;
const IconCard = styled(motion.div)`
  border-radius: 8px;
  width: 90px;
  height: 90px;
  cursor: pointer;
  &.pay {
    background: #3bd6af;
  }
  &.edit {
    background: #ffadad;
  }
`;

const CartIcon = styled(ShoppingCartIcon)`
  &.MuiSvgIcon-root {
    font-size: 3rem;
    display: block;
    margin: auto;
  }
  color: #ffffff;
`;
const EditIcon = styled(EditIconBase)`
  &.MuiSvgIcon-root {
    font-size: 3rem;
    display: block;
    margin: auto;
  }
  color: #ffffff;
`;

const CustomBoxBuilder = ({ handleDrawer }) => {
  // Drawer State Hook
  const [drawer, setDrawer] = useState(false);
  return (
    <MainBar>
      <Grid container alignItems="center" justify="space-evenly">
        <Grid item>
          <Title variant="h3">Design Your Care Package</Title>
          <SmallerTitle variant="h4">Design Your Care Package</SmallerTitle>
        </Grid>
        <Grid item>
          <SubtotalCard>
            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <Grid item xs={12}>
                <SubtotalCardText variant="h6" align="center">
                  {' '}
                  Subtotal:
                </SubtotalCardText>
              </Grid>
              <Grid item xs={12}>
                <SubtotalCardText variant="h6" align="center">
                  {' '}
                  $28.79
                </SubtotalCardText>
              </Grid>
              <Grid item xs={12}>
                <SubtotalCardText variant="body1" align="center">
                  {' '}
                  Min: $30
                </SubtotalCardText>
              </Grid>
            </Grid>
          </SubtotalCard>
        </Grid>
        <Grid item>
          <IconCard className="pay" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <Grid item xs={12}>
                <CartIcon />
              </Grid>
              <Grid item xs={12}>
                <SubtotalCardText variant="h6" align="center">
                  PAY
                </SubtotalCardText>
              </Grid>
            </Grid>
          </IconCard>
        </Grid>
        <Grid item>
          <IconCard
            className="edit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleDrawer(true);
            }}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <Grid item xs={12}>
                <EditIcon />
              </Grid>
              <Grid item xs={12}>
                <SubtotalCardText variant="h6" align="center">
                  EDIT
                </SubtotalCardText>
              </Grid>
            </Grid>
          </IconCard>
        </Grid>
      </Grid>
    </MainBar>
  );
};

// SingleSelectGroup.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   stateHandler: PropTypes.func.isRequired,
//   state: PropTypes.objectOf(PropTypes.number).isRequired,
// };

export default CustomBoxBuilder;

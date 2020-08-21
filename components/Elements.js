import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Title = styled(Typography)`
  padding-bottom: 25px;
  opacity: ${(props) => (props.open ? '0.1' : '1')};
  transition: ${(props) => (props.open ? 'opacity .25s ease-in-out' : '')};
  -moz-transition: ${(props) => (props.open ? 'opacity .25s ease-in-out' : '')};
  -webkit-transition: ${(props) => (props.open ? 'opacity .25s ease-in-out' : '')};
  &.MuiTypography-h3 {
    font-weight: 1000;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
`;

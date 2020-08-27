import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Title = styled(Typography)`
  padding-bottom: 25px;
  &.MuiTypography-h3 {
    font-weight: 1000;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  mark {
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 15%,
      #faad13 15%,
      #faad13 30%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

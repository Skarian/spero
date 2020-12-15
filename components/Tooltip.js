import React, { Fragment } from 'react';
import { Tooltip as MuiTooltip, Typography, Fade } from '@material-ui/core';
import styled from 'styled-components';

const StyledTooltip = styled((props) => (
  <MuiTooltip classes={{ popper: props.className, tooltip: 'tooltip' }} {...props} />
))`
  & .tooltip {
    background-color: white;
    color: #000;
    font-size: 14px;
    border: 1px solid #dadde9;
    transform: translateZ(0);
  }
`;

const Title = styled(Typography)`
  &.MuiTypography-h5 {
    font-weight: 700;
  }
`;

const Tooltip = ({ title, body, children }) => (
  <StyledTooltip
    title={(
      <>
        <Title variant="h5" color="inherit">
          {title}
        </Title>
        {body}
      </>
      )}
    disableFocusListener
    disableTouchListener
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    enterDelay={300}
    leaveDelay={150}
  >
    {children}
  </StyledTooltip>
);

export default Tooltip;

import React from 'react';
import { StepLabel, Stepper, Step } from '@material-ui/core';
import styled from 'styled-components';
import { Down, useViewport } from '../utils/breakpoints';

const Root = styled.div`
  width: 100%;
  ${Down.sm`
  display: flex;
  justify-content: center;

`}
`;

const StyledStepper = styled(Stepper)`
  &.MuiPaper-root {
    background-color: #ffffff00;
  }
`;

const HorizontalLinearStepper = ({ stepNumber }) => {
  const viewport = useViewport();
  console.log(viewport.currentSize);
  const steps =
    viewport.currentSize === 'xs'
      ? ['Start', 'Design', 'Pay', 'Gift']
      : ['Getting Started', 'Design your care package', 'Payment Details', 'Setup your gift page'];
  return (
    <Root>
      <StyledStepper
        activeStep={stepNumber}
        // orientation={viewport.currentSize === 'xs' ? 'vertical' : 'horizontal'}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
    </Root>
  );
};

export default HorizontalLinearStepper;

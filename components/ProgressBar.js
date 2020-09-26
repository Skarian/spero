// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function LinearProgressWithLabel(props) {
//   return (
//     <Box display="flex" alignItems="center">
//       <Box width="100%" mr={1}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box minWidth={35}>
//         <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate and buffer variants.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
// });

// export default function LinearWithValueLabel({ value }) {
//   const classes = useStyles();
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className={classes.root}>
//       <LinearProgressWithLabel value={value} />
//     </div>
//   );
// }
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
`;

const StyledStepper = styled(Stepper)`
  &.MuiPaper-root {
    background-color: #ffffff00;
  }
`;
const HorizontalLinearStepper = ({ stepNumber }) => {
  const steps = [
    'Getting Started',
    'Design your care package',
    'Payment Details',
    'Setup your gift page',
  ];

  return (
    <Root>
      <StyledStepper activeStep={stepNumber}>
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

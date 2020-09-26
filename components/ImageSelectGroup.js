import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Grid } from '@material-ui/core';
import ImageSelect from './ImageSelect';

const ImageSelectGroup = ({ options, stateHandler, state, questionID, changeQuestion }) => {
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <motion.div variants={stagger}>
      <Grid container>
        {options.map((option) => {
          let selectionBool = false;
          if (state[questionID] !== null) {
            if (state[questionID].selectedOptionID === option.id) {
              selectionBool = true;
            }
          }
          return (
            <ImageSelect
              key={option.id}
              option={option}
              stateHandler={stateHandler}
              isSelected={selectionBool}
              questionID={questionID}
              changeQuestion={changeQuestion}
            >
              {option.content}
            </ImageSelect>
          );
        })}
      </Grid>
    </motion.div>
  );
};

// SingleSelectGroup.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   stateHandler: PropTypes.func.isRequired,
//   state: PropTypes.objectOf(PropTypes.number).isRequired,
// };

export default ImageSelectGroup;

import PropTypes from 'prop-types';
import SingleSelect from './SingleSelect';

const SingleSelectGroup = ({
  options, stateHandler, state, questionID,
}) => (
  <div>
    {options.map((option) => {
      let selectionBool = false;
      if (state[questionID] !== null) {
        if (state[questionID].selectedOptionID === option.id) {
          selectionBool = true;
        }
      }
      return (
        <SingleSelect
          key={option.id}
          option={option}
          stateHandler={stateHandler}
          isSelected={selectionBool}
          questionID={questionID}
        >
          {option.content}
        </SingleSelect>
      );
    })}
  </div>
);

// SingleSelectGroup.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   stateHandler: PropTypes.func.isRequired,
//   state: PropTypes.objectOf(PropTypes.number).isRequired,
// };

export default SingleSelectGroup;

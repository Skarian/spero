import styled from 'styled-components';
import CheckIconBase from '@material-ui/icons/Check';
import { motion } from 'framer-motion';
import { Button } from '@material-ui/core';
import { Up, Down } from '../utils/breakpoints';

const SingleSelectBox = styled.div`
  margin-bottom: 8px;
  background-color: rgba(39, 39, 39, 0.1);
  box-shadow: rgba(39, 39, 39, 0.6) 0px 0px 0px 1px inset;
  cursor: pointer;
  border-radius: 10px;
  padding: 14px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 200px;
  width: 40vw;
  text-align: center;
  display: flex;
  justify-content: space-between;
  border: hidden;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  ${Down.lg`
  width: 60vw;
`}
  ${Down.md`
  width: 80vw;
`}
  &:hover {
    background-color: rgba(39, 39, 39, 0.3);
    -webkit-transition: background-color 250ms linear;
    -ms-transition: background-color 250ms linear;
    transition: background-color 250ms linear;
  }
  &.selected {
    background-color: rgba(0, 128, 0, 0.3);
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const CheckIcon = styled(CheckIconBase)`
  justify-self: flex-end;
`;

const SingleSelect = ({
  children, isSelected, stateHandler, questionID, option,
}) => (
  <SingleSelectBox
    className={isSelected ? 'selected' : 'none'}
    onTouchStart={() => {
      stateHandler((prevState) => ({
        ...prevState,
        [questionID]: {
          selectedOptionContent: option.content,
          selectedOptionID: option.id,
        },
      }));
    }}
    onClick={() => {
      stateHandler((prevState) => ({
        ...prevState,
        [questionID]: {
          selectedOptionContent: option.content,
          selectedOptionID: option.id,
        },
      }));
    }}
  >
    {children}
    {isSelected ? (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CheckIcon fontSize="small" style={{ fontSize: '1.0em' }} />
      </motion.div>
    ) : null}
  </SingleSelectBox>
);

export default SingleSelect;

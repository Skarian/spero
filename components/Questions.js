import { Grid as GridBase, Typography } from '@material-ui/core';
import styled from 'styled-components';
import SingleSelectGroup from './SingleSelectGroup';
import { Down } from '../utils/breakpoints';

const HeroMainGrid = styled(GridBase)`
  height: 100%;
`;

const H3 = styled(Typography)`
  padding-bottom: 4rem;
`;

const Grid = styled(GridBase)``;
const SelectionAreaGrid = styled(GridBase)`
  ${Down.md`
  justify-content: center;
`}
`;

export const OrderTypeQuestion = ({ stateHandler, state, questionID }) => (
  <>
    <HeroMainGrid container alignContent="center">
      {/* Question 1 */}
      <Grid xs={12} item>
        <H3 variant="h3">
          1.
          <b> Who </b>
          are you buying this for today?
        </H3>
      </Grid>
      <SelectionAreaGrid container item>
        <SingleSelectGroup
          questionID={questionID}
          options={[
            {
              id: 1,
              content: 'Myself',
            },
            {
              id: 2,
              content: 'Yourself',
            },
          ]}
          stateHandler={stateHandler}
          state={state}
        />
      </SelectionAreaGrid>
    </HeroMainGrid>
  </>
);

export const CustomBoxQuestion = ({ stateHandler, state, questionID }) => (
  <>
    <HeroMainGrid container alignContent="center">
      <Grid xs={12} item>
        <H3 variant="h3">
          2.
          <b> Why </b>
          are you buying this for today?
        </H3>
      </Grid>
      <SelectionAreaGrid container item>
        <SingleSelectGroup
          questionID={questionID}
          options={[
            {
              id: 1,
              content: 'Just Cause I want to',
            },
            {
              id: 2,
              content: 'Cause Snacks are Awesome',
            },
          ]}
          stateHandler={stateHandler}
          state={state}
        />
      </SelectionAreaGrid>
    </HeroMainGrid>
  </>
);

export const CustomizationQuestion = () => <div>Question 3</div>;
export const DetailsQuestion = () => <div>Question 4</div>;

import { Grid as GridBase, Typography, Fab as FabBase } from '@material-ui/core';
import styled from 'styled-components';
import SingleSelectGroup from './SingleSelectGroup';
import { Up, Down } from '../utils/breakpoints';
import ImageSelectGroup from './ImageSelectGroup';
import CustomBoxImg from '../assets/Customers.png';
import PremadeBoxImg from '../assets/Employees.png';
import { Title } from './Elements';
import CustomBoxBuilder from './CustomBoxBuilder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { red } from '@material-ui/core/colors';

const HeroMainGrid = styled(GridBase)`
  height: 100%;
`;

const H3 = styled(Typography)`
  padding-bottom: 5rem;
`;

const Grid = styled(GridBase)``;
const SelectionAreaGrid = styled(GridBase)`
  ${Down.md`
  justify-content: center;
`}
`;

const Fab = styled(FabBase)`
  &.MuiFab-root {
    margin: 0;
    top: auto;
    right: 30px;
    top: 200px;
    left: auto;
    position: fixed;
    width: 72px;
    height: 72px;
    line-height: 1.5;
  }
  ${Down.md`
top: unset !important;
top: auto;
bottom: 20px;
`}
`;

const CustomBoxTitle = styled(Typography)`
  padding-bottom: 25px;
  ${Up.md`
  display: none
`}
  &.MuiTypography-h3 {
    font-weight: 1000;
    margin-block-start: 1em;
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

export const OrderTypeQuestion = ({ stateHandler, state, questionID }) => (
  <>
    <HeroMainGrid container alignContent="center">
      {/* Question 1 */}
      <Grid xs={12} item>
        <H3 variant="h3">
          1.
          <b> Who </b>
          is this care package for?
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

export const CustomBoxQuestion = ({ stateHandler, state, questionID, changeQuestion }) => (
  <>
    <HeroMainGrid container alignContent="center">
      <Grid xs={12} container item justify="center">
        <CustomBoxTitle variant="h3" align="center">
          <mark>Design</mark> your care package
        </CustomBoxTitle>
      </Grid>
      <SelectionAreaGrid container item>
        <CustomBoxBuilder
          questionID={questionID}
          stateHandler={stateHandler}
          state={state}
          changeQuestion={changeQuestion}
        />
      </SelectionAreaGrid>
    </HeroMainGrid>
  </>
);

export const WhoQuestion = ({ stateHandler, state, questionID, changeQuestion }) => (
  <>
    <HeroMainGrid container alignContent="center">
      {/* Question 1 */}
      <Grid xs={12} item>
        <Title variant="h3" align="center">
          <mark>Who</mark> is this care package for?
        </Title>
      </Grid>
      <SelectionAreaGrid container item>
        <ImageSelectGroup
          questionID={questionID}
          options={[
            {
              id: 1,
              content: 'Team',
              description: 'Congratulate a team member on a job well done!',
              color: '#FFADAD',
              image: CustomBoxImg,
            },
            {
              id: 2,
              content: 'Friend',
              description: 'Show the homies some love!',
              color: '#FDFFB6',
              image: PremadeBoxImg,
            },
            {
              id: 3,
              content: 'Me',
              description: 'Treat yo self with a bundle of goodies!',
              color: '#BDB2FF',
              image: PremadeBoxImg,
            },
          ]}
          stateHandler={stateHandler}
          state={state}
          changeQuestion={changeQuestion}
        />
      </SelectionAreaGrid>
    </HeroMainGrid>
  </>
);

export const CustomizationQuestion = () => <div>Question 3</div>;
export const DetailsQuestion = () => <div>Question 4</div>;

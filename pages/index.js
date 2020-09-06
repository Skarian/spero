import Head from 'next/head';
import {
  Grid as GridBase,
  Typography,
  Chip,
  Button as ButtonBase,
  Tooltip as MuiTooltip,
  Fade,
  Zoom,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Title } from '../components/Elements';
import Box from '../assets/box.svg';
import SnackImage from '../public/images/goldfish.svg';
import CustomNoteImg from '../public/images/letter-wide.svg';
import { Up, Down } from '../utils/breakpoints';
import Tooltip from '../components/Tooltip';

// Turns wireframes for grids on and off for debugging layout
const wireframes = false;

// Styled-Components
const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;

// Hero Images Section Styling
const ImageGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 70vh;
  min-height: 650px;
  padding-top: 25px;
  background-color: #def4ff;
  ${Down.md`
  height: 90vh;
  min-height: 900px;
  padding-top: 50px;
`}
`;
const ImagesTopGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 55%;
  ${Down.md`
  justify-content: center;
  height: 70%;
`};
  ${Up.md`
  justify-content: space-evenly
`};
`;
const SnackGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const ImageList = styled(motion.div)`
  border: ${wireframes ? '1px solid red' : 'none'};
  display: flex;
  height: 80%;
`;
const SnackIMG = styled(motion.img)`
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 100%;
`;
const SubtitleGrid = styled(GridBase)`
  height: 20%;
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const Subtitle = styled(Typography)`
  &.MuiTypography-h5 {
    font-weight: 700;
    color: #535353;
  }
`;
const PlusGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  font-weight: bold;
  font-size: 48px;
  line-height: 44px;
  color: #878787;
`;
const Plus = styled(Typography)`
  &.MuiTypography-h2 {
    font-weight: 700;
  }
`;
const NoteGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const CustomNoteGrid = styled(GridBase)`
  height: 80%;
  border: ${wireframes ? '1px solid red' : 'none'};
`;
const CustomNote = styled(motion.img)`
  cursor: pointer;
  ${Down.lg`
  max-width: 200px;
   width: 100%;
`};
  ${Up.lg`
  max-width: 350px;
  width: 100%
`};
`;
const ImagesBottomGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 45%;
  ${Down.md`
  height: 30%;
`}
`;
const BoxIMG = styled(motion.img)`
  width: 90%;
  z-index: 100;
  ${Down.md`
  : 30%;
`}
`;

// Hero Description Styling
const DescriptionGrid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  height: 70vh;
  min-height: 650px;
  background-color: #def4ff;
  padding: 120px;
  ${Down.lg`
        padding: 50px;
      `}
  ${Down.md`
        padding: 20px;
        height: 50vh;
        min-height: 500px;
      `}
`;
const Card = styled(motion.div)`
  background-color: #fff0cf;
  padding: 40px;
  border-radius: 32px;
`;
const Product = styled(Typography)`
  &.MuiTypography-h3 {
    font-weight: 700;
    ${Down.lg`
        font-size: 2rem
      `}
    ${Down.lg`
        font-size: 1.75rem
      `}
  }
  padding-bottom: 35px;
`;
const Description = styled(Typography)`
  &.MuiTypography-h5 {
    font-weight: 400;
    ${Down.md`
        margin-right: 0px;
      `}
  }
  padding-bottom: 35px;
`;
const TagList = styled.div`
  padding-bottom: 45px;
`;
const Tag = styled(Chip)`
  &.MuiChip-root {
    font-weight: 600;
    background-color: #ffc853;
    margin-right: 15px;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 700;
    ${Down.md`
        font-size: 11px;
        padding-right: 0px;
    padding-left: 0px;
    height: 24px;
      `}
  }
`;
const PriceList = styled.div`
  padding-bottom: 45px;
`;
const Price = styled(Typography)`
  ${(props) =>
    props.type &&
    css`
      &.MuiTypography-h4 {
        font-weight: ${props.type === 'final' ? '500' : '300'};
        text-decoration: ${props.type === 'final' ? 'none' : 'line-through'};
      }
      padding-right: ${props.type === 'final' ? '15px' : ''};
    `}
`;
const BuyButton = styled(ButtonBase)`
  &.MuiButton-contained {
    background-color: #80f299;
    &:hover {
      background-color: #5dee7d;
    }
  }
  &.MuiButton-root {
    border-radius: 12px;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 25px;
    line-height: 29px;
  }
`;

// Animation Settings
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 300,
    opacity: 0,
    scale: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    rotate: 360,
    transition: {
      duration: 2,
      ease: easing,
      // repeat: Infinity,
    },
  },
};

const Home = () => {
  const imgArray = [
    {
      src: SnackImage,
      id: 1,
      label: {
        title: 'Snack One',
        description: 'This is a body of a snack description',
      },
    },
    {
      src: SnackImage,
      id: 2,
      label: {
        title: 'Snack Two',
        description: 'This is a body of a snack description',
      },
    },
    {
      src: SnackImage,
      id: 3,
      label: {
        title: 'Snack Three',
        description: 'This is a body of a snack description',
      },
    },
    {
      src: SnackImage,
      id: 4,
      label: {
        title: 'Snack Four',
        description: 'This is a body of a snack description',
      },
    },
    {
      src: SnackImage,
      id: 5,
      label: {
        title: 'Snack Five',
        description: 'This is a body of a snack description',
      },
    },
    {
      src: SnackImage,
      id: 6,
      label: {
        title: 'Snack Six',
        description: 'This is a body of a snack description',
      },
    },
  ];
  return (
    <div>
      <Head>
        <title>Snackify, the easiest way to send snacks.</title>
        <link rel="icon" href="../assets/favicon.ico" />
      </Head>
      <main>
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
          <Title align="center" variant="h3">
            The <mark>simplest</mark> way to send snacks. Period.
          </Title>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
            <Grid container>
              <ImageGrid container item xs={12} md={6} justify="center" alignItems="center">
                <ImagesTopGrid container item xs={12}>
                  <SnackGrid container item xs={12} md={4} alignItems="flex-end" justify="center">
                    <ImageList variants={stagger}>
                      <Grid container>
                        {imgArray.map((img) => (
                          <Grid
                            container
                            justify="center"
                            item
                            xs={4}
                            style={{ height: '50%' }}
                            key={img.id}
                          >
                            <Tooltip title={img.label.title} body={img.label.description}>
                              <SnackIMG
                                src={img.src}
                                whileHover={{
                                  scale: 1.1,
                                }}
                                whileTap={{ scale: 0.9 }}
                                variants={fadeInUp}
                              />
                            </Tooltip>
                          </Grid>
                        ))}
                      </Grid>
                    </ImageList>
                    <SubtitleGrid container item justify="center" alignContent="center">
                      <Subtitle variant="h5" align="center">
                        6 Delicious Snacks
                      </Subtitle>
                    </SubtitleGrid>
                  </SnackGrid>
                  <PlusGrid container item xs={12} md={1} justify="center" alignContent="center">
                    <Plus variant="h2">+</Plus>
                  </PlusGrid>
                  <NoteGrid container item xs={12} md={4} alignItems="flex-end">
                    <CustomNoteGrid container item justify="center" alignContent="center">
                      <Tooltip
                        title="Custom Note"
                        body="Add a note to include a personal touch with your Snackify care package"
                      >
                        <CustomNote
                          src={CustomNoteImg}
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{ scale: 0.9 }}
                        />
                      </Tooltip>
                    </CustomNoteGrid>
                    <SubtitleGrid container item justify="center" alignContent="center">
                      <Subtitle variant="h5" align="center">
                        Custom Note
                      </Subtitle>
                    </SubtitleGrid>
                  </NoteGrid>
                </ImagesTopGrid>
                <ImagesBottomGrid
                  container
                  item
                  direction="row"
                  xs={12}
                  justify="center"
                  alignItems="center"
                >
                  <BoxIMG
                    src={Box}
                    alt="carboard box"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                  />
                </ImagesBottomGrid>
              </ImageGrid>
              <DescriptionGrid
                container
                item
                md={6}
                xs={12}
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Card
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Product variant="h3" align="left">
                    The "WFH" Care Package
                  </Product>
                  <Description variant="h5">
                    Delicious snacks plus a personal note makes the perfect pick-me-up
                  </Description>
                  <TagList>
                    <Tooltip
                      title="Free 5 day shipping"
                      body="Every care package includes free shipping"
                    >
                      <Tag size="medium" label="Free Shipping" />
                    </Tooltip>
                    <Tag size="medium" label="Healthy" />
                    <Tag size="medium" label="Energy Boost" />
                  </TagList>

                  <PriceList>
                    <Price display="inline" variant="h4" type="final">
                      $12.99
                    </Price>
                    <Price display="inline" variant="h4" type="compare">
                      $30.00
                    </Price>
                  </PriceList>
                  <BuyButton variant="contained">Send Snacks</BuyButton>
                </Card>
              </DescriptionGrid>
            </Grid>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;

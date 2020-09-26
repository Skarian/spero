import React, { useState } from 'react';
import {
  Card as CardBase,
  CardHeader,
  CardMedia as CardMediaBase,
  CardContent as CardContentBase,
  Grid,
  Typography,
  Button as ButtonBase,
  Chip,
} from '@material-ui/core';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Colors source: https://coolors.co/ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-bdb2ff-ffc6ff-fffffc
const tagColorPicker = (color) => {
  switch (color) {
    case 'GMO-Free':
      return '#ffadad';
      break;
    case 'Vegan':
      return '#ffd6a5';
      break;
    case 'Keto':
      return '#FDFFB6';
      break;
    case 'Gluten-free':
      return '#caffbf';
      break;
    case 'Dairy-free':
      return '#9bf6ff';
      break;
  }
};

console.log(tagColorPicker('Vegan'));

const Image = styled.img`
  height: 300px;
  width: auto;
`;

const Card = styled(CardBase)`
  width: 250px;
  height: 100%;
`;

const Title = styled(Typography)`
  &.MuiTypography-h6 {
    font-weight: 750;
  }
`;

const Description = styled(Typography)`
  &.MuiTypography-body2 {
    font-weight: 750;
  }
  padding-bottom: 10px;
`;
const Price = styled(Typography)`
  &.MuiTypography-body1 {
    font-weight: 500;
  }
  padding-bottom: 10px;
`;

const CardContent = styled(CardContentBase)`
  &.MuiCardContent-root {
  }
`;
const ImageGrid = styled(Grid)`
  height: 300px;
  width: 250px;
`;
const BuyButton = styled(ButtonBase)`
  &.MuiButton-root {
    width: 90%;
  }
`;
const TagChip = styled(Chip)`
  &.MuiChip-root {
    font-weight: 500;
    background-color: #ffdd94;
    margin-right: 2.5px;
    font-size: 0.7rem;
  ${(props) =>
    props.tagcolor &&
    css`
      background-color: ${props.tagcolor};
    `}
  }
  }
`;
const TagContainer = styled.div`
  padding-bottom: 25px;
  ${(props) =>
    props.length === 0 &&
    css`
      height: 50px;
    `}
`;

const SnackCard = ({ snack }) => {
  const easing = [0.6, -0.05, 0.01, 0.99];

  // const fadeInUp = {
  //   initial: {
  //     y: 60,
  //     opacity: 0,
  //   },
  //   animate: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.6,
  //       ease: easing,
  //     },
  //   },
  // };
  const [ref, inView] = useInView({
    rootMargin: '-100px 0px',
    triggerOnce: false,
  });

  const { title, description, handle, tags, id, image, price, available, vendor } = snack;
  return (
    <Grid container item xl={3} lg={4} md={6} sm={6} justify="center">
      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        ref={ref}
        initial={{
          y: 60,
          opacity: 0,
        }}
        animate={{
          y: inView ? 0 : 60,
          opacity: inView ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: easing,
        }}
      >
        <Card elevation={1}>
          <ImageGrid container item justify="center">
            <Image src={image} />
          </ImageGrid>
          <CardContent>
            <Title variant="h6" noWrap="true">
              {title
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </Title>
            <Description variant="body2" color="textSecondary" component="p" gutterbottom>
              {vendor}
            </Description>
            <Price variant="body1" color="textSecondary" component="p" gutterbottom>
              ${price}
            </Price>
            <TagContainer length={tags.length}>
              {tags.length > 0
                ? tags.slice(0, 3).map((tag) => {
                    const tagColor = tagColorPicker(tag);
                    console.log(tagColor);
                    return <TagChip key={tag} size="small" label={tag} tagcolor={tagColor} />;
                  })
                : null}
            </TagContainer>
            <Grid container item justify="center">
              <BuyButton variant="outlined" color="primary" align="">
                Add
              </BuyButton>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default SnackCard;

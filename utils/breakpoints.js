// Example below
// import { Up, Down } from "../src/breakpoints.js"
// const DescriptionBlock = styled.div`
//   ${Down.md`
//   height: 35%;
//   width: 100%;
//   justify-content: space-around;
//   align-items: center;
// `}

import { css } from 'styled-components';
import { useState, useEffect } from 'react';

const size = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const Up = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const Down = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  let currentSize;

  if (width >= size.xl) {
    currentSize = 'xl';
  } else if (width >= size.lg) {
    currentSize = 'lg';
  } else if (width >= size.md) {
    currentSize = 'md';
  } else if (width >= size.sm) {
    currentSize = 'sm';
  } else {
    currentSize = 'xs';
  }
  return { currentSize };
};

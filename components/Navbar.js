/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Button,
  ButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import styled from 'styled-components';
import { useViewportScroll } from 'framer-motion';
import LogoImg from '../public/images/logo-light.png';

const Root = styled.div`
  padding-bottom: 72px;
`;

const AppBar = styled(MuiAppBar)`
  &.MuiPaper-elevation1 {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Toolbar = styled(MuiToolbar)`
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
  &:hover {
    opacity: 0.7;
  }
`;

const MenuButton = styled(IconButton)`
  fill: rgba(0, 0, 0, 0.7);
`;

// Inline Styling Override
const btnGroupStyle = {
  borderRight: 'none',
  textTransform: 'none',
  backgroundColor: 'transparent',
};

const MenuText = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  opacity: 0.5;
  &:hover {
    transition: opacity 0.14159s;
    transition-property: opacity;
    transition-duration: 0.14159s;
    transition-timing-function: ease;
    transition-delay: 0s;
    opacity: 0.7;
  }
`;

// Navbar Component Initialization | Default Export
const Navbar = () => {
  const { scrollY } = useViewportScroll();

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    scrollY.onChange((y) => {
      setIsScrolling(y > 1);
    });
  });

  // Drawer State Hook
  const [drawer, setDrawer] = useState(false);

  // Pages Array
  const pages = [
    [0, 'Home', <HomeIcon />, '/boxes'],
    [1, 'Jobs', <FindInPageIcon />, '/'],
    [2, 'Trainer', <BuildIcon />, '/'],
    [3, 'About', <CreateIcon />, '/'],
  ];

  // Side Drawer
  const sideDrawer = (
    <div role="presentation" onClick={() => setDrawer(false)} onKeyDown={() => setDrawer(false)}>
      <List>
        {pages.map((page) => (
          <ListItem button key={page[0]}>
            <ListItemIcon>{page[2]}</ListItemIcon>
            <ListItemText primary={page[1]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Root>
      <AppBar position="fixed" color="inherit" elevation={isScrolling ? 1 : 0}>
        <Container maxWidth="lg">
          <Toolbar>
            <Drawer anchor="top" open={drawer} onClose={() => setDrawer(false)}>
              {sideDrawer}
            </Drawer>

            <Link href="/">
              <Logo src={LogoImg} />
            </Link>
            <Hidden xsDown>
              <ButtonGroup disableRipple variant="text" orientation="horizontal">
                {pages.map((page) => (
                  <Button disableFocusRipple key={page[0]} style={btnGroupStyle}>
                    <Link href={`${page[3]}`}>
                      <MenuText>{page[1]}</MenuText>
                    </Link>
                  </Button>
                ))}
              </ButtonGroup>
            </Hidden>

            <Hidden smUp>
              <MenuButton edge="end" aria-label="menu" onClick={() => setDrawer(true)}>
                <MenuIcon />
              </MenuButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </Root>
  );
};

export default Navbar;

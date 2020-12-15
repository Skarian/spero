/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import styled from 'styled-components';
import { useViewportScroll, motion, AnimateSharedLayout } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Root = styled.div`
  margin-bottom: 72px;
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

const Logo = styled.div`
  height: 40px;
  width: 163px;
  &:hover {
    opacity: 0.7;
  }
`;

const MenuButton = styled(IconButton)`
  fill: rgba(0, 0, 0, 0.7);
`;

const ButtonGroup = styled(MuiButtonGroup)`
  .MuiButtonGroup-groupedTextHorizontal:not(:last-child) {
    border-right: none;
    padding-right: 15px;
    padding-left: 15px;
  }
`;

const Button = styled(MuiButton)``;

const MenuText = styled.h1`
  font-size: 1.3rem;
  font-weight: 500;
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

const Underline = styled(motion.div)`
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  border-bottom: 5px solid lightgreen;
  border-radius: 0%;
`;

// Navbar Component Initialization | Default Export
const Navbar = () => {
  const router = useRouter();
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
    [0, 'Home', <HomeIcon />, '/'],
    [1, 'Shop', <FindInPageIcon />, '/shop'],
    [2, 'About', <BuildIcon />, '/about'],
    [3, 'Tracking', <CreateIcon />, '/tracking'],
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

  // Underline State Hook
  const [underline, setUnderline] = useState(0);

  return (
    <Root>
      <AppBar position="fixed" color="inherit" elevation={isScrolling ? 1 : 0}>
        <Toolbar>
          <Drawer anchor="top" open={drawer} onClose={() => setDrawer(false)}>
            {sideDrawer}
          </Drawer>

          <Link href="/">
            <Logo>
              <Image
                src="/images/logo.png"
                alt="Spero logo, a small green bird"
                layout="responsive"
                width={253}
                height={62}
              />
            </Logo>
          </Link>
          <Hidden smDown>
            <AnimateSharedLayout>
              <ButtonGroup variant="text" orientation="horizontal">
                {pages.map((page) => (
                  <Button
                    disableFocusRipple
                    key={page[0]}
                    onClick={() => {
                      setUnderline(page[0]);
                    }}
                  >
                    <Link href={`${page[3]}`}>
                      <MenuText>{page[1]}</MenuText>
                    </Link>
                    {/* {underline === page[0] && (
                      <Underline
                        layoutId="outline"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )} */}
                    {router.pathname === page[3] && (
                      <Underline
                        layoutId="outline"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                ))}
              </ButtonGroup>
            </AnimateSharedLayout>
          </Hidden>

          <Hidden mdUp>
            <MenuButton edge="end" aria-label="menu" onClick={() => setDrawer(true)}>
              <MenuIcon />
            </MenuButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default Navbar;

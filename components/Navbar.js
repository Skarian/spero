import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Button as MuiButton,
  ButtonGroup,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Container,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import styled from 'styled-components';
import LogoImg from '../public/images/logo-light.png';

const Root = styled.div`
  margin-bottom: 72px;
`;

const AppBar = styled(MuiAppBar)`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.07),
    0px 1px 10px 0px rgba(0, 0, 0, 0.06);
`;

const Toolbar = styled(MuiToolbar)`
  padding-left: 0;
  padding-right: 0;
  min-height: 72px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
`;

const MenuButton = styled(IconButton)`
  fill: rgba(0, 0, 0, 0.7);
`;

// Inline Styling Override
const btnGroupStyle = {
  borderRight: 'none',
  textTransform: 'none',
};

// Navbar Component Initialization | Default Export
const Navbar = () => {
  // Drawer State Hook
  const [drawer, setDrawer] = useState(false);

  // Pages Array
  const pages = [
    [0, 'Home', <HomeIcon />, '/'],
    [1, 'Jobs', <FindInPageIcon />, '/dashboard'],
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
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="lg">
          <Toolbar>
            <Drawer anchor="top" open={drawer} onClose={() => setDrawer(false)}>
              {sideDrawer}
            </Drawer>

            <Logo src={LogoImg} />
            <Hidden xsDown>
              <ButtonGroup variant="text" orientation="horizontal">
                {pages.map((page) => (
                  <MuiButton key={page[0]} style={btnGroupStyle}>
                    <Link href={`${page[3]}`}>
                      <Typography variant="body1">{page[1]}</Typography>
                    </Link>
                  </MuiButton>
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

import React from 'react';
import { makeStyles, AppBar, Toolbar, Container } from '@material-ui/core';

import { Logo } from './Logo';
import { Favorites } from './Favorites';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.common.white,
    boxShadow: 'none',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  container: {
    padding: 0,
  },
  toolbar: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      minHeight: '74px',
    },
  },
  logo: {
    flex: 1,
  },
}));

export const Header: React.FC = () => {
  const s = useStyles();

  return (
    <AppBar className={s.appBar} position="fixed">
      <Container className={s.container}>
        <Toolbar className={s.toolbar}>
          <Logo className={s.logo} />
          <Favorites />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

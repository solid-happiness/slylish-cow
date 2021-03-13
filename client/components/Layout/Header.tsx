import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Container,
  Typography,
} from '@material-ui/core';

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
    [theme.breakpoints.up('sm')]: {
      minHeight: '74px',
    },
  },
  logo: {
    width: '90px',
    height: 'auto',
    pointerEvents: 'none',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: '3px',
    color: theme.palette.common.black,
  },
}));

export const Header: React.FC = () => {
  const s = useStyles();

  return (
    <AppBar className={s.appBar} position="static">
      <Container className={s.container}>
        <Toolbar className={s.toolbar}>
          <img className={s.logo} src="/logo.gif" />
          <Typography className={s.title} variant="h6" noWrap>
            stylish cow
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

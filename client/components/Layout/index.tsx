import React from 'react';
import { makeStyles } from '@material-ui/core';

import { Header } from './Header';

const useStyles = makeStyles(() => ({
  '@global': {
    'html, body, #root': {
      width: '100%',
      height: '100%',
    },
  },
  root: {
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  main: {
    background: '#f7f9fa',
    width: '100%',
    minHeight: 'calc(100vh - 74px)',
    marginTop: '74px',
  },
}));

export const Layout: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};

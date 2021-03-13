import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

import { Header } from './Header';

const useStyles = makeStyles((theme) => ({
  main: {
    background: '#f7f9fa',
    width: '100%',
    minHeight: 'calc(100vh - 74px)',
  },
}));

export const Layout: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <>
      <Header />
      <section className={s.main}>{children}</section>
    </>
  );
};

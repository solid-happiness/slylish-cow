import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 74px)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maxHeight: '100vh',
  },
}));

export const Background: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <img className={s.background} src="/search/b1.jpg" />
      {children}
    </div>
  );
};

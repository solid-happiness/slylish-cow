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
  images: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'cover',
    height: 'calc(100vh - 74px)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'cover',
    height: 'calc(100vh - 74px)',
    animationName: '$search-background-fade-in-out',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDuration: '8s',
  },
  '@global': {
    '#search-background img:nth-of-type(1)': {
      animationDelay: '16s',
    },
    '#search-background img:nth-of-type(2)': {
      animationDelay: '32s',
    },
    '#search-background img:nth-of-type(3)': {
      animationDelay: '48s',
    },
    '#search-background img:nth-of-type(4)': {
      animationDelay: '64s',
    },
  },
  '@keyframes search-background-fade-in-out': {
    '0%': {
      opacity: 1,
    },
    '17%': {
      opacity: 1,
    },
    '25%': {
      opacity: 0,
    },
    '92%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

export const Background: React.FC = ({ children }) => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <div className={s.images} id="search-background">
        <img className={s.background} src="/search/b1.jpg" />
        <img className={s.background} src="/search/b2.jpg" />
        <img className={s.background} src="/search/b3.jpg" />
        <img className={s.background} src="/search/b4.jpg" />
      </div>
      {children}
    </div>
  );
};

import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  hand: {
    poisiton: 'relative',
    '&:before': {
      position: 'absolute',
      content: '"👆"',
      fontSize: '60px',
      transform: 'scale(0.75) rotate(-10deg)',
      right: '4px',
      bottom: '-60px',
      animation: '$up-down 1s infinite',
    },
  },
  '@keyframes up-down': {
    '50%': {
      marginBottom: '20px',
    },
  },
}));

type Props = {
  animate?: boolean;
};

export const Pointer: React.FC<Props> = ({ animate, children }) => {
  const s = useStyles();

  return <div className={cx(animate && s.hand)}>{children}</div>;
};

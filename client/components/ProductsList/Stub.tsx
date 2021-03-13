import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    maxWidth: 345,
    minHeight: 300,
  },
  skeleton: {
    transform: 'none',
  },
}));

export const Stub: React.FC = () => {
  const s = useStyles();

  return (
    <>
      <div className={s.card}>
        <Skeleton className={s.skeleton} height={300} />
      </div>
      <div className={s.card}>
        <Skeleton className={s.skeleton} height={300} />
      </div>
    </>
  );
};

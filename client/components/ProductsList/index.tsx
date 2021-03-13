import React from 'react';
import { makeStyles } from '@material-ui/core';

import { ProductCard } from '../ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'grid',
    grid: '1fr / 1fr 1fr',
    alignItems: 'center',
    justifyItems: 'center',
    gridRowGap: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

export const ProductsList: React.FC = () => {
  const s = useStyles();

  return (
    <section className={s.root}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </section>
  );
};

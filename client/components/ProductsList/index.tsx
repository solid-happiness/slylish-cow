import React from 'react';
import cx from 'clsx';
import { map } from 'ramda';
import { makeStyles, Grow, Fade, Typography } from '@material-ui/core';

import { Product } from 'client/typings';

import { Stub } from './Stub';
import { ProductCard } from '../ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'grid',
    grid: '1fr / 1fr 1fr',
    alignItems: 'stretch',
    justifyItems: 'center',
    gridRowGap: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  empty: {
    grid: '1fr / 1fr',
  },
}));

type Props = {
  input: string;
  loading: boolean;
  products: string | Product[];
};

export const ProductsList: React.FC<Props> = ({ input, loading, products }) => {
  const s = useStyles();
  if (!input) {
    return null;
  }

  if (loading) {
    return (
      <Fade in={loading}>
        <section className={s.root}>
          <Stub />
        </section>
      </Fade>
    );
  }

  if (typeof products === 'string') {
    return (
      <Fade in>
        <section className={cx(s.root, s.empty)}>
          <Typography variant="body1">
            По вашему запросу ничего не найдено
          </Typography>
        </section>
      </Fade>
    );
  }

  return (
    <Grow in={!loading}>
      <section className={s.root}>
        {map(
          (product) => (
            <ProductCard key={product.productUrl} product={product} />
          ),
          products
        )}
      </section>
    </Grow>
  );
};

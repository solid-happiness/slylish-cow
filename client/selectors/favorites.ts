import { pathOr, reduce } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';
import { Product } from 'client/typings';

export const getFavorites = pathOr([] as Product[], ['favorites', 'products']);

export const getFavoritesMap = createSelector(getFavorites, (products) =>
  reduce(
    (acc, product) => ({
      ...acc,
      [product.productUrl]: product,
    }),
    {} as Record<string, Product>,
    products
  )
);

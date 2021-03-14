import { prop, sort, sortBy } from 'ramda';

import { Product } from 'client/typings';
import { Filter } from 'client/components/Search/constants';

const unifySign = (result: number) => {
  if (result < 0) {
    return -1;
  }

  if (result > 0) {
    return 1;
  }

  return 0;
};

export const sortProducts = (filter: Filter, products: Product[]) => {
  if (filter === Filter.NAME) {
    return sortBy(prop('title'), products);
  }

  return sort((a, b) => {
    if (filter === Filter.PRICE_ASC) {
      return unifySign(a.price - b.price);
    }

    return unifySign(b.price - a.price);
  }, products);
};

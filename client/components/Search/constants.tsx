import React from 'react';
import { PriceFilter } from './PriceFilter';

export enum Filter {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  NAME = 'NAME',
}

export const filtersOptions = [
  { name: 'по цене (по возрастанию)', value: Filter.PRICE_ASC },
  { name: 'по цене (по убыванию)', value: Filter.PRICE_DESC },
  { name: 'по названию', value: Filter.NAME },
];

export const filtersNameMap: Record<Filter, React.ReactNode> = {
  [Filter.PRICE_ASC]: <PriceFilter type="asc">по цене</PriceFilter>,
  [Filter.PRICE_DESC]: <PriceFilter type="desc">по цене</PriceFilter>,
  [Filter.NAME]: 'по названию',
};

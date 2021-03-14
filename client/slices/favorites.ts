import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { find, filter } from 'ramda';
import { Product } from 'client/typings';

type FavoritesState = {
  products: Product[];
};

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const items = JSON.parse(localStorage.getItem('favorite-products')!);
    if (Array.isArray(items)) {
      return items;
    }

    return [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  products: getInitialState(),
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteProduct: (
      state: FavoritesState,
      action: PayloadAction<{ product: Product }>
    ) => {
      const isItemAlreadyExists = !!find(
        (product) => product.productUrl === action.payload.product.productUrl,
        state.products
      );
      if (isItemAlreadyExists) {
        state.products = filter(
          (product) => product.productUrl !== action.payload.product.productUrl,
          state.products
        );
      } else {
        state.products.push(action.payload.product);
      }

      localStorage.setItem('favorite-products', JSON.stringify(state.products));
    },
  },
});

export const { toggleFavoriteProduct } = favorites.actions;

export default favorites.reducer;

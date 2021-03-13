import { useState, useCallback } from 'react';
import { useLatest } from 'react-use';

import { debounce } from 'throttle-debounce';
import sleep from 'sleep-promise';

import { Product } from 'client/typings';
import { stub } from './stub';

export const useSearch = (value: string) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const state = useLatest({ value });

  const load = useCallback(
    debounce(300, async (input?: string) => {
      if (!input) {
        setLoading(false);
        setProducts([]);

        return;
      }

      setLoading(true);

      const result = stub;
      await sleep(3000);

      if (input !== state.current.value) {
        return;
      }

      setProducts(result);
      setLoading(false);
    }),
    []
  );

  return {
    loading,
    load,
    products,
  };
};

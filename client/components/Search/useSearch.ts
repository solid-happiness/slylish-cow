import { useState, useCallback } from 'react';
import { useLatest } from 'react-use';
import { isEmpty } from 'ramda';

import { debounce } from 'throttle-debounce';
import sleep from 'sleep-promise';

import { Product } from 'client/typings';
import { stub } from './stub';

export const useSearch = (value: string) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string | Product[]>([]);

  const state = useLatest({ value });

  const load = useCallback(
    debounce(300, async (input?: string) => {
      if (!input) {
        setLoading(false);
        setProducts([]);

        return;
      }

      setLoading(true);

      await sleep(3000);
      const result = stub;

      if (input !== state.current.value) {
        return;
      }

      if (isEmpty(result)) {
        setProducts('empty');
      } else {
        setProducts(result);
      }

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

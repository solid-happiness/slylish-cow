import { useState, useCallback } from 'react';
import { useLatest } from 'react-use';
import { isEmpty } from 'ramda';

import { debounce } from 'throttle-debounce';
import sleep from 'sleep-promise';
import axios from 'axios';

import { Product } from 'client/typings';
import { Filter } from './constants';

export const useSearch = (value: string) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string | Product[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.PRICE_DESC);

  const state = useLatest({ value });

  const load = useCallback(
    debounce(300, async (input?: string) => {
      if (!input) {
        setLoading(false);
        setProducts([]);

        return;
      }

      setLoading(true);

      await sleep(1000);

      const response = await axios.get<{ payload: Product[] }>('/api/search', {
        params: { query: input },
      });

      if (input !== state.current.value) {
        return;
      }

      const result = (await response.data?.payload) || [];

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
    filter,
    setFilter,
  };
};

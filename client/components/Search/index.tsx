import React, { useState, useRef } from 'react';
import { useMount } from 'react-use';
import { makeStyles, Container, TextField } from '@material-ui/core';

import { Footer } from 'client/components/Footer';
import { ProductsList } from 'client/components/ProductsList';

import { Filters } from './Filters';
import { Background } from './Background';
import { useSearch } from './useSearch';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '196px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    background: '#f7f9fa',
    borderRadius: '16px',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      minHeight: 'unset',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  search: {
    width: '100%',
    maxWidth: '750px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  label: {
    fontSize: '1.15rem',
  },
  input: {
    fontSize: '2rem',
  },
}));

export const Search: React.FC = () => {
  const s = useStyles();

  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>();

  const { loading, load, products, filter, setFilter } = useSearch(value);

  useMount(() => {
    setTimeout(() => {
      if (!input.current) {
        return;
      }

      input.current.focus();
    }, 1000);
  });

  return (
    <Background>
      <Container maxWidth="md" className={s.container}>
        <div className={s.search}>
          <TextField
            label="Начните искать товары..."
            variant="standard"
            size="medium"
            InputProps={{
              classes: {
                root: s.input,
              },
            }}
            InputLabelProps={{
              classes: {
                root: s.label,
              },
            }}
            fullWidth
            inputRef={input}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              load(event.target.value);
            }}
          />
        </div>
        <ProductsList
          input={value}
          loading={loading}
          filter={filter}
          products={products}
        >
          <Filters products={products} filter={filter} setFilter={setFilter} />
        </ProductsList>
      </Container>
      <Footer />
    </Background>
  );
};

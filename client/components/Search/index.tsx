import React, { useState, useRef } from 'react';
import { useMount } from 'react-use';
import { makeStyles, Container, TextField } from '@material-ui/core';

import { Background } from './Background';
import { ProductsList } from '../ProductsList';
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
    background: theme.palette.common.white,
    borderRadius: '16px',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  search: {
    width: '100%',
    maxWidth: '750px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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

  useSearch();

  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>();

  useMount(() => {
    setTimeout(() => {
      if (!input.current) {
        return;
      }

      input.current.focus();
    }, 3000);
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
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <ProductsList />
      </Container>
    </Background>
  );
};

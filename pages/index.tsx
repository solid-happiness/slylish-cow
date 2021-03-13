import 'fontsource-roboto';

import React from 'react';
import { makeStyles, CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { theme } from '../client/components/theme';
import { Layout } from '../client/components/Layout';
import { Search } from '../client/components/Search';

const useStyles = makeStyles(() => ({
  '@global': {
    'html, body, #root': {
      width: '100%',
      height: '100%',
    },
  },
  root: {
    width: '100%',
    minHeight: '100vh',
  },
}));

const Index: React.FC = () => {
  const s = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={s.root}>
        <CssBaseline />
        <Layout>
          <Search />
        </Layout>
      </div>
    </MuiThemeProvider>
  );
};

export default Index;

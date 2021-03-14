import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import { store } from 'client/store';
import { theme } from 'client/components/theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>stylish cow</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;

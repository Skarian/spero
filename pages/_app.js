/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Navbar from '../components/Navbar';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Project Alpha</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          /* montserrat-regular - latin */
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400;
            src: url('../fonts/montserrat-v14-latin-regular.eot'); /* IE9 Compat Modes */
            src: local('Montserrat Regular'), local('Montserrat-Regular'),
              url('../fonts/montserrat-v14-latin-regular.eot?#iefix') format('embedded-opentype'),
              /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-regular.woff2') format('woff2'),
              /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-regular.woff') format('woff'),
              /* Modern Browsers */ url('../fonts/montserrat-v14-latin-regular.ttf') format('truetype'),
              /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
          }
        `}</style>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

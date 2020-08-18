/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import theme from '../utils/theme';
import Navbar from '../components/Navbar';
import { useApollo } from '../utils/apolloClient';
import { StoreProvider } from '../context/StoreContext';
import { Animatepresence, AnimatePresence } from 'framer-motion';

export default function MyApp(props) {
  const { Component, pageProps, router } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

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
        <style jsx global>
          {`
            /* montserrat-100 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 100;
              src: url('../fonts/montserrat-v14-latin-100.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Thin'), local('Montserrat-Thin'),
                url('../fonts/montserrat-v14-latin-100.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-100.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-100.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-100.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-100.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-200 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 200;
              src: url('../fonts/montserrat-v14-latin-200.eot'); /* IE9 Compat Modes */
              src: local('Montserrat ExtraLight'), local('Montserrat-ExtraLight'),
                url('../fonts/montserrat-v14-latin-200.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-200.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-200.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-200.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-200.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-100italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 100;
              src: url('../fonts/montserrat-v14-latin-100italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Thin Italic'), local('Montserrat-ThinItalic'),
                url('../fonts/montserrat-v14-latin-100italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-100italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-100italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-100italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-100italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-200italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 200;
              src: url('../fonts/montserrat-v14-latin-200italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat ExtraLight Italic'), local('Montserrat-ExtraLightItalic'),
                url('../fonts/montserrat-v14-latin-200italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-200italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-200italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-200italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-200italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-300italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 300;
              src: url('../fonts/montserrat-v14-latin-300italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Light Italic'), local('Montserrat-LightItalic'),
                url('../fonts/montserrat-v14-latin-300italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-300italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-300italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-300italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-300italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-300 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 300;
              src: url('../fonts/montserrat-v14-latin-300.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Light'), local('Montserrat-Light'),
                url('../fonts/montserrat-v14-latin-300.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-300.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-300.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-300.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-300.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-regular - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 400;
              src: url('../fonts/montserrat-v14-latin-regular.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Regular'), local('Montserrat-Regular'),
                url('../fonts/montserrat-v14-latin-regular.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-regular.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-regular.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-regular.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 400;
              src: url('../fonts/montserrat-v14-latin-italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Italic'), local('Montserrat-Italic'),
                url('../fonts/montserrat-v14-latin-italic.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-500italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 500;
              src: url('../fonts/montserrat-v14-latin-500italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'),
                url('../fonts/montserrat-v14-latin-500italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-500italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-500italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-500italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-500italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-500 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 500;
              src: url('../fonts/montserrat-v14-latin-500.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Medium'), local('Montserrat-Medium'),
                url('../fonts/montserrat-v14-latin-500.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-500.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-500.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-500.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-500.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-600 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 600;
              src: url('../fonts/montserrat-v14-latin-600.eot'); /* IE9 Compat Modes */
              src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'),
                url('../fonts/montserrat-v14-latin-600.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-600.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-600.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-600.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-600.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-600italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 600;
              src: url('../fonts/montserrat-v14-latin-600italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat SemiBold Italic'), local('Montserrat-SemiBoldItalic'),
                url('../fonts/montserrat-v14-latin-600italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-600italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-600italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-600italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-600italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-700 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 700;
              src: url('../fonts/montserrat-v14-latin-700.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Bold'), local('Montserrat-Bold'),
                url('../fonts/montserrat-v14-latin-700.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-700.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-700.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-700.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-700.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-700italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 700;
              src: url('../fonts/montserrat-v14-latin-700italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Bold Italic'), local('Montserrat-BoldItalic'),
                url('../fonts/montserrat-v14-latin-700italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-700italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-700italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-700italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-700italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-800 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 800;
              src: url('../fonts/montserrat-v14-latin-800.eot'); /* IE9 Compat Modes */
              src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'),
                url('../fonts/montserrat-v14-latin-800.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-800.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-800.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-800.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-800.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
            /* montserrat-800italic - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: italic;
              font-weight: 800;
              src: url('../fonts/montserrat-v14-latin-800italic.eot'); /* IE9 Compat Modes */
              src: local('Montserrat ExtraBold Italic'), local('Montserrat-ExtraBoldItalic'),
                url('../fonts/montserrat-v14-latin-800italic.eot?#iefix')
                  format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-800italic.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-800italic.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-800italic.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */
                  url('../fonts/montserrat-v14-latin-800italic.svg#Montserrat') format('svg'); /* Legacy iOS */
            }
            /* montserrat-900 - latin */
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 900;
              src: url('../fonts/montserrat-v14-latin-900.eot'); /* IE9 Compat Modes */
              src: local('Montserrat Black'), local('Montserrat-Black'),
                url('../fonts/montserrat-v14-latin-900.eot?#iefix') format('embedded-opentype'),
                /* IE6-IE8 */ url('../fonts/montserrat-v14-latin-900.woff2') format('woff2'),
                /* Super Modern Browsers */ url('../fonts/montserrat-v14-latin-900.woff')
                  format('woff'),
                /* Modern Browsers */ url('../fonts/montserrat-v14-latin-900.ttf')
                  format('truetype'),
                /* Safari, Android, iOS */ url('../fonts/montserrat-v14-latin-900.svg#Montserrat')
                  format('svg'); /* Legacy iOS */
            }
          `}
        </style>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <StoreProvider>
            <Navbar />
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </StoreProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

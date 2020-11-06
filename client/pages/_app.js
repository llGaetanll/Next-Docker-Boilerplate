import React from "react";
import Head from "next/head";

import { Provider as StateProvider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useApollo } from "../lib/apollo";
import theme from "../src/theme";
import store from "../store";

import { FeedbackProvider } from "../util/feedback";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <StateProvider store={store}>
        <Head>
          <title>Next Starter</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FeedbackProvider>
            <Component {...pageProps} />
          </FeedbackProvider>
        </ThemeProvider>
      </StateProvider>
    </ApolloProvider>
  );
};

export default MyApp;

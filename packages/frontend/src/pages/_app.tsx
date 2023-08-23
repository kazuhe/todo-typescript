import React from "react";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { apolloClient } from "@/lib/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

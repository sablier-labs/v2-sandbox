import { PropsWithChildren } from "react";
import "cross-fetch";
import { ThemeProvider } from "../src/components/Theme";
import { AppProps } from "next/app";
import Web3Provider from "../src/components/Web3";
import Head from "next/head";
import BigNumber from "bignumber.js";

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

function Wrapper({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Web3Provider>{children}</Web3Provider>
    </ThemeProvider>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Head>
        <title>Sablier V2 Sandbox | Ethers v6</title>
      </Head>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default App;

import { PropsWithChildren } from "react";
import "cross-fetch";
import { ThemeProvider } from "../src/components/Theme";
import { AppProps } from "next/app";
import Web3Provider from "../src/components/Web3";

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
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default App;

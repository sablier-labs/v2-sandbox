import { useEffect, type PropsWithChildren, useState } from "react";
import _ from "lodash";

import { WagmiConfig, configureChains, createConfig, useConnect } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient } = configureChains([goerli], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new InjectedConnector({ chains })],
});

function Body({ children }: PropsWithChildren<unknown>) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return children;
}

export default function Web3Provider({ children }: PropsWithChildren<unknown>) {
  return (
    <WagmiConfig config={config}>
      <Body>{children}</Body>
    </WagmiConfig>
  );
}

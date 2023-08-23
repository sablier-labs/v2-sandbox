import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import type { PropsWithChildren } from "react";
import _ from "lodash";

interface IContext {
  error?: string | undefined;
  signer: ethers.Signer | undefined;
  provider: ethers.Provider | undefined;
  address: string | undefined;
  chain: ethers.Network | undefined;
  status: "connecting" | "connected" | "disconnected";
}

const initial = {
  error: undefined,
  address: undefined,
  chain: undefined,
  provider: undefined,
  signer: undefined,
  status: "connecting",
} as const;

export const Context = createContext<IContext>(initial);

function useWeb3() {
  const [data, setData] = useState<IContext>(initial);

  useEffect(() => {
    // https://docs.ethers.org/v6/getting-started/#starting-connecting
    if (window.ethereum == null) {
      console.error("MetaMask not installed; using read-only defaults");

      (async () => {
        const provider = ethers.getDefaultProvider("goerli");
        const chain = await provider.getNetwork();

        setData({
          address: undefined,
          chain,
          provider,
          signer: undefined,
          status: "disconnected",
        });
      })();
    } else {
      (async () => {
        try {
          const provider = new ethers.BrowserProvider(
            window.ethereum,
            "goerli"
          );
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const chain = await provider.getNetwork();
          setData({
            address,
            chain,
            provider,
            signer,
            status: "connected",
          });
        } catch (error) {
          console.error(error);

          if (_.get(error, "code") === "NETWORK_ERROR") {
            setData({
              ...initial,
              status: "disconnected",
              error: "Expected network: Goerli",
            });
          }
          if (_.get(error, "code") === "ACTION_REJECTED") {
            setData({
              ...initial,
              status: "disconnected",
              error: "No accounts allowed from Metamask.",
            });
          }
        }
      })();
    }
  }, [setData]);

  return data;
}

export default function Provider({ children }: PropsWithChildren<unknown>) {
  const value = useWeb3();

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useWeb3Context(): IContext {
  return useContext(Context);
}

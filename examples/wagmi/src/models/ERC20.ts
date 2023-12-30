import _ from "lodash";
import type { IAddress } from "../types";
import { SEPOLIA_CHAIN_ID, contracts, ABI } from "../constants";
import {
  getAccount,
  readContract,
  writeContract,
  waitForTransaction,
} from "wagmi/actions";
import BigNumber from "bignumber.js";
import { expect, erroneous } from "../utils";

export default class ERC20 {
  static async doApprove(
    spender: keyof (typeof contracts)[typeof SEPOLIA_CHAIN_ID],
    state: {
      amount: string | undefined;
      token: string | undefined;
    },
    log: (value: string) => void
  ) {
    try {
      if (!expect(state.amount, "amount") || !expect(state.token, "token")) {
        return;
      }

      const decimals = await readContract({
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      const amount = BigInt(state.amount) * 10n ** BigInt(decimals);

      const tx = await writeContract({
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "approve",
        args: [contracts[SEPOLIA_CHAIN_ID][spender], amount],
      });

      if (tx.hash) {
        log(`Token approval sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await waitForTransaction({ hash: tx.hash });

      if (receipt?.status === "success") {
        log(`Token approval executed successfully.`);
      } else {
        log(`Token approval failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }

  static async doMint(token: IAddress) {
    try {
      if (!expect(token, "token")) {
        console.error("token is undefined");
        return;
      }

      const decimals = await readContract({
        address: token,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(new BigNumber("100000").times(padding).toFixed());

      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        console.error("sender is undefined");
        return;
      }

      const _tx = await writeContract({
        address: token,
        abi: ABI.ERC20.abi,
        functionName: "mint",
        args: [sender, amount],
      });
    } catch (error) {
      erroneous(error);
    }
  }
}

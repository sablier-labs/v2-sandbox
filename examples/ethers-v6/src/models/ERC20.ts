import BigNumber from "bignumber.js";
import { Contract, ethers } from "ethers";
import _ from "lodash";
import { ABI, SEPOLIA_CHAIN_ID, contracts } from "../constants";
import type { IAddress } from "../types";
import { erroneous, expect } from "../utils";

export default class ERC20 {
  static async doApprove(
    signer: ethers.Signer,
    spender: keyof (typeof contracts)[typeof SEPOLIA_CHAIN_ID],
    state: {
      amount: string | undefined;
      token: string | undefined;
    },
    log: (value: string) => void,
  ) {
    try {
      if (!expect(state.amount, "amount") || !expect(state.token, "token")) {
        return;
      }

      const contract_token = new Contract(state.token, ABI.ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();
      const amount = BigInt(state.amount) * 10n ** decimals;

      const tx = await contract_token.approve.send(contracts[SEPOLIA_CHAIN_ID][spender], amount);

      if (tx.hash) {
        log(`Token approval sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        log(`Token approval executed successfully.`);
      } else {
        log(`Token approval failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }

  static async doMint(signer: ethers.Signer, token: IAddress) {
    try {
      if (!expect(token, "token")) {
        console.error("token is undefined");
        return;
      }

      const contract_token = new Contract(token, ABI.ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(new BigNumber("100000").times(padding).toFixed());

      const sender = await signer.getAddress();

      const tx = await contract_token.mint(sender, amount);
      const _receipt = await tx.wait();
    } catch (error) {
      erroneous(error);
    }
  }
}

import _ from "lodash";
import type { IStoreFormLinear, ICreateWithDurations } from "../types";
import { CHAIN_GOERLI_ID, contracts, ERC20 } from "../constants";
import SablierV2LockupLinear from "@sablier/v2-core/artifacts/SablierV2LockupLinear.json";
import { Contract, ethers } from "ethers";

function expect(
  value: unknown,
  label: string
): value is NonNullable<typeof value> {
  if (_.isNil(value) || _.toString(value).length === 0) {
    throw new Error(`Missing parameter: ${label}`);
  }
  return true;
}

export default class Stream {
  static async doApprove(signer: ethers.Signer, state: IStoreFormLinear) {
    state.api.update({ error: undefined });

    try {
      if (!expect(state.amount, "amount") || !expect(state.token, "token")) {
        return;
      }

      const contract_token = new Contract(state.token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();
      const amount = BigInt(state.amount) * 10n ** decimals;

      const tx = await contract_token.approve.send(
        contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
        amount
      );

      if (tx.hash) {
        state.api.log(
          `Token approval sent to the blockchain with hash: ${tx.hash}.`
        );
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        state.api.log(`Token approval successfully registered.`);
      } else {
        state.api.log(`Token approval failed.`);
      }
    } catch (error) {
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }

      state.api.update({ error: _.toString(error) });
    }
  }

  static async doCreateLinear(signer: ethers.Signer, state: IStoreFormLinear) {
    state.api.update({ error: undefined });

    try {
      if (
        !expect(state.amount, "amount") ||
        !expect(state.cancelability, "cancelability") ||
        !expect(state.duration, "duration") ||
        !expect(state.recipient, "recipient") ||
        !expect(state.token, "token")
      ) {
        return;
      }

      const contract_token = new Contract(state.token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();
      const amount = BigInt(state.amount) * 10n ** decimals;

      const sender = await signer.getAddress();
      const contract_lockup = new Contract(
        contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
        SablierV2LockupLinear.abi,
        signer
      );

      const cliff = (() => {
        try {
          if (
            !_.isNil(state.cliff) &&
            BigInt(state.cliff).toString() === state.cliff
          ) {
            return BigInt(state.cliff);
          }
        } catch (_error) {}
        return 0n;
      })();

      const payload: ICreateWithDurations = [
        sender,
        state.recipient,
        amount,
        state.token,
        state.cancelability,
        [cliff, BigInt(state.duration)],
        [ethers.ZeroAddress, 0n],
      ];

      const tx = await contract_lockup.createWithDurations.send(payload);

      if (tx.hash) {
        state.api.log(
          `LL Stream sent to the blockchain with hahs: ${tx.hash}.`
        );
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        state.api.log(`LL Stream successfully created.`);
      } else {
        state.api.log(`LL Stream creation failed.`);
      }
    } catch (error) {
      console.error(error);
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }

      state.api.update({ error: _.toString(error) });
    }
  }
}

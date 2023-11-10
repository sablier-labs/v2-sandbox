import _ from "lodash";
import BigNumber from "bignumber.js";
import type {
  IAmountWithDecimals,
  IAmountWithDecimals18,
  ISeconds,
  ICreateWithDurations,
  ICreateWithDeltas,
  ICreateWithMilestones,
  ISegmentD,
  ICreateWithRange,
  IAddress,
} from "../types";
import { CHAIN_GOERLI_ID, contracts, ABI } from "../constants";
import { zeroAddress } from "viem";
import {
  getAccount,
  readContract,
  writeContract,
  waitForTransaction,
} from "wagmi/actions";

import { expect, erroneous } from "../utils";

export default class Core {
  static async doCreateLinear(
    state: {
      amount: string | undefined;
      cancelability: boolean;
      cliff: string | undefined;
      recipient: string | undefined;
      token: string | undefined;
      duration: string | undefined;
    },
    log: (value: string) => void
  ) {
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

      const decimals = await readContract({
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(
        new BigNumber(state.amount).times(padding).toFixed()
      );

      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }

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
        state.recipient as IAddress,
        amount,
        state.token as IAddress,
        state.cancelability,
        { cliff, total: BigInt(state.duration) },
        { account: zeroAddress, fee: 0n },
      ];

      console.info("Payload", payload);

      const tx = await writeContract({
        address: contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
        abi: ABI.SablierV2LockupLinear.abi,
        functionName: "createWithDurations",
        args: [payload],
      });

      if (tx.hash) {
        log(`LL Stream sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await waitForTransaction({ hash: tx.hash });

      if (receipt?.status === "success") {
        log(`LL Stream successfully created.`);
      } else {
        log(`LL Stream creation failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }

  static async doCreateDynamic(
    state: {
      cancelability: boolean;
      recipient: string | undefined;
      token: string | undefined;
      segments: {
        amount: string | undefined;
        delta: string | undefined;
        exponent: string | undefined;
      }[];
    },
    log: (value: string) => void
  ) {
    try {
      if (
        !expect(state.segments, "segments") ||
        !expect(state.cancelability, "cancelability") ||
        !expect(state.recipient, "recipient") ||
        !expect(state.token, "token")
      ) {
        return;
      }

      const decimals = await readContract({
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));

      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }

      const segments: ISegmentD[] = state.segments.map((segment) => {
        if (
          !expect(segment.amount, "segment amount") ||
          !expect(segment.delta, "segment delta") ||
          !expect(segment.exponent, "segment exponent")
        ) {
          throw new Error("Expected valid segments.");
        }

        const amount: IAmountWithDecimals = BigInt(
          new BigNumber(segment.amount).times(padding).toFixed()
        );
        const delta: ISeconds = BigInt(segment.delta);
        const exponent: IAmountWithDecimals18 =
          BigInt(segment.exponent) * 10n ** 18n;

        const result: ISegmentD = { amount, exponent, delta };

        return result;
      });

      const amount = segments.reduce(
        (prev, curr) => prev + (curr?.amount || 0n),
        0n
      );

      const payload: ICreateWithDeltas = [
        sender,
        state.cancelability,
        state.recipient as IAddress,
        amount,
        state.token as IAddress,
        { account: zeroAddress, fee: 0n },
        segments,
      ];

      console.info("Payload", payload);

      const tx = await writeContract({
        address: contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
        abi: ABI.SablierV2LockupDynamic.abi,
        functionName: "createWithDeltas",
        args: [payload],
      });

      if (tx.hash) {
        log(`LD Stream sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await waitForTransaction({ hash: tx.hash });

      if (receipt?.status === "success") {
        log(`LD Stream successfully created.`);
      } else {
        log(`LD Stream creation failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }

  static async doCreateLinearWithDurationsRaw(payload: ICreateWithDurations) {
    const data = _.clone(payload);
    if (data[0].toString() === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }
      data[0] = sender;
    }

    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
      abi: ABI.SablierV2LockupLinear.abi,
      functionName: "createWithDurations",
      args: [data],
    });
    return waitForTransaction({ hash: tx.hash });
  }

  static async doCreateLinearWithRangeRaw(payload: ICreateWithRange) {
    const data = _.clone(payload);
    if (data[0].toString() === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }
      data[0] = sender;
    }

    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
      abi: ABI.SablierV2LockupLinear.abi,
      functionName: "createWithRange",
      args: [data],
    });
    return waitForTransaction({ hash: tx.hash });
  }

  static async doCreateDynamicWithDeltasRaw(payload: ICreateWithDeltas) {
    const data = _.clone(payload);
    if (data[0].toString() === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }
      data[0] = sender;
    }

    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
      abi: ABI.SablierV2LockupDynamic.abi,
      functionName: "createWithDeltas",
      args: [data],
    });
    return waitForTransaction({ hash: tx.hash });
  }

  static async doCreateDynamicWithMilestonesRaw(
    payload: ICreateWithMilestones
  ) {
    const data = _.clone(payload);
    if (data[0].toString() === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }
      data[0] = sender;
    }

    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
      abi: ABI.SablierV2LockupDynamic.abi,
      functionName: "createWithMilestones",
      args: [data],
    });
    return waitForTransaction({ hash: tx.hash });
  }
}

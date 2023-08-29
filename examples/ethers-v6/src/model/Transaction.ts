import _ from "lodash";
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
import { CHAIN_GOERLI_ID, contracts, ERC20 } from "../constants";
import SablierV2LockupLinear from "@sablier/v2-core/artifacts/SablierV2LockupLinear.json";
import SablierV2LockupDynamic from "@sablier/v2-core/artifacts/SablierV2LockupDynamic.json";
import { Contract, ethers } from "ethers";
import BigNumber from "bignumber.js";

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

function expect(
  value: unknown,
  label: string
): value is NonNullable<typeof value> {
  if (_.isNil(value) || _.toString(value).length === 0) {
    throw new Error(`Missing parameter: ${label}`);
  }
  return true;
}

export default class Transaction {
  static async doApprove(
    signer: ethers.Signer,
    spender: keyof (typeof contracts)[typeof CHAIN_GOERLI_ID],
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

      const contract_token = new Contract(state.token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();
      const amount = BigInt(state.amount) * 10n ** decimals;

      const tx = await contract_token.approve.send(
        contracts[CHAIN_GOERLI_ID][spender],
        amount
      );

      if (tx.hash) {
        log(`Token approval sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        log(`Token approval successfully registered.`);
      } else {
        log(`Token approval failed.`);
      }
    } catch (error) {
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }
      throw error;
    }
  }

  static async doMint(signer: ethers.Signer, token: IAddress) {
    try {
      if (!expect(token, "token")) {
        return;
      }

      const contract_token = new Contract(token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(new BigNumber("100000").times(padding).toFixed());

      const sender = await signer.getAddress();

      const tx = await contract_token.mint(sender, amount);
      const _receipt = await tx.wait();
    } catch (error) {
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }
      throw error;
    }
  }

  static async doCreateLinear(
    signer: ethers.Signer,
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

      const contract_token = new Contract(state.token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(
        new BigNumber(state.amount).times(padding).toFixed()
      );

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

      console.info("Payload", payload);

      const tx = await contract_lockup.createWithDurations.send(payload);

      if (tx.hash) {
        log(`LL Stream sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        log(`LL Stream successfully created.`);
      } else {
        log(`LL Stream creation failed.`);
      }
    } catch (error) {
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }
      throw error;
    }
  }

  static async doCreateDynamic(
    signer: ethers.Signer,
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

      const contract_token = new Contract(state.token, ERC20.abi, signer);
      const decimals: bigint = await contract_token.decimals();
      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));

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

        const result: ISegmentD = [amount, exponent, delta];

        return result;
      });

      const sender = await signer.getAddress();
      const contract_lockup = new Contract(
        contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
        SablierV2LockupDynamic.abi,
        signer
      );

      const amount = segments.reduce(
        (prev, curr) => prev + (curr?.[0] || 0n),
        0n
      );

      const payload: ICreateWithDeltas = [
        sender,
        state.cancelability,
        state.recipient,
        amount,
        state.token,
        [ethers.ZeroAddress, 0n],
        segments,
      ];

      console.info("Payload", payload);

      const tx = await contract_lockup.createWithDeltas.send(payload);

      if (tx.hash) {
        log(`LL Stream sent to the blockchain with hash: ${tx.hash}.`);
      }

      const receipt = await tx.wait();
      if (receipt?.status === 1) {
        log(`LL Stream successfully created.`);
      } else {
        log(`LL Stream creation failed.`);
      }
    } catch (error) {
      if ((_.get(error, "code") || "").includes("ACTION_REJECTED")) {
        return;
      }
      throw error;
    }
  }

  static async doCreateLinearWithDurationsRaw(
    signer: ethers.Signer,
    payload: ICreateWithDurations
  ) {
    const contract_lockup = new Contract(
      contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
      SablierV2LockupLinear.abi,
      signer
    );

    const data = _.clone(payload);
    if (data[0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      data[0] = await signer.getAddress();
    }

    console.info("Payload", data);

    const tx = await contract_lockup.createWithDurations.send(data);
    return tx.wait();
  }

  static async doCreateLinearWithRangeRaw(
    signer: ethers.Signer,
    payload: ICreateWithRange
  ) {
    const contract_lockup = new Contract(
      contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
      SablierV2LockupLinear.abi,
      signer
    );

    const data = _.clone(payload);
    if (data[0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      data[0] = await signer.getAddress();
    }

    console.info("Payload", data);

    const tx = await contract_lockup.createWithRange.send(data);
    return tx.wait();
  }

  static async doCreateDynamicWithDeltasRaw(
    signer: ethers.Signer,
    payload: ICreateWithDeltas
  ) {
    const contract_lockup = new Contract(
      contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
      SablierV2LockupDynamic.abi,
      signer
    );

    const data = _.clone(payload);
    if (data[0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      data[0] = await signer.getAddress();
    }

    console.info("Payload", data);

    const tx = await contract_lockup.createWithDeltas.send(data);
    return tx.wait();
  }

  static async doCreateDynamicWithMilestonesRaw(
    signer: ethers.Signer,
    payload: ICreateWithMilestones
  ) {
    const contract_lockup = new Contract(
      contracts[CHAIN_GOERLI_ID].SablierV2LockupDynamic,
      SablierV2LockupDynamic.abi,
      signer
    );

    const data = _.clone(payload);
    if (data[0] === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      data[0] = await signer.getAddress();
    }

    console.info("Payload", data);

    const tx = await contract_lockup.createWithMilestones.send(data);
    return tx.wait();
  }
}

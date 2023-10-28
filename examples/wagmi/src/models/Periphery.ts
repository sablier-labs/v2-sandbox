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
import {
  CHAIN_GOERLI_ID,
  contracts,
  ERC20,
  PERMIT2,
  PRB_PROXY,
  PRB_PROXY_REGISTRY,
  SABLIER_V2_PROXY_TARGET,
} from "../constants";
import {
  signTypedData,
  readContract,
  writeContract,
  getAccount,
  waitForTransaction,
} from "wagmi/actions";
import BigNumber from "bignumber.js";
import Transaction from "./Transaction";
import { encodeFunctionData } from "viem";

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

const PERMIT_EXPIRATION = 30 * 24 * 60 * 60 * 1000;
const PERMIT_SIG_EXPIRATION = 30 * 60 * 1000;

function expect(
  value: unknown,
  label: string
): value is NonNullable<typeof value> {
  if (_.isNil(value) || _.toString(value).length === 0) {
    throw new Error(`Missing parameter: ${label}`);
  }
  return true;
}

function toEndDate(time: number) {
  return BigInt(
    new BigNumber(Date.now())
      .plus(new BigNumber(time))
      .dividedToIntegerBy(new BigNumber(1000))
      .toFixed()
  );
}
export default class Periphery {
  static async doApprovePermit2(state: {
    amount: string | undefined;
    token: string | undefined;
  }) {
    return Transaction.doApprove("Permit2", state, _.noop);
  }

  static async doIdentifyPRBProxy(owner?: IAddress) {
    let address = owner;

    if (_.isNil(address)) {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return;
      }
      address = sender;
    }

    return readContract({
      address: contracts[CHAIN_GOERLI_ID].PRBProxyRegistry,
      abi: PRB_PROXY_REGISTRY,
      functionName: "getProxy",
      args: [address],
    });
  }

  static async _doPermit2Signature(
    initial_payload: ICreateWithDurations,
    spender: IAddress
  ) {
    const data = _.clone(initial_payload);

    const permit2Allowance = await readContract({
      address: contracts[CHAIN_GOERLI_ID].Permit2,
      abi: PERMIT2,
      functionName: "allowance",
      args: [
        data[0], // The owner of the funds
        data[3], // The asset
        spender as IAddress,
      ],
    });

    console.log("Permit2 Allowance", permit2Allowance);
    const allowanceNonce = permit2Allowance[2];

    /**
     *
     * After we get the nonce, we can start building the PERMIT2 structure
     *
     */

    const expiration = toEndDate(PERMIT_EXPIRATION);
    const sigDeadline = toEndDate(PERMIT_SIG_EXPIRATION);

    const value = {
      details: {
        token: data[3],
        amount: data[2],
        expiration: _.toNumber(expiration.toString()),
        nonce: allowanceNonce,
      },
      spender,
      sigDeadline: BigInt(sigDeadline),
    } as const;

    const domain = {
      name: "Permit2",
      chainId: CHAIN_GOERLI_ID,
      verifyingContract: contracts[CHAIN_GOERLI_ID].Permit2,
    } as const;

    const types = {
      PermitSingle: [
        { name: "details", type: "PermitDetails" },
        { name: "spender", type: "address" },
        { name: "sigDeadline", type: "uint256" },
      ],
      PermitDetails: [
        { name: "token", type: "address" },
        { name: "amount", type: "uint160" },
        { name: "expiration", type: "uint48" },
        { name: "nonce", type: "uint48" },
      ],
    } as const;

    const signature = await signTypedData({
      account: data[0],
      domain,
      types,
      primaryType: "PermitSingle",
      message: value,
    });

    console.log("Permit2 Signature", signature);

    /**
     *
     * After we get the signature, we can start bundling everything for the proxy target.
     * The Proxy (your "forwarder" contract) will use the Target to pass encoded data to the Sablier V2 Core contracts.
     *
     */

    return {
      signature,
      permit2Data: value,
    };
  }

  static async doSimulateLockupLinearPermit2(
    initial_payload: ICreateWithDurations
  ) {
    /**
     * The Sablier V2 Periphery supports Permit2 signatures, through the PRB-Proxy system.
     * To work with PERMIT2 signatures we have to:
     *
     * 1. Make sure the user (EOA) has granted enough allowance to the Permit2 contract
     * 2. Fetch the Permit2 nonce (from Permit2.allowance)
     * 3. Build the signature (prompt the user to sign with metamask)
     * 4. Bundle the signature with all the other params and send everything to the proxy-target pair
     *
     *
     * For this DEMO we'll focus on steps 2-3.
     * Some requirements:
     *  - For Sablier it is the user's PRB-Proxy who spends the funds
     */

    const data = _.clone(initial_payload);
    if (data[0].toString() === "<< YOUR CONNECTED ADDRESS AS THE SENDER >>") {
      const sender = await getAccount().address;
      if (!expect(sender, "sender")) {
        return undefined;
      }
      data[0] = sender;
    }

    console.info("Payload", data);

    const PROXY = (await Periphery.doIdentifyPRBProxy()) as IAddress;

    /** ------------------------------------------------------------- */
    const signed = await this._doPermit2Signature(data, PROXY);

    if (_.isNil(signed)) {
      throw new Error("Signature failed prior to proxy interactions");
    }

    const { signature, permit2Data } = signed;

    const inputs = [
      contracts[CHAIN_GOERLI_ID].SablierV2LockupLinear,
      {
        sender: data[0],
        recipient: data[1],
        totalAmount: data[2],
        asset: data[3],
        cancelable: data[4],
        durations: {
          cliff: _.toNumber(data[5][0].toString()),
          total: _.toNumber(data[5][1].toString()),
        },
        broker: {
          account: data[6][0],
          fee: data[6][1],
        },
      },
      {
        permitSingle: permit2Data,
        signature,
      },
    ] as const;

    console.log("Prepared inputs", inputs);

    const encoded = encodeFunctionData({
      abi: SABLIER_V2_PROXY_TARGET,
      functionName: "createWithDurations",
      args: inputs,
    });

    console.log("Encoded data for the proxy target", encoded);

    const tx = await writeContract({
      address: PROXY,
      abi: PRB_PROXY,
      functionName: "execute",
      args: [contracts[CHAIN_GOERLI_ID].SablierV2ProxyTarget, encoded],
    });

    if (tx.hash) {
      console.log(
        `Stream creation request sent to the blockchain with hash: ${tx.hash}.`
      );
    }

    const receipt = await waitForTransaction({ hash: tx.hash });

    console.log("Receipt", receipt);
  }
}

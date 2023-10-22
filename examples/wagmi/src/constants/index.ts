/**
 * The official set of contracts used and recognized by the app.
 * -------------------------------------------------------------
 *
 * The contracts have been deployed from the following commits:
 *
 * | Repo         | Commit  |
 * | ------------ | ------- |
 * | v2-core      | https://github.com/sablier-labs/v2-core/tree/133f878 |
 *
 * -------------------------------------------------------------
 */

import { IAddress } from "../types";

export const CHAIN_GOERLI_ID = 5;

export const contracts = {
  [CHAIN_GOERLI_ID]: {
    SablierV2LockupLinear:
      "0x6e3678c005815ab34986d8d66a353cd3699103de" as IAddress,
    SablierV2LockupDynamic:
      "0x4be70ede968e9dba12db42b9869bec66bedc17d7" as IAddress,
  },
};

export const DAI = {
  [CHAIN_GOERLI_ID]: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress,
};

export const REGEX_ADDRESS = /^[0-9xXAaBbCcDdEeFf]+$/;
export const REGEX_FLOAT = /^[0-9]+[.,]?[0-9]+?$/;
export const REGEX_INTEGER = /^[0-9]+$/;

export const ERC20 = {
  abi: [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "sender",
          type: "address",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    /** Special method only available in our special Goerli DAI */
    {
      constant: false,
      inputs: [
        {
          name: "beneficiary",
          type: "address",
        },
        {
          name: "mintAmount",
          type: "uint256",
        },
      ],
      outputs: [],
      name: "mint",
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;

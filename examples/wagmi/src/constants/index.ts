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

export { default as ABI } from "./abi";

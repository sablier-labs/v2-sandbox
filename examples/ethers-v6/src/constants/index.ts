/**
 * The official set of contracts used and recognized by the app.
 * -------------------------------------------------------------
 *
 * The contracts have been deployed from the following commits:
 *
 * | Repo              | Commit  |
 * | ----------------- | ------- |
 * | v2-core           | https://github.com/sablier-labs/v2-core/tree/133f878      |
 * | v2-periphery      | https://github.com/sablier-labs/v2-periphery/tree/f8a14ed |
 *
 * ---------------------------------------------------------------------------------
 *
 * The Batch Periphery was designed especially for interaction with Core V2.0
 *
 */

export const CHAIN_GOERLI_ID = 5;

export const contracts = {
  [CHAIN_GOERLI_ID]: {
    SablierV2LockupLinear: "0x6e3678c005815ab34986d8d66a353cd3699103de",
    SablierV2LockupDynamic: "0x4be70ede968e9dba12db42b9869bec66bedc17d7",
    SablierV2Batch: "0xb9debfd79e5ededaa672fa38f099ddfca7fcb886",
  },
};

export const DAI = {
  [CHAIN_GOERLI_ID]: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862",
};

export const REGEX_ADDRESS = /^[0-9xXAaBbCcDdEeFf]+$/;
export const REGEX_FLOAT = /^[0-9]+[.,]?[0-9]+?$/;
export const REGEX_INTEGER = /^[0-9]+$/;

export * as ABI from "./abi";

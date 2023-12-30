import { default as SablierV2LockupDynamic } from "@sablier/v2-core/artifacts/SablierV2LockupDynamic.json";
import { default as SablierV2LockupLinear } from "@sablier/v2-core/artifacts/SablierV2LockupLinear.json";
import { default as SablierV2Batch } from "@sablier/v2-periphery/artifacts/SablierV2Batch.json";
import { default as ERC20 } from "./ERC20Mintable";

const ABI = {
  ERC20,
  SablierV2Batch,
  SablierV2LockupDynamic,
  SablierV2LockupLinear,
} as const;

export default ABI;

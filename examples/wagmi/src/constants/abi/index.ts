import { default as ERC20 } from "./ERC20";
import { default as SablierV2Batch } from "./SablierV2Batch";
import { default as SablierV2LockupLinear } from "@sablier/v2-core/artifacts/SablierV2LockupLinear.json";
import { default as SablierV2LockupDynamic } from "@sablier/v2-core/artifacts/SablierV2LockupDynamic.json";

const ABI = {
  ERC20,
  SablierV2Batch,
  SablierV2LockupDynamic,
  SablierV2LockupLinear,
} as const;

export default ABI;

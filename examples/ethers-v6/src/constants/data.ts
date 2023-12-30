import type {
  IBatchCreateWithDeltas,
  IBatchCreateWithDurations,
  IBatchCreateWithMilestones,
  IBatchCreateWithRange,
  ICreateWithDeltas,
  ICreateWithDurations,
  ICreateWithMilestones,
  ICreateWithRange,
} from "../types";
import { SEPOLIA_CHAIN_ID } from "./chains";
import { SEPOLIA_DAI, contracts } from "./contracts";

const now = BigInt(new Date().valueOf().toString().slice(0, -3));

export const APPROVE_BATCH = [
  "SablierV2Batch",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const APPROVE_LOCKUP_DYNAMIC = [
  "SablierV2LockupDynamic",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const APPROVE_LOCKUP_LINEAR = [
  "SablierV2LockupLinear",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const LOCKUP_LINEAR_WITH_DURATIONS: ICreateWithDurations = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
  "0xCAFE000000000000000000000000000000000000", // Recipient address
  1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
  SEPOLIA_DAI,
  true, // Cancelable
  true, // Transferable
  [86400n, 86400n * 4n], // Cliff for one day, ends after 4 (total) days - starts when the transaction is executed onchain
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */
export const LOCKUP_LINEAR_WITH_RANGE: ICreateWithRange = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
  "0xCAFE000000000000000000000000000000000000", // Recipient address
  1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
  SEPOLIA_DAI,
  true, // Cancelable
  true, // Transferable
  [now, now + 86400n * 1n, now + 86400n * 30n], // Starts on August 25th, 2023 21:46:40 GMT, cliff for one day, ends after 30 (total) days
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
];

export const LOCKUP_DYNAMIC_WITH_MILESTONES: ICreateWithMilestones = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
  now, // August 25th, 2023 21:46:40 GMT
  true, // Cancelable
  true, // Transferable
  "0xCAFE000000000000000000000000000000000000", // Recipient address
  1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
  SEPOLIA_DAI,
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
  [
    [250n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 1n], // Distribute SEPOLIA_DAI 250 exponentially (exponent = 3), by the end of the first day
    [750n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 30n], // Distribute another SEPOLIA_DAI 750 exponentially (exponent = 3), by the end of the month (30 days)
  ],
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */
export const LOCKUP_DYNAMIC_WITH_DELTAS: ICreateWithDeltas = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
  true, // Cancelable
  true, // Transferable
  "0xCAFE000000000000000000000000000000000000", // Recipient address
  1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
  SEPOLIA_DAI,
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
  [
    [250n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 250 exponentially (exponent = 3), the first day (86400 seconds)
    [750n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 750 exponentially (exponent = 3), the second day (86400 seconds)
  ],
];

/** ---------------------------------------------------------------------------------- */

export const BATCH_LOCKUP_LINEAR_WITH_DURATIONS: IBatchCreateWithDurations = [
  contracts[SEPOLIA_CHAIN_ID].SablierV2LockupLinear,
  SEPOLIA_DAI,
  [
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [86400n, 86400n * 4n], // Cliff for one day, ends after 4 (total) days - starts when the transaction is executed onchain
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee]
    ],
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      2000n * 10n ** 18n, // 2000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [86400n, 86400n * 4n], // Cliff for one day, ends after 4 (total) days - starts when the transaction is executed onchain
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee]
    ],
  ],
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */
export const BATCH_LOCKUP_LINEAR_WITH_RANGE: IBatchCreateWithRange = [
  contracts[SEPOLIA_CHAIN_ID].SablierV2LockupLinear,
  SEPOLIA_DAI,
  [
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [now, now + 86400n * 1n, now + 86400n * 30n], // Starts on August 25th, 2023 21:46:40 GMT, cliff for one day, ends after 30 (total) days
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee]
    ],
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      2000n * 10n ** 18n, // 2000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [now, now + 86400n * 1n, now + 86400n * 30n], // Starts on August 25th, 2023 21:46:40 GMT, cliff for one day, ends after 30 (total) days
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee]
    ],
  ],
];

export const BATCH_LOCKUP_DYNAMIC_WITH_MILESTONES: IBatchCreateWithMilestones = [
  contracts[SEPOLIA_CHAIN_ID].SablierV2LockupDynamic,
  SEPOLIA_DAI,
  [
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      now, // August 25th, 2023 21:46:40 GMT
      1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [
        [250n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 1n], // Distribute SEPOLIA_DAI 250 exponentially (exponent = 3), by the end of the first day
        [750n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 30n], // Distribute another SEPOLIA_DAI 750 exponentially (exponent = 3), by the end of the month (30 days)
      ],
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
    ],
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      now, // August 25th, 2023 21:46:40 GMT
      2000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [
        [1250n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 1n], // Distribute SEPOLIA_DAI 1250 exponentially (exponent = 3), by the end of the first day
        [750n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 30n], // Distribute another SEPOLIA_DAI 750 exponentially (exponent = 3), by the end of the month (30 days)
      ],
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
    ],
  ],
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */
export const BATCH_LOCKUP_DYNAMIC_WITH_DELTAS: IBatchCreateWithDeltas = [
  contracts[SEPOLIA_CHAIN_ID].SablierV2LockupDynamic,
  SEPOLIA_DAI,
  [
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      1000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [
        [250n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 250 exponentially (exponent = 3), the first day (86400 seconds)
        [750n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 750 exponentially (exponent = 3), the second day (86400 seconds)
      ],
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
    ],
    [
      "<< YOUR CONNECTED ADDRESS AS THE SENDER >>", // Sender address
      "0xCAFE000000000000000000000000000000000000", // Recipient address
      2000n * 10n ** 18n, // 1000 SEPOLIA_DAI (18 decimals)
      true, // Cancelable
      true, // Transferable
      [
        [1250n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 1250 exponentially (exponent = 3), the first day (86400 seconds)
        [750n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute SEPOLIA_DAI 750 exponentially (exponent = 3), the second day (86400 seconds)
      ],
      ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
    ],
  ],
];

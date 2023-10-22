import type {
  ICreateWithRange,
  ICreateWithDurations,
  ICreateWithDeltas,
  ICreateWithMilestones,
  IAddress,
} from "../types";

const now = BigInt(new Date().valueOf().toString().slice(0, -3));

export const APPROVE_LINEAR = [
  "SablierV2LockupLinear",
  {
    amount: "1000000",
    token: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress,
  },
] as const;

export const APPROVE_DYNAMIC = [
  "SablierV2LockupDynamic",
  {
    amount: "1000000",
    token: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress,
  },
] as const;

export const LOCKUP_LINEAR_WITH_DURATIONS: ICreateWithDurations = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress, // DAI address
  true, // Cancelable
  [86400n, 86400n * 4n], // Cliff for one day, ends after 4 (total) days - starts when the transaction is executed onchain
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */
export const LOCKUP_LINEAR_WITH_RANGE: ICreateWithRange = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress, // DAI address
  true, // Cancelable
  [now, now + 86400n * 1n, now + 86400n * 30n], // Starts on August 25th, 2023 21:46:40 GMT, cliff for one day, ends after 30 (total) days
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
];

export const LOCKUP_DYNAMIC_WITH_MILESTONES: ICreateWithMilestones = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  now, // August 25th, 2023 21:46:40 GMT
  true, // Cancelable
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as IAddress, // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress, // DAI address
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
  [
    [250n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 1n], // Distribute DAI 250 exponentially (exponent = 3), by the end of the first day
    [750n * 10n ** 18n, 3n * 10n ** 18n, now + 86400n * 30n], // Distribute another DAI 750 exponentially (exponent = 3), by the end of the month (30 days)
  ],
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */

export const LOCKUP_DYNAMIC_WITH_DELTAS: ICreateWithDeltas = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  true, // Cancelable
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as IAddress, // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862" as IAddress, // DAI address
  ["0x0000000000000000000000000000000000000000", 0n], // Broker - set this to your own address to charge a fee
  [
    [250n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute DAI 250 exponentially (exponent = 3), the first day (86400 seconds)
    [750n * 10n ** 18n, 3n * 10n ** 18n, 86400n * 1n], // Distribute DAI 750 exponentially (exponent = 3), the second day (86400 seconds)
  ],
];

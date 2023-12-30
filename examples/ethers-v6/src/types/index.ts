declare global {
  interface Window {
    ethereum: any;
  }
}

export type IAddress = string;
export type ISeconds = bigint;
export type IAmount = bigint;
export type IAmountWithDecimals = bigint;
export type IAmountWithDecimals18 = bigint;

export interface IStoreFormLinear {
  logs: string[];
  error: string | undefined;

  amount: string | undefined;
  cancelability: boolean;
  cliff: string | undefined;
  duration: string | undefined;
  recipient: string | undefined;
  token: string | undefined;
  transferability: boolean;

  api: {
    log: (value: string) => void;
    update: (updates: Partial<IStoreFormLinear>) => void;
    reset: () => void;
  };
}

export interface IStoreFormDynamic {
  logs: string[];
  error: string | undefined;

  cancelability: boolean;
  recipient: string | undefined;
  token: string | undefined;
  transferability: boolean;

  segments: {
    amount: string | undefined;
    exponent: string | undefined;
    delta: string | undefined;
  }[];

  api: {
    log: (value: string) => void;
    update: (updates: Partial<IStoreFormDynamic>) => void;
    reset: () => void;
  };
}

export type ICreateWithDurations = [
  sender: IAddress,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  cancelable: boolean,
  transferable: boolean,
  durations: [cliff: ISeconds, total: ISeconds],
  broker: [account: IAddress, fee: 0n] // TIP: you can set this to your own address to charge a fee
];

export type ICreateWithRange = [
  sender: IAddress,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  cancelable: boolean,
  transferable: boolean,
  range: [start: ISeconds, cliff: ISeconds, end: ISeconds],
  broker: [account: IAddress, fee: 0n] // TIP: you can set this to your own address to charge a fee
];

export type ISegmentD = [
  amount: IAmountWithDecimals,
  exponent: IAmountWithDecimals18,
  delta: ISeconds
];

export type ISegmentM = [
  amount: IAmountWithDecimals,
  exponent: IAmountWithDecimals18,
  milestone: ISeconds
];

export type ICreateWithDeltas = [
  sender: IAddress,
  cancelable: boolean,
  transferable: boolean,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  broker: [account: IAddress, fee: 0n],

  segments: ISegmentD[]
];

export type ICreateWithMilestones = [
  sender: IAddress,
  startTime: ISeconds,
  cancelable: boolean,
  transferable: boolean,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  broker: [account: IAddress, fee: 0n],

  segments: ISegmentM[]
];

/** --------- */

export type IBatchCreateWithDurations = [
  lockup: IAddress,
  asset: IAddress,
  batch: [
    sender: IAddress,
    recipient: IAddress,
    totalAmount: IAmountWithDecimals,
    cancelable: boolean,
    transferable: boolean,
    durations: [cliff: ISeconds, total: ISeconds],
    broker: [account: IAddress, fee: 0n]
  ][] // Array of batches
];

export type IBatchCreateWithRange = [
  lockup: IAddress,
  asset: IAddress,
  batch: [
    sender: IAddress,
    recipient: IAddress,
    totalAmount: IAmountWithDecimals,
    cancelable: boolean,
    transferable: boolean,
    range: [start: ISeconds, cliff: ISeconds, end: ISeconds],
    broker: [account: IAddress, fee: 0n]
  ][] // Array of batches
];

export type IBatchCreateWithDeltas = [
  lockup: IAddress,
  asset: IAddress,
  batch: [
    sender: IAddress,
    recipient: IAddress,
    totalAmount: IAmountWithDecimals,
    cancelable: boolean,
    transferable: boolean,
    segments: ISegmentD[],
    broker: [account: IAddress, fee: 0n],
  ][] // Array of batches
];

export type IBatchCreateWithMilestones = [
  lockup: IAddress,
  asset: IAddress,
  batch: [
    sender: IAddress,
    recipient: IAddress,
    totalAmount: IAmountWithDecimals,
    startTime: ISeconds,
    cancelable: boolean,
    transferable: boolean,
    segments: ISegmentM[],
    broker: [account: IAddress, fee: 0n],
  ][] // Array of batches
];

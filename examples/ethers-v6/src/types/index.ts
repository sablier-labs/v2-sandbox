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
  recipient: string | undefined;
  token: string | undefined;
  duration: string | undefined;

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
  durations: [cliff: ISeconds, total: ISeconds],
  broker: [account: IAddress, fee: 0n] // TIP: you can set this to your own address to charge a fee
];

export type ICreateWithRange = [
  sender: IAddress,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  cancelable: boolean,
  durations: [start: ISeconds, cliff: ISeconds, end: ISeconds],
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
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  broker: [account: IAddress, fee: 0n],

  segments: ISegmentM[]
];

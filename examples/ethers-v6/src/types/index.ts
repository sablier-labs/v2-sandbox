declare global {
  interface Window {
    ethereum: any;
  }
}

type IAddress = string;
type ISeconds = bigint;
type IAmountWithDecimals = bigint;

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

export type ICreateWithDurations = [
  sender: IAddress,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  cancelable: boolean,
  durations: [cliff: ISeconds, total: ISeconds],
  broker: [account: IAddress, fee: 0n]
];

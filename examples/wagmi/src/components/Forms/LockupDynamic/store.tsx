import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import type { IAmountWithDecimals18, IStoreFormDynamic } from "../../../types";

const initial: Omit<IStoreFormDynamic, "api"> = {
  error: undefined,
  logs: [],

  cancelability: true,
  recipient: undefined,
  token: undefined,
  segments: [
    {
      amount: undefined,
      delta: undefined,
      exponent: undefined,
    },
  ],
};

const prefill: Omit<IStoreFormDynamic, "api"> = {
  error: undefined,
  logs: [],

  cancelability: true,
  recipient: "0x727a6B434843120B9e0186064eb040032ad95f26",
  token: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862",
  segments: [
    {
      amount: "0",
      delta: "43199", // 12h - 1 second
      exponent: "1",
    },
    {
      amount: "50",
      delta: "1", // 1 second
      exponent: "1",
    },
    {
      amount: "0",
      delta: "43199", // 12h - 1 second
      exponent: "1",
    },
    {
      amount: "50",
      delta: "1", // 1 second
      exponent: "1",
    },
  ],
};

const useStoreForm = createWithEqualityFn<IStoreFormDynamic>(
  (set) => ({
    ...initial,
    api: {
      log: (value: string) =>
        set((prev) => {
          return {
            logs: [...prev.logs, value],
          };
        }),
      update: (updates: Partial<IStoreFormDynamic>) =>
        set((_prev) => {
          return {
            ...updates,
          };
        }),
      reset: () =>
        set((_prev) => {
          return initial;
        }),
    },
  }),
  shallow
);

export { initial, prefill };
export default useStoreForm;

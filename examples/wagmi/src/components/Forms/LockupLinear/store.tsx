import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import type { IStoreFormLinear } from "../../../types";

const initial: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: undefined,
  cancelability: true,
  cliff: undefined,
  duration: undefined,
  recipient: undefined,
  token: undefined,
};

const prefill: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: "100",
  cancelability: true,
  cliff: undefined,
  duration: "86400",
  recipient: "0x727a6B434843120B9e0186064eb040032ad95f26",
  token: "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862",
};

const useStoreForm = createWithEqualityFn<IStoreFormLinear>(
  (set) => ({
    ...initial,
    api: {
      log: (value: string) =>
        set((prev) => {
          return {
            logs: [...prev.logs, value],
          };
        }),
      update: (updates: Partial<IStoreFormLinear>) =>
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

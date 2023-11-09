import _ from "lodash";
import BigNumber from "bignumber.js";

export function expect(
  value: unknown,
  label: string
): value is NonNullable<typeof value> {
  if (_.isNil(value) || _.toString(value).length === 0) {
    throw new Error(`Missing parameter: ${label}`);
  }
  return true;
}

export function toEndDate(time: number) {
  return new BigNumber(Date.now())
    .plus(new BigNumber(time))
    .dividedToIntegerBy(new BigNumber(1000))
    .toFixed();
}

export function erroneous(error: unknown): Error | unknown {
  const code = _.get(error, "code") || "";

  if (code.includes("ACTION_REJECTED")) {
    return;
  } else {
    throw error;
  }
}
